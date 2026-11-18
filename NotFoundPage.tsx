import React from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="py-20 md:py-32 max-w-xl mx-auto px-4 text-center font-mono space-y-6">
      <div className="border-2 border-black bg-white p-8 shadow-brutal space-y-4">
        <div className="inline-block px-3 py-1 bg-[#FF321C] text-white text-xs font-black uppercase border border-black">
          STATUS 404 // NULL POINTER
        </div>
        <h1 className="font-display font-black text-4xl sm:text-5xl uppercase tracking-tighter text-black">
          COORDINATE NOT FOUND
        </h1>
        <p className="text-xs uppercase text-neutral-600 font-bold max-w-sm mx-auto leading-relaxed">
          THE SPECIFIED CHROMATIC VECTOR DOES NOT EXIST WITHIN THIS REGISTRY. RETURN TO BASE ARCHIVE TO RESUME SYSTEM PROBING.
        </p>
        <div className="pt-2">
          <Link
            to="/"
            className="btn-raw-black text-xs px-5 py-2.5"
          >
            RETURN TO HOMEPAGE &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};
