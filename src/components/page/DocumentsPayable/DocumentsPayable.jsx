
// // // export default DocumentsPayable;

// // // DocumentsPayable.jsx - نسخه اصلاح شده با سرچ سمت بک‌اند
// // import React, { useState, useEffect, useCallback, useRef } from 'react';
// // import { documentsPayableService } from '../../../services/documentsPayable';
// // import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner';
// // import Pagination from '../../common/Pagination/Pagination';
// // import { toast, ToastContainer } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';
// // import { 
// //   FaSearch, 
// //   FaRedo, 
// //   FaFileInvoiceDollar,
// //   FaMoneyBillWave,
// //   FaCalendarAlt,
// //   FaBuilding,
// //   FaHashtag,
// //   FaTimes,
// //   FaChevronLeft,
// //   FaChevronRight
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
  
// //   const searchTimeoutRef = useRef(null);

// //   // تعیین id بر اساس تب فعال
// //   const getTabId = useCallback(() => {
// //     return activeTab === 'incoming' ? 1 : 2;
// //   }, [activeTab]);

// //   // تابع دریافت داده‌ها - اصلاح شده با id صحیح
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

// //   // دیبونس سرچ - با تاخیر 500 میلی‌ثانیه و ارسال به بک‌اند
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

// //   const getStatusInfo = (status) => {
// //     const statusMap = {
// //       0: { text: 'خطا', color: '#ef4444', bg: '#fee2e2', icon: '❌' },
// //       1: { text: 'در انتظار', color: '#f59e0b', bg: '#fef3c7', icon: '⏳' },
// //       2: { text: 'تأیید شده', color: '#10b981', bg: '#d1fae5', icon: '✅' },
// //       3: { text: 'ابطال شده', color: '#6b7280', bg: '#f3f4f6', icon: '🚫' },
// //     };
// //     return statusMap[status] || { text: 'نامشخص', color: '#6b7280', bg: '#f3f4f6', icon: '❓' };
// //   };

// //   const formatDate = (dateString) => {
// //     if (!dateString) return '---';
// //     return dateString.split('T')[0].replace(/-/g, '/');
// //   };

// //   const formatAmount = (amount) => {
// //     if (!amount && amount !== 0) return '---';
// //     return amount.toLocaleString('fa-IR');
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
// //                style={{ color: '#1f2937' }}  // این رو هم به صورت inline ا
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
// //              <th className="col-serial" > سریال صورت مالی</th>
// //               <th className="col-serial">شماره سریال</th>
// //               <th className="col-date">تاریخ چک</th>
// //               <th className="col-amount">مبلغ</th>
// //               <th className="col-bank">نام بانک</th>
// //               <th className="col-status">وضعیت</th>
// //               <th className="col-desc">توضیحات</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {items.length === 0 ? (
// //               <tr className="no-data-row">
// //                 <td colSpan="7">
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
// //                  </td>
// //               </tr>
// //             ) : (
// //               items.map((item, index) => {
// //                 const statusInfo = getStatusInfo(item.paymentChequeStatus);
// //                 return (
// //                   <tr key={item.id} className="document-row">
// //                     <td className="col-index">
// //                       {((pagination.currentPage - 1) * pagination.pageSize) + index + 1}
// //                     </td>
// //                             <td className="col-serial">
// //                       <div className="serial-cell">
// //                         <FaHashtag className="serial-icon" />
// //                         <span className="serial-number">{item.serialFinancail || '---'}</span>
// //                       </div>
// //                     </td>
// //                     <td className="col-serial">
// //                       <div className="serial-cell">
// //                         <FaHashtag className="serial-icon" />
// //                         <span className="serial-number">{item.serialNumber || '---'}</span>
// //                       </div>
// //                     </td>
// //                     <td className="col-date">
// //                       <div className="date-cell">
// //                         <FaCalendarAlt className="date-icon" />
// //                         {item.chequeDate_Persion || formatDate(item.chequeDate)}
// //                       </div>
// //                     </td>
// //                     <td className="col-amount">
// //                       <div className="amount-cell">
// //                         <span className="amount-value">{formatAmount(item.amount)}</span>
// //                         <span className="currency">ریال</span>
// //                       </div>
// //                     </td>
// //                     <td className="col-bank">
// //                       <div className="bank-cell">
// //                         <FaBuilding className="bank-icon" />
// //                         {item.bankName || '---'}
// //                       </div>
// //                     </td>
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
// //                     </td>
// //                     <td className="col-desc">
// //                       <div className="desc-cell" title={item.desc || ''}>
// //                         {item.desc || '---'}
// //                       </div>
// //                     </td>
// //                   </tr>
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
// //     </div>
// //   );
// // };

// // export default DocumentsPayable;

// // DocumentsPayable.jsx - نسخه کامل با هشدار تاریخ
// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import { documentsPayableService } from '../../../services/documentsPayable';
// import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner';
// import Pagination from '../../common/Pagination/Pagination';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { 
//   FaSearch, 
//   FaRedo, 
//   FaFileInvoiceDollar,
//   FaMoneyBillWave,
//   FaCalendarAlt,
//   FaBuilding,
//   FaHashtag,
//   FaTimes,
//   FaChevronLeft,
//   FaChevronRight
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
  
//   const searchTimeoutRef = useRef(null);

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

//   const getStatusInfo = (status) => {
//     const statusMap = {
//       0: { text: 'خطا', color: '#ef4444', bg: '#fee2e2', icon: '❌' },
//       1: { text: 'در انتظار', color: '#f59e0b', bg: '#fef3c7', icon: '⏳' },
//       2: { text: 'تأیید شده', color: '#10b981', bg: '#d1fae5', icon: '✅' },
//       3: { text: 'ابطال شده', color: '#6b7280', bg: '#f3f4f6', icon: '🚫' },
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

//   // ========== توابع مربوط به هشدار تاریخ ==========
//   const getDateWarningInfo = (dateString) => {
//     if (!dateString) return null;
    
//     try {
//       const today = new Date();
//       today.setHours(0, 0, 0, 0);
      
//       // تبدیل تاریخ به Date object
//       let targetDate;
//       const dateStr = String(dateString);
      
//       if (dateStr.includes('/')) {
//         const parts = dateStr.split('/');
//         if (parts.length === 3) {
//           // فرمت YYYY/MM/DD
//           targetDate = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
//         } else {
//           targetDate = new Date(dateStr);
//         }
//       } else if (dateStr.includes('-')) {
//         // فرمت YYYY-MM-DD
//         const parts = dateStr.split('-');
//         targetDate = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
//       } else {
//         targetDate = new Date(dateStr);
//       }
      
//       if (isNaN(targetDate.getTime())) return null;
      
//       targetDate.setHours(0, 0, 0, 0);
//       const diffTime = targetDate - today;
//       const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
//       // تعیین وضعیت بر اساس روزهای باقی مانده
//       if (diffDays < 0) {
//         return {
//           status: 'expired',
//           color: '#dc2626',
//           bg: '#fee2e2',
//           border: '1px solid #fecaca',
//           label: '🔴 تاریخ گذشته',
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

//       {/* Header with stats */}
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

//       {/* Tabs */}
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

//       {/* Actions Bar */}
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

//       {/* Table Container */}
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
//             </tr>
//           </thead>
//           <tbody>
//             {items.length === 0 ? (
//               <tr className="no-data-row">
//                 <td colSpan="8">
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
//                 const dateWarning = getDateWarningInfo(item.chequeDate_Persion || item.chequeDate);
//                 const rowPriorityClass = dateWarning ? `priority-${dateWarning.priority}` : '';
                
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
//                             {item.chequeDate_Persion || formatDate(item.chequeDate)}
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
//                   </tr>
//                 );
//               })
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
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

//       {/* Loading Overlay */}
//       {loading && items.length > 0 && (
//         <div className="loading-overlay">
//           <LoadingSpinner text="در حال بروزرسانی..." />
//         </div>
//       )}
//     </div>
//   );
// };

// export default DocumentsPayable;
// DocumentsPayable.jsx - نسخه کامل با هشدار تاریخ (فقط میلادی)
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { documentsPayableService } from '../../../services/documentsPayable';
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner';
import Pagination from '../../common/Pagination/Pagination';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
  FaSearch, 
  FaRedo, 
  FaFileInvoiceDollar,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaBuilding,
  FaHashtag,
  FaTimes
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
  
  const searchTimeoutRef = useRef(null);

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

  const getStatusInfo = (status) => {
    const statusMap = {
      4: { text: 'خطا', color: '#ef4444', bg: '#fee2e2', icon: '❌' },
      0: { text: 'در انتظار', color: '#f59e0b', bg: '#fef3c7', icon: '⏳' },
      2: { text: 'تأیید شده', color: '#10b981', bg: '#d1fae5', icon: '✅' },
      3: { text: 'ابطال شده', color: '#6b7280', bg: '#f3f4f6', icon: '🚫' },
    };
    return statusMap[status] || { text: 'نامشخص', color: '#6b7280', bg: '#f3f4f6', icon: '❓' };
  };

  // فرمت تاریخ برای نمایش (فقط میلادی)
  const formatDate = (dateString) => {
    if (!dateString) return '---';
    // خروجی: 2026/05/13
    return dateString.split('T')[0].replace(/-/g, '/');
  };

  const formatAmount = (amount) => {
    if (!amount && amount !== 0) return '---';
    return amount.toLocaleString('fa-IR');
  };

  // ========== تابع هشدار تاریخ - فقط با تاریخ میلادی ==========
  const getDateWarningInfo = (chequeDate) => {
    if (!chequeDate) return null;
    
    try {
      // تاریخ امروز (میلادی)
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      // استخراج تاریخ چک از فرمت "2026-05-13T00:00:00"
      let chequeDateStr = String(chequeDate);
      if (chequeDateStr.includes('T')) {
        chequeDateStr = chequeDateStr.split('T')[0];
      }
      
      const targetDate = new Date(chequeDateStr);
      
      // بررسی اعتبار تاریخ
      if (isNaN(targetDate.getTime())) return null;
      
      targetDate.setHours(0, 0, 0, 0);
      
      // محاسبه اختلاف روزها
      const diffTime = targetDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      // دیباگ برای بررسی
      console.log('📅 Date Check:', {
        chequeDate: chequeDateStr,
        today: today.toISOString().split('T')[0],
        diffDays: diffDays
      });
      
      // تعیین وضعیت بر اساس روزهای باقی مانده
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

      {/* Header with stats */}
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

      {/* Tabs */}
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

      {/* Actions Bar */}
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

      {/* Table Container */}
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
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr className="no-data-row">
                <td colSpan="8">
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
                // فقط از chequeDate میلادی استفاده کن
                const dateWarning = getDateWarningInfo(item.chequeDate);
                const rowPriorityClass = dateWarning ? `priority-${dateWarning.priority}` : '';
                
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
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
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

      {/* Loading Overlay */}
      {loading && items.length > 0 && (
        <div className="loading-overlay">
          <LoadingSpinner text="در حال بروزرسانی..." />
        </div>
      )}
    </div>
  );
};

export default DocumentsPayable;