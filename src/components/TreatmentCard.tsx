/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Treatment } from "../types";

interface TreatmentCardProps {
  key?: string;
  treatment: Treatment;
  isActive: boolean;
  onSelect: () => void;
  index: number;
}

export default function TreatmentCard({
  treatment,
  isActive,
  onSelect,
  index
}: TreatmentCardProps) {
  // Mapping clinical features to elegant short tags matching 'BRANDING, WEBSITES, UI/UX, ART DIRECTION'
  const shortTags = {
    cosmetic: "LENTES E FACETAS, SIMULAÇÃO 3D, ESTÉTICA",
    restorative: "IMPLANTES BIOCONECTIVOS, CARGA IMEDIATA",
    ortho: "ALINHADORES INVISÍVEIS, PREVENÇÃO ATIVA"
  }[treatment.id] || "REABILITAÇÃO ORAL E ESTÉTICA DENTAL AVANÇADA";

  return (
    <motion.button
      id={`treatment-card-${treatment.id}`}
      onClick={onSelect}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 * index + 0.2, type: "spring", stiffness: 100, damping: 18 }}
      whileHover={{ scale: 1.02 }}
      className={`relative w-full max-w-[340px] text-left p-6 rounded-[20px] transition-all cursor-pointer block select-none ${
        isActive
          ? "glass-treatment-card border-[#00f0ff]/50 ring-1 ring-[#00f0ff]/20 bg-cyan-950/25 shadow-lg shadow-black/80"
          : "glass-treatment-card"
      }`}
    >
      {/* Absolute indicator badge when active */}
      {isActive && (
        <span className="absolute top-3 left-4 flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#00f0ff]"></span>
        </span>
      )}

      <div className="flex justify-between items-start gap-4">
        {/* Title Container */}
        <div className="space-y-1.5">
          <h4 className={`text-[11px] font-bold font-mono tracking-widest uppercase transition-colors ${
            isActive ? "text-[#00f0ff]" : "text-slate-100"
          }`}>
            {treatment.title}
          </h4>
          <p className={`text-[10px] uppercase font-sans tracking-[0.04em] font-medium leading-relaxed transition-colors ${
            isActive ? "text-slate-200" : "text-slate-400"
          }`}>
            {shortTags}
          </p>
        </div>

        {/* Right Arrow */}
        <div className="pt-0.5 shrink-0">
          <ArrowUpRight
            className={`w-4 h-4 transition-transform ${
              isActive ? "text-[#00f0ff] scale-110 translate-x-0.5 -translate-y-0.5" : "text-slate-400"
            }`}
          />
        </div>
      </div>
    </motion.button>
  );
}
