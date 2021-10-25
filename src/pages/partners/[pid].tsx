import {
  Card,
  CardHeader,
  Container,
  Grid,
  TextField,
  CardActions,
  Button
} from "@mui/material";
import { Form, Formik, Field, FormikProps } from "formik";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Layout from "../../components/layout";
import { NextApplicationPage } from "../../types/types";
import { Partner } from "../../util/models";
import * as Yup from "yup";
import { formatCNPJ } from "../../util/masks";
import { usePartner } from "../../contexts/partnerContext";
import { useAuth } from "../../contexts/authContext";

const Details: NextApplicationPage<React.FC> = () => {
  const router = useRouter();
  const { user} = useAuth();
  const { pid } = router.query;
  const { getById, create, update, loadedPartner } = usePartner();
  let formikRef: FormikProps<Partner>;

  const getId = () =>
    isNaN(parseInt(String(pid)))
      ? null
      : parseInt(String(pid)) === 0
      ? null
      : parseInt(String(pid));

  const formikInitialValues: Partner = {
    id: getId(),
    userId: user?.id,
    name: "",
    cnpj: "",
    corporateName: "",
  };

  useEffect(() => {
    const id = getId();
    if (id) {
      getById(id);
    }
  }, []);

  useEffect(() => {
    const id = getId();
    if (id) {
      formikRef.setValues(loadedPartner);
    }
  }, [loadedPartner]);

  const requiredMessage = "Obrigatório";
  const PartnerValidationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Digite um nome de pelo menos 2 dígitos")
      .required(requiredMessage),
    corporateName: Yup.string()
      .min(2, "Digite um nome de pelo menos 2 dígitos")
      .required(requiredMessage),
    cnpj: Yup.string()
      .max(18, "O CNPJ deve conter 14 dígitos")
      .required(requiredMessage),
  });

  const handleCancel = () => {
    router.back();
  };

  const handleSubmit = (values: Partner) => {
    const data = {
      ...values,
      userId: user?.id,
    };
    if (data.id && data.userId) {
      update(data);
    } else {
      create(data);
    }
  };

  return (
    <Layout>
      <Card sx={{ display: "flex" }}>
        <Container maxWidth="lg">
          <CardHeader
            title={getId() ? "Editar parceiro" : "Adicionar novo parceiro"}
          />
          <Formik
            innerRef={(p) => (formikRef = p)}
            initialValues={formikInitialValues}
            onSubmit={(values) => handleSubmit(values)}
            validationSchema={PartnerValidationSchema}
          >
            {({ values, errors, touched }) => (
              <Form>
                  <Grid container direction="row" spacing={2}>
                    <Grid item xs>
                      <Field
                        as={TextField}
                        fullWidth
                        value={values.name}
                        label="Nome"
                        name="name"
                        error={errors.name && touched.name}
                        helperText={
                          errors.name && touched.name ? errors.name : null
                        }
                      />
                    </Grid>
                    <Grid item sm>
                      <Field
                        as={TextField}
                        fullWidth
                        value={values.corporateName}
                        label="Razão Social"
                        name="corporateName"
                        error={errors.corporateName && touched.corporateName}
                        helperText={
                          errors.corporateName && touched.corporateName
                            ? errors.corporateName
                            : null
                        }
                      />
                    </Grid>
                    <Grid item sm>
                      <Field
                        as={TextField}
                        value={
                          values.cnpj ?? formatCNPJ(values.cnpj).toString()
                        }
                        fullWidth
                        label="CNPJ"
                        name="cnpj"
                        inputProps={{ maxLength: 18, inputMode: "numeric" }}
                        error={errors.cnpj && touched.cnpj}
                        helperText={
                          errors.cnpj && touched.cnpj ? errors.cnpj : null
                        }
                      />
                    </Grid>
                  </Grid>
                <CardActions
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <Button variant="outlined" onClick={handleCancel}>
                    Cancelar
                  </Button>
                  <Button type="submit" variant="contained">
                    {getId() ? "Atualizar" : "Salvar"}
                  </Button>
                </CardActions>
              </Form>
            )}
          </Formik>
        </Container>
      </Card>
    </Layout>
  );
};

Details.auth = true;

export default Details;
