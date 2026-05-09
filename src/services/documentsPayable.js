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
  }
};