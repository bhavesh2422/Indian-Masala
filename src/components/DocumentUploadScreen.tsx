import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Upload,
  FileText,
  Trash2,
  RefreshCw,
  Check,
  CheckCircle2,
  Info,
  ShieldCheck,
  Lock,
  CloudUpload,
  Sparkles,
} from 'lucide-react';
import { UserProfile, UploadedDoc } from '../types';

interface DocumentUploadScreenProps {
  initialProfile: UserProfile;
  onProceed: (docs: {
    fssaiDoc: UploadedDoc | null;
    organicDoc: UploadedDoc | null;
    spicesBoardDoc: UploadedDoc | null;
  }) => void;
  onBack: () => void;
}

export const DocumentUploadScreen: React.FC<DocumentUploadScreenProps> = ({
  initialProfile,
  onProceed,
  onBack,
}) => {
  const [fssaiDoc, setFssaiDoc] = useState<UploadedDoc | null>(
    initialProfile.fssaiDoc !== undefined
      ? initialProfile.fssaiDoc
      : {
          name: 'fssai_license_guntur_2026.pdf',
          size: '1.8 MB',
          uploadedAt: 'Just now',
          type: 'application/pdf',
        }
  );

  const [organicDoc, setOrganicDoc] = useState<UploadedDoc | null>(
    initialProfile.organicDoc !== undefined
      ? initialProfile.organicDoc
      : {
          name: 'organic_cert_2024.pdf',
          size: '2.4 MB',
          uploadedAt: 'Just now',
          type: 'application/pdf',
        }
  );

  const [spicesBoardDoc, setSpicesBoardDoc] = useState<UploadedDoc | null>(
    initialProfile.spicesBoardDoc || null
  );

  const [errorMessage, setErrorMessage] = useState('');

  const fssaiInputRef = useRef<HTMLInputElement>(null);
  const organicInputRef = useRef<HTMLInputElement>(null);
  const spicesBoardInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    docType: 'fssai' | 'organic' | 'spicesBoard'
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const newDoc: UploadedDoc = {
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
        uploadedAt: 'Just now',
        type: file.type,
      };

      if (docType === 'fssai') setFssaiDoc(newDoc);
      if (docType === 'organic') setOrganicDoc(newDoc);
      if (docType === 'spicesBoard') setSpicesBoardDoc(newDoc);
      setErrorMessage('');
    }
  };

  const handleContinue = () => {
    if (!fssaiDoc) {
      setErrorMessage('FSSAI License is required for regulatory compliance');
      return;
    }
    onProceed({
      fssaiDoc,
      organicDoc,
      spicesBoardDoc,
    });
  };

  return (
    <div className="min-h-screen bg-[#FDF9F4] text-[#1C1C19] flex flex-col font-sans pb-24 md:pb-16">
      {/* Top App Bar */}
      <header className="sticky top-0 w-full z-40 flex justify-between items-center px-6 h-16 bg-[#FDF9F4] border-b border-[#E6E2DD]/80">
        <button
          onClick={onBack}
          id="docs-back-top-btn"
          className="text-[#865300] hover:bg-[#EBE8E3] transition-colors p-2 rounded-full flex items-center justify-center cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="font-serif text-xl sm:text-2xl font-bold text-[#865300] tracking-tight">
          MasalaTrace
        </h1>
        <div className="w-10" />
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-4xl mx-auto pt-6 pb-12 px-4 sm:px-6 flex flex-col gap-8">
        {/* Header & Stepper */}
        <section className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1C19]">
              Upload Documents
            </h1>
            <div className="font-mono text-xs text-[#4A5D23] font-semibold flex items-center gap-1.5 bg-[#8EA462]/20 px-3 py-1.5 rounded-full border border-[#4A5D23]/30">
              <ShieldCheck className="w-4 h-4" />
              Step 3 of 4
            </div>
          </div>

          <p className="text-[#534434] text-base leading-relaxed max-w-2xl">
            Please provide authentic documentation to verify your farm's origin and compliance.{' '}
            <span className="font-medium text-[#E67E22] flex items-center gap-1.5 mt-2">
              <Info className="w-4 h-4" />
              Verification may take 2–3 business days.
            </span>
          </p>

          {/* Stepper with Earthy Aesthetic */}
          <div className="flex items-center w-full max-w-md mt-2">
            <div className="flex flex-col items-center gap-1 flex-1">
              <div className="w-8 h-8 rounded-full bg-[#4A5D23] flex items-center justify-center text-white shadow-xs">
                <Check className="w-4 h-4" />
              </div>
              <span className="font-mono text-[11px] text-[#4A5D23] font-medium">Identity</span>
            </div>
            <div className="h-[2px] bg-[#4A5D23] flex-1 -mt-4" />
            <div className="flex flex-col items-center gap-1 flex-1">
              <div className="w-8 h-8 rounded-full bg-[#4A5D23] flex items-center justify-center text-white shadow-xs">
                <Check className="w-4 h-4" />
              </div>
              <span className="font-mono text-[11px] text-[#4A5D23] font-medium">Farm</span>
            </div>
            <div className="h-[2px] bg-[#4A5D23] flex-1 -mt-4" />
            <div className="flex flex-col items-center gap-1 flex-1">
              <div className="w-8 h-8 rounded-full bg-[#4A5D23] border-2 border-[#4A5D23] flex items-center justify-center text-white ring-4 ring-[#8EA462]/30 shadow-xs">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="font-mono text-[11px] text-[#4A5D23] font-bold">Docs</span>
            </div>
            <div className="h-[2px] bg-[#D8C3AE] flex-1 -mt-4" />
            <div className="flex flex-col items-center gap-1 flex-1">
              <div className="w-8 h-8 rounded-full bg-[#EBE8E3] border border-[#857462] flex items-center justify-center text-[#857462]">
                <span className="material-symbols-outlined text-sm">task_alt</span>
              </div>
              <span className="font-mono text-[11px] text-[#857462]">Finish</span>
            </div>
          </div>
        </section>

        {errorMessage && (
          <div className="p-3 bg-[#FFDAD6] border border-[#BA1A1A]/40 rounded-lg text-[#BA1A1A] text-sm">
            {errorMessage}
          </div>
        )}

        {/* Hidden inputs */}
        <input
          type="file"
          ref={fssaiInputRef}
          onChange={(e) => handleFileUpload(e, 'fssai')}
          accept=".pdf,.png,.jpg,.jpeg"
          className="hidden"
        />
        <input
          type="file"
          ref={organicInputRef}
          onChange={(e) => handleFileUpload(e, 'organic')}
          accept=".pdf,.png,.jpg,.jpeg"
          className="hidden"
        />
        <input
          type="file"
          ref={spicesBoardInputRef}
          onChange={(e) => handleFileUpload(e, 'spicesBoard')}
          accept=".pdf,.png,.jpg,.jpeg"
          className="hidden"
        />

        {/* Upload Slots Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* FSSAI Upload Slot */}
          <div className="flex flex-col justify-between p-6 rounded-xl bg-[#FDF9F3] border border-[#1A1A1A]/15 shadow-sm relative overflow-hidden group">
            <div>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-[#1A1A1A] flex items-center gap-1.5">
                    FSSAI License
                    <span className="text-[#BA1A1A] text-base">*</span>
                  </h3>
                  <p className="text-sm text-[#534434] mt-0.5">
                    Required for regulatory compliance.
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#F1EDE8] flex items-center justify-center text-[#857462]">
                  <FileText className="w-5 h-5" />
                </div>
              </div>

              {/* Upload or Uploaded Box */}
              {!fssaiDoc ? (
                <div
                  onClick={() => fssaiInputRef.current?.click()}
                  className="mt-4 border-2 border-dashed border-[#D8C3AE] rounded-lg p-7 flex flex-col items-center justify-center bg-white hover:border-[#DA8A00] hover:bg-[#FDF9F4] transition-all cursor-pointer"
                >
                  <CloudUpload className="w-10 h-10 text-[#D8C3AE] mb-2" />
                  <p className="text-sm text-[#865300] font-semibold">
                    Click to upload <span className="font-normal text-[#534434]">or drag & drop</span>
                  </p>
                  <p className="font-mono text-xs text-[#857462] mt-1">PDF, JPG, PNG (Max 5MB)</p>
                </div>
              ) : (
                <div className="mt-4 border border-[#4A5D23]/30 rounded-lg p-5 flex items-center justify-between bg-white shadow-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded bg-[#8EA462]/20 flex items-center justify-center text-[#4A5D23] border border-[#4A5D23]/20">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-[#1A1A1A] truncate max-w-[160px] sm:max-w-[200px]">
                        {fssaiDoc.name}
                      </span>
                      <span className="font-mono text-xs text-[#4A5D23] flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Uploaded successfully ({fssaiDoc.size})
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setFssaiDoc(null)}
                    className="text-[#857462] hover:text-[#BA1A1A] transition-colors p-2 rounded-full hover:bg-[#FFDAD6]/50 cursor-pointer"
                    title="Remove file"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Slot CTA */}
            {!fssaiDoc ? (
              <button
                onClick={() => fssaiInputRef.current?.click()}
                id="fssai-upload-btn"
                className="w-full mt-4 bg-[#DA8A00] hover:bg-[#c47c00] text-[#1A1A1A] font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
              >
                <Upload className="w-4 h-4" />
                <span>Upload Document</span>
              </button>
            ) : (
              <button
                onClick={() => fssaiInputRef.current?.click()}
                id="fssai-replace-btn"
                className="w-full mt-4 bg-transparent border border-[#B35B42]/40 text-[#B35B42] hover:bg-[#B35B42]/5 font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer text-sm"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Replace File</span>
              </button>
            )}
          </div>

          {/* Organic Certification Slot */}
          <div className="flex flex-col justify-between p-6 rounded-xl bg-[#FDF9F3] border border-[#1A1A1A]/15 shadow-sm relative overflow-hidden group">
            <div className="absolute inset-0 bg-[#8EA462]/5 pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-[#1A1A1A] flex items-center gap-2">
                    Organic Certification
                    <span className="font-mono text-xs font-normal text-[#857462] bg-[#EBE8E3] px-2 py-0.5 rounded-full">
                      Optional
                    </span>
                  </h3>
                  <p className="text-sm text-[#534434] mt-0.5">
                    Boosts traceability score & buyer demand.
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#4A5D23]/20 flex items-center justify-center text-[#4A5D23]">
                  <span
                    className="material-symbols-outlined text-2xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    eco
                  </span>
                </div>
              </div>

              {/* Upload or Uploaded Box */}
              {!organicDoc ? (
                <div
                  onClick={() => organicInputRef.current?.click()}
                  className="mt-4 border-2 border-dashed border-[#D8C3AE] rounded-lg p-7 flex flex-col items-center justify-center bg-white hover:border-[#4A5D23] hover:bg-[#FDF9F4] transition-all cursor-pointer"
                >
                  <CloudUpload className="w-10 h-10 text-[#D8C3AE] mb-2" />
                  <p className="text-sm text-[#4A5D23] font-semibold">
                    Click to upload <span className="font-normal text-[#534434]">or drag & drop</span>
                  </p>
                  <p className="font-mono text-xs text-[#857462] mt-1">NPOP / USDA / Jaivik Bharat (PDF)</p>
                </div>
              ) : (
                <div className="mt-4 border border-[#4A5D23]/30 rounded-lg p-5 flex items-center justify-between bg-white shadow-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded bg-[#8EA462]/20 flex items-center justify-center text-[#4A5D23] border border-[#4A5D23]/20">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-[#1A1A1A] truncate max-w-[160px] sm:max-w-[200px]">
                        {organicDoc.name}
                      </span>
                      <span className="font-mono text-xs text-[#4A5D23] flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Uploaded successfully ({organicDoc.size})
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setOrganicDoc(null)}
                    className="text-[#857462] hover:text-[#BA1A1A] transition-colors p-2 rounded-full hover:bg-[#FFDAD6]/50 cursor-pointer"
                    title="Remove file"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Slot CTA */}
            {!organicDoc ? (
              <button
                onClick={() => organicInputRef.current?.click()}
                id="organic-upload-btn"
                className="w-full mt-4 bg-[#4A5D23] hover:bg-[#3d4d1d] text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer relative z-10"
              >
                <Upload className="w-4 h-4" />
                <span>Upload Organic Certificate</span>
              </button>
            ) : (
              <button
                onClick={() => organicInputRef.current?.click()}
                id="organic-replace-btn"
                className="w-full mt-4 bg-transparent border border-[#B35B42]/40 text-[#B35B42] hover:bg-[#B35B42]/5 font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer text-sm relative z-10"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Replace File</span>
              </button>
            )}
          </div>
        </section>

        {/* Information Card */}
        <section className="bg-[#F7F3EE] border border-[#D8C3AE]/60 rounded-xl p-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
          <div className="w-14 h-14 shrink-0 rounded-full bg-[#EBE8E3] flex items-center justify-center text-[#857462]">
            <Lock className="w-7 h-7 text-[#4A5D23]" />
          </div>
          <div>
            <h4 className="text-base font-semibold text-[#1A1A1A] mb-1">
              Data Security & Compliance
            </h4>
            <p className="text-sm text-[#534434] leading-relaxed">
              Your documents are securely stored and only accessed by authorized compliance officers
              during the verification process. We adhere strictly to global data protection and
              APEDA / Spices Board traceability standards.
            </p>
          </div>
        </section>

        {/* Desktop Footer Actions */}
        <div className="hidden md:flex justify-between items-center pt-6 border-t border-[#E6E2DD] mt-4">
          <button
            type="button"
            onClick={onBack}
            id="docs-back-desktop-btn"
            className="px-8 py-3 rounded-lg border border-[#B35B42] text-[#B35B42] font-medium hover:bg-[#B35B42]/5 transition-colors cursor-pointer"
          >
            Back
          </button>
          <button
            type="button"
            onClick={handleContinue}
            id="docs-proceed-desktop-btn"
            className="px-8 py-3 rounded-lg bg-[#DA8A00] hover:bg-[#c47c00] active:bg-[#b06f00] text-[#1A1A1A] font-semibold transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <span>Proceed to Review</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </main>

      {/* Mobile Bottom Nav Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-40 flex justify-between items-center px-6 py-3 bg-[#EBE8E3] border-t border-[#D8C3AE]/60">
        <button
          onClick={onBack}
          id="docs-back-mobile-btn"
          className="flex flex-col items-center justify-center text-[#534434] px-6 py-1 hover:bg-[#DDD9D5] rounded-xl transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="font-mono text-xs">Back</span>
        </button>
        <button
          onClick={handleContinue}
          id="docs-next-mobile-btn"
          className="flex flex-col items-center justify-center bg-[#DA8A00] text-[#4B2D00] rounded-xl px-6 py-1 font-semibold hover:bg-[#c47c00] active:scale-95 transition-all shadow-sm cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
          <span className="font-mono text-xs">Next</span>
        </button>
      </nav>
    </div>
  );
};
