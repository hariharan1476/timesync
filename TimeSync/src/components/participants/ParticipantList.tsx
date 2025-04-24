import React from 'react';
import { Clock, Edit, Trash2, UserCircle } from 'lucide-react';
import { formatHour } from '../../utils/timeUtils';
import { useMeeting } from '../../context/MeetingContext';
import Button from '../ui/Button';

const ParticipantList: React.FC = () => {
  const { meeting, removeParticipant } = useMeeting();
  const { participants } = meeting;

  if (participants.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm text-center animate-fade-in">
        <p className="text-gray-500 dark:text-gray-400 italic">
          No participants added yet. Add participants to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden animate-fade-in">
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {participants.map((participant) => (
          <li key={participant.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <UserCircle className="h-10 w-10 text-primary-500" />
                
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {participant.name}
                  </h4>
                  
                  <div className="flex items-center mt-1 text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    <span>{participant.timeZone.replace(/_/g, ' ')}</span>
                  </div>
                  
                  <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                    Available: {formatHour(participant.availability.start)} - {formatHour(participant.availability.end)}
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  aria-label={`Remove ${participant.name}`}
                  onClick={() => removeParticipant(participant.id)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ParticipantList;