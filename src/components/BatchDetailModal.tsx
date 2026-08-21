import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Calendar,
  Layers,
  FileCheck,
  Sparkles,
  Download,
  Share2,
  Leaf,
  ThermometerSun,
  FlaskConical,
  Package,
} from 'lucide-react';
import { SpiceBatch, UserProfile } from '../types';

interface BatchDetailModalProps {
  batch: SpiceBatch | null;
  profile: UserProfile;
  onClose: () => void;
}

export const BatchDetailModal: React.FC<BatchDetailModalProps> = ({ batch, profile, onClose }) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  useEffect(() => {
    if (batch) {
      const tracePayload = JSON.stringify({
        app: 'MasalaTrace',
        batchId: batch.batchNumber,
        spice: batch.spiceName,
        origin: batch.origin,
        producer: profile.farmName,
        score: batch.traceabilityScore,
        labStatus: batch.labStatus,
        url: window.location.href,
      });

      QRCode.toDataURL(tracePayload, {
        width: 220,
        margin: 1.5,
        color: {
          dark: '#1A1A1A',
          light: '#FDF9F3',
        },
      })
        .then((url) => setQrDataUrl(url))
        .catch(() => {});
    }
  }, [batch, profile]);

  if (!batch) return null;

  const handleDownloadLabel = () => {
    if (!qrDataUrl) return;
    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = `${batch.batchNumber}-qr-label.png`;
    link.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-[#FDF9F4] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-[#D8C3AE] relative my-8">
        {/* Header */}
        <div className="sticky top-0 bg-[#FDF9F4] px-6 py-4 border-b border-[#E6E2DD] flex justify-between items-center z-10">
          <div>
            <span className="font-mono text-xs text-[#857462] uppercase tracking-wider block">
              Farm-to-Fork Traceability Passport
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#865300]">{batch.spiceName}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#857462] hover:bg-[#EBE8E3] transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Top QR & Quick Summary Box */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-white p-5 rounded-xl border border-[#D8C3AE]/60 shadow-xs items-center">
            {/* QR Image Box */}
            <div className="flex flex-col items-center justify-center text-center">
              {qrDataUrl ? (
                <img
                  src={qrDataUrl}
                  alt={`QR Code for ${batch.batchNumber}`}
                  className="w-36 h-36 rounded-lg border border-[#1A1A1A]/20 shadow-xs"
                />
              ) : (
                <div className="w-36 h-36 bg-[#F1EDE8] rounded-lg animate-pulse" />
              )}
              <span className="font-mono text-xs font-bold text-[#1A1A1A] mt-2">
                {batch.batchNumber}
              </span>
              <button
                onClick={handleDownloadLabel}
                className="mt-2 text-xs text-[#DA8A00] hover:text-[#865300] font-semibold flex items-center gap-1 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" /> Download QR
              </button>
            </div>

            {/* Metrics & Origin */}
            <div className="sm:col-span-2 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs bg-[#4A5D23]/15 text-[#4A5D23] px-2.5 py-1 rounded-full font-semibold border border-[#4A5D23]/30 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {batch.labStatus}
                </span>
                <span className="font-mono text-sm font-bold text-[#DA8A00] bg-[#DA8A00]/10 px-2.5 py-0.5 rounded">
                  Score: {batch.traceabilityScore}/100
                </span>
              </div>

              <div>
                <p className="text-sm font-semibold text-[#1A1A1A]">{batch.spiceVariant}</p>
                <p className="text-xs text-[#534434] flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[#B35B42]" />
                  {batch.origin}
                </p>
                <p className="font-mono text-xs text-[#857462] mt-0.5">
                  GPS: {batch.gpsCoordinates}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#E6E2DD]">
                <div className="bg-[#FDF9F3] p-2 rounded">
                  <span className="font-mono text-[11px] text-[#857462] block">Key Active</span>
                  <span className="text-xs font-semibold text-[#865300]">{batch.keyMetric}</span>
                </div>
                <div className="bg-[#FDF9F3] p-2 rounded">
                  <span className="font-mono text-[11px] text-[#857462] block">Lot Weight</span>
                  <span className="text-xs font-semibold text-[#1A1A1A]">
                    {batch.lotWeightKg} kg
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Farmer Story & Soil Narrative */}
          <div className="bg-[#F7F3EE] p-4 rounded-xl border border-[#D8C3AE]/60">
            <h4 className="text-sm font-semibold text-[#1A1A1A] flex items-center gap-1.5 mb-1.5">
              <Leaf className="w-4 h-4 text-[#4A5D23]" />
              Cultivation & Harvest Story
            </h4>
            <p className="text-xs text-[#534434] leading-relaxed italic">
              "{batch.farmerStory}"
            </p>
          </div>

          {/* Traceability Journey Timeline */}
          <div>
            <h4 className="font-serif text-lg font-bold text-[#865300] mb-3">
              Provenance Journey
            </h4>
            <div className="space-y-3 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-[#D8C3AE]">
              {[
                {
                  icon: Leaf,
                  title: 'Single-Estate Cultivation',
                  desc: `Nurtured at ${profile.farmName}, ${profile.city}. Organically fertilized with zero synthetic chemicals.`,
                  date: batch.harvestDate,
                },
                {
                  icon: ThermometerSun,
                  title: 'Solar Dehydration & Grading',
                  desc: 'Naturally sun-cured on food-grade solar racks to achieve ideal moisture balance (< 10%).',
                  date: `${batch.harvestDate} (+3 days)`,
                },
                {
                  icon: FlaskConical,
                  title: `NABL Lab Testing (${batch.testingLab})`,
                  desc: `Assayed for active compounds (${batch.keyMetric}) and 0.00% pesticide residues.`,
                  date: batch.packagingDate,
                },
                {
                  icon: Package,
                  title: 'Vacuum Packaged & Traceability Sealed',
                  desc: `Official FSSAI Lic #${batch.fssaiLicenseNo} applied. Traceability passport generated.`,
                  date: batch.packagingDate,
                },
              ].map((step, idx) => (
                <div key={idx} className="relative flex items-start gap-4 pl-1">
                  <div className="w-7 h-7 rounded-full bg-[#4A5D23] text-white flex items-center justify-center shrink-0 z-10 ring-4 ring-[#FDF9F4]">
                    <step.icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-[#D8C3AE]/60 flex-1">
                    <div className="flex justify-between items-center mb-0.5">
                      <span className="text-xs font-semibold text-[#1A1A1A]">{step.title}</span>
                      <span className="font-mono text-[10px] text-[#857462]">{step.date}</span>
                    </div>
                    <p className="text-xs text-[#534434]">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-[#FDF9F4] p-4 border-t border-[#E6E2DD] flex justify-end gap-3">
          <button
            onClick={handleDownloadLabel}
            className="px-4 py-2 bg-[#DA8A00] hover:bg-[#c47c00] text-[#1A1A1A] rounded-lg font-semibold text-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" /> Download QR Label
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 border border-[#857462] text-[#1A1A1A] hover:bg-[#EBE8E3] rounded-lg font-medium text-xs cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
