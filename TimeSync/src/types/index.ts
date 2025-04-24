export interface Participant {
  id: string;
  name: string;
  timeZone: string;
  availability: {
    start: number; // 0-23 hours
    end: number; // 0-23 hours
  };
}

export interface Meeting {
  id: string;
  title: string;
  participants: Participant[];
  suggestedTimes: SuggestedTimeSlot[];
}

export interface SuggestedTimeSlot {
  start: Date;
  end: Date;
  score: number; // Higher score means better time slot
  participantTimes: {
    participantId: string;
    localTime: string;
  }[];
}

export interface TimeBlock {
  hour: number;
  available: boolean;
  localTime: string;
  utcTime: string;
}

export type ThemeMode = 'light' | 'dark';