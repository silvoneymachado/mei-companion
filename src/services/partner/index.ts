import { Partner } from "../../util/models";
import { api } from "../api";

const basePath = "/api/partner/";

export function addPartner(data: Partner): Promise<Partner> {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await api.post<Partner>(basePath, data);

      resolve(res.data);
    } catch (error) {
      reject(error);
    }
  });
}

export function updatePartner(data: Partner): Promise<Partner> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await api.put<Partner>(basePath, data);
  
        resolve(res.data);
      } catch (error) {
        reject(error);
      }
    });
  }

export function getAllPartners(): Promise<Partner[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await api.get<Partner[]>(basePath);
  
        resolve(res.data);
      } catch (error) {
        reject(error);
      }
    });
  }

export function getPartnerById(id: number): Promise<Partner> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await api.get<Partner>(`${basePath}${id}`);
  
        resolve(res.data);
      } catch (error) {
        reject(error);
      }
    });
  }

export function removePartner(id: number): Promise<boolean> {
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
