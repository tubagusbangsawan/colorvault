import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/navigation/Navbar';
import { Footer } from './components/layout/Footer';
import { ToastProvider } from './components/common/Toast';
import { ScrollToTop } from './components/common/ScrollToTop';

import { HomePage } from './pages/HomePage';
import { GeneratorPage } from './pages/GeneratorPage';
import { ExplorePage } from './pages/ExplorePage';
import { PickerPage } from './pages/PickerPage';
import { HarmonyPage } from './pages/HarmonyPage';
import { ContrastPage } from './pages/ContrastPage';
import { GradientPage } from './pages/GradientPage';
import { VaultPage } from './pages/VaultPage';
import { AboutPage } from './pages/AboutPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ToastProvider>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-[#EEEEEE] text-[#080808] selection:bg-[#2020FF] selection:text-white font-mono">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/generator" element={<GeneratorPage />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/picker" element={<PickerPage />} />
              <Route path="/harmony" element={<HarmonyPage />} />
              <Route path="/contrast" element={<ContrastPage />} />
              <Route path="/gradient" element={<GradientPage />} />
              <Route path="/vault" element={<VaultPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </ToastProvider>
    </BrowserRouter>
  );
};

export default App;
