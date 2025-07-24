import { useState } from "react";
import { LoginForm } from "../components/auth/loginForm";
import { ForgotPassword } from "../components/auth/forgotPassword";
import { OTPLogin } from "../components/auth/otpLogin";
import { ResetPassword } from "../components/auth/resetPassword";
import type { AuthMode, AuthError } from "../types/types";
import { handleAuthError } from "../utils/auth-utils";
import leftImage from "../assets/left_image.png";
import Container from "../layout/container";
import { Toaster } from "../components/ui/sonner";
import { toast } from 'sonner';

export const AuthPage = () => {
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [resetEmail, setResetEmail] = useState("");
  const [error, setError] = useState<AuthError | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 1. SUCCESS TOAST - Login
  const handleLogin = async (credentials: any) => {
    setIsLoading(true);
    setError(null);
    try {
      console.log("Login with:", credentials);
      // await loginUser(credentials)
      toast.success("Login Successful", {
        description: "Welcome back! Redirecting to your dashboard...",
      });
    } catch (err) {
      const authError = handleAuthError(err);
      setError(authError);
      toast.error("Login Failed", {
        description: authError.message || "Invalid email or password",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 2. SUCCESS TOAST - OTP Verification
  const handleOTPLogin = async (phone: string, otp: string, role: string) => {
    setIsLoading(true);
    setError(null);
    try {
      console.log("OTP Login with:", phone, otp, role);
      // await verifyOTP({ phone, otp, role })
      toast.success("OTP Verified", {
        description: "Your phone number has been successfully verified",
      });
    } catch (err) {
      const authError = handleAuthError(err);
      setError(authError);
      toast.error("OTP Verification Failed", {
        description: authError.message || "Invalid or expired OTP",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 3. SUCCESS TOAST - Password Reset
  const handlePasswordReset = async (newPassword: string) => {
    setIsLoading(true);
    setError(null);
    try {
      console.log("Password reset to:", newPassword);
      // await updatePassword(newPassword)
      toast.success("Password Updated", {
        description: "Your password has been changed successfully",
      });
    } catch (err) {
      const authError = handleAuthError(err);
      setError(authError);
      toast.error("Password Reset Failed", {
        description: authError.message || "Failed to update password",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 4. INFO TOAST - Reset Link Sent
  const handleForgotPassword = async (email: string) => {
    setIsLoading(true);
    try {
      console.log("Password reset requested for:", email);
      // await sendResetLink(email)
      setResetEmail(email);
      setAuthMode("reset");
      toast.info("Reset Link Sent", {
        description: `We've sent a password reset link to ${email}`,
        action: {
          label: "Resend",
          onClick: () => handleForgotPassword(email),
        },
      });
    } catch (err) {
      const authError = handleAuthError(err);
      toast.error("Failed to Send Reset Link", {
        description: authError.message || "Please try again later",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 5. WARNING TOAST - Session Expiry
  const showSessionWarning = () => {
    toast.warning("Session Expiring Soon", {
      description: "Your session will expire in 5 minutes. Please save your work.",
      duration: 10000, // 10 seconds
    });
  };

  return (
    <>
      {/* Left image - hidden on mobile */}
      <div className="hidden md:block md:h-screen md:w-1/2">
        <img 
          src={leftImage} 
          alt="Decorative" 
          className="w-full h-screen object-cover"
        />
      </div>
      {/* Right form - full width on mobile, half on desktop */}
      <div className="w-full md:w-1/2 h-full">
        <div className="h-full flex items-center justify-center p-4">
          <Container>
            {authMode === "login" && (
              <LoginForm
                onLogin={handleLogin}
                onSwitchToOTP={() => setAuthMode("otp")}
                onForgotPassword={() => setAuthMode("forgot")}
                isLoading={isLoading}
              />
            )}
            {authMode === "forgot" && (
              <ForgotPassword
                onBack={() => setAuthMode("login")}
                onResetLinkSent={handleForgotPassword}
                isLoading={isLoading}
              />
            )}
            {authMode === "otp" && (
              <OTPLogin
                onVerifyOTP={handleOTPLogin}
                onBack={() => setAuthMode("login")}
                isLoading={isLoading}
              />
            )}
            {authMode === "reset" && (
              <ResetPassword
                onPasswordReset={handlePasswordReset}
                onBackToLogin={() => setAuthMode("login")}
                token="valid-token"
                isLoading={isLoading}
                error={error ?? undefined}
              />
            )}
          </Container>
        </div>
      </div>
    </>
  );
};

export default AuthPage;