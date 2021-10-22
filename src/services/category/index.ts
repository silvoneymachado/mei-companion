import { Category } from "../../util/models";
import { api } from "../api";

const basePath = "/api/category/";

export function addCategory(data: Category): Promise<Category> {
  return new Promise((resolve, reject) => {
    try {
      api.post<Category>(basePath, data).then((res) => {
        resolve(res.data);
      });
    } catch (error) {
      reject(error);
    }
  });
}

export function updateCategory(data: Category): Promise<Category> {
  return new Promise((resolve, reject) => {
    try {
      api.put<Category>(basePath, data).then((res) => {
        resolve(res.data);
      });
    } catch (error) {
      reject(error);
    }
  });
}

export function getAllCategories(): Promise<Category[]> {
  return new Promise((resolve, reject) => {
    try {
      api.get<Category[]>(basePath).then((res) => {
        resolve(res.data);
      });
    } catch (error) {
      reject(error);
    }
  });
}

export function getCategoryById(id: number): Promise<Category> {
  return new Promise((resolve, reject) => {
    try {
      api.get<Category>(`${basePath}${id}`).then((res) => {
        resolve(res.data);
      });
    } catch (error) {
      reject(error);
    }
  });
}

export function removeCategory(id: number): Promise<boolean> {
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
