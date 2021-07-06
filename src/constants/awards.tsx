import { FAN_LEVELS } from '../contexts/ScoreContext'
import SuperAward from '../media/award-super.png'
import MegaAward from '../media/award-mega.png'
import EarlyAward from '../media/award-early.png'
import SolidAward from '../media/award-solid.png'
import RealAward from '../media/award-real.png'

export const AWARD_IMGS = new Map<number, string>([
  [FAN_LEVELS.SUPER, SuperAward],
  [FAN_LEVELS.MEGA, MegaAward],
  [FAN_LEVELS.EARLY, EarlyAward],
  [FAN_LEVELS.SOLID, SolidAward],
  [FAN_LEVELS.REAL, RealAward],
])
