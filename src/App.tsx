/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkle, ArrowUpRight, Globe, Check, AlertCircle, Heart, Activity, UserCheck, Shield, Phone, MapPin, Instagram, Facebook, Linkedin } from "lucide-react";
import { TREATMENTS, CLINIC_STATS, SERVICES_GRID, TESTIMONIALS, WHATSAPP_LINK, createWhatsAppLink } from "./data";
import Navigation from "./components/Navigation";
import TreatmentCard from "./components/TreatmentCard";
import SmileSimulator from "./components/SmileSimulator";

export { WHATSAPP_LINK };

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

function getServiceIcon(id: string) {
  switch (id) {
    case "01": return <UserCheck className="w-4 h-4 text-cyan-400 group-hover:text-white transition-all duration-300" />;
    case "02": return <Sparkle className="w-4 h-4 text-cyan-400 group-hover:text-white transition-all duration-300 fill-cyan-400/20" />;
    case "03": return <Activity className="w-4 h-4 text-cyan-400 group-hover:text-white transition-all duration-300" />;
    case "04": return <Heart className="w-4 h-4 text-cyan-400 group-hover:text-white transition-all duration-300 fill-cyan-400/10" />;
    case "05": return <Shield className="w-4 h-4 text-cyan-400 group-hover:text-white transition-all duration-300" />;
    case "06": return <AlertCircle className="w-4 h-4 text-[#00f0ff] animate-pulse group-hover:text-white transition-all duration-300" />;
    default: return <Sparkle className="w-4 h-4 text-cyan-400" />;
  }
}

function getServiceImage(id: string) {
  switch (id) {
    case "01": return "/photo_clinica_geral.png";
    case "02": return "/photo_estetica.png";
    case "03": return "/photo_ortodontia.png";
    case "04": return "/photo_odontopediatria.png";
    case "05": return "/photo_implantes.png";
    case "06": return "/photo_emergencia.png";
    default: return "/photo_clinica_geral.png";
  }
}

export default function App() {
  const testimonialsRef = useRef<HTMLDivElement>(null);

  const scrollTestimonials = (direction: "left" | "right") => {
    if (testimonialsRef.current) {
      const cardWidth = 370; // approximate card width + gap
      const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
      testimonialsRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth"
      });
    }
  };
  const [selectedTreatmentId, setSelectedTreatmentId] = useState<string>("cosmetic");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showNotice = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const activeTreatment = TREATMENTS.find((t) => t.id === selectedTreatmentId) || TREATMENTS[0];
  const heroWhatsAppLink = createWhatsAppLink("Olá! Vim pelo site da Vero Odontologia e gostaria de agendar uma avaliação.");
  const activeTreatmentWhatsAppLink = createWhatsAppLink(`Olá! Gostaria de agendar uma avaliação para ${activeTreatment.title} na Vero Odontologia.`);

  return (
    <div className="min-h-screen w-full anodent-hero-layout text-slate-100 font-sans flex flex-col justify-between overflow-x-hidden relative selection:bg-cyan-500 selection:text-black">
      
      {/* Container relativo da Seção Hero para limitar o escopo do vídeo de fundo */}
      <div className="relative w-full min-h-screen flex flex-col justify-between z-10">
        
        {/* 2. PREMIUM BACKGROUND CLINICAL VIDEO INTEGRATION (Native HTML5 Player) */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden bg-transparent">
          <div className="absolute inset-0 z-15 opacity-[0.20] pointer-events-none mix-blend-screen anodent-precision-grid" />
          <video
            src="https://res.cloudinary.com/dmelswzvz/video/upload/Aligner_floating_on_premium_back__202605291214_durdve.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-hidden="true"
            poster="/photo_clinica_geral.png"
            className="absolute inset-0 w-full h-full object-cover opacity-85 transition-opacity duration-700 ease-in-out"
          />
          {/* Suavização da transição inferior do vídeo para a seção Sobre (Sólida) */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#030614] to-transparent z-20 pointer-events-none" />
        </div>

        {/* Marcadores flutuantes laterais com especialidades da clínica */}
        <div className="absolute top-[28%] right-[8%] z-10 hidden xl:block text-[9px] font-mono tracking-widest text-[#00f0ff]/50 text-right space-y-1.5 select-none uppercase font-bold">
          <div>+ ESTÉTICA DENTAL</div>
          <div>+ IMPLANTODONTIA</div>
          <div>+ ALINHADORES INVISÍVEIS</div>
        </div>

        {/* Mensagens de notificação flutuantes (Toast) */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              id="global-toast-badge"
              initial={{ opacity: 0, y: -20, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: -20, x: "-50%" }}
              className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[#03081e] text-white text-xs font-mono tracking-wider font-semibold px-5 py-3 rounded-xl border border-cyan-500/20 shadow-xl shadow-cyan-950/40 flex items-center gap-2.5"
            >
              <Check className="w-4 h-4 text-cyan-400" />
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 1. Cabeçalho / Menu de Navegação */}
        <Navigation whatsappLink={heroWhatsAppLink} />

        {/* 2. Conteúdo Principal (Hero Grid) */}
        <main className="w-full max-w-7xl mx-auto px-4 md:px-8 mt-4 md:mt-8 mb-12 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 relative items-center z-10">
          
          <div className="hidden xl:flex absolute left-[-60px] top-[140px] items-center gap-3 transform -rotate-90 origin-left text-[9px] font-mono tracking-[0.2em] text-cyan-400/25 select-none">
            <span>+ CONSULTÓRIO DIGITAL: PRONTO PARA ATENDIMENTO.</span>
          </div>

          {/* --- COLUNA ESQUERDA: APRESENTAÇÃO, TÍTULO PRINCIPAL E SIMULADOR (LG: 7 Cols) --- */}
          <section className="lg:col-span-7 space-y-6 md:space-y-8 xl:pl-10 relative">
            
            {/* Indicador de Marca Institucional */}
            <div className="flex items-start gap-4 select-none" id="brand-indicator-row">
              <div className="w-[45px] h-[55px] bg-[#0c1b40]/80 rounded-lg shadow-sm border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <Sparkle className="w-5 h-5 opacity-85 animate-pulse fill-current" />
              </div>
              
              <div className="space-y-0.5 text-left text-slate-400 font-mono text-[9px] leading-tight pt-1">
                <span className="text-white font-black block tracking-widest text-[10px]">VERO ODONTOLOGIA</span>
                <span className="block">ESTÉTICA DENTAL AVANÇADA</span>
                <span className="block">E REABILITAÇÃO ORAL DIGITAL</span>
              </div>

              {/* Mimic de paginação */}
              <div className="ml-6 flex items-center gap-1 pt-3.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-950/40" />
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-950/40" />
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              </div>
            </div>

            {/* Título Principal de Impacto com Mapeamento em Português */}
            <div id="hero-mega-text" className="space-y-1 md:space-y-2 select-none relative pt-2">
              <h1 className="text-4xl sm:text-5xl md:text-[76px] xl:text-[84px] font-black tracking-[-0.04em] leading-[0.80] font-sans uppercase">
                <span className="flex items-end justify-between max-w-full relative">
                  <span className="text-white">CRIANDO</span>
                  <span className="hidden sm:flex items-center gap-2 text-[8px] font-mono tracking-widest text-cyan-400/60 font-bold uppercase pb-1 border-b border-cyan-500/20">
                    <span>PLANEJAMENTO DIGITAL E ATENDIMENTO HUMANO</span>
                    <span className="w-4 h-4 rounded-full border border-cyan-500/30 flex items-center justify-center text-[10px] pb-0.5 leading-none font-normal">+</span>
                  </span>
                </span>

                <span className="block text-[#00d2ff] drop-shadow-[0_0_12px_rgba(0,162,255,0.4)] mt-1 md:mt-2">
                  SORRISO
                </span>

                <span className="block text-slate-100 flex items-center mt-1 md:mt-2">
                  NATU
                  <span className="inline-block px-1 relative -top-1">
                    <Sparkle className="w-10 h-10 md:w-16 md:h-16 text-[#00f0ff] fill-current animate-pulse drop-shadow-[0_0_12px_rgba(0,240,255,0.5)]" />
                  </span>
                  RAL
                </span>
              </h1>
            </div>

            {/* Descrição em Português */}
            <p id="hero-clinic-description" className="text-xs md:text-[13px] text-slate-300 font-sans leading-relaxed max-w-lg select-text font-medium uppercase tracking-wide">
              CUIDADO ODONTOLÓGICO HUMANIZADO EM PINHEIROS, COM PLANEJAMENTO DIGITAL PARA ESTÉTICA, IMPLANTES, ALINHADORES E PREVENÇÃO. ENTENDA SEU CASO E AGENDE PELO WHATSAPP.
            </p>

            {/* Ações da Hero (Redirecionando para o WhatsApp e Rolagem) */}
            <div className="flex flex-wrap items-center gap-6 pt-1" id="hero-actions-container">
              <a
                id="cta-reserve"
                href={heroWhatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white hover:bg-slate-100 hover:brightness-105 text-slate-950 rounded-full px-8 py-3.5 text-[9px] font-mono font-black tracking-widest transition-all cursor-pointer flex items-center gap-3 shadow-[0_0_15px_rgba(255,255,255,0.15)] hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] hover:scale-[1.02] duration-300 uppercase"
              >
                <span className="w-2 h-2 rounded-full bg-slate-950 animate-pulse" />
                AGENDAR PELO WHATSAPP
              </a>

              <a
                id="cta-quick-diagnose"
                href="#services"
                className="text-white hover:text-[#00f0ff] text-[9px] font-mono font-black tracking-widest transition-all border-b border-slate-700 hover:border-[#00f0ff] pb-1 cursor-pointer flex items-center gap-1.5 uppercase"
              >
                VER TRATAMENTOS <span className="text-xs">↓</span>
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl pt-1">
              {[
                "Avaliação com planejamento digital",
                "Atendimento humanizado em Pinheiros",
                "Estética, implantes e alinhadores"
              ].map((benefit) => (
                <div
                  key={benefit}
                  className="bg-slate-950/35 border border-cyan-500/15 rounded-xl px-3 py-2.5 text-[10px] text-slate-200 font-mono font-bold uppercase tracking-wider flex items-center gap-2"
                >
                  <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            {/* Painel do Tratamento Ativo (Lado Esquerdo) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-4 max-w-4xl relative z-10">
              <div className="md:col-span-12 lg:col-span-6 bg-slate-950/45 backdrop-blur-md rounded-2xl p-5 border border-cyan-500/25 space-y-4 shadow-xl shadow-black/40">
                
                {/* Seletor de Protocolos Rápidos - Visível apenas no Mobile */}
                <div className="flex lg:hidden bg-[#020514]/85 p-1 rounded-xl border border-cyan-500/25 gap-1 mb-2">
                  {TREATMENTS.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        setSelectedTreatmentId(t.id);
                        showNotice(`Protocolo carregado: ${t.title}`);
                      }}
                      className={`text-[8px] sm:text-[9px] font-mono tracking-wider font-extrabold py-2 rounded-lg flex-1 transition-all cursor-pointer ${
                        selectedTreatmentId === t.id
                          ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-black shadow-md"
                          : "text-slate-400 hover:text-white hover:bg-slate-900/40"
                      }`}
                    >
                      {t.id === "cosmetic" ? "ESTÉTICA" : t.id === "restorative" ? "IMPLANTES" : "ORTODONTIA"}
                    </button>
                  ))}
                </div>

                <span className="text-[8px] font-mono tracking-widest text-[#00f0ff]/80 uppercase font-black block">
                  TRATAMENTO EM DESTAQUE
                </span>
                <h5 className="text-[13px] font-bold font-sans tracking-tight text-white uppercase">
                  {activeTreatment.title}
                </h5>
                <p className="text-[11px] text-slate-300 font-sans leading-relaxed font-medium">
                  {activeTreatment.description}
                </p>
                <ul className="space-y-1">
                  {activeTreatment.features.slice(0, 3).map((feat, i) => (
                    <li key={i} className="text-[10px] text-slate-100 font-sans flex items-center gap-1.5 font-medium">
                      <span className="text-cyan-400 font-mono text-[9px]">✓</span> {feat}
                    </li>
                  ))}
                </ul>
                <div className="border-t border-dashed border-cyan-500/25 pt-2 flex justify-between text-[9px] font-mono text-cyan-400 font-bold uppercase">
                  <span>{activeTreatment.doctor}</span>
                  <span>{activeTreatment.priceEstimate}</span>
                </div>
              </div>

              {/* Simulador Odontológico Digital Integrado (Lado Direito do Painel Esquerdo) */}
              <div className="md:col-span-12 lg:col-span-6">
                <SmileSimulator />
              </div>
            </div>

          </section>

          {/* --- COLUNA DIREITA: LIBERADA PARA MÁXIMA VISIBILIDADE DO VÍDEO (LG: 5 Cols) --- */}
          <section className="lg:col-span-5 flex flex-col justify-end h-full relative py-8 pl-4 lg:pl-10" id="floating-treatments-column">
            
            <div className="xl:block hidden h-[220px]" /> {/* Espaçador para deixar o vídeo 3D brilhar */}

            {/* Selo de credenciamento clínico */}
            <div className="mt-auto self-center lg:self-end max-w-[280px] text-right space-y-1 opacity-80 select-none">
              <span className="text-[8px] font-mono tracking-widest text-[#00f0ff]/60 font-bold uppercase block">
                SEGURANÇA E ACOLHIMENTO
              </span>
              <p className="text-[10px] text-slate-400 font-sans leading-tight">
                Atendimento planejado para conforto, biossegurança e acompanhamento próximo em cada etapa.
              </p>
            </div>
          </section>

        </main>
      </div>

      {/* 2.2 SEÇÃO: SOBRE A CLÍNICA (Fundo sólido sem vídeo 3D para aterrar o layout, contrastando elegantemente) */}
      <section id="sobre-clinica" className="w-full py-32 bg-[#030614] relative z-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Texto institucional */}
          <div className="lg:col-span-6 space-y-8">
            <div className="flex items-center gap-2 text-[10px] font-mono tracking-[0.2em] text-[#00f0ff] uppercase font-black">
              <span className="w-6 h-[1.5px] bg-[#00f0ff]" />
              <span>A CLÍNICA</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl md:text-[64px] font-black font-sans uppercase tracking-tight text-white leading-[0.95]">
              ODONTOLOGIA HUMANIZADA <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-cyan-300 drop-shadow-[0_0_8px_rgba(0,240,255,0.15)]">COM SUPORTE DIGITAL</span>
            </h2>

            <p className="text-lg sm:text-[19px] text-slate-200 font-sans leading-relaxed">
              Na <strong>VERO Odontologia</strong>, unimos o acolhimento de especialistas à precisão da tecnologia digital bucal. Nossa filosofia foca no tratamento individualizado do paciente, combinando as técnicas estéticas mais avançadas e a saúde biológica orofacial.
            </p>

            <p className="text-lg sm:text-[19px] text-slate-300 font-sans leading-relaxed">
              Nossa clínica foi planejada para oferecer uma experiência confortável, tranquila e eficiente, longe do aspecto frio dos consultórios tradicionais. Trabalhamos com escaneamento tridimensional rápido, cirurgia guiada por computador e materiais biocompatíveis de última geração para restabelecer a estética e a função corretas da sua boca.
            </p>

            <div className="pt-2">
              <a
                href={activeTreatmentWhatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex bg-white hover:bg-slate-100 hover:brightness-105 text-slate-950 rounded-full px-10 py-4.5 text-[10px] font-mono font-black tracking-widest transition-all gap-3 items-center shadow-[0_0_15px_rgba(255,255,255,0.15)] hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] hover:scale-[1.03] duration-300 uppercase"
              >
                <Phone className="w-3.5 h-3.5 text-slate-950" />
                <span>AGENDAR AGORA NO WHATSAPP</span>
                <span className="text-xs">↗</span>
              </a>
            </div>
          </div>

          {/* Coluna direita da clínica com imagem real do consultório */}
          <div className="lg:col-span-6 relative w-full">
            <div className="aspect-[16/10] rounded-3xl overflow-hidden border border-cyan-500/20 relative shadow-2xl">
              <img 
                src="/photo_clinica_geral.png" 
                alt="Consultório Moderno Vero Odontologia" 
                width="1200"
                height="750"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030614]/80 via-transparent to-transparent" />
            </div>

            {/* Painel flutuante de tecnologia */}
            <div className="absolute -bottom-4 -right-2 bg-slate-950/95 backdrop-blur-md p-5 rounded-2xl border border-cyan-500/20 max-w-[220px] shadow-xl">
              <span className="text-[9px] font-mono text-[#00f0ff] font-bold block uppercase tracking-wider">TECNOLOGIA 3D</span>
              <p className="text-xs text-slate-200 leading-relaxed mt-1.5 font-medium">Escaneamento bucal computadorizado rápido e totalmente indolor.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2.5 SEÇÃO: LISTA COMPLETA DE SERVIÇOS (Imagens reais odontológicas inseridas nos cards) */}
      <section id="services" className="w-full pt-16 md:pt-24 pb-28 md:pb-36 relative overflow-hidden z-10 scroll-mt-12 bg-gradient-to-b from-[#030614] via-[#02040c]/70 to-[#02040c]">
        
        {/* Layer do Vídeo de Fundo da Seção de Serviços */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
          <video
            src="https://res.cloudinary.com/dmelswzvz/video/upload/Tooth_levitation_animation_backg__202605291414_ttorci.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-hidden="true"
            poster="/photo_estetica.png"
            className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-screen transition-opacity duration-700 ease-in-out"
          />
          <div className="absolute inset-0 bg-black/4" />
          <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#030614] via-[#030614]/50 to-transparent pointer-events-none z-10" />
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12 md:space-y-16 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <div className="lg:col-span-7 space-y-4 text-left">
              <div className="flex items-center gap-2 text-[10px] font-mono tracking-[0.2em] text-[#00f0ff] uppercase font-black">
                <span className="w-6 h-[1.5px] bg-[#00f0ff]" />
                <span>ESPECIALIDADES</span>
              </div>
              
              <div className="space-y-2 select-none">
                <h2 className="font-sans uppercase">
                  <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-black tracking-[-0.03em] leading-[0.95] text-white">
                    ESCOLHA PELO
                  </span>
                  <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-[60px] font-black tracking-[-0.03em] leading-[0.95] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-[0_0_15px_rgba(0,240,255,0.15)]">
                    QUE VOCÊ
                  </span>
                  <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-black tracking-[-0.03em] leading-[0.95] text-slate-300">
                    PRECISA AGORA
                  </span>
                </h2>
              </div>
              
              <p className="text-[11px] md:text-xs text-slate-400 font-mono leading-relaxed max-w-lg select-text uppercase font-bold tracking-wider pt-2">
                ENCONTRE RAPIDAMENTE O CAMINHO CERTO: DOR, ESTÉTICA, IMPLANTES, ALINHAMENTO, CRIANÇAS OU PREVENÇÃO.
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-6 items-start lg:items-end justify-between lg:justify-end h-full pt-4 lg:pt-8 w-full">
              <div className="flex flex-col gap-2.5 text-[9px] font-mono tracking-[0.18em] text-cyan-400/80 text-left lg:text-right uppercase font-extrabold select-none">
                <div>+ CONFORTO EM PRIMEIRO LUGAR</div>
                <div>+ TECNOLOGIA DE PONTA</div>
                <div>+ DENTISTAS ESPECIALISTAS</div>
              </div>

              <a
                href={heroWhatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-900/60 hover:bg-cyan-400 hover:text-slate-950 border border-cyan-500/20 text-white rounded-xl px-6 py-3.5 text-[9px] font-mono font-black tracking-widest transition-all duration-300 cursor-pointer flex items-center justify-between gap-4 w-full sm:w-auto uppercase shadow-md shadow-slate-950/40"
              >
                <span>FALE CONOSCO NO WHATSAPP</span>
                <span className="text-xs">↗</span>
              </a>
            </div>

          </div>

          {/* Grid de 6 cards de especialidades com imagens reais */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES_GRID.map((service) => (
              <article
                key={service.id}
                className="bg-[#030718]/40 hover:bg-[#05102a]/70 backdrop-blur-xl border border-cyan-500/10 hover:border-cyan-400/30 p-5 rounded-2xl transition-all duration-300 flex flex-col justify-between group hover:shadow-[0_0_20px_rgba(0,240,255,0.05)]"
              >
                <div>
                  {/* Bloco de Imagem com zoom e gradiente de escurecimento */}
                  <div className="w-full h-40 overflow-hidden rounded-xl border border-cyan-500/10 mb-5 relative">
                    <img 
                      src={getServiceImage(service.id)} 
                      alt={service.title} 
                      width="640"
                      height="360"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-90 group-hover:brightness-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030718]/60 to-transparent pointer-events-none" />
                  </div>

                  <div className="flex justify-between items-start">
                    <div className="w-[38px] h-[48px] bg-[#0c1b40]/60 rounded-xl border border-cyan-500/15 flex items-center justify-center text-cyan-400 group-hover:text-white group-hover:bg-[#00f0ff]/20 transition-all duration-300">
                      {getServiceIcon(service.id)}
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-mono font-bold text-cyan-400/40 group-hover:text-cyan-400 transition-colors">
                        {service.id}
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-[#00f0ff] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                  </div>

                  <h3 className="text-[13px] md:text-sm font-black tracking-wider text-white uppercase mt-6 mb-2 group-hover:text-cyan-400 transition-colors font-sans">
                    {service.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 font-sans leading-relaxed group-hover:text-slate-200 transition-colors font-medium">
                    {service.description}
                  </p>
                </div>

                <div className="flex gap-1.5 mt-6 pt-3 border-t border-cyan-500/5">
                  <a
                    href={createWhatsAppLink(`Olá! Gostaria de agendar uma avaliação para ${service.title} na Vero Odontologia.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-mono font-black tracking-widest text-cyan-400 hover:text-white uppercase transition-colors"
                  >
                    Agendar avaliação →
                  </a>
                </div>
              </article>
            ))}
          </div>

        </div>

        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-40 md:h-56 pointer-events-none z-20 bg-gradient-to-b from-transparent via-[#02040c]/80 to-[#02040c]"
        />
      </section>

      {/* 2.8 SEÇÃO: DEPOIMENTOS (SORRISOS DE SATISFAÇÃO) */}
      <section id="depoimentos" className="w-full pt-10 pb-16 md:pt-14 md:pb-24 relative overflow-hidden z-20 bg-[#02040c] scroll-mt-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-10 relative">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4 text-left">
              <div className="flex items-center gap-2 text-[10px] font-mono tracking-[0.2em] text-[#00f0ff] uppercase font-black">
                <span className="w-6 h-[1.5px] bg-[#00f0ff]" />
                <span>DEPOIMENTOS</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-sans uppercase tracking-tight text-white leading-none">
                SORRISOS DE SATISFAÇÃO
              </h2>
              
              <p className="text-xs sm:text-[13px] text-slate-300 font-sans leading-relaxed max-w-2xl">
                Na Vero Odontologia, estamos sempre atentos ao bem-estar de nossos pacientes. Confira depoimentos de quem já passou por aqui:
              </p>
            </div>

            {/* Botões de Navegação do Slide */}
            <div className="flex gap-2.5 self-end">
              <button 
                onClick={() => scrollTestimonials("left")}
                className="w-10 h-10 rounded-full border border-slate-800 hover:border-[#00f0ff]/50 hover:bg-slate-900 flex items-center justify-center transition-all cursor-pointer text-slate-300 hover:text-white"
                title="Depoimento Anterior"
              >
                <span>&larr;</span>
              </button>
              <button 
                onClick={() => scrollTestimonials("right")}
                className="w-10 h-10 rounded-full border border-slate-800 hover:border-[#00f0ff]/50 hover:bg-slate-900 flex items-center justify-center transition-all cursor-pointer text-slate-300 hover:text-white"
                title="Próximo Depoimento"
              >
                <span>&rarr;</span>
              </button>
            </div>
          </div>

          {/* Container horizontal scrollable contendo os cards */}
          <div 
            ref={testimonialsRef}
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-none pb-4 pr-4"
            style={{ scrollbarWidth: "none" }}
          >
            {TESTIMONIALS.map((item) => (
              <div 
                key={item.id}
                className="snap-start min-w-[290px] sm:min-w-[360px] max-w-[400px] flex-1 bg-slate-950/45 backdrop-blur-md border border-cyan-500/15 p-6 rounded-2xl flex flex-col justify-between hover:border-cyan-400/30 transition-all duration-300"
              >
                <div className="space-y-4 text-left">
                  <svg className="w-8 h-8 text-cyan-400 opacity-60 fill-cyan-400/10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.75-2-2-2H4c-1.25 0-2 .75-2 2v4c0 1.25.75 2 2 2h2c0 3-2 4-4 4v3zm11 0c3 0 7-1 7-8V5c0-1.25-.75-2-2-2h-4c-1.25 0-2 .75-2 2v4c0 1.25.75 2 2 2h2c0 3-2 4-4 4v3z" />
                  </svg>
                  <p className="text-[13px] sm:text-sm text-slate-200 font-sans leading-relaxed italic">
                    "{item.text}"
                  </p>
                </div>
                
                <div className="mt-6 pt-4 border-t border-cyan-500/5 text-left">
                  <strong className="text-[13px] sm:text-sm font-sans font-bold text-white block uppercase tracking-wide">
                    {item.name}
                  </strong>
                  {item.role && (
                    <span className="text-[11px] font-mono text-cyan-400/60 block uppercase tracking-wider mt-0.5">
                      {item.role}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. Rodapé Corporativo Completo em PT-BR */}
      <footer className="w-full border-t border-cyan-950/40 bg-[#030718]/95 backdrop-blur-md py-12 px-4 md:px-8 mt-auto z-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 mb-8 pb-8 border-b border-cyan-500/10">
          
          {/* Logo e Institucional */}
          <div className="md:col-span-5 space-y-4">
            <ClinicLogo />
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              VERO Odontologia - Tecnologia 3D e atendimento humanizado para criar o seu melhor sorriso. Nosso compromisso é com sua saúde e autoestima.
            </p>
            <div className="flex gap-3 pt-2">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-cyan-500/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-cyan-400 transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-cyan-500/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-cyan-400 transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-cyan-500/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-cyan-400 transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links de navegação rápidos */}
          <div className="md:col-span-3 space-y-3">
            <h6 className="text-[10px] font-mono text-[#00f0ff] uppercase tracking-wider font-bold">NAVEGAÇÃO</h6>
            <ul className="text-xs space-y-2 text-slate-400 font-sans">
              <li><a href="#sobre-clinica" className="hover:text-white transition-colors">A Clínica</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Tratamentos</a></li>
              <li><a href="#smile-simulator-container" className="hover:text-white transition-colors">Simulador 3D</a></li>
              <li><a href="#depoimentos" className="hover:text-white transition-colors">Depoimentos</a></li>
            </ul>
          </div>

          {/* Contatos Fictícios de Portfólio */}
          <div className="md:col-span-4 space-y-3 font-sans">
            <h6 className="text-[10px] font-mono text-[#00f0ff] uppercase tracking-wider font-bold">CONTATO & ATENDIMENTO</h6>
            <ul className="text-xs space-y-2.5 text-slate-400">
              <li className="flex gap-2 items-start">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Av. Brigadeiro Faria Lima, 2000 - Pinheiros, São Paulo - SP, 01451-001</span>
              </li>
              <li className="flex gap-2 items-center">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>+55 (11) 3333-3333</span>
              </li>
              <li className="flex gap-2 items-center">
                <Phone className="w-4 h-4 text-[#25d366] shrink-0" />
                <a href={heroWhatsAppLink} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors font-semibold">
                  +55 (11) 99999-9999 (WhatsApp)
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Direitos autorais e assinaturas */}
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 select-none">
            <Globe className="w-4 h-4 text-cyan-400/40 animate-spin-slow" />
            <span className="text-[9px] font-mono text-slate-400/60 uppercase tracking-widest">
              VERO ODONTOLOGIA © 2026. TODOS OS DIREITOS RESERVADOS.
            </span>
          </div>

          {/* Estatísticas resumidas e credenciamento fictício no rodapé */}
          <div className="grid grid-cols-3 gap-6 md:gap-10 font-sans" id="footer-statistics-row">
            {CLINIC_STATS.map((stat) => (
              <div
                key={stat.id}
                className="border-l border-cyan-500/10 pl-3 space-y-0.5"
              >
                <div className="flex items-center gap-1">
                  <span className="text-xs font-black font-sans text-white tracking-tight leading-none">
                    {stat.value}
                  </span>
                </div>
                <span className="text-[8px] font-mono text-cyan-400/40 uppercase tracking-widest font-bold block">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </footer>

      <a
        href={heroWhatsAppLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed inset-x-4 bottom-4 z-50 md:hidden bg-[#25d366] text-white rounded-full px-5 py-3 text-[11px] font-mono font-black tracking-widest uppercase shadow-2xl shadow-black/50 flex items-center justify-center gap-2"
      >
        <Phone className="w-4 h-4" />
        Agendar pelo WhatsApp
      </a>

    </div>
  );
}
