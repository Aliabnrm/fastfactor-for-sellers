import { Component, type ReactNode } from 'react'
import LoadingState from './LoadingState'

export default class PageErrorBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  render() {
    if (this.state.failed) {
      return (
        <LoadingState
          error
          title="صفحه بارگذاری نشد"
          description="اتصال اینترنت را بررسی کنید و صفحه را دوباره بارگذاری کنید."
          onRetry={() => window.location.reload()}
        />
      )
    }
    return this.props.children
  }
}
