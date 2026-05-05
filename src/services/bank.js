import { http } from './api';

export const bankService = {
  // دریافت لیست بانک‌ها
  getBanks: async (pageNumber = 1, pageSize = 10, keyValue = '') => {
    try {
      const response = await http.post('/Bank/GetBank', {
        pageSize: pageSize,
        pageNumber: pageNumber,
        id: 0,
        keyValue: keyValue
      });
      console.log(response)
      console.log("++++++++++++++++++++++++++++++++++++++++++++++++++")
      
      // بررسی ساختار پاسخ
      let items = [];
      let totalCount = 0;
        items = response.data.data.items;
           totalCount = response.data.data.totalCount ;
      if (response.data && response.data.data && Array.isArray(response.data.data)) {
        items = response.data.data;
        totalCount = response.data.totalCount || items.length;
      } else if (response.data && Array.isArray(response.data)) {
        items = response.data;
        totalCount = items.length;
      } else if (response.data && response.data.items && Array.isArray(response.data.items)) {
        items = response.data.items;
        totalCount = response.data.totalCount || items.length;
      }
      
// دیباگ کنید:
console.log('totalCount:', totalCount);  // آیا واقعاً 6 است؟
console.log('pageSize:', pageSize);      // آیا واقعاً 5 است؟
console.log('calculated:', Math.ceil(totalCount / pageSize));

      return {
        items: items,
        totalCount: totalCount,
        totalPages:   Math.max(1, Math.ceil(totalCount / pageSize)),// Math.ceil(totalCount / pageSize) || 1,
        currentPage: pageNumber
      };
    } catch (error) {
      console.error('Error in getBanks:', error);
      throw error;
    }
  },

    getCompanyBanks: async (id) => {
    try {
      const response = await http.post('/Bank/GetBankCompanyDtos', {
        pageSize: 100,
        pageNumber: 1,
        id: id,
        keyValue: ''
      });
      console.log(response)
      console.log("++++++++++++++++++++++++++++++++++++++++++++++++++")
      
      // بررسی ساختار پاسخ
      let items = [];
      let totalCount = 0;
        items = response.data.data.items;
           totalCount = response.data.data.totalCount ;

      


      return {
        items: items,
        totalCount: totalCount,
        totalPages:   Math.max(1, Math.ceil(totalCount / 100)),// Math.ceil(totalCount / pageSize) || 1,
        currentPage: 1
      };
    } catch (error) {
      console.error('Error in getBanks:', error);
      throw error;
    }
  },

  // ایجاد بانک جدید
  insertBank: async (bankData) => {
    try {
      const response = await http.post('/Bank/Insert', {
        id: 0,
        name: bankData.name,
        address: bankData.address || '',
        phone: bankData.phone || '',
        desc: bankData.desc || ''
      });
      return response.data;
    } catch (error) {
      console.error('Error in insertBank:', error);
      throw error;
    }
  },

  // ویرایش بانک
  updateBank: async (bankData) => {
    try {
      const response = await http.post('/Bank/Update', {
        id: bankData.id,
        name: bankData.name,
        address: bankData.address || '',
        phone: bankData.phone || '',
        desc: bankData.desc || ''
      });
      return response.data;
    } catch (error) {
      console.error('Error in updateBank:', error);
      throw error;
    }
  },

deleteBank: async (id) => {
  try {
    const response = await http.post('/Bank/Delete', id, {
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
  } catch (error) {
    console.error('Error in deleteBank:', error);
    throw error;
  }
},
// ایجاد بانک جدید
insertAccessBankToComapny: async (bankData, bankId) => {
  try {
    console.log("projectDate:", bankData, "projectId:", bankId);

    // بررسی صحت bankData و وجود companyIds
    if (!bankData || !bankData.companyIds || !Array.isArray(bankData.companyIds)) {
      console.error("❌ bankData.companyIds is not a valid array:", bankData);
      throw new Error("bankData must be an object with companyIds array");
    }

    // استفاده از bankData.companyIds به جای bankData
    const payload = bankData.companyIds.map(id => ({
      companyId: id  // توجه: املای comapanyId را هم بررسی کنید (اشتباه تایپی دارد)
    }));
    
    console.log('🚀 Sending project data:', payload);
    const response = await http.post(`/Bank/InsertOrDeleteBankComapnies?bankId=${bankId}`, payload);
    return response.data;
  } catch (error) {
    console.error('Error in insertBank:', error);
    throw error;
  }
},
};