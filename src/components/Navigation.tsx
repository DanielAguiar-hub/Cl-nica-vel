/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowUpRight, Clock, MapPin, Phone, ShieldCheck } from "lucide-react";

interface NavigationProps {
  whatsappLink: string;
}

export function ClinicLogo() {
  return (
    <div className="flex items-center gap-2 select-none">
      <svg className="w-6 h-6 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" strokeOpacity="0.2" />
        <path d="M12 6C10 6 7.5 7.5 7.5 11C7.5 15.5 12 18 12 18C12 18 16.5 15.5 16.5 11C16.5 7.5 14 6 12 6Z" fill="currentColor" fillOpacity="0.1" />
        <circle cx="12" cy="11" r="1.5" fill="currentColor" />
      </svg>
      <span className="font-sans font-black tracking-wider text-sm text-white uppercase">
        VERO<span className="text-cyan-400 font-light">odontologia</span>
      </span>
    </div>
  );
}

export default function Navigation({ whatsappLink }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="relative w-full max-w-7xl mx-auto py-4 md:py-6 px-4 md:px-8 z-40 bg-transparent flex justify-between items-center">
      <a href="#" aria-label="Voltar ao início">
        <ClinicLogo />
      </a>

      <nav id="top-nav-menu" className="hidden md:flex items-center gap-1.5 p-1 bg-slate-950/15 backdrop-blur-md border border-white/5 rounded-full text-[12px] font-mono tracking-widest text-slate-300 select-none shadow-inner shadow-cyan-950/20">
        <a href="#sobre-clinica" className="hover:text-[#00f0ff] hover:bg-white/5 px-4 py-2 rounded-full transition-all uppercase font-bold">
          A Clínica
        </a>
        <a href="#services" className="hover:text-[#00f0ff] hover:bg-white/5 px-4 py-2 rounded-full transition-all uppercase font-bold">
          Serviços
        </a>
        <a href="#smile-simulator-container" className="hover:text-[#00f0ff] hover:bg-white/5 px-4 py-2 rounded-full transition-all uppercase font-bold">
          Simulador
        </a>
        <a href="#depoimentos" className="hover:text-[#00f0ff] hover:bg-white/5 px-4 py-2 rounded-full transition-all uppercase font-bold">
          Depoimentos
        </a>
      </nav>

      <div className="flex items-center gap-3">
        <a
          id="nav-cta-contact"
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white hover:bg-slate-100 hover:brightness-105 text-slate-950 font-mono rounded-full px-6 py-2.5 text-[9px] tracking-widest font-black transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(255,255,255,0.12)] hover:shadow-[0_0_22px_rgba(255,255,255,0.25)] cursor-pointer uppercase hover:scale-[1.02] duration-300"
        >
          WHATSAPP
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>

        <button
          id="nav-hamburger-trigger"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="w-10 h-10 border border-slate-800 hover:border-[#00f0ff]/50 hover:bg-slate-900 rounded-full flex items-center justify-center transition-all cursor-pointer text-slate-100 relative z-50"
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <div id="full-menu-overlay" className="fixed inset-0 z-40 bg-neutral-900/40 backdrop-blur-md flex justify-end">
            <div className="absolute inset-0" onClick={closeMenu} />

            <motion.div
              initial={{ x: "100%", opacity: 0.95 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="relative w-full max-w-md h-full bg-[#03081e] border-l border-cyan-500/20 shadow-2xl shadow-cyan-950/65 p-6 md:p-8 flex flex-col justify-between overflow-y-auto"
            >
              <div className="space-y-6 pt-10">
                <div className="border-b border-cyan-500/10 pb-5">
                  <span className="text-[9px] font-mono tracking-widest text-[#00f0ff] font-semibold block uppercase">
                    VERO ODONTOLOGIA
                  </span>
                  <h4 className="text-xl font-bold font-sans tracking-tight text-white mt-1">
                    Como podemos ajudar?
                  </h4>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    Fale com a equipe pelo WhatsApp para tirar dúvidas, enviar sua necessidade e agendar uma avaliação.
                  </p>
                </div>

                <div className="grid gap-2 text-sm font-mono tracking-wider uppercase font-bold">
                  <a href="#sobre-clinica" onClick={closeMenu} className="p-3 rounded-xl border border-cyan-500/10 hover:border-cyan-400/30 hover:bg-slate-900/60 transition-all">
                    A Clínica
                  </a>
                  <a href="#services" onClick={closeMenu} className="p-3 rounded-xl border border-cyan-500/10 hover:border-cyan-400/30 hover:bg-slate-900/60 transition-all">
                    Tratamentos
                  </a>
                  <a href="#smile-simulator-container" onClick={closeMenu} className="p-3 rounded-xl border border-cyan-500/10 hover:border-cyan-400/30 hover:bg-slate-900/60 transition-all">
                    Orientação inicial
                  </a>
                  <a href="#depoimentos" onClick={closeMenu} className="p-3 rounded-xl border border-cyan-500/10 hover:border-cyan-400/30 hover:bg-slate-900/60 transition-all">
                    Depoimentos
                  </a>
                </div>

                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  className="w-full bg-[#25d366] hover:brightness-110 text-white rounded-xl px-5 py-3 text-[11px] font-mono font-black tracking-widest uppercase transition-all flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  Agendar pelo WhatsApp
                </a>

                <div className="space-y-3 pt-4 border-t border-cyan-500/10">
                  <span className="text-[10px] font-mono tracking-wider font-semibold text-slate-400 block">
                    HORÁRIOS DE ATENDIMENTO
                  </span>
                  <div className="space-y-2 text-xs font-mono text-slate-300">
                    <div className="flex justify-between">
                      <span>SEG - QUA</span>
                      <span className="text-white font-semibold">08:00 às 19:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>QUI - SEX</span>
                      <span className="text-white font-semibold">08:30 às 18:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>SÁBADOS</span>
                      <span className="text-cyan-400 font-semibold">APENAS URGÊNCIAS</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-cyan-500/10 space-y-4">
                <div className="flex gap-3 items-center">
                  <Phone className="w-4 h-4 text-cyan-400 animate-pulse" />
                  <div>
                    <span className="text-[8px] font-mono text-slate-400 block uppercase font-bold">TELEFONE CLÍNICA</span>
                    <strong className="text-xs text-white font-mono">+55 (11) 3333-3333</strong>
                  </div>
                </div>

                <div className="flex gap-3 items-center">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <div>
                    <span className="text-[8px] font-mono text-slate-400 block uppercase font-bold">ENDEREÇO</span>
                    <p className="text-[11px] text-slate-300">Av. Brigadeiro Faria Lima, 2000 - Pinheiros, São Paulo/SP</p>
                  </div>
                </div>

                <div className="flex gap-2 items-center text-[9px] text-slate-400 font-mono bg-slate-950/60 p-2.5 rounded-lg border border-cyan-500/10 mt-2">
                  <ShieldCheck className="w-4 h-4 text-cyan-400 animate-pulse" />
                  <span>Clínica odontológica registrada. Atendimento sujeito à avaliação profissional.</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}
