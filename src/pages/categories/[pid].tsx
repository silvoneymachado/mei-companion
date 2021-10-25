import {
  Card,
  CardHeader,
  Container,
  Grid,
  TextField,
  CardActions,
  Button,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { Form, Formik, Field, FormikProps } from "formik";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Layout from "../../components/layout";
import { NextApplicationPage } from "../../types/types";
import { Category } from "../../util/models";
import * as Yup from "yup";
import { useCategory } from "../../contexts/categoryContext";
import { useAuth } from "../../contexts/authContext";

const Details: NextApplicationPage<React.FC> = () => {
  const router = useRouter();
  const { user} = useAuth();
  const { pid } = router.query;
  const { getById, create, update, loadedCategory } = useCategory();
  let formikRef: FormikProps<Category>;

  const getId = () =>
    isNaN(parseInt(String(pid)))
      ? null
      : parseInt(String(pid)) === 0
      ? null
      : parseInt(String(pid));

  const formikInitialValues: Category = {
    id: getId(),
    userId: user?.id,
    name: "",
    description: "",
    active: true,
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
      formikRef.setValues(loadedCategory);
    }
  }, [loadedCategory]);

  const requiredMessage = "Obrigatório";
  const SignUpValidationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Digite um nome de pelo menos 2 dígitos")
      .required(requiredMessage),
  });

  const handleCancel = () => {
    router.back();
  };

  const handleSubmit = (values: Category) => {
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
            title={getId() ? "Editar categoria" : "Adicionar nova categoria"}
          />
          <Formik
            innerRef={(p) => (formikRef = p)}
            initialValues={formikInitialValues}
            onSubmit={(values) => handleSubmit(values)}
            validationSchema={SignUpValidationSchema}
          >
            {({ values, errors, touched }) => (
              <Form>
                <Grid container direction="row" spacing={2}>
                  <Grid item sm>
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
                      value={values.description}
                      label="Descrição"
                      name="description"
                      error={errors.description && touched.description}
                      helperText={
                        errors.description && touched.description
                          ? errors.description
                          : null
                      }
                    />
                  </Grid>
                  <Grid item xl>
                    <Field
                      as={FormControlLabel}
                      label="Ativo"
                      control={
                        <Switch
                          name="active"
                          value={values.active}
                          checked={values.active}
                        />
                      }
                      error={errors.active && touched.active}
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
