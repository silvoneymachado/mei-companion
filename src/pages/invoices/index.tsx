import { AddCircle } from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardHeader,
  Container,
  IconButton,
  List,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import CustomListItem from "../../components/customListItem";
import Layout from "../../components/layout";
import { NextApplicationPage } from "../../types/types";
import Dialog from "../../components/dialog";
import { useRouter } from "next/router";
import { useInvoice } from "../../contexts/invoiceContext";

const Invoices: NextApplicationPage<React.FC> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemId, setItemId] = useState(null);
  const router = useRouter();
  const { invoices, getAll, remove, loading } = useInvoice();

  useEffect(() => {
    getAll();
  }, []);

  const confirmDelete = () => {
    remove(itemId);
    setIsModalOpen(false);
    getAll();
  };

  const handleDelete = (id: number) => {
    setItemId(id);
    setIsModalOpen(true);
  };

  const handleEdit = (id: number) => {
    router.push(`/invoices/${id}`);
  };

  return (
    <Layout>
      <Card sx={{ display: "flex" }}>
        <Container maxWidth="lg">
          <CardHeader
            title="Lançamentos"
            action={
              <Link href="/invoices/[pid]" as="/invoices/new">
                <a>
                  <IconButton aria-label="addNew">
                    <AddCircle fontSize="large" />
                  </IconButton>
                </a>
              </Link>
            }
          />
          <CardContent>
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
                  secondaryText="Registre uma nova nota fiscal clicando no botão à sua direita"
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

Invoices.auth = true;

export default Invoices;
