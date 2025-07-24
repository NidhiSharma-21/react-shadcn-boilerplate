import React from "react"
import { useState, useEffect } from "react"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { CheckCircle, Eye, EyeOff} from "lucide-react"
import { validateResetToken, resetPassword, checkPasswordStrength } from "../../utils/auth-utils"

import logo from "../../assets/agrictools_orange.png"
import {
  RESET_PASSWORD_REQUIRED,
  RESET_PASSWORD_MIN_LENGTH,
  RESET_PASSWORD_MIN_LENGTH_ERROR,
  RESET_PASSWORD_COMPLEXITY_ERROR,
  RESET_CONFIRM_PASSWORD_REQUIRED,
  RESET_PASSWORDS_NOT_MATCH,
  RESET_SUCCESS_TITLE,
  RESET_SUCCESS_DESC,
  RESET_SUCCESS_EMAIL,
  RESET_CONTINUE_LOGIN,
  RESET_INVALID_LINK_TITLE,
  RESET_INVALID_LINK_DESC,
  RESET_BACK_TO_LOGIN,
  RESET_SET_NEW_TITLE,
  RESET_SET_NEW_DESC,
  RESET_NEW_PASSWORD_LABEL,
  RESET_NEW_PASSWORD_PLACEHOLDER,
  RESET_CONFIRM_PASSWORD_LABEL,
  RESET_CONFIRM_PASSWORD_PLACEHOLDER,
  RESET_UPDATING,
  RESET_UPDATE
} from "../../constants/resetPassword";

import type { ResetPasswordProps } from "../../types/auth";

export const ResetPassword = ({ 
  onPasswordReset, 
  onBackToLogin, 
  token, 
  error
}: ResetPasswordProps) => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: ""
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isTokenValid, setIsTokenValid] = useState<boolean | null>(null)

  // Validate token on mount
  useEffect(() => {
    if (token) {
      const checkToken = async () => {
        try {
          const valid = await validateResetToken(token)
          setIsTokenValid(valid)
        } catch (err) {
          setIsTokenValid(false)
        }
      }
      checkToken()
    } else {
      setIsTokenValid(false)
    }
  }, [token])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.password) {
      newErrors.password = RESET_PASSWORD_REQUIRED
    } else if (formData.password.length < RESET_PASSWORD_MIN_LENGTH) {
      newErrors.password = RESET_PASSWORD_MIN_LENGTH_ERROR
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = RESET_PASSWORD_COMPLEXITY_ERROR
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = RESET_CONFIRM_PASSWORD_REQUIRED
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = RESET_PASSWORDS_NOT_MATCH
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm() || !token) return

    setIsSubmitting(true)
    
    try {
      const success = await resetPassword({
        token,
        newPassword: formData.password
      })
      if (success) {
        setIsSuccess(true)
        onPasswordReset(formData.password)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const passwordStrength = checkPasswordStrength(formData.password)

  if (isSuccess) {
    return (
      <Card className="card-responsive">
        <CardHeader className="text-center">
        <div className="flex justify-center mt-2">
          <img src={logo} alt="Logo" className="h-36" />
        </div>
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
            <CheckCircle className="h-6 w-6 text-orange-600" />
          </div>
          <CardTitle>{RESET_SUCCESS_TITLE}</CardTitle>
          <CardDescription>
            {RESET_SUCCESS_DESC}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-orange-50 p-4 text-center border border-orange-100">
            <p className="text-sm text-orange-800">
              {RESET_SUCCESS_EMAIL}
            </p>
          </div>

          <Button onClick={onBackToLogin} className="w-full">
            {RESET_CONTINUE_LOGIN}
          </Button>
        </CardContent>
      </Card>
    )
  }

  // Check if token is invalid
  if (isTokenValid === false) {
    return (
      <Card className="card-responsive">
        <div className="flex justify-center mt-2">
          <img src={logo} alt="Logo" className="h-36" />
        </div>
        <CardHeader className="text-center">
          <CardTitle className="text-red-600">{RESET_INVALID_LINK_TITLE}</CardTitle>
          <CardDescription>
            {RESET_INVALID_LINK_DESC}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={onBackToLogin} className="w-full">
            {RESET_BACK_TO_LOGIN}
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="card-responsive">
      <CardHeader className="text-center">
      <div className="flex justify-center">
          <img src={logo} alt="Logo" className="h-36" />
        </div>
        <CardTitle className="flex items-center justify-center">
          {RESET_SET_NEW_TITLE}
        </CardTitle>
        <CardDescription>
          {RESET_SET_NEW_DESC}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {(error?.message) && (
          <div className="rounded-lg bg-red-50 p-4 text-red-600 text-center">
            {error.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">{RESET_NEW_PASSWORD_LABEL}</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder={RESET_NEW_PASSWORD_PLACEHOLDER}
                value={formData.password}
                onChange={(e) => updateField("password", e.target.value)}
                className={`flex h-10 w-full rounded-md border ${errors.password ? 'border-red-600 focus-visible:ring-red-600' : 'border-input focus-visible:ring-orange-500 mt-2'} bg-background px-3 py-2 pr-10 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            
            {formData.password && (
              <div className="space-y-2">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div
                      key={level}
                      className={`h-1 flex-1 rounded ${
                        level <= passwordStrength.strength
                          ? level <= 2 ? 'bg-red-500' : 
                            level === 3 ? 'bg-yellow-500' : 
                            level === 4 ? 'bg-orange-500' : 'bg-green-500'
                          : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
                {passwordStrength.label && (
                  <p className={`text-xs ${
                    passwordStrength.strength <= 2 ? 'text-red-600' : 
                    passwordStrength.strength === 3 ? 'text-yellow-600' : 
                    passwordStrength.strength === 4 ? 'text-orange-600' : 'text-green-600'
                  }`}>
                    Password strength: {passwordStrength.label}
                  </p>
                )}
              </div>
            )}
            
            {errors.password && (
              <p className="text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">{RESET_CONFIRM_PASSWORD_LABEL}</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder={RESET_CONFIRM_PASSWORD_PLACEHOLDER}
                value={formData.confirmPassword}
                onChange={(e) => updateField("confirmPassword", e.target.value)}
                className={`flex h-10 w-full rounded-md border ${errors.confirmPassword ? 'border-red-600 focus-visible:ring-red-600' : 'border-input focus-visible:ring-orange-500 mt-2'} bg-background px-3 py-2 pr-10 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-sm text-red-600">{errors.confirmPassword}</p>
            )}
          </div>

          <Button 
            type="submit"
            className="w-full"
            disabled={isSubmitting || passwordStrength.strength < 3}
          >
            {isSubmitting ? (
              <>
                <span className="mr-2 h-4 w-4 animate-spin" />
                {RESET_UPDATING}
              </>
            ) : (
              RESET_UPDATE
            )}
          </Button>
        </form>

        <Button variant="ghost" onClick={onBackToLogin} className="w-full">
          {RESET_BACK_TO_LOGIN}
        </Button>
      </CardContent>
    </Card>
  )
}