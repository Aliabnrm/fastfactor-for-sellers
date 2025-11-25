import Auth from "./pages/Auth";
import Index from "./pages/Index";
import faIR from "antd/locale/fa_IR";
import { ConfigProvider } from "antd";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";
import Dashboard from "./pages/Dashboard";
import Onboarding from "./pages/Onboarding";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AuthProviderWrapper from "@/context/AuthProviderWrapper";
import PublicAuthRoute from "./PublicAuthRoute";
import ProtectedRoute from "./ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ConfigProvider
      locale={faIR}
      direction="rtl"
      theme={{
        token: {
          colorPrimary: "#059669",
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
            itemSelectedColor: "#059669",
            inkBarColor: "#059669",
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
                    <Auth />
                  </PublicAuthRoute>
                }
              />

              {/* PROTECTED */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Index />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/onboarding"
                element={
                  <ProtectedRoute>
                    <Onboarding />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/dashboard/settings"
                element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                }
              />

              {/* OTHER */}
              <Route path="/login" element={<Navigate to="/auth" replace />} />
              <Route path="/checkout/:slug" element={<Checkout />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProviderWrapper>
        </BrowserRouter>
      </TooltipProvider>
    </ConfigProvider>
  </QueryClientProvider>
);

export default App;
