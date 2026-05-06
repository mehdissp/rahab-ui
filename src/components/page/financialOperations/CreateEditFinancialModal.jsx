
// export default CreateEditFinancialModal;

import React, { useState, useEffect, useRef } from 'react';
import { financialOperationsService } from '../../../services/financialOperationsService';
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner';
import { toast } from 'react-toastify';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CreateEditFinancialModal.css';

const CreateEditFinancialModal = ({ 
  isOpen, 
  onClose, 
  onSuccess, 
  operationToEdit, 
  isEditMode,
  projects = [],
  banks = []
}) => {
  // دیتای فرم
  const [formData, setFormData] = useState({
    id: 0,
    paymentOrderNumber: '',
    accountSideName: '',
    descriptionRows: '',
    dateOfIssue: '',
    dateOfIssue_Persian: '',
    paymentStatus: 0,
    amount: '',
    dueDate: '',
    dueDate_Persian: '',
    operationCompleted: 0,
    projectId: '',
    financialId: '',
    bankId: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showDateOfIssuePicker, setShowDateOfIssuePicker] = useState(false);
  const [showDueDatePicker, setShowDueDatePicker] = useState(false);
  
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [dynamicProjects, setDynamicProjects] = useState([]);
  const [dynamicBanks, setDynamicBanks] = useState([]);
  
  const [financialLevels, setFinancialLevels] = useState([]);
  const [loadingLevel, setLoadingLevel] = useState({});
  const [selectedFinancialName, setSelectedFinancialName] = useState('');
  const [transactionType, setTransactionType] = useState(1);
  
  const dateOfIssueRef = useRef(null);
  const dueDateRef = useRef(null);

  const [loadingCompanies, setLoadingCompanies] = useState(false);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [loadingBanks, setLoadingBanks] = useState(false);

  const transactionTypes = [
    { id: 1, name: 'ورودی', icon: '💰' },
    { id: 2, name: 'خروجی', icon: '📈' }
  ];

  // تبدیل تاریخ میلادی به شمسی
  const convertToPersianDate = (gregorianDate) => {
    if (!gregorianDate) return '';
    try {
      const date = new Date(gregorianDate);
      const persianDate = new Intl.DateTimeFormat('fa-IR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }).format(date);
      
      const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
      const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
      
      let result = persianDate;
      for (let i = 0; i < persianNumbers.length; i++) {
        result = result.replace(new RegExp(persianNumbers[i], 'g'), englishNumbers[i]);
      }
      
      return result;
    } catch (error) {
      return '';
    }
  };

  const formatPersianDate = (gregorianDate) => {
    if (!gregorianDate) return '';
    return convertToPersianDate(gregorianDate);
  };

  // دریافت شرکت‌ها
  const fetchCompanies = async () => {
    try {
      setLoadingCompanies(true);
      const response = await financialOperationsService.getComboCompany();
      if (response && response.data) {
        setCompanies(response.data);
      }
    } catch (error) {
      console.error('Error fetching companies:', error);
    } finally {
      setLoadingCompanies(false);
    }
  };

  // دریافت سطوح مالی
  const fetchFinancialLevel = async (parentId, level, type) => {
    try {
      setLoadingLevel(prev => ({ ...prev, [level]: true }));
      
      const typeToSend = type !== undefined ? type : transactionType;
      console.log(`Fetching level ${level} with type: ${typeToSend}`);
      
      const response = await financialOperationsService.getComboParentFinancial(parentId, typeToSend);
      
      if (response && response.data) {
        setFinancialLevels(prev => {
          const newLevels = prev.slice(0, level);
          newLevels.push({
            level: level,
            parentId: parentId,
            items: response.data,
            selectedId: null
          });
          return newLevels;
        });
      }
    } catch (error) {
      console.error('Error fetching financial level:', error);
    } finally {
      setLoadingLevel(prev => ({ ...prev, [level]: false }));
    }
  };

  // دریافت پروژه‌ها بر اساس شرکت
  const fetchProjectsByCompany = async (companyId) => {
    if (!companyId) {
      setDynamicProjects([]);
      return;
    }
    
    try {
      setLoadingProjects(true);
      const response = await financialOperationsService.getComboProject(companyId);
      if (response && response.data) {
        setDynamicProjects(response.data);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      setDynamicProjects([]);
    } finally {
      setLoadingProjects(false);
    }
  };

  // دریافت بانک‌ها بر اساس شرکت
  const fetchBanksByCompany = async (companyId) => {
    if (!companyId) {
      setDynamicBanks([]);
      return;
    }
    
    try {
      setLoadingBanks(true);
      const response = await financialOperationsService.getComboBank(companyId);
      if (response && response.data) {
        setDynamicBanks(response.data);
      }
    } catch (error) {
      console.error('Error fetching banks:', error);
      setDynamicBanks([]);
    } finally {
      setLoadingBanks(false);
    }
  };

  // انتخاب شرکت
  const handleCompanyChange = async (companyId) => {
    setSelectedCompany(companyId);
    setFormData(prev => ({ ...prev, projectId: '', bankId: '' }));
    await fetchProjectsByCompany(companyId);
    await fetchBanksByCompany(companyId);
  };

  // تغییر نوع تراکنش
  const handleTransactionTypeChange = async (type) => {
    console.log(`Transaction type changed to: ${type}`);
    setTransactionType(type);
    setFinancialLevels([]);
    setSelectedFinancialName('');
    setFormData(prev => ({ ...prev, financialId: '' }));
    await fetchFinancialLevel(null, 0, type);
  };

  // انتخاب حساب مالی
  const handleFinancialSelect = async (item, level) => {
    setFinancialLevels(prev => {
      const newLevels = [...prev];
      if (newLevels[level]) {
        newLevels[level].selectedId = item.id;
      }
      return newLevels;
    });

    setFormData(prev => ({
      ...prev,
      financialId: item.id
    }));
    setSelectedFinancialName(item.name);

    if (item.hasChildren) {
      await fetchFinancialLevel(item.id, level + 1, transactionType);
    } else {
      setFinancialLevels(prev => prev.slice(0, level + 1));
    }
  };

  // اعتبارسنجی
  const validateDates = (dateOfIssue, dueDate) => {
    if (!dateOfIssue) return true;
    if (!dueDate) return true;
    
    const issueDate = new Date(dateOfIssue);
    const dueDateObj = new Date(dueDate);
    
    if (dueDateObj < issueDate) {
      return false;
    }
    return true;
  };

  const validateForm = () => {
    const newErrors = {};
 
    if (!formData.paymentOrderNumber) {
                 console.log('aaaaaaaaaaaaaaaaa')
           console.log(selectedCompany)
      newErrors.paymentOrderNumber = 'شماره سفارش الزامی است';
    }
    if (!formData.amount || formData.amount <= 0) {
      newErrors.amount = 'مبلغ باید بزرگتر از صفر باشد';
    }
    if (!formData.dateOfIssue) {
      newErrors.dateOfIssue = 'تاریخ صدور الزامی است';
    }
    if (!selectedCompany) {
      
      newErrors.company = 'انتخاب شرکت الزامی است';
    }
    if (!formData.projectId) {
      newErrors.projectId = 'انتخاب پروژه الزامی است';
    }
    if (!formData.financialId) {
      newErrors.financialId = 'انتخاب حساب مالی الزامی است';
    }
    if (!formData.bankId) {
      newErrors.bankId = 'انتخاب بانک الزامی است';
    }
    
    if (!validateDates(formData.dateOfIssue, formData.dueDate)) {
      newErrors.dueDate = 'تاریخ سررسید نمی‌تواند از تاریخ صدور کوچک‌تر باشد';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ثبت نهایی
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('لطفاً اطلاعات را به درستی وارد کنید');
      return;
    }
    
    try {
      setLoading(true);
      
      const submitData = {
        id: 0,
        paymentOrderNumber: Number(formData.paymentOrderNumber),
        accountSideName: formData.accountSideName || "",
        descriptionRows: formData.descriptionRows || "",
        dateOfIssue: formData.dateOfIssue,
        dateOfIssue_Persian: formData.dateOfIssue_Persian,
        paymentStatus: Number(formData.paymentStatus),
        amount: Number(formData.amount),
        dueDate: formData.dueDate || null,
        dueDate_Persian: formData.dueDate_Persian || "",
        operationCompleted: Number(formData.operationCompleted),
        projectId: Number(formData.projectId),
        financialId: Number(formData.financialId),
        bankId: Number(formData.bankId),
        companyId:Number(selectedCompany)
      };
      
      console.log("📤 Sending data:", submitData);
      
      if (isEditMode && operationToEdit) {
        submitData.id = operationToEdit.id;
        await financialOperationsService.updateFinancialOperation(operationToEdit.id, submitData);
        toast.success('عملیات مالی با موفقیت ویرایش شد');
      } else {
        await financialOperationsService.createFinancialOperation(submitData);
        toast.success('عملیات مالی با موفقیت ایجاد شد');
      }
      
      await onSuccess();
      onClose();
      resetForm();
      
    } catch (err) {
      console.error('Error saving operation:', err);
      toast.error(err.response?.data?.data?.message || err.response?.data?.message || 'خطا در ذخیره عملیات مالی');
    } finally {
      setLoading(false);
    }
  };

  // تغییر فیلدها
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // رادیو باتن paymentStatus
  const handlePaymentStatusChange = (value) => {
    setFormData(prev => ({ ...prev, paymentStatus: value }));
  };

  // رادیو باتن operationCompleted
  const handleOperationCompletedChange = (value) => {
    setFormData(prev => ({ ...prev, operationCompleted: value }));
  };

  // تاریخ صدور
  const handleDateOfIssueSelect = (value) => {
    try {
      const gregorianDate = value.toISOString().split('T')[0];
      const persianDate = convertToPersianDate(gregorianDate);
      
      setFormData(prev => ({
        ...prev,
        dateOfIssue: gregorianDate,
        dateOfIssue_Persian: persianDate
      }));
      setShowDateOfIssuePicker(false);
      
      if (errors.dateOfIssue) {
        setErrors(prev => ({ ...prev, dateOfIssue: '' }));
      }
      
      if (formData.dueDate && gregorianDate) {
        if (!validateDates(gregorianDate, formData.dueDate)) {
          setErrors(prev => ({ ...prev, dueDate: 'تاریخ سررسید نمی‌تواند از تاریخ صدور کوچک‌تر باشد' }));
        } else {
          setErrors(prev => ({ ...prev, dueDate: '' }));
        }
      }
    } catch (error) {
      console.error('Error selecting date:', error);
    }
  };

  // تاریخ سررسید
  const handleDueDateSelect = (value) => {
    try {
      const gregorianDate = value.toISOString().split('T')[0];
      const persianDate = convertToPersianDate(gregorianDate);
      
      setFormData(prev => ({
        ...prev,
        dueDate: gregorianDate,
        dueDate_Persian: persianDate
      }));
      setShowDueDatePicker(false);
      
      if (errors.dueDate) {
        setErrors(prev => ({ ...prev, dueDate: '' }));
      }
      
      if (formData.dateOfIssue && gregorianDate) {
        if (!validateDates(formData.dateOfIssue, gregorianDate)) {
          setErrors(prev => ({ ...prev, dueDate: 'تاریخ سررسید نمی‌تواند از تاریخ صدور کوچک‌تر باشد' }));
        }
      }
    } catch (error) {
      console.error('Error selecting due date:', error);
    }
  };

  // ریست فرم
  const resetForm = () => {
    setFormData({
      id: 0,
      paymentOrderNumber: '',
      accountSideName: '',
      descriptionRows: '',
      dateOfIssue: '',
      dateOfIssue_Persian: '',
      paymentStatus: 0,
      amount: '',
      dueDate: '',
      dueDate_Persian: '',
      operationCompleted: 0,
      projectId: '',
      financialId: '',
      bankId: ''
    });
    setSelectedCompany('');
    setDynamicProjects([]);
    setDynamicBanks([]);
    setFinancialLevels([]);
    setSelectedFinancialName('');
    setTransactionType(1);
    setErrors({});
  };

  const handleClose = () => {
    if (!loading) {
      onClose();
      resetForm();
    }
  };

  // اثرات اولیه
  useEffect(() => {
    if (isOpen) {
      fetchCompanies();
      fetchFinancialLevel(null, 0, 1);
      
      if (isEditMode && operationToEdit) {
        setFormData({
          id: operationToEdit.id || 0,
          paymentOrderNumber: operationToEdit.paymentOrderNumber || '',
          accountSideName: operationToEdit.accountSideName || '',
          descriptionRows: operationToEdit.descriptionRows || '',
          dateOfIssue: operationToEdit.dateOfIssue ? operationToEdit.dateOfIssue.split('T')[0] : '',
          dateOfIssue_Persian: operationToEdit.dateOfIssue_Persian || '',
          paymentStatus: operationToEdit.paymentStatus || 0,
          amount: operationToEdit.amount || '',
          dueDate: operationToEdit.dueDate ? operationToEdit.dueDate.split('T')[0] : '',
          dueDate_Persian: operationToEdit.dueDate_Persian || '',
          operationCompleted: operationToEdit.operationCompleted || 0,
          projectId: operationToEdit.projectId || '',
          financialId: operationToEdit.financialId || '',
          bankId: operationToEdit.bankId || ''
        });
        setSelectedFinancialName(operationToEdit.financialName || '');
        setSelectedCompany(operationToEdit.companyId || '');
        if (operationToEdit.companyId) {
          fetchProjectsByCompany(operationToEdit.companyId);
          fetchBanksByCompany(operationToEdit.companyId);
        }
      }
      
      setErrors({});
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dateOfIssueRef.current && !dateOfIssueRef.current.contains(event.target)) {
        setShowDateOfIssuePicker(false);
      }
      if (dueDateRef.current && !dueDateRef.current.contains(event.target)) {
        setShowDueDatePicker(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const renderSelectedPath = () => {
    if (!selectedFinancialName) return null;
    
    return (
      <div className="selected-path">
        <span className="path-label">حساب مالی انتخاب شده: </span>
        <span className="path-item">{selectedFinancialName}</span>
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="financial-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{isEditMode ? '✏️ ویرایش عملیات مالی' : '➕ ایجاد عملیات مالی جدید'}</h2>
          <button className="modal-close" onClick={handleClose} disabled={loading}>
            ×
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="financial-form">
          <div className="modal-body">
            {/* مرحله 1: شرکت */}
            <div className="form-section">
              <div className="section-title">
                <span className="section-number">1</span>
                <span>اطلاعات شرکت</span>
              </div>
              <div className="form-group">
                <label>شرکت <span className="required">*</span></label>
                <select
                  value={selectedCompany}
                  onChange={(e) => handleCompanyChange(e.target.value)}
                  disabled={loading || loadingCompanies}
                  className={errors.company ? 'error' : ''}
                >
                  <option value="">انتخاب شرکت</option>
                  {companies.map(company => (
                    <option key={company.id} value={company.id}>{company.name}</option>
                  ))}
                </select>
                {errors.company && <span className="error-message">{errors.company}</span>}
              </div>
            </div>

            {/* مرحله 2: پروژه و بانک */}
            <div className="form-section">
              <div className="section-title">
                <span className="section-number">2</span>
                <span>پروژه و بانک</span>
              </div>
              <div className="form-row two-columns">
                <div className="form-group">
                  <label>پروژه <span className="required">*</span></label>
                  <select
                    name="projectId"
                    value={formData.projectId}
                    onChange={handleChange}
                    className={errors.projectId ? 'error' : ''}
                    disabled={loading || !selectedCompany || loadingProjects}
                  >
                    <option value="">انتخاب پروژه</option>
                    {dynamicProjects.map(project => (
                      <option key={project.id} value={project.id}>{project.name}</option>
                    ))}
                  </select>
                  {errors.projectId && <span className="error-message">{errors.projectId}</span>}
                </div>

                <div className="form-group">
                  <label>بانک <span className="required">*</span></label>
                  <select
                    name="bankId"
                    value={formData.bankId}
                    onChange={handleChange}
                    className={errors.bankId ? 'error' : ''}
                    disabled={loading || !selectedCompany || loadingBanks}
                  >
                    <option value="">انتخاب بانک</option>
                    {dynamicBanks.map(bank => (
                      <option key={bank.id} value={bank.id}>{bank.name}</option>
                    ))}
                  </select>
                  {errors.bankId && <span className="error-message">{errors.bankId}</span>}
                </div>
              </div>
            </div>

            {/* مرحله 3: نوع تراکنش */}
            <div className="form-section">
              <div className="section-title">
                <span className="section-number">3</span>
                <span>نوع تراکنش</span>
              </div>
              <div className="form-group">
                <label>نوع تراکنش <span className="required">*</span></label>
                <div className="transaction-type-buttons">
                  <button
                    type="button"
                    className={`transaction-btn ${transactionType === 1 ? 'active' : ''}`}
                    onClick={() => handleTransactionTypeChange(1)}
                    disabled={loading}
                  >
                    <span>💰</span>
                    ورودی
                  </button>
                  <button
                    type="button"
                    className={`transaction-btn ${transactionType === 2 ? 'active' : ''}`}
                    onClick={() => handleTransactionTypeChange(2)}
                    disabled={loading}
                  >
                    <span>📈</span>
                    خروجی
                  </button>
                </div>
              </div>
            </div>

            {/* مرحله 4: انتخاب حساب مالی */}
            <div className="form-section">
              <div className="section-title">
                <span className="section-number">4</span>
                <span>انتخاب حساب مالی</span>
              </div>
              
              {renderSelectedPath()}
              
              <div className="financial-levels">
                {financialLevels.map((level, idx) => (
                  <div key={idx} className="financial-level">
                    <label>سطح {idx + 1}</label>
                    <div className="level-items">
                      {loadingLevel[idx] ? (
                        <LoadingSpinner size="small" />
                      ) : (
                        level.items && level.items.map(item => (
                          <button
                            key={item.id}
                            type="button"
                            className={`level-item ${level.selectedId === item.id ? 'selected' : ''}`}
                            onClick={() => handleFinancialSelect(item, idx)}
                          >
                            <span>{item.name}</span>
                            {item.hasChildren && <span className="has-children-icon">📁</span>}
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              {errors.financialId && <span className="error-message">{errors.financialId}</span>}
            </div>

            {/* مرحله 5: اطلاعات پایه */}
            <div className="form-section">
              <div className="section-title">
                <span className="section-number">5</span>
                <span>اطلاعات پایه</span>
              </div>
              <div className="form-row two-columns">
                <div className="form-group">
                  <label>شماره سفارش <span className="required">*</span></label>
                  <input
                    type="text"
                    name="paymentOrderNumber"
                    value={formData.paymentOrderNumber}
                    onChange={handleChange}
                    placeholder="مثال: ۱۴۰۳۰۰۱"
                    className={errors.paymentOrderNumber ? 'error' : ''}
                    disabled={loading}
                  />
                  {errors.paymentOrderNumber && <span className="error-message">{errors.paymentOrderNumber}</span>}
                </div>

                <div className="form-group">
                  <label>طرف حساب</label>
                  <input
                    type="text"
                    name="accountSideName"
                    value={formData.accountSideName}
                    onChange={handleChange}
                    placeholder="نام طرف حساب را وارد کنید"
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label>مبلغ (ریال) <span className="required">*</span></label>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="مبلغ را وارد کنید"
                    className={errors.amount ? 'error' : ''}
                    disabled={loading}
                  />
                  {errors.amount && <span className="error-message">{errors.amount}</span>}
                </div>
              </div>
            </div>

            {/* مرحله 6: تاریخ‌ها */}
            <div className="form-section">
              <div className="section-title">
                <span className="section-number">6</span>
                <span>تاریخ‌ها</span>
              </div>
              <div className="form-row two-columns">
                <div className="form-group date-picker-group" ref={dateOfIssueRef}>
                  <label>تاریخ صدور <span className="required">*</span></label>
                  <div className="date-input-wrapper">
                    <input
                      type="text"
                      value={formatPersianDate(formData.dateOfIssue)}
                      onClick={() => setShowDateOfIssuePicker(!showDateOfIssuePicker)}
                      placeholder="انتخاب تاریخ صدور"
                      readOnly
                      className={errors.dateOfIssue ? 'error' : ''}
                      disabled={loading}
                    />
                    <span className="calendar-icon">📅</span>
                  </div>
                  {showDateOfIssuePicker && (
                    <div className="calendar-popup">
                      <Calendar
                        onChange={handleDateOfIssueSelect}
                        value={formData.dateOfIssue ? new Date(formData.dateOfIssue) : new Date()}
                        locale="fa"
                      />
                    </div>
                  )}
                  {errors.dateOfIssue && <span className="error-message">{errors.dateOfIssue}</span>}
                </div>

                <div className="form-group date-picker-group" ref={dueDateRef}>
                  <label>تاریخ سررسید</label>
                  <div className="date-input-wrapper">
                    <input
                      type="text"
                      value={formatPersianDate(formData.dueDate)}
                      onClick={() => setShowDueDatePicker(!showDueDatePicker)}
                      placeholder="انتخاب تاریخ سررسید"
                      readOnly
                      className={errors.dueDate ? 'error' : ''}
                      disabled={loading}
                    />
                    <span className="calendar-icon">📅</span>
                  </div>
                  {showDueDatePicker && (
                    <div className="calendar-popup">
                      <Calendar
                        onChange={handleDueDateSelect}
                        value={formData.dueDate ? new Date(formData.dueDate) : new Date()}
                        locale="fa"
                      />
                    </div>
                  )}
                  {errors.dueDate && <span className="error-message">{errors.dueDate}</span>}
                </div>
              </div>
            </div>

            {/* مرحله 7: وضعیت‌ها */}
            <div className="form-section">
              <div className="section-title">
                <span className="section-number">7</span>
                <span>وضعیت‌ها</span>
              </div>
              <div className="form-row two-columns">
                <div className="form-group">
                  <label>وضعیت پرداخت</label>
                  <div className="status-options">
               
                    <label className={`status-option ${formData.paymentStatus === 1 ? 'active' : ''}`}>
                      <input type="radio" name="paymentStatus" value="1" checked={formData.paymentStatus === 1} onChange={() => handlePaymentStatusChange(1)} disabled={loading} />
                      <span>✅ نقد</span>
                    </label>
                    <label className={`status-option ${formData.paymentStatus === 2 ? 'active' : ''}`}>
                      <input type="radio" name="paymentStatus" value="2" checked={formData.paymentStatus === 2} onChange={() => handlePaymentStatusChange(2)} disabled={loading} />
                      <span>📝 چک</span>
                    </label>
                    <label className={`status-option ${formData.paymentStatus === 3 ? 'active' : ''}`}>
                      <input type="radio" name="paymentStatus" value="3" checked={formData.paymentStatus === 3} onChange={() => handlePaymentStatusChange(3)} disabled={loading} />
                      <span>💳 واخواست</span>
                    </label>
                         <label className={`status-option ${formData.paymentStatus === 0 ? 'active' : ''}`}>
                      <input type="radio" name="paymentStatus" value="4" checked={formData.paymentStatus === 0} onChange={() => handlePaymentStatusChange(0)} disabled={loading} />
                      <span>💰 عودت </span>
                    </label>
                  </div>
                </div>

          <div className="form-group">
  <label>وضعیت عملیات</label>
  <div className="status-options">
    <label className={`status-option status-success ${formData.operationCompleted === 0 ? 'active' : ''}`}>
      <input 
        type="radio" 
        name="operationCompleted" 
        value="0" 
        checked={formData.operationCompleted === 0} 
        onChange={() => handleOperationCompletedChange(0)} 
        disabled={loading} 
      />
      <span>✅</span>
      <span>بله</span>
    </label>
    <label className={`status-option status-danger ${formData.operationCompleted === 1 ? 'active' : ''}`}>
      <input 
        type="radio" 
        name="operationCompleted" 
        value="1" 
        checked={formData.operationCompleted === 1} 
        onChange={() => handleOperationCompletedChange(1)} 
        disabled={loading} 
      />
      <span>❌</span>
      <span>خیر</span>
    </label>
    <label className={`status-option status-warning ${formData.operationCompleted === 2 ? 'active' : ''}`}>
      <input 
        type="radio" 
        name="operationCompleted" 
        value="2" 
        checked={formData.operationCompleted === 2} 
        onChange={() => handleOperationCompletedChange(2)} 
        disabled={loading} 
      />
      <span>⏰</span>
      <span>پرداخت نشده</span>
    </label>
  </div>
</div>
              </div>
            </div>

            {/* مرحله 8: توضیحات */}
            <div className="form-section">
              <div className="section-title">
                <span className="section-number">8</span>
                <span>توضیحات</span>
              </div>
              <div className="form-group">
                <textarea
                  name="descriptionRows"
                  value={formData.descriptionRows}
                  onChange={handleChange}
                  placeholder="توضیحات اضافی..."
                  rows="3"
                  disabled={loading}
                />
              </div>
            </div>

            {errors.submit && (
              <div className="submit-error">{errors.submit}</div>
            )}
          </div>
          
          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={handleClose} disabled={loading}>
              انصراف
            </button>
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? <LoadingSpinner size="small" /> : (isEditMode ? 'ویرایش' : 'ایجاد')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEditFinancialModal;