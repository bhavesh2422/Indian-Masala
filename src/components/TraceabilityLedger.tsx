import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Layers,
  Plus,
  QrCode,
  Search,
  Filter,
  ShieldCheck,
  MapPin,
  Calendar,
  Sparkles,
  ArrowLeft,
  ChevronRight,
  TrendingUp,
  FileCheck2,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { SpiceBatch, UserProfile } from '../types';
import { BatchDetailModal } from './BatchDetailModal';

interface TraceabilityLedgerProps {
  batches: SpiceBatch[];
  profile: UserProfile;
  onAddBatch: (batch: SpiceBatch) => void;
  onBackToOnboarding: () => void;
}

export const TraceabilityLedger: React.FC<TraceabilityLedgerProps> = ({
  batches,
  profile,
  onAddBatch,
  onBackToOnboarding,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalBatch, setActiveModalBatch] = useState<SpiceBatch | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New batch form state
  const [newSpice, setNewSpice] = useState('Turmeric (Haldi)');
  const [newVariant, setNewVariant] = useState('Lakadong High Curcumin');
  const [newWeight, setNewWeight] = useState('1500');
  const [newActive, setNewActive] = useState('7.2% Curcumin');
  const [newStory, setNewStory] = useState('Harvested organically from rainfed terrace fields.');

  const filteredBatches = batches.filter((b) => {
    const matchesSearch =
      b.spiceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.batchNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.origin.toLowerCase().includes(searchTerm.toLowerCase());

    if (selectedCategory === 'all') return matchesSearch;
    return matchesSearch && b.spiceName.toLowerCase().includes(selectedCategory.toLowerCase());
  });

  const totalWeight = batches.reduce((acc, b) => acc + b.lotWeightKg, 0);
  const avgScore = Math.round(
    batches.reduce((acc, b) => acc + b.traceabilityScore, 0) / (batches.length || 1)
  );

  const handleCreateBatch = (e: React.FormEvent) => {
    e.preventDefault();
    const newBatchObj: SpiceBatch = {
      id: `batch-${Date.now()}`,
      batchNumber: `MT-${newSpice.substring(0, 3).toUpperCase()}-2026-${Math.floor(
        100 + Math.random() * 900
      )}`,
      spiceName: newSpice,
      spiceVariant: newVariant,
      origin: `${profile.city}, ${profile.state}`,
      harvestDate: 'March 2026',
      keyMetric: newActive,
      moistureContent: '8.5%',
      traceabilityScore: 98,
      lotWeightKg: Number(newWeight) || 1000,
      packagingDate: 'March 2026',
      labStatus: 'Certified Premium',
      fssaiLicenseNo: '10020042001192',
      organicCertNo: 'NPOP/NAB/0019/2026',
      gpsCoordinates: '16.3067° N, 80.4365° E',
      farmerStory: newStory,
      testingLab: 'Spices Board Quality Lab, Cochin',
      pesticideFree: true,
    };

    onAddBatch(newBatchObj);
    setIsAddModalOpen(false);
    setActiveModalBatch(newBatchObj);
  };

  return (
    <div className="min-h-screen bg-[#FDF9F4] text-[#1C1C19] flex flex-col font-sans pb-24 md:pb-16">
      {/* Top Header */}
      <header className="sticky top-0 w-full z-30 flex justify-between items-center px-6 h-16 bg-[#FDF9F4] border-b border-[#E6E2DD]/80">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToOnboarding}
            className="text-[#865300] hover:bg-[#EBE8E3] transition-colors p-2 rounded-full flex items-center justify-center cursor-pointer"
            title="Back to onboarding steps"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="font-serif text-xl sm:text-2xl font-bold text-[#865300] tracking-tight">
              MasalaTrace
            </h1>
            <span className="text-[10px] font-mono text-[#857462]">
              Producer Batch Ledger & QR Explorer
            </span>
          </div>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-[#DA8A00] hover:bg-[#c47c00] text-[#1A1A1A] font-semibold text-xs sm:text-sm py-2 px-3.5 sm:px-4 rounded-lg flex items-center gap-1.5 shadow-sm cursor-pointer transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>New Spice Lot</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-5xl mx-auto pt-6 pb-12 px-4 sm:px-6 space-y-6">
        {/* Farm & Ledger Stats Overview Banner */}
        <div className="bg-[#FDF9F3] p-5 sm:p-6 rounded-2xl border border-[#D8C3AE] shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#E6E2DD]">
            <div>
              <span className="font-mono text-xs text-[#857462] uppercase tracking-wider block">
                Single-Origin Producer
              </span>
              <h2 className="font-serif text-2xl font-bold text-[#865300]">{profile.farmName}</h2>
              <p className="text-xs text-[#534434] flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-[#B35B42]" />
                {profile.city}, {profile.state} • Grower: {profile.fullName}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-mono text-xs bg-[#4A5D23]/15 text-[#4A5D23] font-bold px-3 py-1 rounded-full border border-[#4A5D23]/30 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                FSSAI & Organic Certified
              </span>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
            <div className="bg-white p-3 rounded-lg border border-[#D8C3AE]/60">
              <span className="font-mono text-[11px] text-[#857462] block">Verified Lots</span>
              <span className="font-mono text-xl font-bold text-[#1A1A1A]">{batches.length}</span>
            </div>
            <div className="bg-white p-3 rounded-lg border border-[#D8C3AE]/60">
              <span className="font-mono text-[11px] text-[#857462] block">Total Registered</span>
              <span className="font-mono text-xl font-bold text-[#865300]">
                {totalWeight.toLocaleString()} kg
              </span>
            </div>
            <div className="bg-white p-3 rounded-lg border border-[#D8C3AE]/60">
              <span className="font-mono text-[11px] text-[#857462] block">Avg Trust Score</span>
              <span className="font-mono text-xl font-bold text-[#DA8A00]">{avgScore}/100</span>
            </div>
            <div className="bg-white p-3 rounded-lg border border-[#D8C3AE]/60">
              <span className="font-mono text-[11px] text-[#857462] block">Lab Compliance</span>
              <span className="font-mono text-xl font-bold text-[#4A5D23]">100% Passed</span>
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-[#857462] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search batch ID, spice, or origin..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-[#D8C3AE] rounded-lg text-sm placeholder-[#857462] focus:outline-none focus:ring-2 focus:ring-[#DA8A00]"
            />
          </div>

          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            {['all', 'turmeric', 'chilli', 'cardamom', 'cumin'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium capitalize transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#865300] text-white'
                    : 'bg-white border border-[#D8C3AE] text-[#534434] hover:bg-[#F1EDE8]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Batches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredBatches.map((batch) => (
            <motion.div
              key={batch.id}
              whileHover={{ y: -2 }}
              onClick={() => setActiveModalBatch(batch)}
              className="bg-white p-5 rounded-xl border border-[#D8C3AE] hover:border-[#DA8A00] shadow-xs transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="font-mono text-xs text-[#857462]">{batch.batchNumber}</span>
                    <h3 className="font-serif text-lg font-bold text-[#865300] group-hover:text-[#DA8A00] transition-colors">
                      {batch.spiceName}
                    </h3>
                    <p className="text-xs text-[#534434]">{batch.spiceVariant}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-xs font-bold text-[#DA8A00] bg-[#DA8A00]/10 px-2 py-0.5 rounded">
                      Score: {batch.traceabilityScore}
                    </span>
                    <span className="font-mono text-[11px] text-[#4A5D23] block mt-1 font-medium">
                      ✓ {batch.labStatus}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 my-3 p-2.5 bg-[#FDF9F3] rounded-lg border border-[#D8C3AE]/40 text-xs">
                  <div>
                    <span className="font-mono text-[10px] text-[#857462] block">Key Active</span>
                    <span className="font-semibold text-[#1A1A1A]">{batch.keyMetric}</span>
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-[#857462] block">Lot Size</span>
                    <span className="font-semibold text-[#1A1A1A]">{batch.lotWeightKg} kg</span>
                  </div>
                </div>

                <p className="text-xs text-[#534434] line-clamp-2 italic">"{batch.farmerStory}"</p>
              </div>

              <div className="flex items-center justify-between pt-4 mt-3 border-t border-[#E6E2DD]">
                <span className="text-[11px] text-[#857462] flex items-center gap-1 font-mono">
                  <Calendar className="w-3 h-3" /> {batch.harvestDate}
                </span>
                <span className="text-xs font-semibold text-[#DA8A00] group-hover:text-[#865300] flex items-center gap-1 font-mono">
                  <QrCode className="w-3.5 h-3.5" /> View QR Passport
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredBatches.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-[#D8C3AE]">
            <p className="text-[#534434] text-sm">No batches match your filter criteria.</p>
          </div>
        )}
      </main>

      {/* Add New Batch Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FDF9F4] rounded-2xl w-full max-w-lg p-6 shadow-2xl border border-[#D8C3AE]">
            <h3 className="font-serif text-2xl font-bold text-[#865300] mb-4">
              Register New Spice Harvest Lot
            </h3>
            <form onSubmit={handleCreateBatch} className="space-y-4 text-sm">
              <div>
                <label className="block font-medium text-[#1A1A1A] mb-1">Spice Type</label>
                <select
                  value={newSpice}
                  onChange={(e) => setNewSpice(e.target.value)}
                  className="w-full p-2.5 bg-white border border-[#D8C3AE] rounded-lg"
                >
                  <option value="Turmeric (Haldi)">Turmeric (Haldi)</option>
                  <option value="Chilli (Mirchi)">Chilli (Mirchi)</option>
                  <option value="Cardamom (Elaichi)">Cardamom (Elaichi)</option>
                  <option value="Cumin (Jeera)">Cumin (Jeera)</option>
                  <option value="Black Pepper (Kali Mirch)">Black Pepper (Kali Mirch)</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-[#1A1A1A] mb-1">Cultivar / Variant</label>
                <input
                  type="text"
                  value={newVariant}
                  onChange={(e) => setNewVariant(e.target.value)}
                  placeholder="e.g. Lakadong High Curcumin"
                  required
                  className="w-full p-2.5 bg-white border border-[#D8C3AE] rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-[#1A1A1A] mb-1">Lot Weight (kg)</label>
                  <input
                    type="number"
                    value={newWeight}
                    onChange={(e) => setNewWeight(e.target.value)}
                    placeholder="1500"
                    required
                    className="w-full p-2.5 bg-white border border-[#D8C3AE] rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-medium text-[#1A1A1A] mb-1">Key Active Metric</label>
                  <input
                    type="text"
                    value={newActive}
                    onChange={(e) => setNewActive(e.target.value)}
                    placeholder="e.g. 7.5% Curcumin"
                    required
                    className="w-full p-2.5 bg-white border border-[#D8C3AE] rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-[#1A1A1A] mb-1">Farmer / Soil Story</label>
                <textarea
                  value={newStory}
                  onChange={(e) => setNewStory(e.target.value)}
                  rows={2}
                  className="w-full p-2.5 bg-white border border-[#D8C3AE] rounded-lg text-xs"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#E6E2DD]">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border border-[#857462] rounded-lg text-xs font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#DA8A00] hover:bg-[#c47c00] text-[#1A1A1A] rounded-lg text-xs font-semibold cursor-pointer shadow-xs"
                >
                  Generate QR Passport
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Batch Detail & QR Modal */}
      <BatchDetailModal
        batch={activeModalBatch}
        profile={profile}
        onClose={() => setActiveModalBatch(null)}
      />
    </div>
  );
};
