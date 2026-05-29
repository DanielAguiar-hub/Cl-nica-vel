/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShieldCheck, Brain } from "lucide-react";
import { SimulationResult } from "../types";

export default function SmileSimulator() {
  const [goal, setGoal] = useState("whiten");
  const [results, setResults] = useState<SimulationResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSimulate = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      let simResult: SimulationResult;

      if (goal === "whiten") {
        simResult = {
          concern: "Melhoria de Tonalidade & Brilho do Esmalte",
          tier: "ESTÉTICA AVANÇADA - GRAU 1",
          recommedation: "Clareamento biológico com peróxido de hidrogênio ativado combinado com lentes de porcelana feldspática ultrafinas para simetria ideal.",
          timeline: "1 a 2 Sessões (7-10 Dias no total)",
          importance: 2
        };
      } else if (goal === "alignment") {
        simResult = {
          concern: "Correção de Mordida & Alinhamento Oclusal",
          tier: "ALINHADORES INVISÍVEIS - GRAU 2",
          recommedation: "Alinhadores termoplásticos sequenciais Invisalign® planejados por escaneamento 3D para posicionamento e ganho de postura oclusal.",
          timeline: "6 a 12 Meses monitorados",
          importance: 4
        };
      } else if (goal === "missing") {
        simResult = {
          concern: "Ausência Dentária & Perda Óssea",
          tier: "REABILITAÇÃO ORAL E IMPLANTES - GRAU 5",
          recommedation: "Cirurgia de implante guiada por computador. Fixação de pino de titânio ou zircônia com colocação imediata de coroa provisória.",
          timeline: "2 a 3 Sessões (3 Meses de osseointegração)",
          importance: 5
        };
      } else {
        simResult = {
          concern: "Remoção de Patógenos & Limpeza Preventiva",
          tier: "PROFILAXIA E HIGIENE INTEGRATIVA - GRAU 3",
          recommedation: "Profilaxia profunda com fluxo de ar de glicina, análise e orientação do microbioma oral para a preservação de gengivas saudáveis.",
          timeline: "Sessão única (retornos a cada 6 meses)",
          importance: 3
        };
      }

      setResults(simResult);
      setLoading(false);
    }, 600);
  };

  return (
    <div id="smile-simulator-container" className="bg-slate-950/45 backdrop-blur-md rounded-2xl p-5 border border-cyan-500/25 max-w-md w-full shadow-xl shadow-black/40">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse" />
        <span className="text-[9px] font-mono tracking-widest text-[#00f0ff] font-semibold uppercase">
          SIMULADOR DIGITAL DE SORRISOS
        </span>
      </div>

      <h5 className="text-sm font-bold font-sans tracking-tight text-white mb-1">
        Simule Seu Tratamento
      </h5>
      <p className="text-[11px] text-slate-400 font-sans leading-relaxed mb-4">
        Selecione o seu principal objetivo estético ou de saúde bucal para receber uma estimativa clínica recomendada.
      </p>

      <form id="simulator-form" onSubmit={handleSimulate} className="space-y-3">
        <div>
          <label className="block text-[8px] font-mono text-cyan-400/70 tracking-wider mb-1">
            OBJETIVO PRINCIPAL
          </label>
          <div className="grid grid-cols-2 gap-2 text-[10px] font-sans font-medium">
            <label
              className={`p-2 border rounded-lg flex items-center justify-between cursor-pointer transition-all ${
                goal === "whiten"
                  ? "bg-cyan-500/15 border-cyan-400/60 text-[#00f0ff] ring-1 ring-cyan-400/30"
                  : "bg-slate-950/40 text-slate-300 hover:bg-slate-900 border-slate-800"
              }`}
            >
              <span>Lentes & Clareamento</span>
              <input
                type="radio"
                name="sim-goal"
                value="whiten"
                checked={goal === "whiten"}
                onChange={() => setGoal("whiten")}
                className="sr-only"
              />
            </label>

            <label
              className={`p-2 border rounded-lg flex items-center justify-between cursor-pointer transition-all ${
                goal === "alignment"
                  ? "bg-cyan-500/15 border-cyan-400/60 text-[#00f0ff] ring-1 ring-cyan-400/30"
                  : "bg-slate-950/40 text-slate-300 hover:bg-slate-900 border-slate-800"
              }`}
            >
              <span>Alinhar Dentes</span>
              <input
                type="radio"
                name="sim-goal"
                value="alignment"
                checked={goal === "alignment"}
                onChange={() => setGoal("alignment")}
                className="sr-only"
              />
            </label>

            <label
              className={`p-2 border rounded-lg flex items-center justify-between cursor-pointer transition-all ${
                goal === "missing"
                  ? "bg-cyan-500/15 border-cyan-400/60 text-[#00f0ff] ring-1 ring-cyan-400/30"
                  : "bg-slate-950/40 text-slate-300 hover:bg-slate-900 border-slate-800"
              }`}
            >
              <span>Implante & Coroa</span>
              <input
                type="radio"
                name="sim-goal"
                value="missing"
                checked={goal === "missing"}
                onChange={() => setGoal("missing")}
                className="sr-only"
              />
            </label>

            <label
              className={`p-2 border rounded-lg flex items-center justify-between cursor-pointer transition-all ${
                goal === "detox"
                  ? "bg-cyan-500/15 border-cyan-400/60 text-[#00f0ff] ring-1 ring-cyan-400/30"
                  : "bg-slate-950/40 text-slate-300 hover:bg-slate-900 border-slate-800"
              }`}
            >
              <span>Saúde Gengival</span>
              <input
                type="radio"
                name="sim-goal"
                value="detox"
                checked={goal === "detox"}
                onChange={() => setGoal("detox")}
                className="sr-only"
              />
            </label>
          </div>
        </div>

        {/* Botão de simulação */}
        <button
          id="trigger-simulation-btn"
          type="submit"
          disabled={loading}
          className="w-full bg-white hover:bg-slate-100 hover:brightness-105 text-slate-950 py-2.5 rounded-lg text-[10px] font-mono tracking-widest font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-[0_0_15px_rgba(255,255,255,0.12)] hover:shadow-[0_0_22px_rgba(255,255,255,0.25)] hover:scale-[1.02] duration-300"
        >
          {loading ? (
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-slate-950 rounded-full animate-ping" />
              MAPEANDO PROPORÇÕES FACIAIS...
            </span>
          ) : (
            <>
              <Brain className="w-3.5 h-3.5" />
              SIMULAR MEU TRATAMENTO
            </>
          )}
        </button>
      </form>

      {/* Resultados da simulação */}
      <AnimatePresence mode="wait">
        {results && !loading && (
          <motion.div
            id="simulation-results-box"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 pt-3 border-t border-dashed border-cyan-500/10 text-xs font-sans space-y-2 text-slate-300"
          >
            <div>
              <span className="text-[8px] font-mono text-cyan-400/60 uppercase tracking-widest block">AVALIAÇÃO PREVENTIVA</span>
              <strong className="text-white text-xs font-semibold">{results.concern}</strong>
            </div>

            <div>
              <span className="text-[8px] font-mono text-cyan-400/60 uppercase tracking-widest block font-bold">MÉTODO RECOMENDADO</span>
              <p className="text-[11px] leading-relaxed font-sans text-slate-300 mt-0.5">{results.recommedation}</p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <div>
                <span className="text-[8px] font-mono text-cyan-400/60 uppercase tracking-widest block">ESTIMATIVA DE TEMPO</span>
                <span className="font-semibold text-white">{results.timeline}</span>
              </div>
              <div>
                <span className="text-[8px] font-mono text-cyan-400/60 uppercase tracking-widest block">GRAU DE URGÊNCIA</span>
                <span className="flex gap-1 mt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={`w-2 h-2 rounded-full ${
                        i < results.importance ? "bg-cyan-400 shadow-sm shadow-cyan-400" : "bg-slate-800"
                      }`}
                    />
                  ))}
                </span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2 text-[10px] text-cyan-400 bg-cyan-950/20 p-2 border border-cyan-500/20 rounded-lg">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
              <span>Garantia de biossegurança com materiais biocompatíveis e livres de metal.</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
