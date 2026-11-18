import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { getSavedPalettes } from '../../utils/storage';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [vaultCount, setVaultCount] = useState<number>(0);

  useEffect(() => {
    const updateCount = () => {
      const saved = getSavedPalettes();
      setVaultCount(saved.length);
    };
    updateCount();
    window.addEventListener('storage', updateCount);
    return () => window.removeEventListener('storage', updateCount);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setToolsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setToolsDropdownOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;
  const isToolsActive = [
    '/generator',
    '/picker',
    '/harmony',
    '/contrast',
    '/gradient',
  ].some(path => location.pathname === path);

  const toolsList = [
    {
      code: 'GEN.01',
      name: 'PALETTE GENERATOR',
      path: '/generator',
      description: '5-COLOR CHROMATIC SYNTHESIZER',
    },
    {
      code: 'PCK.02',
      name: 'COLOR PICKER / CONVERTER',
      path: '/picker',
      description: 'RGB • HSL • HEX COORDINATE PROBE',
    },
    {
      code: 'HRM.03',
      name: 'COLOR HARMONY',
      path: '/harmony',
      description: 'GEOMETRIC HUE ROTATIONS (180° / 120° / 90°)',
    },
    {
      code: 'CNT.04',
      name: 'WCAG CONTRAST CHECKER',
      path: '/contrast',
      description: 'RELATIVE LUMINANCE RATIO VERIFICATION',
    },
    {
      code: 'GRD.05',
      name: 'GRADIENT STUDIO',
      path: '/gradient',
      description: 'LINEAR & RADIAL RASTER RENDERER',
    },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#EEEEEE] border-b-2 border-black font-mono">
      {/* Top Raw Metadata Strip */}
      <div className="hidden sm:flex items-center justify-between px-4 py-1 border-b border-black text-[11px] uppercase tracking-wider bg-black text-white select-none">
        <div className="flex items-center space-x-3">
          <span className="flex items-center space-x-1.5">
            <span className="inline-block w-2 h-2 bg-[#39FF14]" />
            <span>COLORVAULT CHROMATIC SYSTEM</span>
          </span>
          <span className="text-neutral-500">|</span>
          <span className="text-neutral-400">INDEX // VOL. 2026.11</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-neutral-400">ZERO_AI • CLIENT_SIDE_ENGINE</span>
          <span className="text-[#39FF14] font-bold">[ONLINE]</span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 text-black hover:bg-black hover:text-white px-2 py-1 border border-transparent hover:border-black transition-none group"
            aria-label="COLORVAULT Home"
          >
            <div className="w-5 h-5 bg-[#2020FF] border border-black flex items-center justify-center text-[10px] text-white font-bold">
              CV
            </div>
            <span className="font-display font-extrabold text-xl sm:text-2xl tracking-tighter uppercase leading-none">
              COLORVAULT
            </span>
            <span className="hidden md:inline-block text-[10px] font-mono border border-black px-1 py-0.5 bg-white text-black group-hover:bg-black group-hover:text-white">
              v1.0
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 text-xs uppercase tracking-wider font-bold">
            <Link
              to="/"
              className={`px-3 py-2 border transition-none ${
                isActive('/')
                  ? 'bg-black text-white border-black'
                  : 'bg-transparent text-black border-transparent hover:border-black hover:bg-white'
              }`}
            >
              [ 01 // HOME ]
            </Link>

            <Link
              to="/explore"
              className={`px-3 py-2 border transition-none ${
                isActive('/explore')
                  ? 'bg-black text-white border-black'
                  : 'bg-transparent text-black border-transparent hover:border-black hover:bg-white'
              }`}
            >
              [ 02 // ARCHIVE ]
            </Link>

            {/* Tools Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setToolsDropdownOpen(prev => !prev)}
                className={`flex items-center space-x-1.5 px-3 py-2 border transition-none ${
                  isToolsActive || toolsDropdownOpen
                    ? 'bg-black text-white border-black'
                    : 'bg-transparent text-black border-transparent hover:border-black hover:bg-white'
                }`}
                aria-expanded={toolsDropdownOpen}
                aria-haspopup="true"
              >
                <span>[ 03 // TOOLS ]</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-100 ${
                    toolsDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {toolsDropdownOpen && (
                <div className="absolute left-0 mt-1 w-80 bg-white border-2 border-black shadow-brutal z-50 animate-none font-mono">
                  <div className="px-3 py-2 bg-black text-white text-[10px] uppercase tracking-widest flex justify-between border-b border-black">
                    <span>UTILITY CATALOG</span>
                    <span className="text-[#39FF14]">5 PROTOCOLS</span>
                  </div>
                  <div className="divide-y divide-black">
                    {toolsList.map(tool => {
                      const active = isActive(tool.path);
                      return (
                        <Link
                          key={tool.path}
                          to={tool.path}
                          onClick={() => setToolsDropdownOpen(false)}
                          className={`block p-3 transition-none ${
                            active
                              ? 'bg-[#2020FF] text-white'
                              : 'hover:bg-black hover:text-white text-black'
                          }`}
                        >
                          <div className="flex items-center justify-between text-[11px] font-bold">
                            <span>{tool.name}</span>
                            <span className="text-[10px] opacity-75 font-mono">{tool.code}</span>
                          </div>
                          <div className="text-[10px] opacity-70 mt-1 uppercase">
                            {tool.description}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/vault"
              className={`px-3 py-2 border transition-none flex items-center space-x-1.5 ${
                isActive('/vault')
                  ? 'bg-black text-white border-black'
                  : 'bg-transparent text-black border-transparent hover:border-black hover:bg-white'
              }`}
            >
              <span>[ 04 // VAULT ]</span>
              {vaultCount > 0 && (
                <span className="px-1.5 py-0.2 bg-[#FF321C] text-white text-[10px] font-bold border border-black">
                  {vaultCount}
                </span>
              )}
            </Link>

            <Link
              to="/about"
              className={`px-3 py-2 border transition-none ${
                isActive('/about')
                  ? 'bg-black text-white border-black'
                  : 'bg-transparent text-black border-transparent hover:border-black hover:bg-white'
              }`}
            >
              [ 05 // MANIFESTO ]
            </Link>
          </nav>

          {/* Quick Studio Trigger */}
          <div className="hidden lg:flex items-center space-x-2">
            <Link
              to="/generator"
              className="btn-raw-black text-[11px] py-1.5 px-3"
            >
              <span>LAUNCH GENERATOR &rarr;</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center space-x-2">
            <Link
              to="/vault"
              className="px-2 py-1 border border-black text-xs font-bold bg-white"
            >
              VAULT [{vaultCount}]
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="p-1.5 border-2 border-black bg-white text-black hover:bg-black hover:text-white"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t-2 border-black bg-white p-4 space-y-4">
          <div className="border-b border-black pb-2 text-[10px] uppercase tracking-widest text-neutral-500 font-bold">
            INDEX DIRECTORY
          </div>
          <div className="space-y-1">
            <Link
              to="/"
              className={`block p-2 text-sm font-bold border ${
                isActive('/') ? 'bg-black text-white border-black' : 'border-black/20 hover:border-black'
              }`}
            >
              01 // HOME ARCHIVE
            </Link>
            <Link
              to="/explore"
              className={`block p-2 text-sm font-bold border ${
                isActive('/explore') ? 'bg-black text-white border-black' : 'border-black/20 hover:border-black'
              }`}
            >
              02 // PALETTES GALLERY (36 SETS)
            </Link>
            <Link
              to="/vault"
              className={`block p-2 text-sm font-bold border ${
                isActive('/vault') ? 'bg-black text-white border-black' : 'border-black/20 hover:border-black'
              }`}
            >
              03 // MY VAULT [{vaultCount}]
            </Link>
            <Link
              to="/about"
              className={`block p-2 text-sm font-bold border ${
                isActive('/about') ? 'bg-black text-white border-black' : 'border-black/20 hover:border-black'
              }`}
            >
              04 // MANIFESTO & PHILOSOPHY
            </Link>
          </div>

          <div className="border-t border-black pt-3">
            <div className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold mb-2">
              COLOR TOOLS
            </div>
            <div className="space-y-1">
              {toolsList.map(t => (
                <Link
                  key={t.path}
                  to={t.path}
                  className="flex items-center justify-between p-2 text-xs font-bold border border-black/20 hover:bg-black hover:text-white"
                >
                  <span>{t.name}</span>
                  <span className="text-[10px]">{t.code}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
