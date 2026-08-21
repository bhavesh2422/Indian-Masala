import React from 'react';
import { Smartphone, Monitor, RotateCcw, ChevronRight } from 'lucide-react';
import { AppScreen } from '../types';

interface DeviceModeToggleProps {
  isMobileFrame: boolean;
  onToggleFrame: () => void;
  currentScreen: AppScreen;
  onSelectScreen: (screen: AppScreen) => void;
  onReset: () => void;
}

export const DeviceModeToggle: React.FC<DeviceModeToggleProps> = ({
  isMobileFrame,
  onToggleFrame,
  currentScreen,
  onSelectScreen,
  onReset,
}) => {
  const screens: { id: AppScreen; label: string; number: string }[] = [
    { id: 'welcome', label: '1. Welcome', number: '1' },
    { id: 'verify-phone', label: '2. Verify OTP', number: '2' },
    { id: 'profile-setup', label: '3. Farm Profile', number: '3' },
    { id: 'upload-docs', label: '4. Upload Docs', number: '4' },
    { id: 'review-success', label: '5. Verified Passport', number: '5' },
    { id: 'trace-ledger', label: '6. Batch QR Ledger', number: '6' },
  ];

  return (
    <div className="fixed top-3 right-3 sm:right-6 z-50 flex items-center gap-2 bg-[#1A1A1A]/90 text-white p-1.5 rounded-full shadow-xl backdrop-blur-md border border-white/20 text-xs font-mono">
      {/* Frame Mode Toggle */}
      <button
        onClick={onToggleFrame}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all cursor-pointer ${
          isMobileFrame
            ? 'bg-[#DA8A00] text-[#1A1A1A] font-bold shadow-xs'
            : 'bg-white/10 text-white hover:bg-white/20'
        }`}
        title="Toggle Mobile Device Frame"
      >
        {isMobileFrame ? (
          <>
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Mobile Frame (390px)</span>
            <span className="sm:hidden">Phone</span>
          </>
        ) : (
          <>
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Full Canvas</span>
            <span className="sm:hidden">Full</span>
          </>
        )}
      </button>

      {/* Screen Selector Dropdown */}
      <div className="relative">
        <select
          value={currentScreen}
          onChange={(e) => onSelectScreen(e.target.value as AppScreen)}
          className="bg-white/10 hover:bg-white/20 text-white text-[11px] font-mono px-2.5 py-1.5 rounded-full border border-white/15 focus:outline-none focus:ring-1 focus:ring-[#DA8A00] appearance-none pr-6 cursor-pointer"
        >
          {screens.map((sc) => (
            <option key={sc.id} value={sc.id} className="bg-[#1A1A1A] text-white">
              Screen: {sc.label}
            </option>
          ))}
        </select>
        <ChevronRight className="w-3 h-3 text-white/70 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none rotate-90" />
      </div>

      {/* Reset Flow Button */}
      <button
        onClick={onReset}
        className="p-1.5 text-white/80 hover:text-[#DA8A00] hover:bg-white/10 rounded-full transition-colors cursor-pointer"
        title="Reset to Start"
      >
        <RotateCcw className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
