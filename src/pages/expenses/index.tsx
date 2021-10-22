import { AddCircle } from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardHeader,
  Container,
  IconButton,
  List,
  TextField,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import CustomListItem from "../../components/customListItem";
import Layout from "../../components/layout";
import { NextApplicationPage } from "../../types/types";
import Dialog from "../../components/dialog";
import { useRouter } from "next/router";
import { useExpense } from "../../contexts/expenseContext";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

const Expenses: NextApplicationPage<React.FC> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemId, setItemId] = useState(null);
  const router = useRouter();
  const { expenses, getByDate, remove, loading } = useExpense();
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    getByDate(selectedDate);
  }, []);

  const confirmDelete = () => {
    remove(itemId);
    setIsModalOpen(false);
    getByDate(selectedDate);
  };

  const handleDelete = (id: number) => {
    setItemId(id);
    setIsModalOpen(true);
  };

  const handleEdit = (id: number) => {
    router.push(`/expenses/${id}`);
  };

  const handleChangeDate = (date: Date) => {
    setSelectedDate(date);
    getByDate(date);
  };

  return (
    <Layout>
      <Card sx={{ display: "flex" }}>
        <Container maxWidth="lg">
          <CardHeader
            title="Despesas"
            action={
              <>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    views={["year", "month"]}
                    label="Year and Month"
                    value={selectedDate}
                    onChange={(newValue) => {
                      handleChangeDate(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField {...params} helperText={null} />
                    )}
                  />
                </LocalizationProvider>
                <Link href="/expenses/[pid]" as="/expenses/new">
                  <a>
                    <IconButton aria-label="addNew">
                      <AddCircle />
                    </IconButton>
                  </a>
                </Link>
              </>
            }
          />
          <CardContent>
            <List>
              {expenses?.map((expense, index) => (
                <CustomListItem
                  key={index}
                  primaryText={expense.notes}
                  secondaryText={new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(expense.value))}
                  description={new Intl.DateTimeFormat("pt-BR").format(
                    new Date(expense.paymentDate)
                  )}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                  id={expense.id}
                />
              ))}
              {(expenses?.length === 0 || !expenses) && !loading && (
                <CustomListItem
                  primaryText=""
                  secondaryText="Registre uma nova despesa clicando no botão à sua direita"
                  hideActions={true}
                />
              )}

              {loading && (
                <CustomListItem
                  primaryText=""
                  secondaryText="Aguarde..."
                  hideActions={true}
                />
              )}
            </List>
          </CardContent>
        </Container>
      </Card>
      <Dialog
        contentText="Deseja excluir?"
        title=""
        onConfirm={() => confirmDelete()}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
      />
    </Layout>
  );
};

Expenses.auth = true;

export default Expenses;
