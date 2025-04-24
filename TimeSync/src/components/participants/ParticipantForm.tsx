import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import { getTimeZones, generateTimeOptions } from '../../utils/timeUtils';
import { useMeeting } from '../../context/MeetingContext';

const timeOptions = generateTimeOptions();
const timeZoneOptions = getTimeZones().map(zone => ({
  value: zone,
  label: zone.replace(/_/g, ' '),
}));

interface FormState {
  name: string;
  timeZone: string;
  startTime: number;
  endTime: number;
}

interface FormErrors {
  name?: string;
  timeZone?: string;
  time?: string;
}

const ParticipantForm: React.FC = () => {
  const { addParticipant } = useMeeting();
  const [form, setForm] = useState<FormState>({
    name: '',
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    startTime: 9, // Default 9 AM
    endTime: 17, // Default 5 PM
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (field: keyof FormState, value: string | number) => {
    setForm(prev => ({ ...prev, [field]: value }));
    
    // Clear error when field is edited
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!form.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!form.timeZone) {
      newErrors.timeZone = 'Time zone is required';
    }
    
    if (form.startTime >= form.endTime) {
      newErrors.time = 'End time must be after start time';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      addParticipant({
        name: form.name,
        timeZone: form.timeZone,
        availability: {
          start: form.startTime,
          end: form.endTime,
        },
      });
      
      // Reset name but keep the time zone and availability
      setForm(prev => ({
        ...prev,
        name: '',
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm animate-fade-in">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Add Participant</h3>
      
      <div className="space-y-4">
        <Input
          label="Name"
          placeholder="Enter participant name"
          value={form.name}
          onChange={(value) => handleChange('name', value)}
          error={errors.name}
          required
        />
        
        <Select
          label="Time Zone"
          options={timeZoneOptions}
          value={form.timeZone}
          onChange={(value) => handleChange('timeZone', value)}
          error={errors.timeZone}
          required
        />
        
        <div className="flex flex-col space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Available Hours
          </label>
          
          <div className="flex items-center space-x-2">
            <Select
              options={timeOptions}
              value={form.startTime}
              onChange={(value) => handleChange('startTime', parseInt(value))}
              className="w-32"
              aria-label="Start time"
            />
            
            <span className="text-gray-500 dark:text-gray-400">to</span>
            
            <Select
              options={timeOptions}
              value={form.endTime}
              onChange={(value) => handleChange('endTime', parseInt(value))}
              className="w-32"
              aria-label="End time"
            />
          </div>
          
          {errors.time && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.time}</p>
          )}
        </div>
        
        <Button 
          type="submit" 
          variant="primary"
          icon={<UserPlus className="h-4 w-4" />}
          className="w-full mt-2"
        >
          Add Participant
        </Button>
      </div>
    </form>
  );
};

export default ParticipantForm;