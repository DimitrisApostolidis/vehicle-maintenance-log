import { AlertTriangle } from 'lucide-react';

function ConfirmModal({ isOpen, title, message, onConfirm, onCancel }) {
  // Αν το isOpen είναι false, δεν κάνουμε render τίποτα (επιστρέφουμε null)
  if (!isOpen) return null;

  return (
    // Το overlay (το σκούρο φόντο που καλύπτει όλη την οθόνη)
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity">
      
      {/* Το λευκό κουτί του Modal */}
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-red-100 p-3 rounded-full text-red-600">
              <AlertTriangle size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          </div>
          <p className="text-gray-600 mb-6 ml-16">
            {message}
          </p>
          <div className="flex justify-end gap-3">
            <button 
              onClick={onCancel}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
            >
              Ακύρωση
            </button>
            <button 
              onClick={onConfirm}
              className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors"
            >
              Ναι, Διαγραφή
            </button>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default ConfirmModal;