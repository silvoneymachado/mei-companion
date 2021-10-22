import {
  Card,
  CardHeader,
  Container,
  Grid,
  TextField,
  CardActions,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import { Form, Formik, Field, FormikProps } from "formik";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Layout from "../../components/layout";
import { NextApplicationPage } from "../../types/types";
import { Invoice } from "../../util/models";
import * as Yup from "yup";
import { useAuth } from "../../contexts/authContext";
import { useInvoice } from "../../contexts/invoiceContext";
import { usePartner } from "../../contexts/partnerContext";

const Details: NextApplicationPage<React.FC> = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { pid } = router.query;
  const { getById, create, update, loadedInvoice } = useInvoice();
  const { getAll: getAllPartners, partners } = usePartner();
  let formikRef: FormikProps<Invoice>;

  const getId = () =>
    isNaN(parseInt(String(pid)))
      ? null
      : parseInt(String(pid)) === 0
      ? null
      : parseInt(String(pid));

  const formikInitialValues: Invoice = {
    id: getId(),
    userId: user.id,
    partnerId: null,
    invoiceNumber: null,
    value: null,
    notes: "",
  };

  useEffect(() => {
    const id = getId();
    getAllPartners();
    if (id) {
      getById(id);
    }
  }, []);

  useEffect(() => {
    formikRef.setValues(loadedInvoice);
  }, [loadedInvoice]);

  const requiredMessage = "Obrigatório";
  const SignUpValidationSchema = Yup.object().shape({
    partnerId: Yup.number().required(requiredMessage).nullable(),
    value: Yup.number()
      .typeError("Digite apenas números")
      .required(requiredMessage),
    invoiceNumber: Yup.number()
      .typeError("Digite apenas números")
      .max(44, "O CNPJ deve conter 44 dígitos")
      .required(requiredMessage)
      .nullable(),
  });

  const handleCancel = () => {
    router.back();
  };

  const handleSubmit = (values: Invoice) => {
    if (values.id) {
      update(values);
    } else {
      create(values);
    }
  };

  return (
    <Layout>
      <Card sx={{ display: "flex" }}>
        <Container maxWidth="lg">
          <CardHeader
            title={
              getId() ? "Editar nota fiscal" : "Adicionar nova nota fiscal"
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
                <Grid container direction="column" spacing={2}>
                  <Grid container direction="row" spacing={2}>
                    <Grid item xs>
                      <Field
                        as={TextField}
                        fullWidth
                        label="Parceiro"
                        select
                        SelectProps={{
                          value: values.partnerId,
                          name: "partnerId",
                          multiline: true,
                        }}
                        error={errors.partnerId && touched.partnerId}
                        helperText={
                          errors.partnerId && touched.partnerId
                            ? errors.partnerId
                            : null
                        }
                      >
                        {partners && partners?.length === 0 ? (
                          <MenuItem value="">
                            <em>Por favor cadastre pelo menos um parceiro</em>
                          </MenuItem>
                        ) : (
                          <MenuItem value="">
                            <em>Selecione</em>
                          </MenuItem>
                        )}
                        {partners?.map((partner, index) => (
                          <MenuItem
                            key={index}
                            value={partner.id}
                          >{`${partner.corporateName}[${partner.name}]`}</MenuItem>
                        ))}
                        {/* <MenuItem
                        value=""
                      >Selecione</MenuItem> */}
                      </Field>
                    </Grid>
                    <Grid item sm>
                      <Field
                        as={TextField}
                        fullWidth
                        value={values.value}
                        label="Valor"
                        name="value"
                        inputProps={{ inputMode: "numeric" }}
                        error={errors.value && touched.value}
                        helperText={
                          errors.value && touched.value ? errors.value : null
                        }
                      />
                    </Grid>
                    <Grid item sm>
                      <Field
                        as={TextField}
                        fullWidth
                        value={values.notes}
                        label="Observações"
                        name="notes"
                        error={errors.notes && touched.notes}
                        helperText={
                          errors.notes && touched.notes ? errors.notes : null
                        }
                      />
                    </Grid>
                  </Grid>
                  <Grid container direction="column">
                    <Grid item sx={{ marginTop: 2 }}>
                      <Field
                        as={TextField}
                        fullWidth
                        value={values.invoiceNumber}
                        label="Chave de Acesso NF-e"
                        name="invoiceNumber"
                        inputProps={{ maxLength: 44, inputMode: "numeric" }}
                        error={errors.invoiceNumber && touched.invoiceNumber}
                        helperText={
                          errors.invoiceNumber && touched.invoiceNumber
                            ? errors.invoiceNumber
                            : null
                        }
                      />
                    </Grid>
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
