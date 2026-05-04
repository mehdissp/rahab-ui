import React, { useState, useEffect } from 'react';
import { companyService } from '../../../services/company';
import { toast } from 'react-toastify';
import './EditCompanyModal.css';

const EditCompanyModal = ({ isOpen, onClose, onCompanyUpdated, company }) => {
  const [formData, setFormData] = useState({
    name: '',
    descriptionRows: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (company) {
      setFormData({
        name: company.name || '',
        descriptionRows: company.descriptionRows || ''
      });
    }
  }, [company]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'نام شرکت الزامی است';
    }
    return newErrors;
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
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      await companyService.updateCompany(company.id, formData);
      
      toast.success('شرکت با موفقیت ویرایش شد', {
        position: "top-left",
        autoClose: 5000,
      });
      
      onCompanyUpdated();
      onClose();
      
    } catch (err) {
      console.error('Error updating company:', err);
      toast.error(err.response?.data?.message || 'خطا در ویرایش شرکت', {
        position: "top-left",
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({ name: '', descriptionRows: '' });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>ویرایش شرکت</h2>
          <button className="modal-close" onClick={handleClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="name">
                نام شرکت <span className="required">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="نام شرکت را وارد کنید"
                className={errors.name ? 'error' : ''}
                disabled={loading}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="descriptionRows">توضیحات</label>
              <textarea
                id="descriptionRows"
                name="descriptionRows"
                value={formData.descriptionRows}
                onChange={handleChange}
                placeholder="توضیحات شرکت را وارد کنید"
                rows="4"
                disabled={loading}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={handleClose} disabled={loading}>
              انصراف
            </button>
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? 'در حال ویرایش...' : 'ویرایش شرکت'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCompanyModal;