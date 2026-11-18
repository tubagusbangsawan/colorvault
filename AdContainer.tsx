import React from 'react';

interface AdContainerProps {
  slotId?: string;
  format?: 'horizontal' | 'rectangle' | 'responsive';
  className?: string;
  label?: string;
}

export const AdContainer: React.FC<AdContainerProps> = ({
  slotId = 'placeholder-slot',
  format = 'horizontal',
  className = '',
  label = 'COMMERCIAL DISPATCH // ADVERTISEMENT',
}) => {
  const adsenseClientId = import.meta.env.VITE_ADSENSE_CLIENT_ID;

  return (
    <aside
      aria-label={label}
      className={`w-full my-8 max-w-7xl mx-auto px-4 ${className}`}
    >
      <div className="border border-black bg-white p-3 font-mono">
        <div className="flex items-center justify-between border-b border-black pb-2 mb-3 text-[10px] uppercase tracking-widest text-[#080808]">
          <span className="flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 bg-[#FF321C] inline-block" />
            <span>[{label}]</span>
          </span>
          <span className="text-neutral-500 font-mono">AD-SPEC: 0x77A</span>
        </div>

        {adsenseClientId ? (
          <div className="w-full flex justify-center overflow-hidden py-2">
            <ins
              className="adsbygoogle"
              style={{ display: 'block', textAlign: 'center' }}
              data-ad-client={adsenseClientId}
              data-ad-slot={slotId}
              data-ad-format={format}
              data-full-width-responsive="true"
            />
          </div>
        ) : (
          <div
            className={`w-full flex flex-col items-center justify-center border border-dashed border-black/40 bg-[#EEEEEE] p-5 text-center ${
              format === 'rectangle' ? 'min-h-[200px]' : 'min-h-[75px]'
            }`}
          >
            <div className="flex items-center space-x-2 text-xs font-mono text-black">
              <span className="font-bold">[RESERVED ADVERTISING CHANNEL]</span>
              <span>—</span>
              <span className="text-neutral-600">GOOGLE ADSENSE INTEGRATION READY</span>
            </div>
            <p className="text-[11px] font-mono text-neutral-500 mt-1 max-w-lg">
              Placement isolated from interactive controls. Activates automatically upon publisher configuration.
            </p>
          </div>
        )}
      </div>
    </aside>
  );
};
