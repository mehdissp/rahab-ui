// // // components/project/CreateProjectModal/CreateProjectModal.jsx
// // import React, { useState } from 'react';
// // import { projectService } from '../../../services/project';
// // import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner';
// // import './CreateProjectModal.css';

// // const CreateProjectModal = ({ isOpen, onClose, onProjectCreated }) => {
// //   const [projectName, setProjectName] = useState('');
// //   const [projectDescription, setProjectDescription] = useState('');
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState('');

// //   const resetForm = () => {
// //     setProjectName('');
// //     setProjectDescription('');
// //     setError('');
// //   };

// //   const handleClose = () => {
// //     resetForm();
// //     onClose();
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
    
// //     if (!projectName.trim()) {
// //       setError('نام پروژه الزامی است');
// //       return;
// //     }

// //     setLoading(true);
// //     setError('');

// //     try {
// //       console.log('🚀 Creating new project:', projectName);
      
// //       await projectService.createProject({
// //         Name: projectName.trim(),
// //         Description: projectDescription.trim() || null
// //       });

// //       console.log('✅ Project created successfully');
      
// //       // اطلاع به والد که پروژه ایجاد شد
// //       onProjectCreated();
      
// //       // بستن modal و reset فرم
// //       handleClose();
      
// //     } catch (err) {
// //       console.error('❌ Error creating project:', err.response);
// //       setError(err.response?.data?.data.message || 'خطا در ایجاد پروژه');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   if (!isOpen) return null;

// //   return (
// //     <div className="modal-overlay" onClick={handleClose}>
// //       <div className="modal-content" onClick={(e) => e.stopPropagation()}>
// //         <div className="modal-header">
// //           <h2>ایجاد پروژه جدید</h2>
// //           <button 
// //             className="modal-close"
// //             onClick={handleClose}
// //             disabled={loading}
// //           >
// //             ✕
// //           </button>
// //         </div>

// //         <form onSubmit={handleSubmit} className="modal-form">
// //           <div className="form-group">
// //             <label htmlFor="projectName">
// //               نام پروژه 
// //               <span className="required-star">*</span>
// //             </label>
// //             <input
// //               type="text"
// //               id="projectName"
// //               value={projectName}
// //               onChange={(e) => setProjectName(e.target.value)}
// //               placeholder="نام پروژه را وارد کنید"
// //               className="form-input"
// //               disabled={loading}
// //               autoFocus
// //             />
// //           </div>



// //           {error && (
// //             <div className="error-message">
// //               <span className="error-icon">⚠️</span>
// //               {error}
// //             </div>
// //           )}

// //           <div className="modal-actions">
// //             <button
// //               type="button"
// //               onClick={handleClose}
// //               className="btn btn-secondary"
// //               disabled={loading}
// //             >
// //               انصراف
// //             </button>
// //             <button
// //               type="submit"
// //               className="btn btn-primary"
// //               disabled={loading || !projectName.trim()}
// //             >
// //               {loading ? (
// //                 <>
// //                   <LoadingSpinner size="small" color="white" />
// //                   در حال ایجاد...
// //                 </>
// //               ) : (
// //                 <>
// //                   <span className="btn-icon">➕</span>
// //                   ایجاد پروژه
// //                 </>
// //               )}
// //             </button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CreateProjectModal;

// // components/project/CreateProjectModal/CreateProjectModal.jsx
// import React, { useState, useEffect } from 'react';
// import { projectService } from '../../../services/project';
// import { companyService } from '../../../services/company'; // سرویس شرکت
// import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner';
// import './CreateProjectModal.css';

// const CreateProjectModal = ({ isOpen, onClose, onProjectCreated }) => {
//   const [projectName, setProjectName] = useState('');
//   const [projectDescription, setProjectDescription] = useState('');
//   const [companyId, setCompanyId] = useState('');
//   const [companies, setCompanies] = useState([]);
//   const [loadingCompanies, setLoadingCompanies] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   // دریافت لیست شرکت‌ها هنگام باز شدن مودال
//   useEffect(() => {
//     if (isOpen) {
//       fetchCompanies();
//     }
//   }, [isOpen]);

//   const fetchCompanies = async () => {
//     setLoadingCompanies(true);
//     try {
//       console.log('🚀 Fetching companies list...');
//       const response = await companyService.getCompanyCombo(); // فرض بر این است که این متد در سرویس تعریف شده
//       setCompanies(response.data || []);
//     } catch (err) {
//       console.error('❌ Error fetching companies:', err);
//       setError('خطا در دریافت لیست شرکت‌ها');
//     } finally {
//       setLoadingCompanies(false);
//     }
//   };

//   const resetForm = () => {
//     setProjectName('');
//     setProjectDescription('');
//     setCompanyId('');
//     setError('');
//   };

//   const handleClose = () => {
//     resetForm();
//     onClose();
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // اعتبارسنجی
//     if (!projectName.trim()) {
//       setError('نام پروژه الزامی است');
//       return;
//     }

//     if (!companyId) {
//       setError('انتخاب شرکت الزامی است');
//       return;
//     }

//     setLoading(true);
//     setError('');

//     try {
//       console.log('🚀 Creating new project:', {
//         name: projectName,
//         companyId: companyId
//       });
      
//       await projectService.createProject({
//         Name: projectName.trim(),
//         Description: projectDescription.trim() || null,
//         CompanyId: parseInt(companyId) // ارسال CompanyId به صورت عدد
//       });

//       console.log('✅ Project created successfully');
      
//       // اطلاع به والد که پروژه ایجاد شد
//       onProjectCreated();
      
//       // بستن modal و reset فرم
//       handleClose();
      
//     } catch (err) {
//       console.error('❌ Error creating project:', err.response);
//       setError(err.response?.data?.data?.message || 'خطا در ایجاد پروژه');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="modal-overlay" onClick={handleClose}>
//       <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//         <div className="modal-header">
//           <h2>ایجاد پروژه جدید</h2>
//           <button 
//             className="modal-close"
//             onClick={handleClose}
//             disabled={loading}
//           >
//             ✕
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="modal-form">
//           <div className="form-group">
//             <label htmlFor="companyId">
//               شرکت 
//               <span className="required-star">*</span>
//             </label>
//             <select
//               id="companyId"
//               value={companyId}
//               onChange={(e) => setCompanyId(e.target.value)}
//               className="form-input"
//               disabled={loading || loadingCompanies}
//               required
//             >
//               <option value="">انتخاب شرکت...</option>
//               {companies.map((company) => (
//                 <option key={company.Id || company.id} value={company.Id || company.id}>
//                   {company.Name || company.name}
//                 </option>
//               ))}
//             </select>
//             {loadingCompanies && (
//               <div className="loading-companies">
//                 <LoadingSpinner size="small" />
//                 <span>در حال بارگذاری شرکت‌ها...</span>
//               </div>
//             )}
//           </div>

//           <div className="form-group">
//             <label htmlFor="projectName">
//               نام پروژه 
//               <span className="required-star">*</span>
//             </label>
//             <input
//               type="text"
//               id="projectName"
//               value={projectName}
//               onChange={(e) => setProjectName(e.target.value)}
//               placeholder="نام پروژه را وارد کنید"
//               className="form-input"
//               disabled={loading}
//               autoFocus
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="projectDescription">
//               توضیحات پروژه
//             </label>
//             <textarea
//               id="projectDescription"
//               value={projectDescription}
//               onChange={(e) => setProjectDescription(e.target.value)}
//               placeholder="توضیحات پروژه را وارد کنید (اختیاری)"
//               className="form-input"
//               rows="3"
//               disabled={loading}
//             />
//           </div>

//           {error && (
//             <div className="error-message">
//               <span className="error-icon">⚠️</span>
//               {error}
//             </div>
//           )}

//           <div className="modal-actions">
//             <button
//               type="button"
//               onClick={handleClose}
//               className="btn btn-secondary"
//               disabled={loading}
//             >
//               انصراف
//             </button>
//             <button
//               type="submit"
//               className="btn btn-primary"
//               disabled={loading || !projectName.trim() || !companyId}
//             >
//               {loading ? (
//                 <>
//                   <LoadingSpinner size="small" color="white" />
//                   در حال ایجاد...
//                 </>
//               ) : (
//                 <>
//                   <span className="btn-icon">➕</span>
//                   ایجاد پروژه
//                 </>
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateProjectModal;

// components/project/CreateProjectModal/CreateProjectModal.jsx
import React, { useState, useEffect } from 'react';
import { projectService } from '../../../services/project';
import { companyService } from '../../../services/company';
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner';
import './CreateProjectModal.css';

const CreateProjectModal = ({ isOpen, onClose, onProjectCreated }) => {
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [companies, setCompanies] = useState([]);
  const [loadingCompanies, setLoadingCompanies] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // دریافت لیست شرکت‌ها هنگام باز شدن مودال
  useEffect(() => {
    if (isOpen) {
      fetchCompanies();
    }
  }, [isOpen]);

  const fetchCompanies = async () => {
    setLoadingCompanies(true);
    try {
      console.log('🚀 Fetching companies list...');
      const response = await companyService.getCompanyCombo();
      console.log('asliiiiiiiiiiii',response)
      // با توجه به ساختار پاسخ شما
      // response = { status: 200, data: { items: [...], totalCount: ..., totalPages: ... } }
      let companiesList = [];
          companiesList = response;
      if (response && response.data && response.data.items) {
        companiesList = response.data.items;
      } else if (response && response.items) {
        companiesList = response.items;
      } else if (Array.isArray(response)) {
        companiesList = response;
      } else if (response && response.data && Array.isArray(response.data)) {
        companiesList = response.data;
      }
      
      console.log('Companies loaded:', companiesList);
      setCompanies(companiesList);
      
      if (companiesList.length === 0) {
        setError('هیچ شرکتی یافت نشد. لطفا ابتدا شرکت ایجاد کنید.');
      }
    } catch (err) {
      console.error('❌ Error fetching companies:', err);
      setError('خطا در دریافت لیست شرکت‌ها');
    } finally {
      setLoadingCompanies(false);
    }
  };

  const resetForm = () => {
    setProjectName('');
    setProjectDescription('');
    setCompanyId('');
    setError('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // اعتبارسنجی
    if (!projectName.trim()) {
      setError('نام پروژه الزامی است');
      return;
    }

    if (!companyId) {
      setError('انتخاب شرکت الزامی است');
      return;
    }

    setLoading(true);
    setError('');

    try {
      console.log('🚀 Creating new project:', {
        name: projectName,
        companyId: companyId
      });
      
      await projectService.createProject({
        Name: projectName.trim(),
        Description: projectDescription.trim() || null,
        CompanyId: parseInt(companyId)
      });

      console.log('✅ Project created successfully');
      
      onProjectCreated();
      handleClose();
      
    } catch (err) {
      console.error('❌ Error creating project:', err);
      console.error('Error details:', err.response);
      
      let errorMessage = 'خطا در ایجاد پروژه';
      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.response?.data?.data?.message) {
        errorMessage = err.response.data.data.message;
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>ایجاد پروژه جدید</h2>
          <button 
            className="modal-close"
            onClick={handleClose}
            disabled={loading}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="companyId">
              شرکت 
              <span className="required-star">*</span>
            </label>
            <select
              id="companyId"
              value={companyId}
              onChange={(e) => setCompanyId(e.target.value)}
              className="form-input"
              disabled={loading || loadingCompanies}
              required
            >
              <option value="">انتخاب شرکت...</option>
              {companies.map((company) => (
                <option 
                  key={company.Id || company.id || company.companyId} 
                  value={company.Id || company.id || company.companyId}
                >
                  {company.Name || company.name || company.companyName}
                </option>
              ))}
            </select>
            {loadingCompanies && (
              <div className="loading-companies">
                <LoadingSpinner size="small" />
                <span>در حال بارگذاری شرکت‌ها...</span>
              </div>
            )}
            {!loadingCompanies && companies.length === 0 && (
              <div className="warning-message">
                <span className="warning-icon">⚠️</span>
                هیچ شرکتی یافت نشد. لطفا ابتدا یک شرکت ایجاد کنید.
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="projectName">
              نام پروژه 
              <span className="required-star">*</span>
            </label>
            <input
              type="text"
              id="projectName"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="نام پروژه را وارد کنید"
              className="form-input"
              disabled={loading}
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="projectDescription">
              توضیحات پروژه
            </label>
            <textarea
              id="projectDescription"
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              placeholder="توضیحات پروژه را وارد کنید (اختیاری)"
              className="form-input"
              rows="3"
              disabled={loading}
            />
          </div>

          {error && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              {error}
            </div>
          )}

          <div className="modal-actions">
            <button
              type="button"
              onClick={handleClose}
              className="btn btn-secondary"
              disabled={loading}
            >
              انصراف
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading || !projectName.trim() || !companyId || companies.length === 0}
            >
              {loading ? (
                <>
                  <LoadingSpinner size="small" color="white" />
                  در حال ایجاد...
                </>
              ) : (
                <>
                  <span className="btn-icon">➕</span>
                  ایجاد پروژه
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProjectModal;