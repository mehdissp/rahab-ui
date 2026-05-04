import React, { useState, useEffect } from 'react';
import { bankService } from '../../../services/bank';
import { toast } from 'react-toastify';
import './CreateBankModal.css';

const CreateBankModal = ({ isOpen, onClose, onBankCreated, bankToEdit, isEditMode = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    desc: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditMode && bankToEdit) {
      setFormData({
        name: bankToEdit.name || '',
        address: bankToEdit.address || '',
        phone: bankToEdit.phone || '',
        desc: bankToEdit.desc || ''
      });
    } else {
      setFormData({
        name: '',
        address: '',
        phone: '',
        desc: ''
      });
    }
    setErrors({});
  }, [isEditMode, bankToEdit, isOpen]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'نام بانک الزامی است';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      
      if (isEditMode) {
        await bankService.updateBank({
          id: bankToEdit.id,
          ...formData
        });
        toast.success('بانک با موفقیت ویرایش شد', {
          position: "top-left",
          autoClose: 5000,
        });
      } else {
        await bankService.insertBank(formData);
        toast.success('بانک با موفقیت ایجاد شد', {
          position: "top-left",
          autoClose: 5000,
        });
      }
      
      onBankCreated();
      onClose();
      
    } catch (error) {
      console.error('Error saving bank:', error);
      toast.error(isEditMode ? 'خطا در ویرایش بانک' : 'خطا در ایجاد بانک', {
        position: "top-left",
        autoClose: 5000,
      });
      
      if (error.response?.data?.message) {
        setErrors({ submit: error.response.data.message });
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{isEditMode ? 'ویرایش بانک' : 'ایجاد بانک جدید'}</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="name">نام بانک <span className="required">*</span></label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="نام بانک را وارد کنید"
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="address">آدرس</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="آدرس بانک را وارد کنید"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">تلفن</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="تلفن بانک را وارد کنید"
              />
            </div>

            <div className="form-group">
              <label htmlFor="desc">توضیحات</label>
              <textarea
                id="desc"
                name="desc"
                value={formData.desc}
                onChange={handleChange}
                placeholder="توضیحات اضافی..."
                rows="3"
              />
            </div>

            {errors.submit && (
              <div className="submit-error">{errors.submit}</div>
            )}
          </div>
          
          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={onClose}>
              انصراف
            </button>
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? 'در حال پردازش...' : (isEditMode ? 'ویرایش' : 'ایجاد')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBankModal;