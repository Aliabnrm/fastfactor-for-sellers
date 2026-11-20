import { lazy, Suspense } from 'react'
import LoadingState from '@/components/global/LoadingState'
import PageErrorBoundary from '@/components/global/PageErrorBoundary'
import { ConfigProvider } from 'antd'
import faIR from 'antd/locale/fa_IR'
import { Toaster } from '@/components/ui/toaster'
import ProtectedRoute from './guard/ProtectedRoute'
import PublicAuthRoute from './guard/PublicAuthRoute'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Toaster as Sonner } from '@/components/ui/sonner'
import AuthProviderWrapper from '@/context/AuthProviderWrapper'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from 'react-router-dom'

const AuthPage = lazy(() => import('./pages/Auth'))

const HomePage = lazy(() => import('./pages/Home'))

const OrderPage = lazy(() => import('./pages/Order'))

const Checkout = lazy(() => import('./pages/Checkout'))

const ProfilePage = lazy(() => import('./pages/Profile'))

const NotFoundPage = lazy(() => import('./pages/NotFound'))

const OnboardingPage = lazy(() => import('./pages/Onboarding'))

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: false,
    },
  },
})

const AppRoutes = () => (
  <QueryClientProvider client={queryClient}>
    <ConfigProvider
      locale={faIR}
      direction="rtl"
      theme={{
        token: {
          colorPrimary: '#3730a3',
          colorSuccess: '#10b981',
          colorText: '#0f172a',
          colorTextSecondary: '#64748b',
          colorBorder: '#cbd5e1',
          borderRadius: 12,
          controlHeight: 48,
          fontFamily:
            "'Vazirmatn Variable', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        },
        components: {
          Button: {
            controlHeight: 48,
            borderRadius: 12,
            fontWeight: 600,
          },
          Tabs: {
            itemSelectedColor: '#ffffff',
            itemActiveColor: '#ffffff',
            itemHoverColor: '#ffffff',
            inkBarColor: 'transparent',
          },
        },
      }}
    >
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <BrowserRouter>
          <PageErrorBoundary>
            <Suspense
              fallback={<LoadingState title="در حال آماده‌سازی صفحه" />}
            >
              <Routes>
                <Route
                  element={
                    <AuthProviderWrapper>
                      <Outlet />
                    </AuthProviderWrapper>
                  }
                >
                  {/* PUBLIC */}
                  <Route
                    path="/auth"
                    element={
                      <PublicAuthRoute>
                        <AuthPage />
                      </PublicAuthRoute>
                    }
                  />

                  {/* PROTECTED */}
                  <Route
                    path="/"
                    element={
                      <ProtectedRoute>
                        <HomePage />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/onboarding"
                    element={
                      <ProtectedRoute>
                        <OnboardingPage />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/order"
                    element={
                      <ProtectedRoute>
                        <OrderPage />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <ProfilePage />
                      </ProtectedRoute>
                    }
                  />

                  {/* OTHER */}
                  <Route
                    path="/login"
                    element={<Navigate to="/auth" replace />}
                  />
                </Route>
                <Route path="/checkout/:slug" element={<Checkout />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </PageErrorBoundary>
        </BrowserRouter>
      </TooltipProvider>
    </ConfigProvider>
  </QueryClientProvider>
)

export default AppRoutes
