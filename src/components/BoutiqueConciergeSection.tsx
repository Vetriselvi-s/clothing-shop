import React, { useState } from 'react';
import { MapPin, Clock, Calendar, Check } from 'lucide-react';

export const BoutiqueConciergeSection: React.FC = () => {
  const [selectedBoutique, setSelectedBoutique] = useState('paris');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingName, setBookingName] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const boutiques = [
    {
      id: 'paris',
      city: 'Paris Flagship',
      address: '42 Rue Saint-Honoré, 75001 Paris',
      hours: 'Mon – Sat: 10:00 – 19:30 · Sun: By Appointment',
      phone: '+33 1 42 68 50 00',
      concierge: 'Clothilde & Henri'
    },
    {
      id: 'newyork',
      city: 'New York Atelier',
      address: '148 Mercer Street, SoHo, NY 10012',
      hours: 'Mon – Sat: 11:00 – 20:00 · Sun: 12:00 – 18:00',
      phone: '+1 212 925 3300',
      concierge: 'Harrison & Maya'
    },
    {
      id: 'tokyo',
      city: 'Tokyo Aoyama',
      address: '5-7-22 Minamiaoyama, Minato-ku, Tokyo 107-0062',
      hours: 'Tue – Sun: 11:00 – 19:00 · Mon: Closed',
      phone: '+81 3 5468 1120',
      concierge: 'Kenji & Aoi'
    },
    {
      id: 'london',
      city: 'London Mayfair',
      address: '19 Mount Street, Mayfair, London W1K 2RN',
      hours: 'Mon – Sat: 10:00 – 18:30 · Sun: Closed',
      phone: '+44 20 7499 8810',
      concierge: 'Arthur & Eleanor'
    }
  ];

  const handleBookFitting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingName.trim()) return;
    setBookingConfirmed(true);
    setTimeout(() => {
      setBookingConfirmed(false);
      setShowBookingModal(false);
      setBookingName('');
      setBookingDate('');
    }, 2800);
  };

  const activeBoutique = boutiques.find((b) => b.id === selectedBoutique) || boutiques[0];

  return (
    <section id="boutiques" className="py-20 md:py-28 bg-[#F5F4F0] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Narrative */}
          <div className="lg:col-span-5 space-y-6">
            <div className="text-xs uppercase tracking-widest text-stone-500 font-semibold">
              Bespoke Fittings & Flagships
            </div>
            <h2 className="text-3xl sm:text-4xl font-light text-stone-900 font-editorial [text-wrap:balance]">
              Experience the Weight and Texture in Person.
            </h2>
            <p className="text-sm text-stone-600 font-light leading-relaxed">
              Step into our quiet spatial environments. Our dedicated house concierges offer custom hem alterations, made-to-measure suiting appointments, and complimentary garment steaming.
            </p>

            <button
              onClick={() => setShowBookingModal(true)}
              className="bg-stone-900 hover:bg-stone-800 text-white text-xs uppercase tracking-widest font-medium py-3.5 px-6 transition-colors cursor-pointer"
            >
              Reserve Private Fitting
            </button>
          </div>

          {/* Right Column: Boutique Selector & Details */}
          <div className="lg:col-span-7 bg-white border border-stone-300 p-6 sm:p-8">
            {/* City Tabs */}
            <div className="flex border-b border-stone-200 pb-3 gap-4 sm:gap-6 overflow-x-auto text-xs uppercase tracking-wider font-medium text-stone-500">
              {boutiques.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setSelectedBoutique(b.id)}
                  className={`pb-1 cursor-pointer transition-colors whitespace-nowrap ${
                    selectedBoutique === b.id
                      ? 'text-stone-900 font-semibold border-b-2 border-stone-900'
                      : 'hover:text-stone-900'
                  }`}
                >
                  {b.city}
                </button>
              ))}
            </div>

            {/* Active Boutique Details */}
            <div className="pt-6 space-y-4">
              <h3 className="text-2xl font-light text-stone-900 font-editorial">
                {activeBoutique.city}
              </h3>

              <div className="space-y-3 text-xs sm:text-sm text-stone-600 font-light">
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-stone-800 shrink-0 mt-0.5" />
                  <span>{activeBoutique.address}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Clock size={16} className="text-stone-800 shrink-0 mt-0.5" />
                  <span>{activeBoutique.hours}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar size={16} className="text-stone-800 shrink-0 mt-0.5" />
                  <span>Private Styling Concierge: {activeBoutique.concierge} ({activeBoutique.phone})</span>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-200 flex flex-wrap gap-4 text-xs text-stone-500">
                <span>· Complimentary Espresso & Still Water</span>
                <span>· Same-Day Hemming Available</span>
                <span>· Private Dressing Parlour</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF9F6] border border-stone-300 w-full max-w-md p-6 relative shadow-2xl">
            <h3 className="text-xl font-editorial font-light text-stone-900 mb-1">
              Private Fitting Consultation
            </h3>
            <p className="text-xs text-stone-500 mb-4">
              {activeBoutique.city} · Complimentary 45-minute wardrobe session
            </p>

            {bookingConfirmed ? (
              <div className="py-8 text-center space-y-3 animate-in fade-in">
                <div className="w-10 h-10 bg-stone-900 text-white rounded-full flex items-center justify-center mx-auto">
                  <Check size={20} />
                </div>
                <p className="text-sm font-semibold text-stone-900">Appointment Requested</p>
                <p className="text-xs text-stone-600">Our boutique concierge will contact you within 2 hours to confirm your private room.</p>
              </div>
            ) : (
              <form onSubmit={handleBookFitting} className="space-y-4 text-xs">
                <div>
                  <label className="block text-stone-700 font-medium mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={bookingName}
                    onChange={(e) => setBookingName(e.target.value)}
                    placeholder="e.g. Adrienne Vance"
                    className="w-full bg-white border border-stone-300 p-2 text-stone-900 focus:outline-stone-900"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-medium mb-1">Preferred Date & Time</label>
                  <input
                    type="text"
                    required
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    placeholder="e.g. Thursday, 3:00 PM"
                    className="w-full bg-white border border-stone-300 p-2 text-stone-900 focus:outline-stone-900"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-medium mb-1">Pieces you'd like to try (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. The Calder Wool Trench & Marais Blazer"
                    className="w-full bg-white border border-stone-300 p-2 text-stone-900 focus:outline-stone-900"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowBookingModal(false)}
                    className="px-4 py-2 border border-stone-300 text-stone-700 hover:bg-stone-100 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-stone-900 hover:bg-stone-800 text-white px-5 py-2 uppercase tracking-wider text-[11px] font-medium cursor-pointer"
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
