import { useState } from 'react';
import { Plus, X } from 'lucide-react';

function AddVehicleForm({ onAddVehicle }) {
  // Νέο state που ελέγχει αν η φόρμα είναι ανοιχτή ή κλειστή
  const [isOpen, setIsOpen] = useState(false);

  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [type, setType] = useState('Scooter');
  const [mileage, setMileage] = useState('');
  const [lastServiceDate, setLastServiceDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newVehicle = {
      id: Date.now(),
      make, model, type,
      mileage: Number(mileage),
      lastServiceDate
    };
    onAddVehicle(newVehicle);
    
    // Καθαρισμός και κλείσιμο φόρμας
    setMake(''); setModel(''); setType('Scooter'); setMileage(''); setLastServiceDate('');
    setIsOpen(false);
  };

  // Αν είναι κλειστή, δείχνουμε μόνο το κουμπί προσθήκης
  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="w-full mb-6 border-2 border-dashed border-slate-300 hover:border-blue-400 hover:bg-blue-50 text-slate-500 hover:text-blue-600 rounded-xl p-6 flex flex-col items-center justify-center gap-2 transition-all group"
      >
        <div className="bg-white p-2 rounded-full shadow-sm group-hover:scale-110 transition-transform">
          <Plus size={24} />
        </div>
        <span className="font-medium">Προσθήκη Νέου Οχήματος</span>
      </button>
    );
  }

  // Αν είναι ανοιχτή, δείχνουμε τη φόρμα
  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg border border-slate-200 mb-6 animate-in slide-in-from-top-4 fade-in duration-300">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-bold text-slate-800">Στοιχεία Οχήματος</h2>
        <button type="button" onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600 p-1 bg-slate-100 rounded-full">
          <X size={20} />
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Μάρκα</label>
          <input type="text" value={make} onChange={(e) => setMake(e.target.value)} className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition-shadow" placeholder="π.χ. Kymco" required />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Μοντέλο</label>
          <input type="text" value={model} onChange={(e) => setModel(e.target.value)} className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition-shadow" placeholder="π.χ. Downtown 300i" required />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Τύπος</label>
          <select value={type} onChange={(e) => setType(e.target.value)} className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition-shadow">
            <option value="Scooter">Scooter</option>
            <option value="Motorcycle">Μοτοσυκλέτα</option>
            <option value="Car">Αυτοκίνητο</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Οδόμετρο (χλμ)</label>
          <input type="number" value={mileage} onChange={(e) => setMileage(e.target.value)} className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition-shadow" placeholder="π.χ. 15000" required />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Ημερομηνία Τελευταίου Service</label>
          <input type="date" value={lastServiceDate} onChange={(e) => setLastServiceDate(e.target.value)} className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition-shadow" required />
        </div>
      </div>
      
      <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors shadow-sm">
        Αποθήκευση στο Γκαράζ
      </button>
    </form>
  );
}

export default AddVehicleForm;