import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrder } from '../hooks/useOrder';

const ProfileScreen: React.FC = () => {
  const navigate = useNavigate();
  const { events, activeEventId, setActiveEventId } = useOrder();
  
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState('Guest User');
  const [userEmail, setUserEmail] = useState('guest@example.com');

  useEffect(() => {
    const savedUser = localStorage.getItem('ilahi-user');
    if (savedUser) {
        const { name, email } = JSON.parse(savedUser);
        setUserName(name);
        setUserEmail(email);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('ilahi-user', JSON.stringify({ name: userName, email: userEmail }));
    setIsEditing(false);
  };

  const handleSelectEvent = (eventId: string) => {
    setActiveEventId(eventId);
    navigate('/menu');
  };

  const planningEvents = events.filter(event => event.status === 'planning');
  const pastOrders = events.filter(event => event.status === 'paid');

  return (
    <div className="p-6 pb-24">
      <h1 className="text-5xl font-sans font-bold text-creamy-white mb-2">Profile</h1>
      
      <div className="bg-muted-taupe/60 backdrop-blur-sm p-4 rounded-2xl mb-8">
         <div className="flex justify-between items-center mb-2">
            <h2 className="font-bold text-lg text-earthy-gold">Account Details</h2>
            {isEditing ? (
                <button onClick={handleSave} className="text-sm bg-earthy-gold text-dark-umber font-bold px-3 py-1 rounded-md transition-transform transform active:scale-95">Save</button>
            ) : (
                <button onClick={() => setIsEditing(true)} className="text-sm text-earthy-gold">Edit</button>
            )}
         </div>
         {isEditing ? (
            <div className="space-y-2">
                <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} className="w-full p-2 bg-dark-slate/80 rounded-md text-creamy-white font-semibold" />
                <input type="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} className="w-full p-2 bg-dark-slate/80 rounded-md text-creamy-white" />
            </div>
         ) : (
            <div>
                <p className="text-creamy-white/80">Name: <span className="text-creamy-white font-semibold">{userName}</span></p>
                <p className="text-creamy-white/80">Email: <span className="text-creamy-white font-semibold">{userEmail}</span></p>
            </div>
         )}
      </div>

      <div className="space-y-8">
        <div>
            <h2 className="text-4xl font-sans font-bold text-creamy-white mb-4">Current Plans</h2>
            {planningEvents.length === 0 ? (
                <div className="text-center text-creamy-white/70 py-10 bg-muted-taupe/30 rounded-2xl">
                    <p>You have no buffet plans yet.</p>
                    <button
                        onClick={() => navigate('/create-event')}
                        className="mt-4 px-6 py-2 bg-earthy-gold text-dark-umber font-bold rounded-full transition-transform transform active:scale-95"
                    >
                        Plan Your First Buffet
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    {planningEvents.map(event => (
                    <div
                        key={event.id}
                        onClick={() => handleSelectEvent(event.id)}
                        className={`p-4 rounded-2xl cursor-pointer transition-all duration-200 border-2 ${activeEventId === event.id ? 'border-earthy-gold bg-muted-taupe/60' : 'border-transparent bg-muted-taupe/60 hover:border-earthy-gold/50'}`}
                    >
                        <h3 className={`font-bold text-lg ${activeEventId === event.id ? 'text-earthy-gold' : 'text-creamy-white'}`}>{event.name}</h3>
                        <p className="text-sm text-creamy-white/80">{event.eventType} on {event.date}</p>
                        <p className={`text-xs mt-1 ${activeEventId === event.id ? 'text-creamy-white' : 'text-earthy-gold'}`}>
                        {event.plates} Plates | {event.cart.length} items in list
                        </p>
                    </div>
                    ))}
                </div>
            )}
        </div>
        
        <div>
            <h2 className="text-4xl font-sans font-bold text-creamy-white mb-4">Confirmed Orders</h2>
             <div className="text-center text-creamy-white/70 py-10 bg-muted-taupe/30 rounded-2xl">
                <p>View your ongoing and finished orders on the dashboard.</p>
                <button
                    onClick={() => navigate('/home')}
                    className="mt-4 px-6 py-2 bg-earthy-gold text-dark-umber font-bold rounded-full transition-transform transform active:scale-95"
                >
                    Go to Dashboard
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;