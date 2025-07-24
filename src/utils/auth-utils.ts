// Simulated async OTP sender
export async function sendOTP(phone: string): Promise<boolean> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500));
  return true;
}

// Simulated async password reset email sender
export async function sendPasswordResetEmail(email: string): Promise<boolean> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500));
  return true;
}

// Simulated async password reset
export async function resetPassword(data: PasswordResetData): Promise<boolean> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500));
  return true;
}

// Simulated async reset token validator
export async function validateResetToken(token: string): Promise<boolean> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500));
  return token === 'valid-token';
}

// Generic error handler for auth
export function handleAuthError(err: any): AuthError {
  if (typeof err === 'string') {
    return { message: err };
  }
  if (err && typeof err.message === 'string') {
    return { message: err.message };
  }
  return { message: 'An unknown error occurred.' };
}
import { OTP_LENGTH } from "../constants/constants"
import type { AuthError, PasswordResetData, OTPLoginData } from "../types/types"

/**
 * Validates an email address
 */
export const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

/**
 * Validates a phone number (basic international format)
 */
export const validatePhone = (phone: string): boolean => {
  return /^[+]?\d[\d\s\-()]{9,}$/.test(phone.replace(/\s/g, ""))
}

/**
 * Checks password strength
 */
export const checkPasswordStrength = (password: string) => {
  if (!password) return { strength: 0, label: "" }
  
  const hasMinLength = password.length >= 8
  const hasUpper = /[A-Z]/.test(password)
  const hasLower = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSpecial = /[!@#$%^&*]/.test(password)

  const strength = 
    (hasMinLength ? 1 : 0) +
    (hasUpper ? 1 : 0) +
    (hasLower ? 1 : 0) +
    (hasNumber ? 1 : 0) +
    (hasSpecial ? 1 : 0)

  const labels = ["", "Very Weak", "Weak", "Medium", "Strong", "Very Strong"]
  return { strength, label: labels[strength] }
}

/**
 * Generates a random OTP code
 */
export const generateOTP = (length = OTP_LENGTH): string => {
  const digits = '0123456789'
  let otp = ''
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * 10)]
  }
  return otp
}
