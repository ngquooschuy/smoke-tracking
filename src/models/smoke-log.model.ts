import { SmokingReason } from '../enums/reason.enum.ts';

export interface ISmokeLog {
  id: string;
  time: string;
  reason: SmokingReason | string;
}

export interface ITimeElapsed {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
}
