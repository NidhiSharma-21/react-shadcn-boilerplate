import { useState, useEffect } from "react"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { InputOTP  } from "../ui/input-otp"
import { ArrowLeft,  Building2 } from "lucide-react"
import { validatePhone, sendOTP } from "../../utils/auth-utils"
import type { AuthRole} from "../../types/types"
import { OTP_LENGTH } from "../../constants/constants"
import {
  OTP_PHONE_REQUIRED,
  OTP_PHONE_INVALID,
  OTP_SEND_FAILED,
  OTP_SEND_ERROR,
  OTP_LOGIN_TITLE,
  OTP_LOGIN_DESC,
  OTP_COMPANY_ADMIN_LOGIN,
  OTP_ARE_YOU_COMPANY,
  OTP_CLICK_HERE,
  OTP_SWITCH_BACK,
  OTP_BACK_TO_LOGIN,
  OTP_VERIFY_TITLE,
  OTP_VERIFY_DESC,
  OTP_COMPANY_ADMIN_VERIFICATION,
  OTP_VERIFYING,
  OTP_VERIFY,
  OTP_VERIFY_COMPANY,
  OTP_RESEND_PROMPT,
  OTP_RESEND,
  OTP_RESEND_IN,
  OTP_RESEND_FAILED,
  OTP_ERROR_INCOMPLETE,
  OTP_SENDING,
  OTP_SEND
} from "../../constants/otpLogin";
import logo from "../../assets/agrictools_orange.png"

import type { OTPLoginProps } from "../../types/auth";

export const OTPLogin = ({ 
  onVerifyOTP, 
  onBack, 
  isLoading = false,
  error
}: OTPLoginProps) => {
  const [step, setStep] = useState<"phone" | "otp">("phone")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [otp, setOtp] = useState("")
  const [role, setRole] = useState<AuthRole>("seller_admin")
  const [phoneError, setPhoneError] = useState("")
  const [otpError, setOtpError] = useState("")
  const [countdown, setCountdown] = useState(0)
  const [isRequestingOTP, setIsRequestingOTP] = useState(false)

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000)
    }
    return () => clearTimeout(timer)
  }, [countdown])

  const handleSendOTP = async () => {
    if (!phoneNumber.trim()) {
      setPhoneError(OTP_PHONE_REQUIRED)
      return
    }
    
    if (!validatePhone(phoneNumber)) {
      setPhoneError(OTP_PHONE_INVALID)
      return
    }

    setIsRequestingOTP(true)
    setPhoneError("")
    
    try {
      const success = await sendOTP(phoneNumber)
      if (success) {
        setStep("otp")
        setCountdown(30) // 30 seconds countdown
      } else {
        setPhoneError(OTP_SEND_FAILED)
      }
    } catch (err) {
      setPhoneError(OTP_SEND_ERROR)
    } finally {
      setIsRequestingOTP(false)
    }
  }

  const handleVerifyOTP = async () => {
    if (otp.length !== OTP_LENGTH) {
      setOtpError(OTP_ERROR_INCOMPLETE(OTP_LENGTH))
      return
    }
    
    setOtpError("")
    onVerifyOTP(phoneNumber, otp, role)
  }

  const handleResendOTP = async () => {
    setCountdown(30)
    setOtp("")
    setOtpError("")
    
    try {
      await sendOTP(phoneNumber)
    } catch (err) {
      setOtpError(OTP_RESEND_FAILED)
    }
  }

  if (step === "phone") {
    return (
      <Card className="card-responsive">
        <div className="flex justify-center mt-2">
          <img src={logo} alt="Logo" className="h-36" />
        </div>
        <CardHeader className="text-center">
          <CardTitle>
            {OTP_LOGIN_TITLE}
          </CardTitle>
          <CardDescription>{OTP_LOGIN_DESC}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {(phoneError || error?.message) && (
            <div className="rounded-lg bg-red-50 p-4 text-red-600 text-center">
              {phoneError || error?.message}
            </div>
          )}

          <Input
             // @ts-ignore
            label="Phone Number"
            type="tel"
            className="mt-2"
            placeholder="+1 (555) 123-4567"
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value)
              setPhoneError("")
            }}
            error={phoneError || error?.fieldErrors?.phone}
            required
          />

          {role === "company_admin" && (
            <div className="p-3 bg-orange-50 rounded-lg border border-orange-100">
              <div className="flex items-center gap-2 text-orange-800">
                <Building2 className="h-4 w-4" />
                <span className="text-sm font-medium">{OTP_COMPANY_ADMIN_LOGIN}</span>
              </div>
            </div>
          )}

          <Button 
            onClick={handleSendOTP}
            className="w-full"
            disabled={isRequestingOTP}
          >
            {isRequestingOTP ? (
              <>
                <span className="mr-2 h-4 w-4 animate-spin" />
                {OTP_SENDING}
              </>
            ) : (
              OTP_SEND
            )}
          </Button>

          {role === "seller_admin" && (
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                {OTP_ARE_YOU_COMPANY}{" "}
                <button
                  type="button"
                  onClick={() => setRole("company_admin")}
                  className="text-orange-600 hover:underline"
                  disabled={isRequestingOTP}
                >
                  {OTP_CLICK_HERE}
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
                disabled={isRequestingOTP}
              >
                {OTP_SWITCH_BACK}
              </button>
            </div>
          )}

          <Button variant="ghost" onClick={onBack} className="w-full">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {OTP_BACK_TO_LOGIN}
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="card-responsive">
      <div className="flex justify-center mt-2">
        <img src={logo} alt="Logo" className="h-14" />
      </div>
      <CardHeader className="text-center">
        <CardTitle>{OTP_VERIFY_TITLE}</CardTitle>
        <CardDescription>
          {OTP_VERIFY_DESC}<br />
          <span className="font-medium text-foreground">{phoneNumber}</span>
          {role === "company_admin" && (
            <span className="block text-xs text-orange-600 mt-1">
              Company Admin Access
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {(otpError || error?.message) && (
          <div className="rounded-lg bg-red-50 p-4 text-red-600 text-center">
            {otpError || error?.message}
          </div>
        )}

        <div className="space-y-2">
          <div className="flex justify-center">
            <InputOTP 
              value={otp}
              onChange={(value) => {
                setOtp(value)
                setOtpError("")
              }}
              disabled={isLoading}
              maxLength={OTP_LENGTH}
            >
              {/* Render OTP input fields as children */}
              {Array.from({ length: OTP_LENGTH }).map((_, idx) => (
                <Input
                  key={idx}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  className="mx-1 w-10 text-center"
                  value={otp[idx] || ""}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9]/g, "");
                    setOtp(
                      otp.substring(0, idx) +
                        val +
                        otp.substring(idx + 1)
                    );
                    setOtpError("");
                  }}
                  disabled={isLoading}
                />
              ))}
            </InputOTP>
          </div>
        </div>

        {role === "company_admin" && (
          <div className="p-3 bg-orange-50 rounded-lg border border-orange-100 text-center">
            <div className="flex items-center justify-center gap-2 text-orange-800">
              <Building2 className="h-4 w-4" />
              <span className="text-sm font-medium">{OTP_COMPANY_ADMIN_VERIFICATION}</span>
            </div>
          </div>
        )}

        <Button 
          onClick={handleVerifyOTP}
          className="w-full"
          disabled={isLoading || otp.length !== OTP_LENGTH}
        >
          {isLoading ? (
            <>
              <span className="mr-2 h-4 w-4 animate-spin" />
              {OTP_VERIFYING}
            </>
          ) : (
            role === "company_admin" ? OTP_VERIFY_COMPANY : OTP_VERIFY
          )}
        </Button>

        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            {OTP_RESEND_PROMPT}
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleResendOTP}
            disabled={countdown > 0 || isLoading}
          >
            {countdown > 0 ? OTP_RESEND_IN(countdown) : OTP_RESEND}
          </Button>
        </div>

        <Button variant="ghost" onClick={onBack} className="w-full">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {OTP_BACK_TO_LOGIN}
        </Button>
      </CardContent>
    </Card>
  )
}