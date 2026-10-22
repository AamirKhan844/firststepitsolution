import React, { useState, useEffect } from 'react';
import { MessageSquare, X, ArrowRight } from 'lucide-react';

export interface FloatingWhatsAppProps {
  className?: string;
  phoneNumber?: string;
  defaultMessage?: string;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({
  className = '',
  phoneNumber = '919643537006',
  defaultMessage = 'Hello First Step Solutions, I would like to enquire about IT hardware sales / corporate rental / AMC support.',
}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const whatsappUrl =
    (phoneNumber === '919643537006'
      ? 'https://wa.me/919643537006?text='
      : `https://wa.me/${phoneNumber}?text=`) + encodeURIComponent(defaultMessage);

  return (
    <aside aria-label="Quick Communication Options" className={`fixed bottom-6 right-6 z-50 flex flex-col items-end ${className}`.trim()}>
      {/* Tooltip / Popup Card */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="WhatsApp Sales Desk Chat"
          className="mb-3 w-[calc(100vw-3rem)] max-w-xs sm:w-72 rounded-2xl bg-white border border-slate-200 shadow-2xl p-4 animate-fade-up text-slate-800"
        >
          <div className="flex items-start justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#25d366] text-white flex items-center justify-center font-bold">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">
                  Nehru Place Sales Desk
                </h4>
                <p className="text-[10px] text-emerald-600 font-semibold">
                  ● Online &bull; Direct WhatsApp
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-600 p-1"
              aria-label="Close"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-xs text-slate-600 py-3 leading-relaxed">
            Need instant pricing, bulk laptop rental rates, or emergency AMC assistance? Chat with us directly on WhatsApp.
          </p>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-[#25d366] hover:bg-[#20bd5a] transition-colors shadow-md"
          >
            <span>Start WhatsApp Chat</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        className="w-14 h-14 rounded-full bg-[#25d366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-xl shadow-emerald-950/20 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
        aria-label="Contact First Step Solutions on WhatsApp"
      >
        <MessageSquare className="w-7 h-7 fill-current" />
      </button>
    </aside>
  );
};

export default FloatingWhatsApp;
