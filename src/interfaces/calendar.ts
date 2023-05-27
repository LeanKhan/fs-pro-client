import { type IFixture } from './fixture';
export interface ICalendarMatch {
  Fixture: IFixture;
  MatchType: string;
  Time: string;
  Competition: string;
  Played: boolean;
  Week: number;
}

export interface IDay {
  Matches: ICalendarMatch[];
  isFree: boolean;
  Day?: number;
  Year: string;
  Calendar: string;
}

export interface ICalendar {
  _id?: string;
  Name: string;
  /** Like JUN-2020 */
  YearString: string;
  /** Like 06-2020 */
  YearDigits: string;
  /** The present day of the year */
  CurrentDay?: number;
  /** If the Calendar is the active one */
  isActive: boolean;
  /** See if Calendar has been ended pata pata */
  isEnded: boolean;
  /** Are all Seasons completed? */
  allSeasonsCompleted: boolean;
  Days: string[];
}
