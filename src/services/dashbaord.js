// import { http } from './api';

// export const dashbaordService = {
//   getdashbaord: async () => {
//     try {
//       const response = await http.get('/Dashbaord/GetDashboardsDtosAsync');
//       console.log('Full response:', response);
      
//       // اصلاح مسیر دسترسی به دیتا
//       // طبق لاگ شما، داده در response.data.data قرار دارد
//       const dashboardData = response.data?.data || response.data;
      
//       console.log('Dashboard data:', dashboardData);
      
//       // برگرداندن مستقیم دیتای داشبورد
//       return {
//         countUser: dashboardData?.countUser || 0,
//         countOP: dashboardData?.countOP || 0,
//         sumAmountIn: dashboardData?.sumAmountIn || 0,
//         sumAmountOut: dashboardData?.sumAmountOut || 0
//       };
      
//     } catch (error) {
//       console.error('Error in getdashbaord:', error);
//       throw error;
//     }
//   },
// };
// services/dashboardService.js
import { http } from './api';

export const dashboardService = {
  getDashboardStats: async () => {
    try {
      const response = await http.get('/Dashbaord/GetDashboardsDtosAsync');
      
      if (response.data?.status === 200 || response.status === 200) {
        // استخراج داده از ساختار پاسخ
        const data = response.data?.data || response.data;
        
        return {
          countUser: data?.countUser || 0,
          countOP: data?.countOP || 0,
          sumAmountIn: data?.sumAmountIn || 0,
          sumAmountOut: data?.sumAmountOut || 0,
          success: true
        };
      }
      
      throw new Error('خطا در دریافت آمار');
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      return {
        countUser: 0,
        countOP: 0,
        sumAmountIn: 0,
        sumAmountOut: 0,
        success: false,
        error: error.message
      };
    }
  }
};