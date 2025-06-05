export interface Court {
  id: string;
  name: string;
  type: 'clay' | 'hard';
  imageUrl: string;
}

export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  duration: 60 | 90;
  isAvailable: boolean;
}

export interface Booking {
  id: string;
  courtId: string;
  date: string;
  timeSlot: TimeSlot;
  userEmail: string;
}