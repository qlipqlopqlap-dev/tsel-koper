import { GameScreen } from '../components/GameScreen'
import { ResultOverlay } from '../components/ResultOverlay'
import { PickGame } from '../components/games/PickGame'
import { KoperItem } from '../components/games/KoperItem'
import { CAMPAIGN } from '../lib/content'
import { GAMES } from '../lib/games'
import { getPrize } from '../lib/prizes'
import { useGameSession } from '../lib/useGameSession'

const WIN = getPrize('kuota15')

export function KoperPage() {
  const { prize, revealed, expired, setExpired, reveal, reduced } = useGameSession()
  return (
    <GameScreen
      dapat={GAMES.koper.lead}
      instruction={GAMES.koper.instruction}
      expired={expired}
      onExpire={() => setExpired(true)}
    >
      {revealed && prize ? (
        <ResultOverlay prize={prize} />
      ) : (
        <PickGame
          count={CAMPAIGN.ticketCount}
          disabled={expired || revealed}
          reduced={reduced}
          prize={WIN}
          onResult={reveal}
          renderItem={(args) => <KoperItem {...args} />}
        />
      )}
    </GameScreen>
  )
}
