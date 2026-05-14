
// // // // // export default DocumentsPayable;
// // // // // DocumentsPayable.jsx - نسخه کامل با هشدار تاریخ (فقط میلادی)
// // // // import React, { useState, useEffect, useCallback, useRef } from 'react';
// // // // import { documentsPayableService } from '../../../services/documentsPayable';
// // // // import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner';
// // // // import Pagination from '../../common/Pagination/Pagination';
// // // // import { toast, ToastContainer } from 'react-toastify';
// // // // import 'react-toastify/dist/ReactToastify.css';
// // // // import { 
// // // //   FaSearch, 
// // // //   FaRedo, 
// // // //   FaFileInvoiceDollar,
// // // //   FaMoneyBillWave,
// // // //   FaCalendarAlt,
// // // //   FaBuilding,
// // // //   FaHashtag,
// // // //   FaTimes
// // // // } from 'react-icons/fa';
// // // // import './DocumentsPayable.css';

// // // // const DocumentsPayable = () => {
// // // //   const [activeTab, setActiveTab] = useState('incoming');
// // // //   const [items, setItems] = useState([]);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [searchTerm, setSearchTerm] = useState('');
// // // //   const [pagination, setPagination] = useState({
// // // //     currentPage: 1,
// // // //     pageSize: 10,
// // // //     totalCount: 0,
// // // //     totalPages: 0
// // // //   });
  
// // // //   const searchTimeoutRef = useRef(null);

// // // //   // تعیین id بر اساس تب فعال
// // // //   const getTabId = useCallback(() => {
// // // //     return activeTab === 'incoming' ? 1 : 2;
// // // //   }, [activeTab]);

// // // //   // تابع دریافت داده‌ها
// // // //   const fetchItems = useCallback(async (pageNumber, pageSize, search) => {
// // // //     try {
// // // //       setLoading(true);
      
// // // //       const id = getTabId();
      
// // // //       console.log('📡 Fetching data:', { id, pageNumber, pageSize, search });
      
// // // //       let response;
// // // //       if (activeTab === 'incoming') {
// // // //         response = await documentsPayableService.getIncomingDocuments(id, pageNumber, pageSize, search);
// // // //       } else {
// // // //         response = await documentsPayableService.getIncomingDocuments(id, pageNumber, pageSize, search);
// // // //       }
      
// // // //       console.log('✅ Response:', response);
      
// // // //       setItems(response?.items || []);
// // // //       setPagination({
// // // //         currentPage: pageNumber,
// // // //         pageSize: pageSize,
// // // //         totalCount: response?.totalCount || 0,
// // // //         totalPages: response?.totalPages || 0
// // // //       });
      
// // // //     } catch (err) {
// // // //       console.error('❌ Error fetching documents:', err);
// // // //       toast.error('خطا در دریافت اطلاعات', {
// // // //         position: "top-left",
// // // //         autoClose: 3000,
// // // //       });
// // // //       setItems([]);
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   }, [activeTab, getTabId]);

// // // //   // بارگذاری اولیه و هنگام تغییر تب یا pageSize
// // // //   useEffect(() => {
// // // //     setPagination(prev => ({ ...prev, currentPage: 1 }));
// // // //     fetchItems(1, pagination.pageSize, searchTerm);
// // // //   // eslint-disable-next-line react-hooks/exhaustive-deps
// // // //   }, [activeTab, pagination.pageSize]);

// // // //   // دیبونس سرچ
// // // //   useEffect(() => {
// // // //     if (searchTimeoutRef.current) {
// // // //       clearTimeout(searchTimeoutRef.current);
// // // //     }
    
// // // //     searchTimeoutRef.current = setTimeout(() => {
// // // //       if (searchTerm !== undefined) {
// // // //         console.log('🔍 Searching with term:', searchTerm);
// // // //         setPagination(prev => ({ ...prev, currentPage: 1 }));
// // // //         fetchItems(1, pagination.pageSize, searchTerm);
// // // //       }
// // // //     }, 500);
    
// // // //     return () => {
// // // //       if (searchTimeoutRef.current) {
// // // //         clearTimeout(searchTimeoutRef.current);
// // // //       }
// // // //     };
// // // //   // eslint-disable-next-line react-hooks/exhaustive-deps
// // // //   }, [searchTerm]);

// // // //   const handlePageChange = (pageNumber) => {
// // // //     setPagination(prev => ({ ...prev, currentPage: pageNumber }));
// // // //     fetchItems(pageNumber, pagination.pageSize, searchTerm);
// // // //   };

// // // //   const handlePageSizeChange = (newPageSize) => {
// // // //     setPagination(prev => ({
// // // //       ...prev,
// // // //       pageSize: newPageSize,
// // // //       currentPage: 1
// // // //     }));
// // // //   };

// // // //   const handleRetry = () => {
// // // //     fetchItems(pagination.currentPage, pagination.pageSize, searchTerm);
// // // //   };

// // // //   const handleSearchChange = (e) => {
// // // //     setSearchTerm(e.target.value);
// // // //   };

// // // //   const clearSearch = () => {
// // // //     setSearchTerm('');
// // // //   };

// // // //   const getStatusInfo = (status) => {
// // // //     const statusMap = {
// // // //       4: { text: 'خطا', color: '#ef4444', bg: '#fee2e2', icon: '❌' },
// // // //       0: { text: 'در انتظار', color: '#f59e0b', bg: '#fef3c7', icon: '⏳' },
// // // //       2: { text: 'تأیید شده', color: '#10b981', bg: '#d1fae5', icon: '✅' },
// // // //       3: { text: 'ابطال شده', color: '#6b7280', bg: '#f3f4f6', icon: '🚫' },
// // // //     };
// // // //     return statusMap[status] || { text: 'نامشخص', color: '#6b7280', bg: '#f3f4f6', icon: '❓' };
// // // //   };

// // // //   // فرمت تاریخ برای نمایش (فقط میلادی)
// // // //   const formatDate = (dateString) => {
// // // //     if (!dateString) return '---';
// // // //     // خروجی: 2026/05/13
// // // //     return dateString.split('T')[0].replace(/-/g, '/');
// // // //   };

// // // //   const formatAmount = (amount) => {
// // // //     if (!amount && amount !== 0) return '---';
// // // //     return amount.toLocaleString('fa-IR');
// // // //   };

// // // //   // ========== تابع هشدار تاریخ - فقط با تاریخ میلادی ==========
// // // //   const getDateWarningInfo = (chequeDate) => {
// // // //     if (!chequeDate) return null;
    
// // // //     try {
// // // //       // تاریخ امروز (میلادی)
// // // //       const today = new Date();
// // // //       today.setHours(0, 0, 0, 0);
      
// // // //       // استخراج تاریخ چک از فرمت "2026-05-13T00:00:00"
// // // //       let chequeDateStr = String(chequeDate);
// // // //       if (chequeDateStr.includes('T')) {
// // // //         chequeDateStr = chequeDateStr.split('T')[0];
// // // //       }
      
// // // //       const targetDate = new Date(chequeDateStr);
      
// // // //       // بررسی اعتبار تاریخ
// // // //       if (isNaN(targetDate.getTime())) return null;
      
// // // //       targetDate.setHours(0, 0, 0, 0);
      
// // // //       // محاسبه اختلاف روزها
// // // //       const diffTime = targetDate - today;
// // // //       const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
// // // //       // دیباگ برای بررسی
// // // //       console.log('📅 Date Check:', {
// // // //         chequeDate: chequeDateStr,
// // // //         today: today.toISOString().split('T')[0],
// // // //         diffDays: diffDays
// // // //       });
      
// // // //       // تعیین وضعیت بر اساس روزهای باقی مانده
// // // //       if (diffDays < 0) {
// // // //         return {
// // // //           status: 'expired',
// // // //           color: '#dc2626',
// // // //           bg: '#fee2e2',
// // // //           border: '1px solid #fecaca',
// // // //           label: `🔴 ${Math.abs(diffDays)} روز گذشته`,
// // // //           priority: 1
// // // //         };
// // // //       }
// // // //       if (diffDays === 0) {
// // // //         return {
// // // //           status: 'today',
// // // //           color: '#dc2626',
// // // //           bg: '#fee2e2',
// // // //           border: '1px solid #fecaca',
// // // //           label: '🔴 امروز',
// // // //           priority: 1
// // // //         };
// // // //       }
// // // //       if (diffDays <= 10) {
// // // //         return {
// // // //           status: 'critical',
// // // //           color: '#dc2626',
// // // //           bg: '#fee2e2',
// // // //           border: '1px solid #fecaca',
// // // //           label: `🔴 ${diffDays} روز مانده`,
// // // //           priority: 1
// // // //         };
// // // //       }
// // // //       if (diffDays <= 30) {
// // // //         return {
// // // //           status: 'warning',
// // // //           color: '#ea580c',
// // // //           bg: '#ffedd5',
// // // //           border: '1px solid #fed7aa',
// // // //           label: `🟠 ${diffDays} روز مانده`,
// // // //           priority: 2
// // // //         };
// // // //       }
// // // //       if (diffDays <= 60) {
// // // //         return {
// // // //           status: 'info',
// // // //           color: '#d97706',
// // // //           bg: '#fef3c7',
// // // //           border: '1px solid #fde68a',
// // // //           label: `🟡 ${diffDays} روز مانده`,
// // // //           priority: 3
// // // //         };
// // // //       }
// // // //       return null;
// // // //     } catch (error) {
// // // //       console.error('Error calculating date warning:', error);
// // // //       return null;
// // // //     }
// // // //   };

// // // //   const start = ((pagination.currentPage - 1) * pagination.pageSize) + 1;
// // // //   const end = Math.min(start + pagination.pageSize - 1, pagination.totalCount);

// // // //   if (loading && items.length === 0) {
// // // //     return <LoadingSpinner text="در حال دریافت اطلاعات..." />;
// // // //   }

// // // //   return (
// // // //     <div className="documents-payable-page">
// // // //       <ToastContainer
// // // //         position="top-left"
// // // //         autoClose={5000}
// // // //         hideProgressBar={false}
// // // //         newestOnTop={false}
// // // //         closeOnClick
// // // //         rtl={true}
// // // //         pauseOnFocusLoss
// // // //         draggable
// // // //         pauseOnHover
// // // //         theme="light"
// // // //       />

// // // //       {/* Header with stats */}
// // // //       <div className="page-header">
// // // //         <div className="header-content">
// // // //           <div className="header-title">
// // // //             <h1>اسناد پرداختنی</h1>
// // // //           </div>
// // // //           <div className="header-stats">
// // // //             <div className="stat-card">
// // // //               <span className="stat-value">{pagination.totalCount.toLocaleString()}</span>
// // // //               <span className="stat-label">کل اسناد</span>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </div>

// // // //       {/* Tabs */}
// // // //       <div className="tabs-container">
// // // //         <button
// // // //           className={`tab-btn ${activeTab === 'incoming' ? 'active' : ''}`}
// // // //           onClick={() => setActiveTab('incoming')}
// // // //         >
// // // //           <FaFileInvoiceDollar className="tab-icon" />
// // // //           <span>اسناد ورودی</span>
// // // //           <span className="tab-badge">دریافتی</span>
// // // //         </button>
// // // //         <button
// // // //           className={`tab-btn ${activeTab === 'outgoing' ? 'active' : ''}`}
// // // //           onClick={() => setActiveTab('outgoing')}
// // // //         >
// // // //           <FaMoneyBillWave className="tab-icon" />
// // // //           <span>اسناد خروجی</span>
// // // //           <span className="tab-badge">پرداختی</span>
// // // //         </button>
// // // //       </div>

// // // //       {/* Actions Bar */}
// // // //       <div className="documents-actions">
// // // //         <div className="search-container">
// // // //           <div className="search-input-wrapper">
// // // //             <FaSearch className="search-icon" />
// // // //             <input
// // // //               type="text"
// // // //               placeholder="جستجو بر اساس شماره سریال، نام بانک یا توضیحات..."
// // // //               value={searchTerm}
// // // //               onChange={handleSearchChange}
// // // //               className="search-input"
// // // //               autoComplete="off"
// // // //               style={{ color: '#1f2937' }}
// // // //             />
// // // //             {searchTerm && (
// // // //               <button className="search-clear" onClick={clearSearch} type="button">
// // // //                 <FaTimes />
// // // //               </button>
// // // //             )}
// // // //           </div>
// // // //           {searchTerm && (
// // // //             <div className="search-info">
// // // //               <span className="search-term">جستجو: "{searchTerm}"</span>
// // // //               <span className="search-results">{pagination.totalCount} نتیجه</span>
// // // //             </div>
// // // //           )}
// // // //         </div>

// // // //         <div className="actions-right">
// // // //           <button 
// // // //             className="btn-refresh"
// // // //             onClick={handleRetry}
// // // //             disabled={loading}
// // // //           >
// // // //             <FaRedo className={loading ? 'spin' : ''} />
// // // //             <span>{loading ? 'در حال بروزرسانی...' : 'بروزرسانی'}</span>
// // // //           </button>

// // // //           <div className="page-size-selector">
// // // //             <label>تعداد در صفحه:</label>
// // // //             <select 
// // // //               value={pagination.pageSize}
// // // //               onChange={(e) => handlePageSizeChange(Number(e.target.value))}
// // // //               disabled={loading}
// // // //             >
// // // //               <option value="5">۵</option>
// // // //               <option value="10">۱۰</option>
// // // //               <option value="20">۲۰</option>
// // // //               <option value="50">۵۰</option>
// // // //               <option value="100">۱۰۰</option>
// // // //             </select>
// // // //           </div>
// // // //         </div>
// // // //       </div>

// // // //       {/* Table Container */}
// // // //       <div className="documents-table-container">
// // // //         <table className="documents-table">
// // // //           <thead>
// // // //             <tr>
// // // //               <th className="col-index">#</th>
// // // //               <th className="col-serial">سریال صورت مالی</th>
// // // //               <th className="col-serial">شماره سریال</th>
// // // //               <th className="col-date">تاریخ چک</th>
// // // //               <th className="col-amount">مبلغ</th>
// // // //               <th className="col-bank">نام بانک</th>
// // // //               <th className="col-status">وضعیت</th>
// // // //               <th className="col-desc">توضیحات</th>
// // // //             </tr>
// // // //           </thead>
// // // //           <tbody>
// // // //             {items.length === 0 ? (
// // // //               <tr className="no-data-row">
// // // //                 <td colSpan="8">
// // // //                   <div className="no-data-content">
// // // //                     <div className="no-data-icon">📄</div>
// // // //                     <h3>هیچ سندی یافت نشد</h3>
// // // //                     <p>
// // // //                       {searchTerm 
// // // //                         ? `نتیجه‌ای برای عبارت "${searchTerm}" پیدا نشد` 
// // // //                         : 'لیست اسناد در این بخش خالی است'}
// // // //                     </p>
// // // //                     {searchTerm && (
// // // //                       <button className="btn-clear-search" onClick={clearSearch}>
// // // //                         حذف فیلتر جستجو
// // // //                       </button>
// // // //                     )}
// // // //                   </div>
// // // //                 </td>
// // // //               </tr>
// // // //             ) : (
// // // //               items.map((item, index) => {
// // // //                 const statusInfo = getStatusInfo(item.paymentChequeStatus);
// // // //                 // فقط از chequeDate میلادی استفاده کن
// // // //                 const dateWarning = getDateWarningInfo(item.chequeDate);
// // // //                 const rowPriorityClass = dateWarning ? `priority-${dateWarning.priority}` : '';
                
// // // //                 return (
// // // //                   <tr key={item.id} className={`document-row ${rowPriorityClass}`}>
// // // //                     <td className="col-index">
// // // //                       {((pagination.currentPage - 1) * pagination.pageSize) + index + 1}
// // // //                     </td>
// // // //                     <td className="col-serial">
// // // //                       <div className="serial-cell">
// // // //                         <FaHashtag className="serial-icon" />
// // // //                         <span className="serial-number">{item.serialFinancail || '---'}</span>
// // // //                       </div>
// // // //                     </td>
// // // //                     <td className="col-serial">
// // // //                       <div className="serial-cell">
// // // //                         <FaHashtag className="serial-icon" />
// // // //                         <span className="serial-number">{item.serialNumber || '---'}</span>
// // // //                       </div>
// // // //                     </td>
// // // //                     <td className="col-date">
// // // //                       <div 
// // // //                         className="date-cell"
// // // //                         style={dateWarning ? {
// // // //                           backgroundColor: dateWarning.bg,
// // // //                           borderRadius: '8px',
// // // //                           padding: '6px 12px',
// // // //                           border: dateWarning.border,
// // // //                           transition: 'all 0.3s ease'
// // // //                         } : {}}
// // // //                       >
// // // //                         <FaCalendarAlt className="date-icon" style={{ color: dateWarning?.color || '#6b7280' }} />
// // // //                         <div style={{ display: 'flex', flexDirection: 'column' }}>
// // // //                           <span style={{ 
// // // //                             color: dateWarning?.color || '#374151',
// // // //                             fontWeight: dateWarning ? '600' : 'normal',
// // // //                             fontSize: '13px'
// // // //                           }}>
// // // //                             {formatDate(item.chequeDate_Persion)}
// // // //                           </span>
// // // //                           {dateWarning && (
// // // //                             <span style={{ 
// // // //                               fontSize: '10px', 
// // // //                               color: dateWarning.color,
// // // //                               marginTop: '2px',
// // // //                               fontWeight: '500'
// // // //                             }}>
// // // //                               {dateWarning.label}
// // // //                             </span>
// // // //                           )}
// // // //                         </div>
// // // //                       </div>
// // // //                     </td>
// // // //                     <td className="col-amount">
// // // //                       <div className="amount-cell">
// // // //                         <span className="amount-value">{formatAmount(item.amount)}</span>
// // // //                         <span className="currency">ریال</span>
// // // //                       </div>
// // // //                     </td>
// // // //                     <td className="col-bank">
// // // //                       <div className="bank-cell">
// // // //                         <FaBuilding className="bank-icon" />
// // // //                         {item.bankName || '---'}
// // // //                       </div>
// // // //                     </td>
// // // //                     <td className="col-status">
// // // //                       <span 
// // // //                         className="status-badge"
// // // //                         style={{ 
// // // //                           backgroundColor: statusInfo.bg, 
// // // //                           color: statusInfo.color 
// // // //                         }}
// // // //                       >
// // // //                         <span className="status-icon">{statusInfo.icon}</span>
// // // //                         {item.paymentChequeStatusTitle || statusInfo.text}
// // // //                       </span>
// // // //                     </td>
// // // //                     <td className="col-desc">
// // // //                       <div className="desc-cell" title={item.desc || ''}>
// // // //                         {item.desc || '---'}
// // // //                       </div>
// // // //                     </td>
// // // //                   </tr>
// // // //                 );
// // // //               })
// // // //             )}
// // // //           </tbody>
// // // //         </table>
// // // //       </div>

// // // //       {/* Pagination */}
// // // //       {pagination.totalPages > 1 && (
// // // //         <div className="pagination-wrapper">
// // // //           <Pagination
// // // //             currentPage={pagination.currentPage}
// // // //             totalPages={pagination.totalPages}
// // // //             totalItems={pagination.totalCount}
// // // //             pageSize={pagination.pageSize}
// // // //             onPageChange={handlePageChange}
// // // //           />
// // // //         </div>
// // // //       )}

// // // //       {/* Loading Overlay */}
// // // //       {loading && items.length > 0 && (
// // // //         <div className="loading-overlay">
// // // //           <LoadingSpinner text="در حال بروزرسانی..." />
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default DocumentsPayable;
// // // // DocumentsPayable.jsx - نسخه کامل با قابلیت ثبت پاس شدن چک
// // // import React, { useState, useEffect, useCallback, useRef } from 'react';
// // // import { documentsPayableService } from '../../../services/documentsPayable';
// // // import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner';
// // // import Pagination from '../../common/Pagination/Pagination';
// // // import { toast, ToastContainer } from 'react-toastify';
// // // import 'react-toastify/dist/ReactToastify.css';
// // // import { 
// // //   FaSearch, 
// // //   FaRedo, 
// // //   FaFileInvoiceDollar,
// // //   FaMoneyBillWave,
// // //   FaCalendarAlt,
// // //   FaBuilding,
// // //   FaHashtag,
// // //   FaTimes,
// // //   FaCheckCircle,
// // //   FaQuestionCircle
// // // } from 'react-icons/fa';
// // // import './DocumentsPayable.css';

// // // const DocumentsPayable = () => {
// // //   const [activeTab, setActiveTab] = useState('incoming');
// // //   const [items, setItems] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [searchTerm, setSearchTerm] = useState('');
// // //   const [pagination, setPagination] = useState({
// // //     currentPage: 1,
// // //     pageSize: 10,
// // //     totalCount: 0,
// // //     totalPages: 0
// // //   });
  
// // //   // State برای مودال ثبت پاس چک
// // //   const [showPassModal, setShowPassModal] = useState(false);
// // //   const [selectedCheque, setSelectedCheque] = useState(null);
// // //   const [delayDate, setDelayDate] = useState('');
// // //   const [delayReason, setDelayReason] = useState('');
// // //   const [submitting, setSubmitting] = useState(false);
// // //   const [showDelayForm, setShowDelayForm] = useState(false);
  
// // //   const searchTimeoutRef = useRef(null);

// // //   // تعیین id بر اساس تب فعال
// // //   const getTabId = useCallback(() => {
// // //     return activeTab === 'incoming' ? 1 : 2;
// // //   }, [activeTab]);

// // //   // تابع دریافت داده‌ها
// // //   const fetchItems = useCallback(async (pageNumber, pageSize, search) => {
// // //     try {
// // //       setLoading(true);
      
// // //       const id = getTabId();
      
// // //       console.log('📡 Fetching data:', { id, pageNumber, pageSize, search });
      
// // //       let response;
// // //       if (activeTab === 'incoming') {
// // //         response = await documentsPayableService.getIncomingDocuments(id, pageNumber, pageSize, search);
// // //       } else {
// // //         response = await documentsPayableService.getIncomingDocuments(id, pageNumber, pageSize, search);
// // //       }
      
// // //       console.log('✅ Response:', response);
      
// // //       setItems(response?.items || []);
// // //       setPagination({
// // //         currentPage: pageNumber,
// // //         pageSize: pageSize,
// // //         totalCount: response?.totalCount || 0,
// // //         totalPages: response?.totalPages || 0
// // //       });
      
// // //     } catch (err) {
// // //       console.error('❌ Error fetching documents:', err);
// // //       toast.error('خطا در دریافت اطلاعات', {
// // //         position: "top-left",
// // //         autoClose: 3000,
// // //       });
// // //       setItems([]);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   }, [activeTab, getTabId]);

// // //   // بارگذاری اولیه و هنگام تغییر تب یا pageSize
// // //   useEffect(() => {
// // //     setPagination(prev => ({ ...prev, currentPage: 1 }));
// // //     fetchItems(1, pagination.pageSize, searchTerm);
// // //   // eslint-disable-next-line react-hooks/exhaustive-deps
// // //   }, [activeTab, pagination.pageSize]);

// // //   // دیبونس سرچ
// // //   useEffect(() => {
// // //     if (searchTimeoutRef.current) {
// // //       clearTimeout(searchTimeoutRef.current);
// // //     }
    
// // //     searchTimeoutRef.current = setTimeout(() => {
// // //       if (searchTerm !== undefined) {
// // //         console.log('🔍 Searching with term:', searchTerm);
// // //         setPagination(prev => ({ ...prev, currentPage: 1 }));
// // //         fetchItems(1, pagination.pageSize, searchTerm);
// // //       }
// // //     }, 500);
    
// // //     return () => {
// // //       if (searchTimeoutRef.current) {
// // //         clearTimeout(searchTimeoutRef.current);
// // //       }
// // //     };
// // //   // eslint-disable-next-line react-hooks/exhaustive-deps
// // //   }, [searchTerm]);

// // //   const handlePageChange = (pageNumber) => {
// // //     setPagination(prev => ({ ...prev, currentPage: pageNumber }));
// // //     fetchItems(pageNumber, pagination.pageSize, searchTerm);
// // //   };

// // //   const handlePageSizeChange = (newPageSize) => {
// // //     setPagination(prev => ({
// // //       ...prev,
// // //       pageSize: newPageSize,
// // //       currentPage: 1
// // //     }));
// // //   };

// // //   const handleRetry = () => {
// // //     fetchItems(pagination.currentPage, pagination.pageSize, searchTerm);
// // //   };

// // //   const handleSearchChange = (e) => {
// // //     setSearchTerm(e.target.value);
// // //   };

// // //   const clearSearch = () => {
// // //     setSearchTerm('');
// // //   };

// // //   // ========== توابع ثبت پاس چک ==========
// // //   const handleCheckPassed = (cheque) => {
// // //     setSelectedCheque(cheque);
// // //     setShowDelayForm(false);
// // //     setDelayDate('');
// // //     setDelayReason('');
    
// // //     // اگر وضعیت قبلاً تایید شده، نمی‌توان دوباره ثبت کرد
// // //     if (cheque.paymentChequeStatus === 2) {
// // //       toast.info('این چک قبلاً ثبت شده است', {
// // //         position: "top-left",
// // //         autoClose: 3000,
// // //       });
// // //       return;
// // //     }
// // //     setShowPassModal(true);
// // //   };

// // //   // تابع ثبت پاس شدن چک (بدون تاخیر)
// // //   const handleSubmitPassed = async () => {
// // //     try {
// // //       setSubmitting(true);
// // //       const response = await documentsPayableService.confirmChequePassed(selectedCheque.id);
      
// // //       if (response?.success) {
// // //         toast.success('چک با موفقیت به عنوان پاس شده ثبت گردید', {
// // //           position: "top-left",
// // //           autoClose: 3000,
// // //         });
// // //         setShowPassModal(false);
// // //         // رفرش لیست
// // //         fetchItems(pagination.currentPage, pagination.pageSize, searchTerm);
// // //       } else {
// // //         throw new Error(response?.message || 'خطا در ثبت');
// // //       }
// // //     } catch (err) {
// // //       console.error('Error confirming cheque passed:', err);
// // //       toast.error(err.message || 'خطا در ثبت اطلاعات', {
// // //         position: "top-left",
// // //         autoClose: 3000,
// // //       });
// // //     } finally {
// // //       setSubmitting(false);
// // //     }
// // //   };

// // //   // نمایش فرم تاخیر
// // //   const handleShowDelayForm = () => {
// // //     setShowDelayForm(true);
// // //   };

// // //   // تابع ثبت با تاخیر (دیر پاس شدن)
// // //   const handleSubmitDelayed = async () => {
// // //     if (!delayDate) {
// // //       toast.warning('لطفا تاریخ پاس شدن چک را وارد کنید', {
// // //         position: "top-left",
// // //         autoClose: 3000,
// // //       });
// // //       return;
// // //     }
    
// // //     if (!delayReason || delayReason.trim() === '') {
// // //       toast.warning('لطفا دلیل دیر پاس شدن را وارد کنید', {
// // //         position: "top-left",
// // //         autoClose: 3000,
// // //       });
// // //       return;
// // //     }
    
// // //     try {
// // //       setSubmitting(true);
// // //       const response = await documentsPayableService.confirmChequeDelayed(
// // //         selectedCheque.id,
// // //         delayDate,
// // //         delayReason
// // //       );
      
// // //       if (response?.success) {
// // //         toast.warning('چک با تاخیر ثبت گردید', {
// // //           position: "top-left",
// // //           autoClose: 3000,
// // //         });
// // //         setShowPassModal(false);
// // //         setDelayDate('');
// // //         setDelayReason('');
// // //         setShowDelayForm(false);
// // //         // رفرش لیست
// // //         fetchItems(pagination.currentPage, pagination.pageSize, searchTerm);
// // //       } else {
// // //         throw new Error(response?.message || 'خطا در ثبت');
// // //       }
// // //     } catch (err) {
// // //       console.error('Error confirming cheque delayed:', err);
// // //       toast.error(err.message || 'خطا در ثبت اطلاعات', {
// // //         position: "top-left",
// // //         autoClose: 3000,
// // //       });
// // //     } finally {
// // //       setSubmitting(false);
// // //     }
// // //   };

// // //   const getStatusInfo = (status) => {
// // //     const statusMap = {
// // //       4: { text: 'خطا', color: '#ef4444', bg: '#fee2e2', icon: '❌' },
// // //       0: { text: 'در انتظار', color: '#f59e0b', bg: '#fef3c7', icon: '⏳' },
// // //       2: { text: 'تأیید شده', color: '#10b981', bg: '#d1fae5', icon: '✅' },
// // //       3: { text: 'ابطال شده', color: '#6b7280', bg: '#f3f4f6', icon: '🚫' },
// // //     };
// // //     return statusMap[status] || { text: 'نامشخص', color: '#6b7280', bg: '#f3f4f6', icon: '❓' };
// // //   };

// // //   // فرمت تاریخ برای نمایش (فقط میلادی)
// // //   const formatDate = (dateString) => {
// // //     if (!dateString) return '---';
// // //     return dateString.split('T')[0].replace(/-/g, '/');
// // //   };

// // //   const formatAmount = (amount) => {
// // //     if (!amount && amount !== 0) return '---';
// // //     return amount.toLocaleString('fa-IR');
// // //   };

// // //   // ========== تابع هشدار تاریخ - فقط با تاریخ میلادی ==========
// // //   const getDateWarningInfo = (chequeDate) => {
// // //     if (!chequeDate) return null;
    
// // //     try {
// // //       const today = new Date();
// // //       today.setHours(0, 0, 0, 0);
      
// // //       let chequeDateStr = String(chequeDate);
// // //       if (chequeDateStr.includes('T')) {
// // //         chequeDateStr = chequeDateStr.split('T')[0];
// // //       }
      
// // //       const targetDate = new Date(chequeDateStr);
      
// // //       if (isNaN(targetDate.getTime())) return null;
      
// // //       targetDate.setHours(0, 0, 0, 0);
      
// // //       const diffTime = targetDate - today;
// // //       const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
// // //       if (diffDays < 0) {
// // //         return {
// // //           status: 'expired',
// // //           color: '#dc2626',
// // //           bg: '#fee2e2',
// // //           border: '1px solid #fecaca',
// // //           label: `🔴 ${Math.abs(diffDays)} روز گذشته`,
// // //           priority: 1
// // //         };
// // //       }
// // //       if (diffDays === 0) {
// // //         return {
// // //           status: 'today',
// // //           color: '#dc2626',
// // //           bg: '#fee2e2',
// // //           border: '1px solid #fecaca',
// // //           label: '🔴 امروز',
// // //           priority: 1
// // //         };
// // //       }
// // //       if (diffDays <= 10) {
// // //         return {
// // //           status: 'critical',
// // //           color: '#dc2626',
// // //           bg: '#fee2e2',
// // //           border: '1px solid #fecaca',
// // //           label: `🔴 ${diffDays} روز مانده`,
// // //           priority: 1
// // //         };
// // //       }
// // //       if (diffDays <= 30) {
// // //         return {
// // //           status: 'warning',
// // //           color: '#ea580c',
// // //           bg: '#ffedd5',
// // //           border: '1px solid #fed7aa',
// // //           label: `🟠 ${diffDays} روز مانده`,
// // //           priority: 2
// // //         };
// // //       }
// // //       if (diffDays <= 60) {
// // //         return {
// // //           status: 'info',
// // //           color: '#d97706',
// // //           bg: '#fef3c7',
// // //           border: '1px solid #fde68a',
// // //           label: `🟡 ${diffDays} روز مانده`,
// // //           priority: 3
// // //         };
// // //       }
// // //       return null;
// // //     } catch (error) {
// // //       console.error('Error calculating date warning:', error);
// // //       return null;
// // //     }
// // //   };

// // //   // رندر مودال پاپ‌آپ
// // //   const renderPassModal = () => {
// // //     if (!showPassModal) return null;
    
// // //     return (
// // //       <div className="modal-overlay" onClick={() => !submitting && setShowPassModal(false)}>
// // //         <div className="modal-container" onClick={(e) => e.stopPropagation()}>
// // //           <div className="modal-header">
// // //             <h3>ثبت وضعیت چک</h3>
// // //             {!submitting && (
// // //               <button className="modal-close" onClick={() => setShowPassModal(false)}>
// // //                 <FaTimes />
// // //               </button>
// // //             )}
// // //           </div>
          
// // //           <div className="modal-body">
// // //             <div className="cheque-info">
// // //               <p><strong>شماره سریال:</strong> {selectedCheque?.serialNumber || '---'}</p>
// // //               <p><strong>شماره مالی:</strong> {selectedCheque?.serialFinancail || '---'}</p>
// // //               <p><strong>مبلغ:</strong> {formatAmount(selectedCheque?.amount)} ریال</p>
// // //               <p><strong>تاریخ چک:</strong> {formatDate(selectedCheque?.chequeDate)}</p>
// // //               <p><strong>بانک:</strong> {selectedCheque?.bankName || '---'}</p>
// // //             </div>
            
// // //             {!showDelayForm ? (
// // //               <>
// // //                 <div className="modal-question">
// // //                   <FaQuestionCircle className="question-icon" />
// // //                   <p>آیا چک در سررسید پاس شده است؟</p>
// // //                 </div>
                
// // //                 <div className="modal-buttons">
// // //                   <button 
// // //                     className="btn-pass-yes"
// // //                     onClick={handleSubmitPassed}
// // //                     disabled={submitting}
// // //                   >
// // //                     {submitting ? <LoadingSpinner small text="" /> : '✅ بله، پاس شده'}
// // //                   </button>
                  
// // //                   <button 
// // //                     className="btn-pass-no"
// // //                     onClick={handleShowDelayForm}
// // //                     disabled={submitting}
// // //                   >
// // //                     ❌ نه، دیر پاس شده
// // //                   </button>
// // //                 </div>
// // //               </>
// // //             ) : (
// // //               <div className="delay-form">
// // //                 <div className="form-group">
// // //                   <label>تاریخ پاس شدن چک:</label>
// // //                   <input
// // //                     type="date"
// // //                     value={delayDate}
// // //                     onChange={(e) => setDelayDate(e.target.value)}
// // //                     className="form-input"
// // //                     disabled={submitting}
// // //                   />
// // //                 </div>
                
// // //                 <div className="form-group">
// // //                   <label>دلیل دیر پاس شدن:</label>
// // //                   <textarea
// // //                     value={delayReason}
// // //                     onChange={(e) => setDelayReason(e.target.value)}
// // //                     className="form-textarea"
// // //                     rows="3"
// // //                     placeholder="لطفا علت تاخیر در پاس شدن چک را وارد کنید..."
// // //                     disabled={submitting}
// // //                   />
// // //                 </div>
                
// // //                 <button 
// // //                   className="btn-submit-delay"
// // //                   onClick={handleSubmitDelayed}
// // //                   disabled={submitting}
// // //                 >
// // //                   {submitting ? 'در حال ثبت...' : 'ثبت چک با تاخیر'}
// // //                 </button>
                
// // //                 <button 
// // //                   className="btn-back"
// // //                   onClick={() => setShowDelayForm(false)}
// // //                   disabled={submitting}
// // //                 >
// // //                   بازگشت
// // //                 </button>
// // //               </div>
// // //             )}
// // //           </div>
// // //         </div>
// // //       </div>
// // //     );
// // //   };

// // //   const start = ((pagination.currentPage - 1) * pagination.pageSize) + 1;
// // //   const end = Math.min(start + pagination.pageSize - 1, pagination.totalCount);

// // //   if (loading && items.length === 0) {
// // //     return <LoadingSpinner text="در حال دریافت اطلاعات..." />;
// // //   }

// // //   return (
// // //     <div className="documents-payable-page">
// // //       <ToastContainer
// // //         position="top-left"
// // //         autoClose={5000}
// // //         hideProgressBar={false}
// // //         newestOnTop={false}
// // //         closeOnClick
// // //         rtl={true}
// // //         pauseOnFocusLoss
// // //         draggable
// // //         pauseOnHover
// // //         theme="light"
// // //       />

// // //       {/* Header with stats */}
// // //       <div className="page-header">
// // //         <div className="header-content">
// // //           <div className="header-title">
// // //             <h1>اسناد پرداختنی</h1>
// // //           </div>
// // //           <div className="header-stats">
// // //             <div className="stat-card">
// // //               <span className="stat-value">{pagination.totalCount.toLocaleString()}</span>
// // //               <span className="stat-label">کل اسناد</span>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* Tabs */}
// // //       <div className="tabs-container">
// // //         <button
// // //           className={`tab-btn ${activeTab === 'incoming' ? 'active' : ''}`}
// // //           onClick={() => setActiveTab('incoming')}
// // //         >
// // //           <FaFileInvoiceDollar className="tab-icon" />
// // //           <span>اسناد ورودی</span>
// // //           <span className="tab-badge">دریافتی</span>
// // //         </button>
// // //         <button
// // //           className={`tab-btn ${activeTab === 'outgoing' ? 'active' : ''}`}
// // //           onClick={() => setActiveTab('outgoing')}
// // //         >
// // //           <FaMoneyBillWave className="tab-icon" />
// // //           <span>اسناد خروجی</span>
// // //           <span className="tab-badge">پرداختی</span>
// // //         </button>
// // //       </div>

// // //       {/* Actions Bar */}
// // //       <div className="documents-actions">
// // //         <div className="search-container">
// // //           <div className="search-input-wrapper">
// // //             <FaSearch className="search-icon" />
// // //             <input
// // //               type="text"
// // //               placeholder="جستجو بر اساس شماره سریال، نام بانک یا توضیحات..."
// // //               value={searchTerm}
// // //               onChange={handleSearchChange}
// // //               className="search-input"
// // //               autoComplete="off"
// // //               style={{ color: '#1f2937' }}
// // //             />
// // //             {searchTerm && (
// // //               <button className="search-clear" onClick={clearSearch} type="button">
// // //                 <FaTimes />
// // //               </button>
// // //             )}
// // //           </div>
// // //           {searchTerm && (
// // //             <div className="search-info">
// // //               <span className="search-term">جستجو: "{searchTerm}"</span>
// // //               <span className="search-results">{pagination.totalCount} نتیجه</span>
// // //             </div>
// // //           )}
// // //         </div>

// // //         <div className="actions-right">
// // //           <button 
// // //             className="btn-refresh"
// // //             onClick={handleRetry}
// // //             disabled={loading}
// // //           >
// // //             <FaRedo className={loading ? 'spin' : ''} />
// // //             <span>{loading ? 'در حال بروزرسانی...' : 'بروزرسانی'}</span>
// // //           </button>

// // //           <div className="page-size-selector">
// // //             <label>تعداد در صفحه:</label>
// // //             <select 
// // //               value={pagination.pageSize}
// // //               onChange={(e) => handlePageSizeChange(Number(e.target.value))}
// // //               disabled={loading}
// // //             >
// // //               <option value="5">۵</option>
// // //               <option value="10">۱۰</option>
// // //               <option value="20">۲۰</option>
// // //               <option value="50">۵۰</option>
// // //               <option value="100">۱۰۰</option>
// // //             </select>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* Table Container */}
// // //       <div className="documents-table-container">
// // //         <table className="documents-table">
// // //           <thead>
// // //             <tr>
// // //               <th className="col-index">#</th>
// // //               <th className="col-serial">سریال صورت مالی</th>
// // //               <th className="col-serial">شماره سریال</th>
// // //               <th className="col-date">تاریخ چک</th>
// // //               <th className="col-amount">مبلغ</th>
// // //               <th className="col-bank">نام بانک</th>
// // //               <th className="col-status">وضعیت</th>
// // //               <th className="col-desc">توضیحات</th>
// // //               <th className="col-action">عملیات</th>
// // //             </tr>
// // //           </thead>
// // //           <tbody>
// // //             {items.length === 0 ? (
// // //               <tr className="no-data-row">
// // //                 <td colSpan="9">
// // //                   <div className="no-data-content">
// // //                     <div className="no-data-icon">📄</div>
// // //                     <h3>هیچ سندی یافت نشد</h3>
// // //                     <p>
// // //                       {searchTerm 
// // //                         ? `نتیجه‌ای برای عبارت "${searchTerm}" پیدا نشد` 
// // //                         : 'لیست اسناد در این بخش خالی است'}
// // //                     </p>
// // //                     {searchTerm && (
// // //                       <button className="btn-clear-search" onClick={clearSearch}>
// // //                         حذف فیلتر جستجو
// // //                       </button>
// // //                     )}
// // //                   </div>
// // //                  </td>
// // //               </tr>
// // //             ) : (
// // //               items.map((item, index) => {
// // //                 const statusInfo = getStatusInfo(item.paymentChequeStatus);
// // //                 const dateWarning = getDateWarningInfo(item.chequeDate);
// // //                 const rowPriorityClass = dateWarning ? `priority-${dateWarning.priority}` : '';
                
// // //                 return (
// // //                   <tr key={item.id} className={`document-row ${rowPriorityClass}`}>
// // //                     <td className="col-index">
// // //                       {((pagination.currentPage - 1) * pagination.pageSize) + index + 1}
// // //                     </td>
// // //                     <td className="col-serial">
// // //                       <div className="serial-cell">
// // //                         <FaHashtag className="serial-icon" />
// // //                         <span className="serial-number">{item.serialFinancail || '---'}</span>
// // //                       </div>
// // //                     </td>
// // //                     <td className="col-serial">
// // //                       <div className="serial-cell">
// // //                         <FaHashtag className="serial-icon" />
// // //                         <span className="serial-number">{item.serialNumber || '---'}</span>
// // //                       </div>
// // //                     </td>
// // //                     <td className="col-date">
// // //                       <div 
// // //                         className="date-cell"
// // //                         style={dateWarning ? {
// // //                           backgroundColor: dateWarning.bg,
// // //                           borderRadius: '8px',
// // //                           padding: '6px 12px',
// // //                           border: dateWarning.border,
// // //                           transition: 'all 0.3s ease'
// // //                         } : {}}
// // //                       >
// // //                         <FaCalendarAlt className="date-icon" style={{ color: dateWarning?.color || '#6b7280' }} />
// // //                         <div style={{ display: 'flex', flexDirection: 'column' }}>
// // //                           <span style={{ 
// // //                             color: dateWarning?.color || '#374151',
// // //                             fontWeight: dateWarning ? '600' : 'normal',
// // //                             fontSize: '13px'
// // //                           }}>
// // //                             {formatDate(item.chequeDate)}
// // //                           </span>
// // //                           {dateWarning && (
// // //                             <span style={{ 
// // //                               fontSize: '10px', 
// // //                               color: dateWarning.color,
// // //                               marginTop: '2px',
// // //                               fontWeight: '500'
// // //                             }}>
// // //                               {dateWarning.label}
// // //                             </span>
// // //                           )}
// // //                         </div>
// // //                       </div>
// // //                     </td>
// // //                     <td className="col-amount">
// // //                       <div className="amount-cell">
// // //                         <span className="amount-value">{formatAmount(item.amount)}</span>
// // //                         <span className="currency">ریال</span>
// // //                       </div>
// // //                     </td>
// // //                     <td className="col-bank">
// // //                       <div className="bank-cell">
// // //                         <FaBuilding className="bank-icon" />
// // //                         {item.bankName || '---'}
// // //                       </div>
// // //                     </td>
// // //                     <td className="col-status">
// // //                       <span 
// // //                         className="status-badge"
// // //                         style={{ 
// // //                           backgroundColor: statusInfo.bg, 
// // //                           color: statusInfo.color 
// // //                         }}
// // //                       >
// // //                         <span className="status-icon">{statusInfo.icon}</span>
// // //                         {item.paymentChequeStatusTitle || statusInfo.text}
// // //                       </span>
// // //                     </td>
// // //                     <td className="col-desc">
// // //                       <div className="desc-cell" title={item.desc || ''}>
// // //                         {item.desc || '---'}
// // //                       </div>
// // //                     </td>
// // //                     <td className="col-action">
// // //                       <button
// // //                         onClick={() => handleCheckPassed(item)}
// // //                         className={`check-passed-btn ${(item.paymentChequeStatus === 2 || item.paymentChequeStatus === 3) ? 'disabled' : ''}`}
// // //                         title="ثبت وضعیت پاس شدن چک"
// // //                         disabled={item.paymentChequeStatus === 2 || item.paymentChequeStatus === 3}
// // //                       >
// // //                         <FaCheckCircle />
// // //                         <span>ثبت پاس</span>
// // //                       </button>
// // //                     </td>
// // //                   </tr>
// // //                 );
// // //               })
// // //             )}
// // //           </tbody>
// // //         </table>
// // //       </div>

// // //       {/* Pagination */}
// // //       {pagination.totalPages > 1 && (
// // //         <div className="pagination-wrapper">
// // //           <Pagination
// // //             currentPage={pagination.currentPage}
// // //             totalPages={pagination.totalPages}
// // //             totalItems={pagination.totalCount}
// // //             pageSize={pagination.pageSize}
// // //             onPageChange={handlePageChange}
// // //           />
// // //         </div>
// // //       )}

// // //       {/* Loading Overlay */}
// // //       {loading && items.length > 0 && (
// // //         <div className="loading-overlay">
// // //           <LoadingSpinner text="در حال بروزرسانی..." />
// // //         </div>
// // //       )}

// // //       {/* Modal for cheque status */}
// // //       {renderPassModal()}
// // //     </div>
// // //   );
// // // };

// // // export default DocumentsPayable;

// // // DocumentsPayable.jsx - نسخه کامل با تقویم شمسی (jalali) برای انتخاب تاریخ دیر پاس شدن
// // import React, { useState, useEffect, useCallback, useRef } from 'react';
// // import { documentsPayableService } from '../../../services/documentsPayable';
// // import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner';
// // import Pagination from '../../common/Pagination/Pagination';
// // import { toast, ToastContainer } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';
// // import Calendar from 'react-calendar';
// // import 'react-calendar/dist/Calendar.css';
// // import { 
// //   FaSearch, 
// //   FaRedo, 
// //   FaFileInvoiceDollar,
// //   FaMoneyBillWave,
// //   FaCalendarAlt,
// //   FaBuilding,
// //   FaHashtag,
// //   FaTimes,
// //   FaCheckCircle,
// //   FaQuestionCircle
// // } from 'react-icons/fa';
// // import './DocumentsPayable.css';

// // const DocumentsPayable = () => {
// //   const [activeTab, setActiveTab] = useState('incoming');
// //   const [items, setItems] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [pagination, setPagination] = useState({
// //     currentPage: 1,
// //     pageSize: 10,
// //     totalCount: 0,
// //     totalPages: 0
// //   });
  
// //   // State برای مودال ثبت پاس چک
// //   const [showPassModal, setShowPassModal] = useState(false);
// //   const [selectedCheque, setSelectedCheque] = useState(null);
// //   const [delayDate, setDelayDate] = useState('');
// //   const [delayReason, setDelayReason] = useState('');
// //   const [submitting, setSubmitting] = useState(false);
// //   const [showDelayForm, setShowDelayForm] = useState(false);
// //   const [showCalendar, setShowCalendar] = useState(false);
  
// //   const searchTimeoutRef = useRef(null);
// //   const calendarRef = useRef(null);

// //   // تعیین id بر اساس تب فعال
// //   const getTabId = useCallback(() => {
// //     return activeTab === 'incoming' ? 1 : 2;
// //   }, [activeTab]);

// //   // تابع دریافت داده‌ها
// //   const fetchItems = useCallback(async (pageNumber, pageSize, search) => {
// //     try {
// //       setLoading(true);
      
// //       const id = getTabId();
      
// //       console.log('📡 Fetching data:', { id, pageNumber, pageSize, search });
      
// //       let response;
// //       if (activeTab === 'incoming') {
// //         response = await documentsPayableService.getIncomingDocuments(id, pageNumber, pageSize, search);
// //       } else {
// //         response = await documentsPayableService.getIncomingDocuments(id, pageNumber, pageSize, search);
// //       }
      
// //       console.log('✅ Response:', response);
      
// //       setItems(response?.items || []);
// //       setPagination({
// //         currentPage: pageNumber,
// //         pageSize: pageSize,
// //         totalCount: response?.totalCount || 0,
// //         totalPages: response?.totalPages || 0
// //       });
      
// //     } catch (err) {
// //       console.error('❌ Error fetching documents:', err);
// //       toast.error('خطا در دریافت اطلاعات', {
// //         position: "top-left",
// //         autoClose: 3000,
// //       });
// //       setItems([]);
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, [activeTab, getTabId]);

// //   // بارگذاری اولیه و هنگام تغییر تب یا pageSize
// //   useEffect(() => {
// //     setPagination(prev => ({ ...prev, currentPage: 1 }));
// //     fetchItems(1, pagination.pageSize, searchTerm);
// //   // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [activeTab, pagination.pageSize]);

// //   // دیبونس سرچ
// //   useEffect(() => {
// //     if (searchTimeoutRef.current) {
// //       clearTimeout(searchTimeoutRef.current);
// //     }
    
// //     searchTimeoutRef.current = setTimeout(() => {
// //       if (searchTerm !== undefined) {
// //         console.log('🔍 Searching with term:', searchTerm);
// //         setPagination(prev => ({ ...prev, currentPage: 1 }));
// //         fetchItems(1, pagination.pageSize, searchTerm);
// //       }
// //     }, 500);
    
// //     return () => {
// //       if (searchTimeoutRef.current) {
// //         clearTimeout(searchTimeoutRef.current);
// //       }
// //     };
// //   // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [searchTerm]);

// //   // بستن تقویم با کلیک خارج از آن
// //   useEffect(() => {
// //     const handleClickOutside = (event) => {
// //       if (calendarRef.current && !calendarRef.current.contains(event.target)) {
// //         setShowCalendar(false);
// //       }
// //     };
    
// //     if (showCalendar) {
// //       document.addEventListener('mousedown', handleClickOutside);
// //     }
    
// //     return () => {
// //       document.removeEventListener('mousedown', handleClickOutside);
// //     };
// //   }, [showCalendar]);

// //   const handlePageChange = (pageNumber) => {
// //     setPagination(prev => ({ ...prev, currentPage: pageNumber }));
// //     fetchItems(pageNumber, pagination.pageSize, searchTerm);
// //   };

// //   const handlePageSizeChange = (newPageSize) => {
// //     setPagination(prev => ({
// //       ...prev,
// //       pageSize: newPageSize,
// //       currentPage: 1
// //     }));
// //   };

// //   const handleRetry = () => {
// //     fetchItems(pagination.currentPage, pagination.pageSize, searchTerm);
// //   };

// //   const handleSearchChange = (e) => {
// //     setSearchTerm(e.target.value);
// //   };

// //   const clearSearch = () => {
// //     setSearchTerm('');
// //   };

// //   // تبدیل تاریخ میلادی به شمسی برای نمایش
// //   const convertToJalali = (gregorianDate) => {
// //     if (!gregorianDate) return '';
// //     try {
// //       const date = new Date(gregorianDate);
// //       const formatter = new Intl.DateTimeFormat('fa-IR', {
// //         year: 'numeric',
// //         month: '2-digit',
// //         day: '2-digit'
// //       });
// //       return formatter.format(date);
// //     } catch (error) {
// //       return gregorianDate;
// //     }
// //   };

// //   // تبدیل تاریخ شمسی به میلادی برای ارسال به سرور
// //   const convertToGregorian = (jalaliDate) => {
// //     // این تابع ساده است - در عمل نیاز به کتابخانه مثل moment-jalaali دارید
// //     // فعلاً فرض می‌کنیم تاریخ میلادی از تقویم می‌آید
// //     return jalaliDate;
// //   };

// //   // تابع انتخاب تاریخ از تقویم
// //   const handleDateChange = (date) => {
// //     // react-calendar تاریخ میلادی برمی‌گرداند
// //     const formattedDate = date.toISOString().split('T')[0];
// //     setDelayDate(formattedDate);
// //     setShowCalendar(false);
// //   };

// //   // ========== توابع ثبت پاس چک ==========
// //   const handleCheckPassed = (cheque) => {
// //     setSelectedCheque(cheque);
// //     setShowDelayForm(false);
// //     setDelayDate('');
// //     setDelayReason('');
    
// //     // اگر وضعیت قبلاً تایید شده، نمی‌توان دوباره ثبت کرد
// //     if (cheque.paymentChequeStatus === 2) {
// //       toast.info('این چک قبلاً ثبت شده است', {
// //         position: "top-left",
// //         autoClose: 3000,
// //       });
// //       return;
// //     }
// //     setShowPassModal(true);
// //   };

// //   // تابع ثبت پاس شدن چک (بدون تاخیر)
// //   const handleSubmitPassed = async () => {
// //     try {
// //       setSubmitting(true);
// //       const response = await documentsPayableService.confirmChequePassed(selectedCheque.id);
      
// //       if (response?.success) {
// //         toast.success('چک با موفقیت به عنوان پاس شده ثبت گردید', {
// //           position: "top-left",
// //           autoClose: 3000,
// //         });
// //         setShowPassModal(false);
// //         // رفرش لیست
// //         fetchItems(pagination.currentPage, pagination.pageSize, searchTerm);
// //       } else {
// //         throw new Error(response?.message || 'خطا در ثبت');
// //       }
// //     } catch (err) {
// //       console.error('Error confirming cheque passed:', err);
// //       toast.error(err.message || 'خطا در ثبت اطلاعات', {
// //         position: "top-left",
// //         autoClose: 3000,
// //       });
// //     } finally {
// //       setSubmitting(false);
// //     }
// //   };

// //   // نمایش فرم تاخیر
// //   const handleShowDelayForm = () => {
// //     setShowDelayForm(true);
// //     // تنظیم تاریخ پیشفرض به تاریخ امروز
// //     const today = new Date().toISOString().split('T')[0];
// //     setDelayDate(today);
// //   };

// //   // تابع ثبت با تاخیر (دیر پاس شدن)
// //   const handleSubmitDelayed = async () => {
// //     if (!delayDate) {
// //       toast.warning('لطفا تاریخ پاس شدن چک را انتخاب کنید', {
// //         position: "top-left",
// //         autoClose: 3000,
// //       });
// //       return;
// //     }
    
// //     if (!delayReason || delayReason.trim() === '') {
// //       toast.warning('لطفا دلیل دیر پاس شدن را وارد کنید', {
// //         position: "top-left",
// //         autoClose: 3000,
// //       });
// //       return;
// //     }
    
// //     try {
// //       setSubmitting(true);
// //       const response = await documentsPayableService.confirmChequeDelayed(
// //         selectedCheque.id,
// //         delayDate,
// //         delayReason
// //       );
      
// //       if (response?.success) {
// //         toast.warning('چک با تاخیر ثبت گردید', {
// //           position: "top-left",
// //           autoClose: 3000,
// //         });
// //         setShowPassModal(false);
// //         setDelayDate('');
// //         setDelayReason('');
// //         setShowDelayForm(false);
// //         // رفرش لیست
// //         fetchItems(pagination.currentPage, pagination.pageSize, searchTerm);
// //       } else {
// //         throw new Error(response?.message || 'خطا در ثبت');
// //       }
// //     } catch (err) {
// //       console.error('Error confirming cheque delayed:', err);
// //       toast.error(err.message || 'خطا در ثبت اطلاعات', {
// //         position: "top-left",
// //         autoClose: 3000,
// //       });
// //     } finally {
// //       setSubmitting(false);
// //     }
// //   };

// //   const getStatusInfo = (status) => {
// //     const statusMap = {
// //       4: { text: 'خطا', color: '#ef4444', bg: '#fee2e2', icon: '❌' },
// //       0: { text: 'در انتظار', color: '#f59e0b', bg: '#fef3c7', icon: '⏳' },
// //       2: { text: 'تأیید شده', color: '#10b981', bg: '#d1fae5', icon: '✅' },
// //       3: { text: 'ابطال شده', color: '#6b7280', bg: '#f3f4f6', icon: '🚫' },
// //     };
// //     return statusMap[status] || { text: 'نامشخص', color: '#6b7280', bg: '#f3f4f6', icon: '❓' };
// //   };

// //   // فرمت تاریخ برای نمایش (فقط میلادی)
// //   const formatDate = (dateString) => {
// //     if (!dateString) return '---';
// //     return dateString.split('T')[0].replace(/-/g, '/');
// //   };

// //   const formatAmount = (amount) => {
// //     if (!amount && amount !== 0) return '---';
// //     return amount.toLocaleString('fa-IR');
// //   };

// //   // ========== تابع هشدار تاریخ - فقط با تاریخ میلادی ==========
// //   const getDateWarningInfo = (chequeDate) => {
// //     if (!chequeDate) return null;
    
// //     try {
// //       const today = new Date();
// //       today.setHours(0, 0, 0, 0);
      
// //       let chequeDateStr = String(chequeDate);
// //       if (chequeDateStr.includes('T')) {
// //         chequeDateStr = chequeDateStr.split('T')[0];
// //       }
      
// //       const targetDate = new Date(chequeDateStr);
      
// //       if (isNaN(targetDate.getTime())) return null;
      
// //       targetDate.setHours(0, 0, 0, 0);
      
// //       const diffTime = targetDate - today;
// //       const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
// //       if (diffDays < 0) {
// //         return {
// //           status: 'expired',
// //           color: '#dc2626',
// //           bg: '#fee2e2',
// //           border: '1px solid #fecaca',
// //           label: `🔴 ${Math.abs(diffDays)} روز گذشته`,
// //           priority: 1
// //         };
// //       }
// //       if (diffDays === 0) {
// //         return {
// //           status: 'today',
// //           color: '#dc2626',
// //           bg: '#fee2e2',
// //           border: '1px solid #fecaca',
// //           label: '🔴 امروز',
// //           priority: 1
// //         };
// //       }
// //       if (diffDays <= 10) {
// //         return {
// //           status: 'critical',
// //           color: '#dc2626',
// //           bg: '#fee2e2',
// //           border: '1px solid #fecaca',
// //           label: `🔴 ${diffDays} روز مانده`,
// //           priority: 1
// //         };
// //       }
// //       if (diffDays <= 30) {
// //         return {
// //           status: 'warning',
// //           color: '#ea580c',
// //           bg: '#ffedd5',
// //           border: '1px solid #fed7aa',
// //           label: `🟠 ${diffDays} روز مانده`,
// //           priority: 2
// //         };
// //       }
// //       if (diffDays <= 60) {
// //         return {
// //           status: 'info',
// //           color: '#d97706',
// //           bg: '#fef3c7',
// //           border: '1px solid #fde68a',
// //           label: `🟡 ${diffDays} روز مانده`,
// //           priority: 3
// //         };
// //       }
// //       return null;
// //     } catch (error) {
// //       console.error('Error calculating date warning:', error);
// //       return null;
// //     }
// //   };

// //   // رندر مودال پاپ‌آپ
// //   const renderPassModal = () => {
// //     if (!showPassModal) return null;
    
// //     return (
// //       <div className="modal-overlay" onClick={() => !submitting && setShowPassModal(false)}>
// //         <div className="modal-container" onClick={(e) => e.stopPropagation()}>
// //           <div className="modal-header">
// //             <h3>ثبت وضعیت چک</h3>
// //             {!submitting && (
// //               <button className="modal-close" onClick={() => setShowPassModal(false)}>
// //                 <FaTimes />
// //               </button>
// //             )}
// //           </div>
          
// //           <div className="modal-body">
// //             <div className="cheque-info">
// //               <p><strong>شماره سریال:</strong> {selectedCheque?.serialNumber || '---'}</p>
// //               <p><strong>شماره مالی:</strong> {selectedCheque?.serialFinancail || '---'}</p>
// //               <p><strong>مبلغ:</strong> {formatAmount(selectedCheque?.amount)} ریال</p>
// //               <p><strong>تاریخ چک:</strong> {formatDate(selectedCheque?.chequeDate)}</p>
// //               <p><strong>بانک:</strong> {selectedCheque?.bankName || '---'}</p>
// //             </div>
            
// //             {!showDelayForm ? (
// //               <>
// //                 <div className="modal-question">
// //                   <FaQuestionCircle className="question-icon" />
// //                   <p>آیا چک در سررسید پاس شده است؟</p>
// //                 </div>
                
// //                 <div className="modal-buttons">
// //                   <button 
// //                     className="btn-pass-yes"
// //                     onClick={handleSubmitPassed}
// //                     disabled={submitting}
// //                   >
// //                     {submitting ? <LoadingSpinner small text="" /> : '✅ بله، پاس شده'}
// //                   </button>
                  
// //                   <button 
// //                     className="btn-pass-no"
// //                     onClick={handleShowDelayForm}
// //                     disabled={submitting}
// //                   >
// //                     ❌ نه، دیر پاس شده
// //                   </button>
// //                 </div>
// //               </>
// //             ) : (
// //               <div className="delay-form">
// //                 <div className="form-group">
// //                   <label>تاریخ پاس شدن چک:</label>
// //                   <div className="date-picker-wrapper" ref={calendarRef}>
// //                     <div 
// //                       className="date-input-wrapper"
// //                       onClick={() => !submitting && setShowCalendar(!showCalendar)}
// //                     >
// //                       <FaCalendarAlt className="calendar-icon" />
// //                       <input
// //                         type="text"
// //                         value={delayDate ? convertToJalali(delayDate) : ''}
// //                         placeholder="انتخاب تاریخ"
// //                         readOnly
// //                         className="form-input date-input"
// //                         disabled={submitting}
// //                       />
// //                     </div>
// //                     {showCalendar && (
// //                       <div className="calendar-dropdown">
// //                         <Calendar
// //                           onChange={handleDateChange}
// //                           value={delayDate ? new Date(delayDate) : new Date()}
// //                           className="react-calendar-fa"
// //                           locale="fa"
// //                         />
// //                       </div>
// //                     )}
// //                   </div>
// //                 </div>
                
// //                 <div className="form-group">
// //                   <label>دلیل دیر پاس شدن:</label>
// //                   <textarea
// //                     value={delayReason}
// //                     onChange={(e) => setDelayReason(e.target.value)}
// //                     className="form-textarea"
// //                     rows="3"
// //                     placeholder="لطفا علت تاخیر در پاس شدن چک را وارد کنید..."
// //                     disabled={submitting}
// //                   />
// //                 </div>
                
// //                 <button 
// //                   className="btn-submit-delay"
// //                   onClick={handleSubmitDelayed}
// //                   disabled={submitting}
// //                 >
// //                   {submitting ? 'در حال ثبت...' : 'ثبت چک با تاخیر'}
// //                 </button>
                
// //                 <button 
// //                   className="btn-back"
// //                   onClick={() => setShowDelayForm(false)}
// //                   disabled={submitting}
// //                 >
// //                   بازگشت
// //                 </button>
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   };

// //   const start = ((pagination.currentPage - 1) * pagination.pageSize) + 1;
// //   const end = Math.min(start + pagination.pageSize - 1, pagination.totalCount);

// //   if (loading && items.length === 0) {
// //     return <LoadingSpinner text="در حال دریافت اطلاعات..." />;
// //   }

// //   return (
// //     <div className="documents-payable-page">
// //       <ToastContainer
// //         position="top-left"
// //         autoClose={5000}
// //         hideProgressBar={false}
// //         newestOnTop={false}
// //         closeOnClick
// //         rtl={true}
// //         pauseOnFocusLoss
// //         draggable
// //         pauseOnHover
// //         theme="light"
// //       />

// //       {/* Header with stats */}
// //       <div className="page-header">
// //         <div className="header-content">
// //           <div className="header-title">
// //             <h1>اسناد پرداختنی</h1>
// //           </div>
// //           <div className="header-stats">
// //             <div className="stat-card">
// //               <span className="stat-value">{pagination.totalCount.toLocaleString()}</span>
// //               <span className="stat-label">کل اسناد</span>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Tabs */}
// //       <div className="tabs-container">
// //         <button
// //           className={`tab-btn ${activeTab === 'incoming' ? 'active' : ''}`}
// //           onClick={() => setActiveTab('incoming')}
// //         >
// //           <FaFileInvoiceDollar className="tab-icon" />
// //           <span>اسناد ورودی</span>
// //           <span className="tab-badge">دریافتی</span>
// //         </button>
// //         <button
// //           className={`tab-btn ${activeTab === 'outgoing' ? 'active' : ''}`}
// //           onClick={() => setActiveTab('outgoing')}
// //         >
// //           <FaMoneyBillWave className="tab-icon" />
// //           <span>اسناد خروجی</span>
// //           <span className="tab-badge">پرداختی</span>
// //         </button>
// //       </div>

// //       {/* Actions Bar */}
// //       <div className="documents-actions">
// //         <div className="search-container">
// //           <div className="search-input-wrapper">
// //             <FaSearch className="search-icon" />
// //             <input
// //               type="text"
// //               placeholder="جستجو بر اساس شماره سریال، نام بانک یا توضیحات..."
// //               value={searchTerm}
// //               onChange={handleSearchChange}
// //               className="search-input"
// //               autoComplete="off"
// //               style={{ color: '#1f2937' }}
// //             />
// //             {searchTerm && (
// //               <button className="search-clear" onClick={clearSearch} type="button">
// //                 <FaTimes />
// //               </button>
// //             )}
// //           </div>
// //           {searchTerm && (
// //             <div className="search-info">
// //               <span className="search-term">جستجو: "{searchTerm}"</span>
// //               <span className="search-results">{pagination.totalCount} نتیجه</span>
// //             </div>
// //           )}
// //         </div>

// //         <div className="actions-right">
// //           <button 
// //             className="btn-refresh"
// //             onClick={handleRetry}
// //             disabled={loading}
// //           >
// //             <FaRedo className={loading ? 'spin' : ''} />
// //             <span>{loading ? 'در حال بروزرسانی...' : 'بروزرسانی'}</span>
// //           </button>

// //           <div className="page-size-selector">
// //             <label>تعداد در صفحه:</label>
// //             <select 
// //               value={pagination.pageSize}
// //               onChange={(e) => handlePageSizeChange(Number(e.target.value))}
// //               disabled={loading}
// //             >
// //               <option value="5">۵</option>
// //               <option value="10">۱۰</option>
// //               <option value="20">۲۰</option>
// //               <option value="50">۵۰</option>
// //               <option value="100">۱۰۰</option>
// //             </select>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Table Container */}
// //       <div className="documents-table-container">
// //         <table className="documents-table">
// //           <thead>
// //             <tr>
// //               <th className="col-index">#</th>
// //               <th className="col-serial">سریال صورت مالی</th>
// //               <th className="col-serial">شماره سریال</th>
// //               <th className="col-date">تاریخ چک</th>
// //               <th className="col-amount">مبلغ</th>
// //               <th className="col-bank">نام بانک</th>
// //               <th className="col-status">وضعیت</th>
// //               <th className="col-desc">توضیحات</th>
// //               <th className="col-action">عملیات</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {items.length === 0 ? (
// //               <tr className="no-data-row">
// //                 <td colSpan="9">
// //                   <div className="no-data-content">
// //                     <div className="no-data-icon">📄</div>
// //                     <h3>هیچ سندی یافت نشد</h3>
// //                     <p>
// //                       {searchTerm 
// //                         ? `نتیجه‌ای برای عبارت "${searchTerm}" پیدا نشد` 
// //                         : 'لیست اسناد در این بخش خالی است'}
// //                     </p>
// //                     {searchTerm && (
// //                       <button className="btn-clear-search" onClick={clearSearch}>
// //                         حذف فیلتر جستجو
// //                       </button>
// //                     )}
// //                   </div>
// //                   </td>
// //                </tr>
// //             ) : (
// //               items.map((item, index) => {
// //                 const statusInfo = getStatusInfo(item.paymentChequeStatus);
// //                 const dateWarning = getDateWarningInfo(item.chequeDate);
// //                 const rowPriorityClass = dateWarning ? `priority-${dateWarning.priority}` : '';
                
// //                 return (
// //                   <tr key={item.id} className={`document-row ${rowPriorityClass}`}>
// //                     <td className="col-index">
// //                       {((pagination.currentPage - 1) * pagination.pageSize) + index + 1}
// //                      </td>
// //                     <td className="col-serial">
// //                       <div className="serial-cell">
// //                         <FaHashtag className="serial-icon" />
// //                         <span className="serial-number">{item.serialFinancail || '---'}</span>
// //                       </div>
// //                      </td>
// //                     <td className="col-serial">
// //                       <div className="serial-cell">
// //                         <FaHashtag className="serial-icon" />
// //                         <span className="serial-number">{item.serialNumber || '---'}</span>
// //                       </div>
// //                      </td>
// //                     <td className="col-date">
// //                       <div 
// //                         className="date-cell"
// //                         style={dateWarning ? {
// //                           backgroundColor: dateWarning.bg,
// //                           borderRadius: '8px',
// //                           padding: '6px 12px',
// //                           border: dateWarning.border,
// //                           transition: 'all 0.3s ease'
// //                         } : {}}
// //                       >
// //                         <FaCalendarAlt className="date-icon" style={{ color: dateWarning?.color || '#6b7280' }} />
// //                         <div style={{ display: 'flex', flexDirection: 'column' }}>
// //                           <span style={{ 
// //                             color: dateWarning?.color || '#374151',
// //                             fontWeight: dateWarning ? '600' : 'normal',
// //                             fontSize: '13px'
// //                           }}>
// //                             {formatDate(item.chequeDate)}
// //                           </span>
// //                           {dateWarning && (
// //                             <span style={{ 
// //                               fontSize: '10px', 
// //                               color: dateWarning.color,
// //                               marginTop: '2px',
// //                               fontWeight: '500'
// //                             }}>
// //                               {dateWarning.label}
// //                             </span>
// //                           )}
// //                         </div>
// //                       </div>
// //                      </td>
// //                     <td className="col-amount">
// //                       <div className="amount-cell">
// //                         <span className="amount-value">{formatAmount(item.amount)}</span>
// //                         <span className="currency">ریال</span>
// //                       </div>
// //                      </td>
// //                     <td className="col-bank">
// //                       <div className="bank-cell">
// //                         <FaBuilding className="bank-icon" />
// //                         {item.bankName || '---'}
// //                       </div>
// //                      </td>
// //                     <td className="col-status">
// //                       <span 
// //                         className="status-badge"
// //                         style={{ 
// //                           backgroundColor: statusInfo.bg, 
// //                           color: statusInfo.color 
// //                         }}
// //                       >
// //                         <span className="status-icon">{statusInfo.icon}</span>
// //                         {item.paymentChequeStatusTitle || statusInfo.text}
// //                       </span>
// //                      </td>
// //                     <td className="col-desc">
// //                       <div className="desc-cell" title={item.desc || ''}>
// //                         {item.desc || '---'}
// //                       </div>
// //                      </td>
// //                     <td className="col-action">
// //                       <button
// //                         onClick={() => handleCheckPassed(item)}
// //                         className={`check-passed-btn ${(item.paymentChequeStatus === 2 || item.paymentChequeStatus === 3) ? 'disabled' : ''}`}
// //                         title="ثبت وضعیت پاس شدن چک"
// //                         disabled={item.paymentChequeStatus === 2 || item.paymentChequeStatus === 3}
// //                       >
// //                         <FaCheckCircle />
// //                         {/* <span>ثبت پاس</span> */}
// //                       </button>
// //                      </td>
// //                    </tr>
// //                 );
// //               })
// //             )}
// //           </tbody>
// //         </table>
// //       </div>

// //       {/* Pagination */}
// //       {pagination.totalPages > 1 && (
// //         <div className="pagination-wrapper">
// //           <Pagination
// //             currentPage={pagination.currentPage}
// //             totalPages={pagination.totalPages}
// //             totalItems={pagination.totalCount}
// //             pageSize={pagination.pageSize}
// //             onPageChange={handlePageChange}
// //           />
// //         </div>
// //       )}

// //       {/* Loading Overlay */}
// //       {loading && items.length > 0 && (
// //         <div className="loading-overlay">
// //           <LoadingSpinner text="در حال بروزرسانی..." />
// //         </div>
// //       )}

// //       {/* Modal for cheque status */}
// //       {renderPassModal()}
// //     </div>
// //   );
// // };

// // export default DocumentsPayable;
// // DocumentsPayable.jsx - نسخه کامل با دکمه برگشت خوردگی چک
// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import { documentsPayableService } from '../../../services/documentsPayable';
// import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner';
// import Pagination from '../../common/Pagination/Pagination';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
// import { 
//   FaSearch, 
//   FaRedo, 
//   FaFileInvoiceDollar,
//   FaMoneyBillWave,
//   FaCalendarAlt,
//   FaBuilding,
//   FaHashtag,
//   FaTimes,
//   FaCheckCircle,
//   FaQuestionCircle,
//   FaBan,
//   FaUndo
// } from 'react-icons/fa';
// import './DocumentsPayable.css';

// const DocumentsPayable = () => {
//   const [activeTab, setActiveTab] = useState('incoming');
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [pagination, setPagination] = useState({
//     currentPage: 1,
//     pageSize: 10,
//     totalCount: 0,
//     totalPages: 0
//   });
  
//   // State برای مودال ثبت پاس چک
//   const [showPassModal, setShowPassModal] = useState(false);
//   const [selectedCheque, setSelectedCheque] = useState(null);
//   const [delayDate, setDelayDate] = useState('');
//   const [delayReason, setDelayReason] = useState('');
//   const [submitting, setSubmitting] = useState(false);
//   const [showDelayForm, setShowDelayForm] = useState(false);
//   const [showCalendar, setShowCalendar] = useState(false);
  
//   // State برای مودال برگشت خوردگی چک
//   const [showReturnModal, setShowReturnModal] = useState(false);
//   const [returnReason, setReturnReason] = useState('');
//   const [returnDate, setReturnDate] = useState('');
//   const [showReturnCalendar, setShowReturnCalendar] = useState(false);
  
//   const searchTimeoutRef = useRef(null);
//   const calendarRef = useRef(null);
//   const returnCalendarRef = useRef(null);

//   // تعیین id بر اساس تب فعال
//   const getTabId = useCallback(() => {
//     return activeTab === 'incoming' ? 1 : 2;
//   }, [activeTab]);

//   // تابع دریافت داده‌ها
//   const fetchItems = useCallback(async (pageNumber, pageSize, search) => {
//     try {
//       setLoading(true);
      
//       const id = getTabId();
      
//       console.log('📡 Fetching data:', { id, pageNumber, pageSize, search });
      
//       let response;
//       if (activeTab === 'incoming') {
//         response = await documentsPayableService.getIncomingDocuments(id, pageNumber, pageSize, search);
//       } else {
//         response = await documentsPayableService.getIncomingDocuments(id, pageNumber, pageSize, search);
//       }
      
//       console.log('✅ Response:', response);
      
//       setItems(response?.items || []);
//       setPagination({
//         currentPage: pageNumber,
//         pageSize: pageSize,
//         totalCount: response?.totalCount || 0,
//         totalPages: response?.totalPages || 0
//       });
      
//     } catch (err) {
//       console.error('❌ Error fetching documents:', err);
//       toast.error('خطا در دریافت اطلاعات', {
//         position: "top-left",
//         autoClose: 3000,
//       });
//       setItems([]);
//     } finally {
//       setLoading(false);
//     }
//   }, [activeTab, getTabId]);

//   // بارگذاری اولیه و هنگام تغییر تب یا pageSize
//   useEffect(() => {
//     setPagination(prev => ({ ...prev, currentPage: 1 }));
//     fetchItems(1, pagination.pageSize, searchTerm);
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [activeTab, pagination.pageSize]);

//   // دیبونس سرچ
//   useEffect(() => {
//     if (searchTimeoutRef.current) {
//       clearTimeout(searchTimeoutRef.current);
//     }
    
//     searchTimeoutRef.current = setTimeout(() => {
//       if (searchTerm !== undefined) {
//         console.log('🔍 Searching with term:', searchTerm);
//         setPagination(prev => ({ ...prev, currentPage: 1 }));
//         fetchItems(1, pagination.pageSize, searchTerm);
//       }
//     }, 500);
    
//     return () => {
//       if (searchTimeoutRef.current) {
//         clearTimeout(searchTimeoutRef.current);
//       }
//     };
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [searchTerm]);

//   // بستن تقویم با کلیک خارج از آن
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (calendarRef.current && !calendarRef.current.contains(event.target)) {
//         setShowCalendar(false);
//       }
//       if (returnCalendarRef.current && !returnCalendarRef.current.contains(event.target)) {
//         setShowReturnCalendar(false);
//       }
//     };
    
//     if (showCalendar || showReturnCalendar) {
//       document.addEventListener('mousedown', handleClickOutside);
//     }
    
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [showCalendar, showReturnCalendar]);

//   const handlePageChange = (pageNumber) => {
//     setPagination(prev => ({ ...prev, currentPage: pageNumber }));
//     fetchItems(pageNumber, pagination.pageSize, searchTerm);
//   };

//   const handlePageSizeChange = (newPageSize) => {
//     setPagination(prev => ({
//       ...prev,
//       pageSize: newPageSize,
//       currentPage: 1
//     }));
//   };

//   const handleRetry = () => {
//     fetchItems(pagination.currentPage, pagination.pageSize, searchTerm);
//   };

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const clearSearch = () => {
//     setSearchTerm('');
//   };

//   // تبدیل تاریخ میلادی به شمسی برای نمایش
//   const convertToJalali = (gregorianDate) => {
//     if (!gregorianDate) return '';
//     try {
//       const date = new Date(gregorianDate);
//       const formatter = new Intl.DateTimeFormat('fa-IR', {
//         year: 'numeric',
//         month: '2-digit',
//         day: '2-digit'
//       });
//       return formatter.format(date);
//     } catch (error) {
//       return gregorianDate;
//     }
//   };

//   // تابع انتخاب تاریخ از تقویم برای فرم تاخیر
//   const handleDateChange = (date) => {
//     const formattedDate = date.toISOString().split('T')[0];
//     setDelayDate(formattedDate);
//     setShowCalendar(false);
//   };

//   // تابع انتخاب تاریخ برگشت خوردگی
//   const handleReturnDateChange = (date) => {
//     const formattedDate = date.toISOString().split('T')[0];
//     setReturnDate(formattedDate);
//     setShowReturnCalendar(false);
//   };

//   // ========== توابع ثبت پاس چک ==========
//   const handleCheckPassed = (cheque) => {
//     setSelectedCheque(cheque);
//     setShowDelayForm(false);
//     setDelayDate('');
//     setDelayReason('');
    
//     if (cheque.paymentChequeStatus === 2) {
//       toast.info('این چک قبلاً ثبت شده است', {
//         position: "top-left",
//         autoClose: 3000,
//       });
//       return;
//     }
//     if (cheque.paymentChequeStatus === 3) {
//       toast.info('این چک برگشت خورده است', {
//         position: "top-left",
//         autoClose: 3000,
//       });
//       return;
//     }
//     setShowPassModal(true);
//   };

//   const handleSubmitPassed = async () => {
//     try {
//       setSubmitting(true);
//       const response = await documentsPayableService.confirmChequePassed(selectedCheque.id);
      
//       if (response?.success) {
//         toast.success('چک با موفقیت به عنوان پاس شده ثبت گردید', {
//           position: "top-left",
//           autoClose: 3000,
//         });
//         setShowPassModal(false);
//         fetchItems(pagination.currentPage, pagination.pageSize, searchTerm);
//       } else {
//         throw new Error(response?.message || 'خطا در ثبت');
//       }
//     } catch (err) {
//       console.error('Error confirming cheque passed:', err);
//       toast.error(err.message || 'خطا در ثبت اطلاعات', {
//         position: "top-left",
//         autoClose: 3000,
//       });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleShowDelayForm = () => {
//     setShowDelayForm(true);
//     const today = new Date().toISOString().split('T')[0];
//     setDelayDate(today);
//   };

//   const handleSubmitDelayed = async () => {
//     if (!delayDate) {
//       toast.warning('لطفا تاریخ پاس شدن چک را انتخاب کنید', {
//         position: "top-left",
//         autoClose: 3000,
//       });
//       return;
//     }
    
//     if (!delayReason || delayReason.trim() === '') {
//       toast.warning('لطفا دلیل دیر پاس شدن را وارد کنید', {
//         position: "top-left",
//         autoClose: 3000,
//       });
//       return;
//     }
    
//     try {
//       setSubmitting(true);
//       const response = await documentsPayableService.confirmChequeDelayed(
//         selectedCheque.id,
//         delayDate,
//         delayReason
//       );
      
//       if (response?.success) {
//         toast.warning('چک با تاخیر ثبت گردید', {
//           position: "top-left",
//           autoClose: 3000,
//         });
//         setShowPassModal(false);
//         setDelayDate('');
//         setDelayReason('');
//         setShowDelayForm(false);
//         fetchItems(pagination.currentPage, pagination.pageSize, searchTerm);
//       } else {
//         throw new Error(response?.message || 'خطا در ثبت');
//       }
//     } catch (err) {
//       console.error('Error confirming cheque delayed:', err);
//       toast.error(err.message || 'خطا در ثبت اطلاعات', {
//         position: "top-left",
//         autoClose: 3000,
//       });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   // ========== توابع ثبت برگشت خوردگی چک ==========
//   const handleCheckReturned = (cheque) => {
//     setSelectedCheque(cheque);
//     setReturnReason('');
//     setReturnDate('');
    
//     if (cheque.paymentChequeStatus === 2) {
//       toast.info('این چک قبلاً پاس شده و قابل برگشت نیست', {
//         position: "top-left",
//         autoClose: 3000,
//       });
//       return;
//     }
//     if (cheque.paymentChequeStatus === 3) {
//       toast.info('این چک قبلاً برگشت خورده است', {
//         position: "top-left",
//         autoClose: 3000,
//       });
//       return;
//     }
//     setShowReturnModal(true);
//   };

//   const handleSubmitReturned = async () => {
//     if (!returnDate) {
//       toast.warning('لطفا تاریخ برگشت خوردگی چک را انتخاب کنید', {
//         position: "top-left",
//         autoClose: 3000,
//       });
//       return;
//     }
    
//     if (!returnReason || returnReason.trim() === '') {
//       toast.warning('لطفا دلیل برگشت خوردگی را وارد کنید', {
//         position: "top-left",
//         autoClose: 3000,
//       });
//       return;
//     }
    
//     try {
//       setSubmitting(true);
//       const response = await documentsPayableService.confirmChequeReturned(
//         selectedCheque.id,
//         returnDate,
//         returnReason
//       );
      
//       if (response?.success) {
//         toast.error('چک به عنوان برگشت خورده ثبت گردید', {
//           position: "top-left",
//           autoClose: 3000,
//         });
//         setShowReturnModal(false);
//         setReturnReason('');
//         setReturnDate('');
//         fetchItems(pagination.currentPage, pagination.pageSize, searchTerm);
//       } else {
//         throw new Error(response?.message || 'خطا در ثبت');
//       }
//     } catch (err) {
//       console.error('Error confirming cheque returned:', err);
//       toast.error(err.message || 'خطا در ثبت اطلاعات', {
//         position: "top-left",
//         autoClose: 3000,
//       });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const getStatusInfo = (status) => {
//     const statusMap = {
//       4: { text: 'خطا', color: '#ef4444', bg: '#fee2e2', icon: '❌' },
//       0: { text: 'در انتظار', color: '#f59e0b', bg: '#fef3c7', icon: '⏳' },
//       2: { text: 'تأیید شده', color: '#10b981', bg: '#d1fae5', icon: '✅' },
//       3: { text: 'برگشت خورده', color: '#dc2626', bg: '#fee2e2', icon: '🚫' },
//     };
//     return statusMap[status] || { text: 'نامشخص', color: '#6b7280', bg: '#f3f4f6', icon: '❓' };
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return '---';
//     return dateString.split('T')[0].replace(/-/g, '/');
//   };

//   const formatAmount = (amount) => {
//     if (!amount && amount !== 0) return '---';
//     return amount.toLocaleString('fa-IR');
//   };

//   const getDateWarningInfo = (chequeDate) => {
//     if (!chequeDate) return null;
    
//     try {
//       const today = new Date();
//       today.setHours(0, 0, 0, 0);
      
//       let chequeDateStr = String(chequeDate);
//       if (chequeDateStr.includes('T')) {
//         chequeDateStr = chequeDateStr.split('T')[0];
//       }
      
//       const targetDate = new Date(chequeDateStr);
      
//       if (isNaN(targetDate.getTime())) return null;
      
//       targetDate.setHours(0, 0, 0, 0);
      
//       const diffTime = targetDate - today;
//       const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
//       if (diffDays < 0) {
//         return {
//           status: 'expired',
//           color: '#dc2626',
//           bg: '#fee2e2',
//           border: '1px solid #fecaca',
//           label: `🔴 ${Math.abs(diffDays)} روز گذشته`,
//           priority: 1
//         };
//       }
//       if (diffDays === 0) {
//         return {
//           status: 'today',
//           color: '#dc2626',
//           bg: '#fee2e2',
//           border: '1px solid #fecaca',
//           label: '🔴 امروز',
//           priority: 1
//         };
//       }
//       if (diffDays <= 10) {
//         return {
//           status: 'critical',
//           color: '#dc2626',
//           bg: '#fee2e2',
//           border: '1px solid #fecaca',
//           label: `🔴 ${diffDays} روز مانده`,
//           priority: 1
//         };
//       }
//       if (diffDays <= 30) {
//         return {
//           status: 'warning',
//           color: '#ea580c',
//           bg: '#ffedd5',
//           border: '1px solid #fed7aa',
//           label: `🟠 ${diffDays} روز مانده`,
//           priority: 2
//         };
//       }
//       if (diffDays <= 60) {
//         return {
//           status: 'info',
//           color: '#d97706',
//           bg: '#fef3c7',
//           border: '1px solid #fde68a',
//           label: `🟡 ${diffDays} روز مانده`,
//           priority: 3
//         };
//       }
//       return null;
//     } catch (error) {
//       console.error('Error calculating date warning:', error);
//       return null;
//     }
//   };

//   // رندر مودال پاس شدن چک
//   const renderPassModal = () => {
//     if (!showPassModal) return null;
    
//     return (
//       <div className="modal-overlay" onClick={() => !submitting && setShowPassModal(false)}>
//         <div className="modal-container" onClick={(e) => e.stopPropagation()}>
//           <div className="modal-header">
//             <h3>ثبت وضعیت چک</h3>
//             {!submitting && (
//               <button className="modal-close" onClick={() => setShowPassModal(false)}>
//                 <FaTimes />
//               </button>
//             )}
//           </div>
          
//           <div className="modal-body">
//             <div className="cheque-info">
//               <p><strong>شماره سریال:</strong> {selectedCheque?.serialNumber || '---'}</p>
//               <p><strong>شماره مالی:</strong> {selectedCheque?.serialFinancail || '---'}</p>
//               <p><strong>مبلغ:</strong> {formatAmount(selectedCheque?.amount)} ریال</p>
//               <p><strong>تاریخ چک:</strong> {formatDate(selectedCheque?.chequeDate)}</p>
//               <p><strong>بانک:</strong> {selectedCheque?.bankName || '---'}</p>
//             </div>
            
//             {!showDelayForm ? (
//               <>
//                 <div className="modal-question">
//                   <FaQuestionCircle className="question-icon" />
//                   <p>آیا چک در سررسید پاس شده است؟</p>
//                 </div>
                
//                 <div className="modal-buttons">
//                   <button 
//                     className="btn-pass-yes"
//                     onClick={handleSubmitPassed}
//                     disabled={submitting}
//                   >
//                     {submitting ? <LoadingSpinner small text="" /> : '✅ بله، پاس شده'}
//                   </button>
                  
//                   <button 
//                     className="btn-pass-no"
//                     onClick={handleShowDelayForm}
//                     disabled={submitting}
//                   >
//                     ❌ نه، دیر پاس شده
//                   </button>
//                 </div>
//               </>
//             ) : (
//               <div className="delay-form">
//                 <div className="form-group">
//                   <label>تاریخ پاس شدن چک:</label>
//                   <div className="date-picker-wrapper" ref={calendarRef}>
//                     <div 
//                       className="date-input-wrapper"
//                       onClick={() => !submitting && setShowCalendar(!showCalendar)}
//                     >
//                       <FaCalendarAlt className="calendar-icon" />
//                       <input
//                         type="text"
//                         value={delayDate ? convertToJalali(delayDate) : ''}
//                         placeholder="انتخاب تاریخ"
//                         readOnly
//                         className="form-input date-input"
//                         disabled={submitting}
//                       />
//                     </div>
//                     {showCalendar && (
//                       <div className="calendar-dropdown">
//                         <Calendar
//                           onChange={handleDateChange}
//                           value={delayDate ? new Date(delayDate) : new Date()}
//                           className="react-calendar-fa"
//                           locale="fa"
//                         />
//                       </div>
//                     )}
//                   </div>
//                 </div>
                
//                 <div className="form-group">
//                   <label>دلیل دیر پاس شدن:</label>
//                   <textarea
//                     value={delayReason}
//                     onChange={(e) => setDelayReason(e.target.value)}
//                     className="form-textarea"
//                     rows="3"
//                     placeholder="لطفا علت تاخیر در پاس شدن چک را وارد کنید..."
//                     disabled={submitting}
//                   />
//                 </div>
                
//                 <button 
//                   className="btn-submit-delay"
//                   onClick={handleSubmitDelayed}
//                   disabled={submitting}
//                 >
//                   {submitting ? 'در حال ثبت...' : 'ثبت چک با تاخیر'}
//                 </button>
                
//                 <button 
//                   className="btn-back"
//                   onClick={() => setShowDelayForm(false)}
//                   disabled={submitting}
//                 >
//                   بازگشت
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // رندر مودال برگشت خوردگی چک
//   const renderReturnModal = () => {
//     if (!showReturnModal) return null;
    
//     return (
//       <div className="modal-overlay" onClick={() => !submitting && setShowReturnModal(false)}>
//         <div className="modal-container return-modal" onClick={(e) => e.stopPropagation()}>
//           <div className="modal-header return-header">
//             <h3>ثبت برگشت خوردگی چک</h3>
//             {!submitting && (
//               <button className="modal-close" onClick={() => setShowReturnModal(false)}>
//                 <FaTimes />
//               </button>
//             )}
//           </div>
          
//           <div className="modal-body">
//             <div className="cheque-info">
//               <p><strong>شماره سریال:</strong> {selectedCheque?.serialNumber || '---'}</p>
//               <p><strong>شماره مالی:</strong> {selectedCheque?.serialFinancail || '---'}</p>
//               <p><strong>مبلغ:</strong> {formatAmount(selectedCheque?.amount)} ریال</p>
//               <p><strong>تاریخ چک:</strong> {formatDate(selectedCheque?.chequeDate)}</p>
//               <p><strong>بانک:</strong> {selectedCheque?.bankName || '---'}</p>
//             </div>
            
//             <div className="return-form">
//               <div className="form-group">
//                 <label>تاریخ برگشت خوردگی:</label>
//                 <div className="date-picker-wrapper" ref={returnCalendarRef}>
//                   <div 
//                     className="date-input-wrapper"
//                     onClick={() => !submitting && setShowReturnCalendar(!showReturnCalendar)}
//                   >
//                     <FaCalendarAlt className="calendar-icon" />
//                     <input
//                       type="text"
//                       value={returnDate ? convertToJalali(returnDate) : ''}
//                       placeholder="انتخاب تاریخ برگشت"
//                       readOnly
//                       className="form-input date-input"
//                       disabled={submitting}
//                     />
//                   </div>
//                   {showReturnCalendar && (
//                     <div className="calendar-dropdown">
//                       <Calendar
//                         onChange={handleReturnDateChange}
//                         value={returnDate ? new Date(returnDate) : new Date()}
//                         className="react-calendar-fa"
//                         locale="fa"
//                       />
//                     </div>
//                   )}
//                 </div>
//               </div>
              
//               <div className="form-group">
//                 <label>دلیل برگشت خوردگی:</label>
//                 <textarea
//                   value={returnReason}
//                   onChange={(e) => setReturnReason(e.target.value)}
//                   className="form-textarea"
//                   rows="3"
//                   placeholder="لطفا علت برگشت خوردگی چک را وارد کنید... (مثلاً: موجودی ناکافی، دست خط، مخدوش بودن، etc.)"
//                   disabled={submitting}
//                 />
//               </div>
              
//               <button 
//                 className="btn-submit-return"
//                 onClick={handleSubmitReturned}
//                 disabled={submitting}
//               >
//                 {submitting ? 'در حال ثبت...' : 'ثبت چک برگشت خورده'}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const start = ((pagination.currentPage - 1) * pagination.pageSize) + 1;
//   const end = Math.min(start + pagination.pageSize - 1, pagination.totalCount);

//   if (loading && items.length === 0) {
//     return <LoadingSpinner text="در حال دریافت اطلاعات..." />;
//   }

//   return (
//     <div className="documents-payable-page">
//       <ToastContainer
//         position="top-left"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={true}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="light"
//       />

//       <div className="page-header">
//         <div className="header-content">
//           <div className="header-title">
//             <h1>اسناد پرداختنی</h1>
//           </div>
//           <div className="header-stats">
//             <div className="stat-card">
//               <span className="stat-value">{pagination.totalCount.toLocaleString()}</span>
//               <span className="stat-label">کل اسناد</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="tabs-container">
//         <button
//           className={`tab-btn ${activeTab === 'incoming' ? 'active' : ''}`}
//           onClick={() => setActiveTab('incoming')}
//         >
//           <FaFileInvoiceDollar className="tab-icon" />
//           <span>اسناد ورودی</span>
//           <span className="tab-badge">دریافتی</span>
//         </button>
//         <button
//           className={`tab-btn ${activeTab === 'outgoing' ? 'active' : ''}`}
//           onClick={() => setActiveTab('outgoing')}
//         >
//           <FaMoneyBillWave className="tab-icon" />
//           <span>اسناد خروجی</span>
//           <span className="tab-badge">پرداختی</span>
//         </button>
//       </div>

//       <div className="documents-actions">
//         <div className="search-container">
//           <div className="search-input-wrapper">
//             <FaSearch className="search-icon" />
//             <input
//               type="text"
//               placeholder="جستجو بر اساس شماره سریال، نام بانک یا توضیحات..."
//               value={searchTerm}
//               onChange={handleSearchChange}
//               className="search-input"
//               autoComplete="off"
//               style={{ color: '#1f2937' }}
//             />
//             {searchTerm && (
//               <button className="search-clear" onClick={clearSearch} type="button">
//                 <FaTimes />
//               </button>
//             )}
//           </div>
//           {searchTerm && (
//             <div className="search-info">
//               <span className="search-term">جستجو: "{searchTerm}"</span>
//               <span className="search-results">{pagination.totalCount} نتیجه</span>
//             </div>
//           )}
//         </div>

//         <div className="actions-right">
//           <button 
//             className="btn-refresh"
//             onClick={handleRetry}
//             disabled={loading}
//           >
//             <FaRedo className={loading ? 'spin' : ''} />
//             <span>{loading ? 'در حال بروزرسانی...' : 'بروزرسانی'}</span>
//           </button>

//           <div className="page-size-selector">
//             <label>تعداد در صفحه:</label>
//             <select 
//               value={pagination.pageSize}
//               onChange={(e) => handlePageSizeChange(Number(e.target.value))}
//               disabled={loading}
//             >
//               <option value="5">۵</option>
//               <option value="10">۱۰</option>
//               <option value="20">۲۰</option>
//               <option value="50">۵۰</option>
//               <option value="100">۱۰۰</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       <div className="documents-table-container">
//         <table className="documents-table">
//           <thead>
//             <tr>
//               <th className="col-index">#</th>
//               <th className="col-serial">سریال صورت مالی</th>
//               <th className="col-serial">شماره سریال</th>
//               <th className="col-date">تاریخ چک</th>
//               <th className="col-amount">مبلغ</th>
//               <th className="col-bank">نام بانک</th>
//               <th className="col-status">وضعیت</th>
//               <th className="col-desc">توضیحات</th>
//               <th className="col-action">عملیات</th>
//             </tr>
//           </thead>
//           <tbody>
//             {items.length === 0 ? (
//               <tr className="no-data-row">
//                 <td colSpan="9">
//                   <div className="no-data-content">
//                     <div className="no-data-icon">📄</div>
//                     <h3>هیچ سندی یافت نشد</h3>
//                     <p>
//                       {searchTerm 
//                         ? `نتیجه‌ای برای عبارت "${searchTerm}" پیدا نشد` 
//                         : 'لیست اسناد در این بخش خالی است'}
//                     </p>
//                     {searchTerm && (
//                       <button className="btn-clear-search" onClick={clearSearch}>
//                         حذف فیلتر جستجو
//                       </button>
//                     )}
//                   </div>
//                 </td>
//               </tr>
//             ) : (
//               items.map((item, index) => {
//                 const statusInfo = getStatusInfo(item.paymentChequeStatus);
//                 const dateWarning = getDateWarningInfo(item.chequeDate);
//                 const rowPriorityClass = dateWarning ? `priority-${dateWarning.priority}` : '';
//                 const isDisabled = item.paymentChequeStatus === 2 || item.paymentChequeStatus === 3;
//                 const isReturned = item.paymentChequeStatus === 3;
//                 const isPassed = item.paymentChequeStatus === 2;
                
//                 return (
//                   <tr key={item.id} className={`document-row ${rowPriorityClass}`}>
//                     <td className="col-index">
//                       {((pagination.currentPage - 1) * pagination.pageSize) + index + 1}
//                     </td>
//                     <td className="col-serial">
//                       <div className="serial-cell">
//                         <FaHashtag className="serial-icon" />
//                         <span className="serial-number">{item.serialFinancail || '---'}</span>
//                       </div>
//                     </td>
//                     <td className="col-serial">
//                       <div className="serial-cell">
//                         <FaHashtag className="serial-icon" />
//                         <span className="serial-number">{item.serialNumber || '---'}</span>
//                       </div>
//                     </td>
//                     <td className="col-date">
//                       <div 
//                         className="date-cell"
//                         style={dateWarning ? {
//                           backgroundColor: dateWarning.bg,
//                           borderRadius: '8px',
//                           padding: '6px 12px',
//                           border: dateWarning.border,
//                           transition: 'all 0.3s ease'
//                         } : {}}
//                       >
//                         <FaCalendarAlt className="date-icon" style={{ color: dateWarning?.color || '#6b7280' }} />
//                         <div style={{ display: 'flex', flexDirection: 'column' }}>
//                           <span style={{ 
//                             color: dateWarning?.color || '#374151',
//                             fontWeight: dateWarning ? '600' : 'normal',
//                             fontSize: '13px'
//                           }}>
//                             {formatDate(item.chequeDate)}
//                           </span>
//                           {dateWarning && (
//                             <span style={{ 
//                               fontSize: '10px', 
//                               color: dateWarning.color,
//                               marginTop: '2px',
//                               fontWeight: '500'
//                             }}>
//                               {dateWarning.label}
//                             </span>
//                           )}
//                         </div>
//                       </div>
//                     </td>
//                     <td className="col-amount">
//                       <div className="amount-cell">
//                         <span className="amount-value">{formatAmount(item.amount)}</span>
//                         <span className="currency">ریال</span>
//                       </div>
//                     </td>
//                     <td className="col-bank">
//                       <div className="bank-cell">
//                         <FaBuilding className="bank-icon" />
//                         {item.bankName || '---'}
//                       </div>
//                     </td>
//                     <td className="col-status">
//                       <span 
//                         className="status-badge"
//                         style={{ 
//                           backgroundColor: statusInfo.bg, 
//                           color: statusInfo.color 
//                         }}
//                       >
//                         <span className="status-icon">{statusInfo.icon}</span>
//                         {item.paymentChequeStatusTitle || statusInfo.text}
//                       </span>
//                     </td>
//                     <td className="col-desc">
//                       <div className="desc-cell" title={item.desc || ''}>
//                         {item.desc || '---'}
//                       </div>
//                     </td>
//                     <td className="col-action">
//                       <div className="action-buttons">
//                         <button
//                           onClick={() => handleCheckPassed(item)}
//                           className={`action-btn btn-pass ${isDisabled || isReturned ? 'disabled' : ''}`}
//                           title="ثبت پاس شدن چک"
//                           disabled={isDisabled || isReturned}
//                         >
//                           <FaCheckCircle />
//                           {/* <span>پاس</span> */}
//                         </button>
//                         <button
//                           onClick={() => handleCheckReturned(item)}
//                           className={`action-btn btn-return ${isDisabled || isPassed ? 'disabled' : ''}`}
//                           title="ثبت برگشت خوردگی چک"
//                           disabled={isDisabled || isPassed}
//                         >
//                           <FaBan />
//                           {/* <span>برگشت</span> */}
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 );
//               })
//             )}
//           </tbody>
//         </table>
//       </div>

//       {pagination.totalPages > 1 && (
//         <div className="pagination-wrapper">
//           <Pagination
//             currentPage={pagination.currentPage}
//             totalPages={pagination.totalPages}
//             totalItems={pagination.totalCount}
//             pageSize={pagination.pageSize}
//             onPageChange={handlePageChange}
//           />
//         </div>
//       )}

//       {loading && items.length > 0 && (
//         <div className="loading-overlay">
//           <LoadingSpinner text="در حال بروزرسانی..." />
//         </div>
//       )}

//       {renderPassModal()}
//       {renderReturnModal()}
//     </div>
//   );
// };

// export default DocumentsPayable;

// DocumentsPayable.jsx - نسخه کامل با دکمه‌های پاس، برگشت، ویرایش و حذف
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { documentsPayableService } from '../../../services/documentsPayable';
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner';
import Pagination from '../../common/Pagination/Pagination';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { 
  FaSearch, 
  FaRedo, 
  FaFileInvoiceDollar,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaBuilding,
  FaHashtag,
  FaTimes,
  FaCheckCircle,
  FaQuestionCircle,
  FaBan,
  FaEdit,
  FaTrashAlt,
  FaSave,
  FaTimesCircle
} from 'react-icons/fa';
import './DocumentsPayable.css';

const DocumentsPayable = () => {
  const [activeTab, setActiveTab] = useState('incoming');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 0
  });
  
  // State برای مودال ثبت پاس چک
  const [showPassModal, setShowPassModal] = useState(false);
  const [selectedCheque, setSelectedCheque] = useState(null);
  const [delayDate, setDelayDate] = useState('');
  const [delayReason, setDelayReason] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showDelayForm, setShowDelayForm] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  
  // State برای مودال برگشت خوردگی چک
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [returnReason, setReturnReason] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [showReturnCalendar, setShowReturnCalendar] = useState(false);
  
  // State برای ویرایش چک
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCheque, setEditingCheque] = useState(null);
  const [editFormData, setEditFormData] = useState({
    serialNumber: '',
    serialFinancail: '',
    amount: '',
    bankName: '',
    chequeDate: '',
    desc: ''
  });
  
  // State برای حذف چک
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingCheque, setDeletingCheque] = useState(null);
  
  const searchTimeoutRef = useRef(null);
  const calendarRef = useRef(null);
  const returnCalendarRef = useRef(null);

  // تعیین id بر اساس تب فعال
  const getTabId = useCallback(() => {
    return activeTab === 'incoming' ? 1 : 2;
  }, [activeTab]);

  // تابع دریافت داده‌ها
  const fetchItems = useCallback(async (pageNumber, pageSize, search) => {
    try {
      setLoading(true);
      
      const id = getTabId();
      
      console.log('📡 Fetching data:', { id, pageNumber, pageSize, search });
      
      let response;
      if (activeTab === 'incoming') {
        response = await documentsPayableService.getIncomingDocuments(id, pageNumber, pageSize, search);
      } else {
        response = await documentsPayableService.getIncomingDocuments(id, pageNumber, pageSize, search);
      }
      
      console.log('✅ Response:', response);
      
      setItems(response?.items || []);
      setPagination({
        currentPage: pageNumber,
        pageSize: pageSize,
        totalCount: response?.totalCount || 0,
        totalPages: response?.totalPages || 0
      });
      
    } catch (err) {
      console.error('❌ Error fetching documents:', err);
      toast.error('خطا در دریافت اطلاعات', {
        position: "top-left",
        autoClose: 3000,
      });
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [activeTab, getTabId]);

  // بارگذاری اولیه و هنگام تغییر تب یا pageSize
  useEffect(() => {
    setPagination(prev => ({ ...prev, currentPage: 1 }));
    fetchItems(1, pagination.pageSize, searchTerm);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, pagination.pageSize]);

  // دیبونس سرچ
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    searchTimeoutRef.current = setTimeout(() => {
      if (searchTerm !== undefined) {
        console.log('🔍 Searching with term:', searchTerm);
        setPagination(prev => ({ ...prev, currentPage: 1 }));
        fetchItems(1, pagination.pageSize, searchTerm);
      }
    }, 500);
    
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  // بستن تقویم با کلیک خارج از آن
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
      if (returnCalendarRef.current && !returnCalendarRef.current.contains(event.target)) {
        setShowReturnCalendar(false);
      }
    };
    
    if (showCalendar || showReturnCalendar) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCalendar, showReturnCalendar]);

  const handlePageChange = (pageNumber) => {
    setPagination(prev => ({ ...prev, currentPage: pageNumber }));
    fetchItems(pageNumber, pagination.pageSize, searchTerm);
  };

  const handlePageSizeChange = (newPageSize) => {
    setPagination(prev => ({
      ...prev,
      pageSize: newPageSize,
      currentPage: 1
    }));
  };

  const handleRetry = () => {
    fetchItems(pagination.currentPage, pagination.pageSize, searchTerm);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  // تبدیل تاریخ میلادی به شمسی برای نمایش
  const convertToJalali = (gregorianDate) => {
    if (!gregorianDate) return '';
    try {
      const date = new Date(gregorianDate);
      const formatter = new Intl.DateTimeFormat('fa-IR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
      return formatter.format(date);
    } catch (error) {
      return gregorianDate;
    }
  };

  // تابع انتخاب تاریخ از تقویم برای فرم تاخیر
  const handleDateChange = (date) => {
    const formattedDate = date.toISOString().split('T')[0];
    setDelayDate(formattedDate);
    setShowCalendar(false);
  };

  // تابع انتخاب تاریخ برگشت خوردگی
  const handleReturnDateChange = (date) => {
    const formattedDate = date.toISOString().split('T')[0];
    setReturnDate(formattedDate);
    setShowReturnCalendar(false);
  };

  // ========== توابع ثبت پاس چک ==========
  const handleCheckPassed = (cheque) => {
    setSelectedCheque(cheque);
    setShowDelayForm(false);
    setDelayDate('');
    setDelayReason('');
    
    if (cheque.paymentChequeStatus === 2) {
      toast.info('این چک قبلاً ثبت شده است', {
        position: "top-left",
        autoClose: 3000,
      });
      return;
    }
    if (cheque.paymentChequeStatus === 3) {
      toast.info('این چک برگشت خورده است', {
        position: "top-left",
        autoClose: 3000,
      });
      return;
    }
    setShowPassModal(true);
  };

  const handleSubmitPassed = async () => {
    try {
      setSubmitting(true);
      const response = await documentsPayableService.confirmChequePassed(selectedCheque.id);
      
      if (response?.success) {
        toast.success('چک با موفقیت به عنوان پاس شده ثبت گردید', {
          position: "top-left",
          autoClose: 3000,
        });
        setShowPassModal(false);
        fetchItems(pagination.currentPage, pagination.pageSize, searchTerm);
      } else {
        throw new Error(response?.message || 'خطا در ثبت');
      }
    } catch (err) {
      console.error('Error confirming cheque passed:', err);
      toast.error(err.message || 'خطا در ثبت اطلاعات', {
        position: "top-left",
        autoClose: 3000,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleShowDelayForm = () => {
    setShowDelayForm(true);
    const today = new Date().toISOString().split('T')[0];
    setDelayDate(today);
  };

  const handleSubmitDelayed = async () => {
    if (!delayDate) {
      toast.warning('لطفا تاریخ پاس شدن چک را انتخاب کنید', {
        position: "top-left",
        autoClose: 3000,
      });
      return;
    }
    
    if (!delayReason || delayReason.trim() === '') {
      toast.warning('لطفا دلیل دیر پاس شدن را وارد کنید', {
        position: "top-left",
        autoClose: 3000,
      });
      return;
    }
    
    try {
      setSubmitting(true);
      const response = await documentsPayableService.confirmChequeDelayed(
        selectedCheque.id,
        delayDate,
        delayReason
      );
      
      if (response?.success) {
        toast.warning('چک با تاخیر ثبت گردید', {
          position: "top-left",
          autoClose: 3000,
        });
        setShowPassModal(false);
        setDelayDate('');
        setDelayReason('');
        setShowDelayForm(false);
        fetchItems(pagination.currentPage, pagination.pageSize, searchTerm);
      } else {
        throw new Error(response?.message || 'خطا در ثبت');
      }
    } catch (err) {
      console.error('Error confirming cheque delayed:', err);
      toast.error(err.message || 'خطا در ثبت اطلاعات', {
        position: "top-left",
        autoClose: 3000,
      });
    } finally {
      setSubmitting(false);
    }
  };

  // ========== توابع ثبت برگشت خوردگی چک ==========
  const handleCheckReturned = (cheque) => {
    setSelectedCheque(cheque);
    setReturnReason('');
    setReturnDate('');
    
    if (cheque.paymentChequeStatus === 2) {
      toast.info('این چک قبلاً پاس شده و قابل برگشت نیست', {
        position: "top-left",
        autoClose: 3000,
      });
      return;
    }
    if (cheque.paymentChequeStatus === 3) {
      toast.info('این چک قبلاً برگشت خورده است', {
        position: "top-left",
        autoClose: 3000,
      });
      return;
    }
    setShowReturnModal(true);
  };

  const handleSubmitReturned = async () => {
    if (!returnDate) {
      toast.warning('لطفا تاریخ برگشت خوردگی چک را انتخاب کنید', {
        position: "top-left",
        autoClose: 3000,
      });
      return;
    }
    
    if (!returnReason || returnReason.trim() === '') {
      toast.warning('لطفا دلیل برگشت خوردگی را وارد کنید', {
        position: "top-left",
        autoClose: 3000,
      });
      return;
    }
    
    try {
      setSubmitting(true);
      const response = await documentsPayableService.confirmChequeReturned(
        selectedCheque.id,
        returnDate,
        returnReason
      );
      
      if (response?.success) {
        toast.error('چک به عنوان برگشت خورده ثبت گردید', {
          position: "top-left",
          autoClose: 3000,
        });
        setShowReturnModal(false);
        setReturnReason('');
        setReturnDate('');
        fetchItems(pagination.currentPage, pagination.pageSize, searchTerm);
      } else {
        throw new Error(response?.message || 'خطا در ثبت');
      }
    } catch (err) {
      console.error('Error confirming cheque returned:', err);
      toast.error(err.message || 'خطا در ثبت اطلاعات', {
        position: "top-left",
        autoClose: 3000,
      });
    } finally {
      setSubmitting(false);
    }
  };

  // ========== توابع ویرایش چک ==========
  const handleEdit = (cheque) => {
    setEditingCheque(cheque);
    setEditFormData({
      serialNumber: cheque.serialNumber || '',
      serialFinancail: cheque.serialFinancail || '',
      amount: cheque.amount || '',
      bankName: cheque.bankName || '',
      chequeDate: cheque.chequeDate ? cheque.chequeDate.split('T')[0] : '',
      desc: cheque.desc || ''
    });
    setShowEditModal(true);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditDateChange = (date) => {
    const formattedDate = date.toISOString().split('T')[0];
    setEditFormData(prev => ({
      ...prev,
      chequeDate: formattedDate
    }));
  };

  const handleSubmitEdit = async () => {
    if (!editFormData.serialNumber) {
      toast.warning('لطفا شماره سریال را وارد کنید', { position: "top-left" });
      return;
    }
    if (!editFormData.amount) {
      toast.warning('لطفا مبلغ را وارد کنید', { position: "top-left" });
      return;
    }
    if (!editFormData.chequeDate) {
      toast.warning('لطفا تاریخ چک را وارد کنید', { position: "top-left" });
      return;
    }

    try {
      setSubmitting(true);
      const response = await documentsPayableService.updateCheque(
        editingCheque.id,
        editFormData
      );
      
      if (response?.success) {
        toast.success('اطلاعات چک با موفقیت ویرایش شد', {
          position: "top-left",
          autoClose: 3000,
        });
        setShowEditModal(false);
        setEditingCheque(null);
        fetchItems(pagination.currentPage, pagination.pageSize, searchTerm);
      } else {
        throw new Error(response?.message || 'خطا در ویرایش');
      }
    } catch (err) {
      console.error('Error updating cheque:', err);
      toast.error(err.message || 'خطا در ویرایش اطلاعات', {
        position: "top-left",
        autoClose: 3000,
      });
    } finally {
      setSubmitting(false);
    }
  };

  // ========== توابع حذف چک ==========
  const handleDelete = (cheque) => {
    setDeletingCheque(cheque);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      setSubmitting(true);
      const response = await documentsPayableService.deleteCheque(deletingCheque.id);
      
      if (response?.success) {
        toast.success('چک با موفقیت حذف شد', {
          position: "top-left",
          autoClose: 3000,
        });
        setShowDeleteModal(false);
        setDeletingCheque(null);
        fetchItems(pagination.currentPage, pagination.pageSize, searchTerm);
      } else {
        throw new Error(response?.message || 'خطا در حذف');
      }
    } catch (err) {
      console.error('Error deleting cheque:', err);
      toast.error(err.message || 'خطا در حذف اطلاعات', {
        position: "top-left",
        autoClose: 3000,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusInfo = (status) => {
    const statusMap = {
      4: { text: 'خطا', color: '#ef4444', bg: '#fee2e2', icon: '❌' },
      0: { text: 'در انتظار', color: '#f59e0b', bg: '#fef3c7', icon: '⏳' },
      2: { text: 'تأیید شده', color: '#10b981', bg: '#d1fae5', icon: '✅' },
      3: { text: 'برگشت خورده', color: '#dc2626', bg: '#fee2e2', icon: '🚫' },
    };
    return statusMap[status] || { text: 'نامشخص', color: '#6b7280', bg: '#f3f4f6', icon: '❓' };
  };

  const formatDate = (dateString) => {
    if (!dateString) return '---';
    return dateString.split('T')[0].replace(/-/g, '/');
  };

  const formatAmount = (amount) => {
    if (!amount && amount !== 0) return '---';
    return amount.toLocaleString('fa-IR');
  };

  const getDateWarningInfo = (chequeDate) => {
    if (!chequeDate) return null;
    
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      let chequeDateStr = String(chequeDate);
      if (chequeDateStr.includes('T')) {
        chequeDateStr = chequeDateStr.split('T')[0];
      }
      
      const targetDate = new Date(chequeDateStr);
      
      if (isNaN(targetDate.getTime())) return null;
      
      targetDate.setHours(0, 0, 0, 0);
      
      const diffTime = targetDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays < 0) {
        return {
          status: 'expired',
          color: '#dc2626',
          bg: '#fee2e2',
          border: '1px solid #fecaca',
          label: `🔴 ${Math.abs(diffDays)} روز گذشته`,
          priority: 1
        };
      }
      if (diffDays === 0) {
        return {
          status: 'today',
          color: '#dc2626',
          bg: '#fee2e2',
          border: '1px solid #fecaca',
          label: '🔴 امروز',
          priority: 1
        };
      }
      if (diffDays <= 10) {
        return {
          status: 'critical',
          color: '#dc2626',
          bg: '#fee2e2',
          border: '1px solid #fecaca',
          label: `🔴 ${diffDays} روز مانده`,
          priority: 1
        };
      }
      if (diffDays <= 30) {
        return {
          status: 'warning',
          color: '#ea580c',
          bg: '#ffedd5',
          border: '1px solid #fed7aa',
          label: `🟠 ${diffDays} روز مانده`,
          priority: 2
        };
      }
      if (diffDays <= 60) {
        return {
          status: 'info',
          color: '#d97706',
          bg: '#fef3c7',
          border: '1px solid #fde68a',
          label: `🟡 ${diffDays} روز مانده`,
          priority: 3
        };
      }
      return null;
    } catch (error) {
      console.error('Error calculating date warning:', error);
      return null;
    }
  };

  // رندر مودال پاس شدن چک
  const renderPassModal = () => {
    if (!showPassModal) return null;
    
    return (
      <div className="modal-overlay" onClick={() => !submitting && setShowPassModal(false)}>
        <div className="modal-container" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3>ثبت وضعیت چک</h3>
            {!submitting && (
              <button className="modal-close" onClick={() => setShowPassModal(false)}>
                <FaTimes />
              </button>
            )}
          </div>
          
          <div className="modal-body">
            <div className="cheque-info">
              <p><strong>شماره سریال:</strong> {selectedCheque?.serialNumber || '---'}</p>
              <p><strong>شماره مالی:</strong> {selectedCheque?.serialFinancail || '---'}</p>
              <p><strong>مبلغ:</strong> {formatAmount(selectedCheque?.amount)} ریال</p>
              <p><strong>تاریخ چک:</strong> {formatDate(selectedCheque?.chequeDate_Persion)}</p>
              <p><strong>بانک:</strong> {selectedCheque?.bankName || '---'}</p>
            </div>
            
            {!showDelayForm ? (
              <>
                <div className="modal-question">
                  <FaQuestionCircle className="question-icon" />
                  <p>آیا چک در سررسید پاس شده است؟</p>
                </div>
                
                <div className="modal-buttons">
                  <button 
                    className="btn-pass-yes"
                    onClick={handleSubmitPassed}
                    disabled={submitting}
                  >
                    {submitting ? <LoadingSpinner small text="" /> : '✅ بله، پاس شده'}
                  </button>
                  
                  <button 
                    className="btn-pass-no"
                    onClick={handleShowDelayForm}
                    disabled={submitting}
                  >
                    ❌ نه، دیر پاس شده
                  </button>
                </div>
              </>
            ) : (
              <div className="delay-form">
                <div className="form-group">
                  <label>تاریخ پاس شدن چک:</label>
                  <div className="date-picker-wrapper" ref={calendarRef}>
                    <div 
                      className="date-input-wrapper"
                      onClick={() => !submitting && setShowCalendar(!showCalendar)}
                    >
                      <FaCalendarAlt className="calendar-icon" />
                      <input
                        type="text"
                        value={delayDate ? convertToJalali(delayDate) : ''}
                        placeholder="انتخاب تاریخ"
                        readOnly
                        className="form-input date-input"
                        disabled={submitting}
                      />
                    </div>
                    {showCalendar && (
                      <div className="calendar-dropdown">
                        <Calendar
                          onChange={handleDateChange}
                          value={delayDate ? new Date(delayDate) : new Date()}
                          className="react-calendar-fa"
                          locale="fa"
                        />
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="form-group">
                  <label>دلیل دیر پاس شدن:</label>
                  <textarea
                    value={delayReason}
                    onChange={(e) => setDelayReason(e.target.value)}
                    className="form-textarea"
                    rows="3"
                    placeholder="لطفا علت تاخیر در پاس شدن چک را وارد کنید..."
                    disabled={submitting}
                  />
                </div>
                
                <button 
                  className="btn-submit-delay"
                  onClick={handleSubmitDelayed}
                  disabled={submitting}
                >
                  {submitting ? 'در حال ثبت...' : 'ثبت چک با تاخیر'}
                </button>
                
                <button 
                  className="btn-back"
                  onClick={() => setShowDelayForm(false)}
                  disabled={submitting}
                >
                  بازگشت
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // رندر مودال برگشت خوردگی چک
  const renderReturnModal = () => {
    if (!showReturnModal) return null;
    
    return (
      <div className="modal-overlay" onClick={() => !submitting && setShowReturnModal(false)}>
        <div className="modal-container return-modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header return-header">
            <h3>ثبت برگشت خوردگی چک</h3>
            {!submitting && (
              <button className="modal-close" onClick={() => setShowReturnModal(false)}>
                <FaTimes />
              </button>
            )}
          </div>
          
          <div className="modal-body">
            <div className="cheque-info">
              <p><strong>شماره سریال:</strong> {selectedCheque?.serialNumber || '---'}</p>
              <p><strong>شماره مالی:</strong> {selectedCheque?.serialFinancail || '---'}</p>
              <p><strong>مبلغ:</strong> {formatAmount(selectedCheque?.amount)} ریال</p>
              <p><strong>تاریخ چک:</strong> {formatDate(selectedCheque?.chequeDate_Persion)}</p>
              <p><strong>بانک:</strong> {selectedCheque?.bankName || '---'}</p>
            </div>
            
            <div className="return-form">
              <div className="form-group">
                <label>تاریخ برگشت خوردگی:</label>
                <div className="date-picker-wrapper" ref={returnCalendarRef}>
                  <div 
                    className="date-input-wrapper"
                    onClick={() => !submitting && setShowReturnCalendar(!showReturnCalendar)}
                  >
                    <FaCalendarAlt className="calendar-icon" />
                    <input
                      type="text"
                      value={returnDate ? convertToJalali(returnDate) : ''}
                      placeholder="انتخاب تاریخ برگشت"
                      readOnly
                      className="form-input date-input"
                      disabled={submitting}
                    />
                  </div>
                  {showReturnCalendar && (
                    <div className="calendar-dropdown">
                      <Calendar
                        onChange={handleReturnDateChange}
                        value={returnDate ? new Date(returnDate) : new Date()}
                        className="react-calendar-fa"
                        locale="fa"
                      />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="form-group">
                <label>دلیل برگشت خوردگی:</label>
                <textarea
                  value={returnReason}
                  onChange={(e) => setReturnReason(e.target.value)}
                  className="form-textarea"
                  rows="3"
                  placeholder="لطفا علت برگشت خوردگی چک را وارد کنید... (مثلاً: موجودی ناکافی، دست خط، مخدوش بودن، etc.)"
                  disabled={submitting}
                />
              </div>
              
              <button 
                className="btn-submit-return"
                onClick={handleSubmitReturned}
                disabled={submitting}
              >
                {submitting ? 'در حال ثبت...' : 'ثبت چک برگشت خورده'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // رندر مودال ویرایش چک
  const [showEditCalendar, setShowEditCalendar] = useState(false);
  const editCalendarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (editCalendarRef.current && !editCalendarRef.current.contains(event.target)) {
        setShowEditCalendar(false);
      }
    };
    
    if (showEditCalendar) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showEditCalendar]);

  const renderEditModal = () => {
    if (!showEditModal) return null;
    
    return (
      <div className="modal-overlay" onClick={() => !submitting && setShowEditModal(false)}>
        <div className="modal-container edit-modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header edit-header">
            <h3>ویرایش اطلاعات چک</h3>
            {!submitting && (
              <button className="modal-close" onClick={() => setShowEditModal(false)}>
                <FaTimes />
              </button>
            )}
          </div>
          
          <div className="modal-body">
            <div className="edit-form">
              <div className="form-group">
                <label>شماره سریال:</label>
                <input
                  type="text"
                  name="serialNumber"
                  value={editFormData.serialNumber}
                  onChange={handleEditInputChange}
                  className="form-input"
                  disabled={submitting}
                  placeholder="شماره سریال را وارد کنید"
                />
              </div>
              
              <div className="form-group">
                <label>شماره صورت مالی:</label>
                <input
                  type="text"
                  name="serialFinancail"
                  value={editFormData.serialFinancail}
                  onChange={handleEditInputChange}
                  className="form-input"
                  disabled={submitting}
                  placeholder="شماره صورت مالی را وارد کنید"
                />
              </div>
              
              <div className="form-group">
                <label>مبلغ (ریال):</label>
                <input
                  type="number"
                  name="amount"
                  value={editFormData.amount}
                  onChange={handleEditInputChange}
                  className="form-input"
                  disabled={submitting}
                  placeholder="مبلغ را وارد کنید"
                />
              </div>
              
              <div className="form-group">
                <label>نام بانک:</label>
                <input
                  type="text"
                  name="bankName"
                  value={editFormData.bankName}
                  onChange={handleEditInputChange}
                  className="form-input"
                  disabled={submitting}
                  placeholder="نام بانک را وارد کنید"
                />
              </div>
              
              <div className="form-group">
                <label>تاریخ چک:</label>
                <div className="date-picker-wrapper" ref={editCalendarRef}>
                  <div 
                    className="date-input-wrapper"
                    onClick={() => !submitting && setShowEditCalendar(!showEditCalendar)}
                  >
                    <FaCalendarAlt className="calendar-icon" />
                    <input
                      type="text"
                      value={editFormData.chequeDate_Persion ? convertToJalali(editFormData.chequeDate) : ''}
                      placeholder="انتخاب تاریخ"
                      readOnly
                      className="form-input date-input"
                      disabled={submitting}
                    />
                  </div>
                  {showEditCalendar && (
                    <div className="calendar-dropdown">
                      <Calendar
                        onChange={handleEditDateChange}
                        value={editFormData.chequeDate_Persion ? new Date(editFormData.chequeDate) : new Date()}
                        className="react-calendar-fa"
                        locale="fa"
                      />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="form-group">
                <label>توضیحات:</label>
                <textarea
                  name="desc"
                  value={editFormData.desc}
                  onChange={handleEditInputChange}
                  className="form-textarea"
                  rows="3"
                  disabled={submitting}
                  placeholder="توضیحات (اختیاری)"
                />
              </div>
              
              <div className="edit-buttons">
                <button 
                  className="btn-save-edit"
                  onClick={handleSubmitEdit}
                  disabled={submitting}
                >
                  <FaSave /> {submitting ? 'در حال ذخیره...' : 'ذخیره تغییرات'}
                </button>
                <button 
                  className="btn-cancel-edit"
                  onClick={() => setShowEditModal(false)}
                  disabled={submitting}
                >
                  <FaTimesCircle /> انصراف
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // رندر مودال حذف چک
  const renderDeleteModal = () => {
    if (!showDeleteModal) return null;
    
    return (
      <div className="modal-overlay" onClick={() => !submitting && setShowDeleteModal(false)}>
        <div className="modal-container delete-modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header delete-header">
            <h3>حذف چک</h3>
            {!submitting && (
              <button className="modal-close" onClick={() => setShowDeleteModal(false)}>
                <FaTimes />
              </button>
            )}
          </div>
          
          <div className="modal-body">
            <div className="delete-warning">
              <FaTrashAlt className="delete-icon" />
              <p>آیا از حذف این چک اطمینان دارید؟</p>
              <div className="cheque-info">
                <p><strong>شماره سریال:</strong> {deletingCheque?.serialNumber || '---'}</p>
                <p><strong>مبلغ:</strong> {formatAmount(deletingCheque?.amount)} ریال</p>
                <p><strong>تاریخ چک:</strong> {formatDate(deletingCheque?.chequeDate_Persion)}</p>
              </div>
              <p className="warning-text">این عمل غیرقابل بازگشت است!</p>
            </div>
            
            <div className="delete-buttons">
              <button 
                className="btn-confirm-delete"
                onClick={handleConfirmDelete}
                disabled={submitting}
              >
                <FaTrashAlt /> {submitting ? 'در حال حذف...' : 'بله، حذف شود'}
              </button>
              <button 
                className="btn-cancel-delete"
                onClick={() => setShowDeleteModal(false)}
                disabled={submitting}
              >
                <FaTimesCircle /> انصراف
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const start = ((pagination.currentPage - 1) * pagination.pageSize) + 1;
  const end = Math.min(start + pagination.pageSize - 1, pagination.totalCount);

  if (loading && items.length === 0) {
    return <LoadingSpinner text="در حال دریافت اطلاعات..." />;
  }

  return (
    <div className="documents-payable-page">
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="page-header">
        <div className="header-content">
          <div className="header-title">
            <h1>اسناد پرداختنی</h1>
          </div>
          <div className="header-stats">
            <div className="stat-card">
              <span className="stat-value">{pagination.totalCount.toLocaleString()}</span>
              <span className="stat-label">کل اسناد</span>
            </div>
          </div>
        </div>
      </div>

      <div className="tabs-container">
        <button
          className={`tab-btn ${activeTab === 'incoming' ? 'active' : ''}`}
          onClick={() => setActiveTab('incoming')}
        >
          <FaFileInvoiceDollar className="tab-icon" />
          <span>اسناد ورودی</span>
          <span className="tab-badge">دریافتی</span>
        </button>
        <button
          className={`tab-btn ${activeTab === 'outgoing' ? 'active' : ''}`}
          onClick={() => setActiveTab('outgoing')}
        >
          <FaMoneyBillWave className="tab-icon" />
          <span>اسناد خروجی</span>
          <span className="tab-badge">پرداختی</span>
        </button>
      </div>

      <div className="documents-actions">
        <div className="search-container">
          <div className="search-input-wrapper">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="جستجو بر اساس شماره سریال، نام بانک یا توضیحات..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
              autoComplete="off"
              style={{ color: '#1f2937' }}
            />
            {searchTerm && (
              <button className="search-clear" onClick={clearSearch} type="button">
                <FaTimes />
              </button>
            )}
          </div>
          {searchTerm && (
            <div className="search-info">
              <span className="search-term">جستجو: "{searchTerm}"</span>
              <span className="search-results">{pagination.totalCount} نتیجه</span>
            </div>
          )}
        </div>

        <div className="actions-right">
          <button 
            className="btn-refresh"
            onClick={handleRetry}
            disabled={loading}
          >
            <FaRedo className={loading ? 'spin' : ''} />
            <span>{loading ? 'در حال بروزرسانی...' : 'بروزرسانی'}</span>
          </button>

          <div className="page-size-selector">
            <label>تعداد در صفحه:</label>
            <select 
              value={pagination.pageSize}
              onChange={(e) => handlePageSizeChange(Number(e.target.value))}
              disabled={loading}
            >
              <option value="5">۵</option>
              <option value="10">۱۰</option>
              <option value="20">۲۰</option>
              <option value="50">۵۰</option>
              <option value="100">۱۰۰</option>
            </select>
          </div>
        </div>
      </div>

      <div className="documents-table-container">
        <table className="documents-table">
          <thead>
            <tr>
              <th className="col-index">#</th>
              <th className="col-serial">سریال صورت مالی</th>
              <th className="col-serial">شماره سریال</th>
              <th className="col-date">تاریخ چک</th>
              <th className="col-amount">مبلغ</th>
              <th className="col-bank">نام بانک</th>
              <th className="col-status">وضعیت</th>
              <th className="col-desc">توضیحات</th>
              <th className="col-action">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr className="no-data-row">
                <td colSpan="9">
                  <div className="no-data-content">
                    <div className="no-data-icon">📄</div>
                    <h3>هیچ سندی یافت نشد</h3>
                    <p>
                      {searchTerm 
                        ? `نتیجه‌ای برای عبارت "${searchTerm}" پیدا نشد` 
                        : 'لیست اسناد در این بخش خالی است'}
                    </p>
                    {searchTerm && (
                      <button className="btn-clear-search" onClick={clearSearch}>
                        حذف فیلتر جستجو
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              items.map((item, index) => {
                const statusInfo = getStatusInfo(item.paymentChequeStatus);
                const dateWarning = getDateWarningInfo(item.chequeDate);
                const rowPriorityClass = dateWarning ? `priority-${dateWarning.priority}` : '';
                const isDisabled = item.paymentChequeStatus === 2 || item.paymentChequeStatus === 3;
                const isReturned = item.paymentChequeStatus === 3;
                const isPassed = item.paymentChequeStatus === 2;
                
                return (
                  <tr key={item.id} className={`document-row ${rowPriorityClass}`}>
                    <td className="col-index">
                      {((pagination.currentPage - 1) * pagination.pageSize) + index + 1}
                    </td>
                    <td className="col-serial">
                      <div className="serial-cell">
                        <FaHashtag className="serial-icon" />
                        <span className="serial-number">{item.serialFinancail || '---'}</span>
                      </div>
                    </td>
                    <td className="col-serial">
                      <div className="serial-cell">
                        <FaHashtag className="serial-icon" />
                        <span className="serial-number">{item.serialNumber || '---'}</span>
                      </div>
                    </td>
                    <td className="col-date">
                      <div 
                        className="date-cell"
                        style={dateWarning ? {
                          backgroundColor: dateWarning.bg,
                          borderRadius: '8px',
                          padding: '6px 12px',
                          border: dateWarning.border,
                          transition: 'all 0.3s ease'
                        } : {}}
                      >
                        <FaCalendarAlt className="date-icon" style={{ color: dateWarning?.color || '#6b7280' }} />
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ 
                            color: dateWarning?.color || '#374151',
                            fontWeight: dateWarning ? '600' : 'normal',
                            fontSize: '13px'
                          }}>
                            {formatDate(item.chequeDate_Persion)}
                          </span>
                          {dateWarning && (
                            <span style={{ 
                              fontSize: '10px', 
                              color: dateWarning.color,
                              marginTop: '2px',
                              fontWeight: '500'
                            }}>
                              {dateWarning.label}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="col-amount">
                      <div className="amount-cell">
                        <span className="amount-value">{formatAmount(item.amount)}</span>
                        <span className="currency">ریال</span>
                      </div>
                    </td>
                    <td className="col-bank">
                      <div className="bank-cell">
                        <FaBuilding className="bank-icon" />
                        {item.bankName || '---'}
                      </div>
                    </td>
                    <td className="col-status">
                      <span 
                        className="status-badge"
                        style={{ 
                          backgroundColor: statusInfo.bg, 
                          color: statusInfo.color 
                        }}
                      >
                        <span className="status-icon">{statusInfo.icon}</span>
                        {item.paymentChequeStatusTitle || statusInfo.text}
                      </span>
                    </td>
                    <td className="col-desc">
                      <div className="desc-cell" title={item.desc || ''}>
                        {item.desc || '---'}
                      </div>
                    </td>
                    <td className="col-action">
                      <div className="action-buttons">
                        <button
                          onClick={() => handleEdit(item)}
                          className="action-btn btn-edit"
                          title="ویرایش چک"
                        >
                          <FaEdit />
                          {/* <span>ویرایش</span> */}
                        </button>
                        <button
                          onClick={() => handleDelete(item)}
                          className="action-btn btn-delete"
                          title="حذف چک"
                        >
                          <FaTrashAlt />
                          {/* <span>حذف</span> */}
                        </button>
                        <button
                          onClick={() => handleCheckPassed(item)}
                          className={`action-btn btn-pass ${isDisabled || isReturned ? 'disabled' : ''}`}
                          title="ثبت پاس شدن چک"
                          disabled={isDisabled || isReturned}
                        >
                          <FaCheckCircle />
                          {/* <span>پاس</span> */}
                        </button>
                        <button
                          onClick={() => handleCheckReturned(item)}
                          className={`action-btn btn-return ${isDisabled || isPassed ? 'disabled' : ''}`}
                          title="ثبت برگشت خوردگی چک"
                          disabled={isDisabled || isPassed}
                        >
                          <FaBan />
                          {/* <span>برگشت</span> */}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {pagination.totalPages > 1 && (
        <div className="pagination-wrapper">
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            totalItems={pagination.totalCount}
            pageSize={pagination.pageSize}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      {loading && items.length > 0 && (
        <div className="loading-overlay">
          <LoadingSpinner text="در حال بروزرسانی..." />
        </div>
      )}

      {renderPassModal()}
      {renderReturnModal()}
      {renderEditModal()}
      {renderDeleteModal()}
    </div>
  );
};

export default DocumentsPayable;