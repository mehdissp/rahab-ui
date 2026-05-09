
// components/FinancialOperations/FinancialOperations/FinancialOperations.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { projectService } from '../../../services/project';
import { bankService } from '../../../services/bank';
import { financialOperationsService } from '../../../services/financialOperationsService';
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner';
import CreateEditFinancialModal from './CreateEditFinancialModal';
import ConfirmDeleteModal from '../project/ConfirmDeleteModal/ConfirmDeleteModal';
import Pagination from '../../common/Pagination/Pagination';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
  FaEdit, 
  FaTrash, 
  FaPlus,
  FaRedo,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaUser,
  FaSearch,
  FaFilter,
  FaTimes
} from 'react-icons/fa';
import './FinancialOperations.css';

const FinancialOperations = () => {
  const [operations, setOperations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [operationToDelete, setOperationToDelete] = useState(null);
  const [operationToEdit, setOperationToEdit] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  
  const [filters, setFilters] = useState({
    projectId: '',
    bankId: '',
    financialId: '',
    paymentStatus: '',
    operationCompleted: '',
    searchTerm: ''
  });
  
  const [projects, setProjects] = useState([]);
  const [banks, setBanks] = useState([]);
  const [financials, setFinancials] = useState([]);
  
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 0
  });

  const fetchOperations = useCallback(async (pageNumber = 1, pageSize = 10) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await financialOperationsService.getFinancialOperations(
        pageNumber, 
        pageSize,
        filters
      );
      
      setOperations(Array.isArray(response.items) ? response.items : []);
      setPagination({
        currentPage: pageNumber,
        pageSize: pageSize,
        totalCount: response.totalCount || 0,
        totalPages: response.totalPages || 0
      });
      
    } catch (err) {
      console.error('Error fetching financial operations:', err);
      setError('خطا در دریافت اطلاعات عملیات مالی');
      setOperations([]);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const fetchDropdownData = useCallback(async () => {
    try {
      const [projectsRes, banksRes] = await Promise.all([
        projectService.getProjects(1, 100),
        bankService.getBanks(1, 100)
      ]);
      
      setProjects(projectsRes.items || []);
      setBanks(banksRes.items || []);
      
      // financials از خود API میاد، نیازی به fetch جداگانه نیست
      const uniqueFinancials = [...new Map(operations.map(op => [op.financialId, { 
        id: op.financialId, 
        title: op.financialName 
      }])).values()];
      setFinancials(uniqueFinancials);
      
    } catch (err) {
      console.error('Error fetching dropdown data:', err);
    }
  }, [operations]);

  useEffect(() => {
    fetchOperations(pagination.currentPage, pagination.pageSize);
  }, [fetchOperations, pagination.currentPage, pagination.pageSize]);

  useEffect(() => {
    if (operations.length > 0) {
      fetchDropdownData();
    }
  }, [operations, fetchDropdownData]);

  const handleApplyFilters = () => {
    setPagination(prev => ({ ...prev, currentPage: 1 }));
    setTimeout(() => {
      fetchOperations(1, pagination.pageSize);
    }, 0);
  };

  const handleResetFilters = () => {
    setFilters({
      projectId: '',
      bankId: '',
      financialId: '',
      paymentStatus: '',
      operationCompleted: '',
      searchTerm: ''
    });
    setPagination(prev => ({ ...prev, currentPage: 1 }));
    setTimeout(() => {
      fetchOperations(1, pagination.pageSize);
    }, 0);
  };

  const handleDeleteClick = (operation) => {
    setOperationToDelete(operation);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!operationToDelete) return;

    try {
      setDeleteLoading(true);
      await financialOperationsService.deleteFinancialOperation(operationToDelete.id);
      
      toast.success('عملیات مالی با موفقیت حذف شد');
      
      setIsDeleteModalOpen(false);
      setOperationToDelete(null);
      
      const remainingItems = operations.length - 1;
      const newPageNumber = (remainingItems === 0 && pagination.currentPage > 1) 
        ? pagination.currentPage - 1 
        : pagination.currentPage;
      
      await fetchOperations(newPageNumber, pagination.pageSize);
      
    } catch (err) {
      console.error('Error deleting operation:', err);
      toast.error(err.response?.data?.data?.message || 'خطا در حذف عملیات مالی');
      setIsDeleteModalOpen(false);
      setOperationToDelete(null);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setOperationToDelete(null);
  };

  const handleEditClick = (operation) => {
    setOperationToEdit(operation);
    setIsEditModalOpen(true);
  };

  const handleOperationSuccess = async () => {
    await fetchOperations(pagination.currentPage, pagination.pageSize);
  };

  const handleRetry = () => {
    fetchOperations(pagination.currentPage, pagination.pageSize);
  };

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

  // دریافت عنوان وضعیت پرداخت از دیتا
  const getPaymentStatusDisplay = (operation) => {
    if (operation.paymentStatusTitle) {
      let statusClass = 'status-pending';
      if (operation.paymentStatusTitle === 'نقد') statusClass = 'status-paid';
      else if (operation.paymentStatusTitle === 'چک') statusClass = 'status-cheque';
      else if (operation.paymentStatusTitle === 'کارتخوان') statusClass = 'status-card';
      else if (operation.paymentStatusTitle === 'لغو شده') statusClass = 'status-cancelled';
      
      return { text: operation.paymentStatusTitle, class: statusClass };
    }
    
    // Fallback به عدد
    switch(operation.paymentStatus) {
      case 0: return { text: 'در انتظار', class: 'status-pending' };
      case 1: return { text: 'نقد', class: 'status-paid' };
      case 2: return { text: 'چک', class: 'status-cheque' };
      case 3: return { text: 'کارتخوان', class: 'status-card' };
      default: return { text: 'نامشخص', class: 'status-unknown' };
    }
  };

  // دریافت عنوان وضعیت عملیات از دیتا
  const getOperationStatusDisplay = (operation) => {
    if (operation.operationCompletedTitle) {
      return { 
        text: operation.operationCompletedTitle === 'بلی' ? ' بلی' : 'خیر  ', 
        class: operation.operationCompletedTitle === 'بلی' ? 'status-completed' : 'status-in-progress' 
      };
    }
    
    switch(operation.operationCompleted) {
      case 0: return { text: 'در حال انجام', class: 'status-in-progress' };
      case 1: return { text: 'تکمیل شده', class: 'status-completed' };
      default: return { text: 'نامشخص', class: 'status-unknown' };
    }
  };

  const start = ((pagination.currentPage - 1) * pagination.pageSize) + 1;
  const end = Math.min(start + pagination.pageSize - 1, pagination.totalCount);

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('fa-IR').format(amount);
  };

  if (loading && operations.length === 0) {
    return <LoadingSpinner text="در حال دریافت اطلاعات عملیات مالی..." />;
  }

  return (
    <div className="financial-operations-page">
      <div className="page-header">
        <h1>مدیریت عملیات مالی</h1>
        <p>لیست تمام عملیات‌های مالی سیستم</p>
      </div>
      
      <ToastContainer position="top-left" rtl={true} />

      <div className="operations-actions">
        <div className="actions-left">
          <button className="btn btn-primary" onClick={() => setIsCreateModalOpen(true)} disabled={loading}>
            <FaPlus className="btn-icon" />
            عملیات مالی جدید
          </button>

          <button className="btn btn-secondary" onClick={() => setShowFilters(!showFilters)}>
            <FaFilter className="btn-icon" />
            فیلترها
          </button>

          <button className="btn btn-secondary" onClick={handleRetry} disabled={loading}>
            <FaRedo className="btn-icon" />
            {loading ? 'در حال بروزرسانی...' : 'بروزرسانی'}
          </button>
        </div>

        <div className="page-size-selector">
          <label>تعداد در صفحه:</label>
          <select value={pagination.pageSize} onChange={(e) => handlePageSizeChange(Number(e.target.value))} disabled={loading}>
            <option value="5">۵</option>
            <option value="10">۱۰</option>
            <option value="20">۲۰</option>
            <option value="50">۵۰</option>
          </select>
        </div>
      </div>

      {showFilters && (
        <div className="filters-panel">
          <div className="filters-header">
            <h3>فیلترهای جستجو</h3>
            <button className="btn-close-filters" onClick={() => setShowFilters(false)}>
              <FaTimes />
            </button>
          </div>
          <div className="filters-grid">
            <div className="filter-group">
              <label>پروژه:</label>
              <select value={filters.projectId} onChange={(e) => setFilters({...filters, projectId: e.target.value})}>
                <option value="">همه پروژه‌ها</option>
                {projects.map(project => (
                  <option key={project.id} value={project.id}>{project.name}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>بانک:</label>
              <select value={filters.bankId} onChange={(e) => setFilters({...filters, bankId: e.target.value})}>
                <option value="">همه بانک‌ها</option>
                {banks.map(bank => (
                  <option key={bank.id} value={bank.id}>{bank.name}</option>
                ))}
              </select>
            </div>

            {/* <div className="filter-group">
              <label>وضعیت پرداخت:</label>
              <select value={filters.paymentStatus} onChange={(e) => setFilters({...filters, paymentStatus: e.target.value})}>
                <option value="">همه</option>
                <option value="نقد">نقد</option>
                <option value="چک">چک</option>
                <option value="کارتخوان">کارتخوان</option>
                <option value="در انتظار">در انتظار</option>
              </select>
            </div>

            <div className="filter-group">
              <label>وضعیت عملیات:</label>
              <select value={filters.operationCompleted} onChange={(e) => setFilters({...filters, operationCompleted: e.target.value})}>
                <option value="">همه</option>
                <option value="بلی">تکمیل شده</option>
                <option value="خیر">در حال انجام</option>
              </select>
            </div> */}

            <div className="filter-group full-width">
              <label>جستجو:</label>
              <div className="search-input-wrapper">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="جستجو در شماره سفارش، طرف حساب..."
                  value={filters.searchTerm}
                  onChange={(e) => setFilters({...filters, searchTerm: e.target.value})}
                  onKeyPress={(e) => e.key === 'Enter' && handleApplyFilters()}
                />
              </div>
            </div>
          </div>
          <div className="filters-actions">
            <button className="btn btn-primary" onClick={handleApplyFilters}>اعمال فیلترها</button>
            <button className="btn btn-secondary" onClick={handleResetFilters}>ریست فیلترها</button>
          </div>
        </div>
      )}

      {error && (
        <div className="error-banner">
          <span className="error-icon">⚠️</span>
          {error}
          <button onClick={handleRetry} className="btn-retry">تلاش مجدد</button>
        </div>
      )}

      <div className="operations-info">
        <div className="total-info">
          نمایش {start} تا {end} از {pagination.totalCount.toLocaleString()} عملیات مالی
        </div>
      </div>

      <div className="operations-table-container">
        <table className="operations-table">
          <thead>
            <tr>
              <th>#</th>
              <th>شماره سفارش</th>
              <th>طرف حساب</th>
              <th>پروژه</th>
              <th>حساب مالی</th>
              <th>بانک</th>
              <th>مبلغ</th>
              <th>تاریخ صدور</th>
              <th>تاریخ سررسید</th>
              <th>وضعیت پرداخت</th>
              {/* <th>وضعیت عملیات</th> */}
              <th>کاربر</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {operations.length === 0 ? (
              <tr>
                <td colSpan="13" className="no-data">
                  <div className="no-data-content">
                    <span className="no-data-icon">💰</span>
                    <p>هیچ عملیات مالی یافت نشد</p>
                    <button className="btn btn-primary" onClick={() => setIsCreateModalOpen(true)}>
                      ایجاد اولین عملیات مالی
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              operations.map((operation, index) => {
                const paymentStatus = getPaymentStatusDisplay(operation);
                const operationStatus = getOperationStatusDisplay(operation);
                const isDeleted = operation.isDeleted === true;
                
                return (
                  <tr 
                    key={operation.id} 
                    className={`operation-row ${isDeleted ? 'deleted-row' : ''}`}
                  >
                    <td className="index-cell">
                      {((pagination.currentPage - 1) * pagination.pageSize) + index + 1}
                    </td>
                    <td className="payment-order-cell">
                      <div className="payment-order-content">
                        <FaMoneyBillWave className="money-icon" />
                        <span className="payment-order-number">{operation.paymentOrderNumber}</span>
                      </div>
                    </td>
                    <td>{operation.accountSideName || '---'}</td>
                    <td>{operation.projectName || '---'}</td>
                    <td>{operation.financialName || '---'}</td>
                    <td>{operation.bankName || '---'}</td>
                    <td className="amount-cell">{formatAmount(operation.amount)} ریال</td>
                    <td>
                      <div className="date-cell">
                        <FaCalendarAlt className="date-icon" />
                        {operation.dateOfIssue_Persian}
                      </div>
                    </td>
                    <td>
                      <div className="date-cell">
                        <FaCalendarAlt className="date-icon" />
                        {operation.dueDate_Persian || '---'}
                      </div>
                    </td>
                    <td>
                      <span className={`status-badge ${paymentStatus.class}`}>
                        {paymentStatus.text}
                      </span>
                    </td>
                    {/* <td>
                      <span className={`status-badge ${operationStatus.class}`}>
                        {operationStatus.text}
                      </span>
                    </td> */}
                    <td>
                      <div className="user-cell">
                        <FaUser className="user-icon" />
                        {operation.userName || '---'}
                      </div>
                    </td>
                    <td className="actions-cell">
                      <div className="action-buttons">
                        <button 
                          className="btn-action btn-edit" 
                          title="ویرایش" 
                          onClick={() => handleEditClick(operation)}
                          disabled={isDeleted}
                        >
                          <FaEdit />
                        </button>
                        <button 
                          className="btn-action btn-delete" 
                          title="حذف" 
                          onClick={() => handleDeleteClick(operation)}
                          disabled={isDeleted}
                        >
                          <FaTrash />
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
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          totalItems={pagination.totalCount}
          pageSize={pagination.pageSize}
          onPageChange={handlePageChange}
        />
      )}

      <CreateEditFinancialModal
        isOpen={isCreateModalOpen || isEditModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setIsEditModalOpen(false);
          setOperationToEdit(null);
        }}
        onSuccess={handleOperationSuccess}
        operationToEdit={operationToEdit}
        isEditMode={isEditModalOpen}
        projects={projects}
        banks={banks}
        financials={financials}
      />

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        projectName={`عملیات مالی شماره ${operationToDelete?.paymentOrderNumber}`}
        loading={deleteLoading}
      />
    </div>
  );
};

export default FinancialOperations;