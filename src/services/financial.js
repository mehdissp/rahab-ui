// services/financial.js
import { http } from './api';

export const financialService = {
  // دریافت لیست درختی
  getFinancialItems: async (pageNumber = 1, pageSize = 10) => {
    try {

                const response = await http.post('/Financial/GetFinancialDtos', {
              PageNumber: pageNumber,
              PageSize: pageSize
            });
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  // ایجاد آیتم جدید
  createFinancialItem: async (data) => {
    console.log(data)
    const response = await http.post('/Financial/InsertFinancial', data);
    return response.data;
  },

  // ویرایش آیتم
  updateFinancialItem: async (id, data) => {
    console.log(data);
    const updatedData = { ...data, id }; 
        console.log(updatedData);
    const response = await http.post(`/financial/UpdateFinancial`, updatedData);
    return response.data;
  },

  // حذف آیتم
deleteFinancialItem: async (id) => {
    const response = await http.post(`/financial/DeleteFinancial`, { Id: id });
    return response.data;
},
  // تخصیص به شرکت
  assignToCompany: async (financialId, companyIds) => {
    const response = await http.post(`/financial/${financialId}/companies`, { companyIds });
    return response.data;
  },

  // دریافت شرکت‌های تخصیص داده شده
  getAssignedCompanies: async (financialId) => {
    const response = await http.get(`/financial/${financialId}/companies`);
    return response.data;
  }
};