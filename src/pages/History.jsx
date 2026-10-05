import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast'; 

function History({ vehicles }) {
  const { id } = useParams();
  const vehicleId = Number(id);
  
  // Βρίσκουμε το όχημα
  const vehicle = vehicles.find(v => v.id === vehicleId);

  // 1. State για το Ιστορικό Εργασιών (Logs)
  const [logs, setLogs] = useState(() => {
    const savedLogs = localStorage.getItem('myGarageLogs');
    return savedLogs ? JSON.parse(savedLogs) : [];
  });

  // Αποθήκευση στο localStorage κάθε φορά που αλλάζουν τα logs
  useEffect(() => {
    localStorage.setItem('myGarageLogs', JSON.stringify(logs));
  }, [logs]);

  // Φιλτράρουμε τις εργασίες μόνο για το συγκεκριμένο όχημα και τις ταξινομούμε βάσει ημερομηνίας
  const vehicleLogs = logs
    .filter(log => log.vehicleId === vehicleId)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  // Business Logic: Υπολογισμός συνολικού κόστους
  const totalCost = vehicleLogs.reduce((sum, log) => sum + log.cost, 0);

  // 2. State για τη Φόρμα Νέας Εργασίας
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [mileage, setMileage] = useState('');
  const [cost, setCost] = useState('');

  const handleAddLog = (e) => {
    e.preventDefault();
    const newLog = {
      id: Date.now(),
      vehicleId,
      date,
      description,
      mileage: Number(mileage),
      cost: Number(cost)
    };
    
    setLogs([newLog, ...logs]);
    
    setDate('');
    setDescription('');
    setMileage('');
    setCost('');

    toast.success('Η εργασία καταγράφηκε στο ιστορικό!'); // ΝΕΑ ΓΡΑΜΜΗ
  };

  const handleDeleteLog = (logId) => {
    if (window.confirm('Διαγραφή αυτής της εγγραφής;')) {
      setLogs(logs.filter(log => log.id !== logId));
      toast.success('Η εργασία διαγράφηκε.'); // ΝΕΑ ΓΡΑΜΜΗ
    }
  };

  if (!vehicle) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-600 mb-4">Το όχημα δεν βρέθηκε.</p>
        <Link to="/" className="text-blue-600 font-medium hover:underline">&larr; Επιστροφή στο Γκαράζ</Link>
      </div>
    );
  }

  return (
    <div className="pb-8">
      {/* Header Σελίδας */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Ιστορικό: {vehicle.make} {vehicle.model}
          </h2>
          <p className="text-gray-600 text-sm mt-1">Συνολικό Κόστος Συντήρησης: <span className="font-bold text-red-600">{totalCost}€</span></p>
        </div>
        <Link to="/" className="text-sm bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-lg transition-colors font-medium shadow-sm">
          &larr; Πίσω
        </Link>
      </div>
      
    {/* Φόρμα Νέας Εργασίας */}
      <form onSubmit={handleAddLog} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Καταγραφή Νέας Εργασίας</h3>
        
        {/* Εδώ προσθέσαμε το items-end στο grid και flex-col/justify-end στα παιδιά */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="md:col-span-2 flex flex-col justify-end">
            <label className="block text-sm font-medium text-gray-700 mb-1">Περιγραφή (π.χ. Εξαέρωση κυκλώματος ψύξης)</label>
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required />
          </div>
          <div className="flex flex-col justify-end">
            <label className="block text-sm font-medium text-gray-700 mb-1">Ημερομηνία</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required />
          </div>
          <div className="flex flex-col justify-end">
            <label className="block text-sm font-medium text-gray-700 mb-1">Οδόμετρο (χλμ)</label>
            <input type="number" value={mileage} onChange={(e) => setMileage(e.target.value)} className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required />
          </div>
          <div className="flex flex-col justify-end">
            <label className="block text-sm font-medium text-gray-700 mb-1">Κόστος (€)</label>
            <input type="number" value={cost} onChange={(e) => setCost(e.target.value)} className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required />
          </div>
        </div>
        
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors">
          Προσθήκη στο Ιστορικό
        </button>
      </form>

     {/* Λίστα Ιστορικού */}
      <h3 className="text-xl font-bold text-gray-800 mb-4">Προηγούμενες Εργασίες</h3>
      {vehicleLogs.length === 0 ? (
        <div className="bg-gray-50 border border-dashed border-gray-300 rounded-xl p-8 text-center text-gray-500">
          Δεν υπάρχουν καταγεγραμμένες εργασίες για αυτό το όχημα.
        </div>
      ) : (
        <div className="space-y-3">
          {vehicleLogs.map(log => (
            // Το flex-col στο κινητό βάζει τα στοιχεία το ένα κάτω από το άλλο
            <div key={log.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="w-full">
                <h4 className="font-bold text-gray-800 text-base sm:text-lg">{log.description}</h4>
                {/* Αναδίπλωση (flex-wrap) για να χωράνε τα spans αν η οθόνη είναι πολύ μικρή */}
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600 mt-2">
                  <span className="flex items-center gap-1">📅 {new Date(log.date).toLocaleDateString('el-GR')}</span>
                  <span className="flex items-center gap-1">🏍️ {log.mileage.toLocaleString()} χλμ</span>
                  <span className="text-red-600 font-medium flex items-center gap-1">💶 {log.cost}€</span>
                </div>
              </div>
              <button 
                onClick={() => handleDeleteLog(log.id)} 
                className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg w-full sm:w-auto text-sm font-medium sm:font-normal transition-colors text-left sm:text-center mt-2 sm:mt-0"
              >
                Διαγραφή
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default History;