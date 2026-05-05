// // // import React, { useState, useEffect, useCallback } from 'react';
// // // import { bankService } from '../../../services/bank';
// // // import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner';
// // // import CreateBankModal from './CreateBankModal';
// // // import ConfirmDeleteModal from '../project/ConfirmDeleteModal/ConfirmDeleteModal';
// // // import Pagination from '../../common/Pagination/Pagination';
// // // import { toast, ToastContainer } from 'react-toastify';
// // // import 'react-toastify/dist/ReactToastify.css';
// // // import { 
// // //   FaEdit, 
// // //   FaTrash, 
// // //   FaPlus,
// // //   FaRedo,
// // //   FaBuilding,
// // //   FaPhone,
// // //   FaMapMarkerAlt,
// // //   FaAlignLeft
// // // } from 'react-icons/fa';
// // // import './Bank.css';

// // // const Bank = () => {
// // //   const [banks, setBanks] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);
// // //   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
// // //   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
// // //   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
// // //   const [deleteLoading, setDeleteLoading] = useState(false);
// // //   const [bankToDelete, setBankToDelete] = useState(null);
// // //   const [bankToEdit, setBankToEdit] = useState(null);
// // //   const [pagination, setPagination] = useState({
// // //     currentPage: 1,
// // //     pageSize: 10,
// // //     totalCount: 0,
// // //     totalPages: 0
// // //   });

// // //   // دریافت بانک‌ها
// // //   const fetchBanks = useCallback(async (pageNumber = 1, pageSize = 10) => {
// // //     try {
// // //       setLoading(true);
// // //       setError(null);
      
// // //       const response = await bankService.getBanks(pageNumber, pageSize);
// // //       console.log(response.totalCount)
// // //       console.log(response.totalPages)
// // //         console.log(response)
// // //       console.log("*********************************************")
// // //       setBanks(Array.isArray(response.items) ? response.items : []);
// // //       setPagination({
// // //         currentPage: pageNumber,
// // //         pageSize: pageSize,
// // //         totalCount: response.totalCount || 0,
// // //         totalPages: response.totalPages || 0
// // //       });
      
// // //     } catch (err) {
// // //       console.error('Error fetching banks:', err);
// // //       setError('خطا در دریافت اطلاعات بانک‌ها');
// // //       setBanks([]);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   }, []);

// // //   useEffect(() => {
// // //     fetchBanks(pagination.currentPage, pagination.pageSize);
// // //   }, [pagination.currentPage, pagination.pageSize]);

// // //   // حذف بانک
// // //   const handleDeleteClick = (bank) => {
// // //     setBankToDelete(bank);
// // //     setIsDeleteModalOpen(true);
// // //   };

// // //   const handleConfirmDelete = async () => {
// // //     if (!bankToDelete) return;

// // //     try {
// // //       setDeleteLoading(true);
// // //       await bankService.deleteBank(bankToDelete.id);
      
// // //       toast.success('بانک با موفقیت حذف شد');
// // //       setIsDeleteModalOpen(false);
// // //       setBankToDelete(null);
// // //       fetchBanks(pagination.currentPage, pagination.pageSize);
      
// // //     } catch (err) {
// // //       console.error('Error deleting bank:', err);
// // //       toast.error('خطا در حذف بانک');
// // //     } finally {
// // //       setDeleteLoading(false);
// // //     }
// // //   };

// // //   const handleCancelDelete = () => {
// // //     setIsDeleteModalOpen(false);
// // //     setBankToDelete(null);
// // //   };

// // //   // ویرایش بانک
// // //   const handleEditClick = (bank) => {
// // //     setBankToEdit(bank);
// // //     setIsEditModalOpen(true);
// // //   };

// // //   // تغییر صفحه
// // //   const handlePageChange = (pageNumber) => {
// // //     setPagination(prev => ({ ...prev, currentPage: pageNumber }));
// // //   };

// // //   const handlePageSizeChange = (newPageSize) => {
// // //     setPagination(prev => ({
// // //       ...prev,
// // //       pageSize: newPageSize,
// // //       currentPage: 1
// // //     }));
// // //   };

// // //   //成功后刷新
// // //   const handleBankSuccess = () => {
// // //     fetchBanks(pagination.currentPage, pagination.pageSize);
// // //   };

// // //   const handleRetry = () => {
// // //     fetchBanks(pagination.currentPage, pagination.pageSize);
// // //   };

// // //   // محاسبه رکوردهای نمایش داده شده
// // //   const start = ((pagination.currentPage - 1) * pagination.pageSize) + 1;
// // //   const end = Math.min(start + pagination.pageSize - 1, pagination.totalCount);

// // //   if (loading && banks.length === 0) {
// // //     return <LoadingSpinner text="در حال دریافت اطلاعات بانک‌ها..." />;
// // //   }

// // //   return (
// // //     <div className="bank-page">
// // //       <div className="page-header">
// // //         <h1>مدیریت بانک‌ها</h1>
// // //         <p>لیست تمام بانک‌های سیستم</p>
// // //       </div>
      
// // //       <ToastContainer position="top-left" rtl={true} />

// // //       <div className="bank-actions">
// // //         <div className="actions-left">
// // //           <button 
// // //             className="btn btn-primary"
// // //             onClick={() => setIsCreateModalOpen(true)}
// // //           >
// // //             <FaPlus className="btn-icon" />
// // //             بانک جدید
// // //           </button>

// // //           <button 
// // //             className="btn btn-secondary"
// // //             onClick={handleRetry}
// // //             disabled={loading}
// // //           >
// // //             <FaRedo className="btn-icon" />
// // //             {loading ? 'در حال بروزرسانی...' : 'بروزرسانی'}
// // //           </button>
// // //         </div>

// // //         <div className="page-size-selector">
// // //           <label>تعداد در صفحه:</label>
// // //           <select 
// // //             value={pagination.pageSize}
// // //             onChange={(e) => handlePageSizeChange(Number(e.target.value))}
// // //           >
// // //             <option value="5">۵</option>
// // //             <option value="10">۱۰</option>
// // //             <option value="20">۲۰</option>
// // //             <option value="50">۵۰</option>
// // //           </select>
// // //         </div>
// // //       </div>

// // //       {error && (
// // //         <div className="error-banner">
// // //           <span className="error-icon">⚠️</span>
// // //           {error}
// // //           <button onClick={handleRetry} className="btn-retry">تلاش مجدد</button>
// // //         </div>
// // //       )}

// // //       <div className="bank-info">
// // //         <div className="total-info">
// // //           نمایش {start} تا {end} از {pagination.totalCount.toLocaleString()} بانک
// // //         </div>
// // //       </div>

// // //       <div className="bank-table-container">
// // //         <table className="bank-table">
// // //           <thead>
// // //             <tr>
// // //               <th>#</th>
// // //               <th>نام بانک</th>
// // //               <th>آدرس</th>
// // //               <th>تلفن</th>
// // //               <th>توضیحات</th>
// // //               <th>عملیات</th>
// // //             </tr>
// // //           </thead>
// // //           <tbody>
// // //             {banks.length === 0 ? (
// // //               <tr>
// // //                 <td colSpan="6" className="no-data">
// // //                   <div className="no-data-content">
// // //                     <span className="no-data-icon">🏦</span>
// // //                     <p>هیچ بانکی یافت نشد</p>
// // //                     <button 
// // //                       className="btn btn-primary"
// // //                       onClick={() => setIsCreateModalOpen(true)}
// // //                     >
// // //                       ایجاد اولین بانک
// // //                     </button>
// // //                   </div>
// // //                 </td>
// // //               </tr>
// // //             ) : (
// // //               banks.map((bank, index) => (
// // //                 <tr key={bank.id || index}>
// // //                   <td className="index-cell">
// // //                     {((pagination.currentPage - 1) * pagination.pageSize) + index + 1}
// // //                   </td>
// // //                   <td>
// // //                     <div className="bank-name-content">
// // //                       <FaBuilding className="bank-icon" />
// // //                       <span className="bank-title">{bank.name}</span>
// // //                     </div>
// // //                   </td>
// // //                   <td>
// // //                     <div className="bank-address">
// // //                       <FaMapMarkerAlt className="address-icon" />
// // //                       {bank.address || '---'}
// // //                     </div>
// // //                   </td>
// // //                   <td>
// // //                     <div className="bank-phone">
// // //                       <FaPhone className="phone-icon" />
// // //                       {bank.phone || '---'}
// // //                     </div>
// // //                   </td>
// // //                   <td>
// // //                     <div className="bank-desc">
// // //                       <FaAlignLeft className="desc-icon" />
// // //                       {bank.desc || '---'}
// // //                     </div>
// // //                   </td>
// // //                   <td>
// // //                     <div className="action-buttons">
// // //                       <button 
// // //                         className="btn-action btn-edit"
// // //                         title="ویرایش"
// // //                         onClick={() => handleEditClick(bank)}
// // //                       >
// // //                         <FaEdit />
// // //                       </button>
// // //                       <button 
// // //                         className="btn-action btn-delete"
// // //                         title="حذف"
// // //                         onClick={() => handleDeleteClick(bank)}
// // //                       >
// // //                         <FaTrash />
// // //                       </button>
// // //                     </div>
// // //                   </td>
// // //                 </tr>
// // //               ))
// // //             )}
// // //           </tbody>
// // //         </table>
// // //       </div>

// // //       {pagination.totalPages > 1 && (
// // //         <Pagination
// // //           currentPage={pagination.currentPage}
// // //           totalPages={pagination.totalPages}
// // //           totalItems={pagination.totalCount}
// // //           pageSize={pagination.pageSize}
// // //           onPageChange={handlePageChange}
// // //         />
// // //       )}

// // //       {/* مودال ایجاد بانک */}
// // //       <CreateBankModal
// // //         isOpen={isCreateModalOpen}
// // //         onClose={() => setIsCreateModalOpen(false)}
// // //         onSuccess={handleBankSuccess}
// // //       />

// // //       {/* مودال ویرایش بانک */}
// // //       <CreateBankModal
// // //         isOpen={isEditModalOpen}
// // //         onClose={() => {
// // //           setIsEditModalOpen(false);
// // //           setBankToEdit(null);
// // //         }}
// // //         onSuccess={handleBankSuccess}
// // //         bankToEdit={bankToEdit}
// // //         isEditMode={true}
// // //       />

// // //       {/* مودال حذف */}
// // //       <ConfirmDeleteModal
// // //         isOpen={isDeleteModalOpen}
// // //         onClose={handleCancelDelete}
// // //         onConfirm={handleConfirmDelete}
// // //         projectName={bankToDelete?.name}
// // //         loading={deleteLoading}
// // //       />
// // //     </div>
// // //   );
// // // };

// // // export default Bank;
// // import React, { useState, useEffect, useCallback } from 'react';
// // import { bankService } from '../../../services/bank';
// // import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner';
// // import CreateBankModal from './CreateBankModal';
// // import ConfirmDeleteModal from '../project/ConfirmDeleteModal/ConfirmDeleteModal';
// // import Pagination from '../../common/Pagination/Pagination';
// // import { toast, ToastContainer } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';
// // import { 
// //   FaEdit, 
// //   FaTrash, 
// //   FaPlus,
// //   FaRedo,
// //   FaBuilding,
// //   FaPhone,
// //   FaMapMarkerAlt,
// //   FaAlignLeft
// // } from 'react-icons/fa';
// // import './Bank.css';

// // const Bank = () => {
// //   const [banks, setBanks] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
// //   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
// //   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
// //   const [deleteLoading, setDeleteLoading] = useState(false);
// //   const [bankToDelete, setBankToDelete] = useState(null);
// //   const [bankToEdit, setBankToEdit] = useState(null);
// //   const [pagination, setPagination] = useState({
// //     currentPage: 1,
// //     pageSize: 10,
// //     totalCount: 0,
// //     totalPages: 0
// //   });

// //   // دریافت بانک‌ها
// //   const fetchBanks = useCallback(async (pageNumber = 1, pageSize = 10) => {
// //     try {
// //       setLoading(true);
// //       setError(null);
      
// //       const response = await bankService.getBanks(pageNumber, pageSize);
      
// //       setBanks(Array.isArray(response.items) ? response.items : []);
// //       setPagination({
// //         currentPage: pageNumber,
// //         pageSize: pageSize,
// //         totalCount: response.totalCount || 0,
// //         totalPages: response.totalPages || 0
// //       });
      
// //     } catch (err) {
// //       console.error('Error fetching banks:', err);
// //       setError('خطا در دریافت اطلاعات بانک‌ها');
// //       setBanks([]);
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, []);

// //   useEffect(() => {
// //     fetchBanks(pagination.currentPage, pagination.pageSize);
// //   }, [fetchBanks, pagination.currentPage, pagination.pageSize]);

// //   // حذف بانک
// //   const handleDeleteClick = (bank) => {
// //     setBankToDelete(bank);
// //     setIsDeleteModalOpen(true);
// //   };

// //   const handleConfirmDelete = async () => {
// //     if (!bankToDelete) return;

// //     try {
// //       setDeleteLoading(true);
// //       await bankService.deleteBank(bankToDelete.id);
      
// //       toast.success('بانک با موفقیت حذف شد');
// //       setIsDeleteModalOpen(false);
// //       setBankToDelete(null);
      
// //       // محاسبه صفحه مناسب بعد از حذف
// //       const remainingItems = banks.length - 1;
// //       const newPageNumber = (remainingItems === 0 && pagination.currentPage > 1) 
// //         ? pagination.currentPage - 1 
// //         : pagination.currentPage;
      
// //       // رفرش لیست با صفحه مناسب
// //       await fetchBanks(newPageNumber, pagination.pageSize);
      
// //     } catch (err) {
// //       console.error('Error deleting bank:', err);
// //       toast.error('خطا در حذف بانک');
// //     } finally {
// //       setDeleteLoading(false);
// //     }
// //   };

// //   const handleCancelDelete = () => {
// //     setIsDeleteModalOpen(false);
// //     setBankToDelete(null);
// //   };

// //   // ویرایش بانک
// //   const handleEditClick = (bank) => {
// //     setBankToEdit(bank);
// //     setIsEditModalOpen(true);
// //   };

// //   // تغییر صفحه
// //   const handlePageChange = (pageNumber) => {
// //     setPagination(prev => ({ ...prev, currentPage: pageNumber }));
// //   };

// //   const handlePageSizeChange = (newPageSize) => {
// //     setPagination(prev => ({
// //       ...prev,
// //       pageSize: newPageSize,
// //       currentPage: 1
// //     }));
// //   };

// //   // تابع رفرش پس از موفقیت (ایجاد/ویرایش)
// //   const handleBankSuccess = async () => {
// //     await fetchBanks(pagination.currentPage, pagination.pageSize);
// //   };

// //   const handleRetry = () => {
// //     fetchBanks(pagination.currentPage, pagination.pageSize);
// //   };

// //   // محاسبه رکوردهای نمایش داده شده
// //   const start = ((pagination.currentPage - 1) * pagination.pageSize) + 1;
// //   const end = Math.min(start + pagination.pageSize - 1, pagination.totalCount);

// //   if (loading && banks.length === 0) {
// //     return <LoadingSpinner text="در حال دریافت اطلاعات بانک‌ها..." />;
// //   }

// //   return (
// //     <div className="bank-page">
// //       <div className="page-header">
// //         <h1>مدیریت بانک‌ها</h1>
// //         <p>لیست تمام بانک‌های سیستم</p>
// //       </div>
      
// //       <ToastContainer position="top-left" rtl={true} />

// //       <div className="bank-actions">
// //         <div className="actions-left">
// //           <button 
// //             className="btn btn-primary"
// //             onClick={() => setIsCreateModalOpen(true)}
// //           >
// //             <FaPlus className="btn-icon" />
// //             بانک جدید
// //           </button>

// //           <button 
// //             className="btn btn-secondary"
// //             onClick={handleRetry}
// //             disabled={loading}
// //           >
// //             <FaRedo className="btn-icon" />
// //             {loading ? 'در حال بروزرسانی...' : 'بروزرسانی'}
// //           </button>
// //         </div>

// //         <div className="page-size-selector">
// //           <label>تعداد در صفحه:</label>
// //           <select 
// //             value={pagination.pageSize}
// //             onChange={(e) => handlePageSizeChange(Number(e.target.value))}
// //           >
// //             <option value="5">۵</option>
// //             <option value="10">۱۰</option>
// //             <option value="20">۲۰</option>
// //             <option value="50">۵۰</option>
// //           </select>
// //         </div>
// //       </div>

// //       {error && (
// //         <div className="error-banner">
// //           <span className="error-icon">⚠️</span>
// //           {error}
// //           <button onClick={handleRetry} className="btn-retry">تلاش مجدد</button>
// //         </div>
// //       )}

// //       <div className="bank-info">
// //         <div className="total-info">
// //           نمایش {start} تا {end} از {pagination.totalCount.toLocaleString()} بانک
// //         </div>
// //       </div>

// //       <div className="bank-table-container">
// //         <table className="bank-table">
// //           <thead>
// //             <tr>
// //               <th>#</th>
// //               <th>نام بانک</th>
// //               <th>آدرس</th>
// //               <th>تلفن</th>
// //               <th>توضیحات</th>
// //               <th>عملیات</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {banks.length === 0 ? (
// //               <tr>
// //                 <td colSpan="6" className="no-data">
// //                   <div className="no-data-content">
// //                     <span className="no-data-icon">🏦</span>
// //                     <p>هیچ بانکی یافت نشد</p>
// //                     <button 
// //                       className="btn btn-primary"
// //                       onClick={() => setIsCreateModalOpen(true)}
// //                     >
// //                       ایجاد اولین بانک
// //                     </button>
// //                   </div>
// //                 </td>
// //               </tr>
// //             ) : (
// //               banks.map((bank, index) => (
// //                 <tr key={bank.id || index}>
// //                   <td className="index-cell">
// //                     {((pagination.currentPage - 1) * pagination.pageSize) + index + 1}
// //                   </td>
// //                   <td>
// //                     <div className="bank-name-content">
// //                       <FaBuilding className="bank-icon" />
// //                       <span className="bank-title">{bank.name}</span>
// //                     </div>
// //                   </td>
// //                   <td>
// //                     <div className="bank-address">
// //                       <FaMapMarkerAlt className="address-icon" />
// //                       {bank.address || '---'}
// //                     </div>
// //                   </td>
// //                   <td>
// //                     <div className="bank-phone">
// //                       <FaPhone className="phone-icon" />
// //                       {bank.phone || '---'}
// //                     </div>
// //                   </td>
// //                   <td>
// //                     <div className="bank-desc">
// //                       <FaAlignLeft className="desc-icon" />
// //                       {bank.desc || '---'}
// //                     </div>
// //                   </td>
// //                   <td>
// //                     <div className="action-buttons">
// //                       <button 
// //                         className="btn-action btn-edit"
// //                         title="ویرایش"
// //                         onClick={() => handleEditClick(bank)}
// //                       >
// //                         <FaEdit />
// //                       </button>
// //                       <button 
// //                         className="btn-action btn-delete"
// //                         title="حذف"
// //                         onClick={() => handleDeleteClick(bank)}
// //                       >
// //                         <FaTrash />
// //                       </button>
// //                     </div>
// //                   </td>
// //                 </tr>
// //               ))
// //             )}
// //           </tbody>
// //         </table>
// //       </div>

// //       {pagination.totalPages > 1 && (
// //         <Pagination
// //           currentPage={pagination.currentPage}
// //           totalPages={pagination.totalPages}
// //           totalItems={pagination.totalCount}
// //           pageSize={pagination.pageSize}
// //           onPageChange={handlePageChange}
// //         />
// //       )}

// //       {/* مودال ایجاد بانک */}
// //       <CreateBankModal
// //         isOpen={isCreateModalOpen}
// //         onClose={() => setIsCreateModalOpen(false)}
// //         onSuccess={handleBankSuccess}
// //       />

// //       {/* مودال ویرایش بانک */}
// //       <CreateBankModal
// //         isOpen={isEditModalOpen}
// //         onClose={() => {
// //           setIsEditModalOpen(false);
// //           setBankToEdit(null);
// //         }}
// //         onSuccess={handleBankSuccess}
// //         bankToEdit={bankToEdit}
// //         isEditMode={true}
// //       />

// //       {/* مودال حذف */}
// //       <ConfirmDeleteModal
// //         isOpen={isDeleteModalOpen}
// //         onClose={handleCancelDelete}
// //         onConfirm={handleConfirmDelete}
// //         projectName={bankToDelete?.name}
// //         loading={deleteLoading}
// //       />
// //     </div>
// //   );
// // };

// // export default Bank;

// import React, { useState, useEffect, useCallback } from 'react';
// import { bankService } from '../../../services/bank';

// import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner';
// import CreateBankModal from './CreateBankModal';
// import ConfirmDeleteModal from '../project/ConfirmDeleteModal/ConfirmDeleteModal';
// import UserSelectionModal from './CompanySelectionModal/UserSelectionModal';
// import Pagination from '../../common/Pagination/Pagination';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { 
//   FaEdit, 
//   FaTrash, 
//   FaPlus,
//   FaRedo,
//   FaBuilding,
//   FaPhone,
//   FaMapMarkerAlt,
//   FaAlignLeft,
//   FaSyncAlt
// } from 'react-icons/fa';
// import './Bank.css';

// const Bank = () => {
//   const [banks, setBanks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);
//   const [deleteLoading, setDeleteLoading] = useState(false);
//   const [companyModalLoading, setCompanyModalLoading] = useState(false);
//   const [bankToDelete, setBankToDelete] = useState(null);
//   const [bankToEdit, setBankToEdit] = useState(null);
//   const [selectedCompanies, setSelectedCompanies] = useState([]);
//   const [currentBankForCompany, setCurrentBankForCompany] = useState(null);
//   const [pagination, setPagination] = useState({
//     currentPage: 1,
//     pageSize: 10,
//     totalCount: 0,
//     totalPages: 0
//   });

//   // دریافت بانک‌ها
//   const fetchBanks = useCallback(async (pageNumber = 1, pageSize = 10) => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       const response = await bankService.getBanks(pageNumber, pageSize);
      
//       setBanks(Array.isArray(response.items) ? response.items : []);
//       setPagination({
//         currentPage: pageNumber,
//         pageSize: pageSize,
//         totalCount: response.totalCount || 0,
//         totalPages: response.totalPages || 0
//       });
      
//     } catch (err) {
//       console.error('Error fetching banks:', err);
//       setError('خطا در دریافت اطلاعات بانک‌ها');
//       setBanks([]);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchBanks(pagination.currentPage, pagination.pageSize);
//   }, [fetchBanks, pagination.currentPage, pagination.pageSize]);

//   // حذف بانک
//   const handleDeleteClick = (bank) => {
//     setBankToDelete(bank);
//     setIsDeleteModalOpen(true);
//   };

//   const handleConfirmDelete = async () => {
//     if (!bankToDelete) return;

//     try {
//       setDeleteLoading(true);
//       await bankService.deleteBank(bankToDelete.id);
      
//       toast.success('بانک با موفقیت حذف شد');
//       setIsDeleteModalOpen(false);
//       setBankToDelete(null);
      
//       const remainingItems = banks.length - 1;
//       const newPageNumber = (remainingItems === 0 && pagination.currentPage > 1) 
//         ? pagination.currentPage - 1 
//         : pagination.currentPage;
      
//       await fetchBanks(newPageNumber, pagination.pageSize);
      
//     } catch (err) {
//       console.error('Error deleting bank:', err);
//       toast.error('خطا در حذف بانک');
//     } finally {
//       setDeleteLoading(false);
//     }
//   };

//   const handleCancelDelete = () => {
//     setIsDeleteModalOpen(false);
//     setBankToDelete(null);
//   };

//   // ویرایش بانک
//   const handleEditClick = (bank) => {
//     setBankToEdit(bank);
//     setIsEditModalOpen(true);
//   };

//   // مدیریت شرکت‌های بانک
//   const handleCompanyClick = async (bank) => {
//     setCurrentBankForCompany(bank);
//     setCompanyModalLoading(true);
    
//     try {
//       // دریافت شرکت‌های مرتبط با این بانک
//       const response = await bankService.getBankCompanies(bank.id);
//       setSelectedCompanies(response || []);
//       setIsCompanyModalOpen(true);
//     } catch (err) {
//       console.error('Error fetching bank companies:', err);
//       toast.error('خطا در دریافت شرکت‌های بانک');
//     } finally {
//       setCompanyModalLoading(false);
//     }
//   };

//   // تطبیق با شرکت اصلی
//   const handleSyncWithCompany = async () => {
//     if (!currentBankForCompany) return;
    
//     try {
//       setCompanyModalLoading(true);
//       // دریافت شرکت اصلی بانک
//       const mainCompany = await bankService.getBankMainCompany(currentBankForCompany.id);
      
//       if (mainCompany) {
//         setSelectedCompanies([mainCompany]);
//         toast.success('شرکت‌ها با شرکت اصلی بانک تطبیق داده شدند');
//       } else {
//         toast.info('هیچ شرکت اصلی برای این بانک تعریف نشده است');
//       }
//     } catch (err) {
//       console.error('Error syncing with company:', err);
//       toast.error('خطا در تطبیق با شرکت اصلی');
//     } finally {
//       setCompanyModalLoading(false);
//     }
//   };

//   // ذخیره شرکت‌های انتخاب شده
//   const handleSaveCompanies = async (companies) => {
//     if (!currentBankForCompany) return;
    
//     try {
//       setCompanyModalLoading(true);
//       await bankService.updateBankCompanies(currentBankForCompany.id, companies);
//       toast.success('شرکت‌های بانک با موفقیت ذخیره شدند');
//       setIsCompanyModalOpen(false);
//       setSelectedCompanies([]);
//       setCurrentBankForCompany(null);
//     } catch (err) {
//       console.error('Error saving bank companies:', err);
//       toast.error('خطا در ذخیره شرکت‌های بانک');
//     } finally {
//       setCompanyModalLoading(false);
//     }
//   };

//   // تغییر صفحه
//   const handlePageChange = (pageNumber) => {
//     setPagination(prev => ({ ...prev, currentPage: pageNumber }));
//   };

//   const handlePageSizeChange = (newPageSize) => {
//     setPagination(prev => ({
//       ...prev,
//       pageSize: newPageSize,
//       currentPage: 1
//     }));
//   };

//   // تابع رفرش پس از موفقیت (ایجاد/ویرایش)
//   const handleBankSuccess = async () => {
//     await fetchBanks(pagination.currentPage, pagination.pageSize);
//   };

//   const handleRetry = () => {
//     fetchBanks(pagination.currentPage, pagination.pageSize);
//   };

//   // محاسبه رکوردهای نمایش داده شده
//   const start = ((pagination.currentPage - 1) * pagination.pageSize) + 1;
//   const end = Math.min(start + pagination.pageSize - 1, pagination.totalCount);

//   if (loading && banks.length === 0) {
//     return <LoadingSpinner text="در حال دریافت اطلاعات بانک‌ها..." />;
//   }

//   return (
//     <div className="bank-page">
//       <div className="page-header">
//         <h1>مدیریت بانک‌ها</h1>
//         <p>لیست تمام بانک‌های سیستم</p>
//       </div>
      
//       <ToastContainer position="top-left" rtl={true} />

//       <div className="bank-actions">
//         <div className="actions-left">
//           <button 
//             className="btn btn-primary"
//             onClick={() => setIsCreateModalOpen(true)}
//           >
//             <FaPlus className="btn-icon" />
//             بانک جدید
//           </button>

//           <button 
//             className="btn btn-secondary"
//             onClick={handleRetry}
//             disabled={loading}
//           >
//             <FaRedo className="btn-icon" />
//             {loading ? 'در حال بروزرسانی...' : 'بروزرسانی'}
//           </button>
//         </div>

//         <div className="page-size-selector">
//           <label>تعداد در صفحه:</label>
//           <select 
//             value={pagination.pageSize}
//             onChange={(e) => handlePageSizeChange(Number(e.target.value))}
//           >
//             <option value="5">۵</option>
//             <option value="10">۱۰</option>
//             <option value="20">۲۰</option>
//             <option value="50">۵۰</option>
//           </select>
//         </div>
//       </div>

//       {error && (
//         <div className="error-banner">
//           <span className="error-icon">⚠️</span>
//           {error}
//           <button onClick={handleRetry} className="btn-retry">تلاش مجدد</button>
//         </div>
//       )}

//       <div className="bank-info">
//         <div className="total-info">
//           نمایش {start} تا {end} از {pagination.totalCount.toLocaleString()} بانک
//         </div>
//       </div>

//       <div className="bank-table-container">
//         <table className="bank-table">
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>نام بانک</th>
//               <th>آدرس</th>
//               <th>تلفن</th>
//               <th>توضیحات</th>
//               <th>عملیات</th>
//             </tr>
//           </thead>
//           <tbody>
//             {banks.length === 0 ? (
//               <tr>
//                 <td colSpan="6" className="no-data">
//                   <div className="no-data-content">
//                     <span className="no-data-icon">🏦</span>
//                     <p>هیچ بانکی یافت نشد</p>
//                     <button 
//                       className="btn btn-primary"
//                       onClick={() => setIsCreateModalOpen(true)}
//                     >
//                       ایجاد اولین بانک
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ) : (
//               banks.map((bank, index) => (
//                 <tr key={bank.id || index}>
//                   <td className="index-cell">
//                     {((pagination.currentPage - 1) * pagination.pageSize) + index + 1}
//                   </td>
//                   <td>
//                     <div className="bank-name-content">
//                       <FaBuilding className="bank-icon" />
//                       <span className="bank-title">{bank.name}</span>
//                     </div>
//                   </td>
//                   <td>
//                     <div className="bank-address">
//                       <FaMapMarkerAlt className="address-icon" />
//                       {bank.address || '---'}
//                     </div>
//                   </td>
//                   <td>
//                     <div className="bank-phone">
//                       <FaPhone className="phone-icon" />
//                       {bank.phone || '---'}
//                     </div>
//                   </td>
//                   <td>
//                     <div className="bank-desc">
//                       <FaAlignLeft className="desc-icon" />
//                       {bank.desc || '---'}
//                     </div>
//                   </td>
//                   <td>
//                     <div className="action-buttons">
//                       <button 
//                         className="btn-action btn-company"
//                         title="مدیریت شرکت‌ها"
//                         onClick={() => handleCompanyClick(bank)}
//                       >
//                         <FaSyncAlt />
//                       </button>
//                       <button 
//                         className="btn-action btn-edit"
//                         title="ویرایش"
//                         onClick={() => handleEditClick(bank)}
//                       >
//                         <FaEdit />
//                       </button>
//                       <button 
//                         className="btn-action btn-delete"
//                         title="حذف"
//                         onClick={() => handleDeleteClick(bank)}
//                       >
//                         <FaTrash />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {pagination.totalPages > 1 && (
//         <Pagination
//           currentPage={pagination.currentPage}
//           totalPages={pagination.totalPages}
//           totalItems={pagination.totalCount}
//           pageSize={pagination.pageSize}
//           onPageChange={handlePageChange}
//         />
//       )}

//       {/* مودال ایجاد بانک */}
//       <CreateBankModal
//         isOpen={isCreateModalOpen}
//         onClose={() => setIsCreateModalOpen(false)}
//         onSuccess={handleBankSuccess}
//       />

//       {/* مودال ویرایش بانک */}
//       <CreateBankModal
//         isOpen={isEditModalOpen}
//         onClose={() => {
//           setIsEditModalOpen(false);
//           setBankToEdit(null);
//         }}
//         onSuccess={handleBankSuccess}
//         bankToEdit={bankToEdit}
//         isEditMode={true}
//       />

//       {/* مودال حذف */}
//       <ConfirmDeleteModal
//         isOpen={isDeleteModalOpen}
//         onClose={handleCancelDelete}
//         onConfirm={handleConfirmDelete}
//         projectName={bankToDelete?.name}
//         loading={deleteLoading}
//       />

//       {/* مودال مدیریت شرکت‌های بانک */}
//       <UserSelectionModal
//         isOpen={isCompanyModalOpen}
//         onClose={() => {
//           setIsCompanyModalOpen(false);
//           setCurrentBankForCompany(null);
//           setSelectedCompanies([]);
//         }}
//         projectName={currentBankForCompany?.name || ''}
//         project={currentBankForCompany}
//         selectedCompanies={selectedCompanies}
//         onCompanyToggle={(company, isChecked) => {
//           if (isChecked) {
//             setSelectedCompanies(prev => [...prev, company]);
//           } else {
//             setSelectedCompanies(prev => prev.filter(c => c.id !== company.id));
//           }
//         }}
//         onSelectAll={(companies) => setSelectedCompanies(companies)}
//         onDeselectAll={() => setSelectedCompanies([])}
//         onSave={handleSaveCompanies}
//         onSyncWithCompany={handleSyncWithCompany}
//         loading={companyModalLoading}
//         error={null}
//       />
//     </div>
//   );
// };

// export default Bank;

import React, { useState, useEffect, useCallback } from 'react';
import { bankService } from '../../../services/bank';
import { companyService } from '../../../services/company';
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner';
import CreateBankModal from './CreateBankModal';
import ConfirmDeleteModal from '../project/ConfirmDeleteModal/ConfirmDeleteModal';
import CompanySelectionModal from './CompanySelectionModal/CompanySelectionModal';
import Pagination from '../../common/Pagination/Pagination';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
  FaEdit, 
  FaTrash, 
  FaPlus,
  FaRedo,
  FaBuilding,
  FaPhone,
  FaMapMarkerAlt,
  FaAlignLeft,
  FaSyncAlt
} from 'react-icons/fa';
import './Bank.css';

// داده‌های نمونه برای شرکت‌ها (در صورت خطای API)
const getSampleCompanies = () => [
  { id: 1, name: 'شرکت آرمین', code: 'AR-001', phone: '021-12345678', isCheck: false },
  { id: 2, name: 'شرکت سپهر', code: 'SP-002', phone: '021-87654321', isCheck: false },
  { id: 3, name: 'شرکت دانش بنیان', code: 'DB-003', phone: '021-11223344', isCheck: false },
  { id: 4, name: 'شرکت فناوران', code: 'FN-004', phone: '021-55667788', isCheck: false },
  { id: 5, name: 'شرکت توسعه پایدار', code: 'TD-005', phone: '021-99887766', isCheck: false },
  { id: 6, name: 'شرکت نوآوران', code: 'NV-006', phone: '021-44332211', isCheck: false },
  { id: 7, name: 'شرکت صنایع الکترونیک', code: 'IE-007', phone: '021-66778899', isCheck: false },
  { id: 8, name: 'شرکت مهندسی ساختمان', code: 'MS-008', phone: '021-55443322', isCheck: false },
  { id: 9, name: 'شرکت بازرگانی اطلس', code: 'BA-009', phone: '021-11224455', isCheck: false },
  { id: 10, name: 'شرکت خدمات مالی', code: 'HM-010', phone: '021-99886655', isCheck: false },
];

const Bank = () => {
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [bankToDelete, setBankToDelete] = useState(null);
  const [bankToEdit, setBankToEdit] = useState(null);
  const [selectedCompanyForBank, setSelectedCompanyForBank] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [companiesLoading, setCompaniesLoading] = useState(false);
  const [companiesError, setCompaniesError] = useState(null);
  const [usingMockData, setUsingMockData] = useState(false); // وضعیت استفاده از داده‌های نمونه
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 0
  });

  // دریافت بانک‌ها
  const fetchBanks = useCallback(async (pageNumber = 1, pageSize = 10) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await bankService.getBanks(pageNumber, pageSize);
      
      setBanks(Array.isArray(response.items) ? response.items : []);
      setPagination({
        currentPage: pageNumber,
        pageSize: pageSize,
        totalCount: response.totalCount || 0,
        totalPages: response.totalPages || 0
      });
      
    } catch (err) {
      console.error('Error fetching banks:', err);
      setError('خطا در دریافت اطلاعات بانک‌ها');
      setBanks([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBanks(pagination.currentPage, pagination.pageSize);
  }, [fetchBanks, pagination.currentPage, pagination.pageSize]);

  // حذف بانک
  const handleDeleteClick = (bank) => {
    setBankToDelete(bank);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!bankToDelete) return;

    try {
      setDeleteLoading(true);
      await bankService.deleteBank(bankToDelete.id);
      
      toast.success('بانک با موفقیت حذف شد', {
        position: "top-left",
        autoClose: 5000,
      });
      
      setIsDeleteModalOpen(false);
      setBankToDelete(null);
      
      const remainingItems = banks.length - 1;
      const newPageNumber = (remainingItems === 0 && pagination.currentPage > 1) 
        ? pagination.currentPage - 1 
        : pagination.currentPage;
      
      await fetchBanks(newPageNumber, pagination.pageSize);
      
    } catch (err) {
      console.error('Error deleting bank:', err.response.data.data.message);
      toast.error(err.response.data.data.message, {
        position: "top-left",
        autoClose: 5000,
      });
          setIsDeleteModalOpen(false);
      setBankToDelete(null);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setBankToDelete(null);
  };

  // ویرایش بانک
  const handleEditClick = (bank) => {
    setBankToEdit(bank);
    setIsEditModalOpen(true);
  };

  // مدیریت شرکت‌های بانک
  const handleCompanyClick = async (bank) => {
    try {
      setSelectedCompanyForBank(bank);
      setCompaniesLoading(true);
      setCompaniesError(null);
      setUsingMockData(false);
      
      console.log('🏢 Fetching companies for bank:', bank);
      
      // دریافت لیست شرکت‌ها
      const response = await bankService.getCompanyBanks(bank.id);
      console.log('Companies response:', response);
      
      // اگر response وجود داشت و آیتم داشت، از آن استفاده کن
      if (response && response.items && response.items.length > 0) {
        setCompanies(response.items);
      } else if (response && Array.isArray(response)) {
        setCompanies(response);
      } else {
        // اگر دیتا خالی بود، از دیتای نمونه استفاده کن
        console.warn('No companies data received, using mock data');
        setCompanies(getSampleCompanies());
        setUsingMockData(true);
        toast.info('در حال نمایش داده‌های نمونه (خطا در ارتباط با سرور)', {
          position: "top-left",
          autoClose: 5000,
        });
      }
      
      setIsCompanyModalOpen(true);
      
    } catch (err) {
      console.error('❌ Error fetching companies:', err);
      
      // در صورت خطا، از داده‌های نمونه استفاده کن
      setCompanies(getSampleCompanies());
      setUsingMockData(true);
      setCompaniesError('خطا در دریافت لیست شرکت‌ها - نمایش داده‌های نمونه');
      
      toast.warning('خطا در دریافت شرکت‌های بانک - نمایش داده‌های نمونه', {
        position: "top-left",
        autoClose: 5000,
      });
      
      setIsCompanyModalOpen(true);
    } finally {
      setCompaniesLoading(false);
    }
  };

  // تابع برای بستن مودال شرکت‌ها
  const handleCloseCompanyModal = () => {
    setIsCompanyModalOpen(false);
    setSelectedCompanyForBank(null);
    setCompanies([]);
    setCompaniesError(null);
    setUsingMockData(false);
  };

  // تابع تغییر انتخاب شرکت
  const toggleCompanySelection = (companyId, isChecked) => {
    setCompanies(prevCompanies => 
      prevCompanies.map(company => 
        company.id === companyId 
          ? { ...company, isCheck: isChecked }
          : company
      )
    );
  };

  // تابع انتخاب همه شرکت‌ها
  const selectAllCompanies = () => {
    setCompanies(prevCompanies => 
      prevCompanies.map(company => ({
        ...company,
        isCheck: true
      }))
    );
  };

  // تابع لغو انتخاب همه شرکت‌ها
  const deselectAllCompanies = () => {
    setCompanies(prevCompanies => 
      prevCompanies.map(company => ({
        ...company,
        isCheck: false
      }))
    );
  };

  // تابع تطبیق با شرکت اصلی
  const handleSyncWithCompany = async () => {
    if (!selectedCompanyForBank) return;
    
    try {
      setCompaniesLoading(true);
      
      // دریافت شرکت اصلی بانک
      const mainCompany = await bankService.getBankMainCompany(selectedCompanyForBank.id);
      
      if (mainCompany) {
        // تنظیم همه شرکت‌ها به false و سپس شرکت اصلی به true
        setCompanies(prevCompanies => 
          prevCompanies.map(company => ({
            ...company,
            isCheck: company.id === mainCompany.id
          }))
        );
        toast.success('شرکت‌ها با شرکت اصلی بانک تطبیق داده شدند', {
          position: "top-left",
          autoClose: 5000,
        });
      } else {
        toast.info('هیچ شرکت اصلی برای این بانک تعریف نشده است', {
          position: "top-left",
          autoClose: 5000,
        });
      }
    } catch (err) {
      console.error('Error syncing with company:', err);
      toast.error('خطا در تطبیق با شرکت اصلی', {
        position: "top-left",
        autoClose: 5000,
      });
    } finally {
      setCompaniesLoading(false);
    }
  };

  // تابع ذخیره شرکت‌های انتخاب شده
  const saveCompanySelections = async () => {
    if (!selectedCompanyForBank) return;
    
    // اگر از داده‌های نمونه استفاده می‌کنیم، فقط در console ذخیره کن
    if (usingMockData) {
      const selectedCompanies = companies.filter(c => c.isCheck);
      console.log('💾 Mock save - Selected companies:', selectedCompanies);
      toast.success('ذخیره در حالت دمو انجام شد (داده‌های نمونه)', {
        position: "top-left",
        autoClose: 5000,
      });
      setIsCompanyModalOpen(false);
      setSelectedCompanyForBank(null);
      setCompanies([]);
      setUsingMockData(false);
      return;
    }
    
    try {
      setCompaniesLoading(true);
      
      // گرفتن شرکت‌های انتخاب شده بر اساس isCheck
      const selectedCompanyIds = companies
        .filter(company => company.isCheck)
        .map(company => company.id);
      
      console.log('💾 Saving company selections:', {
        bank: selectedCompanyForBank?.id,
        selectedCompanies: selectedCompanyIds
      });
      
      await bankService.insertAccessBankToComapny( { companyIds: selectedCompanyIds },selectedCompanyForBank.id);
      
      toast.success('شرکت‌های بانک با موفقیت ذخیره شدند', {
        position: "top-left",
        autoClose: 5000,
      });
      
      console.log('✅ Company assignments saved successfully');
      
      setIsCompanyModalOpen(false);
      setSelectedCompanyForBank(null);
      setCompanies([]);
      
    } catch (err) {
      console.error('❌ Error saving company selections:', err);
      setCompaniesError('خطا در ذخیره انتخاب‌ها');
      toast.error('خطا در ذخیره شرکت‌های بانک', {
        position: "top-left",
        autoClose: 5000,
      });
    } finally {
      setCompaniesLoading(false);
    }
  };

  // تغییر صفحه
  const handlePageChange = (pageNumber) => {
    setPagination(prev => ({ ...prev, currentPage: pageNumber }));
  };

  const handlePageSizeChange = (newPageSize) => {
    setPagination(prev => ({
      ...prev,
      pageSize: newPageSize,
      currentPage: 1
    }));
  };

  // تابع رفرش پس از موفقیت (ایجاد/ویرایش)
  const handleBankSuccess = async () => {
    await fetchBanks(pagination.currentPage, pagination.pageSize);
  };

  const handleRetry = () => {
    fetchBanks(pagination.currentPage, pagination.pageSize);
  };

  // محاسبه رکوردهای نمایش داده شده
  const start = ((pagination.currentPage - 1) * pagination.pageSize) + 1;
  const end = Math.min(start + pagination.pageSize - 1, pagination.totalCount);

  if (loading && banks.length === 0) {
    return <LoadingSpinner text="در حال دریافت اطلاعات بانک‌ها..." />;
  }

  return (
    <div className="bank-page">
      <div className="page-header">
        <h1>مدیریت بانک‌ها</h1>
        <p>لیست تمام بانک‌های سیستم</p>
      </div>
      
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

      <div className="bank-actions">
        <div className="actions-left">
          <button 
            className="btn btn-primary"
            onClick={() => setIsCreateModalOpen(true)}
            disabled={loading}
          >
            <FaPlus className="btn-icon" />
            بانک جدید
          </button>

          <button 
            className="btn btn-secondary"
            onClick={handleRetry}
            disabled={loading}
          >
            <FaRedo className="btn-icon" />
            {loading ? 'در حال بروزرسانی...' : 'بروزرسانی'}
          </button>
        </div>

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
          </select>
        </div>
      </div>

      {error && (
        <div className="error-banner">
          <span className="error-icon">⚠️</span>
          {error}
          <button onClick={handleRetry} className="btn-retry">تلاش مجدد</button>
        </div>
      )}

      <div className="bank-info">
        <div className="total-info">
          نمایش {start} تا {end} از {pagination.totalCount.toLocaleString()} بانک
        </div>
      </div>

      <div className="bank-table-container">
        <table className="bank-table">
          <thead>
            <tr>
              <th>#</th>
              <th>نام بانک</th>
              <th>آدرس</th>
              <th>تلفن</th>
              <th>توضیحات</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {banks.length === 0 ? (
              <tr>
                <td colSpan="6" className="no-data">
                  <div className="no-data-content">
                    <span className="no-data-icon">🏦</span>
                    <p>هیچ بانکی یافت نشد</p>
                    <button 
                      className="btn btn-primary"
                      onClick={() => setIsCreateModalOpen(true)}
                    >
                      ایجاد اولین بانک
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              banks.map((bank, index) => (
                <tr key={bank.id || index}>
                  <td className="index-cell">
                    {((pagination.currentPage - 1) * pagination.pageSize) + index + 1}
                  </td>
                  <td>
                    <div className="bank-name-content">
                      <FaBuilding className="bank-icon" />
                      <span className="bank-title">{bank.name}</span>
                    </div>
                  </td>
                  <td>
                    <div className="bank-address">
                      <FaMapMarkerAlt className="address-icon" />
                      {bank.address || '---'}
                    </div>
                  </td>
                  <td>
                    <div className="bank-phone">
                      <FaPhone className="phone-icon" />
                      {bank.phone || '---'}
                    </div>
                  </td>
                  <td>
                    <div className="bank-desc">
                      <FaAlignLeft className="desc-icon" />
                      {bank.desc || '---'}
                    </div>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-action btn-company"
                        title="مدیریت شرکت‌ها"
                        onClick={() => handleCompanyClick(bank)}
                      >
                        <FaSyncAlt />
                      </button>
                      <button 
                        className="btn-action btn-edit"
                        title="ویرایش"
                        onClick={() => handleEditClick(bank)}
                      >
                        <FaEdit />
                      </button>
                      <button 
                        className="btn-action btn-delete"
                        title="حذف"
                        onClick={() => handleDeleteClick(bank)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {pagination.totalPages > 1 && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          totalItems={pagination.totalCount}
          pageSize={pagination.pageSize}
          onPageChange={handlePageChange}
        />
      )}

      {/* مودال ایجاد بانک */}
      <CreateBankModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={handleBankSuccess}
      />

      {/* مودال ویرایش بانک */}
      <CreateBankModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setBankToEdit(null);
        }}
        onSuccess={handleBankSuccess}
        bankToEdit={bankToEdit}
        isEditMode={true}
      />

      {/* مودال حذف */}
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        projectName={bankToDelete?.name}
        loading={deleteLoading}
      />

      {/* مودال مدیریت شرکت‌های بانک */}
      <CompanySelectionModal
        isOpen={isCompanyModalOpen}
        onClose={handleCloseCompanyModal}
        projectName={selectedCompanyForBank?.name || ''}
        project={selectedCompanyForBank}
        companies={companies}
        onCompanyToggle={toggleCompanySelection}
        onSelectAll={selectAllCompanies}
        onDeselectAll={deselectAllCompanies}
        onSave={saveCompanySelections}
        onSyncWithCompany={handleSyncWithCompany}
        loading={companiesLoading}
        error={companiesError}
        isMockData={usingMockData}
      />
    </div>
  );
};

export default Bank;