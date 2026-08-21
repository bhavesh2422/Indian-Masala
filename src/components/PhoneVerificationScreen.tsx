import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ChevronLeft, ChevronRight, Phone, ShieldCheck, CheckCircle2, RotateCw } from 'lucide-react';

interface PhoneVerificationScreenProps {
  initialPhone?: string;
  onVerified: (phone: string) => void;
  onBack: () => void;
}

export const PhoneVerificationScreen: React.FC<PhoneVerificationScreenProps> = ({
  initialPhone = '98765 43210',
  onVerified,
  onBack,
}) => {
  const [phoneNumber, setPhoneNumber] = useState(initialPhone);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isOtpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsResendDisabled(false);
    }
    return () => clearInterval(interval);
  }, [isOtpSent, timer]);

  const handleSendOtp = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanPhone = phoneNumber.replace(/\s+/g, '');
    if (cleanPhone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number');
      return;
    }
    setErrorMessage('');
    setIsOtpSent(true);
    setTimer(30);
    setIsResendDisabled(true);
    setTimeout(() => {
      inputRefs[0].current?.focus();
    }, 150);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setErrorMessage('');

    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    if (/^\d{4}$/.test(pastedData)) {
      const digits = pastedData.split('');
      setOtp(digits);
      inputRefs[3].current?.focus();
    }
  };

  const handleVerify = () => {
    const fullOtp = otp.join('');
    if (fullOtp.length < 4) {
      setErrorMessage('Please enter all 4 digits of the verification code.');
      return;
    }

    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      onVerified(phoneNumber);
    }, 600);
  };

  const fillDemoOtp = () => {
    setOtp(['4', '8', '2', '1']);
    setErrorMessage('');
    inputRefs[3].current?.focus();
  };

  const isComplete = otp.every((digit) => digit !== '');

  return (
    <div className="min-h-screen bg-[#FDF9F4] text-[#1C1C19] flex flex-col justify-between pb-20 md:pb-8">
      {/* Top App Bar */}
      <header className="sticky top-0 w-full z-40 flex justify-between items-center px-6 h-16 bg-[#FDF9F4] border-b border-[#E6E2DD]/80">
        <button
          onClick={onBack}
          id="verify-phone-back-top-btn"
          className="text-[#865300] hover:bg-[#EBE8E3] transition-colors p-2 rounded-full flex items-center justify-center cursor-pointer"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="font-serif text-xl sm:text-2xl font-bold text-[#865300] tracking-tight">
          MasalaTrace
        </h1>
        <div className="w-10" />
      </header>

      {/* Main Container */}
      <main className="flex-grow flex flex-col items-center justify-center px-6 pt-6 pb-12 max-w-md mx-auto w-full">
        {/* Stepper Icon Indicator */}
        <div className="w-full flex items-center justify-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#4A5D23]/15 flex items-center justify-center text-[#4A5D23] border border-[#4A5D23]/30">
              <span
                className="material-symbols-outlined text-2xl text-[#4A5D23]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                phonelink_ring
              </span>
            </div>
            <span
              className={`w-12 h-[2px] transition-colors duration-300 ${
                isOtpSent ? 'bg-[#4A5D23]' : 'bg-[#E6E2DD]'
              }`}
            />
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${
                isOtpSent
                  ? 'bg-[#4A5D23] text-white'
                  : 'bg-[#E6E2DD] text-[#857462]'
              }`}
            >
              <span className="material-symbols-outlined text-2xl">
                verified_user
              </span>
            </div>
          </div>
        </div>

        {/* Heading & Instructions */}
        <div className="w-full text-center mb-8">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1C19] mb-2">
            Verify Your Number
          </h2>
          <p className="text-[#534434] text-sm sm:text-base leading-relaxed">
            We need to verify your phone number to continue the onboarding process.
          </p>
        </div>

        {/* Step 1: Mobile Number Input */}
        <AnimatePresence mode="wait">
          {!isOtpSent ? (
            <motion.form
              key="phone-step"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onSubmit={handleSendOtp}
              className="w-full"
            >
              <div className="flex items-end gap-2.5 w-full mb-6">
                <div className="flex flex-col">
                  <label className="font-mono text-xs text-[#857462] mb-1 uppercase tracking-wider">
                    Code
                  </label>
                  <div className="h-[52px] flex items-center justify-center px-4 bg-[#FDF9F3] border border-[#1A1A1A] rounded font-medium text-base text-[#1A1A1A]">
                    +91
                  </div>
                </div>
                <div className="flex flex-col flex-grow">
                  <label
                    htmlFor="mobile-number-input"
                    className="font-mono text-xs text-[#857462] mb-1 uppercase tracking-wider"
                  >
                    Mobile Number
                  </label>
                  <input
                    id="mobile-number-input"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="98765 43210"
                    required
                    className="h-[52px] w-full bg-[#FDF9F3] border border-[#1A1A1A] rounded px-4 font-mono text-base text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#4A5D23] focus:border-[#4A5D23] transition-all"
                  />
                </div>
              </div>

              {errorMessage && (
                <p className="text-[#BA1A1A] text-xs mb-4 text-center">{errorMessage}</p>
              )}

              <button
                type="submit"
                id="send-otp-btn"
                className="w-full h-12 bg-[#4A5D23] hover:bg-[#3d4d1d] active:bg-[#303c17] text-white rounded font-medium text-base transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Send OTP</span>
              </button>

              <div className="mt-6 p-3 bg-[#F1EDE8] rounded border border-[#D8C3AE]/60 text-xs text-[#534434] text-center">
                🔒 An SMS with a 4-digit security code will be sent to confirm your identity.
              </div>
            </motion.form>
          ) : (
            /* Step 2: OTP Verification */
            <motion.div
              key="otp-step"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="w-full"
            >
              <div className="text-center mb-6">
                <p className="text-[#534434] text-sm">
                  Enter the 4-digit code sent to{' '}
                  <span className="font-semibold text-[#1A1A1A] font-mono">
                    +91 {phoneNumber}
                  </span>
                </p>
                <button
                  onClick={() => setIsOtpSent(false)}
                  className="text-xs text-[#865300] hover:text-[#DA8A00] font-medium underline mt-1 cursor-pointer"
                >
                  Change number
                </button>
              </div>

              {/* Demo Helper Badge */}
              <div className="mb-6 p-2.5 bg-[#8EA462]/15 border border-[#4A5D23]/30 rounded-lg flex items-center justify-between text-xs text-[#4A5D23]">
                <span>Demo OTP: <strong className="font-mono text-sm">4821</strong></span>
                <button
                  onClick={fillDemoOtp}
                  className="px-2.5 py-1 bg-[#4A5D23] text-white rounded text-[11px] font-medium hover:bg-[#3d4d1d] cursor-pointer transition-colors"
                >
                  Auto-fill Demo
                </button>
              </div>

              {/* OTP Digits Grid */}
              <div className="flex justify-center gap-3.5 mb-6" onPaste={handlePaste}>
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={inputRefs[idx]}
                    id={`otp-input-${idx}`}
                    aria-label={`Digit ${idx + 1}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(idx, e)}
                    className="otp-input"
                  />
                ))}
              </div>

              {errorMessage && (
                <p className="text-[#BA1A1A] text-xs mb-4 text-center">{errorMessage}</p>
              )}

              {/* Resend Link */}
              <div className="text-center mb-6">
                <p className="font-mono text-xs text-[#534434]">Didn't receive the code?</p>
                {isResendDisabled ? (
                  <span className="font-mono text-xs text-[#857462] mt-1 inline-block">
                    Resend OTP in {timer}s
                  </span>
                ) : (
                  <button
                    onClick={() => {
                      setTimer(30);
                      setIsResendDisabled(true);
                      setErrorMessage('');
                    }}
                    className="font-mono text-xs text-[#4A5D23] underline mt-1 hover:text-opacity-80 cursor-pointer font-medium"
                  >
                    Resend OTP
                  </button>
                )}
              </div>

              {/* Verify Button */}
              <button
                onClick={handleVerify}
                disabled={isVerifying}
                id="verify-otp-btn"
                className={`w-full h-12 bg-[#4A5D23] hover:bg-[#3d4d1d] active:bg-[#303c17] text-white rounded font-medium text-base transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer ${
                  isVerifying ? 'opacity-70' : ''
                }`}
              >
                {isVerifying ? (
                  <>
                    <RotateCw className="w-5 h-5 animate-spin" />
                    <span>Verifying Code...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Verify</span>
                  </>
                )}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Nav Bar (Mobile Layout) */}
      <nav className="fixed bottom-0 left-0 w-full z-40 flex justify-between items-center px-6 py-3 bg-[#EBE8E3] border-t border-[#D8C3AE]/60">
        <button
          onClick={onBack}
          id="nav-back-phone-btn"
          className="flex flex-col items-center justify-center text-[#534434] px-6 py-1 hover:bg-[#DDD9D5] rounded-xl transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="font-mono text-xs">Back</span>
        </button>
        <button
          onClick={isOtpSent ? handleVerify : () => handleSendOtp()}
          disabled={isOtpSent && !isComplete}
          id="nav-next-phone-btn"
          className={`flex flex-col items-center justify-center bg-[#DA8A00] text-[#4B2D00] rounded-xl px-6 py-1 font-semibold transition-all ${
            isOtpSent && !isComplete
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-[#c47c00] active:scale-95 cursor-pointer shadow-sm'
          }`}
        >
          <ChevronRight className="w-5 h-5" />
          <span className="font-mono text-xs">Next</span>
        </button>
      </nav>
    </div>
  );
};
