export interface IQuest {
  id: string;
  title: string;
  desc: string;
  exp: number;
  hp: number;
  completed: boolean;
  claimed: boolean;
  icon: string;
}
