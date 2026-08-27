export interface ITimelineEvent {
  id: string;
  type: 'SMOKE' | 'CRAVING_RESISTED';
  title: string;
  reason: string;
  rawReason?: string;
  time: string;
  formattedTime: string;
  formattedDate: string;
  hpImpact: number;
  hpText: string;
}

export interface ITimelineResponse {
  totalSmoked: number;
  hp: number;
  cravingsResisted: number;
  timeline: ITimelineEvent[];
}
