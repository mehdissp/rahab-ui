
// // // // export default CreateEditFinancialModal;

// // // import React, { useState, useEffect, useRef } from 'react';
// // // import { financialOperationsService } from '../../../services/financialOperationsService';
// // // import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner';
// // // import { toast } from 'react-toastify';
// // // import Calendar from 'react-calendar';
// // // import 'react-calendar/dist/Calendar.css';
// // // import './CreateEditFinancialModal.css';

// // // const CreateEditFinancialModal = ({ 
// // //   isOpen, 
// // //   onClose, 
// // //   onSuccess, 
// // //   operationToEdit, 
// // //   isEditMode,
// // //   projects = [],
// // //   banks = []
// // // }) => {
// // //   // دیتای فرم
// // //   const [formData, setFormData] = useState({
// // //     id: 0,
// // //     paymentOrderNumber: '',
// // //     accountSideName: '',
// // //     descriptionRows: '',
// // //     dateOfIssue: '',
// // //     dateOfIssue_Persian: '',
// // //     paymentStatus: 0,
// // //     amount: '',
// // //     dueDate: '',
// // //     dueDate_Persian: '',
// // //     operationCompleted: 0,
// // //     projectId: '',
// // //     financialId: '',
// // //     bankId: ''
// // //   });
  
// // //   const [loading, setLoading] = useState(false);
// // //   const [errors, setErrors] = useState({});
// // //   const [showDateOfIssuePicker, setShowDateOfIssuePicker] = useState(false);
// // //   const [showDueDatePicker, setShowDueDatePicker] = useState(false);
  
// // //   const [companies, setCompanies] = useState([]);
// // //   const [selectedCompany, setSelectedCompany] = useState('');
// // //   const [dynamicProjects, setDynamicProjects] = useState([]);
// // //   const [dynamicBanks, setDynamicBanks] = useState([]);
  
// // //   const [financialLevels, setFinancialLevels] = useState([]);
// // //   const [loadingLevel, setLoadingLevel] = useState({});
// // //   const [selectedFinancialName, setSelectedFinancialName] = useState('');
// // //   const [transactionType, setTransactionType] = useState(1);
  
// // //   const dateOfIssueRef = useRef(null);
// // //   const dueDateRef = useRef(null);

// // //   const [loadingCompanies, setLoadingCompanies] = useState(false);
// // //   const [loadingProjects, setLoadingProjects] = useState(false);
// // //   const [loadingBanks, setLoadingBanks] = useState(false);

// // //   const transactionTypes = [
// // //     { id: 1, name: 'ورودی', icon: '💰' },
// // //     { id: 2, name: 'خروجی', icon: '📈' }
// // //   ];

// // //   // تبدیل تاریخ میلادی به شمسی
// // //   const convertToPersianDate = (gregorianDate) => {
// // //     if (!gregorianDate) return '';
// // //     try {
// // //       const date = new Date(gregorianDate);
// // //       const persianDate = new Intl.DateTimeFormat('fa-IR', {
// // //         year: 'numeric',
// // //         month: '2-digit',
// // //         day: '2-digit'
// // //       }).format(date);
      
// // //       const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
// // //       const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
      
// // //       let result = persianDate;
// // //       for (let i = 0; i < persianNumbers.length; i++) {
// // //         result = result.replace(new RegExp(persianNumbers[i], 'g'), englishNumbers[i]);
// // //       }
      
// // //       return result;
// // //     } catch (error) {
// // //       return '';
// // //     }
// // //   };

// // //   const formatPersianDate = (gregorianDate) => {
// // //     if (!gregorianDate) return '';
// // //     return convertToPersianDate(gregorianDate);
// // //   };

// // //   // دریافت شرکت‌ها
// // //   const fetchCompanies = async () => {
// // //     try {
// // //       setLoadingCompanies(true);
// // //       const response = await financialOperationsService.getComboCompany();
// // //       if (response && response.data) {
// // //         setCompanies(response.data);
// // //       }
// // //     } catch (error) {
// // //       console.error('Error fetching companies:', error);
// // //     } finally {
// // //       setLoadingCompanies(false);
// // //     }
// // //   };

// // //   // دریافت سطوح مالی
// // //   const fetchFinancialLevel = async (parentId, level, type) => {
// // //     try {
// // //       setLoadingLevel(prev => ({ ...prev, [level]: true }));
      
// // //       const typeToSend = type !== undefined ? type : transactionType;
// // //       console.log(`Fetching level ${level} with type: ${typeToSend}`);
      
// // //       const response = await financialOperationsService.getComboParentFinancial(parentId, typeToSend);
      
// // //       if (response && response.data) {
// // //         setFinancialLevels(prev => {
// // //           const newLevels = prev.slice(0, level);
// // //           newLevels.push({
// // //             level: level,
// // //             parentId: parentId,
// // //             items: response.data,
// // //             selectedId: null
// // //           });
// // //           return newLevels;
// // //         });
// // //       }
// // //     } catch (error) {
// // //       console.error('Error fetching financial level:', error);
// // //     } finally {
// // //       setLoadingLevel(prev => ({ ...prev, [level]: false }));
// // //     }
// // //   };

// // //   // دریافت پروژه‌ها بر اساس شرکت
// // //   const fetchProjectsByCompany = async (companyId) => {
// // //     if (!companyId) {
// // //       setDynamicProjects([]);
// // //       return;
// // //     }
    
// // //     try {
// // //       setLoadingProjects(true);
// // //       const response = await financialOperationsService.getComboProject(companyId);
// // //       if (response && response.data) {
// // //         setDynamicProjects(response.data);
// // //       }
// // //     } catch (error) {
// // //       console.error('Error fetching projects:', error);
// // //       setDynamicProjects([]);
// // //     } finally {
// // //       setLoadingProjects(false);
// // //     }
// // //   };

// // //   // دریافت بانک‌ها بر اساس شرکت
// // //   const fetchBanksByCompany = async (companyId) => {
// // //     if (!companyId) {
// // //       setDynamicBanks([]);
// // //       return;
// // //     }
    
// // //     try {
// // //       setLoadingBanks(true);
// // //       const response = await financialOperationsService.getComboBank(companyId);
// // //       if (response && response.data) {
// // //         setDynamicBanks(response.data);
// // //       }
// // //     } catch (error) {
// // //       console.error('Error fetching banks:', error);
// // //       setDynamicBanks([]);
// // //     } finally {
// // //       setLoadingBanks(false);
// // //     }
// // //   };

// // //   // انتخاب شرکت
// // //   const handleCompanyChange = async (companyId) => {
// // //     setSelectedCompany(companyId);
// // //     setFormData(prev => ({ ...prev, projectId: '', bankId: '' }));
// // //     await fetchProjectsByCompany(companyId);
// // //     await fetchBanksByCompany(companyId);
// // //   };

// // //   // تغییر نوع تراکنش
// // //   const handleTransactionTypeChange = async (type) => {
// // //     console.log(`Transaction type changed to: ${type}`);
// // //     setTransactionType(type);
// // //     setFinancialLevels([]);
// // //     setSelectedFinancialName('');
// // //     setFormData(prev => ({ ...prev, financialId: '' }));
// // //     await fetchFinancialLevel(null, 0, type);
// // //   };

// // //   // انتخاب حساب مالی
// // //   const handleFinancialSelect = async (item, level) => {
// // //     setFinancialLevels(prev => {
// // //       const newLevels = [...prev];
// // //       if (newLevels[level]) {
// // //         newLevels[level].selectedId = item.id;
// // //       }
// // //       return newLevels;
// // //     });

// // //     setFormData(prev => ({
// // //       ...prev,
// // //       financialId: item.id
// // //     }));
// // //     setSelectedFinancialName(item.name);

// // //     if (item.hasChildren) {
// // //       await fetchFinancialLevel(item.id, level + 1, transactionType);
// // //     } else {
// // //       setFinancialLevels(prev => prev.slice(0, level + 1));
// // //     }
// // //   };

// // //   // اعتبارسنجی
// // //   const validateDates = (dateOfIssue, dueDate) => {
// // //     if (!dateOfIssue) return true;
// // //     if (!dueDate) return true;
    
// // //     const issueDate = new Date(dateOfIssue);
// // //     const dueDateObj = new Date(dueDate);
    
// // //     if (dueDateObj < issueDate) {
// // //       return false;
// // //     }
// // //     return true;
// // //   };

// // //   const validateForm = () => {
// // //     const newErrors = {};
 
// // //     if (!formData.paymentOrderNumber) {
// // //                  console.log('aaaaaaaaaaaaaaaaa')
// // //            console.log(selectedCompany)
// // //       newErrors.paymentOrderNumber = 'شماره سفارش الزامی است';
// // //     }
// // //     if (!formData.amount || formData.amount <= 0) {
// // //       newErrors.amount = 'مبلغ باید بزرگتر از صفر باشد';
// // //     }
// // //     if (!formData.dateOfIssue) {
// // //       newErrors.dateOfIssue = 'تاریخ صدور الزامی است';
// // //     }
// // //     if (!selectedCompany) {
      
// // //       newErrors.company = 'انتخاب شرکت الزامی است';
// // //     }
// // //     if (!formData.projectId) {
// // //       newErrors.projectId = 'انتخاب پروژه الزامی است';
// // //     }
// // //     if (!formData.financialId) {
// // //       newErrors.financialId = 'انتخاب حساب مالی الزامی است';
// // //     }
// // //     if (!formData.bankId) {
// // //       newErrors.bankId = 'انتخاب بانک الزامی است';
// // //     }
    
// // //     if (!validateDates(formData.dateOfIssue, formData.dueDate)) {
// // //       newErrors.dueDate = 'تاریخ سررسید نمی‌تواند از تاریخ صدور کوچک‌تر باشد';
// // //     }
    
// // //     setErrors(newErrors);
// // //     return Object.keys(newErrors).length === 0;
// // //   };

// // //   // ثبت نهایی
// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
    
// // //     if (!validateForm()) {
// // //       toast.error('لطفاً اطلاعات را به درستی وارد کنید');
// // //       return;
// // //     }
    
// // //     try {
// // //       setLoading(true);
      
// // //       const submitData = {
// // //         id: 0,
// // //         paymentOrderNumber: Number(formData.paymentOrderNumber),
// // //         accountSideName: formData.accountSideName || "",
// // //         descriptionRows: formData.descriptionRows || "",
// // //         dateOfIssue: formData.dateOfIssue,
// // //         dateOfIssue_Persian: formData.dateOfIssue_Persian,
// // //         paymentStatus: Number(formData.paymentStatus),
// // //         amount: Number(formData.amount),
// // //         dueDate: formData.dueDate || null,
// // //         dueDate_Persian: formData.dueDate_Persian || "",
// // //         operationCompleted: Number(formData.operationCompleted),
// // //         projectId: Number(formData.projectId),
// // //         financialId: Number(formData.financialId),
// // //         bankId: Number(formData.bankId),
// // //         companyId:Number(selectedCompany)
// // //       };
      
// // //       console.log("📤 Sending data:", submitData);
      
// // //       if (isEditMode && operationToEdit) {
// // //         submitData.id = operationToEdit.id;
// // //         await financialOperationsService.updateFinancialOperation(operationToEdit.id, submitData);
// // //         toast.success('عملیات مالی با موفقیت ویرایش شد');
// // //       } else {
// // //         await financialOperationsService.createFinancialOperation(submitData);
// // //         toast.success('عملیات مالی با موفقیت ایجاد شد');
// // //       }
      
// // //       await onSuccess();
// // //       onClose();
// // //       resetForm();
      
// // //     } catch (err) {
// // //       console.error('Error saving operation:', err);
// // //       toast.error(err.response?.data?.data?.message || err.response?.data?.message || 'خطا در ذخیره عملیات مالی');
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   // تغییر فیلدها
// // //   const handleChange = (e) => {
// // //     const { name, value } = e.target;
// // //     setFormData(prev => ({ ...prev, [name]: value }));
// // //     if (errors[name]) {
// // //       setErrors(prev => ({ ...prev, [name]: '' }));
// // //     }
// // //   };

// // //   // رادیو باتن paymentStatus
// // //   const handlePaymentStatusChange = (value) => {
// // //     setFormData(prev => ({ ...prev, paymentStatus: value }));
// // //   };

// // //   // رادیو باتن operationCompleted
// // //   const handleOperationCompletedChange = (value) => {
// // //     setFormData(prev => ({ ...prev, operationCompleted: value }));
// // //   };

// // //   // تاریخ صدور
// // //   const handleDateOfIssueSelect = (value) => {
// // //     try {
// // //       const gregorianDate = value.toISOString().split('T')[0];
// // //       const persianDate = convertToPersianDate(gregorianDate);
      
// // //       setFormData(prev => ({
// // //         ...prev,
// // //         dateOfIssue: gregorianDate,
// // //         dateOfIssue_Persian: persianDate
// // //       }));
// // //       setShowDateOfIssuePicker(false);
      
// // //       if (errors.dateOfIssue) {
// // //         setErrors(prev => ({ ...prev, dateOfIssue: '' }));
// // //       }
      
// // //       if (formData.dueDate && gregorianDate) {
// // //         if (!validateDates(gregorianDate, formData.dueDate)) {
// // //           setErrors(prev => ({ ...prev, dueDate: 'تاریخ سررسید نمی‌تواند از تاریخ صدور کوچک‌تر باشد' }));
// // //         } else {
// // //           setErrors(prev => ({ ...prev, dueDate: '' }));
// // //         }
// // //       }
// // //     } catch (error) {
// // //       console.error('Error selecting date:', error);
// // //     }
// // //   };

// // //   // تاریخ سررسید
// // //   const handleDueDateSelect = (value) => {
// // //     try {
// // //       const gregorianDate = value.toISOString().split('T')[0];
// // //       const persianDate = convertToPersianDate(gregorianDate);
      
// // //       setFormData(prev => ({
// // //         ...prev,
// // //         dueDate: gregorianDate,
// // //         dueDate_Persian: persianDate
// // //       }));
// // //       setShowDueDatePicker(false);
      
// // //       if (errors.dueDate) {
// // //         setErrors(prev => ({ ...prev, dueDate: '' }));
// // //       }
      
// // //       if (formData.dateOfIssue && gregorianDate) {
// // //         if (!validateDates(formData.dateOfIssue, gregorianDate)) {
// // //           setErrors(prev => ({ ...prev, dueDate: 'تاریخ سررسید نمی‌تواند از تاریخ صدور کوچک‌تر باشد' }));
// // //         }
// // //       }
// // //     } catch (error) {
// // //       console.error('Error selecting due date:', error);
// // //     }
// // //   };

// // //   // ریست فرم
// // //   const resetForm = () => {
// // //     setFormData({
// // //       id: 0,
// // //       paymentOrderNumber: '',
// // //       accountSideName: '',
// // //       descriptionRows: '',
// // //       dateOfIssue: '',
// // //       dateOfIssue_Persian: '',
// // //       paymentStatus: 0,
// // //       amount: '',
// // //       dueDate: '',
// // //       dueDate_Persian: '',
// // //       operationCompleted: 0,
// // //       projectId: '',
// // //       financialId: '',
// // //       bankId: ''
// // //     });
// // //     setSelectedCompany('');
// // //     setDynamicProjects([]);
// // //     setDynamicBanks([]);
// // //     setFinancialLevels([]);
// // //     setSelectedFinancialName('');
// // //     setTransactionType(1);
// // //     setErrors({});
// // //   };

// // //   const handleClose = () => {
// // //     if (!loading) {
// // //       onClose();
// // //       resetForm();
// // //     }
// // //   };

// // //   // اثرات اولیه
// // //   useEffect(() => {
// // //     if (isOpen) {
// // //       fetchCompanies();
// // //       fetchFinancialLevel(null, 0, 1);
      
// // //       if (isEditMode && operationToEdit) {
// // //         setFormData({
// // //           id: operationToEdit.id || 0,
// // //           paymentOrderNumber: operationToEdit.paymentOrderNumber || '',
// // //           accountSideName: operationToEdit.accountSideName || '',
// // //           descriptionRows: operationToEdit.descriptionRows || '',
// // //           dateOfIssue: operationToEdit.dateOfIssue ? operationToEdit.dateOfIssue.split('T')[0] : '',
// // //           dateOfIssue_Persian: operationToEdit.dateOfIssue_Persian || '',
// // //           paymentStatus: operationToEdit.paymentStatus || 0,
// // //           amount: operationToEdit.amount || '',
// // //           dueDate: operationToEdit.dueDate ? operationToEdit.dueDate.split('T')[0] : '',
// // //           dueDate_Persian: operationToEdit.dueDate_Persian || '',
// // //           operationCompleted: operationToEdit.operationCompleted || 0,
// // //           projectId: operationToEdit.projectId || '',
// // //           financialId: operationToEdit.financialId || '',
// // //           bankId: operationToEdit.bankId || ''
// // //         });
// // //         setSelectedFinancialName(operationToEdit.financialName || '');
// // //         setSelectedCompany(operationToEdit.companyId || '');
// // //         if (operationToEdit.companyId) {
// // //           fetchProjectsByCompany(operationToEdit.companyId);
// // //           fetchBanksByCompany(operationToEdit.companyId);
// // //         }
// // //       }
      
// // //       setErrors({});
// // //     }
// // //   }, [isOpen]);

// // //   useEffect(() => {
// // //     const handleClickOutside = (event) => {
// // //       if (dateOfIssueRef.current && !dateOfIssueRef.current.contains(event.target)) {
// // //         setShowDateOfIssuePicker(false);
// // //       }
// // //       if (dueDateRef.current && !dueDateRef.current.contains(event.target)) {
// // //         setShowDueDatePicker(false);
// // //       }
// // //     };
    
// // //     document.addEventListener('mousedown', handleClickOutside);
// // //     return () => document.removeEventListener('mousedown', handleClickOutside);
// // //   }, []);

// // //   const renderSelectedPath = () => {
// // //     if (!selectedFinancialName) return null;
    
// // //     return (
// // //       <div className="selected-path">
// // //         <span className="path-label">حساب مالی انتخاب شده: </span>
// // //         <span className="path-item">{selectedFinancialName}</span>
// // //       </div>
// // //     );
// // //   };

// // //   if (!isOpen) return null;

// // //   return (
// // //     <div className="modal-overlay" onClick={handleClose}>
// // //       <div className="financial-modal-container" onClick={(e) => e.stopPropagation()}>
// // //         <div className="modal-header">
// // //           <h2>{isEditMode ? '✏️ ویرایش عملیات مالی' : '➕ ایجاد عملیات مالی جدید'}</h2>
// // //           <button className="modal-close" onClick={handleClose} disabled={loading}>
// // //             ×
// // //           </button>
// // //         </div>
        
// // //         <form onSubmit={handleSubmit} className="financial-form">
// // //           <div className="modal-body">
// // //             {/* مرحله 1: شرکت */}
// // //             <div className="form-section">
// // //               <div className="section-title">
// // //                 <span className="section-number">1</span>
// // //                 <span>اطلاعات شرکت</span>
// // //               </div>
// // //               <div className="form-group">
// // //                 <label>شرکت <span className="required">*</span></label>
// // //                 <select
// // //                   value={selectedCompany}
// // //                   onChange={(e) => handleCompanyChange(e.target.value)}
// // //                   disabled={loading || loadingCompanies}
// // //                   className={errors.company ? 'error' : ''}
// // //                 >
// // //                   <option value="">انتخاب شرکت</option>
// // //                   {companies.map(company => (
// // //                     <option key={company.id} value={company.id}>{company.name}</option>
// // //                   ))}
// // //                 </select>
// // //                 {errors.company && <span className="error-message">{errors.company}</span>}
// // //               </div>
// // //             </div>

// // //             {/* مرحله 2: پروژه و بانک */}
// // //             <div className="form-section">
// // //               <div className="section-title">
// // //                 <span className="section-number">2</span>
// // //                 <span>پروژه و بانک</span>
// // //               </div>
// // //               <div className="form-row two-columns">
// // //                 <div className="form-group">
// // //                   <label>پروژه <span className="required">*</span></label>
// // //                   <select
// // //                     name="projectId"
// // //                     value={formData.projectId}
// // //                     onChange={handleChange}
// // //                     className={errors.projectId ? 'error' : ''}
// // //                     disabled={loading || !selectedCompany || loadingProjects}
// // //                   >
// // //                     <option value="">انتخاب پروژه</option>
// // //                     {dynamicProjects.map(project => (
// // //                       <option key={project.id} value={project.id}>{project.name}</option>
// // //                     ))}
// // //                   </select>
// // //                   {errors.projectId && <span className="error-message">{errors.projectId}</span>}
// // //                 </div>

// // //                 <div className="form-group">
// // //                   <label>بانک <span className="required">*</span></label>
// // //                   <select
// // //                     name="bankId"
// // //                     value={formData.bankId}
// // //                     onChange={handleChange}
// // //                     className={errors.bankId ? 'error' : ''}
// // //                     disabled={loading || !selectedCompany || loadingBanks}
// // //                   >
// // //                     <option value="">انتخاب بانک</option>
// // //                     {dynamicBanks.map(bank => (
// // //                       <option key={bank.id} value={bank.id}>{bank.name}</option>
// // //                     ))}
// // //                   </select>
// // //                   {errors.bankId && <span className="error-message">{errors.bankId}</span>}
// // //                 </div>
// // //               </div>
// // //             </div>

// // //             {/* مرحله 3: نوع تراکنش */}
// // //             <div className="form-section">
// // //               <div className="section-title">
// // //                 <span className="section-number">3</span>
// // //                 <span>نوع تراکنش</span>
// // //               </div>
// // //               <div className="form-group">
// // //                 <label>نوع تراکنش <span className="required">*</span></label>
// // //                 <div className="transaction-type-buttons">
// // //                   <button
// // //                     type="button"
// // //                     className={`transaction-btn ${transactionType === 1 ? 'active' : ''}`}
// // //                     onClick={() => handleTransactionTypeChange(1)}
// // //                     disabled={loading}
// // //                   >
// // //                     <span>💰</span>
// // //                     ورودی
// // //                   </button>
// // //                   <button
// // //                     type="button"
// // //                     className={`transaction-btn ${transactionType === 2 ? 'active' : ''}`}
// // //                     onClick={() => handleTransactionTypeChange(2)}
// // //                     disabled={loading}
// // //                   >
// // //                     <span>📈</span>
// // //                     خروجی
// // //                   </button>
// // //                 </div>
// // //               </div>
// // //             </div>

// // //             {/* مرحله 4: انتخاب حساب مالی */}
// // //             <div className="form-section">
// // //               <div className="section-title">
// // //                 <span className="section-number">4</span>
// // //                 <span>انتخاب حساب مالی</span>
// // //               </div>
              
// // //               {renderSelectedPath()}
              
// // //               <div className="financial-levels">
// // //                 {financialLevels.map((level, idx) => (
// // //                   <div key={idx} className="financial-level">
// // //                     <label>سطح {idx + 1}</label>
// // //                     <div className="level-items">
// // //                       {loadingLevel[idx] ? (
// // //                         <LoadingSpinner size="small" />
// // //                       ) : (
// // //                         level.items && level.items.map(item => (
// // //                           <button
// // //                             key={item.id}
// // //                             type="button"
// // //                             className={`level-item ${level.selectedId === item.id ? 'selected' : ''}`}
// // //                             onClick={() => handleFinancialSelect(item, idx)}
// // //                           >
// // //                             <span>{item.name}</span>
// // //                             {item.hasChildren && <span className="has-children-icon">📁</span>}
// // //                           </button>
// // //                         ))
// // //                       )}
// // //                     </div>
// // //                   </div>
// // //                 ))}
// // //               </div>
              
// // //               {errors.financialId && <span className="error-message">{errors.financialId}</span>}
// // //             </div>

// // //             {/* مرحله 5: اطلاعات پایه */}
// // //             <div className="form-section">
// // //               <div className="section-title">
// // //                 <span className="section-number">5</span>
// // //                 <span>اطلاعات پایه</span>
// // //               </div>
// // //               <div className="form-row two-columns">
// // //                 <div className="form-group">
// // //                   <label>شماره سفارش <span className="required">*</span></label>
// // //                   <input
// // //                     type="text"
// // //                     name="paymentOrderNumber"
// // //                     value={formData.paymentOrderNumber}
// // //                     onChange={handleChange}
// // //                     placeholder="مثال: ۱۴۰۳۰۰۱"
// // //                     className={errors.paymentOrderNumber ? 'error' : ''}
// // //                     disabled={loading}
// // //                   />
// // //                   {errors.paymentOrderNumber && <span className="error-message">{errors.paymentOrderNumber}</span>}
// // //                 </div>

// // //                 <div className="form-group">
// // //                   <label>طرف حساب</label>
// // //                   <input
// // //                     type="text"
// // //                     name="accountSideName"
// // //                     value={formData.accountSideName}
// // //                     onChange={handleChange}
// // //                     placeholder="نام طرف حساب را وارد کنید"
// // //                     disabled={loading}
// // //                   />
// // //                 </div>

// // //                 <div className="form-group">
// // //                   <label>مبلغ (ریال) <span className="required">*</span></label>
// // //                   <input
// // //                     type="number"
// // //                     name="amount"
// // //                     value={formData.amount}
// // //                     onChange={handleChange}
// // //                     placeholder="مبلغ را وارد کنید"
// // //                     className={errors.amount ? 'error' : ''}
// // //                     disabled={loading}
// // //                   />
// // //                   {errors.amount && <span className="error-message">{errors.amount}</span>}
// // //                 </div>
// // //               </div>
// // //             </div>

// // //             {/* مرحله 6: تاریخ‌ها */}
// // //             <div className="form-section">
// // //               <div className="section-title">
// // //                 <span className="section-number">6</span>
// // //                 <span>تاریخ‌ها</span>
// // //               </div>
// // //               <div className="form-row two-columns">
// // //                 <div className="form-group date-picker-group" ref={dateOfIssueRef}>
// // //                   <label>تاریخ صدور <span className="required">*</span></label>
// // //                   <div className="date-input-wrapper">
// // //                     <input
// // //                       type="text"
// // //                       value={formatPersianDate(formData.dateOfIssue)}
// // //                       onClick={() => setShowDateOfIssuePicker(!showDateOfIssuePicker)}
// // //                       placeholder="انتخاب تاریخ صدور"
// // //                       readOnly
// // //                       className={errors.dateOfIssue ? 'error' : ''}
// // //                       disabled={loading}
// // //                     />
// // //                     <span className="calendar-icon">📅</span>
// // //                   </div>
// // //                   {showDateOfIssuePicker && (
// // //                     <div className="calendar-popup">
// // //                       <Calendar
// // //                         onChange={handleDateOfIssueSelect}
// // //                         value={formData.dateOfIssue ? new Date(formData.dateOfIssue) : new Date()}
// // //                         locale="fa"
// // //                       />
// // //                     </div>
// // //                   )}
// // //                   {errors.dateOfIssue && <span className="error-message">{errors.dateOfIssue}</span>}
// // //                 </div>

// // //                 <div className="form-group date-picker-group" ref={dueDateRef}>
// // //                   <label>تاریخ سررسید</label>
// // //                   <div className="date-input-wrapper">
// // //                     <input
// // //                       type="text"
// // //                       value={formatPersianDate(formData.dueDate)}
// // //                       onClick={() => setShowDueDatePicker(!showDueDatePicker)}
// // //                       placeholder="انتخاب تاریخ سررسید"
// // //                       readOnly
// // //                       className={errors.dueDate ? 'error' : ''}
// // //                       disabled={loading}
// // //                     />
// // //                     <span className="calendar-icon">📅</span>
// // //                   </div>
// // //                   {showDueDatePicker && (
// // //                     <div className="calendar-popup">
// // //                       <Calendar
// // //                         onChange={handleDueDateSelect}
// // //                         value={formData.dueDate ? new Date(formData.dueDate) : new Date()}
// // //                         locale="fa"
// // //                       />
// // //                     </div>
// // //                   )}
// // //                   {errors.dueDate && <span className="error-message">{errors.dueDate}</span>}
// // //                 </div>
// // //               </div>
// // //             </div>

// // //             {/* مرحله 7: وضعیت‌ها */}
// // //             <div className="form-section">
// // //               <div className="section-title">
// // //                 <span className="section-number">7</span>
// // //                 <span>وضعیت‌ها</span>
// // //               </div>
// // //               <div className="form-row two-columns">
// // //                 <div className="form-group">
// // //                   <label>وضعیت پرداخت</label>
// // //                   <div className="status-options">
               
// // //                     <label className={`status-option ${formData.paymentStatus === 1 ? 'active' : ''}`}>
// // //                       <input type="radio" name="paymentStatus" value="1" checked={formData.paymentStatus === 1} onChange={() => handlePaymentStatusChange(1)} disabled={loading} />
// // //                       <span>✅ نقد</span>
// // //                     </label>
// // //                     <label className={`status-option ${formData.paymentStatus === 2 ? 'active' : ''}`}>
// // //                       <input type="radio" name="paymentStatus" value="2" checked={formData.paymentStatus === 2} onChange={() => handlePaymentStatusChange(2)} disabled={loading} />
// // //                       <span>📝 چک</span>
// // //                     </label>
// // //                     <label className={`status-option ${formData.paymentStatus === 3 ? 'active' : ''}`}>
// // //                       <input type="radio" name="paymentStatus" value="3" checked={formData.paymentStatus === 3} onChange={() => handlePaymentStatusChange(3)} disabled={loading} />
// // //                       <span>💳 واخواست</span>
// // //                     </label>
// // //                          <label className={`status-option ${formData.paymentStatus === 0 ? 'active' : ''}`}>
// // //                       <input type="radio" name="paymentStatus" value="4" checked={formData.paymentStatus === 0} onChange={() => handlePaymentStatusChange(0)} disabled={loading} />
// // //                       <span>💰 عودت </span>
// // //                     </label>
// // //                   </div>
// // //                 </div>

// // //           <div className="form-group">
// // //   <label>وضعیت عملیات</label>
// // //   <div className="status-options">
// // //     <label className={`status-option status-success ${formData.operationCompleted === 0 ? 'active' : ''}`}>
// // //       <input 
// // //         type="radio" 
// // //         name="operationCompleted" 
// // //         value="0" 
// // //         checked={formData.operationCompleted === 0} 
// // //         onChange={() => handleOperationCompletedChange(0)} 
// // //         disabled={loading} 
// // //       />
// // //       <span>✅</span>
// // //       <span>بله</span>
// // //     </label>
// // //     <label className={`status-option status-danger ${formData.operationCompleted === 1 ? 'active' : ''}`}>
// // //       <input 
// // //         type="radio" 
// // //         name="operationCompleted" 
// // //         value="1" 
// // //         checked={formData.operationCompleted === 1} 
// // //         onChange={() => handleOperationCompletedChange(1)} 
// // //         disabled={loading} 
// // //       />
// // //       <span>❌</span>
// // //       <span>خیر</span>
// // //     </label>
// // //     <label className={`status-option status-warning ${formData.operationCompleted === 2 ? 'active' : ''}`}>
// // //       <input 
// // //         type="radio" 
// // //         name="operationCompleted" 
// // //         value="2" 
// // //         checked={formData.operationCompleted === 2} 
// // //         onChange={() => handleOperationCompletedChange(2)} 
// // //         disabled={loading} 
// // //       />
// // //       <span>⏰</span>
// // //       <span>پرداخت نشده</span>
// // //     </label>
// // //   </div>
// // // </div>
// // //               </div>
// // //             </div>

// // //             {/* مرحله 8: توضیحات */}
// // //             <div className="form-section">
// // //               <div className="section-title">
// // //                 <span className="section-number">8</span>
// // //                 <span>توضیحات</span>
// // //               </div>
// // //               <div className="form-group">
// // //                 <textarea
// // //                   name="descriptionRows"
// // //                   value={formData.descriptionRows}
// // //                   onChange={handleChange}
// // //                   placeholder="توضیحات اضافی..."
// // //                   rows="3"
// // //                   disabled={loading}
// // //                 />
// // //               </div>
// // //             </div>

// // //             {errors.submit && (
// // //               <div className="submit-error">{errors.submit}</div>
// // //             )}
// // //           </div>
          
// // //           <div className="modal-footer">
// // //             <button type="button" className="btn-cancel" onClick={handleClose} disabled={loading}>
// // //               انصراف
// // //             </button>
// // //             <button type="submit" className="btn-submit" disabled={loading}>
// // //               {loading ? <LoadingSpinner size="small" /> : (isEditMode ? 'ویرایش' : 'ایجاد')}
// // //             </button>
// // //           </div>
// // //         </form>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default CreateEditFinancialModal;


// // // CreateEditFinancialModal.jsx

// // import React, { useState, useEffect, useRef } from 'react';
// // import { financialOperationsService } from '../../../services/financialOperationsService';
// // import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner';
// // import { toast } from 'react-toastify';
// // import Calendar from 'react-calendar';
// // import 'react-calendar/dist/Calendar.css';
// // import './CreateEditFinancialModal.css';

// // const CreateEditFinancialModal = ({ 
// //   isOpen, 
// //   onClose, 
// //   onSuccess, 
// //   operationToEdit, 
// //   isEditMode,
// //   projects = [],
// //   banks = []
// // }) => {
// //   // دیتای فرم
// //   const [formData, setFormData] = useState({
// //     id: 0,
// //     paymentOrderNumber: '',
// //     accountSideName: '',
// //     descriptionRows: '',
// //     dateOfIssue: '',
// //     dateOfIssue_Persian: '',
// //     paymentStatus: 0,
// //     amount: '',
// //     dueDate: '',
// //     dueDate_Persian: '',
// //     operationCompleted: 0,
// //     projectId: '',
// //     financialId: '',
// //     bankId: ''
// //   });
  
// //   const [loading, setLoading] = useState(false);
// //   const [errors, setErrors] = useState({});
// //   const [showDateOfIssuePicker, setShowDateOfIssuePicker] = useState(false);
// //   const [showDueDatePicker, setShowDueDatePicker] = useState(false);
  
// //   const [companies, setCompanies] = useState([]);
// //   const [selectedCompany, setSelectedCompany] = useState('');
// //   const [dynamicProjects, setDynamicProjects] = useState([]);
// //   const [dynamicBanks, setDynamicBanks] = useState([]);
  
// //   const [financialLevels, setFinancialLevels] = useState([]);
// //   const [loadingLevel, setLoadingLevel] = useState({});
// //   const [selectedFinancialName, setSelectedFinancialName] = useState('');
// //   const [transactionType, setTransactionType] = useState(1);
  
// //   // State های مربوط به طرف حساب (AccountSide)
// //   const [accountSides, setAccountSides] = useState([]); // لیست کامل طرف حساب‌ها
// //   const [filteredAccountSides, setFilteredAccountSides] = useState([]); // لیست فیلتر شده برای جستجو
// //   const [showAccountSideDropdown, setShowAccountSideDropdown] = useState(false); // نمایش/عدم نمایش دراپ‌داون
// //   const [accountSideSearchTerm, setAccountSideSearchTerm] = useState(''); // عبارت جستجو
// //   const [loadingAccountSides, setLoadingAccountSides] = useState(false); // وضعیت لودینگ
  
// //   const dateOfIssueRef = useRef(null);
// //   const dueDateRef = useRef(null);
// //   const accountSideRef = useRef(null); // ref برای مدیریت کلیک خارج از دراپ‌داون طرف حساب

// //   const [loadingCompanies, setLoadingCompanies] = useState(false);
// //   const [loadingProjects, setLoadingProjects] = useState(false);
// //   const [loadingBanks, setLoadingBanks] = useState(false);

// //   const transactionTypes = [
// //     { id: 1, name: 'ورودی', icon: '💰' },
// //     { id: 2, name: 'خروجی', icon: '📈' }
// //   ];

// //   // تبدیل تاریخ میلادی به شمسی
// //   const convertToPersianDate = (gregorianDate) => {
// //     if (!gregorianDate) return '';
// //     try {
// //       const date = new Date(gregorianDate);
// //       const persianDate = new Intl.DateTimeFormat('fa-IR', {
// //         year: 'numeric',
// //         month: '2-digit',
// //         day: '2-digit'
// //       }).format(date);
      
// //       const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
// //       const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
      
// //       let result = persianDate;
// //       for (let i = 0; i < persianNumbers.length; i++) {
// //         result = result.replace(new RegExp(persianNumbers[i], 'g'), englishNumbers[i]);
// //       }
      
// //       return result;
// //     } catch (error) {
// //       return '';
// //     }
// //   };

// //   const formatPersianDate = (gregorianDate) => {
// //     if (!gregorianDate) return '';
// //     return convertToPersianDate(gregorianDate);
// //   };

// //   // دریافت شرکت‌ها
// //   const fetchCompanies = async () => {
// //     try {
// //       setLoadingCompanies(true);
// //       const response = await financialOperationsService.getComboCompany();
// //       if (response && response.data) {
// //         setCompanies(response.data);
// //       }
// //     } catch (error) {
// //       console.error('Error fetching companies:', error);
// //     } finally {
// //       setLoadingCompanies(false);
// //     }
// //   };

// //   // دریافت سطوح مالی
// //   const fetchFinancialLevel = async (parentId, level, type) => {
// //     try {
// //       setLoadingLevel(prev => ({ ...prev, [level]: true }));
      
// //       const typeToSend = type !== undefined ? type : transactionType;
// //       console.log(`Fetching level ${level} with type: ${typeToSend}`);
      
// //       const response = await financialOperationsService.getComboParentFinancial(parentId, typeToSend);
      
// //       if (response && response.data) {
// //         setFinancialLevels(prev => {
// //           const newLevels = prev.slice(0, level);
// //           newLevels.push({
// //             level: level,
// //             parentId: parentId,
// //             items: response.data,
// //             selectedId: null
// //           });
// //           return newLevels;
// //         });
// //       }
// //     } catch (error) {
// //       console.error('Error fetching financial level:', error);
// //     } finally {
// //       setLoadingLevel(prev => ({ ...prev, [level]: false }));
// //     }
// //   };

// //   // دریافت پروژه‌ها بر اساس شرکت
// //   const fetchProjectsByCompany = async (companyId) => {
// //     if (!companyId) {
// //       setDynamicProjects([]);
// //       return;
// //     }
    
// //     try {
// //       setLoadingProjects(true);
// //       const response = await financialOperationsService.getComboProject(companyId);
// //       if (response && response.data) {
// //         setDynamicProjects(response.data);
// //       }
// //     } catch (error) {
// //       console.error('Error fetching projects:', error);
// //       setDynamicProjects([]);
// //     } finally {
// //       setLoadingProjects(false);
// //     }
// //   };

// //   // دریافت بانک‌ها بر اساس شرکت
// //   const fetchBanksByCompany = async (companyId) => {
// //     if (!companyId) {
// //       setDynamicBanks([]);
// //       return;
// //     }
    
// //     try {
// //       setLoadingBanks(true);
// //       const response = await financialOperationsService.getComboBank(companyId);
// //       if (response && response.data) {
// //         setDynamicBanks(response.data);
// //       }
// //     } catch (error) {
// //       console.error('Error fetching banks:', error);
// //       setDynamicBanks([]);
// //     } finally {
// //       setLoadingBanks(false);
// //     }
// //   };

// //   // ==================== توابع مربوط به طرف حساب (AccountSide) ====================
  
// //   // دریافت لیست طرف حساب‌ها از API (یک بار در ابتدای باز شدن مودال)
// //   const fetchAccountSides = async () => {
// //     try {
// //       setLoadingAccountSides(true);
// //       const response = await financialOperationsService.getAccountSideCombo();
// //       if (response && response.data) {
// //         setAccountSides(response.data);
// //         setFilteredAccountSides(response.data); // در ابتدا لیست فیلتر شده برابر با کل لیست است
// //       }
// //     } catch (error) {
// //       console.error('Error fetching account sides:', error);
// //       toast.error('خطا در دریافت لیست طرف حساب‌ها');
// //     } finally {
// //       setLoadingAccountSides(false);
// //     }
// //   };

// //   // جستجو در لیست طرف حساب‌ها (فقط در کلاینت)
// //   const handleAccountSideSearch = (searchValue) => {
// //     setAccountSideSearchTerm(searchValue);
    
// //     if (!searchValue.trim()) {
// //       // اگر عبارت جستجو خالی بود، کل لیست را نشان بده
// //       setFilteredAccountSides(accountSides);
// //       return;
// //     }
    
// //     // فیلتر کردن بر اساس name (و یا می‌توانید کد/شماره را هم اضافه کنید)
// //     const filtered = accountSides.filter(item => 
// //       item.name?.toLowerCase().includes(searchValue.toLowerCase()) ||
// //       item.code?.toString().includes(searchValue)
// //     );
// //     setFilteredAccountSides(filtered);
// //   };

// //   // انتخاب طرف حساب
// //   const handleAccountSideSelect = (accountSide) => {
// //     setFormData(prev => ({ 
// //       ...prev, 
// //       accountSideName: accountSide.name  // ذخیره نام طرف حساب در فیلد accountSideName
// //     }));
// //     setAccountSideSearchTerm(accountSide.name); // قرار دادن نام در فیلد جستجو
// //     setShowAccountSideDropdown(false); // بستن دراپ‌داون
// //     // پاک کردن خطای مربوطه اگر وجود داشت
// //     if (errors.accountSideName) {
// //       setErrors(prev => ({ ...prev, accountSideName: '' }));
// //     }
// //   };

// //   // باز کردن دراپ‌داون با کلیک روی فیلد
// //   const handleAccountSideInputClick = () => {
// //     setShowAccountSideDropdown(true);
// //     // اگر لیست فیلتر شده خالی است (مثلاً قبلاً جستجو کرده بودیم)، دوباره کل لیست را نشان بده
// //     if (filteredAccountSides.length === 0 && accountSides.length > 0) {
// //       setFilteredAccountSides(accountSides);
// //       setAccountSideSearchTerm('');
// //     }
// //   };

// //   // ========================================================================

// //   // انتخاب شرکت
// //   const handleCompanyChange = async (companyId) => {
// //     setSelectedCompany(companyId);
// //     setFormData(prev => ({ ...prev, projectId: '', bankId: '' }));
// //     await fetchProjectsByCompany(companyId);
// //     await fetchBanksByCompany(companyId);
// //   };

// //   // تغییر نوع تراکنش
// //   const handleTransactionTypeChange = async (type) => {
// //     console.log(`Transaction type changed to: ${type}`);
// //     setTransactionType(type);
// //     setFinancialLevels([]);
// //     setSelectedFinancialName('');
// //     setFormData(prev => ({ ...prev, financialId: '' }));
// //     await fetchFinancialLevel(null, 0, type);
// //   };

// //   // انتخاب حساب مالی
// //   const handleFinancialSelect = async (item, level) => {
// //     setFinancialLevels(prev => {
// //       const newLevels = [...prev];
// //       if (newLevels[level]) {
// //         newLevels[level].selectedId = item.id;
// //       }
// //       return newLevels;
// //     });

// //     setFormData(prev => ({
// //       ...prev,
// //       financialId: item.id
// //     }));
// //     setSelectedFinancialName(item.name);

// //     if (item.hasChildren) {
// //       await fetchFinancialLevel(item.id, level + 1, transactionType);
// //     } else {
// //       setFinancialLevels(prev => prev.slice(0, level + 1));
// //     }
// //   };

// //   // اعتبارسنجی
// //   const validateDates = (dateOfIssue, dueDate) => {
// //     if (!dateOfIssue) return true;
// //     if (!dueDate) return true;
    
// //     const issueDate = new Date(dateOfIssue);
// //     const dueDateObj = new Date(dueDate);
    
// //     if (dueDateObj < issueDate) {
// //       return false;
// //     }
// //     return true;
// //   };

// //   const validateForm = () => {
// //     const newErrors = {};
 
// //     if (!formData.paymentOrderNumber) {
// //       newErrors.paymentOrderNumber = 'شماره سفارش الزامی است';
// //     }
// //     if (!formData.amount || formData.amount <= 0) {
// //       newErrors.amount = 'مبلغ باید بزرگتر از صفر باشد';
// //     }
// //     if (!formData.dateOfIssue) {
// //       newErrors.dateOfIssue = 'تاریخ صدور الزامی است';
// //     }
// //     if (!selectedCompany) {
// //       newErrors.company = 'انتخاب شرکت الزامی است';
// //     }
// //     if (!formData.projectId) {
// //       newErrors.projectId = 'انتخاب پروژه الزامی است';
// //     }
// //     if (!formData.financialId) {
// //       newErrors.financialId = 'انتخاب حساب مالی الزامی است';
// //     }
// //     if (!formData.bankId) {
// //       newErrors.bankId = 'انتخاب بانک الزامی است';
// //     }
    
// //     if (!validateDates(formData.dateOfIssue, formData.dueDate)) {
// //       newErrors.dueDate = 'تاریخ سررسید نمی‌تواند از تاریخ صدور کوچک‌تر باشد';
// //     }
    
// //     setErrors(newErrors);
// //     return Object.keys(newErrors).length === 0;
// //   };

// //   // ثبت نهایی
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
    
// //     if (!validateForm()) {
// //       toast.error('لطفاً اطلاعات را به درستی وارد کنید');
// //       return;
// //     }
    
// //     try {
// //       setLoading(true);
      
// //       const submitData = {
// //         id: 0,
// //         paymentOrderNumber: Number(formData.paymentOrderNumber),
// //         accountSideName: formData.accountSideName || "",
// //         descriptionRows: formData.descriptionRows || "",
// //         dateOfIssue: formData.dateOfIssue,
// //         dateOfIssue_Persian: formData.dateOfIssue_Persian,
// //         paymentStatus: Number(formData.paymentStatus),
// //         amount: Number(formData.amount),
// //         dueDate: formData.dueDate || null,
// //         dueDate_Persian: formData.dueDate_Persian || "",
// //         operationCompleted: Number(formData.operationCompleted),
// //         projectId: Number(formData.projectId),
// //         financialId: Number(formData.financialId),
// //         bankId: Number(formData.bankId),
// //         companyId:Number(selectedCompany)
// //       };
      
// //       console.log("📤 Sending data:", submitData);
      
// //       if (isEditMode && operationToEdit) {
// //         submitData.id = operationToEdit.id;
// //         await financialOperationsService.updateFinancialOperation(operationToEdit.id, submitData);
// //         toast.success('عملیات مالی با موفقیت ویرایش شد');
// //       } else {
// //         await financialOperationsService.createFinancialOperation(submitData);
// //         toast.success('عملیات مالی با موفقیت ایجاد شد');
// //       }
      
// //       await onSuccess();
// //       onClose();
// //       resetForm();
      
// //     } catch (err) {
// //       console.error('Error saving operation:', err);
// //       toast.error(err.response?.data?.data?.message || err.response?.data?.message || 'خطا در ذخیره عملیات مالی');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // تغییر فیلدها
// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData(prev => ({ ...prev, [name]: value }));
// //     if (errors[name]) {
// //       setErrors(prev => ({ ...prev, [name]: '' }));
// //     }
// //   };

// //   // رادیو باتن paymentStatus
// //   const handlePaymentStatusChange = (value) => {
// //     setFormData(prev => ({ ...prev, paymentStatus: value }));
// //   };

// //   // رادیو باتن operationCompleted
// //   const handleOperationCompletedChange = (value) => {
// //     setFormData(prev => ({ ...prev, operationCompleted: value }));
// //   };

// //   // تاریخ صدور
// //   const handleDateOfIssueSelect = (value) => {
// //     try {
// //       const gregorianDate = value.toISOString().split('T')[0];
// //       const persianDate = convertToPersianDate(gregorianDate);
      
// //       setFormData(prev => ({
// //         ...prev,
// //         dateOfIssue: gregorianDate,
// //         dateOfIssue_Persian: persianDate
// //       }));
// //       setShowDateOfIssuePicker(false);
      
// //       if (errors.dateOfIssue) {
// //         setErrors(prev => ({ ...prev, dateOfIssue: '' }));
// //       }
      
// //       if (formData.dueDate && gregorianDate) {
// //         if (!validateDates(gregorianDate, formData.dueDate)) {
// //           setErrors(prev => ({ ...prev, dueDate: 'تاریخ سررسید نمی‌تواند از تاریخ صدور کوچک‌تر باشد' }));
// //         } else {
// //           setErrors(prev => ({ ...prev, dueDate: '' }));
// //         }
// //       }
// //     } catch (error) {
// //       console.error('Error selecting date:', error);
// //     }
// //   };

// //   // تاریخ سررسید
// //   const handleDueDateSelect = (value) => {
// //     try {
// //       const gregorianDate = value.toISOString().split('T')[0];
// //       const persianDate = convertToPersianDate(gregorianDate);
      
// //       setFormData(prev => ({
// //         ...prev,
// //         dueDate: gregorianDate,
// //         dueDate_Persian: persianDate
// //       }));
// //       setShowDueDatePicker(false);
      
// //       if (errors.dueDate) {
// //         setErrors(prev => ({ ...prev, dueDate: '' }));
// //       }
      
// //       if (formData.dateOfIssue && gregorianDate) {
// //         if (!validateDates(formData.dateOfIssue, gregorianDate)) {
// //           setErrors(prev => ({ ...prev, dueDate: 'تاریخ سررسید نمی‌تواند از تاریخ صدور کوچک‌تر باشد' }));
// //         }
// //       }
// //     } catch (error) {
// //       console.error('Error selecting due date:', error);
// //     }
// //   };

// //   // ریست فرم
// //   const resetForm = () => {
// //     setFormData({
// //       id: 0,
// //       paymentOrderNumber: '',
// //       accountSideName: '',
// //       descriptionRows: '',
// //       dateOfIssue: '',
// //       dateOfIssue_Persian: '',
// //       paymentStatus: 0,
// //       amount: '',
// //       dueDate: '',
// //       dueDate_Persian: '',
// //       operationCompleted: 0,
// //       projectId: '',
// //       financialId: '',
// //       bankId: ''
// //     });
// //     setSelectedCompany('');
// //     setDynamicProjects([]);
// //     setDynamicBanks([]);
// //     setFinancialLevels([]);
// //     setSelectedFinancialName('');
// //     setTransactionType(1);
// //     setErrors({});
// //     // ریست state های طرف حساب
// //     setAccountSideSearchTerm('');
// //     setFilteredAccountSides(accountSides);
// //     setShowAccountSideDropdown(false);
// //   };

// //   const handleClose = () => {
// //     if (!loading) {
// //       onClose();
// //       resetForm();
// //     }
// //   };

// //   // اثرات اولیه
// //   useEffect(() => {
// //     if (isOpen) {
// //       fetchCompanies();
// //       fetchFinancialLevel(null, 0, 1);
// //       fetchAccountSides(); // دریافت لیست طرف حساب‌ها یک بار در ابتدای باز شدن مودال
      
// //       if (isEditMode && operationToEdit) {
// //         setFormData({
// //           id: operationToEdit.id || 0,
// //           paymentOrderNumber: operationToEdit.paymentOrderNumber || '',
// //           accountSideName: operationToEdit.accountSideName || '',
// //           descriptionRows: operationToEdit.descriptionRows || '',
// //           dateOfIssue: operationToEdit.dateOfIssue ? operationToEdit.dateOfIssue.split('T')[0] : '',
// //           dateOfIssue_Persian: operationToEdit.dateOfIssue_Persian || '',
// //           paymentStatus: operationToEdit.paymentStatus || 0,
// //           amount: operationToEdit.amount || '',
// //           dueDate: operationToEdit.dueDate ? operationToEdit.dueDate.split('T')[0] : '',
// //           dueDate_Persian: operationToEdit.dueDate_Persian || '',
// //           operationCompleted: operationToEdit.operationCompleted || 0,
// //           projectId: operationToEdit.projectId || '',
// //           financialId: operationToEdit.financialId || '',
// //           bankId: operationToEdit.bankId || ''
// //         });
// //         setSelectedFinancialName(operationToEdit.financialName || '');
// //         setSelectedCompany(operationToEdit.companyId || '');
// //         // در حالت ویرایش، اگر مقدار طرف حساب وجود داشت، آن را در فیلد جستجو هم قرار بده
// //         if (operationToEdit.accountSideName) {
// //           setAccountSideSearchTerm(operationToEdit.accountSideName);
// //         }
// //         if (operationToEdit.companyId) {
// //           fetchProjectsByCompany(operationToEdit.companyId);
// //           fetchBanksByCompany(operationToEdit.companyId);
// //         }
// //       } else {
// //         // در حالت ایجاد جدید، فیلد طرف حساب را خالی کن
// //         setAccountSideSearchTerm('');
// //         setFilteredAccountSides(accountSides);
// //       }
      
// //       setErrors({});
// //     }
// //   }, [isOpen]);

// //   // افکت برای مدیریت کلیک خارج از دراپ‌داون طرف حساب
// //   useEffect(() => {
// //     const handleClickOutside = (event) => {
// //       if (dateOfIssueRef.current && !dateOfIssueRef.current.contains(event.target)) {
// //         setShowDateOfIssuePicker(false);
// //       }
// //       if (dueDateRef.current && !dueDateRef.current.contains(event.target)) {
// //         setShowDueDatePicker(false);
// //       }
// //       if (accountSideRef.current && !accountSideRef.current.contains(event.target)) {
// //         setShowAccountSideDropdown(false);
// //       }
// //     };
    
// //     document.addEventListener('mousedown', handleClickOutside);
// //     return () => document.removeEventListener('mousedown', handleClickOutside);
// //   }, []);

// //   const renderSelectedPath = () => {
// //     if (!selectedFinancialName) return null;
    
// //     return (
// //       <div className="selected-path">
// //         <span className="path-label">حساب مالی انتخاب شده: </span>
// //         <span className="path-item">{selectedFinancialName}</span>
// //       </div>
// //     );
// //   };

// //   if (!isOpen) return null;

// //   return (
// //     <div className="modal-overlay" onClick={handleClose}>
// //       <div className="financial-modal-container" onClick={(e) => e.stopPropagation()}>
// //         <div className="modal-header">
// //           <h2>{isEditMode ? '✏️ ویرایش عملیات مالی' : '➕ ایجاد عملیات مالی جدید'}</h2>
// //           <button className="modal-close" onClick={handleClose} disabled={loading}>
// //             ×
// //           </button>
// //         </div>
        
// //         <form onSubmit={handleSubmit} className="financial-form">
// //           <div className="modal-body">
// //             {/* مرحله 1: شرکت */}
// //             <div className="form-section">
// //               <div className="section-title">
// //                 <span className="section-number">1</span>
// //                 <span>اطلاعات شرکت</span>
// //               </div>
// //               <div className="form-group">
// //                 <label>شرکت <span className="required">*</span></label>
// //                 <select
// //                   value={selectedCompany}
// //                   onChange={(e) => handleCompanyChange(e.target.value)}
// //                   disabled={loading || loadingCompanies}
// //                   className={errors.company ? 'error' : ''}
// //                 >
// //                   <option value="">انتخاب شرکت</option>
// //                   {companies.map(company => (
// //                     <option key={company.id} value={company.id}>{company.name}</option>
// //                   ))}
// //                 </select>
// //                 {errors.company && <span className="error-message">{errors.company}</span>}
// //               </div>
// //             </div>

// //             {/* مرحله 2: پروژه و بانک */}
// //             <div className="form-section">
// //               <div className="section-title">
// //                 <span className="section-number">2</span>
// //                 <span>پروژه و بانک</span>
// //               </div>
// //               <div className="form-row two-columns">
// //                 <div className="form-group">
// //                   <label>پروژه <span className="required">*</span></label>
// //                   <select
// //                     name="projectId"
// //                     value={formData.projectId}
// //                     onChange={handleChange}
// //                     className={errors.projectId ? 'error' : ''}
// //                     disabled={loading || !selectedCompany || loadingProjects}
// //                   >
// //                     <option value="">انتخاب پروژه</option>
// //                     {dynamicProjects.map(project => (
// //                       <option key={project.id} value={project.id}>{project.name}</option>
// //                     ))}
// //                   </select>
// //                   {errors.projectId && <span className="error-message">{errors.projectId}</span>}
// //                 </div>

// //                 <div className="form-group">
// //                   <label>بانک <span className="required">*</span></label>
// //                   <select
// //                     name="bankId"
// //                     value={formData.bankId}
// //                     onChange={handleChange}
// //                     className={errors.bankId ? 'error' : ''}
// //                     disabled={loading || !selectedCompany || loadingBanks}
// //                   >
// //                     <option value="">انتخاب بانک</option>
// //                     {dynamicBanks.map(bank => (
// //                       <option key={bank.id} value={bank.id}>{bank.name}</option>
// //                     ))}
// //                   </select>
// //                   {errors.bankId && <span className="error-message">{errors.bankId}</span>}
// //                 </div>
// //               </div>
// //             </div>

// //             {/* مرحله 3: نوع تراکنش */}
// //             <div className="form-section">
// //               <div className="section-title">
// //                 <span className="section-number">3</span>
// //                 <span>نوع تراکنش</span>
// //               </div>
// //               <div className="form-group">
// //                 <label>نوع تراکنش <span className="required">*</span></label>
// //                 <div className="transaction-type-buttons">
// //                   <button
// //                     type="button"
// //                     className={`transaction-btn ${transactionType === 1 ? 'active' : ''}`}
// //                     onClick={() => handleTransactionTypeChange(1)}
// //                     disabled={loading}
// //                   >
// //                     <span>💰</span>
// //                     ورودی
// //                   </button>
// //                   <button
// //                     type="button"
// //                     className={`transaction-btn ${transactionType === 2 ? 'active' : ''}`}
// //                     onClick={() => handleTransactionTypeChange(2)}
// //                     disabled={loading}
// //                   >
// //                     <span>📈</span>
// //                     خروجی
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* مرحله 4: انتخاب حساب مالی */}
// //             <div className="form-section">
// //               <div className="section-title">
// //                 <span className="section-number">4</span>
// //                 <span>انتخاب حساب مالی</span>
// //               </div>
              
// //               {renderSelectedPath()}
              
// //               <div className="financial-levels">
// //                 {financialLevels.map((level, idx) => (
// //                   <div key={idx} className="financial-level">
// //                     <label>سطح {idx + 1}</label>
// //                     <div className="level-items">
// //                       {loadingLevel[idx] ? (
// //                         <LoadingSpinner size="small" />
// //                       ) : (
// //                         level.items && level.items.map(item => (
// //                           <button
// //                             key={item.id}
// //                             type="button"
// //                             className={`level-item ${level.selectedId === item.id ? 'selected' : ''}`}
// //                             onClick={() => handleFinancialSelect(item, idx)}
// //                           >
// //                             <span>{item.name}</span>
// //                             {item.hasChildren && <span className="has-children-icon">📁</span>}
// //                           </button>
// //                         ))
// //                       )}
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
              
// //               {errors.financialId && <span className="error-message">{errors.financialId}</span>}
// //             </div>

// //             {/* مرحله 5: اطلاعات پایه */}
// //             <div className="form-section">
// //               <div className="section-title">
// //                 <span className="section-number">5</span>
// //                 <span>اطلاعات پایه</span>
// //               </div>
// //               <div className="form-row two-columns">
// //                 <div className="form-group">
// //                   <label>شماره سفارش <span className="required">*</span></label>
// //                   <input
// //                     type="text"
// //                     name="paymentOrderNumber"
// //                     value={formData.paymentOrderNumber}
// //                     onChange={handleChange}
// //                     placeholder="مثال: ۱۴۰۳۰۰۱"
// //                     className={errors.paymentOrderNumber ? 'error' : ''}
// //                     disabled={loading}
// //                   />
// //                   {errors.paymentOrderNumber && <span className="error-message">{errors.paymentOrderNumber}</span>}
// //                 </div>

// //                 {/* فیلد طرف حساب با قابلیت سرچ کلاینت ساید */}
// //                 <div className="form-group" ref={accountSideRef}>
// //                   <label>طرف حساب</label>
// //                   <div className="account-side-wrapper">
// //                     <input
// //                       type="text"
// //                       value={accountSideSearchTerm}
// //                       onChange={(e) => handleAccountSideSearch(e.target.value)}
// //                       onClick={handleAccountSideInputClick}
// //                       placeholder="جستجو و انتخاب طرف حساب..."
// //                       disabled={loading || loadingAccountSides}
// //                       className={errors.accountSideName ? 'error' : ''}
// //                       autoComplete="off"
// //                     />
// //                     {loadingAccountSides && (
// //                       <div className="account-side-loading">
// //                         <LoadingSpinner size="small" />
// //                       </div>
// //                     )}
// //                     {showAccountSideDropdown && (
// //                       <div className="account-side-dropdown">
// //                         {filteredAccountSides.length > 0 ? (
// //                           filteredAccountSides.map(account => (
// //                             <div
// //                               key={account.id}
// //                               className="account-side-item"
// //                               onClick={() => handleAccountSideSelect(account)}
// //                             >
// //                               <span className="account-side-name">{account.name}</span>
// //                               {account.code && (
// //                                 <span className="account-side-code">({account.code})</span>
// //                               )}
// //                             </div>
// //                           ))
// //                         ) : (
// //                           <div className="account-side-no-data">
// //                             {accountSideSearchTerm ? 'نتیجه‌ای یافت نشد' : 'موردی برای نمایش وجود ندارد'}
// //                           </div>
// //                         )}
// //                       </div>
// //                     )}
// //                   </div>
// //                   {errors.accountSideName && <span className="error-message">{errors.accountSideName}</span>}
// //                 </div>

// //                 <div className="form-group">
// //                   <label>مبلغ (ریال) <span className="required">*</span></label>
// //                   <input
// //                     type="number"
// //                     name="amount"
// //                     value={formData.amount}
// //                     onChange={handleChange}
// //                     placeholder="مبلغ را وارد کنید"
// //                     className={errors.amount ? 'error' : ''}
// //                     disabled={loading}
// //                   />
// //                   {errors.amount && <span className="error-message">{errors.amount}</span>}
// //                 </div>
// //               </div>
// //             </div>

// //             {/* مرحله 6: تاریخ‌ها */}
// //             <div className="form-section">
// //               <div className="section-title">
// //                 <span className="section-number">6</span>
// //                 <span>تاریخ‌ها</span>
// //               </div>
// //               <div className="form-row two-columns">
// //                 <div className="form-group date-picker-group" ref={dateOfIssueRef}>
// //                   <label>تاریخ صدور <span className="required">*</span></label>
// //                   <div className="date-input-wrapper">
// //                     <input
// //                       type="text"
// //                       value={formatPersianDate(formData.dateOfIssue)}
// //                       onClick={() => setShowDateOfIssuePicker(!showDateOfIssuePicker)}
// //                       placeholder="انتخاب تاریخ صدور"
// //                       readOnly
// //                       className={errors.dateOfIssue ? 'error' : ''}
// //                       disabled={loading}
// //                     />
// //                     <span className="calendar-icon">📅</span>
// //                   </div>
// //                   {showDateOfIssuePicker && (
// //                     <div className="calendar-popup">
// //                       <Calendar
// //                         onChange={handleDateOfIssueSelect}
// //                         value={formData.dateOfIssue ? new Date(formData.dateOfIssue) : new Date()}
// //                         locale="fa"
// //                       />
// //                     </div>
// //                   )}
// //                   {errors.dateOfIssue && <span className="error-message">{errors.dateOfIssue}</span>}
// //                 </div>

// //                 <div className="form-group date-picker-group" ref={dueDateRef}>
// //                   <label>تاریخ سررسید</label>
// //                   <div className="date-input-wrapper">
// //                     <input
// //                       type="text"
// //                       value={formatPersianDate(formData.dueDate)}
// //                       onClick={() => setShowDueDatePicker(!showDueDatePicker)}
// //                       placeholder="انتخاب تاریخ سررسید"
// //                       readOnly
// //                       className={errors.dueDate ? 'error' : ''}
// //                       disabled={loading}
// //                     />
// //                     <span className="calendar-icon">📅</span>
// //                   </div>
// //                   {showDueDatePicker && (
// //                     <div className="calendar-popup">
// //                       <Calendar
// //                         onChange={handleDueDateSelect}
// //                         value={formData.dueDate ? new Date(formData.dueDate) : new Date()}
// //                         locale="fa"
// //                       />
// //                     </div>
// //                   )}
// //                   {errors.dueDate && <span className="error-message">{errors.dueDate}</span>}
// //                 </div>
// //               </div>
// //             </div>

// //             {/* مرحله 7: وضعیت‌ها */}
// //             <div className="form-section">
// //               <div className="section-title">
// //                 <span className="section-number">7</span>
// //                 <span>وضعیت‌ها</span>
// //               </div>
// //               <div className="form-row two-columns">
// //                 <div className="form-group">
// //                   <label>وضعیت پرداخت</label>
// //                   <div className="status-options">
// //                     <label className={`status-option ${formData.paymentStatus === 1 ? 'active' : ''}`}>
// //                       <input type="radio" name="paymentStatus" value="1" checked={formData.paymentStatus === 1} onChange={() => handlePaymentStatusChange(1)} disabled={loading} />
// //                       <span>✅ نقد</span>
// //                     </label>
// //                     <label className={`status-option ${formData.paymentStatus === 2 ? 'active' : ''}`}>
// //                       <input type="radio" name="paymentStatus" value="2" checked={formData.paymentStatus === 2} onChange={() => handlePaymentStatusChange(2)} disabled={loading} />
// //                       <span>📝 چک</span>
// //                     </label>
// //                     <label className={`status-option ${formData.paymentStatus === 3 ? 'active' : ''}`}>
// //                       <input type="radio" name="paymentStatus" value="3" checked={formData.paymentStatus === 3} onChange={() => handlePaymentStatusChange(3)} disabled={loading} />
// //                       <span>💳 واخواست</span>
// //                     </label>
// //                     <label className={`status-option ${formData.paymentStatus === 0 ? 'active' : ''}`}>
// //                       <input type="radio" name="paymentStatus" value="4" checked={formData.paymentStatus === 0} onChange={() => handlePaymentStatusChange(0)} disabled={loading} />
// //                       <span>💰 عودت </span>
// //                     </label>
// //                   </div>
// //                 </div>

// //                 <div className="form-group">
// //                   <label>وضعیت عملیات</label>
// //                   <div className="status-options">
// //                     <label className={`status-option status-success ${formData.operationCompleted === 0 ? 'active' : ''}`}>
// //                       <input 
// //                         type="radio" 
// //                         name="operationCompleted" 
// //                         value="0" 
// //                         checked={formData.operationCompleted === 0} 
// //                         onChange={() => handleOperationCompletedChange(0)} 
// //                         disabled={loading} 
// //                       />
// //                       <span>✅</span>
// //                       <span>بله</span>
// //                     </label>
// //                     <label className={`status-option status-danger ${formData.operationCompleted === 1 ? 'active' : ''}`}>
// //                       <input 
// //                         type="radio" 
// //                         name="operationCompleted" 
// //                         value="1" 
// //                         checked={formData.operationCompleted === 1} 
// //                         onChange={() => handleOperationCompletedChange(1)} 
// //                         disabled={loading} 
// //                       />
// //                       <span>❌</span>
// //                       <span>خیر</span>
// //                     </label>
// //                     <label className={`status-option status-warning ${formData.operationCompleted === 2 ? 'active' : ''}`}>
// //                       <input 
// //                         type="radio" 
// //                         name="operationCompleted" 
// //                         value="2" 
// //                         checked={formData.operationCompleted === 2} 
// //                         onChange={() => handleOperationCompletedChange(2)} 
// //                         disabled={loading} 
// //                       />
// //                       <span>⏰</span>
// //                       <span>پرداخت نشده</span>
// //                     </label>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* مرحله 8: توضیحات */}
// //             <div className="form-section">
// //               <div className="section-title">
// //                 <span className="section-number">8</span>
// //                 <span>توضیحات</span>
// //               </div>
// //               <div className="form-group">
// //                 <textarea
// //                   name="descriptionRows"
// //                   value={formData.descriptionRows}
// //                   onChange={handleChange}
// //                   placeholder="توضیحات اضافی..."
// //                   rows="3"
// //                   disabled={loading}
// //                 />
// //               </div>
// //             </div>

// //             {errors.submit && (
// //               <div className="submit-error">{errors.submit}</div>
// //             )}
// //           </div>
          
// //           <div className="modal-footer">
// //             <button type="button" className="btn-cancel" onClick={handleClose} disabled={loading}>
// //               انصراف
// //             </button>
// //             <button type="submit" className="btn-submit" disabled={loading}>
// //               {loading ? <LoadingSpinner size="small" /> : (isEditMode ? 'ویرایش' : 'ایجاد')}
// //             </button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CreateEditFinancialModal;

// // CreateEditFinancialModal.jsx

// import React, { useState, useEffect, useRef } from 'react';
// import { financialOperationsService } from '../../../services/financialOperationsService';
// import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner';
// import { toast } from 'react-toastify';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
// import './CreateEditFinancialModal.css';

// const CreateEditFinancialModal = ({ 
//   isOpen, 
//   onClose, 
//   onSuccess, 
//   operationToEdit, 
//   isEditMode,
//   projects = [],
//   banks = []
// }) => {
//   // دیتای فرم
//   const [formData, setFormData] = useState({
//     id: 0,
//     paymentOrderNumber: '',
//     accountSideName: '',
//     descriptionRows: '',
//     dateOfIssue: '',
//     dateOfIssue_Persian: '',
//     paymentStatus: 0,
//     amount: '',
//     dueDate: '',
//     dueDate_Persian: '',
//     operationCompleted: 0,
//     projectId: '',
//     financialId: '',
//     bankId: ''
//   });
  
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [showDateOfIssuePicker, setShowDateOfIssuePicker] = useState(false);
//   const [showDueDatePicker, setShowDueDatePicker] = useState(false);
  
//   const [companies, setCompanies] = useState([]);
//   const [selectedCompany, setSelectedCompany] = useState('');
//   const [dynamicProjects, setDynamicProjects] = useState([]);
//   const [dynamicBanks, setDynamicBanks] = useState([]);
  
//   const [financialLevels, setFinancialLevels] = useState([]);
//   const [loadingLevel, setLoadingLevel] = useState({});
//   const [selectedFinancialName, setSelectedFinancialName] = useState('');
//   const [transactionType, setTransactionType] = useState(1);
  
//   // State های مربوط به طرف حساب (AccountSide)
//   const [accountSides, setAccountSides] = useState([]);
//   const [filteredAccountSides, setFilteredAccountSides] = useState([]);
//   const [showAccountSideDropdown, setShowAccountSideDropdown] = useState(false);
//   const [accountSideSearchTerm, setAccountSideSearchTerm] = useState('');
//   const [loadingAccountSides, setLoadingAccountSides] = useState(false);
  
//   // ========== State های جدید برای مدیریت چک‌ها ==========
//   const [paymentType, setPaymentType] = useState('cash'); // 'cash', 'check', 'both'
//   const [checks, setChecks] = useState([]); // لیست چک‌ها
//   const [showCheckModal, setShowCheckModal] = useState(false); // نمایش مودال چک
//   const [currentCheck, setCurrentCheck] = useState({
//     checkNumber: '',
//     checkDate: '',
//     checkDate_Persian: '',
//     amount: '',
//     bankName: '',
//     description: ''
//   });
//   const [editingCheckIndex, setEditingCheckIndex] = useState(null);
//   const [cashAmount, setCashAmount] = useState(''); // مبلغ نقدی برای حالت both
//   const [showCheckDatePicker, setShowCheckDatePicker] = useState(false);
//   const checkDateRef = useRef(null);
  
//   const dateOfIssueRef = useRef(null);
//   const dueDateRef = useRef(null);
//   const accountSideRef = useRef(null);

//   const [loadingCompanies, setLoadingCompanies] = useState(false);
//   const [loadingProjects, setLoadingProjects] = useState(false);
//   const [loadingBanks, setLoadingBanks] = useState(false);

//   const transactionTypes = [
//     { id: 1, name: 'ورودی', icon: '💰' },
//     { id: 2, name: 'خروجی', icon: '📈' }
//   ];

//   // تبدیل تاریخ میلادی به شمسی
//   const convertToPersianDate = (gregorianDate) => {
//     if (!gregorianDate) return '';
//     try {
//       const date = new Date(gregorianDate);
//       const persianDate = new Intl.DateTimeFormat('fa-IR', {
//         year: 'numeric',
//         month: '2-digit',
//         day: '2-digit'
//       }).format(date);
      
//       const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
//       const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
      
//       let result = persianDate;
//       for (let i = 0; i < persianNumbers.length; i++) {
//         result = result.replace(new RegExp(persianNumbers[i], 'g'), englishNumbers[i]);
//       }
      
//       return result;
//     } catch (error) {
//       return '';
//     }
//   };

//   const formatPersianDate = (gregorianDate) => {
//     if (!gregorianDate) return '';
//     return convertToPersianDate(gregorianDate);
//   };

//   // دریافت شرکت‌ها
//   const fetchCompanies = async () => {
//     try {
//       setLoadingCompanies(true);
//       const response = await financialOperationsService.getComboCompany();
//       if (response && response.data) {
//         setCompanies(response.data);
//       }
//     } catch (error) {
//       console.error('Error fetching companies:', error);
//     } finally {
//       setLoadingCompanies(false);
//     }
//   };

//   // دریافت سطوح مالی
//   const fetchFinancialLevel = async (parentId, level, type) => {
//     try {
//       setLoadingLevel(prev => ({ ...prev, [level]: true }));
      
//       const typeToSend = type !== undefined ? type : transactionType;
//       const response = await financialOperationsService.getComboParentFinancial(parentId, typeToSend);
      
//       if (response && response.data) {
//         setFinancialLevels(prev => {
//           const newLevels = prev.slice(0, level);
//           newLevels.push({
//             level: level,
//             parentId: parentId,
//             items: response.data,
//             selectedId: null
//           });
//           return newLevels;
//         });
//       }
//     } catch (error) {
//       console.error('Error fetching financial level:', error);
//     } finally {
//       setLoadingLevel(prev => ({ ...prev, [level]: false }));
//     }
//   };

//   // دریافت پروژه‌ها بر اساس شرکت
//   const fetchProjectsByCompany = async (companyId) => {
//     if (!companyId) {
//       setDynamicProjects([]);
//       return;
//     }
    
//     try {
//       setLoadingProjects(true);
//       const response = await financialOperationsService.getComboProject(companyId);
//       if (response && response.data) {
//         setDynamicProjects(response.data);
//       }
//     } catch (error) {
//       console.error('Error fetching projects:', error);
//       setDynamicProjects([]);
//     } finally {
//       setLoadingProjects(false);
//     }
//   };

//   // دریافت بانک‌ها بر اساس شرکت
//   const fetchBanksByCompany = async (companyId) => {
//     if (!companyId) {
//       setDynamicBanks([]);
//       return;
//     }
    
//     try {
//       setLoadingBanks(true);
//       const response = await financialOperationsService.getComboBank(companyId);
//       if (response && response.data) {
//         setDynamicBanks(response.data);
//       }
//     } catch (error) {
//       console.error('Error fetching banks:', error);
//       setDynamicBanks([]);
//     } finally {
//       setLoadingBanks(false);
//     }
//   };

//   // دریافت لیست طرف حساب‌ها
//   const fetchAccountSides = async () => {
//     try {
//       setLoadingAccountSides(true);
//       const response = await financialOperationsService.getAccountSideCombo(0);
//       if (response && response.data) {
//         setAccountSides(response.data);
//         setFilteredAccountSides(response.data);
//       }
//     } catch (error) {
//       console.error('Error fetching account sides:', error);
//     } finally {
//       setLoadingAccountSides(false);
//     }
//   };

//   // جستجو در لیست طرف حساب‌ها
//   const handleAccountSideSearch = (searchValue) => {
//     setAccountSideSearchTerm(searchValue);
    
//     if (!searchValue.trim()) {
//       setFilteredAccountSides(accountSides);
//       return;
//     }
    
//     const filtered = accountSides.filter(item => 
//       item.name?.toLowerCase().includes(searchValue.toLowerCase()) ||
//       item.code?.toString().includes(searchValue)
//     );
//     setFilteredAccountSides(filtered);
//   };

//   const handleAccountSideSelect = (accountSide) => {
//     setFormData(prev => ({ 
//       ...prev, 
//       accountSideName: accountSide.name
//     }));
//     setAccountSideSearchTerm(accountSide.name);
//     setShowAccountSideDropdown(false);
//     if (errors.accountSideName) {
//       setErrors(prev => ({ ...prev, accountSideName: '' }));
//     }
//   };

//   const handleAccountSideInputClick = () => {
//     setShowAccountSideDropdown(true);
//     if (filteredAccountSides.length === 0 && accountSides.length > 0) {
//       setFilteredAccountSides(accountSides);
//       setAccountSideSearchTerm('');
//     }
//   };

//   // ========== توابع مدیریت چک‌ها ==========
  
//   // باز کردن مودال اضافه کردن چک جدید
//   const openAddCheckModal = () => {
//     setCurrentCheck({
//       checkNumber: '',
//       checkDate: '',
//       checkDate_Persian: '',
//       amount: '',
//       bankName: '',
//       description: ''
//     });
//     setEditingCheckIndex(null);
//     setShowCheckModal(true);
//   };

//   // باز کردن مودال ویرایش چک
//   const openEditCheckModal = (index) => {
//     setCurrentCheck(checks[index]);
//     setEditingCheckIndex(index);
//     setShowCheckModal(true);
//   };

//   // حذف چک
//   const removeCheck = (index) => {
//     const newChecks = checks.filter((_, i) => i !== index);
//     setChecks(newChecks);
//     toast.success('چک با موفقیت حذف شد');
//   };

//   // ذخیره چک (افزودن یا ویرایش)
//   const saveCheck = () => {
//     // اعتبارسنجی چک
//     if (!currentCheck.checkNumber) {
//       toast.error('شماره چک الزامی است');
//       return;
//     }
//     if (!currentCheck.amount || currentCheck.amount <= 0) {
//       toast.error('مبلغ چک باید بزرگتر از صفر باشد');
//       return;
//     }
//     if (!currentCheck.checkDate) {
//       toast.error('تاریخ چک الزامی است');
//       return;
//     }

//     if (editingCheckIndex !== null) {
//       // ویرایش چک موجود
//       const newChecks = [...checks];
//       newChecks[editingCheckIndex] = currentCheck;
//       setChecks(newChecks);
//       toast.success('چک با موفقیت ویرایش شد');
//     } else {
//       // اضافه کردن چک جدید
//       setChecks([...checks, currentCheck]);
//       toast.success('چک با موفقیت اضافه شد');
//     }
    
//     setShowCheckModal(false);
//   };

//   // انتخاب تاریخ چک
//   const handleCheckDateSelect = (value) => {
//     try {
//       const gregorianDate = value.toISOString().split('T')[0];
//       const persianDate = convertToPersianDate(gregorianDate);
      
//       setCurrentCheck(prev => ({
//         ...prev,
//         checkDate: gregorianDate,
//         checkDate_Persian: persianDate
//       }));
//       setShowCheckDatePicker(false);
//     } catch (error) {
//       console.error('Error selecting check date:', error);
//     }
//   };

//   // تغییر نوع پرداخت
//   const handlePaymentTypeChange = (type) => {
//     setPaymentType(type);
//     // ریست کردن مقادیر مربوطه
//     if (type === 'cash') {
//       setChecks([]);
//       setCashAmount('');
//       setFormData(prev => ({ ...prev, paymentStatus: 1 })); // نقد
//     } else if (type === 'check') {
//       setCashAmount('');
//       setFormData(prev => ({ ...prev, paymentStatus: 2 })); // چک
//     } else if (type === 'both') {
//       setFormData(prev => ({ ...prev, paymentStatus: 2 })); // ترکیبی
//     }
//   };

//   // محاسبه جمع کل چک‌ها
//   const getTotalChecksAmount = () => {
//     return checks.reduce((sum, check) => sum + (Number(check.amount) || 0), 0);
//   };

//   // محاسبه مبلغ کل (نقد + چک)
//   const getTotalAmount = () => {
//     if (paymentType === 'cash') {
//       return Number(formData.amount) || 0;
//     } else if (paymentType === 'check') {
//       return getTotalChecksAmount();
//     } else if (paymentType === 'both') {
//       return (Number(cashAmount) || 0) + getTotalChecksAmount();
//     }
//     return 0;
//   };

//   // به‌روزرسانی خودکار مبلغ کل فرم
//   useEffect(() => {
//     const total = getTotalAmount();
//     if (total > 0) {
//       setFormData(prev => ({ ...prev, amount: total.toString() }));
//     }
//   }, [paymentType, cashAmount, checks]);

//   // ============================================

//   const handleCompanyChange = async (companyId) => {
//     setSelectedCompany(companyId);
//     setFormData(prev => ({ ...prev, projectId: '', bankId: '' }));
//     await fetchProjectsByCompany(companyId);
//     await fetchBanksByCompany(companyId);
//   };

//   const handleTransactionTypeChange = async (type) => {
//     setTransactionType(type);
//     setFinancialLevels([]);
//     setSelectedFinancialName('');
//     setFormData(prev => ({ ...prev, financialId: '' }));
//     await fetchFinancialLevel(null, 0, type);
//   };

//   const handleFinancialSelect = async (item, level) => {
//     setFinancialLevels(prev => {
//       const newLevels = [...prev];
//       if (newLevels[level]) {
//         newLevels[level].selectedId = item.id;
//       }
//       return newLevels;
//     });

//     setFormData(prev => ({
//       ...prev,
//       financialId: item.id
//     }));
//     setSelectedFinancialName(item.name);

//     if (item.hasChildren) {
//       await fetchFinancialLevel(item.id, level + 1, transactionType);
//     } else {
//       setFinancialLevels(prev => prev.slice(0, level + 1));
//     }
//   };

//   const validateDates = (dateOfIssue, dueDate) => {
//     if (!dateOfIssue) return true;
//     if (!dueDate) return true;
    
//     const issueDate = new Date(dateOfIssue);
//     const dueDateObj = new Date(dueDate);
    
//     if (dueDateObj < issueDate) {
//       return false;
//     }
//     return true;
//   };

//   const validateForm = () => {
//     const newErrors = {};
 
//     if (!formData.paymentOrderNumber) {
//       newErrors.paymentOrderNumber = 'شماره سفارش الزامی است';
//     }
//     if (!formData.dateOfIssue) {
//       newErrors.dateOfIssue = 'تاریخ صدور الزامی است';
//     }
//     if (!selectedCompany) {
//       newErrors.company = 'انتخاب شرکت الزامی است';
//     }
//     if (!formData.projectId) {
//       newErrors.projectId = 'انتخاب پروژه الزامی است';
//     }
//     if (!formData.financialId) {
//       newErrors.financialId = 'انتخاب حساب مالی الزامی است';
//     }
//     if (!formData.bankId) {
//       newErrors.bankId = 'انتخاب بانک الزامی است';
//     }
    
//     // اعتبارسنجی مبلغ بر اساس نوع پرداخت
//     if (paymentType === 'cash') {
//       if (!formData.amount || formData.amount <= 0) {
//         newErrors.amount = 'مبلغ باید بزرگتر از صفر باشد';
//       }
//     } else if (paymentType === 'check') {
//       if (checks.length === 0) {
//         newErrors.checks = 'حداقل یک چک باید وارد کنید';
//       }
//     } else if (paymentType === 'both') {
//       if (!cashAmount || cashAmount <= 0) {
//         newErrors.cashAmount = 'مبلغ نقد باید بزرگتر از صفر باشد';
//       }
//       if (checks.length === 0) {
//         newErrors.checks = 'حداقل یک چک باید وارد کنید';
//       }
//     }
    
//     if (!validateDates(formData.dateOfIssue, formData.dueDate)) {
//       newErrors.dueDate = 'تاریخ سررسید نمی‌تواند از تاریخ صدور کوچک‌تر باشد';
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) {
//       toast.error('لطفاً اطلاعات را به درستی وارد کنید');
//       return;
//     }
    
//     try {
//       setLoading(true);
      
//       const submitData = {
//         id: 0,
//         paymentOrderNumber: Number(formData.paymentOrderNumber),
//         accountSideName: formData.accountSideName || "",
//         descriptionRows: formData.descriptionRows || "",
//         dateOfIssue: formData.dateOfIssue,
//         dateOfIssue_Persian: formData.dateOfIssue_Persian,
//         paymentStatus: formData.paymentStatus,
//         amount: getTotalAmount(),
//         dueDate: formData.dueDate || null,
//         dueDate_Persian: formData.dueDate_Persian || "",
//         operationCompleted: Number(formData.operationCompleted),
//         projectId: Number(formData.projectId),
//         financialId: Number(formData.financialId),
//         bankId: Number(formData.bankId),
//         companyId: Number(selectedCompany),
//         paymentType: paymentType,
//         cashAmount: paymentType === 'both' ? Number(cashAmount) : 0,
//         checks: checks.map(check => ({
//           checkNumber: check.checkNumber,
//           checkDate: check.checkDate,
//           checkDate_Persian: check.checkDate_Persian,
//           amount: Number(check.amount),
//           bankName: check.bankName,
//           description: check.description
//         }))
//       };
      
//       console.log("📤 Sending data:", submitData);
      
//       if (isEditMode && operationToEdit) {
//         submitData.id = operationToEdit.id;
//         await financialOperationsService.updateFinancialOperation(operationToEdit.id, submitData);
//         toast.success('عملیات مالی با موفقیت ویرایش شد');
//       } else {
//         await financialOperationsService.createFinancialOperation(submitData);
//         toast.success('عملیات مالی با موفقیت ایجاد شد');
//       }
      
//       await onSuccess();
//       onClose();
//       resetForm();
      
//     } catch (err) {
//       console.error('Error saving operation:', err);
//       toast.error(err.response?.data?.data?.message || err.response?.data?.message || 'خطا در ذخیره عملیات مالی');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: '' }));
//     }
//   };

//   const handlePaymentStatusChange = (value) => {
//     setFormData(prev => ({ ...prev, paymentStatus: value }));
//   };

//   const handleOperationCompletedChange = (value) => {
//     setFormData(prev => ({ ...prev, operationCompleted: value }));
//   };

//   const handleDateOfIssueSelect = (value) => {
//     try {
//       const gregorianDate = value.toISOString().split('T')[0];
//       const persianDate = convertToPersianDate(gregorianDate);
      
//       setFormData(prev => ({
//         ...prev,
//         dateOfIssue: gregorianDate,
//         dateOfIssue_Persian: persianDate
//       }));
//       setShowDateOfIssuePicker(false);
      
//       if (errors.dateOfIssue) {
//         setErrors(prev => ({ ...prev, dateOfIssue: '' }));
//       }
      
//       if (formData.dueDate && gregorianDate) {
//         if (!validateDates(gregorianDate, formData.dueDate)) {
//           setErrors(prev => ({ ...prev, dueDate: 'تاریخ سررسید نمی‌تواند از تاریخ صدور کوچک‌تر باشد' }));
//         } else {
//           setErrors(prev => ({ ...prev, dueDate: '' }));
//         }
//       }
//     } catch (error) {
//       console.error('Error selecting date:', error);
//     }
//   };

//   const handleDueDateSelect = (value) => {
//     try {
//       const gregorianDate = value.toISOString().split('T')[0];
//       const persianDate = convertToPersianDate(gregorianDate);
      
//       setFormData(prev => ({
//         ...prev,
//         dueDate: gregorianDate,
//         dueDate_Persian: persianDate
//       }));
//       setShowDueDatePicker(false);
      
//       if (errors.dueDate) {
//         setErrors(prev => ({ ...prev, dueDate: '' }));
//       }
      
//       if (formData.dateOfIssue && gregorianDate) {
//         if (!validateDates(formData.dateOfIssue, gregorianDate)) {
//           setErrors(prev => ({ ...prev, dueDate: 'تاریخ سررسید نمی‌تواند از تاریخ صدور کوچک‌تر باشد' }));
//         }
//       }
//     } catch (error) {
//       console.error('Error selecting due date:', error);
//     }
//   };

//   const resetForm = () => {
//     setFormData({
//       id: 0,
//       paymentOrderNumber: '',
//       accountSideName: '',
//       descriptionRows: '',
//       dateOfIssue: '',
//       dateOfIssue_Persian: '',
//       paymentStatus: 0,
//       amount: '',
//       dueDate: '',
//       dueDate_Persian: '',
//       operationCompleted: 0,
//       projectId: '',
//       financialId: '',
//       bankId: ''
//     });
//     setSelectedCompany('');
//     setDynamicProjects([]);
//     setDynamicBanks([]);
//     setFinancialLevels([]);
//     setSelectedFinancialName('');
//     setTransactionType(1);
//     setErrors({});
//     setAccountSideSearchTerm('');
//     setFilteredAccountSides(accountSides);
//     setShowAccountSideDropdown(false);
//     // ریست state های چک
//     setPaymentType('cash');
//     setChecks([]);
//     setCashAmount('');
//     setCurrentCheck({
//       checkNumber: '',
//       checkDate: '',
//       checkDate_Persian: '',
//       amount: '',
//       bankName: '',
//       description: ''
//     });
//     setEditingCheckIndex(null);
//   };

//   const handleClose = () => {
//     if (!loading) {
//       onClose();
//       resetForm();
//     }
//   };

//   useEffect(() => {
//     if (isOpen) {
//       fetchCompanies();
//       fetchFinancialLevel(null, 0, 1);
//       fetchAccountSides();
      
//       if (isEditMode && operationToEdit) {
//         setFormData({
//           id: operationToEdit.id || 0,
//           paymentOrderNumber: operationToEdit.paymentOrderNumber || '',
//           accountSideName: operationToEdit.accountSideName || '',
//           descriptionRows: operationToEdit.descriptionRows || '',
//           dateOfIssue: operationToEdit.dateOfIssue ? operationToEdit.dateOfIssue.split('T')[0] : '',
//           dateOfIssue_Persian: operationToEdit.dateOfIssue_Persian || '',
//           paymentStatus: operationToEdit.paymentStatus || 0,
//           amount: operationToEdit.amount || '',
//           dueDate: operationToEdit.dueDate ? operationToEdit.dueDate.split('T')[0] : '',
//           dueDate_Persian: operationToEdit.dueDate_Persian || '',
//           operationCompleted: operationToEdit.operationCompleted || 0,
//           projectId: operationToEdit.projectId || '',
//           financialId: operationToEdit.financialId || '',
//           bankId: operationToEdit.bankId || ''
//         });
//         setSelectedFinancialName(operationToEdit.financialName || '');
//         setSelectedCompany(operationToEdit.companyId || '');
        
//         if (operationToEdit.accountSideName) {
//           setAccountSideSearchTerm(operationToEdit.accountSideName);
//         }
        
//         // در حالت ویرایش، اطلاعات چک‌ها رو هم پر کن
//         if (operationToEdit.checks && operationToEdit.checks.length > 0) {
//           setChecks(operationToEdit.checks);
//           if (operationToEdit.cashAmount && operationToEdit.cashAmount > 0) {
//             setPaymentType('both');
//             setCashAmount(operationToEdit.cashAmount.toString());
//           } else {
//             setPaymentType('check');
//           }
//         }
        
//         if (operationToEdit.companyId) {
//           fetchProjectsByCompany(operationToEdit.companyId);
//           fetchBanksByCompany(operationToEdit.companyId);
//         }
//       }
      
//       setErrors({});
//     }
//   }, [isOpen]);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dateOfIssueRef.current && !dateOfIssueRef.current.contains(event.target)) {
//         setShowDateOfIssuePicker(false);
//       }
//       if (dueDateRef.current && !dueDateRef.current.contains(event.target)) {
//         setShowDueDatePicker(false);
//       }
//       if (accountSideRef.current && !accountSideRef.current.contains(event.target)) {
//         setShowAccountSideDropdown(false);
//       }
//       if (checkDateRef.current && !checkDateRef.current.contains(event.target)) {
//         setShowCheckDatePicker(false);
//       }
//     };
    
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const renderSelectedPath = () => {
//     if (!selectedFinancialName) return null;
    
//     return (
//       <div className="selected-path">
//         <span className="path-label">حساب مالی انتخاب شده: </span>
//         <span className="path-item">{selectedFinancialName}</span>
//       </div>
//     );
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="modal-overlay" onClick={handleClose}>
//       <div className="financial-modal-container" onClick={(e) => e.stopPropagation()}>
//         <div className="modal-header">
//           <h2>{isEditMode ? '✏️ ویرایش عملیات مالی' : '➕ ایجاد عملیات مالی جدید'}</h2>
//           <button className="modal-close" onClick={handleClose} disabled={loading}>
//             ×
//           </button>
//         </div>
        
//         <form onSubmit={handleSubmit} className="financial-form">
//           <div className="modal-body">
//             {/* مرحله 1: شرکت */}
//             <div className="form-section">
//               <div className="section-title">
//                 <span className="section-number">1</span>
//                 <span>اطلاعات شرکت</span>
//               </div>
//               <div className="form-group">
//                 <label>شرکت <span className="required">*</span></label>
//                 <select
//                   value={selectedCompany}
//                   onChange={(e) => handleCompanyChange(e.target.value)}
//                   disabled={loading || loadingCompanies}
//                   className={errors.company ? 'error' : ''}
//                 >
//                   <option value="">انتخاب شرکت</option>
//                   {companies.map(company => (
//                     <option key={company.id} value={company.id}>{company.name}</option>
//                   ))}
//                 </select>
//                 {errors.company && <span className="error-message">{errors.company}</span>}
//               </div>
//             </div>

//             {/* مرحله 2: پروژه و بانک */}
//             <div className="form-section">
//               <div className="section-title">
//                 <span className="section-number">2</span>
//                 <span>پروژه و بانک</span>
//               </div>
//               <div className="form-row two-columns">
//                 <div className="form-group">
//                   <label>پروژه <span className="required">*</span></label>
//                   <select
//                     name="projectId"
//                     value={formData.projectId}
//                     onChange={handleChange}
//                     className={errors.projectId ? 'error' : ''}
//                     disabled={loading || !selectedCompany || loadingProjects}
//                   >
//                     <option value="">انتخاب پروژه</option>
//                     {dynamicProjects.map(project => (
//                       <option key={project.id} value={project.id}>{project.name}</option>
//                     ))}
//                   </select>
//                   {errors.projectId && <span className="error-message">{errors.projectId}</span>}
//                 </div>

//                 <div className="form-group">
//                   <label>بانک <span className="required">*</span></label>
//                   <select
//                     name="bankId"
//                     value={formData.bankId}
//                     onChange={handleChange}
//                     className={errors.bankId ? 'error' : ''}
//                     disabled={loading || !selectedCompany || loadingBanks}
//                   >
//                     <option value="">انتخاب بانک</option>
//                     {dynamicBanks.map(bank => (
//                       <option key={bank.id} value={bank.id}>{bank.name}</option>
//                     ))}
//                   </select>
//                   {errors.bankId && <span className="error-message">{errors.bankId}</span>}
//                 </div>
//               </div>
//             </div>

//             {/* مرحله 3: نوع تراکنش */}
//             <div className="form-section">
//               <div className="section-title">
//                 <span className="section-number">3</span>
//                 <span>نوع تراکنش</span>
//               </div>
//               <div className="form-group">
//                 <label>نوع تراکنش <span className="required">*</span></label>
//                 <div className="transaction-type-buttons">
//                   <button
//                     type="button"
//                     className={`transaction-btn ${transactionType === 1 ? 'active' : ''}`}
//                     onClick={() => handleTransactionTypeChange(1)}
//                     disabled={loading}
//                   >
//                     <span>💰</span>
//                     ورودی
//                   </button>
//                   <button
//                     type="button"
//                     className={`transaction-btn ${transactionType === 2 ? 'active' : ''}`}
//                     onClick={() => handleTransactionTypeChange(2)}
//                     disabled={loading}
//                   >
//                     <span>📈</span>
//                     خروجی
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* مرحله 4: انتخاب حساب مالی */}
//             <div className="form-section">
//               <div className="section-title">
//                 <span className="section-number">4</span>
//                 <span>انتخاب حساب مالی</span>
//               </div>
              
//               {renderSelectedPath()}
              
//               <div className="financial-levels">
//                 {financialLevels.map((level, idx) => (
//                   <div key={idx} className="financial-level">
//                     <label>سطح {idx + 1}</label>
//                     <div className="level-items">
//                       {loadingLevel[idx] ? (
//                         <LoadingSpinner size="small" />
//                       ) : (
//                         level.items && level.items.map(item => (
//                           <button
//                             key={item.id}
//                             type="button"
//                             className={`level-item ${level.selectedId === item.id ? 'selected' : ''}`}
//                             onClick={() => handleFinancialSelect(item, idx)}
//                           >
//                             <span>{item.name}</span>
//                             {item.hasChildren && <span className="has-children-icon">📁</span>}
//                           </button>
//                         ))
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
              
//               {errors.financialId && <span className="error-message">{errors.financialId}</span>}
//             </div>

//             {/* مرحله 5: اطلاعات پایه */}
//             <div className="form-section">
//               <div className="section-title">
//                 <span className="section-number">5</span>
//                 <span>اطلاعات پایه</span>
//               </div>
//               <div className="form-row two-columns">
//                 <div className="form-group">
//                   <label>شماره سفارش <span className="required">*</span></label>
//                   <input
//                     type="text"
//                     name="paymentOrderNumber"
//                     value={formData.paymentOrderNumber}
//                     onChange={handleChange}
//                     placeholder="مثال: ۱۴۰۳۰۰۱"
//                     className={errors.paymentOrderNumber ? 'error' : ''}
//                     disabled={loading}
//                   />
//                   {errors.paymentOrderNumber && <span className="error-message">{errors.paymentOrderNumber}</span>}
//                 </div>

//                 {/* فیلد طرف حساب */}
//                 <div className="form-group" ref={accountSideRef}>
//                   <label>طرف حساب</label>
//                   <div className="account-side-wrapper">
//                     <input
//                       type="text"
//                       value={accountSideSearchTerm}
//                       onChange={(e) => handleAccountSideSearch(e.target.value)}
//                       onClick={handleAccountSideInputClick}
//                       placeholder="جستجو و انتخاب طرف حساب..."
//                       disabled={loading || loadingAccountSides}
//                       autoComplete="off"
//                     />
//                     {loadingAccountSides && (
//                       <div className="account-side-loading">
//                         <LoadingSpinner size="small" />
//                       </div>
//                     )}
//                     {showAccountSideDropdown && (
//                       <div className="account-side-dropdown">
//                         {filteredAccountSides.length > 0 ? (
//                           filteredAccountSides.map(account => (
//                             <div
//                               key={account.id}
//                               className="account-side-item"
//                               onClick={() => handleAccountSideSelect(account)}
//                             >
//                               <span className="account-side-name">{account.name}</span>
//                               {account.code && (
//                                 <span className="account-side-code">({account.code})</span>
//                               )}
//                             </div>
//                           ))
//                         ) : (
//                           <div className="account-side-no-data">
//                             {accountSideSearchTerm ? 'نتیجه‌ای یافت نشد' : 'موردی برای نمایش وجود ندارد'}
//                           </div>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* مرحله 6: نوع پرداخت و مدیریت چک‌ها */}
//             <div className="form-section">
//               <div className="section-title">
//                 <span className="section-number">6</span>
//                 <span>نوع پرداخت</span>
//               </div>
              
//               <div className="form-group">
//                 <label>نوع پرداخت <span className="required">*</span></label>
//                 <div className="payment-type-buttons">
//                   <button
//                     type="button"
//                     className={`payment-type-btn ${paymentType === 'cash' ? 'active' : ''}`}
//                     onClick={() => handlePaymentTypeChange('cash')}
//                   >
//                     <span>💰</span>
//                     نقد
//                   </button>
//                   <button
//                     type="button"
//                     className={`payment-type-btn ${paymentType === 'check' ? 'active' : ''}`}
//                     onClick={() => handlePaymentTypeChange('check')}
//                   >
//                     <span>📝</span>
//                     چک
//                   </button>
//                   <button
//                     type="button"
//                     className={`payment-type-btn ${paymentType === 'both' ? 'active' : ''}`}
//                     onClick={() => handlePaymentTypeChange('both')}
//                   >
//                     <span>🔄</span>
//                     نقد و چک
//                   </button>
//                 </div>
//               </div>

//               {/* حالت نقد */}
//               {paymentType === 'cash' && (
//                 <div className="form-group">
//                   <label>مبلغ (ریال) <span className="required">*</span></label>
//                   <input
//                     type="number"
//                     name="amount"
//                     value={formData.amount}
//                     onChange={handleChange}
//                     placeholder="مبلغ را وارد کنید"
//                     className={errors.amount ? 'error' : ''}
//                     disabled={loading}
//                   />
//                   {errors.amount && <span className="error-message">{errors.amount}</span>}
//                 </div>
//               )}

//               {/* حالت چک */}
//               {paymentType === 'check' && (
//                 <div className="checks-section">
//                   <div className="checks-header">
//                     <label>لیست چک‌ها <span className="required">*</span></label>
//                     <button type="button" className="add-check-btn" onClick={openAddCheckModal}>
//                       + اضافه کردن چک
//                     </button>
//                   </div>
                  
//                   {checks.length > 0 ? (
//                     <div className="checks-table">
//                       <table>
//                         <thead>
//                           <tr>
//                             <th>شماره چک</th>
//                             <th>تاریخ چک</th>
//                             <th>مبلغ (ریال)</th>
//                             <th>بانک</th>
//                             <th>توضیحات</th>
//                             <th>عملیات</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {checks.map((check, index) => (
//                             <tr key={index}>
//                               <td>{check.checkNumber}</td>
//                               <td>{check.checkDate_Persian || convertToPersianDate(check.checkDate)}</td>
//                               <td>{Number(check.amount).toLocaleString()}</td>
//                               <td>{check.bankName || '-'}</td>
//                               <td>{check.description || '-'}</td>
//                               <td>
//                                 <button type="button" className="edit-check-btn" onClick={() => openEditCheckModal(index)}>
//                                   ✏️
//                                 </button>
//                                 <button type="button" className="delete-check-btn" onClick={() => removeCheck(index)}>
//                                   🗑️
//                                 </button>
//                               </td>
//                             </tr>
//                           ))}
//                         </tbody>
//                         <tfoot>
//                           <tr className="total-row">
//                             <td colSpan="2">جمع کل</td>
//                             <td colSpan="4">{getTotalChecksAmount().toLocaleString()} ریال</td>
//                           </tr>
//                         </tfoot>
//                       </table>
//                     </div>
//                   ) : (
//                     <div className="no-checks-message">
//                       <p>هیچ چکی ثبت نشده است</p>
//                       <button type="button" className="add-first-check-btn" onClick={openAddCheckModal}>
//                         + ثبت چک جدید
//                       </button>
//                     </div>
//                   )}
//                   {errors.checks && <span className="error-message">{errors.checks}</span>}
//                 </div>
//               )}

//               {/* حالت نقد و چک */}
//               {paymentType === 'both' && (
//                 <>
//                   <div className="form-group">
//                     <label>مبلغ نقد (ریال) <span className="required">*</span></label>
//                     <input
//                       type="number"
//                       value={cashAmount}
//                       onChange={(e) => setCashAmount(e.target.value)}
//                       placeholder="مبلغ نقد را وارد کنید"
//                       className={errors.cashAmount ? 'error' : ''}
//                       disabled={loading}
//                     />
//                     {errors.cashAmount && <span className="error-message">{errors.cashAmount}</span>}
//                   </div>

//                   <div className="checks-section">
//                     <div className="checks-header">
//                       <label>لیست چک‌ها <span className="required">*</span></label>
//                       <button type="button" className="add-check-btn" onClick={openAddCheckModal}>
//                         + اضافه کردن چک
//                       </button>
//                     </div>
                    
//                     {checks.length > 0 ? (
//                       <div className="checks-table">
//                         <table>
//                           <thead>
//                             <tr>
//                               <th>شماره چک</th>
//                               <th>تاریخ چک</th>
//                               <th>مبلغ (ریال)</th>
//                               <th>بانک</th>
//                               <th>توضیحات</th>
//                               <th>عملیات</th>
//                             </tr>
//                           </thead>
//                           <tbody>
//                             {checks.map((check, index) => (
//                               <tr key={index}>
//                                 <td>{check.checkNumber}</td>
//                                 <td>{check.checkDate_Persian || convertToPersianDate(check.checkDate)}</td>
//                                 <td>{Number(check.amount).toLocaleString()}</td>
//                                 <td>{check.bankName || '-'}</td>
//                                 <td>{check.description || '-'}</td>
//                                 <td>
//                                   <button type="button" className="edit-check-btn" onClick={() => openEditCheckModal(index)}>
//                                     ✏️
//                                   </button>
//                                   <button type="button" className="delete-check-btn" onClick={() => removeCheck(index)}>
//                                     🗑️
//                                   </button>
//                                 </td>
//                               </tr>
//                             ))}
//                           </tbody>
//                           <tfoot>
//                             <tr className="total-row">
//                               <td colSpan="2">جمع کل چک‌ها</td>
//                               <td colSpan="4">{getTotalChecksAmount().toLocaleString()} ریال</td>
//                             </tr>
//                             <tr className="grand-total-row">
//                               <td colSpan="2">جمع کل (نقد + چک)</td>
//                               <td colSpan="4">{(Number(cashAmount) + getTotalChecksAmount()).toLocaleString()} ریال</td>
//                             </tr>
//                           </tfoot>
//                         </table>
//                       </div>
//                     ) : (
//                       <div className="no-checks-message">
//                         <p>هیچ چکی ثبت نشده است</p>
//                         <button type="button" className="add-first-check-btn" onClick={openAddCheckModal}>
//                           + ثبت چک جدید
//                         </button>
//                       </div>
//                     )}
//                     {errors.checks && <span className="error-message">{errors.checks}</span>}
//                   </div>
//                 </>
//               )}
//             </div>

//             {/* مرحله 7: تاریخ‌ها */}
//             <div className="form-section">
//               <div className="section-title">
//                 <span className="section-number">7</span>
//                 <span>تاریخ‌ها</span>
//               </div>
//               <div className="form-row two-columns">
//                 <div className="form-group date-picker-group" ref={dateOfIssueRef}>
//                   <label>تاریخ صدور <span className="required">*</span></label>
//                   <div className="date-input-wrapper">
//                     <input
//                       type="text"
//                       value={formatPersianDate(formData.dateOfIssue)}
//                       onClick={() => setShowDateOfIssuePicker(!showDateOfIssuePicker)}
//                       placeholder="انتخاب تاریخ صدور"
//                       readOnly
//                       className={errors.dateOfIssue ? 'error' : ''}
//                       disabled={loading}
//                     />
//                     <span className="calendar-icon">📅</span>
//                   </div>
//                   {showDateOfIssuePicker && (
//                     <div className="calendar-popup">
//                       <Calendar
//                         onChange={handleDateOfIssueSelect}
//                         value={formData.dateOfIssue ? new Date(formData.dateOfIssue) : new Date()}
//                         locale="fa"
//                       />
//                     </div>
//                   )}
//                   {errors.dateOfIssue && <span className="error-message">{errors.dateOfIssue}</span>}
//                 </div>

//                 <div className="form-group date-picker-group" ref={dueDateRef}>
//                   <label>تاریخ سررسید</label>
//                   <div className="date-input-wrapper">
//                     <input
//                       type="text"
//                       value={formatPersianDate(formData.dueDate)}
//                       onClick={() => setShowDueDatePicker(!showDueDatePicker)}
//                       placeholder="انتخاب تاریخ سررسید"
//                       readOnly
//                       className={errors.dueDate ? 'error' : ''}
//                       disabled={loading}
//                     />
//                     <span className="calendar-icon">📅</span>
//                   </div>
//                   {showDueDatePicker && (
//                     <div className="calendar-popup">
//                       <Calendar
//                         onChange={handleDueDateSelect}
//                         value={formData.dueDate ? new Date(formData.dueDate) : new Date()}
//                         locale="fa"
//                       />
//                     </div>
//                   )}
//                   {errors.dueDate && <span className="error-message">{errors.dueDate}</span>}
//                 </div>
//               </div>
//             </div>

//             {/* مرحله 8: وضعیت عملیات */}
//             {/* <div className="form-section">
//               <div className="section-title">
//                 <span className="section-number">8</span>
//                 <span>وضعیت عملیات</span>
//               </div>
//               <div className="form-group">
//                 <label>وضعیت عملیات</label>
//                 <div className="status-options">
//                   <label className={`status-option status-success ${formData.operationCompleted === 0 ? 'active' : ''}`}>
//                     <input 
//                       type="radio" 
//                       name="operationCompleted" 
//                       value="0" 
//                       checked={formData.operationCompleted === 0} 
//                       onChange={() => handleOperationCompletedChange(0)} 
//                       disabled={loading} 
//                     />
//                     <span>✅</span>
//                     <span>بله</span>
//                   </label>
//                   <label className={`status-option status-danger ${formData.operationCompleted === 1 ? 'active' : ''}`}>
//                     <input 
//                       type="radio" 
//                       name="operationCompleted" 
//                       value="1" 
//                       checked={formData.operationCompleted === 1} 
//                       onChange={() => handleOperationCompletedChange(1)} 
//                       disabled={loading} 
//                     />
//                     <span>❌</span>
//                     <span>خیر</span>
//                   </label>
//                   <label className={`status-option status-warning ${formData.operationCompleted === 2 ? 'active' : ''}`}>
//                     <input 
//                       type="radio" 
//                       name="operationCompleted" 
//                       value="2" 
//                       checked={formData.operationCompleted === 2} 
//                       onChange={() => handleOperationCompletedChange(2)} 
//                       disabled={loading} 
//                     />
//                     <span>⏰</span>
//                     <span>پرداخت نشده</span>
//                   </label>
//                 </div>
//               </div>
//             </div> */}

//             {/* مرحله 9: توضیحات */}
//             <div className="form-section">
//               <div className="section-title">
//                 <span className="section-number">8</span>
//                 <span>توضیحات</span>
//               </div>
//               <div className="form-group">
//                 <textarea
//                   name="descriptionRows"
//                   value={formData.descriptionRows}
//                   onChange={handleChange}
//                   placeholder="توضیحات اضافی..."
//                   rows="3"
//                   disabled={loading}
//                 />
//               </div>
//             </div>

//             {errors.submit && (
//               <div className="submit-error">{errors.submit}</div>
//             )}
//           </div>
          
//           <div className="modal-footer">
//             <button type="button" className="btn-cancel" onClick={handleClose} disabled={loading}>
//               انصراف
//             </button>
//             <button type="submit" className="btn-submit" disabled={loading}>
//               {loading ? <LoadingSpinner size="small" /> : (isEditMode ? 'ویرایش' : 'ایجاد')}
//             </button>
//           </div>
//         </form>
//       </div>

//       {/* مودال افزودن/ویرایش چک */}
//       {showCheckModal && (
//         <div className="check-modal-overlay" onClick={() => setShowCheckModal(false)}>
//           <div className="check-modal-container" onClick={(e) => e.stopPropagation()}>
//             <div className="check-modal-header">
//               <h3>{editingCheckIndex !== null ? '✏️ ویرایش چک' : '➕ افزودن چک جدید'}</h3>
//               <button className="check-modal-close" onClick={() => setShowCheckModal(false)}>×</button>
//             </div>
//             <div className="check-modal-body">
//               <div className="form-group">
//                 <label>شماره چک <span className="required">*</span></label>
//                 <input
//                   type="text"
//                   value={currentCheck.checkNumber}
//                   onChange={(e) => setCurrentCheck({...currentCheck, checkNumber: e.target.value})}
//                   placeholder="شماره چک را وارد کنید"
//                 />
//               </div>
//               <div className="form-group">
//                 <label>مبلغ (ریال) <span className="required">*</span></label>
//                 <input
//                   type="number"
//                   value={currentCheck.amount}
//                   onChange={(e) => setCurrentCheck({...currentCheck, amount: e.target.value})}
//                   placeholder="مبلغ چک را وارد کنید"
//                 />
//               </div>
//               <div className="form-group date-picker-group" ref={checkDateRef}>
//                 <label>تاریخ چک <span className="required">*</span></label>
//                 <div className="date-input-wrapper">
//                   <input
//                     type="text"
//                     value={currentCheck.checkDate_Persian || formatPersianDate(currentCheck.checkDate)}
//                     onClick={() => setShowCheckDatePicker(!showCheckDatePicker)}
//                     placeholder="انتخاب تاریخ چک"
//                     readOnly
//                   />
//                   <span className="calendar-icon">📅</span>
//                 </div>
//                 {showCheckDatePicker && (
//                   <div className="calendar-popup">
//                     <Calendar
//                       onChange={handleCheckDateSelect}
//                       value={currentCheck.checkDate ? new Date(currentCheck.checkDate) : new Date()}
//                       locale="fa"
//                     />
//                   </div>
//                 )}
//               </div>
//               <div className="form-group">
//                 <label>نام بانک</label>
//                 <input
//                   type="text"
//                   value={currentCheck.bankName}
//                   onChange={(e) => setCurrentCheck({...currentCheck, bankName: e.target.value})}
//                   placeholder="نام بانک صادرکننده چک"
//                 />
//               </div>
//               <div className="form-group">
//                 <label>توضیحات</label>
//                 <textarea
//                   value={currentCheck.description}
//                   onChange={(e) => setCurrentCheck({...currentCheck, description: e.target.value})}
//                   placeholder="توضیحات اضافی..."
//                   rows="2"
//                 />
//               </div>
//             </div>
//             <div className="check-modal-footer">
//               <button type="button" className="btn-cancel" onClick={() => setShowCheckModal(false)}>
//                 انصراف
//               </button>
//               <button type="button" className="btn-submit" onClick={saveCheck}>
//                 {editingCheckIndex !== null ? 'ویرایش' : 'افزودن'}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CreateEditFinancialModal;

// CreateEditFinancialModal.jsx

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
  // دیتای فرم - مطابق با ساختار JSON
  const [formData, setFormData] = useState({
    id: 0,
    paymentOrderNumber: 0,
    accountSideName: '',
    descriptionRows: '',
    dateOfIssue: '',
    dateOfIssue_Persian: '',
    paymentStatus: 0,
    amount: 0,
    dueDate: '',
    dueDate_Persian: '',
    operationCompleted: 0,
    projectId: 0,
    financialId: 0,
    bankId: 0,
    companyId: 0,
    accountSideId: 0,
    amountCash: 0,
    amountCheque: 0,
    cheques: []
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
  
  // State های مربوط به طرف حساب (AccountSide)
  const [accountSides, setAccountSides] = useState([]);
  const [filteredAccountSides, setFilteredAccountSides] = useState([]);
  const [showAccountSideDropdown, setShowAccountSideDropdown] = useState(false);
  const [accountSideSearchTerm, setAccountSideSearchTerm] = useState('');
  const [loadingAccountSides, setLoadingAccountSides] = useState(false);
  const [selectedAccountSideId, setSelectedAccountSideId] = useState(0);
  
  // ========== State های جدید برای مدیریت چک‌ها ==========
  const [paymentType, setPaymentType] = useState('cash'); // 'cash', 'check', 'both'
  const [checks, setChecks] = useState([]); // لیست چک‌ها - مطابق با ساختار JSON
  const [showCheckModal, setShowCheckModal] = useState(false); // نمایش مودال چک
  const [currentCheck, setCurrentCheck] = useState({
    serialNumber: '',
    chequeDate: '',
    chequeDate_Persion: '',
    amount: 0,
    paymentChequeStatus: 0,
    bankName: '',
    desc: ''
  });
  const [editingCheckIndex, setEditingCheckIndex] = useState(null);
  const [cashAmount, setCashAmount] = useState(''); // مبلغ نقدی برای حالت both
  const [showCheckDatePicker, setShowCheckDatePicker] = useState(false);
  const checkDateRef = useRef(null);
  
  const dateOfIssueRef = useRef(null);
  const dueDateRef = useRef(null);
  const accountSideRef = useRef(null);

  const [loadingCompanies, setLoadingCompanies] = useState(false);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [loadingBanks, setLoadingBanks] = useState(false);

  const transactionTypes = [
    { id: 1, name: 'ورودی', icon: '💰' },
    { id: 2, name: 'خروجی', icon: '📈' }
  ];

  // وضعیت‌های پرداخت چک
  const paymentChequeStatuses = [
    { id: 0, name: 'در انتظار' },
    { id: 1, name: 'وصول شده' },
    { id: 2, name: 'برگشت خورده' }
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

  // دریافت لیست طرف حساب‌ها
  const fetchAccountSides = async () => {
    try {
      setLoadingAccountSides(true);
      const response = await financialOperationsService.getAccountSideCombo(0);
      if (response && response.data) {
        setAccountSides(response.data);
        setFilteredAccountSides(response.data);
      }
    } catch (error) {
      console.error('Error fetching account sides:', error);
    } finally {
      setLoadingAccountSides(false);
    }
  };

  // جستجو در لیست طرف حساب‌ها
  const handleAccountSideSearch = (searchValue) => {
    setAccountSideSearchTerm(searchValue);
    
    if (!searchValue.trim()) {
      setFilteredAccountSides(accountSides);
      return;
    }
    
    const filtered = accountSides.filter(item => 
      item.name?.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.code?.toString().includes(searchValue)
    );
    setFilteredAccountSides(filtered);
  };

  const handleAccountSideSelect = (accountSide) => {
    setFormData(prev => ({ 
      ...prev, 
      accountSideName: accountSide.name,
      accountSideId: accountSide.id
    }));
    setSelectedAccountSideId(accountSide.id);
    setAccountSideSearchTerm(accountSide.name);
    setShowAccountSideDropdown(false);
    if (errors.accountSideName) {
      setErrors(prev => ({ ...prev, accountSideName: '' }));
    }
  };

  const handleAccountSideInputClick = () => {
    setShowAccountSideDropdown(true);
    if (filteredAccountSides.length === 0 && accountSides.length > 0) {
      setFilteredAccountSides(accountSides);
      setAccountSideSearchTerm('');
    }
  };

  // ========== توابع مدیریت چک‌ها (مطابق با ساختار JSON) ==========
  
  // باز کردن مودال اضافه کردن چک جدید
  const openAddCheckModal = () => {
    setCurrentCheck({
      serialNumber: '',
      chequeDate: '',
      chequeDate_Persion: '',
      amount: 0,
      paymentChequeStatus: 0,
      bankName: '',
      desc: ''
    });
    setEditingCheckIndex(null);
    setShowCheckModal(true);
  };

  // باز کردن مودال ویرایش چک
  const openEditCheckModal = (index) => {
    setCurrentCheck({ ...checks[index] });
    setEditingCheckIndex(index);
    setShowCheckModal(true);
  };

  // حذف چک
  const removeCheck = (index) => {
    const newChecks = checks.filter((_, i) => i !== index);
    setChecks(newChecks);
    toast.success('چک با موفقیت حذف شد');
  };

  // ذخیره چک (افزودن یا ویرایش)
  const saveCheck = () => {
    // اعتبارسنجی چک
    if (!currentCheck.serialNumber) {
      toast.error('شماره چک الزامی است');
      return;
    }
    if (!currentCheck.amount || currentCheck.amount <= 0) {
      toast.error('مبلغ چک باید بزرگتر از صفر باشد');
      return;
    }
    if (!currentCheck.chequeDate) {
      toast.error('تاریخ چک الزامی است');
      return;
    }

    if (editingCheckIndex !== null) {
      // ویرایش چک موجود
      const newChecks = [...checks];
      newChecks[editingCheckIndex] = currentCheck;
      setChecks(newChecks);
      toast.success('چک با موفقیت ویرایش شد');
    } else {
      // اضافه کردن چک جدید
      setChecks([...checks, currentCheck]);
      toast.success('چک با موفقیت اضافه شد');
    }
    
    setShowCheckModal(false);
  };

  // انتخاب تاریخ چک
  const handleCheckDateSelect = (value) => {
    try {
      const gregorianDate = value.toISOString().split('T')[0];
      const persianDate = convertToPersianDate(gregorianDate);
      
      setCurrentCheck(prev => ({
        ...prev,
        chequeDate: gregorianDate,
        chequeDate_Persion: persianDate
      }));
      setShowCheckDatePicker(false);
    } catch (error) {
      console.error('Error selecting check date:', error);
    }
  };

  // تغییر نوع پرداخت
  const handlePaymentTypeChange = (type) => {
    setPaymentType(type);
    // ریست کردن مقادیر مربوطه
    if (type === 'cash') {
      setChecks([]);
      setCashAmount('');
      setFormData(prev => ({ ...prev, paymentStatus: 1, amountCash: 0, amountCheque: 0, cheques: [] }));
    } else if (type === 'check') {
      setCashAmount('');
      setFormData(prev => ({ ...prev, paymentStatus: 2, amountCash: 0 }));
    } else if (type === 'both') {
      setFormData(prev => ({ ...prev, paymentStatus: 2 }));
    }
  };

  // محاسبه جمع کل چک‌ها
  const getTotalChecksAmount = () => {
    return checks.reduce((sum, check) => sum + (Number(check.amount) || 0), 0);
  };

  // محاسبه مبلغ کل (نقد + چک)
  const getTotalAmount = () => {
    if (paymentType === 'cash') {
      return Number(formData.amount) || 0;
    } else if (paymentType === 'check') {
      return getTotalChecksAmount();
    } else if (paymentType === 'both') {
      return (Number(cashAmount) || 0) + getTotalChecksAmount();
    }
    return 0;
  };

  // به‌روزرسانی خودکار مبلغ کل فرم
  useEffect(() => {
    const total = getTotalAmount();
    if (total > 0) {
      setFormData(prev => ({ 
        ...prev, 
        amount: total,
        amountCash: paymentType === 'both' ? (Number(cashAmount) || 0) : (paymentType === 'cash' ? total : 0),
        amountCheque: getTotalChecksAmount(),
        cheques: checks
      }));
    }
  }, [paymentType, cashAmount, checks]);

  // ============================================

  const handleCompanyChange = async (companyId) => {
    setSelectedCompany(companyId);
    setFormData(prev => ({ ...prev, projectId: 0, bankId: 0, companyId: Number(companyId) }));
    await fetchProjectsByCompany(companyId);
    await fetchBanksByCompany(companyId);
  };

  const handleTransactionTypeChange = async (type) => {
    setTransactionType(type);
    setFinancialLevels([]);
    setSelectedFinancialName('');
    setFormData(prev => ({ ...prev, financialId: 0 }));
    await fetchFinancialLevel(null, 0, type);
  };

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
 
    if (!formData.paymentOrderNumber || formData.paymentOrderNumber === 0) {
      newErrors.paymentOrderNumber = 'شماره سفارش الزامی است';
    }
    if (!formData.dateOfIssue) {
      newErrors.dateOfIssue = 'تاریخ صدور الزامی است';
    }
    if (!selectedCompany || selectedCompany === 0) {
      newErrors.company = 'انتخاب شرکت الزامی است';
    }
    if (!formData.projectId || formData.projectId === 0) {
      newErrors.projectId = 'انتخاب پروژه الزامی است';
    }
    if (!formData.financialId || formData.financialId === 0) {
      newErrors.financialId = 'انتخاب حساب مالی الزامی است';
    }
    if (!formData.bankId || formData.bankId === 0) {
      newErrors.bankId = 'انتخاب بانک الزامی است';
    }
    
    // اعتبارسنجی مبلغ بر اساس نوع پرداخت
    if (paymentType === 'cash') {
      if (!formData.amount || formData.amount <= 0) {
        newErrors.amount = 'مبلغ باید بزرگتر از صفر باشد';
      }
    } else if (paymentType === 'check') {
      if (checks.length === 0) {
        newErrors.checks = 'حداقل یک چک باید وارد کنید';
      }
    } else if (paymentType === 'both') {
      if (!cashAmount || cashAmount <= 0) {
        newErrors.cashAmount = 'مبلغ نقد باید بزرگتر از صفر باشد';
      }
      if (checks.length === 0) {
        newErrors.checks = 'حداقل یک چک باید وارد کنید';
      }
    }
    
    if (!validateDates(formData.dateOfIssue, formData.dueDate)) {
      newErrors.dueDate = 'تاریخ سررسید نمی‌تواند از تاریخ صدور کوچک‌تر باشد';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('لطفاً اطلاعات را به درستی وارد کنید');
      return;
    }
    
    try {
      setLoading(true);
      
      // ساخت دیتا مطابق با ساختار JSON مورد نظر
      const submitData = {
        id: isEditMode && operationToEdit ? operationToEdit.id : 0,
        paymentOrderNumber: Number(formData.paymentOrderNumber),
        accountSideName: formData.accountSideName || "",
        descriptionRows: formData.descriptionRows || "",
        dateOfIssue: formData.dateOfIssue,
        dateOfIssue_Persian: formData.dateOfIssue_Persian,
        paymentStatus: formData.paymentStatus,
        amount: getTotalAmount(),
        dueDate: formData.dueDate || null,
        dueDate_Persian: formData.dueDate_Persian || "",
        operationCompleted: Number(formData.operationCompleted) || 0,
        projectId: Number(formData.projectId),
        financialId: Number(formData.financialId),
        bankId: Number(formData.bankId),
        companyId: Number(selectedCompany),
        accountSideId: selectedAccountSideId,
        amountCash: paymentType === 'both' ? (Number(cashAmount) || 0) : (paymentType === 'cash' ? getTotalAmount() : 0),
        amountCheque: getTotalChecksAmount(),
        cheques: checks.map(check => ({
          serialNumber: check.serialNumber,
          chequeDate: check.chequeDate,
          chequeDate_Persion: check.chequeDate_Persion,
          amount: Number(check.amount),
          paymentChequeStatus: check.paymentChequeStatus || 0,
          bankName: check.bankName || "",
          desc: check.desc || ""
        }))
      };
      
      console.log("📤 Sending data:", submitData);
      
      if (isEditMode && operationToEdit) {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'paymentOrderNumber' || name === 'projectId' || name === 'financialId' || name === 'bankId' ? Number(value) : value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handlePaymentStatusChange = (value) => {
    setFormData(prev => ({ ...prev, paymentStatus: value }));
  };

  const handleOperationCompletedChange = (value) => {
    setFormData(prev => ({ ...prev, operationCompleted: value }));
  };

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

  const resetForm = () => {
    setFormData({
      id: 0,
      paymentOrderNumber: 0,
      accountSideName: '',
      descriptionRows: '',
      dateOfIssue: '',
      dateOfIssue_Persian: '',
      paymentStatus: 0,
      amount: 0,
      dueDate: '',
      dueDate_Persian: '',
      operationCompleted: 0,
      projectId: 0,
      financialId: 0,
      bankId: 0,
      companyId: 0,
      accountSideId: 0,
      amountCash: 0,
      amountCheque: 0,
      cheques: []
    });
    setSelectedCompany('');
    setSelectedAccountSideId(0);
    setDynamicProjects([]);
    setDynamicBanks([]);
    setFinancialLevels([]);
    setSelectedFinancialName('');
    setTransactionType(1);
    setErrors({});
    setAccountSideSearchTerm('');
    setFilteredAccountSides(accountSides);
    setShowAccountSideDropdown(false);
    // ریست state های چک
    setPaymentType('cash');
    setChecks([]);
    setCashAmount('');
    setCurrentCheck({
      serialNumber: '',
      chequeDate: '',
      chequeDate_Persion: '',
      amount: 0,
      paymentChequeStatus: 0,
      bankName: '',
      desc: ''
    });
    setEditingCheckIndex(null);
  };

  const handleClose = () => {
    if (!loading) {
      onClose();
      resetForm();
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchCompanies();
      fetchFinancialLevel(null, 0, 1);
      fetchAccountSides();
      
      if (isEditMode && operationToEdit) {
        setFormData({
          id: operationToEdit.id || 0,
          paymentOrderNumber: operationToEdit.paymentOrderNumber || 0,
          accountSideName: operationToEdit.accountSideName || '',
          descriptionRows: operationToEdit.descriptionRows || '',
          dateOfIssue: operationToEdit.dateOfIssue ? operationToEdit.dateOfIssue.split('T')[0] : '',
          dateOfIssue_Persian: operationToEdit.dateOfIssue_Persian || '',
          paymentStatus: operationToEdit.paymentStatus || 0,
          amount: operationToEdit.amount || 0,
          dueDate: operationToEdit.dueDate ? operationToEdit.dueDate.split('T')[0] : '',
          dueDate_Persian: operationToEdit.dueDate_Persian || '',
          operationCompleted: operationToEdit.operationCompleted || 0,
          projectId: operationToEdit.projectId || 0,
          financialId: operationToEdit.financialId || 0,
          bankId: operationToEdit.bankId || 0,
          companyId: operationToEdit.companyId || 0,
          accountSideId: operationToEdit.accountSideId || 0,
          amountCash: operationToEdit.amountCash || 0,
          amountCheque: operationToEdit.amountCheque || 0,
          cheques: operationToEdit.cheques || []
        });
        setSelectedFinancialName(operationToEdit.financialName || '');
        setSelectedCompany(operationToEdit.companyId || '');
        setSelectedAccountSideId(operationToEdit.accountSideId || 0);
        
        if (operationToEdit.accountSideName) {
          setAccountSideSearchTerm(operationToEdit.accountSideName);
        }
        
        // در حالت ویرایش، اطلاعات چک‌ها رو هم پر کن
        if (operationToEdit.cheques && operationToEdit.cheques.length > 0) {
          setChecks(operationToEdit.cheques);
          if (operationToEdit.amountCash && operationToEdit.amountCash > 0 && operationToEdit.amountCheque && operationToEdit.amountCheque > 0) {
            setPaymentType('both');
            setCashAmount(operationToEdit.amountCash.toString());
          } else if (operationToEdit.amountCash > 0) {
            setPaymentType('cash');
            setFormData(prev => ({ ...prev, amount: operationToEdit.amountCash }));
          } else if (operationToEdit.amountCheque > 0) {
            setPaymentType('check');
          }
        } else if (operationToEdit.amountCash > 0) {
          setPaymentType('cash');
          setFormData(prev => ({ ...prev, amount: operationToEdit.amountCash }));
        }
        
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
      if (accountSideRef.current && !accountSideRef.current.contains(event.target)) {
        setShowAccountSideDropdown(false);
      }
      if (checkDateRef.current && !checkDateRef.current.contains(event.target)) {
        setShowCheckDatePicker(false);
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
                    value={formData.projectId || ''}
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
                    value={formData.bankId || ''}
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
                    type="number"
                    name="paymentOrderNumber"
                    value={formData.paymentOrderNumber || ''}
                    onChange={handleChange}
                    placeholder="مثال: 1403001"
                    className={errors.paymentOrderNumber ? 'error' : ''}
                    disabled={loading}
                  />
                  {errors.paymentOrderNumber && <span className="error-message">{errors.paymentOrderNumber}</span>}
                </div>

                {/* فیلد طرف حساب */}
                <div className="form-group" ref={accountSideRef}>
                  <label>طرف حساب</label>
                  <div className="account-side-wrapper">
                    <input
                      type="text"
                      value={accountSideSearchTerm}
                      onChange={(e) => handleAccountSideSearch(e.target.value)}
                      onClick={handleAccountSideInputClick}
                      placeholder="جستجو و انتخاب طرف حساب..."
                      disabled={loading || loadingAccountSides}
                      autoComplete="off"
                    />
                    {loadingAccountSides && (
                      <div className="account-side-loading">
                        <LoadingSpinner size="small" />
                      </div>
                    )}
                    {showAccountSideDropdown && (
                      <div className="account-side-dropdown">
                        {filteredAccountSides.length > 0 ? (
                          filteredAccountSides.map(account => (
                            <div
                              key={account.id}
                              className="account-side-item"
                              onClick={() => handleAccountSideSelect(account)}
                            >
                              <span className="account-side-name">{account.name}</span>
                              {account.code && (
                                <span className="account-side-code">({account.code})</span>
                              )}
                            </div>
                          ))
                        ) : (
                          <div className="account-side-no-data">
                            {accountSideSearchTerm ? 'نتیجه‌ای یافت نشد' : 'موردی برای نمایش وجود ندارد'}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* مرحله 6: نوع پرداخت و مدیریت چک‌ها */}
            <div className="form-section">
              <div className="section-title">
                <span className="section-number">6</span>
                <span>نوع پرداخت</span>
              </div>
              
              <div className="form-group">
                <label>نوع پرداخت <span className="required">*</span></label>
                <div className="payment-type-buttons">
                  <button
                    type="button"
                    className={`payment-type-btn ${paymentType === 'cash' ? 'active' : ''}`}
                    onClick={() => handlePaymentTypeChange('cash')}
                  >
                    <span>💰</span>
                    نقد
                  </button>
                  <button
                    type="button"
                    className={`payment-type-btn ${paymentType === 'check' ? 'active' : ''}`}
                    onClick={() => handlePaymentTypeChange('check')}
                  >
                    <span>📝</span>
                    چک
                  </button>
                  <button
                    type="button"
                    className={`payment-type-btn ${paymentType === 'both' ? 'active' : ''}`}
                    onClick={() => handlePaymentTypeChange('both')}
                  >
                    <span>🔄</span>
                    نقد و چک
                  </button>
                </div>
              </div>

              {/* حالت نقد */}
              {paymentType === 'cash' && (
                <div className="form-group">
                  <label>مبلغ (ریال) <span className="required">*</span></label>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount || ''}
                    onChange={handleChange}
                    placeholder="مبلغ را وارد کنید"
                    className={errors.amount ? 'error' : ''}
                    disabled={loading}
                  />
                  {errors.amount && <span className="error-message">{errors.amount}</span>}
                </div>
              )}

              {/* حالت چک */}
              {paymentType === 'check' && (
                <div className="checks-section">
                  <div className="checks-header">
                    <label>لیست چک‌ها <span className="required">*</span></label>
                    <button type="button" className="add-check-btn" onClick={openAddCheckModal}>
                      + اضافه کردن چک
                    </button>
                  </div>
                  
                  {checks.length > 0 ? (
                    <div className="checks-table">
                      <table>
                        <thead>
                          <tr>
                            <th>شماره چک</th>
                            <th>تاریخ چک</th>
                            <th>مبلغ (ریال)</th>
                            <th>بانک</th>
                            <th>وضعیت</th>
                            <th>توضیحات</th>
                            <th>عملیات</th>
                          </tr>
                        </thead>
                        <tbody>
                          {checks.map((check, index) => (
                            <tr key={index}>
                              <td>{check.serialNumber}</td>
                              <td>{check.chequeDate_Persion || convertToPersianDate(check.chequeDate)}</td>
                              <td>{Number(check.amount).toLocaleString()}</td>
                              <td>{check.bankName || '-'}</td>
                              <td>
                                {paymentChequeStatuses.find(s => s.id === check.paymentChequeStatus)?.name || '-'}
                              </td>
                              <td>{check.desc || '-'}</td>
                              <td>
                                <button type="button" className="edit-check-btn" onClick={() => openEditCheckModal(index)}>
                                  ✏️
                                </button>
                                <button type="button" className="delete-check-btn" onClick={() => removeCheck(index)}>
                                  🗑️
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr className="total-row">
                            <td colSpan="2">جمع کل</td>
                            <td colSpan="5">{getTotalChecksAmount().toLocaleString()} ریال</td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  ) : (
                    <div className="no-checks-message">
                      <p>هیچ چکی ثبت نشده است</p>
                      <button type="button" className="add-first-check-btn" onClick={openAddCheckModal}>
                        + ثبت چک جدید
                      </button>
                    </div>
                  )}
                  {errors.checks && <span className="error-message">{errors.checks}</span>}
                </div>
              )}

              {/* حالت نقد و چک */}
              {paymentType === 'both' && (
                <>
                  <div className="form-group">
                    <label>مبلغ نقد (ریال) <span className="required">*</span></label>
                    <input
                      type="number"
                      value={cashAmount}
                      onChange={(e) => setCashAmount(e.target.value)}
                      placeholder="مبلغ نقد را وارد کنید"
                      className={errors.cashAmount ? 'error' : ''}
                      disabled={loading}
                    />
                    {errors.cashAmount && <span className="error-message">{errors.cashAmount}</span>}
                  </div>

                  <div className="checks-section">
                    <div className="checks-header">
                      <label>لیست چک‌ها <span className="required">*</span></label>
                      <button type="button" className="add-check-btn" onClick={openAddCheckModal}>
                        + اضافه کردن چک
                      </button>
                    </div>
                    
                    {checks.length > 0 ? (
                      <div className="checks-table">
                        <table>
                          <thead>
                            <tr>
                              <th>شماره چک</th>
                              <th>تاریخ چک</th>
                              <th>مبلغ (ریال)</th>
                              <th>بانک</th>
                              <th>وضعیت</th>
                              <th>توضیحات</th>
                              <th>عملیات</th>
                            </tr>
                          </thead>
                          <tbody>
                            {checks.map((check, index) => (
                              <tr key={index}>
                                <td>{check.serialNumber}</td>
                                <td>{check.chequeDate_Persion || convertToPersianDate(check.chequeDate)}</td>
                                <td>{Number(check.amount).toLocaleString()}</td>
                                <td>{check.bankName || '-'}</td>
                                <td>
                                  {paymentChequeStatuses.find(s => s.id === check.paymentChequeStatus)?.name || '-'}
                                </td>
                                <td>{check.desc || '-'}</td>
                                <td>
                                  <button type="button" className="edit-check-btn" onClick={() => openEditCheckModal(index)}>
                                    ✏️
                                  </button>
                                  <button type="button" className="delete-check-btn" onClick={() => removeCheck(index)}>
                                    🗑️
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                          <tfoot>
                            <tr className="total-row">
                              <td colSpan="2">جمع کل چک‌ها</td>
                              <td colSpan="5">{getTotalChecksAmount().toLocaleString()} ریال</td>
                            </tr>
                            <tr className="grand-total-row">
                              <td colSpan="2">جمع کل (نقد + چک)</td>
                              <td colSpan="5">{(Number(cashAmount) + getTotalChecksAmount()).toLocaleString()} ریال</td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    ) : (
                      <div className="no-checks-message">
                        <p>هیچ چکی ثبت نشده است</p>
                        <button type="button" className="add-first-check-btn" onClick={openAddCheckModal}>
                          + ثبت چک جدید
                        </button>
                      </div>
                    )}
                    {errors.checks && <span className="error-message">{errors.checks}</span>}
                  </div>
                </>
              )}
            </div>

            {/* مرحله 7: تاریخ‌ها */}
            <div className="form-section">
              <div className="section-title">
                <span className="section-number">7</span>
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

      {/* مودال افزودن/ویرایش چک - مطابق با ساختار JSON */}
      {showCheckModal && (
        <div className="check-modal-overlay" onClick={() => setShowCheckModal(false)}>
          <div className="check-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="check-modal-header">
              <h3>{editingCheckIndex !== null ? '✏️ ویرایش چک' : '➕ افزودن چک جدید'}</h3>
              <button className="check-modal-close" onClick={() => setShowCheckModal(false)}>×</button>
            </div>
            <div className="check-modal-body">
              <div className="form-group">
                <label>شماره چک <span className="required">*</span></label>
                <input
                  type="text"
                  value={currentCheck.serialNumber}
                  onChange={(e) => setCurrentCheck({...currentCheck, serialNumber: e.target.value})}
                  placeholder="شماره چک را وارد کنید"
                />
              </div>
              <div className="form-group">
                <label>مبلغ (ریال) <span className="required">*</span></label>
                <input
                  type="number"
                  value={currentCheck.amount || ''}
                  onChange={(e) => setCurrentCheck({...currentCheck, amount: Number(e.target.value)})}
                  placeholder="مبلغ چک را وارد کنید"
                />
              </div>
              <div className="form-group date-picker-group" ref={checkDateRef}>
                <label>تاریخ چک <span className="required">*</span></label>
                <div className="date-input-wrapper">
                  <input
                    type="text"
                    value={currentCheck.chequeDate_Persion || formatPersianDate(currentCheck.chequeDate)}
                    onClick={() => setShowCheckDatePicker(!showCheckDatePicker)}
                    placeholder="انتخاب تاریخ چک"
                    readOnly
                  />
                  <span className="calendar-icon">📅</span>
                </div>
                {showCheckDatePicker && (
                  <div className="calendar-popup">
                    <Calendar
                      onChange={handleCheckDateSelect}
                      value={currentCheck.chequeDate ? new Date(currentCheck.chequeDate) : new Date()}
                      locale="fa"
                    />
                  </div>
                )}
              </div>
              <div className="form-group">
                <label>نام بانک</label>
                <input
                  type="text"
                  value={currentCheck.bankName}
                  onChange={(e) => setCurrentCheck({...currentCheck, bankName: e.target.value})}
                  placeholder="نام بانک صادرکننده چک"
                />
              </div>
              <div className="form-group">
                <label>وضعیت چک</label>
                <select
                  value={currentCheck.paymentChequeStatus || 0}
                  onChange={(e) => setCurrentCheck({...currentCheck, paymentChequeStatus: Number(e.target.value)})}
                >
                  {paymentChequeStatuses.map(status => (
                    <option key={status.id} value={status.id}>{status.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>توضیحات</label>
                <textarea
                  value={currentCheck.desc}
                  onChange={(e) => setCurrentCheck({...currentCheck, desc: e.target.value})}
                  placeholder="توضیحات اضافی..."
                  rows="2"
                />
              </div>
            </div>
            <div className="check-modal-footer">
              <button type="button" className="btn-cancel" onClick={() => setShowCheckModal(false)}>
                انصراف
              </button>
              <button type="button" className="btn-submit" onClick={saveCheck}>
                {editingCheckIndex !== null ? 'ویرایش' : 'افزودن'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateEditFinancialModal;