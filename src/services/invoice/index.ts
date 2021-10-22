import { Invoice } from "../../util/models";
import { api } from "../api";

const basePath = "/api/invoice/";

export function addInvoice(data: Invoice): Promise<Invoice> {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await api.post<Invoice>(basePath, data);

      resolve(res.data);
    } catch (error) {
      reject(error);
    }
  });
}

export function updateInvoice(data: Invoice): Promise<Invoice> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await api.put<Invoice>(basePath, data);
  
        resolve(res.data);
      } catch (error) {
        reject(error);
      }
    });
  }

export function getAllInvoices(): Promise<Invoice[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await api.get<Invoice[]>(basePath);
  
        resolve(res.data);
      } catch (error) {
        reject(error);
      }
    });
  }

export function getInvoiceById(id: number): Promise<Invoice> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await api.get<Invoice>(`${basePath}${id}`);
  
        resolve(res.data);
      } catch (error) {
        reject(error);
      }
    });
  }

export function removeInvoice(id: number): Promise<boolean> {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await api.delete(`${basePath}${id}`);

      if (res.status) {
        resolve(true);
      } else {
        reject();
      }
    } catch (error) {
      reject(error);
    }
  });
}
