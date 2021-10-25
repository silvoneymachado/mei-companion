import { AddCircle } from "@mui/icons-material";
import {
  Card,
  CardHeader,
  Container,
  Grid,
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
import { useInvoice } from "../../contexts/invoiceContext";
import { LocalizationProvider, DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

const Invoices: NextApplicationPage<React.FC> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemId, setItemId] = useState(null);
  const router = useRouter();
  const { invoices, getByDate, remove, loading } = useInvoice();
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
    router.push(`/invoices/${id}`);
  };

  const handleChangeDate = (date: Date) => {
    setSelectedDate(date);
    getByDate(date);
  };

  return (
    <Layout>
      <Card sx={{ display: "flex" }}>
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid item flexGrow={1}>
              <CardHeader title="Lançamentos" />
            </Grid>
            <Grid item>
              <Grid container spacing={2} flexDirection="row">
                <Grid item marginTop={0.5}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      views={["year", "month"]}
                      label="Year and Month"
                      value={selectedDate}
                      onChange={() => ({})}
                      onMonthChange={(newValue) => {
                        handleChangeDate(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} helperText={null} />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item>
                  <Link href="/invoices/[pid]" as="/invoices/new">
                    <a>
                      <IconButton aria-label="addNew">
                        <AddCircle fontSize="large" />
                      </IconButton>
                    </a>
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <List>
            {invoices?.map((invoice, index) => (
              <CustomListItem
                key={index}
                primaryText={invoice.notes}
                secondaryText={new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(parseFloat(invoice.value))}
                description={String(invoice.invoiceNumber)}
                onDelete={handleDelete}
                onEdit={handleEdit}
                id={invoice.id}
              />
            ))}
            {(invoices?.length === 0 || !invoices) && !loading && (
              <CustomListItem
                primaryText=""
                secondaryText="Registre uma nova nota fiscal clicando no botão +"
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

Invoices.auth = true;

export default Invoices;
