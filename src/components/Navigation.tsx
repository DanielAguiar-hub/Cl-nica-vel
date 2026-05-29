/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowUpRight, Clock, MapPin, Phone, Trash2, Calendar, ShieldCheck } from "lucide-react";
import { Appointment } from "../types";
import { TREATMENTS } from "../data";

const WHATSAPP_LINK = "https://wa.me/5511999999999?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20uma%20consulta%20na%20Viu%20Odontologia.";

interface NavigationProps {
  appointments: Appointment[];
  onCancelAppointment: (id: string) => void;
  onOpenBooking: () => void;
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
        VIU<span className="text-cyan-400 font-light">odontologia</span>
      </span>
    </div>
  );
}

export default function Navigation({
  appointments,
  onCancelAppointment,
  onOpenBooking
}: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="relative w-full max-w-7xl mx-auto py-4 md:py-6 px-4 md:px-8 z-40 bg-transparent flex justify-between items-center">
      {/* Brand logo personalizado */}
      <a href="#">
        <ClinicLogo />
      </a>

      {/* Menu de navegação superior funcional com links traduzidos */}
      <nav id="top-nav-menu" className="hidden md:flex items-center gap-1.5 p-1 bg-slate-950/15 backdrop-blur-md border border-white/5 rounded-full text-[10px] font-mono tracking-widest text-slate-300 select-none shadow-inner shadow-cyan-950/20">
        <a href="#sobre-clinica" className="hover:text-[#00f0ff] hover:bg-white/5 px-4 py-2 rounded-full transition-all uppercase font-bold">
          A Clínica
        </a>
        <a href="#services" className="hover:text-[#00f0ff] hover:bg-white/5 px-4 py-2 rounded-full transition-all uppercase font-bold">
          Serviços
        </a>
        <a href="#smile-simulator-container" className="hover:text-[#00f0ff] hover:bg-white/5 px-4 py-2 rounded-full transition-all uppercase font-bold">
          Simulador 3D
        </a>
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#00f0ff] hover:bg-white/5 px-4 py-2 rounded-full transition-all uppercase font-bold cursor-pointer"
        >
          Agendamento
        </a>
      </nav>

      {/* Botões do canto superior direito */}
      <div className="flex items-center gap-3">
        <a
          id="nav-cta-contact"
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:brightness-110 text-slate-950 font-mono rounded-full px-6 py-2.5 text-[9px] tracking-widest font-black transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer uppercase"
        >
          WHATSAPP
          <span className="text-xs">↗</span>
        </a>

        {/* Botão circular do menu lateral (Hambúrguer) */}
        <button
          id="nav-hamburger-trigger"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="w-10 h-10 border border-slate-800 hover:border-[#00f0ff]/50 hover:bg-slate-900 rounded-full flex items-center justify-center transition-all cursor-pointer text-slate-100 relative z-50"
        >
          {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          {appointments.length > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-400 text-black rounded-full text-[8px] flex items-center justify-center font-mono font-black animate-pulse">
              {appointments.length}
            </span>
          )}
        </button>
      </div>

      {/* Menu lateral deslizante (Overlay) */}
      <AnimatePresence>
        {isMenuOpen && (
          <div id="full-menu-overlay" className="fixed inset-0 z-40 bg-neutral-900/40 backdrop-blur-md flex justify-end">
            <div className="absolute inset-0" onClick={() => setIsMenuOpen(false)} />

            <motion.div
              initial={{ x: "100%", opacity: 0.95 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="relative w-full max-w-md h-full bg-[#03081e] border-l border-cyan-500/20 shadow-2xl shadow-cyan-950/65 p-6 md:p-8 flex flex-col justify-between overflow-y-auto"
            >
              {/* Cabeçalho do menu lateral */}
              <div className="space-y-6 pt-10">
                <div className="border-b border-cyan-500/10 pb-5">
                  <span className="text-[9px] font-mono tracking-widest text-[#00f0ff] font-semibold block uppercase">
                    VIU ODONTOLOGIA CLÍNICA BOUTIQUE
                  </span>
                  <h4 className="text-xl font-bold font-sans tracking-tight text-white mt-1">
                    Informações Clínicas
                  </h4>
                </div>

                {/* Lista de Consultas Marcadas do Usuário (Local) */}
                <div className="space-y-3">
                  <span className="text-[10px] font-mono tracking-wider font-semibold text-slate-400 block">
                    SEUS AGENDAMENTOS ATIVOS ({appointments.length})
                  </span>

                  {appointments.length === 0 ? (
                    <div className="p-4 rounded-xl border border-dashed border-cyan-500/20 text-center space-y-2 bg-slate-950/60">
                      <p className="text-xs text-slate-400 font-sans">
                        Nenhum agendamento ativo no sistema local.
                      </p>
                      <a
                        href={WHATSAPP_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsMenuOpen(false)}
                        className="text-[10px] text-[#00f0ff] hover:underline font-mono font-bold tracking-wider inline-block cursor-pointer"
                      >
                        AGENDAR UMA SESSÃO DIGITAL ↗
                      </a>
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                      {appointments.map((app) => {
                        const treat = TREATMENTS.find((t) => t.id === app.treatmentId);
                        return (
                          <div
                            key={app.id}
                            className="p-3 border border-cyan-500/15 rounded-xl hover:bg-slate-900/60 transition-colors flex justify-between items-start text-xs font-sans gap-2"
                          >
                            <div className="space-y-1">
                              <div className="flex gap-1.5 items-center">
                                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
                                <strong className="text-white font-semibold">{app.patientName}</strong>
                              </div>
                              <p className="text-[10px] text-slate-400 font-mono">
                                {treat?.title || "Exame Geral"}
                              </p>
                              <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono mt-1">
                                <span className="flex items-center gap-0.5">
                                  <Calendar className="w-3 h-3" />
                                  {app.date}
                                </span>
                                <span>•</span>
                                <span>{app.timeSlot}</span>
                              </div>
                            </div>
                            <button
                              title="Cancelar agendamento"
                              onClick={() => {
                                onCancelAppointment(app.id);
                              }}
                              className="p-1 px-1.5 hover:bg-red-950/50 hover:text-red-400 text-slate-400 rounded-md transition-all cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Quadro de Horários */}
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

              {/* Contatos e Endereço */}
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
                  <span>Clínica Odontológica Registrada. CRO-SP № 9999. Diretor Técnico Responsável.</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}
