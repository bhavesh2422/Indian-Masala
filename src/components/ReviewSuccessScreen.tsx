import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Award,
  QrCode,
  Download,
  ArrowRight,
  ShieldCheck,
  Building2,
  MapPin,
  Check,
  Layers,
  Sparkles,
  ExternalLink,
  Copy,
} from 'lucide-react';
import { UserProfile } from '../types';

interface ReviewSuccessScreenProps {
  profile: UserProfile;
  onOpenLedger: () => void;
  onEditProfile: () => void;
}

export const ReviewSuccessScreen: React.FC<ReviewSuccessScreenProps> = ({
  profile,
  onOpenLedger,
  onEditProfile,
}) => {
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    // Fire celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#DA8A00', '#4A5D23', '#8B2612', '#B35B42'],
      });
    } catch {
      // ignore in environments without canvas support
    }
  }, []);

  const handleCopyId = () => {
    navigator.clipboard.writeText(profile.producerId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadSummary = () => {
    const summaryText = `
MASALATRACE PRODUCER ONBOARDING SUMMARY
=======================================
Producer ID: ${profile.producerId}
Farmer Name: ${profile.fullName}
Farm Name: ${profile.farmName}
Location: ${profile.city}, ${profile.state}
Contact: +91 ${profile.phoneNumber}
Traceability Score: ${profile.traceabilityScore} / 100
Status: Verified & Active

Spices Registered:
${profile.spices.map((s) => ` - ${s.toUpperCase()}`).join('\n')}

Compliance & Documentation:
 - FSSAI License: ${profile.fssaiDoc?.name || 'Verified'}
 - Organic Certificate: ${profile.organicDoc?.name || 'Verified (Optional)'}

Verified by: MasalaTrace Global Assurance Protocol
=======================================
    `.trim();

    const blob = new Blob([summaryText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${profile.producerId}-onboarding-certificate.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#FDF9F4] text-[#1C1C19] flex flex-col font-sans pb-24 md:pb-16">
      {/* Top Header */}
      <header className="sticky top-0 w-full z-40 flex justify-between items-center px-6 h-16 bg-[#FDF9F4] border-b border-[#E6E2DD]/80">
        <h1 className="font-serif text-xl sm:text-2xl font-bold text-[#865300] tracking-tight">
          MasalaTrace
        </h1>
        <div className="font-mono text-xs text-[#4A5D23] font-semibold flex items-center gap-1 bg-[#8EA462]/20 px-3 py-1 rounded-full border border-[#4A5D23]/30">
          <CheckCircle2 className="w-3.5 h-3.5" />
          Onboarding Complete
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-3xl mx-auto pt-6 pb-12 px-4 sm:px-6 flex flex-col items-center">
        {/* Stepper (All 4 steps complete) */}
        <div className="flex items-center w-full max-w-md mb-8">
          {['Identity', 'Farm', 'Docs', 'Success'].map((step, idx) => (
            <React.Fragment key={step}>
              <div className="flex flex-col items-center gap-1 flex-1">
                <div className="w-8 h-8 rounded-full bg-[#4A5D23] flex items-center justify-center text-white shadow-xs">
                  <Check className="w-4 h-4" />
                </div>
                <span className="font-mono text-[11px] text-[#4A5D23] font-bold">{step}</span>
              </div>
              {idx < 3 && <div className="h-[2px] bg-[#4A5D23] flex-1 -mt-4" />}
            </React.Fragment>
          ))}
        </div>

        {/* Hero Success Icon & Message */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="w-20 h-20 mx-auto rounded-full bg-[#4A5D23]/15 border-2 border-[#4A5D23] flex items-center justify-center text-[#4A5D23] mb-4 shadow-[0_8px_24px_rgba(74,93,35,0.15)]">
            <Award className="w-10 h-10 text-[#4A5D23]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1C19] mb-2">
            Profile Submitted & Verified!
          </h2>
          <p className="text-[#534434] text-base max-w-lg mx-auto leading-relaxed">
            Welcome to the MasalaTrace network. Your farm credentials are authenticated and ready to
            generate verifiable spice QR passports.
          </p>
        </motion.div>

        {/* Digital Producer Passport Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="w-full bg-white rounded-2xl p-6 sm:p-8 border border-[#D8C3AE] shadow-md relative overflow-hidden mb-8"
        >
          {/* Top Seal Badge */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-[#E6E2DD]">
            <div>
              <span className="font-mono text-xs font-semibold text-[#857462] uppercase tracking-wider block mb-1">
                Official Producer Passport
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#865300]">{profile.farmName}</h3>
              <p className="text-sm text-[#534434] flex items-center gap-1.5 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-[#B35B42]" />
                {profile.city}, {profile.state}, India
              </p>
            </div>

            <div className="flex flex-col items-end">
              <span className="font-mono text-xs text-[#4A5D23] bg-[#8EA462]/20 px-3 py-1 rounded-full font-bold border border-[#4A5D23]/30 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Level 1 Verified
              </span>
              <div className="flex items-center gap-1.5 mt-2 bg-[#FDF9F3] border border-[#D8C3AE] px-2.5 py-1 rounded">
                <span className="font-mono text-xs text-[#1A1A1A] font-semibold">
                  {profile.producerId}
                </span>
                <button
                  onClick={handleCopyId}
                  className="text-[#857462] hover:text-[#1A1A1A] transition-colors cursor-pointer"
                  title="Copy ID"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
              {copied && <span className="font-mono text-[10px] text-[#4A5D23]">Copied!</span>}
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6 border-b border-[#E6E2DD]">
            <div className="bg-[#FDF9F3] p-3.5 rounded-lg border border-[#D8C3AE]/60">
              <span className="font-mono text-xs text-[#857462] block mb-1">Lead Grower</span>
              <p className="text-sm font-semibold text-[#1A1A1A]">{profile.fullName}</p>
              <p className="font-mono text-xs text-[#534434] mt-0.5">+91 {profile.phoneNumber}</p>
            </div>

            <div className="bg-[#FDF9F3] p-3.5 rounded-lg border border-[#D8C3AE]/60">
              <span className="font-mono text-xs text-[#857462] block mb-1">Traceability Score</span>
              <div className="flex items-baseline gap-1.5">
                <span className="font-mono text-2xl font-bold text-[#DA8A00]">
                  {profile.traceabilityScore}
                </span>
                <span className="font-mono text-xs text-[#534434]">/ 100 (Tier A)</span>
              </div>
              <span className="font-mono text-[11px] text-[#4A5D23] font-medium flex items-center gap-1 mt-0.5">
                <Sparkles className="w-3 h-3" /> NABL Quality Certified
              </span>
            </div>

            <div className="bg-[#FDF9F3] p-3.5 rounded-lg border border-[#D8C3AE]/60">
              <span className="font-mono text-xs text-[#857462] block mb-1">Certifications</span>
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-xs text-[#4A5D23] font-medium">
                  <CheckCircle2 className="w-3 h-3" /> FSSAI Active
                </div>
                {profile.organicDoc && (
                  <div className="flex items-center gap-1 text-xs text-[#4A5D23] font-medium">
                    <CheckCircle2 className="w-3 h-3" /> Organic NPOP Verified
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Registered Spices */}
          <div className="pt-5">
            <span className="font-mono text-xs text-[#857462] uppercase tracking-wider block mb-2">
              Registered Spices for Traceability:
            </span>
            <div className="flex flex-wrap gap-2">
              {profile.spices.map((spice) => (
                <span
                  key={spice}
                  className="capitalize font-mono text-xs bg-[#DA8A00]/15 text-[#865300] font-semibold px-3 py-1 rounded-full border border-[#DA8A00]/30"
                >
                  🌾 {spice}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <div className="w-full flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onOpenLedger}
            id="open-ledger-btn"
            className="flex-1 bg-[#DA8A00] hover:bg-[#c47c00] active:bg-[#b06f00] text-[#1A1A1A] font-semibold text-base py-3.5 px-6 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <Layers className="w-5 h-5" />
            <span>Farm Batch Ledger & QR Explorer</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={handleDownloadSummary}
            id="download-summary-btn"
            className="flex-1 bg-white border border-[#B35B42] text-[#B35B42] hover:bg-[#B35B42]/5 font-semibold text-base py-3.5 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <Download className="w-5 h-5" />
            <span>Download Verified Passport</span>
          </button>
        </div>

        <button
          onClick={onEditProfile}
          className="mt-6 text-sm text-[#857462] hover:text-[#1A1A1A] underline cursor-pointer"
        >
          Edit Profile Information
        </button>
      </main>
    </div>
  );
};
