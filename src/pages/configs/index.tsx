import { AddCircle } from "@mui/icons-material";
import { Card, CardHeader, Container, IconButton, List } from "@mui/material";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import CustomListItem from "../../components/customListItem";
import Layout from "../../components/layout";
import { NextApplicationPage } from "../../types/types";
import Dialog from "../../components/dialog";
import { useRouter } from "next/router";
import { useConfig } from "../../contexts/configContext";

const Configs: NextApplicationPage<React.FC> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemId, setItemId] = useState(null);
  const router = useRouter();
  const { configs, getAll, remove, loading } = useConfig();

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
    router.push(`/configs/${id}`);
  };

  return (
    <Layout>
      <Card sx={{ display: "flex" }}>
        <Container maxWidth="lg">
          <CardHeader
            title="Configurações"
            action={
              <Link href="/configs/[pid]" as="/configs/new">
                <a>
                  <IconButton aria-label="addNew">
                    <AddCircle fontSize="large" />
                  </IconButton>
                </a>
              </Link>
            }
          />

          <List>
            {configs?.map((config, index) => (
              <CustomListItem
                key={index}
                primaryText={config.name}
                secondaryText={config.active ? "Ativo" : "Inativo"}
                description={config.value > 0 ? new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(Number(config.value)) : ''}
                onDelete={handleDelete}
                onEdit={handleEdit}
                id={config.id}
              />
            ))}
            {(configs?.length === 0 || !configs) && !loading && (
              <CustomListItem
                primaryText=""
                secondaryText="Adicione uma categoria clicando no botão +"
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

Configs.auth = true;

export default Configs;
