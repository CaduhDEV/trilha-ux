// Efeitos sonoros curtos gerados com Web Audio (sem arquivos de áudio).
const KEY = 'trilha-ux:sound'

let ctx: AudioContext | null = null

export function soundEnabled(): boolean {
  try {
    return localStorage.getItem(KEY) !== 'off'
  } catch {
    return true
  }
}

export function setSoundEnabled(on: boolean) {
  try {
    localStorage.setItem(KEY, on ? 'on' : 'off')
  } catch {
    /* ignora */
  }
}

function tone(freqs: number[], dur = 0.12, type: OscillatorType = 'sine', gap = 0.09) {
  if (!soundEnabled()) return
  try {
    ctx ??= new AudioContext()
    const t0 = ctx.currentTime
    freqs.forEach((f, i) => {
      const osc = ctx!.createOscillator()
      const gain = ctx!.createGain()
      osc.type = type
      osc.frequency.value = f
      const start = t0 + i * gap
      gain.gain.setValueAtTime(0.0001, start)
      gain.gain.exponentialRampToValueAtTime(0.18, start + 0.015)
      gain.gain.exponentialRampToValueAtTime(0.0001, start + dur)
      osc.connect(gain).connect(ctx!.destination)
      osc.start(start)
      osc.stop(start + dur + 0.02)
    })
  } catch {
    /* navegador sem áudio */
  }
}

export const sfx = {
  correct: () => tone([660, 990], 0.14),
  wrong: () => tone([220, 180], 0.18, 'triangle', 0.11),
  finish: () => tone([523, 659, 784, 1047], 0.18, 'sine', 0.11),
}
