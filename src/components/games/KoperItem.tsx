import { Lock } from 'lucide-react'
import type { Prize } from '../../lib/prizes'
import { PrizeBadge } from '../PrizeBadge'
import type { ItemState } from './PickGame'

// Varied but cohesive briefcase skins — all deep/metallic tones unified by the
// gold latches + gold number, like the game-show reference.
const SKINS = [
  { body: 'from-slate-600 to-slate-900', handle: 'border-slate-600' }, // charcoal
  { body: 'from-[#a5324a] to-[#5e0f1c]', handle: 'border-[#7d2233]' }, // crimson
  { body: 'from-[#2a7d76] to-[#0d3a36]', handle: 'border-[#1f6258]' }, // teal
  { body: 'from-[#9c6a32] to-[#4d2f12]', handle: 'border-[#7a5226]' }, // bronze
  { body: 'from-[#454478] to-[#1c1b3a]', handle: 'border-[#373669]' }, // indigo
  { body: 'from-[#1f1f1f] to-[#000000]', handle: 'border-[#3a3a3a]' }, // black
]

/** Artwork for a single briefcase in the "Pilih Koper" game. */
export function KoperItem({ index, state, prize }: { index: number; state: ItemState; prize: Prize | null }) {
  if (state === 'won' && prize) {
    return (
      <span className="grid h-full w-full animate-pop place-items-center rounded-2xl bg-white shadow-clay-sm">
        <PrizeBadge prize={prize} size="sm" />
      </span>
    )
  }
  const dim = state === 'locked'
  const skin = SKINS[index % SKINS.length]
  return (
    <span
      className={[
        'relative flex h-[80%] w-[86%] flex-col items-center',
        state === 'opening' ? 'animate-wiggle' : '',
        dim ? 'opacity-45' : '',
      ].join(' ')}
    >
      <span className={`h-2.5 w-7 rounded-t-md border-2 border-b-0 ${skin.handle}`} />
      <span
        className={`relative grid w-full flex-1 place-items-center rounded-xl bg-gradient-to-b ${skin.body} shadow-clay ring-1 ring-black/30`}
      >
        <span className="absolute left-[18%] top-2 h-1.5 w-3 rounded-sm bg-tsel-gold" />
        <span className="absolute right-[18%] top-2 h-1.5 w-3 rounded-sm bg-tsel-gold" />
        {dim ? (
          <Lock className="h-5 w-5 text-white/70" strokeWidth={2.5} />
        ) : (
          <span className="font-display text-[1.25rem] font-extrabold text-tsel-gold drop-shadow-[0_1px_0_rgba(0,0,0,0.25)]">{index + 1}</span>
        )}
      </span>
    </span>
  )
}
