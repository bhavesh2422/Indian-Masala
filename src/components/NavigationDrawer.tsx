import React from 'react';
import { AppScreen } from '../types';

interface NavigationDrawerProps {
  currentScreen: AppScreen;
  onNavigate: (screen: AppScreen) => void;
}

export const NavigationDrawer: React.FC<NavigationDrawerProps> = ({ currentScreen, onNavigate }) => {
  const navItems: { screen: AppScreen; icon: string; label: string }[] = [
    { screen: 'verify-phone', icon: 'sms', label: 'Verification' },
    { screen: 'profile-setup', icon: 'person_pin_circle', label: 'Profile' },
    { screen: 'upload-docs', icon: 'verified_user', label: 'Certificates' },
    { screen: 'review-success', icon: 'task_alt', label: 'Success' },
    { screen: 'trace-ledger', icon: 'qr_code_2', label: 'Batches & QR' },
  ];

  return (
    <aside className="hidden lg:flex flex-col bg-[#FDF9F3] text-[#4A5D23] h-full rounded-r-3xl shadow-sm fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 py-6 px-4 border-r border-[#E6E2DD]">
      <div className="mb-8 px-4 pt-2">
        <span className="font-mono text-[11px] text-[#857462] uppercase tracking-wider block mb-1">
          Producer Onboarding
        </span>
        <h2 className="font-serif text-2xl font-bold text-[#DA8A00]">MasalaTrace</h2>
      </div>

      <nav className="flex flex-col gap-1.5 font-sans text-sm w-full">
        {navItems.map((item) => {
          const isActive = currentScreen === item.screen;
          return (
            <button
              key={item.screen}
              onClick={() => onNavigate(item.screen)}
              className={`flex items-center gap-3 px-4 py-3 rounded-full transition-all cursor-pointer text-left w-full ${
                isActive
                  ? 'bg-[#8EA462] text-[#283902] font-semibold shadow-xs'
                  : 'text-[#534434] hover:bg-[#E6E2DD]/60'
              }`}
            >
              <span
                className="material-symbols-outlined text-xl"
                style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
              >
                {item.icon}
              </span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto p-4 bg-[#F1EDE8] rounded-xl border border-[#D8C3AE]/60 text-xs text-[#534434]">
        <div className="flex items-center gap-1.5 text-[#4A5D23] font-semibold mb-1">
          <span className="material-symbols-outlined text-sm">shield</span>
          APEDA Compliant
        </div>
        <p className="text-[11px] leading-relaxed">
          Farmer verification connects directly to global buyers across EU, US & Middle East.
        </p>
      </div>
    </aside>
  );
};
