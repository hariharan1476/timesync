import { addDays, format, parse, set } from 'date-fns';
import { formatInTimeZone, zonedTimeToUtc, utcToZonedTime } from 'date-fns-tz';
import { Participant, SuggestedTimeSlot } from '../types';

// Get all available timezones for the selector
export const getTimeZones = (): string[] => {
  return Intl.supportedValuesOf('timeZone');
};

// Format a time value (0-23) to a display string
export const formatHour = (hour: number): string => {
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  return `${displayHour}:00 ${ampm}`;
};

// Convert local time to a specific timezone
export const convertToTimeZone = (date: Date, timeZone: string): Date => {
  return utcToZonedTime(date, timeZone);
};

// Find all time slots where participants' availabilities overlap
export const findOverlappingTimeSlots = (participants: Participant[]): SuggestedTimeSlot[] => {
  if (participants.length < 2) {
    return [];
  }

  const suggestedSlots: SuggestedTimeSlot[] = [];
  const today = new Date();
  const tomorrow = addDays(today, 1);

  // Check all hours of the day and find overlapping slots
  for (let hour = 0; hour < 24; hour++) {
    const baseTime = set(today, { hours: hour, minutes: 0, seconds: 0, milliseconds: 0 });
    
    // Check if all participants are available at this time
    const availableParticipants = participants.filter(participant => {
      const participantLocalTime = utcToZonedTime(baseTime, participant.timeZone);
      const participantHour = participantLocalTime.getHours();
      
      return (
        participantHour >= participant.availability.start && 
        participantHour < participant.availability.end
      );
    });

    if (availableParticipants.length === participants.length) {
      // Everyone is available - this is a good time slot
      const endTime = set(today, { hours: hour + 1, minutes: 0, seconds: 0, milliseconds: 0 });
      
      const participantTimes = participants.map(participant => {
        const localTime = formatInTimeZone(baseTime, participant.timeZone, 'h:mm a');
        return {
          participantId: participant.id,
          localTime
        };
      });

      suggestedSlots.push({
        start: baseTime,
        end: endTime,
        score: 100, // Basic score, could be improved to factor in preferences
        participantTimes
      });
    }
  }

  return suggestedSlots.sort((a, b) => b.score - a.score);
};

// Generate an array of hours for time selection
export const generateTimeOptions = (): { value: number; label: string }[] => {
  return Array.from({ length: 24 }, (_, i) => ({
    value: i,
    label: formatHour(i)
  }));
};

// Format date for display
export const formatDate = (date: Date): string => {
  return format(date, 'E, MMM d, yyyy');
};

// Format time for display
export const formatTime = (date: Date, timeZone?: string): string => {
  if (timeZone) {
    return formatInTimeZone(date, timeZone, 'h:mm a');
  }
  return format(date, 'h:mm a');
};