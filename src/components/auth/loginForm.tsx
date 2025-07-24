import React from "react"
import { useState } from "react"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { validateEmail } from "../../utils/auth-utils"
import type {  AuthRole } from "../../types/types"
import { PasswordInput } from "../ui-custom/passwordInput"
import logo from "../../assets/agrictools_orange.png"
import {
  LOGIN_EMAIL_REQUIRED,
  LOGIN_NAME_REQUIRED,
  LOGIN_PASSWORD_REQUIRED,
  LOGIN_INVALID_EMAIL,
  LOGIN_PASSWORD_MIN_LENGTH,
  LOGIN_PASSWORD_MIN_LENGTH_ERROR,
  LOGIN_WELCOME_TITLE,
  LOGIN_WELCOME_DESC,
  LOGIN_SIGNIN_LOADING,
  LOGIN_SIGNIN,
  LOGIN_SIGNIN_COMPANY,
  LOGIN_OR_CONTINUE,
  LOGIN_OTP,
  LOGIN_FORGOT_PASSWORD,
  LOGIN_ARE_YOU_COMPANY,
  LOGIN_CLICK_HERE,
  LOGIN_SWITCH_BACK
} from "../../constants/loginForm";

import type { LoginFormProps } from "../../types/auth";

export const LoginForm = ({ 
  onLogin, 
  onSwitchToOTP, 
  onForgotPassword, 
  isLoading = false
}: LoginFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  })
  const [role, setRole] = useState<AuthRole>("seller_admin")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name.trim()) newErrors.name = LOGIN_NAME_REQUIRED
    if (!formData.email.trim()) newErrors.email = LOGIN_EMAIL_REQUIRED
    else if (!validateEmail(formData.email)) newErrors.email = LOGIN_INVALID_EMAIL
    if (!formData.password) newErrors.password = LOGIN_PASSWORD_REQUIRED
    else if (formData.password.length < LOGIN_PASSWORD_MIN_LENGTH) newErrors.password = LOGIN_PASSWORD_MIN_LENGTH_ERROR

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onLogin({
        ...formData,
        role
      })
    }
  }

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <Card >
      <CardHeader className="text-center">
      <div className="flex justify-center ">
          <img src={logo} alt="Logo" className="h-36" />
        </div>
        <CardTitle>{LOGIN_WELCOME_TITLE}</CardTitle>
        <CardDescription>{LOGIN_WELCOME_DESC}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
          // @ts-ignore
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            className="mt-2"
            value={formData.email}
            onChange={(e) => updateField("email", e.target.value)}
            error={errors.email}
            required
          />

          <PasswordInput
            // @ts-ignore
            label="Password"
            className="mt-2"
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => updateField("password", e.target.value)}
            error={errors.password}
            required
          />

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="mr-2 h-4 w-4 animate-spin" />
                {LOGIN_SIGNIN_LOADING}
              </>
            ) : (
              role === "company_admin" ? LOGIN_SIGNIN_COMPANY : LOGIN_SIGNIN
            )}
          </Button>
        </form>

        <div className="space-y-3">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">{LOGIN_OR_CONTINUE}</span>
            </div>
          </div>

          <Button 
            variant="outline" 
            className="w-full"
            onClick={onSwitchToOTP}
            disabled={isLoading}
          >
            {LOGIN_OTP}
          </Button>

          <div className="text-center space-y-2">
            <button
              type="button"
              onClick={onForgotPassword}
              className="text-sm text-orange-600 hover:underline"
              disabled={isLoading}
            >
              {LOGIN_FORGOT_PASSWORD}
            </button>
          </div>

          {role === "seller_admin" && (
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                {LOGIN_ARE_YOU_COMPANY}{" "}
                <button
                  type="button"
                  onClick={() => setRole("company_admin")}
                  className="text-orange-600 hover:underline"
                  disabled={isLoading}
                >
                  {LOGIN_CLICK_HERE}
                </button>
              </p>
            </div>
          )}

          {role === "company_admin" && (
            <div className="text-center">
              <button
                type="button"
                onClick={() => setRole("seller_admin")}
                className="text-sm text-muted-foreground hover:text-foreground hover:underline"
                disabled={isLoading}
              >
                {LOGIN_SWITCH_BACK}
              </button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}