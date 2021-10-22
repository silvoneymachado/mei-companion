import { Partner } from "../../util/models";
import { api } from "../api";

const basePath = "/api/partner/";

export function addPartner(data: Partner): Promise<Partner> {
  return new Promise((resolve, reject) => {
    try {
      api.post<Partner>(basePath, data).then((res) => {
        resolve(res.data);
      });
    } catch (error) {
      reject(error);
    }
  });
}

export function updatePartner(data: Partner): Promise<Partner> {
  return new Promise((resolve, reject) => {
    try {
      api.put<Partner>(basePath, data).then((res) => {
        resolve(res.data);
      });
    } catch (error) {
      reject(error);
    }
  });
}

export function getAllPartners(): Promise<Partner[]> {
  return new Promise((resolve, reject) => {
    try {
      api.get<Partner[]>(basePath).then((res) => {
        resolve(res.data);
      });
    } catch (error) {
      reject(error);
    }
  });
}

export function getPartnerById(id: number): Promise<Partner> {
  return new Promise((resolve, reject) => {
    try {
      api.get<Partner>(`${basePath}${id}`).then((res) => {
        resolve(res.data);
      });
    } catch (error) {
      reject(error);
    }
  });
}

export function removePartner(id: number): Promise<boolean> {
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
