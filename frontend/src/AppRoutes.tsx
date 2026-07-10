import AuthPage from './pages/Auth'
import HomePage from './pages/Home'
import { ConfigProvider } from 'antd'
import faIR from 'antd/locale/fa_IR'
import OrderPage from './pages/Order'
import Checkout from './pages/Checkout'
import ProfilePage from './pages/Profile'
import NotFoundPage from './pages/NotFound'
import OnboardingPage from './pages/Onboarding'
import { Toaster } from '@/components/ui/toaster'
import ProtectedRoute from './guard/ProtectedRoute'
import PublicAuthRoute from './guard/PublicAuthRoute'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Toaster as Sonner } from '@/components/ui/sonner'
import AuthProviderWrapper from '@/context/AuthProviderWrapper'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

const queryClient = new QueryClient()

const AppRoutes = () => (
  <QueryClientProvider client={queryClient}>
    <ConfigProvider
      locale={faIR}
      direction="rtl"
      theme={{
        token: {
          colorPrimary: '#059669',
          borderRadius: 12,
          fontFamily:
            "'Vazirmatn', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        },
        components: {
          Button: {
            controlHeight: 44,
            borderRadius: 999,
            fontWeight: 600,
          },
          Tabs: {
            itemSelectedColor: '#059669',
            inkBarColor: '#059669',
          },
        },
      }}
    >
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <BrowserRouter>
          <AuthProviderWrapper>
            <Routes>
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
              <Route path="/login" element={<Navigate to="/auth" replace />} />
              <Route path="/checkout/:slug" element={<Checkout />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </AuthProviderWrapper>
        </BrowserRouter>
      </TooltipProvider>
    </ConfigProvider>
  </QueryClientProvider>
)

export default AppRoutes
