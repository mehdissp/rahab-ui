import React, { useState, useEffect, useCallback } from 'react';
import { bankService } from '../../../services/bank';
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner';
import CreateBankModal from './CreateBankModal';
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
  FaPhone,
  FaMapMarkerAlt,
  FaAlignLeft
} from 'react-icons/fa';
import './Bank.css';

const Bank = () => {
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [bankToDelete, setBankToDelete] = useState(null);
  const [bankToEdit, setBankToEdit] = useState(null);
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
      console.log(response)
      console.log("*********************************************")
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
  }, [pagination.currentPage, pagination.pageSize]);

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
      
      toast.success('بانک با موفقیت حذف شد');
      setIsDeleteModalOpen(false);
      setBankToDelete(null);
      fetchBanks(pagination.currentPage, pagination.pageSize);
      
    } catch (err) {
      console.error('Error deleting bank:', err);
      toast.error('خطا در حذف بانک');
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

  //成功后刷新
  const handleBankSuccess = () => {
    fetchBanks(pagination.currentPage, pagination.pageSize);
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
      
      <ToastContainer position="top-left" rtl={true} />

      <div className="bank-actions">
        <div className="actions-left">
          <button 
            className="btn btn-primary"
            onClick={() => setIsCreateModalOpen(true)}
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
    </div>
  );
};

export default Bank;