import { getDateMonthRange } from "../../util/commonFn";
import { Expense } from "../../util/models";
import { api } from "../api";

const basePath = "/api/expense/";

export function addExpense(data: Expense): Promise<Expense> {
  return new Promise((resolve, reject) => {
    try {
      api.post<Expense>(basePath, data).then((res) => {
        resolve(res.data);
      });
    } catch (error) {
      reject(error);
    }
  });
}

export function updateExpense(data: Expense): Promise<Expense> {
  return new Promise((resolve, reject) => {
    try {
      api.put<Expense>(basePath, data).then((res) => {
        resolve(res.data);
      });
    } catch (error) {
      reject(error);
    }
  });
}

export function getAllExpenses(): Promise<Expense[]> {
  return new Promise((resolve, reject) => {
    try {
      api.get<Expense[]>(basePath).then((res) => {
        resolve(res.data);
      });
    } catch (error) {
      reject(error);
    }
  });
}

export function getExpenseByDate(date: Date): Promise<Expense[]> {
  return new Promise((resolve, reject) => {
    const { startDate, endDate } = getDateMonthRange(date);
    try {
      api.get<Expense[]>(`${basePath}range/startDate/${startDate}/endDate/${endDate}`).then((res) => {
        resolve(res.data);
      });
    } catch (error) {
      reject(error);
    }
  });
}

export function getExpenseById(id: number): Promise<Expense> {
  return new Promise((resolve, reject) => {
    try {
      api.get<Expense>(`${basePath}${id}`).then((res) => {
        resolve(res.data);
      });
    } catch (error) {
      reject(error);
    }
  });
}

export function removeExpense(id: number): Promise<boolean> {
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
