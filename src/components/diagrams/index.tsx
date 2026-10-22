import type { ComponentType } from 'react'
import { DesignThinking, DoubleDiamond, Fidelity, UxPlanes, UxUmbrella } from './process'
import { Affinity, EmpathyMap, Funnel, ImpactEffort, Journey, ResearchQuadrant, UsabilityCurve } from './research'
import { Fitts, FlowNotation, FPattern, Hick, Sitemap, WireframeExample } from './structure'
import {
  Atomic,
  AutoLayout,
  ButtonStates,
  Color603010,
  ColorHarmony,
  ContrastChecker,
  Gestalt,
  Grid8pt,
  Hierarchy,
  TouchTarget,
  TypeScale,
} from './visual'

/** Use numa linha sozinha dentro do markdown: ::double-diamond */
export const DIAGRAMS: Record<string, ComponentType> = {
  'double-diamond': DoubleDiamond,
  'design-thinking': DesignThinking,
  'ux-planes': UxPlanes,
  'ux-umbrella': UxUmbrella,
  fidelity: Fidelity,
  'research-quadrant': ResearchQuadrant,
  affinity: Affinity,
  journey: Journey,
  'empathy-map': EmpathyMap,
  'usability-curve': UsabilityCurve,
  'impact-effort': ImpactEffort,
  funnel: Funnel,
  'flow-notation': FlowNotation,
  sitemap: Sitemap,
  wireframe: WireframeExample,
  'f-pattern': FPattern,
  fitts: Fitts,
  hick: Hick,
  gestalt: Gestalt,
  hierarchy: Hierarchy,
  'grid-8pt': Grid8pt,
  'type-scale': TypeScale,
  'color-60-30-10': Color603010,
  'color-harmony': ColorHarmony,
  'contrast-checker': ContrastChecker,
  atomic: Atomic,
  'auto-layout': AutoLayout,
  'touch-target': TouchTarget,
  'button-states': ButtonStates,
}
