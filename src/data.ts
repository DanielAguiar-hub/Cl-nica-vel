/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Treatment, ClinicStat } from "./types";

export const TREATMENTS: Treatment[] = [
  {
    id: "cosmetic",
    tag: "ODONTOLOGIA ESTÉTICA",
    title: "DESIGN DIGITAL DO SORRISO",
    description: "Lentes de contato dentárias e facetas de porcelana personalizadas para criar um sorriso simétrico, harmônico e natural.",
    features: [
      "Escaneamento Digital 3D & Mock-up Realista",
      "Lentes de porcelana feldspática de grau cirúrgico",
      "Otimização biológica da tonalidade do esmalte",
      "Planejamento estético de alta precisão"
    ],
    duration: "2 a 3 Sessões",
    doctor: "Dra. Helena Thorne (Especialista em Estética)",
    priceEstimate: "Sob consulta clínica"
  },
  {
    id: "restorative",
    tag: "IMPLANTODONTIA",
    title: "SISTEMA DE IMPLANTES DIGITAIS",
    description: "Implantes de titânio ou cerâmica pura livre de metal (zircônia) combinados com próteses personalizadas para restaurar a força da mordida.",
    features: [
      "Simulações cirúrgicas 3D guiadas por computador",
      "Componentes biocompatíveis de Zircônia pura ou Titânio",
      "Sistema de carga imediata (implante no mesmo dia)",
      "Matriz de regeneração óssea otimizada"
    ],
    duration: "1 a 4 Sessões em até 3 meses",
    doctor: "Dr. Liam Mercer (Cirurgião Bucomaxilofacial)",
    priceEstimate: "Sob consulta clínica"
  },
  {
    id: "ortho",
    tag: "ORTODONTIA E PREVENÇÃO",
    title: "ALINHADORES INVISÍVEIS INVISALIGN®",
    description: "Ortodontia moderna de alta precisão combinada com protocolos preventivos avançados para a longevidade da sua saúde bucal.",
    features: [
      "Alinhadores invisíveis Invisalign® personalizados",
      "Avaliação tridimensional da postura da mordida",
      "Polimento preventivo com fluxo de ar com glicina",
      "Placas personalizadas para bruxismo"
    ],
    duration: "Tratamento contínuo personalizado",
    doctor: "Dr. Alistair Vance (Ortodontista & Clinica Integrativa)",
    priceEstimate: "Sob consulta clínica"
  }
];

export const CLINIC_STATS: ClinicStat[] = [
  {
    id: "years",
    value: "14+",
    label: "ANOS DE EXCELÊNCIA",
    detail: "Realizando reabilitações orais e transformações de sorrisos."
  },
  {
    id: "patients",
    value: "12.400+",
    label: "SORRISOS GERADOS",
    detail: "Pacientes atendidos e transformações concluídas com sucesso."
  },
  {
    id: "prosthetics",
    value: "45+",
    label: "PARCEIROS CREDENCIADOS",
    detail: "Laboratórios parceiros de alta tecnologia e estúdios 3D."
  }
];

export const DENTISTS = [
  {
    name: "Dra. Helena Thorne",
    role: "Especialista em Estética Dental",
    bio: "Pioneira em lentes de contato dentárias minimamente invasivas e simulação digital 3D.",
    rating: "4.9/5",
    languages: ["Português", "Inglês"]
  },
  {
    name: "Dr. Liam Mercer",
    role: "Especialista em Implantodontia",
    bio: "Focado em reabilitação oral e implantes biológicos guiados por computador.",
    rating: "5.0/5",
    languages: ["Português", "Alemão"]
  },
  {
    name: "Dr. Alistair Vance",
    role: "Ortodontista & Odontologia Integrativa",
    bio: "Especialista em alinhadores invisíveis, otimização das vias aéreas e reabilitação oclusal.",
    rating: "4.8/5",
    languages: ["Português", "Espanhol"]
  }
];

export const SERVICES_GRID = [
  { id: "01", title: "CLÍNICA GERAL", description: "Check-ups de rotina, profilaxia e cuidados preventivos para manter sua saúde bucal sempre em dia." },
  { id: "02", title: "ODONTOLOGIA ESTÉTICA", description: "Clareamento dental a laser, facetas e lentes de contato de porcelana para valorizar a beleza do seu sorriso." },
  { id: "03", title: "ORTODONTIA", description: "Aparelhos estéticos e alinhadores invisíveis de última geração para alinhar seus dentes com discrição." },
  { id: "04", title: "ODONTOPEDIATRIA", description: "Atendimento lúdico, carinhoso e humanizado para que as crianças cresçam sem medo de dentista." },
  { id: "05", title: "IMPLANTES DENTÁRIOS", description: "Substituição segura e definitiva de dentes ausentes com materiais biocompatíveis e de alta durabilidade." },
  { id: "06", title: "EMERGÊNCIA 24H", description: "Pronto atendimento imediato para alívio de dor, fraturas dentárias e urgências bucais a qualquer hora." }
];

import { Testimonial } from "./types";

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "01",
    text: "Clínica maravilhosa. Profissionais muito acolhedores, atenciosos e competentes. Clínica muito bem equipada, com foco em atender todas as necessidades. Dra. Flávia muito querida e simpática.",
    name: "Sonia Ishibashi",
    role: "Psicanalista Sistêmica"
  },
  {
    id: "02",
    text: "Gostaria de expressar minha profunda gratidão à clínica Viu Odontologia. Desde a minha primeira consulta com a Dra. Ana Célia, fui acolhida com um atendimento excepcional que me trouxe confiança e tranquilidade, algo que eu não sentia há muito tempo devido a um trauma com dentistas.",
    name: "Elaine Leite Augusto",
    role: "Paciente de Reabilitação"
  },
  {
    id: "03",
    text: "Experiência maravilhosa...Estou em tratamento, e estou sendo super bem atendida!!!Funcionários extremamente educados e atenciosos..Clínica com excelentes profissionais...Só tenho a agradecer pelo atendimento!!",
    name: "Andrea Dos Santos",
    role: "Paciente de Invisalign®"
  },
  {
    id: "04",
    text: "O atendimento digital e o escaneamento 3D facilitaram demais meu tratamento. As lentes de contato ficaram perfeitas e super naturais. Recomendo muito toda a equipe!",
    name: "Maurício Mendes",
    role: "Empresário"
  }
];

export const WHATSAPP_LINK = import.meta.env.VITE_WHATSAPP_LINK || "https://wa.me/5511999999999?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20uma%20consulta%20na%20Viu%20Odontologia.";

