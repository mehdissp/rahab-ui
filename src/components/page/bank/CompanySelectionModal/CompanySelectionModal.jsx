// components/bank/Bank/CompanySelectionModal/CompanySelectionModal.jsx
import React from 'react';
import { FaTimes, FaCheck, FaBuilding, FaSyncAlt, FaExclamationTriangle } from 'react-icons/fa';
import './CompanySelectionModal.css';

const CompanySelectionModal = ({
  isOpen,
  onClose,
  projectName,
  project,
  companies,
  onCompanyToggle,
  onSelectAll,
  onDeselectAll,
  onSave,
  onSyncWithCompany,
  loading,
  error,
  isMockData = false
}) => {
  if (!isOpen) return null;

  // محاسبه تعداد شرکت‌های انتخاب شده بر اساس isCheck
  const selectedCount = companies.filter(company => company.isCheck).length;

  return (
    <div className="company-modal-overlay" onClick={onClose}>
      <div className="company-selection-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="company-modal-header">
          <h2>
            <FaBuilding className="header-icon" />
            مدیریت شرکت‌های بانک
          </h2>
          <button className="close-btn" onClick={onClose} disabled={loading}>
            <FaTimes />
          </button>
        </div>

        {/* Project Info */}
        <div className="company-project-info-section">
          <h3>بانک: {projectName}</h3>
          <p>شرکت‌های مجاز برای این بانک را انتخاب کنید</p>
        </div>

        {/* Mock Data Warning */}
        {isMockData && (
          <div className="mock-data-warning">
            <FaExclamationTriangle className="warning-icon" />
            <span>در حال نمایش داده‌های نمونه - ارتباط با سرور برقرار نیست</span>
          </div>
        )}

        {/* Sync Button */}
        <div className="company-sync-section">
          <button 
            className="btn-sync"
            onClick={onSyncWithCompany}
            disabled={loading}
          >
            <FaSyncAlt className={loading ? 'spinning' : ''} />
            تطبیق با شرکت اصلی
          </button>
          <span className="sync-hint">
            با کلیک روی این دکمه، شرکت‌ها با شرکت اصلی بانک هماهنگ می‌شوند
          </span>
        </div>

        {/* Actions */}
        <div className="company-selection-actions">
          <div className="selected-count">
            <FaCheck />
            {selectedCount} شرکت انتخاب شده
          </div>
          <div className="selection-buttons">
            <button 
              className="btn-outline-small"
              onClick={onSelectAll}
              disabled={loading}
            >
              انتخاب همه
            </button>
            <button 
              className="btn-outline-small"
              onClick={onDeselectAll}
              disabled={loading}
            >
              لغو همه
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="company-error-banner">
            <span className="error-icon">⚠️</span>
            {error}
          </div>
        )}

        {/* Companies Grid */}
        <div className="companies-grid-container">
          <div className="companies-grid">
            {companies.length === 0 ? (
              <div className="no-companies">
                <FaBuilding className="no-companies-icon" />
                <p>هیچ شرکتی یافت نشد</p>
              </div>
            ) : (
              companies.map(company => (
                <div 
                  key={company.id} 
                  className={`company-card ${company.isCheck ? 'selected' : ''}`}
                  onClick={() => onCompanyToggle(company.id, !company.isCheck)}
                >
                  <div className="company-checkbox">
                    <input
                      type="checkbox"
                      checked={company.isCheck || false}
                      onChange={() => onCompanyToggle(company.id, !company.isCheck)}
                      id={`company-${company.id}`}
                    />
                    <label htmlFor={`company-${company.id}`}>
                      {company.isCheck && <FaCheck />}
                    </label>
                  </div>
                  
                  <div className="company-info">
                    <div className="company-name">
                      <FaBuilding className="company-icon" />
                      <span>{company.name}</span>
                    </div>
                    {company.code && (
                      <div className="company-code">
                        کد: {company.code}
                      </div>
                    )}
                    {company.phone && (
                      <div className="company-phone">
                        تلفن: {company.phone}
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="company-modal-footer">
          <button 
            className="btn-cancel"
            onClick={onClose}
            disabled={loading}
          >
            انصراف
          </button>
          <button 
            className="btn-save"
            onClick={onSave}
            disabled={loading || companies.length === 0}
          >
            {loading ? 'در حال ذخیره...' : 'ذخیره تغییرات'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanySelectionModal;