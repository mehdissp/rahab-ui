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
      
      return {
        items: items,
        totalCount: totalCount,
        totalPages: Math.ceil(totalCount / pageSize) || 1,
        currentPage: pageNumber
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

  // حذف بانک
  deleteBank: async (id) => {
    try {
      const response = await http.post('/Bank/Delete', {
        id: id
      });
      return response.data;
    } catch (error) {
      console.error('Error in deleteBank:', error);
      throw error;
    }
  }
};