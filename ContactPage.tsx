import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Mail } from 'lucide-react';
import { useToast } from '../components/common/Toast';

export const ContactPage: React.FC = () => {
  const { showToast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('TRANSMISSION BLOCKED: OPERATOR IDENTIFIER REQUIRED.');
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('TRANSMISSION BLOCKED: VALID ELECTRONIC MAIL ADDRESS REQUIRED.');
      return;
    }
    if (!message.trim() || message.trim().length < 10) {
      setError('TRANSMISSION BLOCKED: MESSAGE PAYLOAD MUST EXCEED 10 CHARACTERS.');
      return;
    }

    setIsSubmitted(true);
    showToast('Dispatch telegram prepared for transmission', 'success');
  };

  const handleSendViaEmailClient = () => {
    const encodedSubject = encodeURIComponent(subject || 'COLORVAULT INQUIRY');
    const encodedBody = encodeURIComponent(`From: ${name} (${email})\n\n${message}`);
    window.location.href = `mailto:hello@colorvault.dev?subject=${encodedSubject}&body=${encodedBody}`;
  };

  return (
    <div className="py-8 md:py-16 max-w-3xl mx-auto px-4 sm:px-6 font-mono text-black">
      {/* Header */}
      <div className="border-b-2 border-black pb-6 mb-8">
        <div className="flex items-center space-x-2 text-[11px] font-bold uppercase tracking-widest text-[#2020FF] mb-1">
          <span className="w-2.5 h-2.5 bg-[#2020FF] inline-block" />
          <span>COMMUNICATION CHANNEL // MSG.03</span>
        </div>
        <h1 className="font-display font-black text-4xl sm:text-5xl uppercase tracking-tighter text-black">
          TRANSMIT DISPATCH
        </h1>
        <p className="text-xs uppercase text-neutral-600 font-bold mt-1">
          SEND FEEDBACK, REPORT ANOMALIES, OR INQUIRE ABOUT CHROMATIC INTEGRATION.
        </p>
      </div>

      {/* Main Telegram Box */}
      <div className="border-2 border-black bg-white p-6 sm:p-8 shadow-brutal">
        {isSubmitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-12 h-12 bg-[#39FF14] border-2 border-black flex items-center justify-center mx-auto text-black">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-display font-black text-2xl uppercase">
              DISPATCH TELEGRAM COMPOSED
            </h3>
            <p className="text-xs uppercase text-neutral-600 max-w-md mx-auto font-bold leading-relaxed">
              OPERATOR <strong>{name}</strong>: AS COLORVAULT EXECUTES EXCLUSIVELY CLIENT-SIDE WITHOUT SERVER DATABASES, YOUR TELEGRAM IS READY TO DISPATCH DIRECTLY TO OUR REPOSITORIES.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleSendViaEmailClient}
                className="btn-raw-black text-xs px-5 py-3"
              >
                <Mail className="w-4 h-4 mr-1.5" />
                <span>LAUNCH MAIL CLIENT &rarr;</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setMessage('');
                }}
                className="btn-raw text-xs px-4 py-3"
              >
                COMPOSE ANOTHER
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-[#FF321C] text-white border-2 border-black text-xs font-bold uppercase flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-name" className="block text-[10px] font-bold uppercase text-neutral-600 mb-1">
                  OPERATOR IDENTIFIER [NAME] *
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="ALEX MORGAN"
                  className="w-full px-3 py-2.5 bg-[#EEEEEE] border-2 border-black text-xs font-bold uppercase focus:outline-none focus:bg-white"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-[10px] font-bold uppercase text-neutral-600 mb-1">
                  ELECTRONIC MAIL ADDRESS *
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="OPERATOR@DOMAIN.COM"
                  className="w-full px-3 py-2.5 bg-[#EEEEEE] border-2 border-black text-xs font-bold uppercase focus:outline-none focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label htmlFor="contact-subject" className="block text-[10px] font-bold uppercase text-neutral-600 mb-1">
                DISPATCH SUBJECT
              </label>
              <input
                id="contact-subject"
                type="text"
                value={subject}
                onChange={e => setSubject(e.target.value)}
                placeholder="PROPOSAL / CHROMATIC REPORT"
                className="w-full px-3 py-2.5 bg-[#EEEEEE] border-2 border-black text-xs font-bold uppercase focus:outline-none focus:bg-white"
              />
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-[10px] font-bold uppercase text-neutral-600 mb-1">
                TELEGRAM PAYLOAD [MESSAGE] *
              </label>
              <textarea
                id="contact-message"
                rows={5}
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="TRANSMIT YOUR THOUGHTS, INQUIRIES, OR REPORTED SPECTRAL ANOMALIES..."
                className="w-full px-3 py-2.5 bg-[#EEEEEE] border-2 border-black text-xs font-bold uppercase focus:outline-none focus:bg-white resize-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full btn-raw-black py-3 text-xs"
              >
                <Send className="w-3.5 h-3.5 mr-2" />
                <span>EXECUTE DISPATCH &rarr;</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
