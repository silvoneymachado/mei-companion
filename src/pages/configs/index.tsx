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
// import { useConfig } from "../../contexts/categoryContext";

const Configs: NextApplicationPage<React.FC> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemId, setItemId] = useState(null);
  const router = useRouter();
  // const { configs, getAll, remove, loading } = useConfig();

  // useEffect(() => {
  //   getAll();
  // }, []);

  // const confirmDelete = () => {
  //   remove(itemId);
  //   setIsModalOpen(false);
  //   getAll();
  // };

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
            title="Configurações (Em desenvolvimento)"
            // action={
            //   <Link href="/configs/[pid]" as="/configs/new">
            //     <a>
            //       <IconButton aria-label="addNew">
            //         <AddCircle fontSize="large" />
            //       </IconButton>
            //     </a>
            //   </Link>
            // }
          />
          <CardContent>
            <List>
              {/* {configs?.map((category, index) => (
                <CustomListItem
                  key={index}
                  primaryText={category.name}
                  secondaryText={category.description}
                  description={category.active ? "Ativo" : "Inativo"}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                  id={category.id}
                />
              ))} */}
              {/* {(configs?.length === 0 || !configs) && !loading && (
                <CustomListItem
                  primaryText=""
                  secondaryText="Adicione uma categoria clicando no botão à sua direita"
                  hideActions={true}
                />
              )} */}

              {/* {loading && (
                <CustomListItem
                  primaryText=""
                  secondaryText="Aguarde..."
                  hideActions={true}
                />
              )} */}
            </List>
          </CardContent>
        </Container>
      </Card>
      {/* <Dialog
        contentText="Deseja excluir?"
        title=""
        onConfirm={() => confirmDelete()}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
      /> */}
    </Layout>
  );
};

Configs.auth = true;

export default Configs;
