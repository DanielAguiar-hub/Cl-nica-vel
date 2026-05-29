/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Calendar, User, Clock, FileText, Check, Sparkles } from "lucide-react";
import { Appointment } from "../types";
import { TREATMENTS, DENTISTS } from "../data";

const WHATSAPP_LINK = "https://wa.me/5511999999999?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20uma%20consulta%20na%20Viu%20Odontologia.";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedTreatmentId?: string;
  onBookingSuccess: (appointment: Appointment) => void;
}

export default function BookingModal({
  isOpen,
  onClose,
  preselectedTreatmentId = "cosmetic",
  onBookingSuccess
}: BookingModalProps) {
  const [patientName, setPatientName] = useState("");
  const [email, setEmail] = useState("");
  const [treatmentId, setTreatmentId] = useState(preselectedTreatmentId);
  const [dentistName, setDentistName] = useState(DENTISTS[0].name);
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("10:00 AM");
  const [notes, setNotes] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [createdAppointment, setCreatedAppointment] = useState<Appointment | null>(null);

  // Validation
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim()) {
      setErrorMsg("Por favor, informe seu nome completo.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setErrorMsg("Por favor, insira um e-mail de contato válido.");
      return;
    }
    if (!date) {
      setErrorMsg("Por favor, selecione a data da consulta.");
      return;
    }

    setErrorMsg("");

    const newAppointment: Appointment = {
      id: "viu-" + Date.now().toString().slice(-6),
      patientName,
      email,
      treatmentId,
      dentistName,
      date,
      timeSlot,
      notes,
      createdAt: new Date().toISOString()
    };

    onBookingSuccess(newAppointment);
    setCreatedAppointment(newAppointment);
    setIsSuccess(true);
  };

  const resetForm = () => {
    setPatientName("");
    setEmail("");
    setTreatmentId("cosmetic");
    setDentistName(DENTISTS[0].name);
    setDate("");
    setTimeSlot("10:00 AM");
    setNotes("");
    setIsSuccess(false);
    setCreatedAppointment(null);
  };

  const matchedTreatment = TREATMENTS.find(t => t.id === (createdAppointment?.treatmentId || treatmentId));

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="booking-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => {
              resetForm();
              onClose();
            }}
          />

          {/* Dialog Body */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", duration: 0.5 }}
            id="booking-modal-content"
            className="relative bg-[#03081e] text-slate-100 border border-cyan-500/20 shadow-2xl shadow-cyan-950/60 rounded-2xl w-full max-w-lg overflow-hidden z-10 flex flex-col"
          >
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-5 border-b border-cyan-500/10 bg-slate-950/50">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#00f0ff] font-semibold uppercase">
                  SOLICITAÇÃO DE AGENDAMENTO
                </span>
                <h3 className="text-xl font-bold font-sans tracking-tight text-white mt-0.5">
                  Agendar Consulta
                </h3>
              </div>
              <button
                id="close-booking-btn"
                onClick={() => {
                  resetForm();
                  onClose();
                }}
                className="p-1.5 rounded-full hover:bg-slate-900 transition-colors cursor-pointer text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content box */}
            <div className="p-6 overflow-y-auto max-h-[80vh]">
              {!isSuccess ? (
                <form id="clinic-booking-form" onSubmit={handleSubmit} className="space-y-4">
                  {errorMsg && (
                    <div id="booking-error-badge" className="p-3 bg-red-950/30 border border-red-500/25 text-red-400 rounded-lg text-xs font-mono font-medium">
                      ⚠ {errorMsg}
                    </div>
                  )}

                  {/* Patient Name */}
                  <div className="space-y-1">
                    <label id="label-patient-name" className="block text-[11px] font-mono tracking-wider text-cyan-400/80 font-medium">
                      NOME COMPLETO DO PACIENTE
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                        <User className="w-4 h-4" />
                      </span>
                      <input
                        id="input-patient-name"
                        type="text"
                        placeholder="Ex: Alister Ross"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 border border-slate-800 rounded-lg text-sm bg-slate-950/70 text-white focus:bg-slate-950 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-500/30 outline-none transition-all font-sans font-medium"
                      />
                    </div>
                  </div>

                  {/* Patient Email */}
                  <div className="space-y-1">
                    <label id="label-patient-email" className="block text-[11px] font-mono tracking-wider text-cyan-400/80 font-medium">
                      E-MAIL DE CONTATO
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                        <span className="text-xs font-mono">@</span>
                      </span>
                      <input
                        id="input-patient-email"
                        type="email"
                        placeholder="seu-email@dominio.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 border border-slate-800 rounded-lg text-sm bg-slate-950/70 text-white focus:bg-slate-950 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-500/30 outline-none transition-all font-sans font-medium"
                      />
                    </div>
                  </div>

                  {/* Treatment Choice */}
                  <div className="space-y-1">
                    <label id="label-treatment-type" className="block text-[11px] font-mono tracking-wider text-cyan-400/80 font-medium">
                      ESPECIALIDADE DESEJADA
                    </label>
                    <select
                      id="select-treatment-type"
                      value={treatmentId}
                      onChange={(e) => setTreatmentId(e.target.value)}
                      className="w-full px-3 py-2.5 border border-slate-800 rounded-lg text-sm bg-slate-950/70 text-white focus:bg-slate-950 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 outline-none transition-all font-sans font-medium appearance-none"
                    >
                      {TREATMENTS.map((item) => (
                        <option className="bg-slate-950 text-white" key={item.id} value={item.id}>
                          {item.tag} - {item.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Specialty Dentist Choice */}
                  <div className="space-y-1">
                    <label id="label-dentist" className="block text-[11px] font-mono tracking-wider text-cyan-400/80 font-medium">
                      PROFISSIONAL / DENTISTA
                    </label>
                    <select
                      id="select-dentist"
                      value={dentistName}
                      onChange={(e) => setDentistName(e.target.value)}
                      className="w-full px-3 py-2.5 border border-slate-800 rounded-lg text-sm bg-slate-950/70 text-white focus:bg-slate-950 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 outline-none transition-all font-sans font-medium appearance-none"
                    >
                      {DENTISTS.map((dentist) => (
                        <option className="bg-slate-950 text-white" key={dentist.name} value={dentist.name}>
                          {dentist.name} ({dentist.role})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Date & Time Row */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label id="label-booking-date" className="block text-[11px] font-mono tracking-wider text-cyan-400/80 font-medium">
                        DATA DESEJADA
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                          <Calendar className="w-4 h-4" />
                        </span>
                        <input
                          id="input-booking-date"
                          type="date"
                          value={date}
                          min={new Date().toISOString().split("T")[0]}
                          onChange={(e) => setDate(e.target.value)}
                          className="w-full pl-9 pr-3 py-2.5 border border-slate-800 rounded-lg text-xs bg-slate-950/70 text-white focus:bg-slate-950 focus:border-cyan-400 outline-none transition-all font-mono font-medium"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label id="label-booking-time" className="block text-[11px] font-mono tracking-wider text-cyan-400/80 font-medium">
                        PERÍODO / HORÁRIO
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                          <Clock className="w-4 h-4" />
                        </span>
                        <select
                          id="select-booking-time"
                          value={timeSlot}
                          onChange={(e) => setTimeSlot(e.target.value)}
                          className="w-full pl-9 pr-2 py-2.5 border border-slate-800 rounded-lg text-xs bg-slate-950/70 text-white focus:bg-slate-950 focus:border-cyan-400 outline-none transition-all font-mono font-medium appearance-none"
                        >
                          <option className="bg-slate-950 text-white" value="09:00 AM">09:00 - Período Manhã</option>
                          <option className="bg-slate-950 text-white" value="10:30 AM">10:30 - Período Manhã</option>
                          <option className="bg-slate-950 text-white" value="01:00 PM">13:00 - Período Tarde</option>
                          <option className="bg-slate-950 text-white" value="02:30 PM">14:30 - Período Tarde</option>
                          <option className="bg-slate-950 text-white" value="04:00 PM">16:00 - Fim de Tarde</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Medical Note */}
                  <div className="space-y-1">
                    <label id="label-booking-notes" className="block text-[11px] font-mono tracking-wider text-cyan-400/80 font-medium">
                      SINTOMAS OU DÚVIDAS (OPCIONAL)
                    </label>
                    <div className="relative">
                      <span className="absolute top-2.5 left-3 text-slate-500">
                        <FileText className="w-4 h-4" />
                      </span>
                      <textarea
                        id="textarea-booking-notes"
                        rows={2}
                        placeholder="Ex: Sensibilidade nos dentes, dúvidas sobre o design de lentes ou aparelhos..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 border border-slate-800 rounded-lg text-xs bg-slate-950/70 text-white focus:bg-slate-950 focus:border-cyan-400 outline-none transition-all font-sans font-medium"
                      />
                    </div>
                  </div>

                  <p id="booking-disclaimer" className="text-[10px] text-slate-400 font-sans leading-tight">
                    * Os horários pré-agendados estão sujeitos à confirmação. Um especialista de atendimento entrará em contato via WhatsApp.
                  </p>

                  <div className="flex gap-3 pt-2">
                    <button
                      id="submit-booking-btn"
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-cyan-400 to-blue-500 hover:brightness-110 text-slate-950 py-3 rounded-xl text-xs font-mono font-black tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg"
                    >
                      <Sparkles className="w-4 h-4 text-slate-950 animate-pulse" />
                      CONFIRMAR PRÉ-AGENDAMENTO
                    </button>
                  </div>
                </form>
              ) : (
                <motion.div
                  id="booking-success-receipt"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6 text-center py-4"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-[#00f0ff] text-slate-950 rounded-full mx-auto shadow-md shadow-cyan-500/20">
                    <Check className="w-6 h-6 stroke-[3]" />
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-lg font-bold font-sans tracking-tight text-white">
                      Pré-Agendamento Concluído!
                    </h4>
                    <p className="text-xs text-[#00f0ff] font-mono">
                      CÓDIGO DE CONTROLE: #{createdAppointment?.id}
                    </p>
                  </div>

                  {/* Ticket design */}
                  <div className="border border-cyan-500/20 text-left rounded-xl overflow-hidden font-mono divide-y divide-cyan-500/10 shadow-lg bg-slate-950/60">
                    <div className="p-3 bg-slate-900/60 flex justify-between items-center text-[10px] text-cyan-400">
                      <span>COMPROVANTE DE SOLICITAÇÃO</span>
                      <span>AGUARDANDO CONFIRMAÇÃO</span>
                    </div>
                    <div className="p-3 space-y-1 text-xs text-slate-300">
                      <div>
                        <span className="text-cyan-400/60 uppercase text-[9px] block">PACIENTE</span>
                        <strong className="text-white font-sans font-bold">{createdAppointment?.patientName}</strong>
                      </div>
                      <div className="pt-2">
                        <span className="text-cyan-400/60 uppercase text-[9px] block">ESPECIALIDADE</span>
                        <strong className="text-[#00f0ff] text-[11px] block">{matchedTreatment?.tag}</strong>
                        <span className="text-[10px] text-slate-400 font-sans">{matchedTreatment?.title}</span>
                      </div>
                      <div className="pt-2 grid grid-cols-2 gap-2 border-t border-cyan-500/10 mt-2">
                        <div>
                          <span className="text-cyan-400/60 uppercase text-[9px] block">DATA</span>
                          <span className="text-white font-sans font-semibold">{createdAppointment?.date}</span>
                        </div>
                        <div>
                          <span className="text-cyan-400/60 uppercase text-[9px] block">PERÍODO</span>
                          <span className="text-white">{createdAppointment?.timeSlot}</span>
                        </div>
                      </div>
                      <div className="pt-2 border-t border-cyan-500/10 mt-2">
                        <span className="text-cyan-400/60 uppercase text-[9px] block">DENTISTA ASSINALADO</span>
                        <span className="text-white font-sans font-medium">{createdAppointment?.dentistName}</span>
                      </div>
                    </div>
                    <div className="p-3 bg-slate-950/40 text-[10px] text-slate-400 text-center">
                      Clique no botão abaixo para nos enviar uma mensagem direta no WhatsApp e acelerar sua confirmação.
                    </div>
                  </div>

                  <div className="space-y-3">
                    <a
                      href={WHATSAPP_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-gradient-to-r from-[#25d366] to-[#128c7e] hover:brightness-110 text-white py-3 rounded-lg text-xs font-mono font-black tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      CONFIRMAR VIA WHATSAPP ↗
                    </a>

                    <button
                      id="finish-booking-btn"
                      onClick={() => {
                        resetForm();
                        onClose();
                      }}
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white py-2.5 rounded-lg text-xs font-mono font-bold tracking-widest transition-all cursor-pointer"
                    >
                      VOLTAR PARA A PÁGINA
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
