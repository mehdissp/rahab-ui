// // // // src/components/page/financial/CreateFinancialModal.jsx
// // // import React, { useState, useEffect } from 'react';
// // // import { financialService } from '../../../services/financial';
// // // import { toast } from 'react-toastify';
// // // import './CreateFinancialModal.css';

// // // const CreateFinancialModal = ({ isOpen, onClose, onSuccess, parentItem, editItem, isEditMode = false }) => {
// // //   const [formData, setFormData] = useState({
// // //     title: '',
// // //     financial_transactions: 1, // 1: Out, 2: In
// // //   });
// // //   const [loading, setLoading] = useState(false);
// // //   const [errors, setErrors] = useState({});

// // //   useEffect(() => {
// // //     if (isEditMode && editItem) {
// // //       setFormData({
// // //         title: editItem.title || '',
// // //         financial_transactions: editItem.financial_transactions || 1,
// // //       });
// // //     } else {
// // //       setFormData({
// // //         title: '',
// // //         financial_transactions: 1,
// // //       });
// // //     }
// // //   }, [isEditMode, editItem, isOpen]);

// // //   const validate = () => {
// // //     const newErrors = {};
// // //     if (!formData.title.trim()) {
// // //       newErrors.title = 'عنوان صورت مالی الزامی است';
// // //     }
// // //     setErrors(newErrors);
// // //     return Object.keys(newErrors).length === 0;
// // //   };

// // //   const handleChange = (e) => {
// // //     const { name, value } = e.target;
// // //     setFormData(prev => ({
// // //       ...prev,
// // //       [name]: value
// // //     }));
// // //     if (errors[name]) {
// // //       setErrors(prev => ({ ...prev, [name]: '' }));
// // //     }
// // //   };

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
    
// // //     if (!validate()) return;
    
// // //     setLoading(true);
// // //     try {
// // //       const data = {
// // //         title: formData.title,
// // //         financial_transactions: parseInt(formData.financial_transactions),
// // //         parentId: parentItem?.id || null
// // //       };

// // //       if (isEditMode && editItem) {
// // //         await financialService.updateFinancialItem(editItem.id, data);
// // //         toast.success('صورت مالی با موفقیت ویرایش شد');
// // //       } else {
// // //         await financialService.createFinancialItem(data);
// // //         toast.success(parentItem 
// // //           ? 'زیرمجموعه با موفقیت ایجاد شد' 
// // //           : 'صورت مالی با موفقیت ایجاد شد');
// // //       }
      
// // //       onSuccess();
// // //       onClose();
// // //     } catch (err) {
// // //       console.error('Error saving financial item:', err);
// // //       toast.error(err.response?.data?.data?.message || 'خطا در ذخیره اطلاعات');
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   if (!isOpen) return null;

// // //   return (
// // //     <div className="modal-overlay" onClick={onClose}>
// // //       <div className="modal-container" onClick={(e) => e.stopPropagation()}>
// // //         <div className="modal-header">
// // //           <h2>{isEditMode ? 'ویرایش صورت مالی' : (parentItem ? 'افزودن زیرمجموعه' : 'ایجاد صورت مالی جدید')}</h2>
// // //           <button className="modal-close" onClick={onClose}>×</button>
// // //         </div>

// // //         <form onSubmit={handleSubmit}>
// // //           <div className="modal-body">
// // //             {parentItem && (
// // //               <div className="info-box">
// // //                 <span className="info-label">زیرمجموعه:</span>
// // //                 <span className="info-value">{parentItem.title}</span>
// // //               </div>
// // //             )}

// // //             <div className="form-group">
// // //               <label htmlFor="title">عنوان صورت مالی <span className="required">*</span></label>
// // //               <input
// // //                 type="text"
// // //                 id="title"
// // //                 name="title"
// // //                 value={formData.title}
// // //                 onChange={handleChange}
// // //                 placeholder="مثال: صورت مالی سال ۱۴۰۳"
// // //                 className={errors.title ? 'error' : ''}
// // //                 autoFocus
// // //               />
// // //               {errors.title && <span className="error-message">{errors.title}</span>}
// // //             </div>

// // //             <div className="form-group">
// // //               <label htmlFor="financial_transactions">نوع تراکنش</label>
// // //               <select
// // //                 id="financial_transactions"
// // //                 name="financial_transactions"
// // //                 value={formData.financial_transactions}
// // //                 onChange={handleChange}
// // //               >
// // //                 <option value={1}>خروجی (Out)</option>
// // //                 <option value={2}>ورودی (In)</option>
// // //               </select>
// // //             </div>
// // //           </div>

// // //           <div className="modal-footer">
// // //             <button type="button" className="btn-cancel" onClick={onClose}>
// // //               انصراف
// // //             </button>
// // //             <button type="submit" className="btn-submit" disabled={loading}>
// // //               {loading ? 'در حال ذخیره...' : (isEditMode ? 'ویرایش' : 'ایجاد')}
// // //             </button>
// // //           </div>
// // //         </form>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default CreateFinancialModal;

// // import React, { useState, useEffect } from 'react';
// // import { financialService } from '../../../services/financial';
// // import { toast } from 'react-toastify';
// // import './CreateFinancialModal.css';

// // const CreateFinancialModal = ({ isOpen, onClose, onSuccess, parentItem, editItem, isEditMode = false }) => {
// //   const [formData, setFormData] = useState({
// //     title: '',
// //     financial_transactions: 1,
// //   });
// //   const [loading, setLoading] = useState(false);
// //   const [errors, setErrors] = useState({});

// //   useEffect(() => {
// //     if (isOpen) {
// //       if (isEditMode && editItem) {
// //         setFormData({
// //           title: editItem.title || '',
// //           financial_transactions: editItem.financial_transactions || 1,
// //         });
// //       } else {
// //         setFormData({
// //           title: '',
// //           financial_transactions: 1,
// //         });
// //       }
// //       setErrors({});
// //     }
// //   }, [isOpen, isEditMode, editItem]);

// //   const validate = () => {
// //     const newErrors = {};
// //     if (!formData.title.trim()) {
// //       newErrors.title = 'عنوان صورت مالی الزامی است';
// //     }
// //     setErrors(newErrors);
// //     return Object.keys(newErrors).length === 0;
// //   };

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData(prev => ({
// //       ...prev,
// //       [name]: value
// //     }));
// //     if (errors[name]) {
// //       setErrors(prev => ({ ...prev, [name]: '' }));
// //     }
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
    
// //     if (!validate()) return;
    
// //     setLoading(true);
// //     try {
// //       const data = {
// //         title: formData.title,
// //         financial_transactions: parseInt(formData.financial_transactions),
// //         parentId: parentItem?.id || null
// //       };

// //       if (isEditMode && editItem) {
// //         await financialService.updateFinancialItem(editItem.id, data);
// //         toast.success('صورت مالی با موفقیت ویرایش شد');
// //       } else {
// //         await financialService.createFinancialItem(data);
// //         toast.success(parentItem 
// //           ? 'زیرمجموعه با موفقیت ایجاد شد' 
// //           : 'صورت مالی با موفقیت ایجاد شد');
// //       }
      
// //       onSuccess();
// //       onClose();
// //     } catch (err) {
// //       console.error('Error saving financial item:', err);
// //       toast.error(err.response?.data?.data?.message || 'خطا در ذخیره اطلاعات');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   if (!isOpen) return null;

// //   return (
// //     <div className="financial-modal-overlay" onClick={onClose}>
// //       <div className="financial-modal-container" onClick={(e) => e.stopPropagation()}>
// //         <div className="financial-modal-header">
// //           <h2>{isEditMode ? 'ویرایش صورت مالی' : (parentItem ? 'افزودن زیرمجموعه' : 'ایجاد صورت مالی جدید')}</h2>
// //           <button className="financial-modal-close" onClick={onClose}>×</button>
// //         </div>

// //         <form onSubmit={handleSubmit}>
// //           <div className="financial-modal-body">
// //             {parentItem && (
// //               <div className="info-box">
// //                 <span className="info-label">زیرمجموعه:</span>
// //                 <span className="info-value">{parentItem.title}</span>
// //               </div>
// //             )}

// //             <div className="form-group">
// //               <label htmlFor="title">عنوان صورت مالی <span className="required">*</span></label>
// //               <input
// //                 type="text"
// //                 id="title"
// //                 name="title"
// //                 value={formData.title}
// //                 onChange={handleChange}
// //                 placeholder="مثال: صورت مالی سال ۱۴۰۳"
// //                 className={errors.title ? 'error' : ''}
// //                 autoFocus
// //               />
// //               {errors.title && <span className="error-message">{errors.title}</span>}
// //             </div>

// //             <div className="form-group">
// //               <label htmlFor="financial_transactions">نوع تراکنش</label>
// //               <select
// //                 id="financial_transactions"
// //                 name="financial_transactions"
// //                 value={formData.financial_transactions}
// //                 onChange={handleChange}
// //               >
// //                 <option value={1}>خروجی (Out)</option>
// //                 <option value={2}>ورودی (In)</option>
// //               </select>
// //             </div>
// //           </div>

// //           <div className="financial-modal-footer">
// //             <button type="button" className="btn-cancel" onClick={onClose}>
// //               انصراف
// //             </button>
// //             <button type="submit" className="btn-submit" disabled={loading}>
// //               {loading ? 'در حال ذخیره...' : (isEditMode ? 'ویرایش' : 'ایجاد')}
// //             </button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CreateFinancialModal;

// import React, { useState, useEffect } from 'react';
// import { financialService } from '../../../services/financial';
// import { toast } from 'react-toastify';
// import './CreateFinancialModal.css';

// const CreateFinancialModal = ({ isOpen, onClose, onSuccess, parentItem, editItem, isEditMode = false }) => {
//   const [formData, setFormData] = useState({
//     title: '',
//     financial_transactions: 1,
//   });
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});

//   // محاسبه نوع تراکنش پیش‌فرض (از والد یا خود آیتم)
//   const getDefaultTransactionType = () => {
//     if (isEditMode && editItem) {
//       return editItem.financial_transactions || 1;
//     }
//     if (parentItem) {
//       return parentItem.financial_transactions || 1;
//     }
//     return 1; // پیش‌فرض: خروجی
//   };

//   // دریافت عنوان نمایشی نوع تراکنش
//   const getTransactionTypeLabel = (type) => {
//     return type === 1 ? 'خروجی (Out)' : 'ورودی (In)';
//   };

//   useEffect(() => {
//     if (isOpen) {
//       if (isEditMode && editItem) {
//         setFormData({
//           title: editItem.title || '',
//           financial_transactions: editItem.financial_transactions || 1,
//         });
//       } else {
//         // برای ایجاد جدید، نوع تراکنش از والد گرفته می‌شود
//         setFormData({
//           title: '',
//           financial_transactions: parentItem?.financial_transactions || 1,
//         });
//       }
//       setErrors({});
//     }
//   }, [isOpen, isEditMode, editItem, parentItem]);

//   const validate = () => {
//     const newErrors = {};
//     if (!formData.title.trim()) {
//       newErrors.title = 'عنوان صورت مالی الزامی است';
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: '' }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validate()) return;
    
//     setLoading(true);
//     try {
//       const data = {
//         title: formData.title,
//         financial_transactions: formData.financial_transactions, // از state گرفته می‌شود
//         parentId: parentItem?.id || null
//       };

//       if (isEditMode && editItem) {
//         await financialService.updateFinancialItem(editItem.id, data);
//         toast.success('صورت مالی با موفقیت ویرایش شد');
//       } else {
//         await financialService.createFinancialItem(data);
//         toast.success(parentItem 
//           ? 'زیرمجموعه با موفقیت ایجاد شد' 
//           : 'صورت مالی با موفقیت ایجاد شد');
//       }
      
//       onSuccess();
//       onClose();
//     } catch (err) {
//       console.error('Error saving financial item:', err);
//       toast.error(err.response?.data?.data?.message || 'خطا در ذخیره اطلاعات');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!isOpen) return null;

//   const transactionType = getDefaultTransactionType();
//   const isChild = !!parentItem; // آیا این یک زیرمجموعه است؟

//   return (
//     <div className="financial-modal-overlay" onClick={onClose}>
//       <div className="financial-modal-container" onClick={(e) => e.stopPropagation()}>
//         <div className="financial-modal-header">
//           <h2>{isEditMode ? 'ویرایش صورت مالی' : (parentItem ? 'افزودن زیرمجموعه' : 'ایجاد صورت مالی جدید')}</h2>
//           <button className="financial-modal-close" onClick={onClose}>×</button>
//         </div>

//         <form onSubmit={handleSubmit}>
//           <div className="financial-modal-body">
//             {parentItem && (
//               <div className="info-box">
//                 <div className="info-row">
//                   <span className="info-label">زیرمجموعه:</span>
//                   <span className="info-value">{parentItem.title}</span>
//                 </div>
//                 <div className="info-row">
//                   <span className="info-label">نوع تراکنش:</span>
//                   <span className="info-value">{getTransactionTypeLabel(parentItem.financial_transactions)}</span>
//                 </div>
//               </div>
//             )}

//             <div className="form-group">
//               <label htmlFor="title">عنوان صورت مالی <span className="required">*</span></label>
//               <input
//                 type="text"
//                 id="title"
//                 name="title"
//                 value={formData.title}
//                 onChange={handleChange}
//                 placeholder={parentItem ? "مثال: گزارش دی ماه" : "مثال: صورت مالی سال ۱۴۰۳"}
//                 className={errors.title ? 'error' : ''}
//                 autoFocus
//               />
//               {errors.title && <span className="error-message">{errors.title}</span>}
//             </div>

//             {/* نمایش نوع تراکنش به صورت فقط خواندنی برای زیرمجموعه‌ها */}
//             {isChild && !isEditMode && (
//               <div className="form-group readonly-group">
//                 <label>نوع تراکنش</label>
//                 <div className="readonly-value">
//                   <span className={`transaction-badge ${transactionType === 1 ? 'transaction-out' : 'transaction-in'}`}>
//                     {getTransactionTypeLabel(transactionType)}
//                   </span>
//                   <small className="readonly-hint">(از والد گرفته شده است)</small>
//                 </div>
//               </div>
//             )}

//             {/* برای آیتم ریشه در حالت ویرایش، نوع تراکنش قابل تغییر است */}
//             {!isChild && isEditMode && (
//               <div className="form-group">
//                 <label htmlFor="financial_transactions">نوع تراکنش</label>
//                 <select
//                   id="financial_transactions"
//                   name="financial_transactions"
//                   value={formData.financial_transactions}
//                   onChange={handleChange}
//                 >
//                   <option value={1}>خروجی (Out)</option>
//                   <option value={2}>ورودی (In)</option>
//                 </select>
//               </div>
//             )}

//             {/* نمایش نوع تراکنش برای آیتم ریشه در حالت ایجاد */}
//             {!isChild && !isEditMode && (
//               <div className="form-group">
//                 <label htmlFor="financial_transactions">نوع تراکنش</label>
//                 <select
//                   id="financial_transactions"
//                   name="financial_transactions"
//                   value={formData.financial_transactions}
//                   onChange={handleChange}
//                 >
//                   <option value={1}>خروجی (Out)</option>
//                   <option value={2}>ورودی (In)</option>
//                 </select>
//               </div>
//             )}
//           </div>

//           <div className="financial-modal-footer">
//             <button type="button" className="btn-cancel" onClick={onClose}>
//               انصراف
//             </button>
//             <button type="submit" className="btn-submit" disabled={loading}>
//               {loading ? 'در حال ذخیره...' : (isEditMode ? 'ویرایش' : 'ایجاد')}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateFinancialModal;

import React, { useState, useEffect } from 'react';
import { financialService } from '../../../services/financial';
import { toast } from 'react-toastify';
import './CreateFinancialModal.css';

const CreateFinancialModal = ({ isOpen, onClose, onSuccess, parentItem, editItem, isEditMode = false }) => {
  const [formData, setFormData] = useState({
    title: '',
    financial_transactions: 1,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // محاسبه مقدار پیش‌فرض برای financial_transactions (1: خروجی, 2: ورودی)
  const getDefaultTransactionType = () => {
    if (isEditMode && editItem) {
      // اگر در حالت ویرایش هستیم و آیتم فرزند است، مقدار را از والد بگیر
      if (editItem.parentId && editItem.parentTransactionType) {
        return editItem.parentTransactionType;
      }
      return editItem.financial_transactions || 1;
    }
    if (parentItem) {
      return parentItem.financial_transactions || 1;
    }
    return 1; // پیش‌فرض: خروجی
  };

  // دریافت عنوان نمایشی نوع تراکنش
  const getTransactionTypeLabel = (type) => {
    return type === 1 ? 'خروجی (Out)' : 'ورودی (In)';
  };

  // بررسی اینکه آیا آیتم جاری فرزند است یا خیر
  const isChildItem = () => {
    if (isEditMode && editItem) {
      // در حالت ویرایش، بررسی کنیم که آیا آیتم دارای parentId است یا خیر
      return editItem.parentId !== null && editItem.parentId !== undefined;
    }
    // در حالت ایجاد، اگر parentItem وجود داشته باشد یعنی در حال ایجاد زیرمجموعه هستیم
    return !!parentItem;
  };

  // بررسی اینکه آیا فیلد نوع تراکنش باید غیرفعال باشد
  const isTransactionTypeDisabled = () => {
    // اگر آیتم فرزند است، نوع تراکنش غیرقابل تغییر است (از والد به ارث می‌رسد)
    return isChildItem();
  };

  // دریافت مقدار واقعی نوع تراکنش که باید ذخیره شود
  const getActualTransactionType = () => {
    if (isChildItem()) {
      if (isEditMode && editItem?.parentTransactionType) {
        return editItem.parentTransactionType;
      }
      if (parentItem?.financial_transactions) {
        return parentItem.financial_transactions;
      }
    }
    return formData.financial_transactions;
  };

  // دریافت اطلاعات والد برای نمایش به کاربر
  const getParentInfo = () => {
    if (isEditMode && editItem && editItem.parentId) {
      return {
        title: editItem.parentTitle || 'والد',
        transactionType: editItem.parentTransactionType || editItem.financial_transactions || 1
      };
    }
    if (parentItem) {
      return {
        title: parentItem.title,
        transactionType: parentItem.financial_transactions || 1
      };
    }
    return null;
  };

  useEffect(() => {
    if (isOpen) {
      if (isEditMode && editItem) {
        // حالت ویرایش
        let transactionValue;
        
        if (isChildItem() && editItem.parentTransactionType) {
          // اگر فرزند است، مقدار را از والد بگیر
          transactionValue = editItem.parentTransactionType;
        } else {
          // اگر ریشه است، مقدار خودش را بگیر
          transactionValue = editItem.financial_transactions || 1;
        }
        
        setFormData({
          title: editItem.title || '',
          financial_transactions: transactionValue,
        });
      } else {
        // حالت ایجاد جدید
        setFormData({
          title: '',
          financial_transactions: getDefaultTransactionType(),
        });
      }
      setErrors({});
    }
  }, [isOpen, isEditMode, editItem, parentItem]);

  const validate = () => {
    const newErrors = {};
    if (!formData.title || !formData.title.trim()) {
      newErrors.title = 'عنوان صورت مالی الزامی است';
    }
    if (formData.title && formData.title.length > 200) {
      newErrors.title = 'عنوان نمی‌تواند بیشتر از 200 کاراکتر باشد';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'financial_transactions' ? parseInt(value) : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setLoading(true);
    try {
      // تعیین مقدار نهایی financial_transactions
      const finalTransactionType = getActualTransactionType();
      
      const data = {
        title: formData.title.trim(),
        financial_transactions: finalTransactionType,
        parentId: parentItem?.id || (editItem?.parentId) || null
      };

      if (isEditMode && editItem) {
        // در حالت ویرایش، ID را به همراه داده‌ها ارسال می‌کنیم
        await financialService.updateFinancialItem(editItem.id, data);
        toast.success('صورت مالی با موفقیت ویرایش شد');
      } else {
        await financialService.createFinancialItem(data);
        if (parentItem) {
          toast.success(`زیرمجموعه "${formData.title}" با موفقیت ایجاد شد`);
        } else {
          toast.success(`صورت مالی "${formData.title}" با موفقیت ایجاد شد`);
        }
      }
      
      onSuccess();
      onClose();
    } catch (err) {
      console.error('Error saving financial item:', err);
      const errorMessage = err.response?.data?.data?.message || 
                          err.response?.data?.message || 
                          'خطا در ذخیره اطلاعات';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const isChild = isChildItem();
  const disableTransactionField = isTransactionTypeDisabled();
  const parentInfo = getParentInfo();
  const displayTransactionType = getDefaultTransactionType();

  // تعیین عنوان مودال
  const getModalTitle = () => {
    if (isEditMode) {
      if (isChild) {
        return 'ویرایش زیرمجموعه';
      }
      return 'ویرایش صورت مالی';
    }
    if (parentItem) {
      return 'افزودن زیرمجموعه';
    }
    return 'ایجاد صورت مالی جدید';
  };

  // تعیین دکمه submit
  const getSubmitButtonText = () => {
    if (loading) return 'در حال ذخیره...';
    if (isEditMode) return 'ویرایش';
    return 'ایجاد';
  };

  return (
    <div className="financial-modal-overlay" onClick={onClose}>
      <div className="financial-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="financial-modal-header">
          <h2>{getModalTitle()}</h2>
          <button className="financial-modal-close" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="financial-modal-body">
            {/* نمایش اطلاعات والد */}
            {parentInfo && (
              <div className="info-box">
                <div className="info-row">
                  <span className="info-label">والد:</span>
                  <span className="info-value">{parentInfo.title}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">نوع تراکنش والد:</span>
                  <span className="info-value">
                    <span className={`transaction-badge ${parentInfo.transactionType === 1 ? 'transaction-out' : 'transaction-in'}`}>
                      {getTransactionTypeLabel(parentInfo.transactionType)}
                    </span>
                  </span>
                </div>
                {isChild && (
                  <div className="info-row inheritance-notice">
                    <span className="info-label">توجه:</span>
                    <span className="info-value notice-text">
                      ⚠️ این آیتم نوع تراکنش را از والد به ارث می‌برد و قابل تغییر نیست
                    </span>
                  </div>
                )}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="title">
                عنوان صورت مالی 
                <span className="required">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder={parentItem ? "مثال: گزارش دی ماه" : "مثال: صورت مالی سال ۱۴۰۳"}
                className={errors.title ? 'error' : ''}
                autoFocus
                maxLength="200"
              />
              {errors.title && <span className="error-message">{errors.title}</span>}
              <small className="field-hint">
                {formData.title.length}/200 کاراکتر
              </small>
            </div>

            {/* نمایش نوع تراکنش برای زیرمجموعه‌ها (فقط خواندنی) */}
            {disableTransactionField && (
              <div className="form-group readonly-group">
                <label>نوع تراکنش</label>
                <div className="readonly-value">
                  <span className={`transaction-badge ${displayTransactionType === 1 ? 'transaction-out' : 'transaction-in'}`}>
                    {getTransactionTypeLabel(displayTransactionType)}
                  </span>
                  <small className="readonly-hint">
                    {isEditMode ? '(از والد به ارث رسیده و غیرقابل تغییر)' : '(از والد به ارث می‌رسد)'}
                  </small>
                </div>
                <input
                  type="hidden"
                  name="financial_transactions"
                  value={displayTransactionType}
                />
              </div>
            )}

            {/* نمایش و امکان تغییر نوع تراکنش برای آیتم‌های ریشه */}
            {!disableTransactionField && (
              <div className="form-group">
                <label htmlFor="financial_transactions">نوع تراکنش</label>
                <select
                  id="financial_transactions"
                  name="financial_transactions"
                  value={formData.financial_transactions}
                  onChange={handleChange}
                >
                  <option value={1}>خروجی (Out)</option>
                  <option value={2}>ورودی (In)</option>
                </select>
                <small className="field-hint">
                  💡 توجه: پس از ایجاد زیرمجموعه برای این آیتم، نوع تراکنش به همه زیرمجموعه‌ها ارث‌بری می‌شود
                </small>
              </div>
            )}
          </div>

          <div className="financial-modal-footer">
            <button 
              type="button" 
              className="btn-cancel" 
              onClick={onClose}
              disabled={loading}
            >
              انصراف
            </button>
            <button 
              type="submit" 
              className="btn-submit" 
              disabled={loading}
            >
              {getSubmitButtonText()}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateFinancialModal;