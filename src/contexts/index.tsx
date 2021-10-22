import React from "react";
import { CategoryProvider } from "./categoryContext";
import { ExpenseProvider } from "./expenseContext";
import { InvoiceProvider } from "./invoiceContext";
import { PartnerProvider } from "./partnerContext";

// import { Container } from './styles';

const RootProvider: React.FC = ({ children }) => {
  return (
    <PartnerProvider>
      <InvoiceProvider>
        <CategoryProvider>
          <ExpenseProvider>{children}</ExpenseProvider>
        </CategoryProvider>
      </InvoiceProvider>
    </PartnerProvider>
  );
};

export default RootProvider;
