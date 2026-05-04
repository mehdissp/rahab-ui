import { http } from './api';

export const companyService = {
  // دریافت لیست شرکت‌ها با پیجینیشن
  getCompanies: async (pageNumber = 1, pageSize = 10) => {
    try {
        
     
            const response = await http.post('/Company/GetCompany', {
              PageNumber: pageNumber,
              PageSize: pageSize
            });
      
    console.log('Request URL:', response.config.url);
    console.log('Response:', response.data);

      if (response.data.status === 200) {
        return {
          items: response.data.data?.items || [],
          totalCount: response.data.data?.totalCount || 0,
          totalPages: response.data.data?.totalPages || 0,
          checkAccess: true,
          checkAccessDelete: true
        };
      }
      
      throw new Error(response.data.message || 'خطا در دریافت اطلاعات');
    } catch (error) {
      console.error('Error fetching companies:', error);
      throw error;
    }
  },
    getCompanyCombo: async () => {
    try {
        console.log('miyadddddd');
     
            const response = await http.get('/Company/GetCompanyCombo');
   
    console.log('Request URL:', response.config.url);
    console.log('Response:', response.data);

      if (response.data.status === 200) {
              console.log('miyadddddd');
        return {
          items: response.data?.data || [],

        };
      }
      
      throw new Error(response.data.message || 'خطا در دریافت اطلاعات');
    } catch (error) {
      console.error('Error fetching companies:', error);
      throw error;
    }
  },

  // ایجاد شرکت جدید
  createCompany: async (companyData) => {
    try {
      const response = await http.post('/Company/Insert', companyData);
      
      if (response.data.status === 200) {
        return response.data.data;
      }
      
      throw new Error(response.data.message || 'خطا در ایجاد شرکت');
    } catch (error) {
      console.error('Error creating company:', error);
      throw error;
    }
  },

  // ویرایش شرکت - اصلاح شده بر اساس API بک‌اند
  updateCompany: async (id, companyData) => {
    try {
      // بر اساس API بک‌اند که یک ViewModel کامل می‌گیرد
      const updateData = {
        id: id,
        name: companyData.name,
        descriptionRows: companyData.descriptionRows
      };
      
      const response = await http.post('/Company/Update', updateData);
      
      if (response.data.status === 200) {
        return response.data.data;
      }
      
      throw new Error(response.data.message || 'خطا در ویرایش شرکت');
    } catch (error) {
      console.error('Error updating company:', error);
      throw error;
    }
  },

  // حذف شرکت
deleteCompany: async (id) => {
    try {
        const response = await http.post('/Company/Delete', id, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // یا این روش:
        // const response = await http.post('/Company/Delete', JSON.stringify(id));
        
        if (response.data.status === 200) {
            return response.data;
        }
        throw new Error(response.data.message || 'خطا در حذف شرکت');
    } catch (error) {
        console.error('Error deleting company:', error);
        throw error;
    }
},

  // دریافت اطلاعات یک شرکت
  getCompanyById: async (id) => {
    try {
      const response = await http.get(`/Company/GetCompanyById/${id}`);
      
      if (response.data.status === 200) {
        return response.data.data;
      }
      
      throw new Error(response.data.message || 'خطا در دریافت اطلاعات شرکت');
    } catch (error) {
      console.error('Error fetching company:', error);
      throw error;
    }
  }
};