import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useOrder } from '../hooks/useOrder';
import { EVENT_TYPES } from '../constants';

import WeddingIcon from '../components/icons/WeddingIcon';
import EngagementIcon from '../components/icons/EngagementIcon';
import MehndiIcon from '../components/icons/MehndiIcon';
import ReceptionIcon from '../components/icons/ReceptionIcon';
import HaldiIcon from '../components/icons/HaldiIcon';
import OtherIcon from '../components/icons/OtherIcon';

const eventIcons: { [key: string]: React.FC<{ className?: string }> } = {
    'Wedding': WeddingIcon,
    'Mehendi': MehndiIcon,
    'Reception': ReceptionIcon,
    'Engagement': EngagementIcon,
    'Haldi': HaldiIcon,
    'Other': OtherIcon,
};


const CreateEventScreen: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addEvent, getActiveEvent, updateEvent } = useOrder();
  
  const isEditing = location.state?.isEditing || false;
  const activeEvent = getActiveEvent();
  
  const [eventName, setEventName] = useState('');
  const [eventType, setEventType] = useState<string | null>(null);
  const [plates, setPlates] = useState<number>(50);
  const [date, setDate] = useState<string>('');
  
  useEffect(() => {
    if (isEditing && activeEvent) {
        setEventName(activeEvent.name);
        setEventType(activeEvent.eventType);
        setPlates(activeEvent.plates);
        setDate(activeEvent.date);
    }
  }, [isEditing, activeEvent]);

  const isFormValid = eventName && eventType && date;

  const handleSubmit = () => {
    if (!isFormValid) return;

    if (isEditing) {
      updateEvent({ name: eventName, eventType, plates, date });
      navigate(-1); // Go back to the previous screen (cart)
    } else {
      addEvent({ name: eventName, eventType, plates, date });
      navigate('/menu');
    }
  };

  return (
    <div className="p-6 flex flex-col h-full min-h-[calc(100vh-80px)]">
      <h1 className="text-5xl font-sans font-bold text-creamy-white mb-8">{isEditing ? 'Edit Your Buffet' : 'Plan Your Buffet'}</h1>
      
      <div className="space-y-6 flex-grow overflow-y-auto">
        <div>
          <label className="text-earthy-gold text-lg block mb-2">Buffet Name</label>
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            placeholder="e.g., Mona & Girish's Wedding"
            className="w-full p-3 bg-muted-taupe/60 text-creamy-white rounded-lg border-2 border-transparent focus:border-earthy-gold focus:outline-none"
          />
        </div>

        <div>
            <label className="text-earthy-gold text-lg block mb-2">Celebration Type</label>
            <div className="grid grid-cols-3 gap-3">
                {EVENT_TYPES.map(event => {
                    const Icon = eventIcons[event.name];
                    const isSelected = eventType === event.name;
                    return (
                        <div
                            key={event.name}
                            onClick={() => setEventType(event.name)}
                            className={`cursor-pointer rounded-xl p-2 text-center transition-all duration-200 flex flex-col items-center justify-center space-y-2 aspect-square ${isSelected ? 'bg-earthy-gold' : 'bg-muted-taupe/60'}`}
                        >
                            {Icon && <Icon className={isSelected ? 'text-dark-umber' : 'text-creamy-white'} />}
                            <span className={`text-sm font-semibold ${isSelected ? 'text-dark-umber' : 'text-creamy-white'}`}>{event.name}</span>
                        </div>
                    );
                })}
            </div>
        </div>

        <div>
          <label className="text-earthy-gold text-lg block mb-2">Number of plates</label>
          <div className="flex items-center space-x-4">
            <input
              type="range"
              min="10"
              max="1000"
              step="10"
              value={plates}
              onChange={(e) => setPlates(Number(e.target.value))}
              className="w-full h-2 bg-muted-taupe rounded-lg appearance-none cursor-pointer range-slider"
            />
            <span className="bg-muted-taupe/60 text-creamy-white text-lg font-bold py-2 px-4 rounded-lg w-24 text-center">{plates}</span>
          </div>
        </div>

        <div>
          <label className="text-earthy-gold text-lg block mb-2">Select Date</label>
          <input
            type="date"
            value={date}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-3 bg-muted-taupe/60 text-creamy-white rounded-lg border-2 border-transparent focus:border-earthy-gold focus:outline-none"
            style={{ colorScheme: 'dark' }}
          />
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={!isFormValid}
        className="w-full mt-8 py-4 bg-earthy-gradient text-dark-umber font-bold rounded-2xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-transform transform active:scale-95"
      >
        {isEditing ? 'Update Event Details' : 'Create & Choose Menu'}
      </button>
      <style>{`
        .range-slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 20px;
            height: 20px;
            background: #C77D55;
            cursor: pointer;
            border-radius: 50%;
        }

        .range-slider::-moz-range-thumb {
            width: 20px;
            height: 20px;
            background: #C77D55;
            cursor: pointer;
            border-radius: 50%;
        }
    `}</style>
    </div>
  );
};

export default CreateEventScreen;