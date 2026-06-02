import { useRef, useState, type ReactNode } from 'react'
import type { Prize } from '../../lib/prizes'

export type ItemState = 'idle' | 'opening' | 'won' | 'locked'

interface PickGameProps {
  count: number
  disabled: boolean
  reduced: boolean
  /** The prize the chosen item will reveal. */
  prize: Prize
  /** Called once the chosen item finishes its "open" animation. */
  onResult: (prize: Prize) => void
  /** Renders the artwork for a single item given its current state. */
  renderItem: (args: { index: number; state: ItemState; prize: Prize | null }) => ReactNode
  /** Open animation duration in ms (ignored under reduced motion). */
  openMs?: number
}

/**
 * Generic "pick one of N, it opens to reveal a prize, the rest lock" mechanic.
 * Shared by the egg and briefcase games — only the artwork differs.
 */
export function PickGame({ count, disabled, reduced, prize, onResult, renderItem, openMs = 650 }: PickGameProps) {
  const [selected, setSelected] = useState<number | null>(null)
  const [opened, setOpened] = useState(false)
  const prizeRef = useRef<Prize | null>(null)

  function pick(i: number) {
    if (disabled || selected !== null) return
    prizeRef.current = prize
    setSelected(i)
    window.setTimeout(
      () => {
        setOpened(true)
        onResult(prize)
      },
      reduced ? 50 : openMs,
    )
  }

  return (
    <div className="grid w-full max-w-[24rem] grid-cols-3 gap-3">
      {Array.from({ length: count }, (_, i) => {
        let state: ItemState = 'idle'
        if (selected === i) state = opened ? 'won' : 'opening'
        else if (selected !== null) state = 'locked'
        return (
          <button
            key={i}
            type="button"
            disabled={disabled || selected !== null}
            onClick={() => pick(i)}
            aria-label={`Pilihan ${i + 1}`}
            className="relative block aspect-square w-full rounded-2xl transition-transform duration-150 enabled:active:scale-95 disabled:cursor-not-allowed"
          >
            <span className="absolute inset-0 grid place-items-center">
              {renderItem({ index: i, state, prize: selected === i ? prizeRef.current : null })}
            </span>
          </button>
        )
      })}
    </div>
  )
}
