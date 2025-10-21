import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrder } from '../hooks/useOrder';

const HomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const { events, setActiveEventId } = useOrder();

  const planningEvents = events.filter(e => e.status === 'planning');
  const paidEvents = events.filter(e => e.status === 'paid');

  const handleContinuePlanning = (eventId: string) => {
    setActiveEventId(eventId);
    navigate('/menu');
  };

  if (events.length === 0) {
    return (
      <div className="p-6 flex flex-col items-center justify-center text-center" style={{ minHeight: 'calc(100vh - 80px)' }}>
        <div className="w-24 h-24 rounded-full border-2 border-earthy-gold flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#C77D55" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
            <polyline points="13 2 13 9 20 9"></polyline>
            <line x1="12" y1="18" x2="12" y2="12"></line>
            <line x1="9" y1="15" x2="15" y2="15"></line>
          </svg>
        </div>
        <h1 className="text-4xl font-sans font-bold text-creamy-white mb-4">
          Plan Your Perfect Buffet
        </h1>
        <p className="text-creamy-white/80 mb-8 max-w-xs">
          Let's get started by creating a new buffet plan for your celebration.
        </p>

        <button
          onClick={() => navigate('/create-event')}
          className="w-full max-w-sm py-4 bg-earthy-gradient text-dark-umber font-bold rounded-2xl shadow-lg transition-transform transform hover:scale-105 active:scale-95"
        >
          + Plan Your First Buffet
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 pb-24">
      <h1 className="text-5xl font-sans font-bold text-creamy-white mb-8">Dashboard</h1>

      <div className="space-y-8">
        {planningEvents.length > 0 && (
          <div>
            <h2 className="text-3xl font-sans font-bold text-creamy-white mb-4">Current Plans</h2>
            <div className="space-y-4">
              {planningEvents.map(event => (
                <div key={event.id} className="bg-muted-taupe/60 p-4 rounded-2xl">
                  <h3 className="font-bold text-lg text-creamy-white">{event.name}</h3>
                  <p className="text-sm text-creamy-white/80">{event.eventType} on {event.date}</p>
                  <p className="text-xs mt-1 text-earthy-gold">
                    {event.plates} Plates | {event.cart.length} items in list
                  </p>
                  <button
                    onClick={() => handleContinuePlanning(event.id)}
                    className="mt-4 w-full py-2 bg-earthy-gradient text-dark-umber text-sm font-bold rounded-lg transition-transform transform active:scale-95"
                  >
                    Continue Planning
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {paidEvents.length > 0 && (
          <div>
            <h2 className="text-3xl font-sans font-bold text-creamy-white mb-4">Confirmed Orders</h2>
            <div className="space-y-4">
              {paidEvents.map(event => {
                const eventDate = new Date(event.date);
                const today = new Date();
                today.setHours(0, 0, 0, 0); // Compare dates only
                const isFinished = eventDate < today;

                return (
                  <div 
                    key={event.id}
                    onClick={() => navigate(`/past-order/${event.id}`)}
                    className="bg-muted-taupe/60 p-4 rounded-2xl cursor-pointer hover:bg-muted-taupe/80 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="font-bold text-lg text-creamy-white">{event.name}</h3>
                            <p className="text-sm text-creamy-white/80">{event.eventType} on {event.date}</p>
                        </div>
                        <span className={`px-2 py-0.5 text-xs font-semibold rounded-full text-white ${isFinished ? 'bg-muted-taupe' : 'bg-green-600'}`}>
                            {isFinished ? 'Finished' : 'Ongoing'}
                        </span>
                    </div>
                    <p className="text-xs mt-2 text-earthy-gold">
                      {event.plates} Plates | {event.cart.length} items ordered
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-auto z-20">
        <button
          onClick={() => navigate('/create-event')}
          className="py-3 px-5 bg-earthy-gradient text-dark-umber font-bold rounded-full shadow-lg flex items-center space-x-2 transition-transform transform active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          <span>Plan a New Buffet</span>
        </button>
      </div>
    </div>
  );
};

export default HomeScreen;