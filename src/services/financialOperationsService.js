// import { http } from './api';

// export const financialOperationsService = {
//   // دریافت لیست بانک‌ها
//   getBanks: async (pageNumber = 1, pageSize = 10, keyValue = '') => {
//     try {
//       const response = await http.post('/FinancialOperations/FinancialOperationsDtos', {
//         pageSize: pageSize,
//         pageNumber: pageNumber,
//         id: 0,
//         keyValue: keyValue
//       });
//       console.log(response)
//       console.log("++++++++++++++++++++++++++++++++++++++++++++++++++")
      
//       // بررسی ساختار پاسخ
//       let items = [];
//       let totalCount = 0;
//         items = response.data.data.items;
//            totalCount = response.data.data.totalCount ;
//       if (response.data && response.data.data && Array.isArray(response.data.data)) {
//         items = response.data.data;
//         totalCount = response.data.totalCount || items.length;
//       } else if (response.data && Array.isArray(response.data)) {
//         items = response.data;
//         totalCount = items.length;
//       } else if (response.data && response.data.items && Array.isArray(response.data.items)) {
//         items = response.data.items;
//         totalCount = response.data.totalCount || items.length;
//       }
      
// // دیباگ کنید:
// console.log('totalCount:', totalCount);  // آیا واقعاً 6 است؟
// console.log('pageSize:', pageSize);      // آیا واقعاً 5 است؟
// console.log('calculated:', Math.ceil(totalCount / pageSize));

//       return {
//         items: items,
//         totalCount: totalCount,
//         totalPages:   Math.max(1, Math.ceil(totalCount / pageSize)),// Math.ceil(totalCount / pageSize) || 1,
//         currentPage: pageNumber
//       };
//     } catch (error) {
//       console.error('Error in getBanks:', error);
//       throw error;
//     }
//   },


// };
import { http } from './api';

export const financialOperationsService = {
  // دریافت لیست عملیات مالی
  getFinancialOperations: async (pageNumber = 1, pageSize = 10, filters = {}) => {
    console.log(filters)
    try {
      // const response = await http.post('/FinancialOperations/FinancialOperationsDtos', {
      //   pageSize: pageSize,
      //   pageNumber: pageNumber,
      //   id: 0,
      //   keyValue: filters.searchTerm || '',
      //   projectId:filters.projectId,
      //   bankId:filters.bankId
      // });
      const requestBody = {
    pageSize: pageSize,
    pageNumber: pageNumber,
    id: 0,
    keyValue: filters.searchTerm || '',
};

// فقط درصورتی که مقدار دارند اضافه کن
if (filters.projectId !== null && filters.projectId !== undefined && filters.projectId !== '') {
    requestBody.projectId = Number(filters.projectId);
}
if (filters.bankId !== null && filters.bankId !== undefined && filters.bankId !== '') {
    requestBody.bankId = Number(filters.bankId);
}

const response = await http.post('/FinancialOperations/FinancialOperationsDtos', requestBody);
      
      let items = [];
      let totalCount = 0;
      
      if (response.data && response.data.data && response.data.data.items) {
        items = response.data.data.items;
        totalCount = response.data.data.totalCount;
      } else if (response.data && response.data.items) {
        items = response.data.items;
        totalCount = response.data.totalCount;
      } else if (Array.isArray(response.data)) {
        items = response.data;
        totalCount = items.length;
      }
      
      return {
        items: items,
        totalCount: totalCount,
        totalPages: Math.max(1, Math.ceil(totalCount / pageSize)),
        currentPage: pageNumber
      };
    } catch (error) {
      console.error('Error in getFinancialOperations:', error);
      throw error;
    }
  },

  // دریافت یک عملیات مالی
  getFinancialOperationById: async (id) => {
    try {
      const response = await http.get(`/FinancialOperations/${id}`);
      return response.data?.data;
    } catch (error) {
      console.error('Error in getFinancialOperationById:', error);
      throw error;
    }
  },

  // ایجاد عملیات مالی جدید
  createFinancialOperation: async (data) => {
    console.log("insertttttttttttttttttttt",data)
    try {
      const response = await http.post('/FinancialOperations/InsertFinancialOperations', data);
      return response.data?.data;
    } catch (error) {
      console.error('Error in createFinancialOperation:', error);
      throw error;
    }
  },

  // ویرایش عملیات مالی
  updateFinancialOperation: async (id, data) => {
    try {
      const response = await http.put(`/FinancialOperations/${id}`, data);
      return response.data?.data;
    } catch (error) {
      console.error('Error in updateFinancialOperation:', error);
      throw error;
    }
  },

  // حذف عملیات مالی
  deleteFinancialOperation: async (id) => {
    try {
      const response = await http.post(`/FinancialOperations/DeleteFinancialOperations`,id);
      return response.data;
    } catch (error) {
      console.error('Error in deleteFinancialOperation:', error);
      throw error;
    }
  },
  getComboCompany: async () => {
  try {
    console.log("miayad company")
    const response = await http.post('/FinancialOperations/GetComboCompany', {
      headers: { 'Content-Type': 'application/json' }
    });
    console.log("خروجی",response.data)
    return response.data;
  } catch (error) {
    console.error('Error in deleteBank:', error);
    throw error;
  }
},
  getComboBank: async (id) => {
  try {
    const response = await http.post('/FinancialOperations/GetComboBank',id, {
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
  } catch (error) {
    console.error('Error in deleteBank:', error);
    throw error;
  }
},
  getComboProject: async (id) => {
  try {
    const response = await http.post('/FinancialOperations/GetComboProject',id, {
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
  } catch (error) {
    console.error('Error in deleteBank:', error);
    throw error;
  }
},

  // دریافت لیست حساب‌های مالی والد (برای کامبو والد)
  getComboParentFinancial: async (id, financialTransactionType) => {
    try {
      const response = await http.post('/FinancialOperations/GetComboFinancialsAsync', {
        id: id,
        financialTransactionType: financialTransactionType
      });
      console.log("ffffffffffffffff",response.data)
      return response.data;
    } catch (error) {
      console.error('Error in getComboParentFinancial:', error);
      throw error;
    }
  },
    getAccountSideCombo: async (id=0) => {
  try {
    console.log("miayad GetAccountSideCombo")
    const response = await http.post('/FinancialOperations/GetAccountSideCombo',id, {
      headers: { 'Content-Type': 'application/json' }
    });
    console.log("خروجی",response.data)
    return response.data;
  } catch (error) {
    console.error('Error in deleteBank:', error);
    throw error;
  }
},
};