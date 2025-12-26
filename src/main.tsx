import './index.css'
import App from './App.tsx'
import 'antd/dist/reset.css'
import { createRoot } from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'

registerSW({
  onNeedRefresh() {
    console.log('New content available…')
  },
  onOfflineReady() {
    console.log('App ready to work offline.')
  },
})

createRoot(document.getElementById('root')!).render(<App />)
