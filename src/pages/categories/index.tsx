import { AddCircle } from "@mui/icons-material";
import { Card, CardHeader, Container, IconButton, List } from "@mui/material";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import CustomListItem from "../../components/customListItem";
import Layout from "../../components/layout";
import { NextApplicationPage } from "../../types/types";
import Dialog from "../../components/dialog";
import { useRouter } from "next/router";
import { useCategory } from "../../contexts/categoryContext";
import { Category } from "../../util/models";
import { encodeObj } from "../../util/masks";

const Categories: NextApplicationPage<React.FC> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemId, setItemId] = useState(null);
  const router = useRouter();
  const { categories, getAll, remove, loading } = useCategory();

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

  const handleEdit = (category: Category) => {
    router.push({pathname: `/categories/${category.id}`, query: {data: encodeObj<Category>(category)}});
  };

  return (
    <Layout>
      <Card sx={{ display: "flex" }}>
        <Container maxWidth="lg">
          <CardHeader
            title="Categorias"
            action={
              <Link href="/categories/[pid]" as="/categories/new">
                <a>
                  <IconButton aria-label="addNew">
                    <AddCircle fontSize="large" />
                  </IconButton>
                </a>
              </Link>
            }
          />

          <List>
            {categories?.map((category, index) => (
              <CustomListItem
                key={index}
                primaryText={category.name}
                secondaryText={category.description}
                description={category.active ? "Ativo" : "Inativo"}
                onDelete={handleDelete}
                onEdit={() => handleEdit(category)}
                id={category.id}
              />
            ))}
            {(categories?.length === 0 || !categories) && !loading && (
              <CustomListItem
                primaryText=""
                secondaryText="Adicione uma categoria clicando no botão +"
                hideActions
              />
            )}

            {loading && (
              <CustomListItem
                primaryText=""
                secondaryText="Aguarde..."
                hideActions
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

Categories.auth = true;

export default Categories;
