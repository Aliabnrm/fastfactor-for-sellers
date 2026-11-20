import assert from 'node:assert/strict'
import { after, test } from 'node:test'
import React from 'react'
import { act, create } from 'react-test-renderer'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { createServer } from 'vite'

const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom' })
const { default: Provider } = await vite.ssrLoadModule('/src/context/AuthProviderWrapper.tsx')
const { AuthContext } = await vite.ssrLoadModule('/src/hooks/useAuth.ts')
const { default: api } = await vite.ssrLoadModule('/src/services/useApiClient.ts')
const { tokenStore } = await vite.ssrLoadModule('/src/lib/auth/tokenStore.ts')
const store = new Map()
globalThis.localStorage = {
  getItem: key => store.get(key) ?? null,
  setItem: (key, value) => store.set(key, value),
}
globalThis.window = { setTimeout, clearTimeout }
after(() => vite.close())

const user = { id: 'seller-1', email: 'seller@example.com' }
const session = { user, accessToken: 'access-token' }
const unauthorized = config => new AxiosError('Expired', 'ERR_BAD_REQUEST', config, null, { status: 401, data: {} })

async function mount(adapter) {
  store.clear()
  tokenStore.clear()
  api.defaults.adapter = adapter
  const client = new QueryClient()
  let context
  let tree
  function Reader() {
    context = React.useContext(AuthContext)
    return React.createElement('span', null, context.loading ? 'loading' : context.user?.email ?? 'guest')
  }
  await act(async () => {
    tree = create(React.createElement(QueryClientProvider, { client }, React.createElement(Provider, null, React.createElement(Reader))))
  })
  return { tree, client, context: () => context, unmount: () => act(() => tree.unmount()) }
}

test('restores the user from one refresh response without requesting /me', async () => {
  const requests = []
  const app = await mount(async config => {
    requests.push(config.url)
    return { data: session, status: 200, config, headers: {} }
  })
  assert.deepEqual(requests, ['/auth/refresh'])
  assert.equal(app.context().user.email, user.email)
  assert.equal(app.context().loading, false)
  assert.equal(tokenStore.get(), 'access-token')
  assert.equal(store.get('fastfactor:session'), 'member')
  app.unmount()
})

test('shows loading while a slow server is pending', async () => {
  let finish
  const app = await mount(config => new Promise(resolve => { finish = () => resolve({ data: session, status: 200, config, headers: {} }) }))
  assert.equal(app.context().loading, true)
  await act(async () => finish())
  assert.equal(app.context().loading, false)
  assert.equal(app.context().isAuthenticated, true)
  app.unmount()
})

test('remembers confirmed guests and avoids another refresh on the next visit', async () => {
  let requests = 0
  const app = await mount(async config => { requests++; throw unauthorized(config) })
  assert.equal(app.context().isAuthenticated, false)
  assert.equal(store.get('fastfactor:session'), 'guest')
  app.unmount()
  let tree
  await act(async () => {
    tree = create(React.createElement(QueryClientProvider, { client: app.client }, React.createElement(Provider, null, React.createElement('span', null, 'login'))))
  })
  assert.equal(requests, 1)
  act(() => tree.unmount())
})

test('keeps a transient failure separate from an expired session and supports retry', async () => {
  let requests = 0
  const app = await mount(async config => {
    requests++
    if (requests === 1) throw new AxiosError('Offline', 'ERR_NETWORK', config)
    return { data: session, status: 200, config, headers: {} }
  })
  assert.equal(app.tree.root.findByProps({ role: 'alert' }).type, 'div')
  assert.notEqual(store.get('fastfactor:session'), 'guest')
  await act(async () => app.tree.root.findByType('button').props.onClick())
  assert.equal(app.context().isAuthenticated, true)
  assert.equal(requests, 2)
  app.unmount()
})

test('clears cached seller data when signing in and signing out', async () => {
  const app = await mount(async config => ({ data: session, status: 200, config, headers: {} }))
  app.client.setQueryData(['my-store'], { private: true })
  act(() => app.context().setAuth(user, 'new-token'))
  assert.equal(app.client.getQueryData(['my-store']), undefined)
  app.client.setQueryData(['orders'], ['private-order'])
  await act(async () => app.context().logout())
  assert.equal(app.client.getQueryData(['orders']), undefined)
  assert.equal(app.context().isAuthenticated, false)
  assert.equal(store.get('fastfactor:session'), 'guest')
  assert.equal(tokenStore.get(), null)
  app.unmount()
})

test('preserves the active session when logout cannot reach the server', async () => {
  const app = await mount(async config => {
    if (config.url === '/auth/logout') throw new AxiosError('Offline', 'ERR_NETWORK', config)
    return { data: session, status: 200, config, headers: {} }
  })
  await assert.rejects(app.context().logout())
  assert.equal(app.context().isAuthenticated, true)
  assert.equal(tokenStore.get(), 'access-token')
  assert.equal(store.get('fastfactor:session'), 'member')
  app.unmount()
})

test('ignores late bootstrap responses after the provider unmounts', async () => {
  let finish
  const app = await mount(config => new Promise(resolve => { finish = () => resolve({ data: session, status: 200, config, headers: {} }) }))
  app.unmount()
  await act(async () => finish())
  assert.equal(tokenStore.get(), null)
  assert.equal(store.get('fastfactor:session'), undefined)
})
