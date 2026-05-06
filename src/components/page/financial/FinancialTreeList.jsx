// // // // components/financial/FinancialTreeList/FinancialTreeList.jsx
// // // import React, { useState, useEffect, useCallback } from 'react';
// // // import { financialService } from '../../../services/financial';
// // // import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner';
// // // import CreateFinancialModal from './CreateFinancialModal';
// // // import ConfirmDeleteModal from '../project/ConfirmDeleteModal/ConfirmDeleteModal';
// // // // import CompanyAssignmentModal from '../company/CompanySkeleton';
// // // import Pagination from '../../common/Pagination/Pagination';
// // // import { toast, ToastContainer } from 'react-toastify';
// // // import 'react-toastify/dist/ReactToastify.css';
// // // import { 
// // //   FaEdit, 
// // //   FaTrash, 
// // //   FaPlus, 
// // //   FaRedo, 
// // //   FaChevronDown, 
// // //   FaChevronLeft,
// // //   FaBuilding,
// // //   FaAngleLeft,
// // //   FaAngleDown
// // // } from 'react-icons/fa';
// // // import './FinancialTreeList.css';

// // // const FinancialTreeList = () => {
// // //   const [items, setItems] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);
// // //   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
// // //   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
// // //   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
// // //   const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);
// // //   const [deleteLoading, setDeleteLoading] = useState(false);
// // //   const [selectedItem, setSelectedItem] = useState(null);
// // //   const [parentForNewItem, setParentForNewItem] = useState(null);
// // //   const [expandedNodes, setExpandedNodes] = useState(new Set());
// // //   const [pagination, setPagination] = useState({
// // //     currentPage: 1,
// // //     pageSize: 10,
// // //     totalCount: 0,
// // //     totalPages: 0
// // //   });

// // //   // دریافت داده‌های درختی
// // //   const fetchFinancialItems = useCallback(async (pageNumber = 1, pageSize = 10) => {
// // //     try {
// // //       setLoading(true);
// // //       setError(null);
      
// // //       const response = await financialService.getFinancialItems(pageNumber, pageSize);
// // //       console.log('📊 دریافت داده از API:', response);
// // // console.log('📊 آیتم‌ها:', response.items);
// // // console.log('📊 ساختار اولین آیتم:', response.items?.[0]);

// // // // بررسی کنید که children در داده وجود دارد یا نه
// // // if (response.items?.[0]) {
// // //   console.log('👶 فرزندان آیتم اول:', response.items[0].children);
// // // }
      
// // //       setItems(Array.isArray(response.items) ? response.items : []);
// // //       setPagination({
// // //         currentPage: pageNumber,
// // //         pageSize: pageSize,
// // //         totalCount: response.totalCount || 0,
// // //         totalPages: response.totalPages || 0
// // //       });
      
// // //       // پیش‌فرض: باز کردن سطح اول
// // //       const firstLevelIds = new Set(
// // //         (response.items || [])
// // //           .filter(item => !item.parentId)
// // //           .map(item => item.id)
// // //       );
// // //       setExpandedNodes(firstLevelIds);
      
// // //     } catch (err) {
// // //       console.error('Error fetching financial items:', err);
// // //       setError('خطا در دریافت اطلاعات صورت‌های مالی');
// // //       setItems([]);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   }, []);

// // //   useEffect(() => {
// // //     fetchFinancialItems(pagination.currentPage, pagination.pageSize);
// // //   }, [fetchFinancialItems, pagination.currentPage, pagination.pageSize]);

// // //   // تبدیل لیست مسطح به ساختار درختی
// // //   const buildTree = (flatItems) => {
// // //     const itemMap = new Map();
// // //     const roots = [];

// // //     // ایجاد نقشه
// // //     flatItems.forEach(item => {
// // //       itemMap.set(item.id, { ...item, children: [] });
// // //     });

// // //     // ساخت درخت
// // //     flatItems.forEach(item => {
// // //       const node = itemMap.get(item.id);
// // //       if (item.parentId && itemMap.has(item.parentId)) {
// // //         itemMap.get(item.parentId).children.push(node);
// // //       } else {
// // //         roots.push(node);
// // //       }
// // //     });

// // //     return roots;
// // //   };

// // //   // باز/بسته کردن گره
// // //   const toggleNode = (nodeId) => {
// // //     setExpandedNodes(prev => {
// // //       const newSet = new Set(prev);
// // //       if (newSet.has(nodeId)) {
// // //         newSet.delete(nodeId);
// // //       } else {
// // //         newSet.add(nodeId);
// // //       }
// // //       return newSet;
// // //     });
// // //   };

// // //   // عملیات حذف
// // //   const handleDeleteClick = (item) => {
// // //     setSelectedItem(item);
// // //     setIsDeleteModalOpen(true);
// // //   };

// // //   const handleConfirmDelete = async () => {
// // //     if (!selectedItem) return;

// // //     try {
// // //       setDeleteLoading(true);
// // //       await financialService.deleteFinancialItem(selectedItem.id);
      
// // //       toast.success('صورت مالی با موفقیت حذف شد');
// // //       setIsDeleteModalOpen(false);
// // //       setSelectedItem(null);
      
// // //       await fetchFinancialItems(pagination.currentPage, pagination.pageSize);
      
// // //     } catch (err) {
// // //       console.error('Error deleting:', err);
// // //       toast.error(err.response?.data?.data?.message || 'خطا در حذف');
// // //     } finally {
// // //       setDeleteLoading(false);
// // //     }
// // //   };

// // //   // عملیات ویرایش
// // //   const handleEditClick = (item) => {
// // //     setSelectedItem(item);
// // //     setIsEditModalOpen(true);
// // //   };

// // //   // عملیات اضافه کردن زیرمجموعه
// // //   const handleAddChildClick = (parentItem) => {
// // //     setParentForNewItem(parentItem);
// // //     setIsCreateModalOpen(true);
// // //   };

// // //   // عملیات تخصیص به شرکت
// // //   const handleCompanyClick = (item) => {
// // //     setSelectedItem(item);
// // //     setIsCompanyModalOpen(true);
// // //   };

// // //   // رندر بازگشتی گره‌های درخت
// // //   const renderTreeNode = (node, level = 0) => {
// // //     const hasChildren = node.children && node.children.length > 0;
// // //     const isExpanded = expandedNodes.has(node.id);
// // //     const paddingRight = level * 30;

// // //     return (
// // //       <React.Fragment key={node.id}>
// // //         <tr className="tree-row" style={{ '--padding-right': `${paddingRight}px` }}>
// // //           <td className="tree-cell-title">
// // //             <div className="tree-title-container" style={{ paddingRight: `${paddingRight}px` }}>
// // //               {hasChildren && (
// // //                 <button 
// // //                   className="tree-toggle-btn"
// // //                   onClick={() => toggleNode(node.id)}
// // //                 >
// // //                   {isExpanded ? <FaAngleDown /> : <FaAngleLeft />}
// // //                 </button>
// // //               )}
// // //               {!hasChildren && <span className="tree-placeholder" />}
// // //               <span className="tree-title">{node.title}</span>
// // //             </div>
// // //           </td>
// // //           <td className="tree-cell-transaction">
// // //             <span className={`transaction-badge transaction-${node.financial_transactions_Title?.toLowerCase()}`}>
// // //               {node.financial_transactions_Title === 'Out' ? 'خروجی' : 'ورودی'}
// // //             </span>
// // //           </td>
// // //           <td className="tree-cell-actions">
// // //             <div className="action-buttons">
// // //               <button 
// // //                 className="btn-action btn-add-child"
// // //                 title="افزودن زیرمجموعه"
// // //                 onClick={() => handleAddChildClick(node)}
// // //               >
// // //                 <FaPlus />
// // //               </button>
// // //               <button 
// // //                 className="btn-action btn-company"
// // //                 title="تخصیص به شرکت"
// // //                 onClick={() => handleCompanyClick(node)}
// // //               >
// // //                 <FaBuilding />
// // //               </button>
// // //               <button 
// // //                 className="btn-action btn-edit"
// // //                 title="ویرایش"
// // //                 onClick={() => handleEditClick(node)}
// // //               >
// // //                 <FaEdit />
// // //               </button>
// // //               <button 
// // //                 className="btn-action btn-delete"
// // //                 title="حذف"
// // //                 onClick={() => handleDeleteClick(node)}
// // //               >
// // //                 <FaTrash />
// // //               </button>
// // //             </div>
// // //           </td>
// // //         </tr>
// // //         {hasChildren && isExpanded && (
// // //           node.children.map(child => renderTreeNode(child, level + 1))
// // //         )}
// // //       </React.Fragment>
// // //     );
// // //   };

// // //   const handleSuccess = async () => {
// // //     await fetchFinancialItems(pagination.currentPage, pagination.pageSize);
// // //     setIsCreateModalOpen(false);
// // //     setIsEditModalOpen(false);
// // //     setSelectedItem(null);
// // //     setParentForNewItem(null);
// // //   };

// // //   if (loading && items.length === 0) {
// // //     return <LoadingSpinner text="در حال دریافت اطلاعات..." />;
// // //   }

// // //   const treeData = buildTree(items);

// // //   return (
// // //     <div className="financial-tree-page">
// // //       <div className="page-header">
// // //         <h1>مدیریت صورت‌های مالی</h1>
// // //         <p>ساختار سلسله‌مراتبی صورت‌های مالی</p>
// // //       </div>

// // //       <ToastContainer rtl={true} position="top-left" />

// // //       <div className="financial-actions">
// // //         <div className="actions-left">
// // //           <button 
// // //             className="btn btn-primary"
// // //             onClick={() => {
// // //               setParentForNewItem(null);
// // //               setIsCreateModalOpen(true);
// // //             }}
// // //           >
// // //             <FaPlus className="btn-icon" />
// // //             صورت مالی جدید (ریشه)
// // //           </button>

// // //           <button 
// // //             className="btn btn-secondary"
// // //             onClick={() => fetchFinancialItems(pagination.currentPage, pagination.pageSize)}
// // //           >
// // //             <FaRedo className="btn-icon" />
// // //             بروزرسانی
// // //           </button>
// // //         </div>

// // //         <div className="page-size-selector">
// // //           <label>تعداد در صفحه:</label>
// // //           <select 
// // //             value={pagination.pageSize}
// // //             onChange={(e) => setPagination(prev => ({ ...prev, pageSize: Number(e.target.value), currentPage: 1 }))}
// // //           >
// // //             <option value="10">۱۰</option>
// // //             <option value="20">۲۰</option>
// // //             <option value="50">۵۰</option>
// // //           </select>
// // //         </div>
// // //       </div>

// // //       {error && (
// // //         <div className="error-banner">
// // //           <span>⚠️</span> {error}
// // //           <button onClick={() => fetchFinancialItems(pagination.currentPage, pagination.pageSize)}>تلاش مجدد</button>
// // //         </div>
// // //       )}

// // //       <div className="financial-table-container">
// // //         <table className="financial-table">
// // //           <thead>
// // //             <tr>
// // //               <th>عنوان</th>
// // //               <th>نوع تراکنش</th>
// // //               <th>عملیات</th>
// // //             </tr>
// // //           </thead>
// // //           <tbody>
// // //             {treeData.length === 0 ? (
// // //               <tr>
// // //                 <td colSpan="3" className="no-data">
// // //                   <div className="no-data-content">
// // //                     <span className="no-data-icon">📊</span>
// // //                     <p>هیچ صورت مالی یافت نشد</p>
// // //                     <button 
// // //                       className="btn btn-primary"
// // //                       onClick={() => setIsCreateModalOpen(true)}
// // //                     >
// // //                       ایجاد اولین صورت مالی
// // //                     </button>
// // //                   </div>
// // //                 </td>
// // //               </tr>
// // //             ) : (
// // //               treeData.map(node => renderTreeNode(node))
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
// // //           onPageChange={(page) => setPagination(prev => ({ ...prev, currentPage: page }))}
// // //         />
// // //       )}

// // //       {/* مودال ایجاد */}
// // //       <CreateFinancialModal
// // //         isOpen={isCreateModalOpen}
// // //         onClose={() => {
// // //           setIsCreateModalOpen(false);
// // //           setParentForNewItem(null);
// // //         }}
// // //         onSuccess={handleSuccess}
// // //         parentItem={parentForNewItem}
// // //       />

// // //       {/* مودال ویرایش */}
// // //       <CreateFinancialModal
// // //         isOpen={isEditModalOpen}
// // //         onClose={() => {
// // //           setIsEditModalOpen(false);
// // //           setSelectedItem(null);
// // //         }}
// // //         onSuccess={handleSuccess}
// // //         editItem={selectedItem}
// // //         isEditMode={true}
// // //       />

// // //       {/* مودال حذف */}
// // //       <ConfirmDeleteModal
// // //         isOpen={isDeleteModalOpen}
// // //         onClose={() => {
// // //           setIsDeleteModalOpen(false);
// // //           setSelectedItem(null);
// // //         }}
// // //         onConfirm={handleConfirmDelete}
// // //         projectName={selectedItem?.title}
// // //         loading={deleteLoading}
// // //       />

// // //       {/* مودال تخصیص به شرکت */}
// // //       {/* <CompanyAssignmentModal
// // //         isOpen={isCompanyModalOpen}
// // //         onClose={() => {
// // //           setIsCompanyModalOpen(false);
// // //           setSelectedItem(null);
// // //         }}
// // //         financialItem={selectedItem}
// // //       /> */}
// // //     </div>
// // //   );
// // // };

// // // export default FinancialTreeList;
// // import React, { useState, useEffect, useCallback } from 'react';
// // import { financialService } from '../../../services/financial';
// // import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner';
// // import CreateFinancialModal from './CreateFinancialModal';
// // import ConfirmDeleteModal from '../project/ConfirmDeleteModal/ConfirmDeleteModal';
// // // import CompanyAssignmentModal from './CompanyAssignmentModal';
// // import Pagination from '../../common/Pagination/Pagination';
// // import { toast, ToastContainer } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';
// // import { 
// //   FaEdit, 
// //   FaTrash, 
// //   FaPlus, 
// //   FaRedo, 
// //   FaBuilding,
// //   FaChevronLeft,
// //   FaChevronDown
// // } from 'react-icons/fa';
// // import './FinancialTreeList.css';

// // const FinancialTreeList = () => {
// //   const [items, setItems] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
// //   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
// //   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
// //   const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);
// //   const [deleteLoading, setDeleteLoading] = useState(false);
// //   const [selectedItem, setSelectedItem] = useState(null);
// //   const [parentForNewItem, setParentForNewItem] = useState(null);
// //   const [expandedNodes, setExpandedNodes] = useState(new Set());
// //   const [pagination, setPagination] = useState({
// //     currentPage: 1,
// //     pageSize: 10,
// //     totalCount: 0,
// //     totalPages: 0
// //   });

// //   // دریافت داده‌ها
// //   const fetchFinancialItems = useCallback(async (pageNumber = 1, pageSize = 10) => {
// //     try {
// //       setLoading(true);
// //       setError(null);
      
// //       const response = await financialService.getFinancialItems(pageNumber, pageSize);
      
// //       const treeData = response.items || [];
// //       setItems(treeData);
      
// //       // باز کردن تمام گره‌های سطح اول به صورت پیش‌فرض
// //       const initialExpanded = new Set();
// //       const addFirstLevelIds = (nodes) => {
// //         nodes.forEach(node => {
// //           initialExpanded.add(node.id);
// //           if (node.children && node.children.length > 0) {
// //             addFirstLevelIds(node.children);
// //           }
// //         });
// //       };
// //       addFirstLevelIds(treeData);
// //       setExpandedNodes(initialExpanded);
      
// //       setPagination({
// //         currentPage: pageNumber,
// //         pageSize: pageSize,
// //         totalCount: response.totalCount || 0,
// //         totalPages: response.totalPages || 0
// //       });
      
// //     } catch (err) {
// //       console.error('Error fetching financial items:', err);
// //       setError('خطا در دریافت اطلاعات صورت‌های مالی');
// //       setItems([]);
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, []);

// //   useEffect(() => {
// //     fetchFinancialItems(pagination.currentPage, pagination.pageSize);
// //   }, [fetchFinancialItems, pagination.currentPage, pagination.pageSize]);

// //   // باز/بسته کردن گره
// //   const toggleNode = (nodeId) => {
// //     setExpandedNodes(prev => {
// //       const newSet = new Set(prev);
// //       if (newSet.has(nodeId)) {
// //         newSet.delete(nodeId);
// //       } else {
// //         newSet.add(nodeId);
// //       }
// //       return newSet;
// //     });
// //   };

// //   // بررسی وجود فرزند
// //   const hasChildren = (node) => {
// //     return node.children && Array.isArray(node.children) && node.children.length > 0;
// //   };

// //   // رندر بازگشتی گره‌ها
// //   const renderTreeNode = (node, level = 0) => {
// //     const hasChildrenNodes = hasChildren(node);
// //     const isExpanded = expandedNodes.has(node.id);
// //     const paddingRight = level * 30;

// //     return (
// //       <React.Fragment key={node.id}>
// //         <tr className="tree-row">
// //           <td className="tree-cell-title">
// //             <div className="tree-title-container" style={{ paddingRight: `${paddingRight}px` }}>
// //               {hasChildrenNodes && (
// //                 <button 
// //                   className="tree-toggle-btn"
// //                   onClick={() => toggleNode(node.id)}
// //                 >
// //                   {isExpanded ? <FaChevronDown /> : <FaChevronLeft />}
// //                 </button>
// //               )}
// //               {!hasChildrenNodes && <span className="tree-placeholder" />}
// //               <span className="tree-title">{node.title}</span>
// //             </div>
// //           </td>
// //           <td className="tree-cell-transaction">
// //             <span className={`transaction-badge ${node.financial_transactions_Title === 'Out' ? 'transaction-out' : 'transaction-in'}`}>
// //               {node.financial_transactions_Title === 'Out' ? 'خروجی' : 'ورودی'}
// //             </span>
// //           </td>
// //           <td className="tree-cell-actions">
// //             <div className="action-buttons">
// //               <button 
// //                 className="btn-action btn-add-child"
// //                 title="افزودن زیرمجموعه"
// //                 onClick={() => {
// //                   setParentForNewItem(node);
// //                   setIsCreateModalOpen(true);
// //                 }}
// //               >
// //                 <FaPlus />
// //               </button>
// //               <button 
// //                 className="btn-action btn-company"
// //                 title="تخصیص به شرکت"
// //                 onClick={() => {
// //                   setSelectedItem(node);
// //                   setIsCompanyModalOpen(true);
// //                 }}
// //               >
// //                 <FaBuilding />
// //               </button>
// //               <button 
// //                 className="btn-action btn-edit"
// //                 title="ویرایش"
// //                 onClick={() => {
// //                   setSelectedItem(node);
// //                   setIsEditModalOpen(true);
// //                 }}
// //               >
// //                 <FaEdit />
// //               </button>
// //               <button 
// //                 className="btn-action btn-delete"
// //                 title="حذف"
// //                 onClick={() => {
// //                   setSelectedItem(node);
// //                   setIsDeleteModalOpen(true);
// //                 }}
// //               >
// //                 <FaTrash />
// //               </button>
// //             </div>
// //           </td>
// //         </tr>
// //         {hasChildrenNodes && isExpanded && (
// //           node.children.map(child => renderTreeNode(child, level + 1))
// //         )}
// //       </React.Fragment>
// //     );
// //   };

// //   // حذف آیتم
// //   const handleConfirmDelete = async () => {
// //     if (!selectedItem) return;

// //     try {
// //       setDeleteLoading(true);
// //       await financialService.deleteFinancialItem(selectedItem.id);
      
// //       toast.success('صورت مالی با موفقیت حذف شد');
// //       setIsDeleteModalOpen(false);
// //       setSelectedItem(null);
      
// //       await fetchFinancialItems(pagination.currentPage, pagination.pageSize);
      
// //     } catch (err) {
// //       console.error('Error deleting:', err);
// //       toast.error(err.response?.data?.data?.message || 'خطا در حذف');
// //     } finally {
// //       setDeleteLoading(false);
// //     }
// //   };

// //   // موفقیت در ایجاد/ویرایش
// //   const handleSuccess = async () => {
// //     await fetchFinancialItems(pagination.currentPage, pagination.pageSize);
// //     setIsCreateModalOpen(false);
// //     setIsEditModalOpen(false);
// //     setSelectedItem(null);
// //     setParentForNewItem(null);
// //   };

// //   if (loading && items.length === 0) {
// //     return <LoadingSpinner text="در حال دریافت اطلاعات..." />;
// //   }

// //   return (
// //     <div className="financial-tree-page">
// //       <div className="page-header">
// //         <h1>مدیریت صورت‌های مالی</h1>
// //         <p>ساختار سلسله‌مراتبی صورت‌های مالی</p>
// //       </div>

// //       <ToastContainer rtl={true} position="top-left" />

// //       <div className="financial-actions">
// //         <div className="actions-left">
// //           <button 
// //             className="btn btn-primary"
// //             onClick={() => {
// //               setParentForNewItem(null);
// //               setIsCreateModalOpen(true);
// //             }}
// //           >
// //             <FaPlus className="btn-icon" />
// //             صورت مالی جدید
// //           </button>

// //           <button 
// //             className="btn btn-secondary"
// //             onClick={() => fetchFinancialItems(pagination.currentPage, pagination.pageSize)}
// //           >
// //             <FaRedo className="btn-icon" />
// //             بروزرسانی
// //           </button>
// //         </div>

// //         <div className="page-size-selector">
// //           <label>تعداد در صفحه:</label>
// //           <select 
// //             value={pagination.pageSize}
// //             onChange={(e) => setPagination(prev => ({ ...prev, pageSize: Number(e.target.value), currentPage: 1 }))}
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
// //           <span>⚠️</span> {error}
// //           <button onClick={() => fetchFinancialItems(pagination.currentPage, pagination.pageSize)}>تلاش مجدد</button>
// //         </div>
// //       )}

// //       <div className="financial-table-container">
// //         <table className="financial-table">
// //           <thead>
// //             <tr>
// //               <th>عنوان</th>
// //               <th>نوع تراکنش</th>
// //               <th>عملیات</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {items.length === 0 ? (
// //               <tr>
// //                 <td colSpan="3" className="no-data">
// //                   <div className="no-data-content">
// //                     <span className="no-data-icon">📊</span>
// //                     <p>هیچ صورت مالی یافت نشد</p>
// //                     <button 
// //                       className="btn btn-primary"
// //                       onClick={() => setIsCreateModalOpen(true)}
// //                     >
// //                       ایجاد اولین صورت مالی
// //                     </button>
// //                   </div>
// //                 </td>
// //               </tr>
// //             ) : (
// //               items.map(node => renderTreeNode(node, 0))
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
// //           onPageChange={(page) => setPagination(prev => ({ ...prev, currentPage: page }))}
// //         />
// //       )}

// //       {/* مودال ایجاد */}
// //       <CreateFinancialModal
// //         isOpen={isCreateModalOpen}
// //         onClose={() => {
// //           setIsCreateModalOpen(false);
// //           setParentForNewItem(null);
// //         }}
// //         onSuccess={handleSuccess}
// //         parentItem={parentForNewItem}
// //       />

// //       {/* مودال ویرایش */}
// //       <CreateFinancialModal
// //         isOpen={isEditModalOpen}
// //         onClose={() => {
// //           setIsEditModalOpen(false);
// //           setSelectedItem(null);
// //         }}
// //         onSuccess={handleSuccess}
// //         editItem={selectedItem}
// //         isEditMode={true}
// //       />

// //       {/* مودال حذف */}
// //       <ConfirmDeleteModal
// //         isOpen={isDeleteModalOpen}
// //         onClose={() => {
// //           setIsDeleteModalOpen(false);
// //           setSelectedItem(null);
// //         }}
// //         onConfirm={handleConfirmDelete}
// //         projectName={selectedItem?.title}
// //         loading={deleteLoading}
// //       />

// //       {/* مودال تخصیص به شرکت */}
// //       {/* <CompanyAssignmentModal
// //         isOpen={isCompanyModalOpen}
// //         onClose={() => {
// //           setIsCompanyModalOpen(false);
// //           setSelectedItem(null);
// //         }}
// //         financialItem={selectedItem}
// //       /> */}
// //     </div>
// //   );
// // };

// // export default FinancialTreeList;

// import React, { useState, useEffect, useCallback } from 'react';
// import { financialService } from '../../../services/financial';
// import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner';
// import CreateFinancialModal from './CreateFinancialModal';
// import ConfirmDeleteModal from '../project/ConfirmDeleteModal/ConfirmDeleteModal';

// import Pagination from '../../common/Pagination/Pagination';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { 
//   FaEdit, 
//   FaTrash, 
//   FaPlus, 
//   FaRedo, 
//   FaBuilding,
//   FaChevronLeft,
//   FaChevronDown,
//   FaBan
// } from 'react-icons/fa';
// import './FinancialTreeList.css';

// const FinancialTreeList = () => {
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);
//   const [deleteLoading, setDeleteLoading] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [parentForNewItem, setParentForNewItem] = useState(null);
//   const [expandedNodes, setExpandedNodes] = useState(new Set());
//   const [pagination, setPagination] = useState({
//     currentPage: 1,
//     pageSize: 10,
//     totalCount: 0,
//     totalPages: 0
//   });

//   // دریافت داده‌ها
//   const fetchFinancialItems = useCallback(async (pageNumber = 1, pageSize = 10) => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       const response = await financialService.getFinancialItems(pageNumber, pageSize);
      
//       const treeData = response.items || [];
//       setItems(treeData);
      
//       // باز کردن تمام گره‌های سطح اول به صورت پیش‌فرض
//       const initialExpanded = new Set();
//       const addFirstLevelIds = (nodes) => {
//         nodes.forEach(node => {
//           initialExpanded.add(node.id);
//           if (node.children && node.children.length > 0) {
//             addFirstLevelIds(node.children);
//           }
//         });
//       };
//       addFirstLevelIds(treeData);
//       setExpandedNodes(initialExpanded);
      
//       setPagination({
//         currentPage: pageNumber,
//         pageSize: pageSize,
//         totalCount: response.totalCount || 0,
//         totalPages: response.totalPages || 0
//       });
      
//     } catch (err) {
//       console.error('Error fetching financial items:', err);
//       setError('خطا در دریافت اطلاعات صورت‌های مالی');
//       setItems([]);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchFinancialItems(pagination.currentPage, pagination.pageSize);
//   }, [fetchFinancialItems, pagination.currentPage, pagination.pageSize]);

//   // باز/بسته کردن گره
//   const toggleNode = (nodeId) => {
//     setExpandedNodes(prev => {
//       const newSet = new Set(prev);
//       if (newSet.has(nodeId)) {
//         newSet.delete(nodeId);
//       } else {
//         newSet.add(nodeId);
//       }
//       return newSet;
//     });
//   };

//   // بررسی وجود فرزند
//   const hasChildren = (node) => {
//     return node.children && Array.isArray(node.children) && node.children.length > 0;
//   };

//   // بررسی آیا آیتم می‌تواند فرزند داشته باشد (فقط آیتم‌های ریشه می‌توانند فرزند داشته باشند)
//   const canHaveChildren = (node) => {
//     // اگر parentId === null یعنی آیتم ریشه است
//     return node.parentId === null || node.parentId === undefined;
//   };

//   // رندر بازگشتی گره‌ها
//   const renderTreeNode = (node, level = 0) => {
//     const hasChildrenNodes = hasChildren(node);
//     const isExpanded = expandedNodes.has(node.id);
//     const paddingRight = level * 30;
//     const canAddChild = canHaveChildren(node); // آیا می‌تواند فرزند اضافه کند
//     const isChild = node.parentId !== null && node.parentId !== undefined; // آیا خودش بچه است

//     return (
//       <React.Fragment key={node.id}>
//         <tr className="tree-row">
//           <td className="tree-cell-title">
//             <div className="tree-title-container" style={{ paddingRight: `${paddingRight}px` }}>
//               {hasChildrenNodes && (
//                 <button 
//                   className="tree-toggle-btn"
//                   onClick={() => toggleNode(node.id)}
//                 >
//                   {isExpanded ? <FaChevronDown /> : <FaChevronLeft />}
//                 </button>
//               )}
//               {!hasChildrenNodes && <span className="tree-placeholder" />}
//               <span className="tree-title">
//                 {node.title}
//                 {isChild && (
//                   <span className="child-badge">(زیرمجموعه)</span>
//                 )}
//               </span>
//             </div>
//            </td>
//           <td className="tree-cell-transaction">
//             <span className={`transaction-badge ${node.financial_transactions_Title === 'Out' ? 'transaction-out' : 'transaction-in'}`}>
//               {node.financial_transactions_Title === 'Out' ? 'خروجی' : 'ورودی'}
//             </span>
//           </td>
//           <td className="tree-cell-actions">
//             <div className="action-buttons">
//               <button 
//                 className={`btn-action btn-add-child ${!canAddChild ? 'disabled' : ''}`}
//                 title={!canAddChild ? "زیرمجموعه‌ها نمی‌توانند فرزند داشته باشند" : "افزودن زیرمجموعه"}
//                 onClick={() => {
//                   if (canAddChild) {
//                     setParentForNewItem(node);
//                     setIsCreateModalOpen(true);
//                   } else {
//                     toast.warning('آیتم‌های زیرمجموعه نمی‌توانند فرزند داشته باشند');
//                   }
//                 }}
//                 disabled={!canAddChild}
//               >
//                 {canAddChild ? <FaPlus /> : <FaBan />}
//               </button>
//               <button 
//                 className="btn-action btn-company"
//                 title="تخصیص به شرکت"
//                 onClick={() => {
//                   setSelectedItem(node);
//                   setIsCompanyModalOpen(true);
//                 }}
//               >
//                 <FaBuilding />
//               </button>
//               <button 
//                 className="btn-action btn-edit"
//                 title="ویرایش"
//                 onClick={() => {
//                   setSelectedItem(node);
//                   setIsEditModalOpen(true);
//                 }}
//               >
//                 <FaEdit />
//               </button>
//               <button 
//                 className="btn-action btn-delete"
//                 title="حذف"
//                 onClick={() => {
//                   setSelectedItem(node);
//                   setIsDeleteModalOpen(true);
//                 }}
//               >
//                 <FaTrash />
//               </button>
//             </div>
//           </td>
//         </tr>
//         {hasChildrenNodes && isExpanded && (
//           node.children.map(child => renderTreeNode(child, level + 1))
//         )}
//       </React.Fragment>
//     );
//   };

//   // حذف آیتم
//   const handleConfirmDelete = async () => {
//     if (!selectedItem) return;

//     try {
//       setDeleteLoading(true);
//       await financialService.deleteFinancialItem(selectedItem.id);
      
//       toast.success('صورت مالی با موفقیت حذف شد');
//       setIsDeleteModalOpen(false);
//       setSelectedItem(null);
      
//       await fetchFinancialItems(pagination.currentPage, pagination.pageSize);
      
//     } catch (err) {
//       console.error('Error deleting:', err);
//       toast.error(err.response?.data?.data?.message || 'خطا در حذف');
//     } finally {
//       setDeleteLoading(false);
//     }
//   };

//   // موفقیت در ایجاد/ویرایش
//   const handleSuccess = async () => {
//     await fetchFinancialItems(pagination.currentPage, pagination.pageSize);
//     setIsCreateModalOpen(false);
//     setIsEditModalOpen(false);
//     setSelectedItem(null);
//     setParentForNewItem(null);
//   };

//   if (loading && items.length === 0) {
//     return <LoadingSpinner text="در حال دریافت اطلاعات..." />;
//   }

//   return (
//     <div className="financial-tree-page">
//       <div className="page-header">
//         <h1>مدیریت صورت‌های مالی</h1>
//         <p>ساختار سلسله‌مراتبی صورت‌های مالی - فقط آیتم‌های ریشه می‌توانند زیرمجموعه داشته باشند</p>
//       </div>

//       <ToastContainer rtl={true} position="top-left" />

//       <div className="financial-actions">
//         <div className="actions-left">
//           <button 
//             className="btn btn-primary"
//             onClick={() => {
//               setParentForNewItem(null);
//               setIsCreateModalOpen(true);
//             }}
//           >
//             <FaPlus className="btn-icon" />
//             صورت مالی جدید (ریشه)
//           </button>

//           <button 
//             className="btn btn-secondary"
//             onClick={() => fetchFinancialItems(pagination.currentPage, pagination.pageSize)}
//           >
//             <FaRedo className="btn-icon" />
//             بروزرسانی
//           </button>
//         </div>

//         <div className="page-size-selector">
//           <label>تعداد در صفحه:</label>
//           <select 
//             value={pagination.pageSize}
//             onChange={(e) => setPagination(prev => ({ ...prev, pageSize: Number(e.target.value), currentPage: 1 }))}
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
//           <span>⚠️</span> {error}
//           <button onClick={() => fetchFinancialItems(pagination.currentPage, pagination.pageSize)}>تلاش مجدد</button>
//         </div>
//       )}

//       <div className="financial-table-container">
//         <table className="financial-table">
//           <thead>
//             <tr>
//               <th>عنوان</th>
//               <th>نوع تراکنش</th>
//               <th>عملیات</th>
//             </tr>
//           </thead>
//           <tbody>
//             {items.length === 0 ? (
//               <tr>
//                 <td colSpan="3" className="no-data">
//                   <div className="no-data-content">
//                     <span className="no-data-icon">📊</span>
//                     <p>هیچ صورت مالی یافت نشد</p>
//                     <button 
//                       className="btn btn-primary"
//                       onClick={() => setIsCreateModalOpen(true)}
//                     >
//                       ایجاد اولین صورت مالی
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ) : (
//               items.map(node => renderTreeNode(node, 0))
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
//           onPageChange={(page) => setPagination(prev => ({ ...prev, currentPage: page }))}
//         />
//       )}

//       {/* مودال ایجاد */}
//       <CreateFinancialModal
//         isOpen={isCreateModalOpen}
//         onClose={() => {
//           setIsCreateModalOpen(false);
//           setParentForNewItem(null);
//         }}
//         onSuccess={handleSuccess}
//         parentItem={parentForNewItem}
//       />

//       {/* مودال ویرایش */}
//       <CreateFinancialModal
//         isOpen={isEditModalOpen}
//         onClose={() => {
//           setIsEditModalOpen(false);
//           setSelectedItem(null);
//         }}
//         onSuccess={handleSuccess}
//         editItem={selectedItem}
//         isEditMode={true}
//       />

//       {/* مودال حذف */}
//       <ConfirmDeleteModal
//         isOpen={isDeleteModalOpen}
//         onClose={() => {
//           setIsDeleteModalOpen(false);
//           setSelectedItem(null);
//         }}
//         onConfirm={handleConfirmDelete}
//         projectName={selectedItem?.title}
//         loading={deleteLoading}
//       />

//       {/* مودال تخصیص به شرکت */}
//       {/* <CompanyAssignmentModal
//         isOpen={isCompanyModalOpen}
//         onClose={() => {
//           setIsCompanyModalOpen(false);
//           setSelectedItem(null);
//         }}
//         financialItem={selectedItem}
//       /> */}
//     </div>
//   );
// };

// export default FinancialTreeList;

import React, { useState, useEffect, useCallback } from 'react';
import { financialService } from '../../../services/financial';
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner';
import CreateFinancialModal from './CreateFinancialModal';
import ConfirmDeleteModal from '../project/ConfirmDeleteModal/ConfirmDeleteModal';
import Pagination from '../../common/Pagination/Pagination';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
  FaEdit, 
  FaTrash, 
  FaPlus, 
  FaRedo, 
  FaBuilding,
  FaChevronLeft,
  FaChevronDown,
  FaBan
} from 'react-icons/fa';
import './FinancialTreeList.css';

const FinancialTreeList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [parentForNewItem, setParentForNewItem] = useState(null);
  const [expandedNodes, setExpandedNodes] = useState(new Set());
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 0
  });

  // تابع برای پیدا کردن والد یک آیتم (جستجوی بازگشتی)
  const findParentItem = useCallback((nodes, childId, parent = null) => {
    for (const node of nodes) {
      if (node.id === childId) {
        return parent;
      }
      if (node.children && node.children.length > 0) {
        const found = findParentItem(node.children, childId, node);
        if (found) return found;
      }
    }
    return null;
  }, []);

  // تابع برای اضافه کردن اطلاعات والد به آیتم‌ها به صورت بازگشتی
  const enrichItemsWithParentInfo = useCallback((nodes, parentInfo = null) => {
    return nodes.map(node => {
      const enrichedNode = {
        ...node,
        parentTitle: parentInfo?.title || null,
        parentTransactionType: parentInfo?.financial_transactions || null
      };
      if (node.children && node.children.length > 0) {
        enrichedNode.children = enrichItemsWithParentInfo(node.children, node);
      }
      return enrichedNode;
    });
  }, []);

  // دریافت داده‌ها
  const fetchFinancialItems = useCallback(async (pageNumber = 1, pageSize = 10) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await financialService.getFinancialItems(pageNumber, pageSize);
      
      let treeData = response.items || [];
      // اضافه کردن اطلاعات والد به آیتم‌ها
      treeData = enrichItemsWithParentInfo(treeData);
      
      setItems(treeData);
      
      // باز کردن تمام گره‌های سطح اول به صورت پیش‌فرض
      const initialExpanded = new Set();
      const addFirstLevelIds = (nodes) => {
        nodes.forEach(node => {
          initialExpanded.add(node.id);
          if (node.children && node.children.length > 0) {
            addFirstLevelIds(node.children);
          }
        });
      };
      if (treeData.length > 0) {
        addFirstLevelIds(treeData);
      }
      setExpandedNodes(initialExpanded);
      
      setPagination({
        currentPage: pageNumber,
        pageSize: pageSize,
        totalCount: response.totalCount || 0,
        totalPages: response.totalPages || 0
      });
      
    } catch (err) {
      console.error('Error fetching financial items:', err);
      setError('خطا در دریافت اطلاعات صورت‌های مالی');
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [enrichItemsWithParentInfo]);

  useEffect(() => {
    fetchFinancialItems(pagination.currentPage, pagination.pageSize);
  }, [fetchFinancialItems, pagination.currentPage, pagination.pageSize]);

  // باز/بسته کردن گره
  const toggleNode = (nodeId) => {
    setExpandedNodes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  };

  // بررسی وجود فرزند
  const hasChildren = (node) => {
    return node.children && Array.isArray(node.children) && node.children.length > 0;
  };

  // بررسی آیا آیتم می‌تواند فرزند داشته باشد (فقط آیتم‌های ریشه می‌توانند فرزند داشته باشند)
  const canHaveChildren = (node) => {
    return node.parentId === null || node.parentId === undefined;
  };

  // رندر بازگشتی گره‌ها
  const renderTreeNode = (node, level = 0) => {
    const hasChildrenNodes = hasChildren(node);
    const isExpanded = expandedNodes.has(node.id);
    const paddingRight = level * 30;
    const canAddChild = canHaveChildren(node);
    const isChild = node.parentId !== null && node.parentId !== undefined;

    return (
      <React.Fragment key={node.id}>
        <tr className="tree-row">
          <td className="tree-cell-title">
            <div className="tree-title-container" style={{ paddingRight: `${paddingRight}px` }}>
              {hasChildrenNodes && (
                <button 
                  className="tree-toggle-btn"
                  onClick={() => toggleNode(node.id)}
                >
                  {isExpanded ? <FaChevronDown /> : <FaChevronLeft />}
                </button>
              )}
              {!hasChildrenNodes && <span className="tree-placeholder" />}
              <span className="tree-title">
                {node.title}
                {isChild && (
                  <span className="child-badge">(زیرمجموعه)</span>
                )}
              </span>
            </div>
          </td>
          <td className="tree-cell-transaction">
            <span className={`transaction-badge ${node.financial_transactions === 1 ?  'transaction-in' :'transaction-out' }`}>
              {node.financial_transactions === 1 ? 'ورودی':'خروجی' }
            </span>
          </td>
          <td className="tree-cell-actions">
            <div className="action-buttons">
              <button 
                className={`btn-action btn-add-child ${!canAddChild ? 'disabled' : ''}`}
                title={!canAddChild ? "زیرمجموعه‌ها نمی‌توانند فرزند داشته باشند" : "افزودن زیرمجموعه"}
                onClick={() => {
                  if (canAddChild) {
                    setParentForNewItem(node);
                    setIsCreateModalOpen(true);
                  } else {
                    toast.warning('آیتم‌های زیرمجموعه نمی‌توانند فرزند داشته باشند');
                  }
                }}
                disabled={!canAddChild}
              >
                {canAddChild ? <FaPlus /> : <FaBan />}
              </button>
              {/* <button 
                className="btn-action btn-company"
                title="تخصیص به شرکت"
                onClick={() => {
                  setSelectedItem(node);
                  setIsCompanyModalOpen(true);
                }}
              >
                <FaBuilding />
              </button> */}
              <button 
                className="btn-action btn-edit"
                title="ویرایش"
                onClick={() => {
                  setSelectedItem(node);
                  setIsEditModalOpen(true);
                }}
              >
                <FaEdit />
              </button>
              <button 
                className="btn-action btn-delete"
                title="حذف"
                onClick={() => {
                  setSelectedItem(node);
                  setIsDeleteModalOpen(true);
                }}
              >
                <FaTrash />
              </button>
            </div>
          </td>
        </tr>
        {hasChildrenNodes && isExpanded && (
          node.children.map(child => renderTreeNode(child, level + 1))
        )}
      </React.Fragment>
    );
  };

  // حذف آیتم
  const handleConfirmDelete = async () => {
    if (!selectedItem) return;

    try {
      setDeleteLoading(true);
      await financialService.deleteFinancialItem(selectedItem.id);
      
      toast.success('صورت مالی با موفقیت حذف شد');
      setIsDeleteModalOpen(false);
      setSelectedItem(null);
      
      await fetchFinancialItems(pagination.currentPage, pagination.pageSize);
      
    } catch (err) {
      console.error('Error deleting:', err);
      toast.error(err.response?.data?.data?.message || 'خطا در حذف');
    } finally {
      setDeleteLoading(false);
    }
  };

  // موفقیت در ایجاد/ویرایش
  const handleSuccess = async () => {
    await fetchFinancialItems(pagination.currentPage, pagination.pageSize);
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedItem(null);
    setParentForNewItem(null);
  };

  // آماده‌سازی اطلاعات ویرایش با اطلاعات والد
  const getEditItemWithParent = () => {
    if (!selectedItem) return null;
    
    const parentItem = findParentItem(items, selectedItem.id);
    
    return {
      ...selectedItem,
      parentTitle: parentItem?.title || null,
      parentTransactionType: parentItem?.financial_transactions || null,
      parentId: parentItem?.id || null
    };
  };

  // آماده‌سازی والد برای آیتم جدید
  const getParentForNewItem = () => {
    if (!parentForNewItem) return null;
    return parentForNewItem;
  };

  if (loading && items.length === 0) {
    return <LoadingSpinner text="در حال دریافت اطلاعات..." />;
  }

  return (
    <div className="financial-tree-page">
      <div className="page-header">
        <h1>مدیریت صورت‌های مالی</h1>
        <p>ساختار سلسله‌مراتبی صورت‌های مالی - فقط آیتم‌های ریشه می‌توانند زیرمجموعه داشته باشند</p>
      </div>

      <ToastContainer rtl={true} position="top-left" />

      <div className="financial-actions">
        <div className="actions-left">
          <button 
            className="btn btn-primary"
            onClick={() => {
              setParentForNewItem(null);
              setIsCreateModalOpen(true);
            }}
          >
            <FaPlus className="btn-icon" />
            صورت مالی جدید (ریشه)
          </button>

          <button 
            className="btn btn-secondary"
            onClick={() => fetchFinancialItems(pagination.currentPage, pagination.pageSize)}
          >
            <FaRedo className="btn-icon" />
            بروزرسانی
          </button>
        </div>

        <div className="page-size-selector">
          <label>تعداد در صفحه:</label>
          <select 
            value={pagination.pageSize}
            onChange={(e) => setPagination(prev => ({ ...prev, pageSize: Number(e.target.value), currentPage: 1 }))}
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
          <span>⚠️</span> {error}
          <button onClick={() => fetchFinancialItems(pagination.currentPage, pagination.pageSize)}>تلاش مجدد</button>
        </div>
      )}

      <div className="financial-table-container">
        <table className="financial-table">
          <thead>
            <tr>
              <th>عنوان</th>
              <th>نوع تراکنش</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan="3" className="no-data">
                  <div className="no-data-content">
                    <span className="no-data-icon">📊</span>
                    <p>هیچ صورت مالی یافت نشد</p>
                    <button 
                      className="btn btn-primary"
                      onClick={() => setIsCreateModalOpen(true)}
                    >
                      ایجاد اولین صورت مالی
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              items.map(node => renderTreeNode(node, 0))
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
          onPageChange={(page) => setPagination(prev => ({ ...prev, currentPage: page }))}
        />
      )}

      {/* مودال ایجاد */}
      <CreateFinancialModal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setParentForNewItem(null);
        }}
        onSuccess={handleSuccess}
        parentItem={getParentForNewItem()}
      />

      {/* مودال ویرایش */}
      <CreateFinancialModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedItem(null);
        }}
        onSuccess={handleSuccess}
        editItem={getEditItemWithParent()}
        isEditMode={true}
      />

      {/* مودال حذف */}
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedItem(null);
        }}
        onConfirm={handleConfirmDelete}
        projectName={selectedItem?.title}
        loading={deleteLoading}
      />

      {/* مودال تخصیص به شرکت */}
      {/* <CompanyAssignmentModal
        isOpen={isCompanyModalOpen}
        onClose={() => {
          setIsCompanyModalOpen(false);
          setSelectedItem(null);
        }}
        financialItem={selectedItem}
      /> */}
    </div>
  );
};

export default FinancialTreeList;