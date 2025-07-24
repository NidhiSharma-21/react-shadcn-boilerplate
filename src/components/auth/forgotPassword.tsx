import React from "react"
import { useState } from "react"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { ArrowLeft,  CheckCircle } from "lucide-react"
import { validateEmail, sendPasswordResetEmail } from "../../utils/auth-utils"

import logo from "../../assets/agrictools_orange.png"
import {
  RESET_SUCCESS_MESSAGE,
  RESET_ERROR_MESSAGE,
  RESET_GENERIC_ERROR,
  RESET_EMAIL_REQUIRED,
  RESET_EMAIL_INVALID
} from "../../constants/forgotPassword";


import type { ForgotPasswordProps } from "../../types/auth";

export const ForgotPassword = ({ 
  onBack, 
  onResetLinkSent, 
}: ForgotPasswordProps) => {
  const [email, setEmail] = useState("")
  const [localError, setLocalError] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)
  const [isSending, setIsSending] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email.trim()) {
      setLocalError(RESET_EMAIL_REQUIRED)
      return
    }
    
    if (!validateEmail(email)) {
      setLocalError(RESET_EMAIL_INVALID)
      return
    }

    setIsSending(true)
    setLocalError("")

    try {
      const success = await sendPasswordResetEmail(email)
      if (success) {
        setIsSuccess(true)
        onResetLinkSent(email)
      } else {
        setLocalError(RESET_ERROR_MESSAGE)
      }
    } catch (err) {
      setLocalError(RESET_GENERIC_ERROR)
    } finally {
      setIsSending(false)
    }
  }

  if (isSuccess) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
        <div className="flex justify-center mt-6">
          <img src={logo} alt="Logo" className="h-36" />
        </div>
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
            <CheckCircle className="h-6 w-6 text-orange-600" />
          </div>
          <CardTitle>Reset Link Sent!</CardTitle>
          <CardDescription>
            We've sent a password reset link to<br />
            <span className="font-medium text-foreground">{email}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-orange-50 p-4 text-center border border-orange-100">
            <p className="text-sm text-orange-800">
              {RESET_SUCCESS_MESSAGE}
            </p>
          </div>

          <Button onClick={onBack} className="w-full">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Login
          </Button>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Didn't receive the email?{" "}
              <button
                onClick={() => {
                  setIsSuccess(false)
                  setEmail("")
                }}
                className="text-orange-600 hover:underline"
              >
                Try again
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="card-responsive">
      <CardHeader className="text-center">
      <div className="flex justify-center mt-0">
          <img src={logo} alt="Logo" className="h-36" />
        </div>
        <CardTitle className="flex items-center justify-center gap-2">
          Forgot Password
        </CardTitle>
        <CardDescription>
        We'll email you a link to reset your password.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {localError && (
          <div className="rounded-lg bg-red-50 p-4 text-red-600 text-center">
            {localError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
             // @ts-ignore
            label="Email Address"
            type="email"
            className="mt-2"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setLocalError("")
            }}
            error={localError}
            required
          />

          <Button 
            type="submit"
            className="w-full"
            disabled={isSending}
          >
            {isSending ? (
              <>
                <span className="mr-2 h-4 w-4 animate-spin" />
                Sending Reset Link...
              </>
            ) : (
              "Send Reset Link"
            )}
          </Button>
        </form>

        <Button variant="ghost" onClick={onBack} className="w-full">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Login
        </Button>
      </CardContent>
    </Card>
  )
}