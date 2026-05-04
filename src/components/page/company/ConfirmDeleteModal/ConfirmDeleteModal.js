import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import './ConfirmDeleteModal.css';

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, companyName, loading }) => {
  if (!isOpen) return null;

  return (
    <div className="delete-modal-overlay" onClick={onClose}>
      <div className="delete-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="delete-modal-icon">
          <FaExclamationTriangle />
        </div>
        
        <h3>حذف شرکت</h3>
        
        <p>
          آیا از حذف شرکت <strong>"{companyName}"</strong> اطمینان دارید؟
        </p>
        
        <p className="delete-warning">
          این عمل غیرقابل بازگشت است و تمام اطلاعات مرتبط با این شرکت حذف خواهد شد.
        </p>
        
        <div className="delete-modal-actions">
          <button 
            className="btn-delete-cancel" 
            onClick={onClose}
            disabled={loading}
          >
            انصراف
          </button>
          <button 
            className="btn-delete-confirm" 
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? 'در حال حذف...' : 'حذف شرکت'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;