import React from 'react';
import { Clock, Check } from 'lucide-react';
import { formatDate, formatTime } from '../../utils/timeUtils';
import { useMeeting } from '../../context/MeetingContext';
import Button from '../ui/Button';

const TimeGrid: React.FC = () => {
  const { meeting } = useMeeting();
  const { suggestedTimes, participants } = meeting;

  if (suggestedTimes.length === 0) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden animate-slide-up">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Suggested Meeting Times
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Times when all participants are available based on their local time zones
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-750">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                UTC Time
              </th>
              {participants.map((participant) => (
                <th 
                  key={participant.id}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  {participant.name}'s Local Time
                </th>
              ))}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {suggestedTimes.map((slot, index) => (
              <tr 
                key={index}
                className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-primary-500 mr-2" />
                    <span>{formatDate(slot.start)} @ {formatTime(slot.start)}</span>
                  </div>
                </td>
                
                {participants.map((participant) => {
                  const participantTime = slot.participantTimes.find(
                    pt => pt.participantId === participant.id
                  );
                  
                  return (
                    <td 
                      key={participant.id}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300"
                    >
                      <div className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        <span>{participantTime?.localTime || 'Unknown'}</span>
                      </div>
                    </td>
                  );
                })}
                
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-primary-600 hover:text-primary-700"
                  >
                    Copy Link
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {suggestedTimes.length === 0 && (
        <div className="py-8 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            No overlapping time slots found for all participants
          </p>
        </div>
      )}
    </div>
  );
};

export default TimeGrid;