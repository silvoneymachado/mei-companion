import {
  Card,
  CardHeader,
  Container,
  Grid,
  TextField,
  CardActions,
  Button,
} from "@mui/material";
import { Form, Formik, Field, FormikProps } from "formik";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Layout from "../../components/layout";
import { NextApplicationPage } from "../../types/types";
import { User } from "../../util/models";
import * as Yup from "yup";
import { formatCNPJ, formatPhoneNumber } from "../../util/masks";
import { useUser } from "../../contexts/userContext";

const Details: NextApplicationPage<React.FC> = () => {
  const router = useRouter();
  const { update, loadedUser } = useUser();
  let formikRef: FormikProps<User>;

  const formikInitialValues: User = {
    id: null,
    name: "",
    cnpj: "",
    corporateName: "",
    email: "",
    phoneNumber: "",
  };

  useEffect(() => {
    if (loadedUser) {
      formikRef.setValues(loadedUser);
    }
  }, [loadedUser]);

  const requiredMessage = "Obrigatório";
  const SignUpValidationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Digite um nome de pelo menos 2 dígitos")
      .required(requiredMessage),
    email: Yup.string().email("Email inválido").required(requiredMessage),
    cnpj: Yup.string()
      .max(18, "O CNPJ deve conter 14 dígitos")
      .required(requiredMessage),
    phoneNumber: Yup.string().max(
      14,
      "O telefone não pode ultrapassar 11 digitos"
    ),
    password: Yup.string().required(requiredMessage),
  });

  const handleCancel = () => {
    router.back();
  };

  const handleSubmit = (values: User) => {
    update(values);
  };

  return (
    <Layout>
      <Card sx={{ display: "flex" }}>
        <Container maxWidth="lg">
          <CardHeader title={"Perfil"} />
          <Formik
            innerRef={(p) => (formikRef = p)}
            initialValues={formikInitialValues}
            onSubmit={(values) => handleSubmit(values)}
            validationSchema={SignUpValidationSchema}
          >
            {({ values, errors, touched }) => (
              <Form>
                <Grid container direction="row" spacing={2}>
                  <Grid item xs>
                    <Field
                      as={TextField}
                      value={values.name}
                      fullWidth
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
                      value={formatCNPJ(values.cnpj).toString()}
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
                  <Grid item sm>
                    <Field
                      as={TextField}
                      value={formatPhoneNumber(values.phoneNumber).toString()}
                      fullWidth
                      label="Telefone"
                      name="phoneNumber"
                      inputProps={{ maxLength: 14, inputMode: "numeric" }}
                      error={errors.phoneNumber && touched.phoneNumber}
                      helperText={
                        errors.phoneNumber && touched.phoneNumber
                          ? errors.phoneNumber
                          : null
                      }
                    />
                  </Grid>
                </Grid>
                <Grid container direction="row" spacing={2} marginTop={2}>
                  <Grid item sm>
                    <Field
                      as={TextField}
                      value={values.email}
                      fullWidth
                      label="E-mail"
                      name="email"
                      type="email"
                      error={errors.email && touched.email}
                      helperText={
                        errors.email && touched.email ? errors.email : null
                      }
                    />
                  </Grid>
                  <Grid item sm>
                    <Field
                      as={TextField}
                      value={values.corporateName}
                      fullWidth
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
                </Grid>
                <CardActions
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <Button variant="outlined" onClick={handleCancel}>
                    Cancelar
                  </Button>
                  <Button type="submit" variant="contained">
                    {"Atualizar"}
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