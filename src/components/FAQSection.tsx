import React, { useState } from 'react';
import { ASAM_FX_FAQS } from '../data/mockData';
import { sfx } from '../utils/audio';
import { ChevronDown, HelpCircle, ArrowRight, Sparkles } from 'lucide-react';

interface FAQSectionProps {
  isFriendly?: boolean;
}

export default function FAQSection({ isFriendly = false }: FAQSectionProps) {
  const [openId, setOpenId] = useState<string | null>("faq1"); // open the first FAQ by default

  const handleToggle = (id: string) => {
    sfx.playClick();
    setOpenId(openId === id ? null : id);
  };

  const friendlyFAQs = [
    {
      id: "faq1",
      category: "Mentorship",
      question: "How does your mentorship program work, and can a complete beginner join?",
      answer: "Absolutely! Instead of selling you complicated slide decks or pre-recorded videos, we work together one-on-one. We explain everything in plain language, practice on live charts step-by-step, and build a simple checklist so you know exactly when to buy, sell, or do nothing. You will never feel lost."
    },
    {
      id: "faq2",
      category: "Trading Style",
      question: "How long do you usually hold trades, and how much time does it take?",
      answer: "I mostly do daytime trades that last from 15 minutes to a few hours. This means we never stay in trades overnight when unexpected events can happen. You don't need to sit in front of the screen all day—usually just 1 to 2 hours during the morning is plenty to find solid, safe setups."
    },
    {
      id: "faq3",
      category: "Risk Management",
      question: "How do you make sure I don't lose all my money if a trade goes wrong?",
      answer: "Safety is our absolute number-one rule! We use a built-in safety net called a 'Stop Loss' on every single trade. This automatically closes the trade if the price goes against us, limiting our risk to only a tiny fraction (0.5% to 1%) of our total account. We never gamble or take high risks."
    },
    {
      id: "faq4",
      category: "Account Size",
      question: "What is the minimum money needed to start trading with you?",
      answer: "You can actually practice in a 'demo account' with completely fake money for free to build your confidence! Once you are ready to use real money, you can start with as little as $100 to $200. This is the best way to learn without any pressure before scaling up to larger amounts."
    },
    {
      id: "faq5",
      category: "Alerts / Signals",
      question: "Are your trading alerts easy to follow for someone who has another job?",
      answer: "Yes, they are extremely simple! We send 3 to 6 high-quality alerts per week. Each alert tells you exactly what price to buy or sell, where to set your profit target, and where to put your safety stop-loss. It takes less than 2 minutes to set up on your phone, making it perfect to follow alongside your normal day job."
    },
    {
      id: "faq6",
      category: "Psychology",
      question: "How do you help me handle fear, greed, and stress while trading?",
      answer: "We focus heavily on keeping things calm and stress-free. By treating trading like a systematic business with clear rules instead of a lottery, we take emotions out of the equation. We teach you how to stay patient, stay disciplined, and build the confidence to succeed without feeling anxious."
    }
  ];

  const currentFAQs = isFriendly ? friendlyFAQs : ASAM_FX_FAQS;

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto relative z-10">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs font-mono text-[#D4AF37] px-3.5 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 font-bold uppercase tracking-widest inline-flex items-center gap-1.5">
          {isFriendly && <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />}
          {isFriendly ? "FREQUENTLY ASKED QUESTIONS MADE SIMPLE" : "COMMON PROTOCOLS"}
        </span>
        <h2 className="text-4xl sm:text-5xl font-display font-bold text-white mt-5 tracking-tight">
          {isFriendly ? "Got Questions? " : "Frequently Asked "}<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-yellow-100">{isFriendly ? "We Have Easy Answers" : "Questions"}</span>
        </h2>
        <p className="text-slate-400 mt-4 text-sm sm:text-base font-sans">
          {isFriendly 
            ? "Clear, straightforward answers about how we help beginners, manage our risk, protect your capital, and teach you how to read charts step-by-step."
            : "Clear answers regarding our core Smart Money trading style, capital criteria, signal safety, and elite mentorship rules."
          }
        </p>
      </div>

      {/* Accordion List Container */}
      <div className="space-y-4">
        {currentFAQs.map((faq) => {
          const isOpen = openId === faq.id;

          return (
            <div
              key={faq.id}
              className={`glass-panel rounded-2xl border transition-all duration-300 overflow-hidden bg-[#0B1120]/20 hover:bg-[#0B1120]/40 ${
                isOpen 
                  ? 'border-[#D4AF37]/50 shadow-[0_5px_20px_rgba(212,175,55,0.05)]' 
                  : 'border-slate-800/80'
              }`}
            >
              {/* Question Clickable bar */}
              <button
                onClick={() => handleToggle(faq.id)}
                className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 font-display font-bold text-white cursor-pointer select-none group"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className={`w-5 h-5 shrink-0 transition-colors ${isOpen ? 'text-[#D4AF37]' : 'text-slate-500 group-hover:text-slate-300'}`} />
                  <span className="text-sm sm:text-base pr-4 leading-snug group-hover:text-[#D4AF37] transition-colors font-semibold">
                    {faq.question}
                  </span>
                </div>
                <div className={`w-8 h-8 rounded-lg bg-black/50 border border-slate-800 group-hover:border-slate-700 flex items-center justify-center shrink-0 transition-all ${
                  isOpen ? 'rotate-180 border-[#D4AF37]/40 text-[#D4AF37]' : 'text-slate-400'
                }`}>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {/* Collapsible Answer */}
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  isOpen ? 'max-h-[300px] border-t border-slate-900/60' : 'max-h-0'
                }`}
              >
                <div className="p-6 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans bg-black/10">
                  <p>{faq.answer}</p>
                  
                  {/* Category tag */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-900/40 text-[10px] font-mono text-slate-500">
                    <span>{isFriendly ? "HELP TOPIC" : "PROTOCOL DEPT"} // {faq.category.toUpperCase()}</span>
                    <a 
                      href="#contact" 
                      className="text-[#D4AF37] hover:underline flex items-center gap-1 font-bold"
                    >
                      <span>{isFriendly ? "Get in touch with Asam FX" : "Inquire further"}</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
}
