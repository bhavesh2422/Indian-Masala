import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, ShieldCheck, Leaf } from 'lucide-react';

interface WelcomeScreenProps {
  onGetStarted: () => void;
  onSignIn: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onGetStarted, onSignIn }) => {
  return (
    <div className="relative min-h-[880px] h-full flex flex-col justify-end overflow-hidden bg-[#FDF9F3]">
      {/* Background Hero Image */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-[580px] bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBAeOjd7f9dlpaDTcRRTR1n4Meh3Kec41HaUeLuw6dFbJzH9ZQZAPQTQjdQgHhL7FjAwDfNUmMAZxoU9ImSN9IV7PvS12WwO4wOOd585uxDFcrFqZxeN2ILIvlJiPD21Tw2Xw2tiejBBoFBMGhbganDZfQL3nMP8_lwGwxgN0u72oh27xvkG_cOOHuYirdKaum9cTHxbicKOCz3p5X5373iHeSnfzzRi_3wtLwCkrMqVjUoqRYsQZ71bg')`,
          }}
          role="img"
          aria-label="Indian spice market with mounds of authentic turmeric, chilli, and cardamom"
        />
        {/* Natural gradient overlay to smoothly blend with Saffron Cream canvas */}
        <div className="absolute inset-0 splash-gradient pointer-events-none" />
      </div>

      {/* Content Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 flex flex-col items-center justify-end px-6 pb-12 pt-[420px] text-center max-w-xl mx-auto w-full"
      >
        {/* Brand Icon Badge */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="mb-5 bg-white p-4 rounded-full shadow-[0_4px_20px_rgba(218,138,0,0.15)] border border-[#D8C3AE]/40 flex items-center justify-center h-20 w-20"
        >
          <span
            className="material-symbols-outlined text-[#DA8A00] text-[42px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            spa
          </span>
        </motion.div>

        {/* Display Title */}
        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#FFB961] sm:text-[#DA8A00] drop-shadow-sm mb-3">
          Welcome to MasalaTrace
        </h1>

        {/* Subtitle */}
        <p className="text-[#534434] text-base sm:text-lg max-w-md mx-auto mb-8 font-normal leading-relaxed">
          Empowering farmers, connecting authentic spices to the world.
        </p>

        {/* Quality Badges Row */}
        <div className="flex items-center gap-4 mb-8 text-xs font-medium text-[#4A5D23] bg-[#8EA462]/15 px-4 py-2 rounded-full border border-[#4A5D23]/20">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> FSSAI Verified
          </span>
          <span className="w-1 h-1 rounded-full bg-[#4A5D23]/40" />
          <span className="flex items-center gap-1">
            <Leaf className="w-3.5 h-3.5" /> 100% Origin Traceable
          </span>
          <span className="w-1 h-1 rounded-full bg-[#4A5D23]/40" />
          <span className="flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#DA8A00]" /> Lab Tested
          </span>
        </div>

        {/* Primary Action Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onGetStarted}
          id="welcome-get-started-btn"
          className="w-full sm:w-auto bg-[#DA8A00] hover:bg-[#c47c00] active:bg-[#b06f00] text-[#1A1A1A] font-semibold text-base py-4 px-10 rounded-full transition-all duration-200 shadow-md hover:shadow-[0_8px_20px_rgba(218,138,0,0.3)] flex items-center justify-center gap-3 cursor-pointer"
        >
          <span>Get Started</span>
          <ArrowRight className="w-5 h-5" />
        </motion.button>

        {/* Sign In Link */}
        <p className="mt-6 text-[#534434] text-sm">
          Already have an account?{' '}
          <button
            onClick={onSignIn}
            id="welcome-sign-in-btn"
            className="text-[#865300] hover:text-[#DA8A00] font-semibold underline decoration-[#D8C3AE] underline-offset-4 cursor-pointer transition-colors"
          >
            Sign in
          </button>
        </p>
      </motion.div>
    </div>
  );
};
