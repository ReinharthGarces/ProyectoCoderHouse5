export interface Schedule {
  day: string;
  time: string;
  instructor: string;
  preview: string;
}

export interface Class {
  title: string;
  description: string;
  schedule: Schedule[];
}
