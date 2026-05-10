
// // // // components/dashboard/Dashboard/Dashboard.jsx
// // // import React from 'react';
// // // import { useAuth } from '../../../context/AuthContext';
// // // import useApi from '../../../hooks/useApi';
// // // import { authService } from '../../../services/auth';
// // // import './Dashboard.css';
// // // // import PersianGanttChart from './PersianGanttChart';

// // // const Dashboard = () => {
// // //   const { user } = useAuth();
  
// // //   const { data: stats, loading: statsLoading, error: statsError } = useApi(
// // //     () => authService.getDashboardStats ? authService.getDashboardStats() : Promise.resolve(null)
// // //   );

// // //   const quickStats = [
// // //     {
// // //       title: 'کاربران فعال',
// // //       value: stats?.totalUsers?.toLocaleString() || '۱,۲۴۳',
// // //       icon: '👥',
// // //       color: 'var(--primary-color)',
// // //       change: '+12%'
// // //     },
// // //     {
// // //       title: 'سفارشات امروز',
// // //       value: stats?.totalOrders?.toLocaleString() || '۵۶',
// // //       icon: '📦',
// // //       color: 'var(--accent-color)',
// // //       change: '+8%'
// // //     },
// // //     {
// // //       title: 'درآمد ماه',
// // //       value: stats?.totalRevenue ? `${(stats.totalRevenue / 1000000).toFixed(1)}M` : '۱۲.۵M',
// // //       icon: '💰',
// // //       color: '#10b981',
// // //       change: '+23%'
// // //     },
// // //     {
// // //       title: 'بازدیدها',
// // //       value: stats?.totalVisits?.toLocaleString() || '۸,۴۵۶',
// // //       icon: '👀',
// // //       color: '#f59e0b',
// // //       change: '+5%'
// // //     }
// // //   ];

// // //   const recentActivities = [
// // //     { id: 1, user: 'علی محمدی', action: 'سفارش جدید ثبت کرد', time: '۲ دقیقه پیش' },
// // //     { id: 2, user: 'مریم کریمی', action: 'محصول جدید اضافه کرد', time: '۵ دقیقه پیش' },
// // //     { id: 3, user: 'رضا احمدی', action: 'نظر جدید ارسال کرد', time: '۱۰ دقیقه پیش' },
// // //     { id: 4, user: 'سارا نظری', action: 'پروفایل را بروزرسانی کرد', time: '۱۵ دقیقه پیش' }
// // //   ];

// // //   if (statsError) {
// // //     console.error('Dashboard stats error:', statsError);
// // //   }

// // //   return (
// // //     <div className="dashboard">
// // //       <div className="dashboard-header fade-in">
// // //         <h1>داشبورد مدیریت</h1>
// // //         <p>خلاصه‌ای از فعالیت‌ها و آمار سیستم</p>
// // //         {statsError && (
// // //           <div className="error-banner">
// // //             ⚠️ خطا در دریافت آمار: از داده‌های نمونه استفاده می‌شود
// // //           </div>
// // //         )}
// // //       </div>

// // //       <div className="stats-grid stagger-children">
// // //         {quickStats.map((stat, index) => (
// // //           <div key={index} className="stat-card">
// // //             <div className="stat-icon" style={{ background: stat.color }}>
// // //               {stat.icon}
// // //             </div>
// // //             <div className="stat-content">
// // //               <div className="stat-value">
// // //                 {statsLoading ? (
// // //                   <div className="skeleton-loader skeleton-rect short"></div>
// // //                 ) : (
// // //                   stat.value
// // //                 )}
// // //               </div>
// // //               <div className="stat-title">{stat.title}</div>
// // //               <div className="stat-change" style={{ color: stat.color }}>
// // //                 {stat.change}
// // //               </div>
// // //             </div>
// // //           </div>
// // //         ))}
// // //       </div>

// // //       {/* گانت چارت اینجا قرار بگیرد */}
// // //       {/* <PersianGanttChart 
// // //         onTaskClick={(project, task) => {
// // //           console.log('تسک انتخاب شده:', task.name, 'از پروژه:', project.name);
// // //         }}
// // //       /> */}

// // //       <div className="dashboard-content">
// // //         <div className="recent-activities card slide-in-left">
// // //           <h2>فعالیت‌های اخیر</h2>
// // //           <div className="activities-list">
// // //             {recentActivities.map((activity, index) => (
// // //               <div 
// // //                 key={activity.id} 
// // //                 className="activity-item fade-in-up"
// // //                 style={{ animationDelay: `${index * 0.1}s` }}
// // //               >
// // //                 <div className="activity-avatar">
// // //                   {activity.user.charAt(0)}
// // //                 </div>
// // //                 <div className="activity-content">
// // //                   <div className="activity-text">
// // //                     <strong>{activity.user}</strong> {activity.action}
// // //                   </div>
// // //                   <div className="activity-time">{activity.time}</div>
// // //                 </div>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         </div>

// // //         <div className="user-info-card card slide-in-right">
// // //           <h2>اطلاعات کاربر</h2>
// // //           <div className="user-details">
// // //             <div className="detail-item">
// // //               <label>نام کامل:</label>
// // //               <span>{user?.name || 'نامشخص'}</span>
// // //             </div>
// // //             <div className="detail-item">
// // //               <label>ایمیل:</label>
// // //               <span>{user?.email || 'نامشخص'}</span>
// // //             </div>
// // //             <div className="detail-item">
// // //               <label>نقش:</label>
// // //               <span>{user?.role || 'مدیر سیستم'}</span>
// // //             </div>
// // //             <div className="detail-item">
// // //               <label>تاریخ عضویت:</label>
// // //               <span>{user?.joinDate || 'نامشخص'}</span>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Dashboard;

// // // components/dashboard/Dashboard/Dashboard.jsx
// // import React from 'react';
// // import { useAuth } from '../../../context/AuthContext';
// // import useApi from '../../../hooks/useApi';
// // import { dashbaordService } from '../../../services/dashbaord';
// // import './Dashboard.css';

// // const Dashboard = () => {
// //   const { user } = useAuth();
  
// //   const { data: stats, loading: statsLoading, error: statsError } = useApi(
// //     () => dashbaordService.getdashbaord 
// //   );
  

// //   // تبدیل مقادیر API به فرمت مناسب
// //   const quickStats = [
// //     {
// //       title: 'کاربران سیستم',
// //       value: stats?.countUser?.toLocaleString('fa-IR') || '۰',
// //       icon: '👥',
// //       color: 'var(--primary-color)',
// //       change: '+12%'
// //     },
// //     {
// //       title: 'عملیات مالی',
// //       value: stats?.countOP?.toLocaleString('fa-IR') || '۰',
// //       icon: '📊',
// //       color: 'var(--accent-color)',
// //       change: '+8%'
// //     },
// //     {
// //       title: 'مجموع ورودی‌ها',
// //       value: stats?.sumAmountIn ? `${(stats.sumAmountIn / 1000000).toFixed(2)}M` : '۰M',
// //       icon: '💰',
// //       color: '#10b981',
// //       change: '+23%',
// //       detail: `${stats?.sumAmountIn?.toLocaleString('fa-IR') || 0} تومان`
// //     },
// //     {
// //       title: 'مجموع خروجی‌ها',
// //       value: stats?.sumAmountOut ? `${(stats.sumAmountOut / 1000000).toFixed(2)}M` : '۰M',
// //       icon: '💸',
// //       color: '#ef4444',
// //       change: '+5%',
// //       detail: `${stats?.sumAmountOut?.toLocaleString('fa-IR') || 0} تومان`
// //     }
// //   ];

// //   const recentActivities = [
// //     { id: 1, user: 'علی محمدی', action: 'سفارش جدید ثبت کرد', time: '۲ دقیقه پیش' },
// //     { id: 2, user: 'مریم کریمی', action: 'محصول جدید اضافه کرد', time: '۵ دقیقه پیش' },
// //     { id: 3, user: 'رضا احمدی', action: 'نظر جدید ارسال کرد', time: '۱۰ دقیقه پیش' },
// //     { id: 4, user: 'سارا نظری', action: 'پروفایل را بروزرسانی کرد', time: '۱۵ دقیقه پیش' }
// //   ];

// //   if (statsError) {
// //     console.error('Dashboard stats error:', statsError);
// //   }

// //   return (
// //     <div className="dashboard">
// //       <div className="dashboard-header fade-in">
// //         <h1>داشبورد مدیریت</h1>
// //         <p>خلاصه‌ای از فعالیت‌ها و آمار سیستم</p>
// //         {statsError && (
// //           <div className="error-banner">
// //             ⚠️ خطا در دریافت آمار: از داده‌های نمونه استفاده می‌شود
// //           </div>
// //         )}
// //       </div>

// //       <div className="stats-grid stagger-children">
// //         {quickStats.map((stat, index) => (
// //           <div key={index} className="stat-card">
// //             <div className="stat-icon" style={{ background: stat.color }}>
// //               {stat.icon}
// //             </div>
// //             <div className="stat-content">
// //               <div className="stat-value">
// //                 {statsLoading ? (
// //                   <div className="skeleton-loader skeleton-rect short"></div>
// //                 ) : (
// //                   stat.value
// //                 )}
// //               </div>
// //               <div className="stat-title">{stat.title}</div>
// //               {stat.detail && !statsLoading && (
// //                 <div className="stat-detail" style={{ fontSize: '11px', color: '#666', marginTop: '4px' }}>
// //                   {stat.detail}
// //                 </div>
// //               )}
// //               <div className="stat-change" style={{ color: stat.color }}>
// //                 {stat.change}
// //               </div>
// //             </div>
// //           </div>
// //         ))}
// //       </div>

// //       <div className="dashboard-content">
// //         <div className="recent-activities card slide-in-left">
// //           <h2>فعالیت‌های اخیر</h2>
// //           <div className="activities-list">
// //             {recentActivities.map((activity, index) => (
// //               <div 
// //                 key={activity.id} 
// //                 className="activity-item fade-in-up"
// //                 style={{ animationDelay: `${index * 0.1}s` }}
// //               >
// //                 <div className="activity-avatar">
// //                   {activity.user.charAt(0)}
// //                 </div>
// //                 <div className="activity-content">
// //                   <div className="activity-text">
// //                     <strong>{activity.user}</strong> {activity.action}
// //                   </div>
// //                   <div className="activity-time">{activity.time}</div>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>

// //         <div className="user-info-card card slide-in-right">
// //           <h2>اطلاعات کاربر</h2>
// //           <div className="user-details">
// //             <div className="detail-item">
// //               <label>نام کامل:</label>
// //               <span>{user?.name || 'نامشخص'}</span>
// //             </div>
// //             <div className="detail-item">
// //               <label>ایمیل:</label>
// //               <span>{user?.email || 'نامشخص'}</span>
// //             </div>
// //             <div className="detail-item">
// //               <label>نقش:</label>
// //               <span>{user?.role || 'مدیر سیستم'}</span>
// //             </div>
// //             <div className="detail-item">
// //               <label>تاریخ عضویت:</label>
// //               <span>{user?.joinDate || 'نامشخص'}</span>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Dashboard;

// // components/dashboard/Dashboard/Dashboard.jsx
// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../../../context/AuthContext';
// import { dashboardService } from '../../../services/dashbaord';
// import './Dashboard.css';

// const Dashboard = () => {
//   const { user } = useAuth();
//   const [stats, setStats] = useState({
//     countUser: 0,
//     countOP: 0,
//     sumAmountIn: 0,
//     sumAmountOut: 0
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // دریافت آمار از سرور
//   useEffect(() => {
//     const fetchStats = async () => {
//       setLoading(true);
//       setError(null);
      
//       try {
//         const response = await dashboardService.getDashboardStats();
        
//         if (response.success) {
//           setStats({
//             countUser: response.countUser,
//             countOP: response.countOP,
//             sumAmountIn: response.sumAmountIn,
//             sumAmountOut: response.sumAmountOut
//           });
//         } else {
//           setError('خطا در دریافت آمار داشبورد');
//         }
//       } catch (err) {
//         setError('مشکل در ارتباط با سرور');
//         console.error('Dashboard error:', err);
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     fetchStats();
//   }, []);

//   // فرمت کردن اعداد به صورت فارسی
//   const formatNumber = (num) => {
//     if (!num && num !== 0) return '۰';
//     return num.toLocaleString('fa-IR');
//   };

//   // فرمت کردن مبلغ
//   const formatAmount = (amount) => {
//     if (!amount && amount !== 0) return '۰ تومان';
    
//     if (amount >= 1000000000) {
//       return `${(amount / 1000000000).toFixed(2)} میلیارد تومان`;
//     } else if (amount >= 1000000) {
//       return `${(amount / 1000000).toFixed(2)} میلیون تومان`;
//     } else if (amount >= 1000) {
//       return `${(amount / 1000).toFixed(2)} هزار تومان`;
//     }
//     return `${formatNumber(amount)} تومان`;
//   };

//   const quickStats = [
//     {
//       id: 1,
//       title: 'کاربران سیستم',
//       value: stats.countUser,
//       displayValue: formatNumber(stats.countUser),
//       icon: '👥',
//       color: '#4361ee',
//       bgColor: '#e8ecff',
//       change: '+12%',
//       description: 'تعداد کاربران ثبت‌نام شده'
//     },
//     {
//       id: 2,
//       title: 'عملیات مالی',
//       value: stats.countOP,
//       displayValue: formatNumber(stats.countOP),
//       icon: '📊',
//       color: '#3b82f6',
//       bgColor: '#dbeafe',
//       change: '+8%',
//       description: 'تعداد تراکنش‌های انجام شده'
//     },
//     {
//       id: 3,
//       title: 'مجموع ورودی‌ها',
//       value: stats.sumAmountIn,
//       displayValue: formatAmount(stats.sumAmountIn),
//       icon: '💰',
//       color: '#10b981',
//       bgColor: '#d1fae5',
//       change: '+23%',
//       description: 'کل مبالغ واریزی'
//     },
//     {
//       id: 4,
//       title: 'مجموع خروجی‌ها',
//       value: stats.sumAmountOut,
//       displayValue: formatAmount(stats.sumAmountOut),
//       icon: '💸',
//       color: '#ef4444',
//       bgColor: '#fee2e2',
//       change: '+5%',
//       description: 'کل مبالغ برداشتی'
//     },
//     {
//       id: 5,
//       title: 'موجودی فعلی',
//       value: stats.sumAmountIn - stats.sumAmountOut,
//       displayValue: formatAmount(stats.sumAmountIn - stats.sumAmountOut),
//       icon: '💎',
//       color: '#8b5cf6',
//       bgColor: '#ede9fe',
//       change: stats.sumAmountIn - stats.sumAmountOut > 0 ? '+15%' : '-5%',
//       description: 'مانده حساب جاری'
//     },
//     {
//       id: 6,
//       title: 'نرخ ورود به خروج',
//       value: stats.sumAmountOut > 0 ? (stats.sumAmountIn / stats.sumAmountOut * 100).toFixed(1) : 0,
//       displayValue: stats.sumAmountOut > 0 ? `${((stats.sumAmountIn / stats.sumAmountOut) * 100).toFixed(1)}%` : '۰%',
//       icon: '📈',
//       color: '#f59e0b',
//       bgColor: '#fed7aa',
//       change: '+10%',
//       description: 'نسبت ورودی به خروجی'
//     }
//   ];

//   // فعالیت‌های اخیر (از API واقعی می‌توانید دریافت کنید)
//   const recentActivities = [

//   ];

//   if (loading) {
//     return (
//       <div className="dashboard-loading">
//         <div className="spinner"></div>
//         <p>در حال بارگذاری داشبورد...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="dashboard">
//       {/* هدر */}
//       <div className="dashboard-header">
//         <div className="header-title">
//           <h1>داشبورد مدیریت</h1>
//           <p>خلاصه‌ای از فعالیت‌ها و آمار سیستم</p>
//         </div>
//         <div className="header-actions">
//           <button className="refresh-btn" onClick={() => window.location.reload()}>
//             🔄 بروزرسانی
//           </button>
//         </div>
//       </div>

//       {/* خطا */}
//       {error && (
//         <div className="error-alert">
//           <span className="error-icon">⚠️</span>
//           <span>{error}</span>
//           <button onClick={() => window.location.reload()}>تلاش مجدد</button>
//         </div>
//       )}

//       {/* کارت‌های آماری */}
//       <div className="stats-grid">
//         {quickStats.map((stat) => (
//           <div key={stat.id} className="stat-card">
//             <div className="stat-icon" style={{ backgroundColor: stat.bgColor, color: stat.color }}>
//               {stat.icon}
//             </div>
//             <div className="stat-content">
//               <div className="stat-title">{stat.title}</div>
//               <div className="stat-value">{stat.displayValue}</div>
//               <div className="stat-description">{stat.description}</div>
//               <div className="stat-footer">
//                 <span className="stat-change" style={{ color: stat.color }}>
//                   {stat.change}
//                 </span>
//                 <span className="stat-period">نسبت به ماه قبل</span>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* نمودارها و اطلاعات بیشتر */}
//       <div className="dashboard-content">
//         {/* فعالیت‌های اخیر */}
//         <div className="recent-activities-card">
//           <div className="card-header">
//             <h2>فعالیت‌های اخیر</h2>
//             <button className="view-all-btn">مشاهده همه</button>
//           </div>
//           <div className="activities-list">
//             {recentActivities.map((activity, index) => (
//               <div key={activity.id} className="activity-item">
//                 <div className="activity-avatar" style={{
//                   background: `hsl(${index * 72}, 70%, 50%)`
//                 }}>
//                   {activity.avatar}
//                 </div>
//                 <div className="activity-details">
//                   <div className="activity-text">
//                     <strong>{activity.user}</strong> {activity.action}
//                   </div>
//                   <div className="activity-time">{activity.time}</div>
//                 </div>
//                 <div className="activity-status">
//                   <span className={`status-badge status-${activity.type}`}>
//                     {activity.type === 'order' && 'سفارش'}
//                     {activity.type === 'product' && 'محصول'}
//                     {activity.type === 'comment' && 'نظر'}
//                     {activity.type === 'profile' && 'پروفایل'}
//                     {activity.type === 'transaction' && 'تراکنش'}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* اطلاعات کاربر */}
//         <div className="user-info-card">
//           <div className="card-header">
//             <h2>اطلاعات کاربر جاری</h2>
//             <span className="user-role-badge">{user?.role || 'مدیر سیستم'}</span>
//           </div>
//           <div className="user-details">
//             <div className="detail-item">
//               <label>نام کامل:</label>
//               <span>{user?.name || 'نامشخص'}</span>
//             </div>
//             <div className="detail-item">
//               <label>ایمیل:</label>
//               <span>{user?.email || 'نامشخص'}</span>
//             </div>
//             <div className="detail-item">
//               <label>شناسه کاربری:</label>
//               <span>{user?.id || 'نامشخص'}</span>
//             </div>
//             <div className="detail-item">
//               <label>تاریخ عضویت:</label>
//               <span>{user?.joinDate || new Date().toLocaleDateString('fa-IR')}</span>
//             </div>
//             <div className="detail-item">
//               <label>وضعیت:</label>
//               <span className="status-active">فعال</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

// components/dashboard/Dashboard/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { dashboardService } from '../../../services/dashbaord';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    countUser: 0,
    countOP: 0,
    sumAmountIn: 0,
    sumAmountOut: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
console.log(user)
  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await dashboardService.getDashboardStats();
        
        if (response.success) {
          setStats({
            countUser: response.countUser,
            countOP: response.countOP,
            sumAmountIn: response.sumAmountIn,
            sumAmountOut: response.sumAmountOut
          });
        } else {
          setError('خطا در دریافت آمار داشبورد');
        }
      } catch (err) {
        setError('مشکل در ارتباط با سرور');
        console.error('Dashboard error:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
  }, []);

  // فقط فرمت عدد با کاما (بدون تبدیل به میلیون/میلیارد)
  const formatNumber = (num) => {
    if (!num && num !== 0) return '۰';
    return num.toLocaleString('fa-IR');
  };

  const quickStats = [
    {
      id: 1,
      title: 'کاربران سیستم',
      value: stats.countUser,
      displayValue: formatNumber(stats.countUser),
      icon: '👥',
      color: '#4361ee',
      bgColor: '#e8ecff'
    },
    {
      id: 2,
      title: 'عملیات مالی',
      value: stats.countOP,
      displayValue: formatNumber(stats.countOP),
      icon: '📊',
      color: '#3b82f6',
      bgColor: '#dbeafe'
    },
    {
      id: 3,
      title: 'مجموع ورودی‌ها',
      value: stats.sumAmountIn,
      displayValue: `${formatNumber(stats.sumAmountIn)} تومان`,
      icon: '💰',
      color: '#10b981',
      bgColor: '#d1fae5'
    },
    {
      id: 4,
      title: 'مجموع خروجی‌ها',
      value: stats.sumAmountOut,
      displayValue: `${formatNumber(stats.sumAmountOut)} تومان`,
      icon: '💸',
      color: '#ef4444',
      bgColor: '#fee2e2'
    }
  ];

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>در حال بارگذاری داشبورد...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="header-title">
          <h1>داشبورد مدیریت</h1>
          <p>خلاصه‌ای از فعالیت‌ها و آمار سیستم</p>
        </div>
        <div className="header-actions">
          <button className="refresh-btn" onClick={() => window.location.reload()}>
            🔄 بروزرسانی
          </button>
        </div>
      </div>

      {error && (
        <div className="error-alert">
          <span className="error-icon">⚠️</span>
          <span>{error}</span>
          <button onClick={() => window.location.reload()}>تلاش مجدد</button>
        </div>
      )}

      <div className="stats-grid">
        {quickStats.map((stat) => (
          <div key={stat.id} className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: stat.bgColor, color: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-content">
              <div className="stat-title">{stat.title}</div>
              <div className="stat-value">{stat.displayValue}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-content">
        <div className="recent-activities-card">
          <div className="card-header">
            <h2>فعالیت‌های اخیر</h2>
            <button className="view-all-btn">مشاهده همه</button>
          </div>
          {/* <div className="activities-list">
            <div className="activity-item">
              <div className="activity-avatar">ع</div>
              <div className="activity-details">
                <div className="activity-text"><strong>علی محمدی</strong> سفارش جدید ثبت کرد</div>
                <div className="activity-time">۲ دقیقه پیش</div>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-avatar">م</div>
              <div className="activity-details">
                <div className="activity-text"><strong>مریم کریمی</strong> محصول جدید اضافه کرد</div>
                <div className="activity-time">۵ دقیقه پیش</div>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-avatar">ر</div>
              <div className="activity-details">
                <div className="activity-text"><strong>رضا احمدی</strong> نظر جدید ارسال کرد</div>
                <div className="activity-time">۱۰ دقیقه پیش</div>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-avatar">س</div>
              <div className="activity-details">
                <div className="activity-text"><strong>سارا نظری</strong> پروفایل را بروزرسانی کرد</div>
                <div className="activity-time">۱۵ دقیقه پیش</div>
              </div>
            </div>
          </div> */}
        </div>

        <div className="user-info-card">
          <div className="card-header">
            <h2>اطلاعات کاربر</h2>
            <span className="user-role-badge">{user?.role || 'مدیر سیستم'}</span>
          </div>
          <div className="user-details">
            <div className="detail-item">
              <label>نام کامل:</label>
              <span>{user?.username || 'نامشخص'}</span>
            </div>
            <div className="detail-item">
              <label>ایمیل:</label>
              <span>{user?.email || 'نامشخص'}</span>
            </div>
            <div className="detail-item">
              <label>نقش:</label>
              <span>{user?.role || 'مدیر سیستم'}</span>
            </div>
            {/* <div className="detail-item">
              <label>تاریخ عضویت:</label>
              <span>{user?.createdAt || 'نامشخص'}</span>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;