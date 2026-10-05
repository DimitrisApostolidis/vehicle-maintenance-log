import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { Wrench } from 'lucide-react';
import VehicleCard from './components/VehicleCard';
import AddVehicleForm from './components/AddVehicleForm';
import ConfirmModal from './components/ConfirmModal';
import History from './pages/History';

const initialVehicles = [
  { id: 1, make: 'Kymco', model: 'Downtown 300i', type: 'Scooter', mileage: 24500, lastServiceDate: '2026-08-12' }
];

function App() {
  const [vehicles, setVehicles] = useState(() => {
    const savedVehicles = localStorage.getItem('myGarageVehicles');
    return savedVehicles ? JSON.parse(savedVehicles) : initialVehicles;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState(null);

  useEffect(() => {
    localStorage.setItem('myGarageVehicles', JSON.stringify(vehicles));
  }, [vehicles]);

  const handleAddVehicle = (newVehicle) => {
    // Αλλάξαμε τη σειρά εδώ ώστε τα νέα οχήματα να μπαίνουν στο τέλος της λίστας
    setVehicles([...vehicles, newVehicle]); 
    toast.success('Το όχημα προστέθηκε με επιτυχία!');
  };

  const handleUpdateVehicle = (id, updatedData) => {
    setVehicles(vehicles.map(v => v.id === id ? { ...v, ...updatedData } : v));
    toast.success('Τα στοιχεία ενημερώθηκαν!');
  };

  const triggerDelete = (id) => {
    setVehicleToDelete(id);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    setVehicles(vehicles.filter(v => v.id !== vehicleToDelete));
    toast.success('Το όχημα διαγράφηκε από το γκαράζ.');
    setIsModalOpen(false);
    setVehicleToDelete(null);
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
    setVehicleToDelete(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-blue-100 selection:text-blue-900">
      <Toaster position="bottom-right" />

      <ConfirmModal 
        isOpen={isModalOpen}
        title="Διαγραφή Οχήματος"
        message="Είστε σίγουροι ότι θέλετε να διαγράψετε αυτό το όχημα; Η ενέργεια αυτή δεν μπορεί να αναιρεθεί."
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />

      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center gap-3">
          <div className="bg-blue-600 text-white p-2 rounded-lg shadow-inner">
            <Wrench size={20} />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">MyGarage</h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={
            <div className="flex flex-col gap-6">
              
              {/* Η λίστα με τα οχήματα (ή το Empty State) εμφανίζεται πλέον πρώτη */}
              <div className="space-y-4">
                {vehicles.length === 0 ? (
                  <div className="text-center py-16 px-4">
                    <div className="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Wrench size={32} className="text-slate-400" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-700 mb-1">Το γκαράζ σας είναι άδειο</h3>
                    <p className="text-slate-500">Προσθέστε το πρώτο σας όχημα για να ξεκινήσετε την καταγραφή συντήρησης.</p>
                  </div>
                ) : (
                  vehicles.map((vehicle) => (
                    <VehicleCard 
                      key={vehicle.id} 
                      vehicle={vehicle} 
                      onUpdate={handleUpdateVehicle} 
                      onDelete={triggerDelete} 
                    />
                  ))
                )}
              </div>

              {/* Η φόρμα προσθήκης μεταφέρθηκε στο τέλος */}
              <AddVehicleForm onAddVehicle={handleAddVehicle} />
              
            </div>
          } />
          <Route path="/vehicle/:id" element={<History vehicles={vehicles} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;