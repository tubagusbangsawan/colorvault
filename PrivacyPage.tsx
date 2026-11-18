import React from 'react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="py-8 md:py-16 max-w-4xl mx-auto px-4 sm:px-6 font-mono text-black">
      {/* Header */}
      <div className="border-b-2 border-black pb-6 mb-8">
        <div className="flex items-center space-x-2 text-[11px] font-bold uppercase tracking-widest text-[#2020FF] mb-1">
          <span className="w-2.5 h-2.5 bg-[#2020FF] inline-block" />
          <span>LEGAL PROTOCOL // PRV.01</span>
        </div>
        <h1 className="font-display font-black text-4xl sm:text-5xl uppercase tracking-tighter text-black">
          PRIVACY STATEMENT
        </h1>
        <p className="text-xs uppercase text-neutral-600 font-bold mt-1">
          REVISION: 2026.01 // STRICT CLIENT-SIDE DISCLOSURE
        </p>
      </div>

      <div className="space-y-6 text-xs uppercase font-bold leading-relaxed">
        <section className="border-2 border-black bg-white p-5 shadow-brutal space-y-2">
          <div className="text-[10px] text-[#2020FF] uppercase border-b border-black pb-1">
            01 // CLIENT-SIDE COMPUTATION
          </div>
          <h2 className="text-sm font-extrabold uppercase">NO REMOTE DATA HARVESTING</h2>
          <p className="text-neutral-600">
            COLORVAULT OPERATES AS AN AUTONOMOUS BROWSER-SIDE COLOR UTILITY. ALL COLOR MANIPULATION, WCAG CONTRAST AUDITS, AND GRADIENT SYNTHESES OCCUR LOCALLY IN YOUR DEVICE RUNTIME. WE DO NOT COLLECT NAMES, PASSWORDS, IDENTIFIERS, OR COLOR SAMPLES.
          </p>
        </section>

        <section className="border-2 border-black bg-white p-5 shadow-brutal space-y-2">
          <div className="text-[10px] text-[#FF321C] uppercase border-b border-black pb-1">
            02 // LOCALSTORAGE MECHANISM
          </div>
          <h2 className="text-sm font-extrabold uppercase">PERSISTENT HARDWARE DOSSIER</h2>
          <p className="text-neutral-600">
            PALETTES RETAINED IN &apos;MY VAULT&apos; ARE ENCODED IN BROWSER LOCALSTORAGE. THIS STORAGE REMAINS STRICTLY BOUND TO YOUR BROWSER PROFILE. WE HAVE ZERO ACCESS TO THIS REPOSITORY. YOU RETAIN COMPLETE ABILITY TO FLUSH OR DUMP DATA AT WILL.
          </p>
        </section>

        <section className="border-2 border-black bg-white p-5 shadow-brutal space-y-2">
          <div className="text-[10px] text-[#39FF14] uppercase border-b border-black pb-1">
            03 // COMMERCIAL ADVERTISING
          </div>
          <h2 className="text-sm font-extrabold uppercase">GOOGLE ADSENSE NOTICE</h2>
          <p className="text-neutral-600">
            COLORVAULT IS FINANCED VIA NON-INTRUSIVE ADVERTISEMENT SLOTS. THIRD-PARTY PARTNERS (INCLUDING GOOGLE) MAY UTILIZE ESSENTIAL ADVERTISING COOKIES TO SERVE RELEVANT COMMERCIAL DISPATCHES BASED ON PREVIOUS BROWSING HISTORY. USERS MAY EXERCISE OPT-OUT CONTROLS VIA GOOGLE ADS SETTINGS.
          </p>
        </section>

        <section className="border-2 border-black bg-white p-5 shadow-brutal space-y-2">
          <div className="text-[10px] text-neutral-500 uppercase border-b border-black pb-1">
            04 // JURISDICTION & AMENDMENTS
          </div>
          <h2 className="text-sm font-extrabold uppercase">OPERATIONAL MODIFICATIONS</h2>
          <p className="text-neutral-600">
            ANY STRUCTURAL AMENDMENTS TO THIS DECLARATION WILL BE TRANSMITTED TO THIS DOCUMENT PERMANENTLY WITH CORRESPONDING VERSION STAMPS.
          </p>
        </section>
      </div>
    </div>
  );
};
