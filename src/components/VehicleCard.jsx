import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Calendar, Gauge, Wrench, X, Check } from 'lucide-react';

function VehicleCard({ vehicle, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(vehicle);

  const handleSave = () => {
    onUpdate(vehicle.id, editData);
    setIsEditing(false);
  };

  // --- Λειτουργία Επεξεργασίας (Edit Mode) ---
  if (isEditing) {
    return (
      <div className="bg-blue-50 p-4 sm:p-6 rounded-xl shadow-sm border border-blue-200 transition-all">
        {/* Στο κινητό 1 στήλη (grid-cols-1), σε μεγαλύτερες οθόνες 2 στήλες (sm:grid-cols-2) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <div>
            <label className="text-xs text-gray-600 font-medium">Μάρκα</label>
            <input type="text" value={editData.make} onChange={e => setEditData({...editData, make: e.target.value})} className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <div>
            <label className="text-xs text-gray-600 font-medium">Μοντέλο</label>
            <input type="text" value={editData.model} onChange={e => setEditData({...editData, model: e.target.value})} className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <div>
            <label className="text-xs text-gray-600 font-medium">Οδόμετρο (χλμ)</label>
            <input type="number" value={editData.mileage} onChange={e => setEditData({...editData, mileage: Number(e.target.value)})} className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <div>
            <label className="text-xs text-gray-600 font-medium">Τελευταίο Service</label>
            <input type="date" value={editData.lastServiceDate} onChange={e => setEditData({...editData, lastServiceDate: e.target.value})} className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
        </div>
        {/* Στο κινητό τα κουμπιά απλώνονται σε όλο το πλάτος (flex-col) */}
        <div className="flex flex-col sm:flex-row gap-2">
          <button onClick={handleSave} className="flex justify-center items-center gap-1 w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
            <Check size={16} /> Αποθήκευση
          </button>
          <button onClick={() => setIsEditing(false)} className="flex justify-center items-center gap-1 w-full sm:w-auto bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
            <X size={16} /> Ακύρωση
          </button>
        </div>
      </div>
    );
  }

  // --- Λειτουργία Προβολής (View Mode) ---
  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-5">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-800">
            {vehicle.make} {vehicle.model}
          </h2>
          <span className="bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold px-2.5 py-1 rounded-full inline-block mt-2">
            {vehicle.type}
          </span>
        </div>
        
        <div className="flex gap-1 sm:gap-2">
          <button onClick={() => setIsEditing(true)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
            <Edit size={18} />
          </button>
          <button onClick={() => onDelete(vehicle.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-600 text-sm bg-gray-50 p-3 sm:p-4 rounded-lg mb-4">
        <div className="flex items-center gap-2">
          <Gauge size={16} className="text-gray-400 shrink-0" />
          <span><strong className="text-gray-700">{vehicle.mileage.toLocaleString()}</strong> χλμ</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-gray-400 shrink-0" />
          <span><strong className="text-gray-700">{new Date(vehicle.lastServiceDate).toLocaleDateString('el-GR')}</strong></span>
        </div>
      </div>

      <Link to={`/vehicle/${vehicle.id}`} className="flex items-center justify-center gap-2 w-full bg-white border-2 border-blue-100 hover:bg-blue-50 hover:border-blue-200 text-blue-600 font-semibold py-2.5 px-4 rounded-lg transition-all text-sm sm:text-base">
        <Wrench size={18} />
        Ιστορικό & Εργασίες
      </Link>
    </div>
  );
}

export default VehicleCard;