// services/documentsPayable.js
import {http} from './api'; // مسیر api شما

export const documentsPayableService = {
  // دریافت اسناد ورودی
  getIncomingDocuments: async (id,pageNumber = 1, pageSize = 10, search = '') => {
    console.log(id)
    const response = await http.post('/Cheques/ChequesDtosAsync', {
       
        pageNumber,
        pageSize,
        keyValue: search || undefined,
        id:id
      
    });
    return response.data.data;
  },

  // دریافت اسناد خروجی
  getOutgoingDocuments: async (id,pageNumber = 1, pageSize = 10, search = '') => {
    const response = await http.get('/Cheques/ChequesDtosAsync', {
      params: {
        pageNumber,
        pageSize,
        search: search || undefined
      }
    });
    return response.data.data;
  },
  

  resultCheque: async (chequeData) => {
    try {
      const response = await http.post('/Cheques/ResultChequesAsync', chequeData);
      console.log(response)
      if (response.data.status === 200) {
        return response;
      }
      
      throw new Error(response.data.message || 'خطا در ثبت وضعیت چک ');
    } catch (error) {
      console.error('Error creating company:', error);
      throw error;
    }
  },
};