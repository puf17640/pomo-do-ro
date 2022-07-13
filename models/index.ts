export class Pomodoro {
  startTime: Date;
  title: string;
  isDone: boolean;
  duration: number;
  isBreak: boolean;
  tasks?: Task[];
}

export class Task {
  title: string;
  isDone: boolean;
}
