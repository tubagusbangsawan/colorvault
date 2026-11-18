import React from 'react';

export const TermsPage: React.FC = () => {
  return (
    <div className="py-8 md:py-16 max-w-4xl mx-auto px-4 sm:px-6 font-mono text-black">
      {/* Header */}
      <div className="border-b-2 border-black pb-6 mb-8">
        <div className="flex items-center space-x-2 text-[11px] font-bold uppercase tracking-widest text-[#2020FF] mb-1">
          <span className="w-2.5 h-2.5 bg-[#2020FF] inline-block" />
          <span>LEGAL PROTOCOL // TRM.02</span>
        </div>
        <h1 className="font-display font-black text-4xl sm:text-5xl uppercase tracking-tighter text-black">
          TERMS OF OPERATION
        </h1>
        <p className="text-xs uppercase text-neutral-600 font-bold mt-1">
          OPERATIONAL EDITION: 2026.01 // UNCONDITIONAL COLOR FREEDOM
        </p>
      </div>

      <div className="space-y-6 text-xs uppercase font-bold leading-relaxed">
        <section className="border-2 border-black bg-white p-5 shadow-brutal space-y-2">
          <div className="text-[10px] text-[#2020FF] uppercase border-b border-black pb-1">
            01 // UNRESTRICTED CHROMATIC OWNERSHIP
          </div>
          <h2 className="text-sm font-extrabold uppercase">100% ROYALTY-FREE INTELLECTUAL LIBERTY</h2>
          <p className="text-neutral-600">
            ALL HEXADECIMAL CODES, PALETTE SEQUENCES, CSS STYLESHEET SNIPPETS, AND PNG GRAPHIC ARTIFACTS COMPUTED BY COLORVAULT BELONG UNCONDITIONALLY TO YOU. WE ASSERT ZERO INTELLECTUAL PROPERTY CLAIMS OVER MATHEMATICAL COLOR TRUTHS. USE FREELY IN COMMERCIAL SOFTWARE, PRINT DESIGN, OR BRANDING.
          </p>
        </section>

        <section className="border-2 border-black bg-white p-5 shadow-brutal space-y-2">
          <div className="text-[10px] text-[#FF321C] uppercase border-b border-black pb-1">
            02 // SERVICE PROVISION
          </div>
          <h2 className="text-sm font-extrabold uppercase">AS-IS COMPUTATION ENGINE</h2>
          <p className="text-neutral-600">
            THE PLATFORM IS DELIVERED &apos;AS-IS&apos; FOR CREATIVE EXPLORATION AND TECHNICAL AUDITING. WHILE WE IMPLEMENT PRECISE WCAG 2.1 MATHEMATICAL EQUATIONS, PRACTITIONERS ARE ENCOURAGED TO AUDIT COLOR RENDERING UNDER REAL-WORLD PHYSICAL AMBIENCE.
          </p>
        </section>

        <section className="border-2 border-black bg-white p-5 shadow-brutal space-y-2">
          <div className="text-[10px] text-[#39FF14] uppercase border-b border-black pb-1">
            03 // INTEGRITY OF INFRASTRUCTURE
          </div>
          <h2 className="text-sm font-extrabold uppercase">PROHIBITED EXPLOITATION</h2>
          <p className="text-neutral-600">
            AUTOMATED MALICIOUS SCRIPTING, DOS ATTACKS ON STATIC ASSET EDGES, OR INJECTION OF CORRUPTED CODEBASES IS STRICTLY FORBIDDEN.
          </p>
        </section>
      </div>
    </div>
  );
};
