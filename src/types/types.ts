export type AuthRole = "seller_admin" | "company_admin"

export interface LoginCredentials {
  name: string
  email: string
  password: string
  role: AuthRole
}

export interface OTPLoginData {
  phone: string
  otp: string
  role: AuthRole
}

export interface PasswordResetData {
  token: string
  newPassword: string
}

export interface AuthError {
  message: string
  code?: string
  fieldErrors?: Record<string, string>
}

export type AuthMode = "login" | "forgot" | "otp" | "reset"
