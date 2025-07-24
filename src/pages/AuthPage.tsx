import { useState } from "react"
import { LoginForm } from "../components/auth/loginForm"
import { ForgotPassword } from "../components/auth/forgotPassword"
import { OTPLogin } from "../components/auth/otpLogin"
import { ResetPassword } from "../components/auth/resetPassword"
import type { AuthMode, AuthError } from "../types/types"
import  { handleAuthError } from "../utils/auth-utils"
import { toast } from "../hooks/useToast"
import leftImage from "../assets/left_image.png"
import Container from "../layout/container"

export const AuthPage = () => {
  const [authMode, setAuthMode] = useState<AuthMode>("login")
  const [resetEmail, setResetEmail] = useState("")
  const [error, setError] = useState<AuthError | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (credentials: any) => {
    setIsLoading(true)
    setError(null)
    try {
      console.log("Login with:", credentials)
      // await loginUser(credentials)
      toast({
        title: "Login Successful",
        description: `Welcome, ${credentials.email || credentials.name || "user"}!`,
      });
    } catch (err) {
      setError(handleAuthError(err))
      toast({
        title: "Login Failed",
        description: handleAuthError(err).message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false)
    }
  }

  const handleOTPLogin = async (phone: string, otp: string, role: string) => {
    setIsLoading(true)
    setError(null)
    try {
      console.log("OTP Login with:", phone, otp, role)
      // await verifyOTP({ phone, otp, role })
      toast({
        title: "OTP Login Successful",
        description: `Logged in as ${role}`,
      });
    } catch (err) {
      setError(handleAuthError(err))
      toast({
        title: "OTP Login Failed",
        description: handleAuthError(err).message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordReset = async (newPassword: string) => {
    setIsLoading(true)
    setError(null)
    try {
      console.log("Password reset to:", newPassword)
      // await updatePassword(newPassword)
      toast({
        title: "Password Reset Successful",
        description: "Your password has been updated.",
      });
    } catch (err) {
      setError(handleAuthError(err))
      toast({
        title: "Password Reset Failed",
        description: handleAuthError(err).message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Left image - hidden on mobile */}
      <div className="hidden md:block md:h-screen md:w-1/2 ">
        <img 
          src={leftImage} 
          alt="Decorative" 
          className="w-full h-screen object-cover"
        />
      </div>
      {/* Right form - full width on mobile, half on desktop */}
      <div className="w-full md:w-1/2 h-full ">
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
                onResetLinkSent={(email) => {
                  setResetEmail(email)
                  setAuthMode("reset")
                }}
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
  )
}
export default AuthPage;