import React, { useState } from 'react';
import { CalendarCheck, Edit2 } from 'lucide-react';
import { useMeeting } from '../../context/MeetingContext';
import Input from '../ui/Input';
import Button from '../ui/Button';

const MeetingSetup: React.FC = () => {
  const { meeting, setMeetingTitle, findAvailableTimes } = useMeeting();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(meeting.title);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMeetingTitle(title);
    setIsEditing(false);
  };

  const handleFindTimes = () => {
    findAvailableTimes();
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        {isEditing ? (
          <form onSubmit={handleSubmit} className="flex-1">
            <Input
              value={title}
              onChange={setTitle}
              placeholder="Enter meeting title"
              autoFocus
              className="font-medium text-lg"
            />
            <div className="mt-2 flex space-x-2">
              <Button 
                type="submit" 
                variant="primary" 
                size="sm"
              >
                Save
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div className="flex items-center">
            <CalendarCheck className="h-6 w-6 text-primary-500 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {meeting.title}
            </h2>
            <button
              className="ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              onClick={() => setIsEditing(true)}
              aria-label="Edit meeting title"
            >
              <Edit2 className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Add all participants and their available hours to find the best meeting time across different time zones.
      </p>
      
      {meeting.participants.length > 1 && (
        <Button 
          variant="primary" 
          onClick={handleFindTimes}
          icon={<CalendarCheck className="h-4 w-4" />}
          className="w-full"
        >
          Find Available Meeting Times
        </Button>
      )}
    </div>
  );
};

export default MeetingSetup;