import React from "react";
import { CategoryProvider } from "./categoryContext";
import { ConfigProvider } from "./configContext";
import { ExpenseProvider } from "./expenseContext";
import { InvoiceProvider } from "./invoiceContext";
import { PartnerProvider } from "./partnerContext";
import { UserProvider } from "./userContext";

// import { Container } from './styles';

const RootProvider: React.FC = ({ children }) => {
  return (
    <UserProvider>
      <ConfigProvider>
        <PartnerProvider>
          <InvoiceProvider>
            <CategoryProvider>
              <ExpenseProvider>{children}</ExpenseProvider>
            </CategoryProvider>
          </InvoiceProvider>
        </PartnerProvider>
      </ConfigProvider>
    </UserProvider>
  );
};

export default RootProvider;
