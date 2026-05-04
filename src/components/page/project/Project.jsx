
import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { projectService } from '../../../services/project';
import { userService } from '../../../services/user'; // اضافه کردن سرویس کاربران
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner';
import CreateProjectModal from './CreateProjectModal';
import ConfirmDeleteModal from './ConfirmDeleteModal/ConfirmDeleteModal';
import UserSelectionModal from './UserSelectionModal/UserSelectionModal'
import TagSelectionModal from './TagSelectionModal/TagSelectionModal'
import Pagination from '../../common/Pagination/Pagination';
import { useNavigate } from 'react-router-dom'; // اضافه کردن useNavigate

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { 
  FaEye, 
  FaEdit, 
  FaTrash, 
  FaFolder,
  FaCalendar,
  FaSync,
  FaChartBar,
  FaRocket,
  FaCheckCircle,
  FaPlus,
  FaRedo,FaUsers ,FaTags,FaArchive
} from 'react-icons/fa';
import { 
  HiOutlineExclamationCircle 
} from 'react-icons/hi';
import './Project.css';

const Project = () => {
  const { user } = useAuth();
    const navigate = useNavigate(); // استفاده از useNavigate
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);


    // stateهای جدید برای مدیریت کاربران
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState(new Set());
  const [usersLoading, setUsersLoading] = useState(false);
  const [usersError, setUsersError] = useState(null);
  

// در کامپوننت Project، stateهای جدید اضافه کنید:
const [isTagModalOpen, setIsTagModalOpen] = useState(false);
const [tags, setTags] = useState([]);
const [selectedTags, setSelectedTags] = useState(new Set());
const [tagsLoading, setTagsLoading] = useState(false);
const [tagsError, setTagsError] = useState(null);

  // حالت‌های پیجینیشن
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 0
  });
  const [access, setAccess] = useState({
    checkAccess:false,
    checkAccessAssigner:false,
    checkAccessDelete:false,
  });

  // دریافت پروژه‌ها از API
  const fetchProjects = useCallback(async (pageNumber = 1, pageSize = 10) => {
    try {
      setLoading(true);
      setError(null);
      console.log(`🔄 Fetching projects page ${pageNumber}...`);
      
      const response = await projectService.getProjects(pageNumber, pageSize);
      
      console.log(response.items)
      // استفاده از ساختار جدید API
      setProjects(response.items || []);
      setAccess(s=>({
  
        checkAccess:response.checkAccess,
checkAccessAssigner:response.checkAccessAssigner,
checkAccessDelete:response.checkAccessDelete

      }))
console.log("دسترسی ها",access)
console.log("دسترسی ها",access.checkAccess)
      setPagination(prev => ({
        ...prev,
        currentPage: pageNumber,
        totalCount: response.totalCount || 0,
        totalPages: response.totalPages || 0
      }));
      
      console.log('✅ Projects fetched successfully:', {
        count: response.items?.length,
        total: response.totalCount,
        pages: response.totalPages
      });
    } catch (err) {
      console.error('❌ Error fetching projects:', err);
      
      if (err.message?.includes('Rate limit')) {
        setError(`خطای محدودیت درخواست: ${err.message}`);
      } else if (err.response?.status === 429) {
        setError('تعداد درخواست‌های شما زیاد است. لطفا چند دقیقه صبر کنید.');
      } else {
        setError('خطا در دریافت اطلاعات پروژه‌ها');
        // داده‌های نمونه برای نمایش
        const sampleData = getSampleProjects();
        setProjects(sampleData);
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


  //***********انتخاب کاربر */
// تابع برای باز کردن modal تگ‌ها
const handleTagsClick = async (project) => {
  try {
        console.log('🏷️ Fetching tags for project:', project.id);
            console.log('🏷️ Fetching tags for project:', project.name);
    setSelectedProject(project);
    setTagsLoading(true);
    setTagsError(null);
            console.log('🏷️ Fetching tags for project:', project.id);
    
    console.log('🏷️ Fetching tags for project:', project.name);
    
    // دریافت لیست تگ‌ها - باید سرویس مربوطه را اضافه کنید
    const tagsResponse = await projectService.getTagsForProject(1,10,project.id);
    console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$',tagsResponse.items )
    setTags(tagsResponse.items);
    
    // ایجاد Set از تگ‌های انتخاب شده
    const initiallySelected = new Set();
    (tagsResponse.items || []).forEach(tag => {
      if (tag.isSelected) {
        initiallySelected.add(tag.id);
      }
    });
    setSelectedTags(initiallySelected);
    
    setIsTagModalOpen(true);
    
  } catch (err) {
    console.error('❌ Error fetching tags:', err);
    setTagsError('خطا در دریافت لیست تگ‌ها');
  } finally {
    setTagsLoading(false);
  }
};

// toggle انتخاب تگ
const toggleTagSelection = (tagId) => {
  const newSelectedTags = new Set(selectedTags);
  if (newSelectedTags.has(tagId)) {
    newSelectedTags.delete(tagId);
  } else {
    newSelectedTags.add(tagId);
  }
  setSelectedTags(newSelectedTags);

    setTags(prevUsers => 
    prevUsers.map(user => 
      user.id === tagId 
        ? { ...user, isCheck: !user.isCheck }
        : user
    )
  );
};

// انتخاب همه تگ‌ها
const selectAllTags = () => {
  const allTagIds = tags.map(tag => tag.id);
  setSelectedTags(new Set(allTagIds));
};

// لغو انتخاب همه تگ‌ها
const deselectAllTags = () => {
  setSelectedTags(new Set());
};
// ذخیره انتخاب‌های تگ‌ها
const saveTagSelections = async () => {
  try {
    setTagsLoading(true);
    
    const selectedTagIds = Array.from(selectedTags);

      const selectedUserIds = tags
      .filter(user => user.isCheck)
      .map(user => user.id);
      console.log("###################################################",selectedUserIds)
      console.log("###################################################",selectedTagIds)
    
    console.log('💾 Saving tag selections:', {
      project: selectedProject?.id,
      selectedTags: selectedTagIds
    });
    
    const saveData = {
      tagIds: selectedUserIds
    };
    
    await projectService.insertOrDeleteTagProject(saveData, selectedProject?.id);
    
    toast.success('تگ‌ها با موفقیت ذخیره شدند', {
      position: "top-left",
      autoClose: 5000,
    });
    
    console.log('✅ Tag assignments saved successfully');
    
    setIsTagModalOpen(false);
    setSelectedProject(null);
    
  } catch (err) {
    console.error('❌ Error saving tag selections:', err);
    setTagsError('خطا در ذخیره تگ‌ها');
  } finally {
    setTagsLoading(false);
  }
};

// ایجاد تگ جدید
const handleCreateTag = async (tagName) => {
  // این تابع باید سرویس ایجاد تگ را فراخوانی کند
  const newTag = await projectService.createTag({
    name: tagName,
    description: '',
    color: getRandomColor() // تابع برای تولید رنگ تصادفی
  });
  
  // اضافه کردن تگ جدید به لیست
  setTags(prev => [...prev, newTag]);
  // انتخاب خودکار تگ جدید
  setSelectedTags(prev => new Set(prev).add(newTag.id));
};

// تابع کمکی برای تولید رنگ تصادفی
const getRandomColor = () => {
  const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe', '#43e97b', '#38f9d7'];
  return colors[Math.floor(Math.random() * colors.length)];
};
// تابع برای باز کردن modal کاربران
const handleUsersClick = async (project) => {
  try {
    setSelectedProject(project);
    setUsersLoading(true);
    setUsersError(null);
    
    console.log('👥 Fetching users for project:', project.name);
    
    // دریافت لیست کاربران
    const usersResponse = await projectService.getUserForProject(1, 100,project.id); // صفحه اول با 100 آیتم
    console.log("userrrrrrrrrrrr")
    console.log(usersResponse.items)
    setUsers(usersResponse.items || []);
      // ایجاد Set از کاربران انتخاب شده بر اساس isCheck
    const initiallySelected = new Set();
    (usersResponse.items || []).forEach(user => {
      if (user.isCheck) {
        initiallySelected.add(user.id);
      }
    });
    setSelectedUsers(initiallySelected);
    // در اینجا می‌توانید کاربران انتخاب شده قبلی را از API دریافت کنید
    // فعلاً یک Set خالی قرار می‌دهیم
    setSelectedUsers(new Set());
    
    setIsUserModalOpen(true);
    
  } catch (err) {
          toast.error('عملیات با موفقیت انجام شد', {
      position: "top-left",
      autoClose: 5000,
    });
    console.error('❌ Error fetching users:', err);
    setUsersError('خطا در دریافت لیست کاربران');
  } finally {
    setUsersLoading(false);
  }
};

// تoggle انتخاب کاربر
// const toggleUserSelection = (userId) => {
//   const newSelectedUsers = new Set(selectedUsers);
//   if (newSelectedUsers.has(userId)) {
//     newSelectedUsers.delete(userId);
//   } else {
//     newSelectedUsers.add(userId);
//   }
//   setSelectedUsers(newSelectedUsers);
// };

const toggleUserSelection = (userId) => {
  // آپدیت state selectedUsers
  const newSelectedUsers = new Set(selectedUsers);
  console.log("checkkkkkkk",newSelectedUsers)
  if (newSelectedUsers.has(userId)) {
    newSelectedUsers.delete(userId);
  } else {
    newSelectedUsers.add(userId);
  }
  setSelectedUsers(newSelectedUsers);

  // آپدیت isCheck در داده‌های users
  setUsers(prevUsers => 
    prevUsers.map(user => 
      user.id === userId 
        ? { ...user, isCheck: !user.isCheck }
        : user
    )
  );
};

// انتخاب همه کاربران
// توابع selectAll و deselectAll را آپدیت کنید
const selectAllUsers = () => {
  const currentPageUserIds = users.map(user => user.id);
  const newSelectedUsers = new Set(selectedUsers);
  
  currentPageUserIds.forEach(userId => {
    newSelectedUsers.add(userId);
  });
  
  setSelectedUsers(newSelectedUsers);
  
  // آپدیت isCheck در داده‌ها
  setUsers(prevUsers => 
    prevUsers.map(user => ({
      ...user,
      isCheck: true
    }))
  );
};


// لغو انتخاب همه کاربران
const deselectAllUsers = () => {
  const currentPageUserIds = users.map(user => user.id);
  const newSelectedUsers = new Set(selectedUsers);
  
  currentPageUserIds.forEach(userId => {
    newSelectedUsers.delete(userId);
  });
  
  setSelectedUsers(newSelectedUsers);
  
  // آپدیت isCheck در داده‌ها
  setUsers(prevUsers => 
    prevUsers.map(user => ({
      ...user,
      isCheck: false
    }))
  );
};

// ذخیره انتخاب‌های کاربران
// تابع saveUserSelections - بر اساس isCheck
const saveUserSelections = async () => {
  try {
    setUsersLoading(true);
    
    // گرفتن کاربران انتخاب شده بر اساس isCheck
    const selectedUserIds = users
      .filter(user => user.isCheck)
      .map(user => user.id);
    
    console.log('💾 Saving user selections:', {
      project: selectedProject?.id,
      selectedUsers: selectedUserIds
    });
    
    const saveData = {

      userIds: selectedUserIds
    };
    
    await projectService.insertOrDeleteMenuAccess(saveData,selectedProject?.id);
            toast.success('عملیات با موفقیت انجام شد', {
          position: "top-left",
          autoClose: 5000,
        });
    console.log('✅ User assignments saved successfully');
    
    setIsUserModalOpen(false);
    setSelectedProject(null);
    
  } catch (err) {
    console.error('❌ Error saving user selections:', err);
    setUsersError('خطا در ذخیره انتخاب‌ها');
  } finally {
    setUsersLoading(false);
  }
};

// بستن modal کاربران
const handleCloseUserModal = () => {
  setIsUserModalOpen(false);
  setSelectedProject(null);
  setSelectedUsers(new Set());
  setUsersError(null);
};
  /************************ */

  useEffect(() => {
    fetchProjects(pagination.currentPage, pagination.pageSize);
  }, [fetchProjects, pagination.currentPage, pagination.pageSize]);
  // مدیریت حذف پروژه
  const handleDeleteClick = (project) => {
    console.log('delete')
    setProjectToDelete(project);
    setIsDeleteModalOpen(true);
        console.log(isDeleteModalOpen)
  };

    // مدیریت کلیک روی دکمه مشاهده
  const handleViewClick = (project) => {
    console.log('👁️ Viewing project:', project);
    
    // گرفتن آیدی پروژه - با توجه به ساختار داده‌های شما
    const projectId = project.id || project.rowNum;
    const name=project.name
    
    if (projectId) {
      console.log(`📍 Navigating to TodoBoard with projectId: ${projectId}`);
      
      // navigate به صفحه TodoBoard با آیدی پروژه
      // navigate(`/TodoBoard/${projectId}`);
        navigate('/TodoBoard', { 
    state: { projectId: projectId,

         name: project.name 
     }
  });
    } else {
      console.error('❌ Project ID not found:', project);
      setError('آیدی پروژه یافت نشد');
    }
  };
      // مدیریت کلیک روی دکمه مشاهده
  const handleArchiveClick = (project) => {
    console.log('👁️ Viewing project:', project);
    
    // گرفتن آیدی پروژه - با توجه به ساختار داده‌های شما
    const projectId = project.id || project.rowNum;
    const name=project.name
    
    if (projectId) {
      console.log(`📍 Navigating to TodoBoard with projectId: ${projectId}`);
      
      // navigate به صفحه TodoBoard با آیدی پروژه
      // navigate(`/TodoBoard/${projectId}`);
        navigate('/Archive', { 
    state: { projectId: projectId,

         name: project.name 
     }
  });
    } else {
      console.error('❌ Project ID not found:', project);
      setError('آیدی پروژه یافت نشد');
    }
  };

  const handleConfirmDelete = async () => {
    if (!projectToDelete) return;

    try {
      setDeleteLoading(true);
      console.log('🗑️ Deleting project:', projectToDelete.name);
      
      await projectService.deleteProject(projectToDelete.id || projectToDelete.rowNum);
      
      console.log('✅ Project deleted successfully');
      
      // بستن modal
      setIsDeleteModalOpen(false);
      setProjectToDelete(null);
      
      // نمایش پیغام موفقیت
      setError(null);
      
      // بروزرسانی لیست
      setTimeout(() => {
        fetchProjects(pagination.currentPage, pagination.pageSize);
      }, 500);
      
    }  catch (err) {
  console.error('❌ Error deleting project:', err);
   setIsDeleteModalOpen(false);
  // روش اول: اگر response ساختار مشخصی دارد
  if (err.response?.data?.message) {
    setError(err.response.data.message);
  } 
  // روش دوم: اگر response رشته است
  else if (err.request?.response) {
    try {
      const errorData = JSON.parse(err.request.response);
      setError(errorData.data?.message || errorData.message || 'خطا در حذف پروژه');
    } catch (parseError) {
      setError('خطا در حذف پروژه');
    }
  }
  // روش سوم: fallback
  else {
    setError('خطا در حذف پروژه');
  }
}finally {
      setDeleteLoading(false);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setProjectToDelete(null);
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
      currentPage: 1 // بازگشت به صفحه اول
    }));
  };

  // وقتی پروژه جدید ایجاد شد
  const handleProjectCreated = useCallback(() => {
    console.log('🔄 Refreshing projects list after creation');
    // بازگشت به صفحه اول و بروزرسانی
    setPagination(prev => ({ ...prev, currentPage: 1 }));
    setTimeout(() => {
      fetchProjects(1, pagination.pageSize);
    }, 500);
  }, [fetchProjects, pagination.pageSize]);

  // مدیریت خطا
  const handleRetry = useCallback(() => {
    setError(null);
    fetchProjects(pagination.currentPage, pagination.pageSize);
  }, [fetchProjects, pagination.currentPage, pagination.pageSize]);

  // فرمت کردن تاریخ
  const formatDate = (dateString) => {
    if (!dateString) return '---';
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('fa-IR', options);
  };

  // گرفتن وضعیت پروژه - با توجه به داده‌های جدید
  const getStatusBadge = (project) => {
    // از آنجایی که در داده‌های API وضعیت مشخص نیست، می‌توانیم بر اساس تاریخ یا سایر فیلدها وضعیت را تعیین کنیم
    const createdDate = new Date(project.createdAt);
    const now = new Date();
    const diffDays = Math.floor((now - createdDate) / (1000 * 60 * 60 * 24));
    
    if (diffDays < 7) {
       return (
        <span className="status-badge status-active">
          <FaRocket className="status-icon" />
          جدید
        </span>
      );
    } else if (diffDays < 30) {
           return (
        <span className="status-badge status-pending">
          <FaSync className="status-icon" />
          در حال انجام
        </span>
      );
    } else {
         return (
        <span className="status-badge status-completed">
          <FaCheckCircle className="status-icon" />
          قدیمی
        </span>
      );
    }
  };

  // گرفتن اولویت پروژه - با توجه به داده‌های جدید
  const getPriorityBadge = (project) => {
    // از آنجایی که در داده‌های API اولویت مشخص نیست، می‌توانیم بر اساس rowNum اولویت را تعیین کنیم
    if (project.rowNum === 1) {
      return <span className="priority-badge priority-high">بالا</span>;
    } else if (project.rowNum <= 3) {
      return <span className="priority-badge priority-medium">متوسط</span>;
    } else {
      return <span className="priority-badge priority-low">پایین</span>;
    }
  };

  // محاسبه رکوردهای نمایش داده شده
  const getDisplayRange = () => {
    const start = ((pagination.currentPage - 1) * pagination.pageSize) + 1;
    const end = Math.min(start + pagination.pageSize - 1, pagination.totalCount);
    return { start, end };
  };

  const { start, end } = getDisplayRange();

  // گرفتن maxProjects از اولین پروژه (همانطور که در API برگردانده شده)
  const maxProjects = projects.length > 0 ? projects[0].maxProjects : 0;

  if (loading && projects.length === 0) {
    return <LoadingSpinner text="در حال دریافت اطلاعات پروژه‌ها..." />;
  }

  return (
    <div className="project-page">
      <div className="page-header">
        <h1>مدیریت پروژه‌ها</h1>
        <p>لیست تمام پروژه‌های سیستم</p>
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

      <div className="project-actions">
        <div className="actions-left">

       { access.checkAccess ?
          <button 
            className="btn btn-primary"
            onClick={() => setIsCreateModalOpen(true)}
            disabled={loading}
          >
                   <FaPlus className="btn-icon" />
            پروژه جدید
          </button> : ""
}

          <button 
            className="btn btn-secondary"
            onClick={() => fetchProjects(pagination.currentPage, pagination.pageSize)}
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
          <button 
            onClick={handleRetry}
            className="btn-retry"
          >
            تلاش مجدد
          </button>
        </div>
      )}

      <div className="project-info">
        <div className="total-info">
          نمایش {start} تا {end} از {pagination.totalCount.toLocaleString()} پروژه
        </div>
      </div>

      <div className="project-table-container">
        <table className="project-table">
          <thead>
            <tr>
              <th>#</th>
              <th>نام پروژه</th>
              {/* <th>توضیحات</th>
              <th>وضعیت</th> */}
     
              <th>تاریخ ایجاد</th>
  
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {projects.length === 0 ? (
              <tr>
                <td colSpan="8" className="no-data">
                  <div className="no-data-content">
                    <span className="no-data-icon">📭</span>
                    <p>هیچ پروژه‌ای یافت نشد</p>
                  { access && access.checkAccess ?
                      <button 
                      className="btn btn-primary"
                      onClick={() => setIsCreateModalOpen(true)}
                    >
                      ایجاد اولین پروژه
                    </button> : ''  
                  }
                
                  </div>
                </td>
              </tr>
            ) : (
              projects.map((project, index) => (
                <tr key={project.rowNum || index} className="project-row">
                  <td className="index-cell">
                    {((pagination.currentPage - 1) * pagination.pageSize) + index + 1}
                  </td>
                  <td className="project-name">
                    <div className="project-name-content">
                      <span className="project-icon">📁</span>
                      <div>
                        <div className="project-title">{project.name}</div>
                        <div className="project-code">ردیف: {project.rowNum}</div>
                      </div>
                    </div>
                  </td>
                  {/* <td className="project-description">
                    {project.description || 'بدون توضیحات'}
                  </td>
                  <td className="status-cell">
                    {getStatusBadge(project)}
                  </td> */}
          
                  <td className="date-cell">
                    <div className="date-content">
                      <span className="date-icon">📅</span>
                      {formatDate(project.createdAt)}
                    </div>
                  </td>
           
                  <td className="actions-cell">
                    <div className="action-buttons">
                      <button 
                        className="btn-action btn-view"
                        title="مشاهده"
                            onClick={() => handleViewClick(project)}
                      >
                            <FaEye />
                      </button>
                          
                    <button 
                        className="btn-action btn-warning"
                        title="آرشیو"
                            onClick={() => handleArchiveClick(project)}
                      >
                            <FaArchive />
                      </button>

                          
    {/* دکمه جدید برای مدیریت کاربران */}


      {access.checkAccessDelete ?    <button 
      className="btn-action btn-users"
      title="مدیریت کاربران"
      onClick={() => handleUsersClick(project)}
      disabled={loading}
    >
      <FaUsers />
    </button>
    
    
    : "" }
    
      {access.checkAccessDelete ?      <button 
    className="btn-action btn-tags"
    title="مدیریت تگ‌ها"
    onClick={() => handleTagsClick(project)}
    disabled={loading}
  >
      <FaTags />
  </button>
    
    
    : "" }

                      {/* <button 
                        className="btn-action btn-edit"
                        title="ویرایش"
                      >
                           <FaEdit />
                      </button> */}

                       {access.checkAccessDelete ?    <button 
                        className="btn-action btn-delete"
                        title="حذف"
                        onClick={() => handleDeleteClick(project)}
                        disabled={loading}
                      >
                        <FaTrash />
                      </button> : '' }
             
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
{ access.checkAccess ?
      <div className="project-stats">
        <div className="stat-card">
          <div className="stat-icon total">📊</div>
          <div className="stat-content">
            <div className="stat-value">{pagination.totalCount}</div>
            <div className="stat-label">کل پروژه‌ها</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon active">🚀</div>
          <div className="stat-content">
            <div className="stat-value">
              {maxProjects}
            </div>
            <div className="stat-label">سقف مجاز پروژه‌ها</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon completed">✅</div>
          <div className="stat-content">
            <div className="stat-value">
              {maxProjects - pagination.totalCount}
            </div>
            <div className="stat-label">مانده مجاز</div>
          </div>
        </div>
      </div>
  
  : ""}  
  

      {/* Modal ایجاد پروژه جدید */}
      <CreateProjectModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onProjectCreated={handleProjectCreated}
      />
            {/* Modal تأیید حذف */}
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        projectName={projectToDelete?.name}
        loading={deleteLoading}
        
      />
    <UserSelectionModal
      isOpen={isUserModalOpen}
      onClose={handleCloseUserModal}
      projectName={selectedProject?.name}
      users={users}
      selectedUsers={selectedUsers}
      onUserToggle={toggleUserSelection}
      onSelectAll={selectAllUsers}
      onDeselectAll={deselectAllUsers}
      onSave={saveUserSelections}
      loading={usersLoading}
      error={usersError}
    />


<TagSelectionModal
  isOpen={isTagModalOpen}
  onClose={() => {
    setIsTagModalOpen(false);
    setSelectedProject(null);
    setSelectedTags(new Set());
    setTagsError(null);
  }}
  projectName={selectedProject?.name}
  tags={tags}
  selectedTags={selectedTags}
  onTagToggle={toggleTagSelection}
  onSelectAll={selectAllTags}
  onDeselectAll={deselectAllTags}
  onSave={saveTagSelections}
  onCreateTag={handleCreateTag}
  loading={tagsLoading}
  error={tagsError}
/>

    </div>
  );
};

// داده‌های نمونه برای زمانی که API در دسترس نیست
const getSampleProjects = () => [
  {
    name: "تست",
    createdAt: "2025-10-16T06:27:17.6312536",
    maxProjects: 100,
    rowNum: 1,
    description: "پروژه تستی سیستم"
  },
  {
    name: "پروژه مالی 2",
    createdAt: "2025-10-16T06:14:41.4066667",
    maxProjects: 100,
    rowNum: 2,
    description: "سیستم مالی سازمان"
  },
  {
    name: "پروژه مالی 1", 
    createdAt: "2025-10-13T12:35:22.2400816",
    maxProjects: 100,
    rowNum: 3,
    description: "مدیریت مالی شرکت"
  }
];

export default Project;