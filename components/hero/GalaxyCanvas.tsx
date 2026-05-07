"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// ---------------------------------------------------------------------------
// CONFIGURATION — 4 Concentric Orbital Rings
// ---------------------------------------------------------------------------
const CONFIG = {
  counts: {
    core: 9000,
    bar: 2500,
    ring1: 32000,   // inner thin
    ring2: 42000,   // mid-inner medium
    ring3: 48000,   // mid-outer thick
    ring4: 52000,   // outer thickest
    clusters: 12000,
    interRing: 5000,
    thickDisk: 10000,
    halo: 6000,
    dust: 8000,
    foreground: 7000,
    bg: 8000,
    total: 0,
  },
  // 4 concentric circular rings
  rings: [
    { id: 1, centerR: 38,  thickness: 6,   yScale: 1.6, colorWarmth: 1.0, colorTone: 'gold' },      // inner thin
    { id: 2, centerR: 105, thickness: 11,  yScale: 2.8, colorWarmth: 0.9, colorTone: 'white' },     // mid-inner medium
    { id: 3, centerR: 205, thickness: 17,  yScale: 4.2, colorWarmth: 0.8, colorTone: 'blue' },      // mid-outer thick
    { id: 4, centerR: 345, thickness: 26,  yScale: 6.0, colorWarmth: 0.7, colorTone: 'cyan' },      // outer thickest
  ],
  camera: {
    start: { x: 0, y: 55, z: 260 },
    scrollMinZ: 2,
    scrollMaxZ: 260,
    scrollMinY: 1,
    scrollMaxY: 55,
    scrollMinX: -60,
    scrollMaxX: 0,
    scrollMinFov: 42,
    scrollMaxFov: 70,
    scrollRangeVH: 0.35,
    lerpSpeed: 6.5,
    floatSpeed: 0.04,
  },
  visual: {
    pointSize: 1.55,
    depthFadeStart: 15,
    depthFadeEnd: 950,
  },
  composition: {
    galaxyOffsetX: 55,
    galaxyOffsetY: 18,
    galaxyRotationX: 0.32,
    galaxyRotationZ: 0.04,
  },
};

CONFIG.counts.total = Object.values(CONFIG.counts).reduce((a, b) => a + b, 0) - CONFIG.counts.total;

// ---------------------------------------------------------------------------
// GPU SHADERS — Zero per-particle CPU work
// ---------------------------------------------------------------------------
const vertexShader = `
  uniform float uTime;
  uniform float uPointSize;
  uniform float uDepthFadeStart;
  uniform float uDepthFadeEnd;
  uniform vec3 uCursorPos;
  uniform float uCursorActive;
  uniform float uCursorStrength;
  uniform float uTurbulenceStrength;

  attribute vec3 aOriginalPos;
  attribute float aSize;
  attribute float aTwinkleSpeed;
  attribute float aTwinklePhase;
  attribute float aLayer;
  attribute vec3 aColor;
  attribute float aMass;

  varying vec3 vColor;
  varying float vAlpha;
  varying float vDepthFactor;

  float hash(vec3 p) {
    p = fract(p * vec3(0.1031, 0.1030, 0.0973));
    p += dot(p, p.yzx + 33.33);
    return fract((p.x + p.y) * p.z);
  }

  float vnoise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec3(1.0, 0.0, 0.0));
    float c = hash(i + vec3(0.0, 1.0, 0.0));
    float d = hash(i + vec3(1.0, 1.0, 0.0));
    float e = hash(i + vec3(0.0, 0.0, 1.0));
    float g = hash(i + vec3(1.0, 0.0, 1.0));
    float h = hash(i + vec3(0.0, 1.0, 1.0));
    float j = hash(i + vec3(1.0, 1.0, 1.0));
    return mix(
      mix(mix(a, b, f.x), mix(c, d, f.x), f.y),
      mix(mix(e, g, f.x), mix(h, j, f.x), f.y),
      f.z
    ) * 2.0 - 1.0;
  }

  vec3 fbmDrift(vec3 pos, float t, float strength) {
    vec3 drift = vec3(0.0);
    float amp = 1.0;
    float freq = 0.04;
    for (int i = 0; i < 3; i++) {
      drift.x += vnoise(pos * freq + vec3(t * 0.22, 0.0, 0.0)) * amp;
      drift.y += vnoise(pos * freq * 0.5 + vec3(0.0, t * 0.22 + 50.0, 0.0)) * amp * 0.5;
      drift.z += vnoise(pos * freq + vec3(0.0, 0.0, t * 0.16 + 100.0)) * amp;
      amp *= 0.5;
      freq *= 2.1;
    }
    return drift * strength;
  }

  void main() {
    vec3 pos = aOriginalPos;
    float layer = aLayer;
    float mass = aMass;

    float weight = 1.0;
    if (layer < 0.5)       weight = 0.30;
    else if (layer < 1.5)  weight = 0.40;
    else if (layer < 2.5)  weight = 0.58;
    else if (layer < 3.5)  weight = 0.48;
    else if (layer < 4.5)  weight = 0.24;
    else if (layer < 5.5)  weight = 0.92;
    else if (layer < 6.5)  weight = 0.10;
    else if (layer < 7.5)  weight = 0.08;
    else                   weight = 0.42;

    float invMass = 1.0 / max(mass, 0.06);
    float layerMul = weight * invMass;

    // Ambient turbulence
    vec3 drift = fbmDrift(pos, uTime, uTurbulenceStrength * weight);
    drift.y *= 0.35;
    pos += drift;

    // Cursor interaction
    if (uCursorActive > 0.5 && uCursorStrength > 0.01) {
      vec3 diff = pos - uCursorPos;
      float dist = length(diff);
      if (dist < 220.0 && dist > 0.5) {
        float normalized = dist / 220.0;
        float falloff = (1.0 - normalized) * (1.0 - normalized) * (1.0 - normalized);
        float str = falloff * uCursorStrength;

        pos += normalize(diff) * str * 20.0 * layerMul;

        float swirlStr = str * 38.0 * layerMul;
        pos += vec3(-diff.z, 0.0, diff.x) * (swirlStr / max(dist, 1.0));
        pos.y += (diff.x * diff.z) * (swirlStr * 0.12 / max(dist * dist, 1.0));

        float angle = atan(aOriginalPos.z, aOriginalPos.x);
        pos += vec3(-sin(angle), 0.0, cos(angle)) * str * 9.0 * layerMul * 0.35;

        if (abs(layer - 5.0) < 0.5) {
          float ds = str * 0.7 * invMass * 1.4;
          pos += vec3(-diff.z, 0.0, diff.x) * (ds / max(dist, 1.0));
        }
      }
    }

    // Displacement clamp
    vec3 disp = pos - aOriginalPos;
    float dispLen = length(disp);
    if (dispLen > 24.0) {
      pos = aOriginalPos + (disp / dispLen) * 24.0;
    }

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    float depth = -mvPosition.z;

    float twinkle = 0.78 + 0.22 * sin(uTime * aTwinkleSpeed + aTwinklePhase);

    float depthFade = 1.0 - smoothstep(uDepthFadeStart, uDepthFadeEnd, depth);
    depthFade = pow(depthFade, 0.5);

    float layerAlpha = 1.0;
    if (layer > 7.5) layerAlpha = 0.35;
    else if (layer > 6.5) layerAlpha = 0.45;
    else if (layer > 5.5) layerAlpha = 0.6;
    else if (layer > 4.5) layerAlpha = 0.75;

    float depthFactor = smoothstep(80.0, 700.0, depth);
    vDepthFactor = depthFactor;
    vec3 atmColor = mix(aColor, vec3(0.55, 0.60, 0.72), depthFactor * 0.15);
    if (layer > 7.5) {
      atmColor = mix(atmColor, vec3(0.88, 0.86, 0.82), 0.12);
    }

    vColor = atmColor;
    vAlpha = twinkle * depthFade * layerAlpha;

    float size = aSize * uPointSize * (360.0 / max(depth, 12.0)) * twinkle;
    size = clamp(size, 0.35, 9.0);
    if (layer > 7.5) size *= 1.15;

    gl_PointSize = size;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;
  varying float vDepthFactor;

  void main() {
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;

    float strength = 1.0 - (dist * 2.0);
    strength = pow(strength, 3.2);

    float core = smoothstep(0.08, 0.0, dist);
    vec3 coreColor = vec3(1.0, 0.98, 0.92);
    vec3 finalColor = mix(vColor, coreColor, core * 0.22);

    float luminosity = 1.0 + smoothstep(0.15, 0.0, dist) * 0.15;
    finalColor *= luminosity;

    finalColor = mix(finalColor, vec3(0.62, 0.66, 0.78), vDepthFactor * 0.08);
    finalColor *= 1.08;

    gl_FragColor = vec4(finalColor, strength * vAlpha);
  }
`;

// ---------------------------------------------------------------------------
// NEBULA DOME SHADERS
// ---------------------------------------------------------------------------
const nebulaVertexShader = `
  varying vec3 vLocalPos;
  void main() {
    vLocalPos = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const nebulaFragmentShader = `
  uniform float uTime;
  varying vec3 vLocalPos;

  float hash(vec3 p) {
    p = fract(p * vec3(0.1031, 0.1030, 0.0973));
    p += dot(p, p.yzx + 33.33);
    return fract((p.x + p.y) * p.z);
  }

  float vnoise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec3(1.0, 0.0, 0.0));
    float c = hash(i + vec3(0.0, 1.0, 0.0));
    float d = hash(i + vec3(1.0, 1.0, 0.0));
    float e = hash(i + vec3(0.0, 0.0, 1.0));
    float g = hash(i + vec3(1.0, 0.0, 1.0));
    float h = hash(i + vec3(0.0, 1.0, 1.0));
    float j = hash(i + vec3(1.0, 1.0, 1.0));
    return mix(
      mix(mix(a, b, f.x), mix(c, d, f.x), f.y),
      mix(mix(e, g, f.x), mix(h, j, f.x), f.y),
      f.z
    ) * 2.0 - 1.0;
  }

  float fbm(vec3 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    for (int i = 0; i < 4; i++) {
      value += amplitude * vnoise(p * frequency);
      amplitude *= 0.5;
      frequency *= 2.0;
    }
    return value;
  }

  void main() {
    vec3 dir = normalize(vLocalPos);
    float t = uTime * 0.008;
    float n1 = fbm(dir * 1.8 + vec3(t, t * 0.7, 0.0));
    float n2 = fbm(dir * 2.4 + vec3(-t * 0.5, t * 0.3, t * 0.2));
    float n3 = fbm(dir * 1.2 + vec3(0.0, -t * 0.4, t * 0.6));

    vec3 deepNavy = vec3(0.03, 0.04, 0.08);
    vec3 dimGold  = vec3(0.07, 0.05, 0.02);
    vec3 softCyan = vec3(0.02, 0.04, 0.06);
    vec3 greyMist = vec3(0.04, 0.03, 0.05);

    vec3 color = deepNavy * (n1 * 0.5 + 0.5);
    color = mix(color, dimGold,  smoothstep(0.2, 0.6, n2) * 0.35);
    color = mix(color, softCyan, smoothstep(0.3, 0.7, n3) * 0.25);
    color = mix(color, greyMist, smoothstep(0.1, 0.5, n1 * n2) * 0.30);

    float poleFade = 1.0 - pow(abs(dir.y), 3.0);
    color *= poleFade;
    float alpha = smoothstep(-0.3, 0.5, n1) * 0.035 * poleFade;

    gl_FragColor = vec4(color * 1.2, alpha);
  }
`;

// ---------------------------------------------------------------------------
// UTILITIES
// ---------------------------------------------------------------------------
function gaussianRandom(mean = 0, sigma = 1): number {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return mean + sigma * Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

// ---------------------------------------------------------------------------
// CONCENTRIC ORBITAL RING GALAXY GENERATION
// ---------------------------------------------------------------------------
function generateGalaxy() {
  const R = Math.random, G = gaussianRandom;
  const total = CONFIG.counts.total;
  const positions = new Float32Array(total * 3);
  const originalPositions = new Float32Array(total * 3);
  const colors = new Float32Array(total * 3);
  const sizes = new Float32Array(total);
  const twinkleSpeeds = new Float32Array(total);
  const twinklePhases = new Float32Array(total);
  const layers = new Float32Array(total);
  const masses = new Float32Array(total);
  let idx = 0;

  const add = (x: number, y: number, z: number, r: number, g: number, b: number, size: number, layer: number, mass: number) => {
    const i = idx * 3;
    positions[i] = x; positions[i + 1] = y; positions[i + 2] = z;
    originalPositions[i] = x; originalPositions[i + 1] = y; originalPositions[i + 2] = z;
    colors[i] = r; colors[i + 1] = g; colors[i + 2] = b;
    sizes[idx] = size;
    twinkleSpeeds[idx] = 0.1 + R() * 1.6;
    twinklePhases[idx] = R() * Math.PI * 2;
    layers[idx] = layer;
    masses[idx] = mass;
    idx++;
  };

  // ================================================================
  // CORE — tight golden sphere
  // ================================================================
  for (let i = 0; i < CONFIG.counts.core; i++) {
    const r = Math.abs(G(12));
    if (r > 24) { i--; continue; }
    const theta = R() * Math.PI * 2;
    const phi = Math.acos(2 * R() - 1);
    const sint = Math.sin(phi);
    const x = r * sint * Math.cos(theta);
    const y = r * sint * Math.sin(theta) * 0.35;
    const z = r * Math.cos(phi) * 0.35;
    const t = R();
    let cr, cg, cb;
    if (t < 0.15)      { cr = 1.00; cg = 0.90; cb = 0.56; }
    else if (t < 0.35) { cr = 0.98; cg = 0.84; cb = 0.52; }
    else if (t < 0.55) { cr = 0.94; cg = 0.78; cb = 0.48; }
    else if (t < 0.75) { cr = 0.90; cg = 0.72; cb = 0.44; }
    else if (t < 0.90) { cr = 0.86; cg = 0.66; cb = 0.42; }
    else               { cr = 0.84; cg = 0.74; cb = 0.62; } // purple-gold
    add(x, y, z, cr, cg, cb, 0.48 + R() * 0.42, 0, 1.5);
  }

  // ================================================================
  // BAR — extremely subtle, barely visible
  // ================================================================
  for (let i = 0; i < CONFIG.counts.bar; i++) {
    const t = (R() - 0.5) * 2;
    const x = t * 55 + G(0, 3.5);
    const z = G(0, 4.5);
    const y = G(0, 2.2);
    const brightness = 0.78 + R() * 0.12;
    const warmth = 0.88 + R() * 0.08;
    add(x, y, z, brightness * warmth, brightness * warmth * 0.88, brightness * warmth * 0.58, 0.38 + R() * 0.26, 1, 1.2);
  }

  // ================================================================
  // 4 CONCENTRIC ORBITAL RINGS — circular, not spiral
  // ================================================================
  for (const ring of CONFIG.rings) {
    const count = CONFIG.counts[`ring${ring.id}` as keyof typeof CONFIG.counts] as number;
    for (let i = 0; i < count; i++) {
      // Full circular orbit angle
      const angle = R() * Math.PI * 2;

      // Radius with Gaussian scatter around ring center (creates ring thickness)
      const radius = ring.centerR + G(0, ring.thickness);

      // Slight organic wobble so ring isn't a perfect geometric circle
      const wobble = Math.sin(angle * 3 + R() * Math.PI * 2) * ring.thickness * 0.12;
      const finalRadius = Math.max(4, radius + wobble);

      // Position in orbital plane (XZ)
      const x = Math.cos(angle) * finalRadius;
      const z = Math.sin(angle) * finalRadius;

      // Vertical scatter gives 3D disk depth
      const y = G(0, ring.yScale * (0.5 + 0.5 * (finalRadius / (ring.centerR + ring.thickness * 2))));

      // Color by ring
      let cr, cg, cb;
      const rr = R();
      const w = ring.colorWarmth;
      if (ring.colorTone === 'gold') {
        cr = (0.92 + rr * 0.08) * w; cg = (0.86 + rr * 0.08) * w; cb = (0.72 + rr * 0.10) * w;
      } else if (ring.colorTone === 'white') {
        cr = (0.84 + rr * 0.08) * w; cg = (0.86 + rr * 0.08) * w; cb = (0.82 + rr * 0.08) * w;
      } else if (ring.colorTone === 'blue') {
        cr = (0.54 + rr * 0.10) * w; cg = (0.66 + rr * 0.10) * w; cb = (0.92 + rr * 0.08) * w;
      } else { // cyan
        cr = (0.50 + rr * 0.10) * w; cg = (0.62 + rr * 0.10) * w; cb = (0.88 + rr * 0.08) * w;
      }

      // Size: larger on inner rings for detail, slightly smaller on outer
      const size = Math.max(0.28, 0.75 - (ring.id * 0.06)) * (0.55 + R() * 0.35);

      add(x, y, z, cr, cg, cb, size, 2, 0.75);
    }
  }

  // ================================================================
  // CLUSTERS — bright knots along the rings
  // ================================================================
  const clusterCenters: { x: number; y: number; z: number; r: number }[] = [];
  for (let c = 0; c < 50; c++) {
    const ring = CONFIG.rings[Math.floor(R() * CONFIG.rings.length)];
    const angle = R() * Math.PI * 2;
    const radius = ring.centerR + G(0, ring.thickness * 0.5);
    clusterCenters.push({
      x: Math.cos(angle) * radius,
      y: G(0, 2.5),
      z: Math.sin(angle) * radius,
      r: 2.0 + R() * 5.5,
    });
  }
  for (let i = 0; i < CONFIG.counts.clusters; i++) {
    const center = clusterCenters[Math.floor(R() * clusterCenters.length)];
    const dx = G(0, center.r), dy = G(0, center.r * 0.2), dz = G(0, center.r);
    const rr = R();
    add(center.x + dx, center.y + dy, center.z + dz, 0.62 + rr * 0.14, 0.72 + rr * 0.12, 0.94 + rr * 0.1, 0.42 + R() * 0.42, 2, 0.85);
  }

  // ================================================================
  // INTER-RING — very sparse stars between rings
  // ================================================================
  for (let i = 0; i < CONFIG.counts.interRing; i++) {
    const r = 30 + Math.pow(R(), 0.7) * 500;
    const angle = R() * Math.PI * 2;
    const radialScatter = G(0, 16);
    const x = Math.cos(angle) * r + radialScatter;
    const z = Math.sin(angle) * r + radialScatter;
    const y = G(0, 3.5 + r * 0.005);
    const b = 0.52 + R() * 0.22;
    const warmth = 0.88 + R() * 0.08;
    add(x, y, z, b * warmth, b * warmth * 0.96, b * warmth * 0.92, 0.16 + R() * 0.16, 3, 0.5);
  }

  // ================================================================
  // THICK DISK
  // ================================================================
  for (let i = 0; i < CONFIG.counts.thickDisk; i++) {
    const r = 30 + Math.pow(R(), 0.6) * 380;
    const angle = R() * Math.PI * 2;
    const x = Math.cos(angle) * r, z = Math.sin(angle) * r;
    const y = G(0, 9 + r * 0.008);
    const t = R(); let cr, cg, cb;
    if (t < 0.30)      { cr = 0.82; cg = 0.70; cb = 0.54; }
    else if (t < 0.55) { cr = 0.76; cg = 0.64; cb = 0.50; }
    else if (t < 0.80) { cr = 0.70; cg = 0.58; cb = 0.44; }
    else               { cr = 0.66; cg = 0.62; cb = 0.54; }
    add(x, y, z, cr, cg, cb, 0.24 + R() * 0.20, 3, 0.55);
  }

  // ================================================================
  // HALO
  // ================================================================
  for (let i = 0; i < CONFIG.counts.halo; i++) {
    const cost = R() * 2 - 1, sint = Math.sqrt(1 - cost * cost), phi = R() * Math.PI * 2;
    const r = 180 + Math.pow(R(), 0.4) * 950;
    const x = r * sint * Math.cos(phi), z = r * sint * Math.sin(phi), y = r * cost * 0.5;
    const t = R(); let cr, cg, cb;
    if (t < 0.35) { cr = 0.68; cg = 0.52; cb = 0.42; }
    else if (t < 0.70) { cr = 0.60; cg = 0.46; cb = 0.38; }
    else          { cr = 0.56; cg = 0.50; cb = 0.46; }
    add(x, y, z, cr, cg, cb, 0.14 + R() * 0.14, 4, 0.35);
  }

  // ================================================================
  // DUST LANES — narrow, along ring paths
  // ================================================================
  for (let i = 0; i < CONFIG.counts.dust; i++) {
    const ring = CONFIG.rings[Math.floor(R() * CONFIG.rings.length)];
    const angle = R() * Math.PI * 2;
    const radius = ring.centerR + G(0, ring.thickness * 0.6);
    const x = Math.cos(angle) * radius + G(0, 7);
    const z = Math.sin(angle) * radius + G(0, 7);
    const y = G(0, 1.2);
    const brightness = 0.035 + R() * 0.035;
    add(x, y, z, brightness * 0.44, brightness * 0.38, brightness * 0.54, 0.26 + R() * 0.50, 5, 0.1);
  }

  // ================================================================
  // FOREGROUND
  // ================================================================
  for (let i = 0; i < CONFIG.counts.foreground; i++) {
    const cost = R() * 2 - 1, sint = Math.sqrt(1 - cost * cost), phi = R() * Math.PI * 2;
    const r = 10 + Math.pow(R(), 0.6) * 70;
    const x = r * sint * Math.cos(phi), z = r * sint * Math.sin(phi), y = r * cost * 0.55;
    const t = R(); let cr, cg, cb;
    if (t < 0.25)      { cr = 0.90; cg = 0.88; cb = 0.80; }
    else if (t < 0.60) { cr = 0.78; cg = 0.82; cb = 0.92; }
    else               { cr = 0.68; cg = 0.74; cb = 0.86; }
    add(x, y, z, cr, cg, cb, 0.36 + R() * 0.36, 8, 0.25);
  }

  // ================================================================
  // BACKGROUND
  // ================================================================
  for (let i = 0; i < CONFIG.counts.bg; i++) {
    const cost = R() * 2 - 1, sint = Math.sqrt(1 - cost * cost), phi = R() * Math.PI * 2;
    const r = 900 + R() * 1100;
    const x = r * sint * Math.cos(phi), z = r * sint * Math.sin(phi), y = r * cost;
    const b = 0.14 + R() * 0.14;
    add(x, y, z, b * 0.94, b * 0.98, b, 0.08 + R() * 0.14, 6, 0.06);
  }

  return { positions, originalPositions, colors, sizes, twinkleSpeeds, twinklePhases, layers, masses, count: idx };
}

// ---------------------------------------------------------------------------
// COMPONENT
// ---------------------------------------------------------------------------
export default function GalaxyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: "high-performance" });
    const dpr = Math.min(window.devicePixelRatio, 2);
    renderer.setPixelRatio(dpr);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x020204);
    renderer.info.autoReset = false;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020204, 0.0012);

    const camera = new THREE.PerspectiveCamera(CONFIG.camera.scrollMaxFov, container.clientWidth / container.clientHeight, 0.1, 3000);
    camera.position.set(CONFIG.camera.start.x, CONFIG.camera.start.y, CONFIG.camera.start.z);
    camera.lookAt(CONFIG.composition.galaxyOffsetX, CONFIG.composition.galaxyOffsetY, 0);

    const controls = new OrbitControls(camera, canvas);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.rotateSpeed = 0.20;
    controls.dampingFactor = 0.065;
    controls.enableDamping = true;
    // Manual rotation will be handled in animate loop for perfect consistency
    controls.minPolarAngle = Math.PI * 0.12;
    controls.maxPolarAngle = Math.PI * 0.78;
    controls.target.set(CONFIG.composition.galaxyOffsetX, CONFIG.composition.galaxyOffsetY, 0);

    // Nebula dome
    const nebulaGeo = new THREE.SphereGeometry(1800, 32, 32);
    const nebulaMat = new THREE.ShaderMaterial({
      vertexShader: nebulaVertexShader,
      fragmentShader: nebulaFragmentShader,
      uniforms: { uTime: { value: 0 } },
      transparent: true,
      depthWrite: false,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
    });
    const nebulaDome = new THREE.Mesh(nebulaGeo, nebulaMat);
    scene.add(nebulaDome);

    // Galaxy
    const data = generateGalaxy();
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(data.positions, 3));
    geometry.setAttribute("aOriginalPos", new THREE.BufferAttribute(data.originalPositions, 3));
    geometry.setAttribute("aColor", new THREE.BufferAttribute(data.colors, 3));
    geometry.setAttribute("aSize", new THREE.BufferAttribute(data.sizes, 1));
    geometry.setAttribute("aTwinkleSpeed", new THREE.BufferAttribute(data.twinkleSpeeds, 1));
    geometry.setAttribute("aTwinklePhase", new THREE.BufferAttribute(data.twinklePhases, 1));
    geometry.setAttribute("aLayer", new THREE.BufferAttribute(data.layers, 1));
    geometry.setAttribute("aMass", new THREE.BufferAttribute(data.masses, 1));

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uPointSize: { value: CONFIG.visual.pointSize },
        uDepthFadeStart: { value: CONFIG.visual.depthFadeStart },
        uDepthFadeEnd: { value: CONFIG.visual.depthFadeEnd },
        uCursorPos: { value: new THREE.Vector3(0, 0, 0) },
        uCursorActive: { value: 0 },
        uCursorStrength: { value: 0 },
        uTurbulenceStrength: { value: 0.20 },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geometry, material);
    const GALAXY_OFFSET = new THREE.Vector3(CONFIG.composition.galaxyOffsetX, CONFIG.composition.galaxyOffsetY, 0);
    const galaxyEuler = new THREE.Euler(CONFIG.composition.galaxyRotationX, 0, CONFIG.composition.galaxyRotationZ);
    const galaxyQuat = new THREE.Quaternion().setFromEuler(galaxyEuler);
    const invGalaxyQuat = galaxyQuat.clone().invert();
    points.position.copy(GALAXY_OFFSET);
    points.setRotationFromQuaternion(galaxyQuat);
    geometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), 950);
    points.frustumCulled = true;
    scene.add(points);

    // Cursor tracking
    const mouse = new THREE.Vector2(-999, -999);
    const raycaster = new THREE.Raycaster();
    const worldNormal = new THREE.Vector3(0, 1, 0).applyQuaternion(galaxyQuat);
    const galaxyPlane = new THREE.Plane().setFromNormalAndCoplanarPoint(worldNormal, GALAXY_OFFSET);
    let isMouseOver = false;
    const cursorSmooth = new THREE.Vector3(0, 0, 0);
    const cursorVelocity = new THREE.Vector3(0, 0, 0);
    let cursorStrength = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      isMouseOver = true;
    };
    const onMouseLeave = () => { isMouseOver = false; mouse.set(-999, -999); };
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);
    canvas.addEventListener("touchmove", (e) => {
      if (e.touches.length === 1) {
        const rect = canvas.getBoundingClientRect();
        mouse.x = ((e.touches[0].clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((e.touches[0].clientY - rect.top) / rect.height) * 2 + 1;
        isMouseOver = true;
      }
    }, { passive: true });
    canvas.addEventListener("touchend", onMouseLeave);

    // Scroll
    let scrollProgress = 0;
    let scrollPending = false;
    const updateScrollCamera = () => {
      const vh = window.innerHeight;
      const maxScroll = vh * CONFIG.camera.scrollRangeVH;
      const raw = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      scrollProgress = raw < 0.5 ? 4 * raw * raw * raw : 1 - Math.pow(-2 * raw + 2, 3) / 2;
    };
    const onScroll = () => {
      if (!scrollPending) {
        scrollPending = true;
        requestAnimationFrame(() => { updateScrollCamera(); scrollPending = false; });
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    updateScrollCamera(); // read initial scroll position immediately

    // Animation
    const clock = new THREE.Clock();
    let currentCamZ = CONFIG.camera.start.z;
    let currentCamY = CONFIG.camera.start.y;
    let currentCamX = CONFIG.camera.start.x;
    let currentScrollProgress = 0;

    let frameCount = 0;
    let lastFpsTime = performance.now();
    let adaptiveDpr = dpr;

    const expLerp = (current: number, target: number, speed: number, dt: number) => {
      return current + (target - current) * (1 - Math.exp(-speed * dt));
    };

    const animate = () => {
      requestAnimationFrame(animate);
      const dt = Math.min(clock.getDelta(), 0.05);
      const time = clock.getElapsedTime();

      frameCount++;
      const now = performance.now();
      if (now - lastFpsTime >= 2000) {
        const fps = frameCount / ((now - lastFpsTime) / 1000);
        frameCount = 0;
        lastFpsTime = now;
        if (fps < 42 && adaptiveDpr > 1) {
          adaptiveDpr = 1;
          renderer.setPixelRatio(1);
        } else if (fps > 58 && adaptiveDpr < dpr) {
          adaptiveDpr = dpr;
          renderer.setPixelRatio(dpr);
        }
        renderer.info.reset();
      }

      material.uniforms.uTime.value = time;
      material.uniforms.uCursorPos.value.copy(cursorSmooth);
      material.uniforms.uCursorActive.value = isMouseOver ? 1.0 : 0.0;
      const targetStrength = isMouseOver ? 1.0 : 0.0;
      cursorStrength = expLerp(cursorStrength, targetStrength, 3.5, dt);
      material.uniforms.uCursorStrength.value = cursorStrength;

      nebulaMat.uniforms.uTime.value = time;
      nebulaDome.rotation.y = time * 0.002;
      nebulaDome.rotation.x = time * 0.001;

      // --- CONTINUOUS ORBITAL ROTATION ---
      // Rotate the entire galaxy mesh on Y axis — delta-time based, never stops
      points.rotation.y += dt * 0.32;

      // Smoothly interpolate scroll progress for frame-rate independent camera
      currentScrollProgress = expLerp(currentScrollProgress, scrollProgress, CONFIG.camera.lerpSpeed, dt);

      // Cinematic scroll zoom — aggressive range from far to deep core
      const targetZ = CONFIG.camera.scrollMaxZ - currentScrollProgress * (CONFIG.camera.scrollMaxZ - CONFIG.camera.scrollMinZ);
      const targetY = CONFIG.camera.scrollMaxY - currentScrollProgress * (CONFIG.camera.scrollMaxY - CONFIG.camera.scrollMinY);
      const targetX = CONFIG.camera.scrollMaxX - currentScrollProgress * (CONFIG.camera.scrollMaxX - CONFIG.camera.scrollMinX);

      currentCamZ = expLerp(currentCamZ, targetZ, CONFIG.camera.lerpSpeed, dt);
      currentCamY = expLerp(currentCamY, targetY, CONFIG.camera.lerpSpeed, dt);
      currentCamX = expLerp(currentCamX, targetX, CONFIG.camera.lerpSpeed, dt);

      camera.position.set(currentCamX, currentCamY, currentCamZ);

      // FOV shift for dramatic perspective during zoom
      const targetFov = CONFIG.camera.scrollMaxFov - currentScrollProgress * (CONFIG.camera.scrollMaxFov - CONFIG.camera.scrollMinFov);
      camera.fov = expLerp(camera.fov, targetFov, 4.0, dt);
      camera.updateProjectionMatrix();

      // Cursor
      if (isMouseOver) {
        raycaster.setFromCamera(mouse, camera);
        const worldHit = new THREE.Vector3();
        if (raycaster.ray.intersectPlane(galaxyPlane, worldHit)) {
          const localHit = worldHit.clone().sub(GALAXY_OFFSET).applyQuaternion(invGalaxyQuat);
          cursorVelocity.subVectors(localHit, cursorSmooth);
          cursorSmooth.add(cursorVelocity.multiplyScalar(0.14));
        } else {
          const fallbackHit = raycaster.ray.origin.clone().add(raycaster.ray.direction.clone().multiplyScalar(120));
          const localHit = fallbackHit.sub(GALAXY_OFFSET).applyQuaternion(invGalaxyQuat);
          cursorVelocity.subVectors(localHit, cursorSmooth);
          cursorSmooth.add(cursorVelocity.multiplyScalar(0.14));
        }
      } else {
        cursorVelocity.multiplyScalar(0.78);
        cursorSmooth.add(cursorVelocity);
      }

      // Camera float
      const ft = time * CONFIG.camera.floatSpeed;
      camera.position.y += Math.sin(ft) * 0.005;
      camera.position.x += Math.cos(ft * 0.7) * 0.003;

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const w = container.clientWidth, h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      nebulaGeo.dispose();
      nebulaMat.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0">
      <canvas ref={canvasRef} className="w-full h-full block cursor-grab active:cursor-grabbing" />
    </div>
  );
}
