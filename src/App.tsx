/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppScreen, UserProfile, SpiceBatch, UploadedDoc } from './types';
import { INITIAL_BATCHES } from './data/mockBatches';
import { WelcomeScreen } from './components/WelcomeScreen';
import { PhoneVerificationScreen } from './components/PhoneVerificationScreen';
import { ProfileSetupScreen } from './components/ProfileSetupScreen';
import { DocumentUploadScreen } from './components/DocumentUploadScreen';
import { ReviewSuccessScreen } from './components/ReviewSuccessScreen';
import { TraceabilityLedger } from './components/TraceabilityLedger';
import { NavigationDrawer } from './components/NavigationDrawer';
import { DeviceModeToggle } from './components/DeviceModeToggle';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('welcome');
  const [isMobileFrame, setIsMobileFrame] = useState<boolean>(false);

  const [profile, setProfile] = useState<UserProfile>({
    phoneNumber: '98765 43210',
    fullName: 'Anand Kumar',
    farmName: 'Sunrise Spices Collective',
    city: 'Guntur',
    state: 'Andhra Pradesh',
    spices: ['turmeric', 'chilli'],
    farmPhotoUrl:
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80',
    farmPhotoName: 'guntur_estate_overview.jpg',
    fssaiDoc: {
      name: 'fssai_license_guntur_2026.pdf',
      size: '1.8 MB',
      uploadedAt: 'Just now',
      type: 'application/pdf',
    },
    organicDoc: {
      name: 'organic_cert_2024.pdf',
      size: '2.4 MB',
      uploadedAt: 'Just now',
      type: 'application/pdf',
    },
    producerId: 'MT-PROD-2026-AP882',
    isVerified: true,
    traceabilityScore: 98,
  });

  const [batches, setBatches] = useState<SpiceBatch[]>(INITIAL_BATCHES);

  const handlePhoneVerified = (verifiedPhone: string) => {
    setProfile((prev) => ({ ...prev, phoneNumber: verifiedPhone }));
    setCurrentScreen('profile-setup');
  };

  const handleProfileUpdated = (updatedProfile: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...updatedProfile }));
    setCurrentScreen('upload-docs');
  };

  const handleDocsUploaded = (docs: {
    fssaiDoc: UploadedDoc | null;
    organicDoc: UploadedDoc | null;
    spicesBoardDoc: UploadedDoc | null;
  }) => {
    setProfile((prev) => ({
      ...prev,
      ...docs,
      traceabilityScore: docs.organicDoc ? 98 : 92,
      isVerified: true,
    }));
    setCurrentScreen('review-success');
  };

  const handleAddBatch = (newBatch: SpiceBatch) => {
    setBatches((prev) => [newBatch, ...prev]);
  };

  const handleReset = () => {
    setCurrentScreen('welcome');
  };

  // Render the active screen content
  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return (
          <WelcomeScreen
            onGetStarted={() => setCurrentScreen('verify-phone')}
            onSignIn={() => setCurrentScreen('trace-ledger')}
          />
        );
      case 'verify-phone':
        return (
          <PhoneVerificationScreen
            initialPhone={profile.phoneNumber}
            onVerified={handlePhoneVerified}
            onBack={() => setCurrentScreen('welcome')}
          />
        );
      case 'profile-setup':
        return (
          <ProfileSetupScreen
            initialProfile={profile}
            onContinue={handleProfileUpdated}
            onBack={() => setCurrentScreen('verify-phone')}
          />
        );
      case 'upload-docs':
        return (
          <DocumentUploadScreen
            initialProfile={profile}
            onProceed={handleDocsUploaded}
            onBack={() => setCurrentScreen('profile-setup')}
          />
        );
      case 'review-success':
        return (
          <ReviewSuccessScreen
            profile={profile}
            onOpenLedger={() => setCurrentScreen('trace-ledger')}
            onEditProfile={() => setCurrentScreen('profile-setup')}
          />
        );
      case 'trace-ledger':
        return (
          <TraceabilityLedger
            batches={batches}
            profile={profile}
            onAddBatch={handleAddBatch}
            onBackToOnboarding={() => setCurrentScreen('review-success')}
          />
        );
      default:
        return null;
    }
  };

  // Show desktop sidebar only when not on splash screen and in full-canvas mode
  const showDesktopSidebar = !isMobileFrame && currentScreen !== 'welcome';

  return (
    <div className="min-h-screen bg-[#F1EDE8] flex flex-col items-center justify-start relative selection:bg-[#DA8A00]/20 selection:text-[#1A1A1A]">
      {/* Floating Device Mode Switcher & Quick Navigation */}
      <DeviceModeToggle
        isMobileFrame={isMobileFrame}
        onToggleFrame={() => setIsMobileFrame((prev) => !prev)}
        currentScreen={currentScreen}
        onSelectScreen={setCurrentScreen}
        onReset={handleReset}
      />

      {isMobileFrame ? (
        /* Mobile Device Frame Mockup View (390px x 844px iPhone style matching the screenshots) */
        <div className="py-10 px-4 w-full flex items-center justify-center">
          <div className="w-[390px] min-h-[844px] max-h-[92vh] bg-[#FDF9F4] rounded-[42px] shadow-[0_24px_60px_rgba(26,26,26,0.25)] border-[8px] border-[#1A1A1A] relative overflow-hidden flex flex-col my-auto">
            {/* Dynamic Island / Speaker cutout */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-5 bg-[#1A1A1A] rounded-full z-50 pointer-events-none flex items-center justify-end pr-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#1A1A1A] border border-[#31302D]" />
            </div>

            {/* Scrollable phone content */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden pt-2">
              {renderScreen()}
            </div>
          </div>
        </div>
      ) : (
        /* Full Canvas Responsive View */
        <div className="w-full min-h-screen bg-[#FDF9F4] flex flex-col">
          {showDesktopSidebar && (
            <NavigationDrawer currentScreen={currentScreen} onNavigate={setCurrentScreen} />
          )}

          <div className={`flex-1 ${showDesktopSidebar ? 'lg:pl-64' : ''}`}>
            {renderScreen()}
          </div>
        </div>
      )}
    </div>
  );
}
