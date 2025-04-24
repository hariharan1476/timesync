import React, { createContext, useContext, useState } from 'react';
import { Meeting, Participant, SuggestedTimeSlot } from '../types';
import { findOverlappingTimeSlots } from '../utils/timeUtils';
import { v4 as uuidv4 } from '../utils/uuidUtils';

interface MeetingContextType {
  meeting: Meeting;
  setMeetingTitle: (title: string) => void;
  addParticipant: (participant: Omit<Participant, 'id'>) => void;
  updateParticipant: (id: string, participant: Partial<Omit<Participant, 'id'>>) => void;
  removeParticipant: (id: string) => void;
  findAvailableTimes: () => void;
  resetMeeting: () => void;
}

const defaultMeeting: Meeting = {
  id: uuidv4(),
  title: 'New Meeting',
  participants: [],
  suggestedTimes: [],
};

const MeetingContext = createContext<MeetingContextType | undefined>(undefined);

export const MeetingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [meeting, setMeeting] = useState<Meeting>(defaultMeeting);

  const setMeetingTitle = (title: string) => {
    setMeeting(prev => ({ ...prev, title }));
  };

  const addParticipant = (participant: Omit<Participant, 'id'>) => {
    const newParticipant: Participant = {
      ...participant,
      id: uuidv4(),
    };
    
    setMeeting(prev => ({
      ...prev,
      participants: [...prev.participants, newParticipant],
    }));
  };

  const updateParticipant = (id: string, updates: Partial<Omit<Participant, 'id'>>) => {
    setMeeting(prev => ({
      ...prev,
      participants: prev.participants.map(p => 
        p.id === id ? { ...p, ...updates } : p
      ),
    }));
  };

  const removeParticipant = (id: string) => {
    setMeeting(prev => ({
      ...prev,
      participants: prev.participants.filter(p => p.id !== id),
    }));
  };

  const findAvailableTimes = () => {
    if (meeting.participants.length < 2) {
      return;
    }
    
    const suggestedTimes = findOverlappingTimeSlots(meeting.participants);
    
    setMeeting(prev => ({
      ...prev,
      suggestedTimes,
    }));
  };

  const resetMeeting = () => {
    setMeeting({
      ...defaultMeeting,
      id: uuidv4(),
    });
  };

  return (
    <MeetingContext.Provider
      value={{
        meeting,
        setMeetingTitle,
        addParticipant,
        updateParticipant,
        removeParticipant,
        findAvailableTimes,
        resetMeeting,
      }}
    >
      {children}
    </MeetingContext.Provider>
  );
};

export const useMeeting = (): MeetingContextType => {
  const context = useContext(MeetingContext);
  if (context === undefined) {
    throw new Error('useMeeting must be used within a MeetingProvider');
  }
  return context;
};