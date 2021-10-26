import { AddCircle } from "@mui/icons-material";
import { Card, CardHeader, Container, IconButton, List } from "@mui/material";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import CustomListItem from "../../components/customListItem";
import Layout from "../../components/layout";
import { NextApplicationPage } from "../../types/types";
import Dialog from "../../components/dialog";
import { useRouter } from "next/router";
import { usePartner } from "../../contexts/partnerContext";
import { Partner } from "../../util/models";
import { encodeObj } from "../../util/masks";

const Partners: NextApplicationPage<React.FC> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemId, setItemId] = useState(null);
  const router = useRouter();
  const { partners, getAll, remove, loading } = usePartner();

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

  const handleEdit = (partner: Partner) => {
    router.push({pathname: `/partners/${partner.id}`, query: {data: encodeObj<Partner>(partner)}});
  };

  return (
    <Layout>
      <Card sx={{ display: "flex" }}>
        <Container maxWidth="lg">
          <CardHeader
            title="Parceiros"
            action={
              <Link href="/partners/[pid]" as="/partners/new">
                <a>
                  <IconButton aria-label="addNew">
                    <AddCircle fontSize="large" />
                  </IconButton>
                </a>
              </Link>
            }
          />

          <List>
            {partners?.map((partner, index) => (
              <CustomListItem
                key={index}
                primaryText={partner.corporateName}
                secondaryText={partner.name}
                description={partner.cnpj}
                onDelete={handleDelete}
                onEdit={() => handleEdit(partner)}
                id={partner.id}
              />
            ))}
            {(partners?.length === 0 || !partners) && !loading && (
              <CustomListItem
                primaryText=""
                secondaryText="Adicione um parceiro clicando no botão +"
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

Partners.auth = true;

export default Partners;
