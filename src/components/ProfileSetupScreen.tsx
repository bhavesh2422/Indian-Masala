import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  User,
  Tractor,
  MapPin,
  Camera,
  Check,
  CheckCircle2,
  Trash2,
  Image as ImageIcon,
  Sparkles,
} from 'lucide-react';
import { UserProfile } from '../types';

interface ProfileSetupScreenProps {
  initialProfile: UserProfile;
  onContinue: (updatedProfile: Partial<UserProfile>) => void;
  onBack: () => void;
}

interface SpiceOption {
  id: string;
  name: string;
  materialIcon: string;
  colorClass: string;
  bgActive: string;
  borderColor: string;
  variety: string;
}

const AVAILABLE_SPICES: SpiceOption[] = [
  {
    id: 'turmeric',
    name: 'Turmeric',
    materialIcon: 'psychiatry',
    colorClass: 'text-[#DA8A00]',
    bgActive: 'bg-[#DA8A00]/10',
    borderColor: 'border-[#DA8A00]',
    variety: 'High Curcumin (Lakadong / Salem)',
  },
  {
    id: 'chilli',
    name: 'Chilli',
    materialIcon: 'local_fire_department',
    colorClass: 'text-[#8B2612]',
    bgActive: 'bg-[#8B2612]/10',
    borderColor: 'border-[#8B2612]',
    variety: 'Guntur S4 / Byadgi',
  },
  {
    id: 'cumin',
    name: 'Cumin',
    materialIcon: 'grain',
    colorClass: 'text-[#4A5D23]',
    bgActive: 'bg-[#4A5D23]/10',
    borderColor: 'border-[#4A5D23]',
    variety: 'Nagaur Bold / Unjha Desi',
  },
  {
    id: 'cardamom',
    name: 'Cardamom',
    materialIcon: 'yard',
    colorClass: 'text-[#4A5D23]',
    bgActive: 'bg-[#4A5D23]/10',
    borderColor: 'border-[#4A5D23]',
    variety: 'Alleppey Green Extra Bold 8mm',
  },
  {
    id: 'black-pepper',
    name: 'Black Pepper',
    materialIcon: 'scatter_plot',
    colorClass: 'text-[#1A1A1A]',
    bgActive: 'bg-[#1A1A1A]/10',
    borderColor: 'border-[#1A1A1A]',
    variety: 'Malabar / Tellicherry Garbled',
  },
  {
    id: 'coriander',
    name: 'Coriander',
    materialIcon: 'grass',
    colorClass: 'text-[#8EA462]',
    bgActive: 'bg-[#8EA462]/15',
    borderColor: 'border-[#4A5D23]',
    variety: 'Ramganj Mandi Green',
  },
];

const INDIAN_STATES = [
  'Andhra Pradesh',
  'Karnataka',
  'Kerala',
  'Maharashtra',
  'Tamil Nadu',
  'Rajasthan',
  'Gujarat',
  'Madhya Pradesh',
  'Meghalaya',
  'Telangana',
  'Odisha',
  'Assam',
];

export const ProfileSetupScreen: React.FC<ProfileSetupScreenProps> = ({
  initialProfile,
  onContinue,
  onBack,
}) => {
  const [fullName, setFullName] = useState(initialProfile.fullName || 'Anand Kumar');
  const [farmName, setFarmName] = useState(initialProfile.farmName || 'Sunrise Spices Collective');
  const [city, setCity] = useState(initialProfile.city || 'Guntur');
  const [state, setState] = useState(initialProfile.state || 'Andhra Pradesh');
  const [selectedSpices, setSelectedSpices] = useState<string[]>(
    initialProfile.spices?.length > 0 ? initialProfile.spices : ['turmeric', 'chilli']
  );
  const [farmPhotoUrl, setFarmPhotoUrl] = useState<string | undefined>(
    initialProfile.farmPhotoUrl || 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80'
  );
  const [farmPhotoName, setFarmPhotoName] = useState<string | undefined>(
    initialProfile.farmPhotoName || 'guntur_estate_overview.jpg'
  );
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleSpice = (spiceId: string) => {
    setSelectedSpices((prev) =>
      prev.includes(spiceId) ? prev.filter((id) => id !== spiceId) : [...prev, spiceId]
    );
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFarmPhotoUrl(event.target?.result as string);
        setFarmPhotoName(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setFarmPhotoUrl(undefined);
    setFarmPhotoName(undefined);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!farmName.trim()) newErrors.farmName = 'Farm or cooperative name is required';
    if (!city.trim()) newErrors.city = 'City or district is required';
    if (!state) newErrors.state = 'Please select your state';
    if (selectedSpices.length === 0) newErrors.spices = 'Select at least one spice grown';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onContinue({
      fullName,
      farmName,
      city,
      state,
      spices: selectedSpices,
      farmPhotoUrl,
      farmPhotoName,
    });
  };

  return (
    <div className="min-h-screen bg-[#FDF9F4] text-[#1C1C19] flex flex-col font-sans pb-24 md:pb-12">
      {/* Mobile Top App Bar */}
      <header className="sticky top-0 w-full z-40 flex justify-between items-center px-6 h-16 bg-[#FDF9F4] border-b border-[#E6E2DD]/80">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            id="profile-back-top-btn"
            className="text-[#865300] hover:bg-[#EBE8E3] transition-colors p-2 rounded-full flex items-center justify-center cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="font-serif text-xl sm:text-2xl font-bold text-[#865300] tracking-tight">
            MasalaTrace
          </h1>
        </div>
        <span className="font-mono text-xs text-[#534434] bg-[#F1EDE8] px-2.5 py-1 rounded-full border border-[#D8C3AE]/60">
          Step 2 of 4
        </span>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow p-4 sm:p-6 md:p-10 flex justify-center">
        <div className="w-full max-w-2xl">
          {/* Stepper (Matching Mockup exactly) */}
          <div className="flex justify-between items-center mb-6 px-2">
            <div className="flex items-center gap-2">
              {/* Step 1 Completed */}
              <div className="w-8 h-8 rounded-full bg-[#4A5D23] flex items-center justify-center text-white shadow-sm">
                <Check className="w-4 h-4" />
              </div>
              <div className="h-1 w-8 bg-[#4A5D23] rounded-full" />
              {/* Step 2 Active */}
              <div className="w-8 h-8 rounded-full bg-[#8EA462] border-2 border-[#8EA462] flex items-center justify-center text-[#283902] font-bold font-mono text-xs">
                2
              </div>
              <div className="h-1 w-8 bg-[#E6E2DD] rounded-full" />
              {/* Step 3 Pending */}
              <div className="w-8 h-8 rounded-full border-2 border-[#E6E2DD] flex items-center justify-center text-[#534434] font-bold font-mono text-xs">
                3
              </div>
            </div>
            <span className="font-mono text-xs text-[#534434] uppercase tracking-wider font-semibold">
              STEP 2 OF 4
            </span>
          </div>

          {/* Form Container Card */}
          <div className="bg-white rounded-xl p-6 sm:p-8 md:p-10 shadow-sm border border-[#B35B42]/20 relative overflow-hidden">
            {/* Decorative Botanical Leaf Graphic */}
            <div className="absolute top-0 right-0 -mt-8 -mr-8 opacity-10 pointer-events-none text-[#4A5D23]">
              <span
                className="material-symbols-outlined text-[160px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                eco
              </span>
            </div>

            {/* Header */}
            <div className="mb-8 relative z-10">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#865300] tracking-tight mb-2">
                Create Your Profile
              </h2>
              <p className="text-[#534434] text-base leading-relaxed">
                Tell us about your farm to connect with global buyers.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="full-name-input"
                  className="block text-sm font-medium text-[#1C1C19] mb-1.5"
                >
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#534434]">
                    <User className="w-5 h-5" />
                  </div>
                  <input
                    id="full-name-input"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Anand Kumar"
                    className="block w-full pl-11 pr-4 py-3 bg-[#FDF9F3] border border-[#1A1A1A] rounded-lg text-[#1C1C19] placeholder-[#857462] focus:outline-none focus:ring-2 focus:ring-[#DA8A00] focus:border-[#DA8A00] transition-all text-base"
                  />
                </div>
                {errors.fullName && (
                  <p className="text-[#BA1A1A] text-xs mt-1">{errors.fullName}</p>
                )}
              </div>

              {/* Farm / Co-operative Name */}
              <div>
                <label
                  htmlFor="farm-name-input"
                  className="block text-sm font-medium text-[#1C1C19] mb-1.5"
                >
                  Farm / Co-operative Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#534434]">
                    <Tractor className="w-5 h-5" />
                  </div>
                  <input
                    id="farm-name-input"
                    type="text"
                    value={farmName}
                    onChange={(e) => setFarmName(e.target.value)}
                    placeholder="e.g. Sunrise Spices Collective"
                    className="block w-full pl-11 pr-4 py-3 bg-[#FDF9F3] border border-[#1A1A1A] rounded-lg text-[#1C1C19] placeholder-[#857462] focus:outline-none focus:ring-2 focus:ring-[#DA8A00] focus:border-[#DA8A00] transition-all text-base"
                  />
                </div>
                {errors.farmName && (
                  <p className="text-[#BA1A1A] text-xs mt-1">{errors.farmName}</p>
                )}
              </div>

              {/* Location: City/District & State */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="city-input"
                    className="block text-sm font-medium text-[#1C1C19] mb-1.5"
                  >
                    City / District
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#534434]">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <input
                      id="city-input"
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Guntur"
                      className="block w-full pl-11 pr-4 py-3 bg-[#FDF9F3] border border-[#1A1A1A] rounded-lg text-[#1C1C19] placeholder-[#857462] focus:outline-none focus:ring-2 focus:ring-[#DA8A00] focus:border-[#DA8A00] transition-all text-base"
                    />
                  </div>
                  {errors.city && (
                    <p className="text-[#BA1A1A] text-xs mt-1">{errors.city}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="state-select"
                    className="block text-sm font-medium text-[#1C1C19] mb-1.5"
                  >
                    State
                  </label>
                  <div className="relative">
                    <select
                      id="state-select"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="block w-full pl-4 pr-10 py-3 bg-[#FDF9F3] border border-[#1A1A1A] rounded-lg text-[#1C1C19] focus:outline-none focus:ring-2 focus:ring-[#DA8A00] focus:border-[#DA8A00] appearance-none text-base cursor-pointer"
                    >
                      <option value="" disabled>
                        Select State
                      </option>
                      {INDIAN_STATES.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-[#534434]">
                      <span className="material-symbols-outlined">arrow_drop_down</span>
                    </div>
                  </div>
                  {errors.state && (
                    <p className="text-[#BA1A1A] text-xs mt-1">{errors.state}</p>
                  )}
                </div>
              </div>

              {/* Spices Grown Multi-select */}
              <div>
                <label className="block text-sm font-medium text-[#1C1C19] mb-2">
                  Spices Grown (Select all that apply)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {AVAILABLE_SPICES.map((spice) => {
                    const isChecked = selectedSpices.includes(spice.id);
                    return (
                      <button
                        type="button"
                        key={spice.id}
                        onClick={() => toggleSpice(spice.id)}
                        id={`spice-select-${spice.id}`}
                        className={`cursor-pointer relative p-3 rounded-lg border text-center transition-all flex flex-col items-center justify-center ${
                          isChecked
                            ? `${spice.bgActive} ${spice.borderColor} shadow-sm ring-1 ${spice.borderColor}`
                            : 'bg-[#FDF9F3] border-[#1A1A1A]/20 hover:border-[#1A1A1A]/50'
                        }`}
                      >
                        <span
                          className={`material-symbols-outlined mb-1 text-2xl ${spice.colorClass}`}
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          {spice.materialIcon}
                        </span>
                        <span className="font-mono text-xs font-semibold text-[#1C1C19]">
                          {spice.name}
                        </span>

                        {isChecked && (
                          <div className="absolute top-1.5 right-1.5 text-[#4A5D23]">
                            <CheckCircle2 className="w-4 h-4 fill-[#4A5D23] text-white" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
                {errors.spices && (
                  <p className="text-[#BA1A1A] text-xs mt-1">{errors.spices}</p>
                )}
              </div>

              {/* Farm Photo Upload Area */}
              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handlePhotoUpload}
                  accept="image/*"
                  className="hidden"
                  id="farm-photo-file-input"
                />

                {farmPhotoUrl ? (
                  <div className="mt-4 border border-[#4A5D23]/30 rounded-xl p-4 bg-[#8EA462]/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={farmPhotoUrl}
                        alt="Farm Overview"
                        className="w-14 h-14 rounded-lg object-cover border border-[#4A5D23]/30 shadow-xs"
                      />
                      <div>
                        <p className="text-sm font-semibold text-[#1A1A1A] truncate max-w-[200px]">
                          {farmPhotoName || 'Farm Photo Uploaded'}
                        </p>
                        <span className="font-mono text-xs text-[#4A5D23] flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> High-res Verified
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-3 py-1.5 bg-white border border-[#D8C3AE] text-xs font-medium text-[#534434] rounded-md hover:bg-[#F1EDE8] transition-colors cursor-pointer"
                      >
                        Change
                      </button>
                      <button
                        type="button"
                        onClick={handleRemovePhoto}
                        className="p-1.5 text-[#BA1A1A] hover:bg-[#FFDAD6] rounded-md transition-colors cursor-pointer"
                        title="Remove photo"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="mt-4 border-2 border-dashed border-[#D8C3AE] rounded-xl p-6 flex flex-col items-center justify-center bg-[#FDF9F3]/60 cursor-pointer hover:bg-[#FDF9F3] hover:border-[#DA8A00] transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#EBE8E3] group-hover:bg-[#DA8A00]/15 group-hover:text-[#DA8A00] flex items-center justify-center text-[#534434] mb-2 transition-colors">
                      <Camera className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-medium text-[#1C1C19]">
                      Add Farm Photo (Optional)
                    </span>
                    <span className="font-mono text-xs text-[#534434] mt-1 text-center">
                      Show buyers where your spices grow. JPG or PNG up to 5MB.
                    </span>
                  </div>
                )}
              </div>

              {/* Desktop Actions */}
              <div className="hidden md:flex justify-between items-center pt-6 border-t border-[#E6E2DD] mt-8">
                <button
                  type="button"
                  onClick={onBack}
                  id="profile-back-desktop-btn"
                  className="px-6 py-3 rounded-xl border border-[#B35B42] text-[#B35B42] font-medium hover:bg-[#B35B42]/5 transition-colors cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="submit"
                  id="profile-continue-desktop-btn"
                  className="px-8 py-3 rounded-xl bg-[#DA8A00] hover:bg-[#c47c00] active:bg-[#b06f00] text-[#1A1A1A] font-semibold transition-all shadow-[0_4px_12px_rgba(139,38,18,0.1)] flex items-center gap-2 cursor-pointer"
                >
                  <span>Continue Setup</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Nav Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-40 flex justify-between items-center px-6 py-3 bg-[#EBE8E3] border-t border-[#D8C3AE]/60">
        <button
          onClick={onBack}
          id="profile-back-mobile-btn"
          className="flex flex-col items-center justify-center text-[#534434] px-6 py-1 hover:bg-[#DDD9D5] rounded-xl transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="font-mono text-xs">Back</span>
        </button>
        <button
          onClick={() => handleSubmit()}
          id="profile-next-mobile-btn"
          className="flex flex-col items-center justify-center bg-[#DA8A00] text-[#4B2D00] rounded-xl px-6 py-1 font-semibold hover:bg-[#c47c00] active:scale-95 transition-all shadow-sm cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
          <span className="font-mono text-xs">Next</span>
        </button>
      </nav>
    </div>
  );
};
