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
import { Config } from "../../util/models";
import * as Yup from "yup";
import { useConfig } from "../../contexts/configContext";
import { useAuth } from "../../contexts/authContext";

const Details: NextApplicationPage<React.FC> = () => {
  const router = useRouter();
  const { user} = useAuth();
  const { pid } = router.query;
  const { getById, create, update, loadedConfig } = useConfig();
  let formikRef: FormikProps<Config>;

  const getId = () =>
    isNaN(Number(pid))
      ? null
      : Number(pid);

  const formikInitialValues: Config = {
    id: getId(),
    userId: user?.id,
    name: "",
    value: 0,
    active: true,
  };

  useEffect(() => {
    const id = getId();
    if (id || id === 0) {
      getById(id);
    }
  }, []);

  useEffect(() => {
    const id = getId();
    if (id || id === 0) {
      formikRef.setValues(loadedConfig);
    }
  }, [loadedConfig]);

  const requiredMessage = "Obrigatório";
  const SignUpValidationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Digite um nome de pelo menos 2 dígitos")
      .required(requiredMessage),
  });

  const handleCancel = () => {
    router.back();
  };

  const handleSubmit = (values: Config) => {
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
            title={
              getId() ? "Editar configuração" : "Adicionar nova configuração"
            }
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
                      value={String(values.value)}
                      label="Valor"
                      name="value"
                      inputProps={{ inputMode: "numeric" }}
                      error={errors.value && touched.value}
                      helperText={
                        errors.value && touched.value ? errors.value : null
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
