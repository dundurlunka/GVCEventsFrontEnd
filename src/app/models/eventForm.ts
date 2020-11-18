import { Timestamp } from 'rxjs';

export interface IEventForm {
  name?: string,
  oddsForFirstTeam?: number,
  oddsForDraw?: number,
  oddsForSecondTeam?: number,
  startDate?: string
}
