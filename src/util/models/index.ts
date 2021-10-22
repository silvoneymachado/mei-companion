export type User = {
    id?: number
    name: string
    email: string
    cnpj: string
    corporateName?: string
    phoneNumber: string
    password: string
  }
  
  /**
   * Model Partner
   */
  
  export type Partner = {
    id?: number
    userId?: number
    name: string
    cnpj: string
    corporateName: string
  }
  
  /**
   * Model Invoice
   */
  
  export type Invoice = {
    id?: number
    userId?: number
    partnerId?: number
    invoiceNumber: number
    value: string
    notes?: string
  }
  
  /**
   * Model Expense
   */
  
  export type Expense = {
    id?: number
    userId: number
    name: string
    value: number
    notes?: string
    paymentDate: Date
    referenceDate: Date
    createdAt: Date
    updatedAt: Date
  }
  
  /**
   * Model Config
   */
  
  export type Config = {
    id: number
    userId: number
    name: string
    value: number
    active: boolean
  }
  
  /**
   * Model Category
   */
  
  export type Category = {
    id: number
    userId: number
    name: string
    description: string
    active: boolean
  }
  