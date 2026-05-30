/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Treatment {
  id: string;
  tag: string;
  title: string;
  description: string;
  features: string[];
  duration: string;
  doctor: string;
  priceEstimate: string;
}

export interface ClinicStat {
  id: string;
  value: string;
  label: string;
  detail: string;
}

export interface SimulationResult {
  concern: string;
  tier: string;
  recommendation: string;
  timeline: string;
  importance: number; // 1-5 scale
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
}

export interface Testimonial {
  id: string;
  text: string;
  name: string;
  role?: string;
}
