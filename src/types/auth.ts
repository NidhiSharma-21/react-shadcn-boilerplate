import type { AuthError } from "./types";
import type { LoginCredentials, AuthRole } from "./types";
export interface ForgotPasswordProps {
  onBack: () => void;
  onResetLinkSent: (email: string) => void;
  isLoading?: boolean;
  error?: AuthError;
}

// Add stubs for other auth components for future use
export interface LoginFormProps {
  onLogin: (credentials: LoginCredentials) => void;
  onSwitchToOTP: () => void;
  onForgotPassword: () => void;
  isLoading?: boolean;
}

export interface OTPLoginProps {
  onVerifyOTP: (phone: string, otp: string, role: AuthRole) => void;
  onBack: () => void;
  isLoading?: boolean;
  error?: AuthError;
}

export interface ResetPasswordProps {
  onPasswordReset: (newPassword: string) => void;
  onBackToLogin: () => void;
  token?: string;
  isLoading?: boolean;
  error?: AuthError;
}
