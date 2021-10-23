import { getDateMonthRange } from "../../util/commonFn";
import { Invoice } from "../../util/models";
import { api } from "../api";

const basePath = "/api/invoice/";

export function addInvoice(data: Invoice): Promise<Invoice> {
  return new Promise((resolve, reject) => {
    try {
      api.post<Invoice>(basePath, data).then((res) => {
        resolve(res.data);
      });
    } catch (error) {
      reject(error);
    }
  });
}

export function updateInvoice(data: Invoice): Promise<Invoice> {
  return new Promise((resolve, reject) => {
    try {
      api.put<Invoice>(basePath, data).then((res) => {
        resolve(res.data);
      });
    } catch (error) {
      reject(error);
    }
  });
}

export function getAllInvoices(): Promise<Invoice[]> {
  return new Promise((resolve, reject) => {
    try {
      api.get<Invoice[]>(basePath).then((res) => {
        resolve(res.data);
      });
    } catch (error) {
      reject(error);
    }
  });
}

export function getInvoiceByDate(date: Date): Promise<Invoice[]> {
  return new Promise((resolve, reject) => {
    const { startDate, endDate } = getDateMonthRange(date);
    try {
      api.get<Invoice[]>(`${basePath}range/startDate/${startDate}/endDate/${endDate}`).then((res) => {
        resolve(res.data);
      });
    } catch (error) {
      reject(error);
    }
  });
}


export function getInvoiceById(id: number): Promise<Invoice> {
  return new Promise((resolve, reject) => {
    try {
      api.get<Invoice>(`${basePath}${id}`).then((res) => {
        resolve(res.data);
      });
    } catch (error) {
      reject(error);
    }
  });
}

export function removeInvoice(id: number): Promise<boolean> {
  return new Promise((resolve, reject) => {
    try {
      api.delete(`${basePath}${id}`).then((res) => {
        if (res.status) {
          resolve(true);
        } else {
          reject();
        }
      });
    } catch (error) {
      reject(error);
    }
  });
}
