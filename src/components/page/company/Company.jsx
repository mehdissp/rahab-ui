import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { companyService } from '../../../services/company';
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner';
import CreateCompanyModal from './CreateCompanyModal';
import ConfirmDeleteModal from './ConfirmDeleteModal/ConfirmDeleteModal';
import EditCompanyModal from './EditCompanyModal';
import Pagination from '../../common/Pagination/Pagination';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { 
  FaEye, 
  FaEdit, 
  FaTrash, 
  FaBuilding,
  FaSync,
  FaPlus,
  FaRedo,
  FaCheckCircle
} from 'react-icons/fa';
import './Company.css';

const Company = () => {
  const { user } = useAuth();
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [companyToDelete, setCompanyToDelete] = useState(null);
  const [companyToEdit, setCompanyToEdit] = useState(null);

  // حالت‌های پیجینیشن
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 0
  });

  const [access, setAccess] = useState({
    checkAccess: true,
    checkAccessAssigner: true,
    checkAccessDelete: true,
  });

  // دریافت شرکت‌ها از API
  const fetchCompanies = useCallback(async (pageNumber = 1, pageSize = 10) => {
    try {
      setLoading(true);
      setError(null);
      console.log(`🔄 Fetching companies page ${pageNumber}...`);
      
      const response = await companyService.getCompanies(pageNumber, pageSize);
      
      console.log(response.items);
      
      setCompanies(response.items || []);
      setAccess({
        checkAccess: response.checkAccess || true,
        checkAccessAssigner: response.checkAccessAssigner || false,
        checkAccessDelete: response.checkAccessDelete || true
      });
      
      setPagination(prev => ({
        ...prev,
        currentPage: pageNumber,
        totalCount: response.totalCount || 0,
        totalPages: response.totalPages || 0
      }));
      
      console.log('✅ Companies fetched successfully:', {
        count: response.items?.length,
        total: response.totalCount,
        pages: response.totalPages
      });
    } catch (err) {
      console.error('❌ Error fetching companies:', err);
      
      if (err.message?.includes('Rate limit')) {
        setError(`خطای محدودیت درخواست: ${err.message}`);
      } else if (err.response?.status === 429) {
        setError('تعداد درخواست‌های شما زیاد است. لطفا چند دقیقه صبر کنید.');
      } else {
        setError('خطا در دریافت اطلاعات شرکت‌ها');
        const sampleData = getSampleCompanies();
        setCompanies(sampleData);
        setPagination(prev => ({
          ...prev,
          totalCount: sampleData.length,
          totalPages: Math.ceil(sampleData.length / pagination.pageSize)
        }));
      }
    } finally {
      setLoading(false);
    }
  }, [pagination.pageSize]);

  useEffect(() => {
    fetchCompanies(pagination.currentPage, pagination.pageSize);
  }, [fetchCompanies, pagination.currentPage, pagination.pageSize]);

  // حذف شرکت
  const handleDeleteClick = (company) => {
    setCompanyToDelete(company);
    setIsDeleteModalOpen(true);
  };

  // ویرایش شرکت
  const handleEditClick = (company) => {
    setCompanyToEdit(company);
    setIsEditModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!companyToDelete) return;

    try {
      setDeleteLoading(true);
      console.log('🗑️ Deleting company:', companyToDelete.name);
      
      await companyService.deleteCompany(companyToDelete.id);
      
      toast.success('شرکت با موفقیت حذف شد', {
        position: "top-left",
        autoClose: 5000,
      });
      
      setIsDeleteModalOpen(false);
      setCompanyToDelete(null);
      
      setTimeout(() => {
        fetchCompanies(pagination.currentPage, pagination.pageSize);
      }, 500);
      
    } catch (err) {
      console.error('❌ Error deleting company:', err);
      toast.error(err.response?.data?.message || 'خطا در حذف شرکت', {
        position: "top-left",
        autoClose: 5000,
      });
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setCompanyToDelete(null);
  };

  // تغییر صفحه
  const handlePageChange = (pageNumber) => {
    setPagination(prev => ({ ...prev, currentPage: pageNumber }));
  };

  // تغییر سایز صفحه
  const handlePageSizeChange = (newPageSize) => {
    setPagination(prev => ({
      ...prev,
      pageSize: newPageSize,
      currentPage: 1
    }));
  };

  // وقتی شرکت جدید ایجاد شد
  const handleCompanyCreated = useCallback(() => {
    console.log('🔄 Refreshing companies list after creation');
    setPagination(prev => ({ ...prev, currentPage: 1 }));
    setTimeout(() => {
      fetchCompanies(1, pagination.pageSize);
    }, 500);
  }, [fetchCompanies, pagination.pageSize]);

  // وقتی شرکت ویرایش شد
  const handleCompanyUpdated = useCallback(() => {
    console.log('🔄 Refreshing companies list after update');
    setTimeout(() => {
      fetchCompanies(pagination.currentPage, pagination.pageSize);
    }, 500);
  }, [fetchCompanies, pagination.currentPage, pagination.pageSize]);

  // مدیریت خطا
  const handleRetry = useCallback(() => {
    setError(null);
    fetchCompanies(pagination.currentPage, pagination.pageSize);
  }, [fetchCompanies, pagination.currentPage, pagination.pageSize]);

  // فرمت کردن تاریخ
  const formatDate = (dateString) => {
    if (!dateString) return '---';
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString('fa-IR', options);
  };

  // محاسبه رکوردهای نمایش داده شده
  const getDisplayRange = () => {
    const start = ((pagination.currentPage - 1) * pagination.pageSize) + 1;
    const end = Math.min(start + pagination.pageSize - 1, pagination.totalCount);
    return { start, end };
  };

  const { start, end } = getDisplayRange();

  if (loading && companies.length === 0) {
    return <LoadingSpinner text="در حال دریافت اطلاعات شرکت‌ها..." />;
  }

  return (
    <div className="company-page">
      <div className="page-header">
        <h1>مدیریت شرکت‌ها</h1>
        <p>لیست تمام شرکت‌های فعال در سیستم</p>
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

      <div className="company-actions">
        <div className="actions-left">
          {access.checkAccess && (
            <button 
              className="btn btn-primary"
              onClick={() => setIsCreateModalOpen(true)}
              disabled={loading}
            >
              <FaPlus className="btn-icon" />
              شرکت جدید
            </button>
          )}

          <button 
            className="btn btn-secondary"
            onClick={() => fetchCompanies(pagination.currentPage, pagination.pageSize)}
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
          <button onClick={handleRetry} className="btn-retry">
            تلاش مجدد
          </button>
        </div>
      )}

      <div className="company-info">
        <div className="total-info">
          نمایش {start} تا {end} از {pagination.totalCount.toLocaleString()} شرکت
        </div>
      </div>

      <div className="company-table-container">
        <table className="company-table">
          <thead>
            <tr>
              <th>#</th>
              <th>نام شرکت</th>
              <th>توضیحات</th>
              <th>تاریخ ایجاد</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {companies.length === 0 ? (
              <tr>
                <td colSpan="5" className="no-data">
                  <div className="no-data-content">
                    <span className="no-data-icon">🏢</span>
                    <p>هیچ شرکتی یافت نشد</p>
                    {access && access.checkAccess && (
                      <button 
                        className="btn btn-primary"
                        onClick={() => setIsCreateModalOpen(true)}
                      >
                        ایجاد اولین شرکت
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              companies.map((company, index) => (
                <tr key={company.id || index} className="company-row">
                  <td className="index-cell">
                    {((pagination.currentPage - 1) * pagination.pageSize) + index + 1}
                  </td>
                  <td className="company-name">
                    <div className="company-name-content">
                      <span className="company-icon">🏢</span>
                      <div>
                        <div className="company-title">{company.name}</div>
                        <div className="company-code">کد: {company.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="company-description">
                    {company.descriptionRows || 'بدون توضیحات'}
                  </td>
                  <td className="date-cell">
                    <div className="date-content">
                      <span className="date-icon">📅</span>
                      {company.createdAtPersianRelative ? formatDate(company.createdAt) : '---'}
                    </div>
                  </td>
                  <td className="actions-cell">
                    <div className="action-buttons">
                      <button 
                        className="btn-action btn-edit"
                        title="ویرایش"
                        onClick={() => handleEditClick(company)}
                        disabled={loading}
                      >
                        <FaEdit />
                      </button>

                      {access.checkAccessDelete && (
                        <button 
                          className="btn-action btn-delete"
                          title="حذف"
                          onClick={() => handleDeleteClick(company)}
                          disabled={loading}
                        >
                          <FaTrash />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* پیجینیشن */}
      {pagination.totalPages > 1 && (
        <div className="pagination-container">
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            totalItems={pagination.totalCount}
            pageSize={pagination.pageSize}
            onPageChange={handlePageChange}
            disabled={loading}
          />
        </div>
      )}

      {/* آمار */}
      <div className="company-stats">
        <div className="stat-card">
          <div className="stat-icon total">🏢</div>
          <div className="stat-content">
            <div className="stat-value">{pagination.totalCount}</div>
            <div className="stat-label">کل شرکت‌ها</div>
          </div>
        </div>
      </div>

      {/* مدال‌ها */}
      <CreateCompanyModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCompanyCreated={handleCompanyCreated}
      />

      <EditCompanyModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setCompanyToEdit(null);
        }}
        onCompanyUpdated={handleCompanyUpdated}
        company={companyToEdit}
      />

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        companyName={companyToDelete?.name}
        loading={deleteLoading}
      />
    </div>
  );
};

// داده‌های نمونه
const getSampleCompanies = () => [
  {
    id: 1,
    name: "شرکت نمونه",
    descriptionRows: "شرکت نمونه برای نمایش",
    createdAt: "2025-10-16T06:27:17.6312536"
  }
];

export default Company;