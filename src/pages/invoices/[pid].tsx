/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Card,
  CardHeader,
  Container,
  Grid,
  TextField,
  CardActions,
  Button,
  Autocomplete,
  TextFieldProps,
} from "@mui/material";
import { Form, Formik, Field, FormikProps } from "formik";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Layout from "../../components/layout";
import { NextApplicationPage } from "../../types/types";
import { Invoice } from "../../util/models";
import * as Yup from "yup";
import { useAuth } from "../../contexts/authContext";
import { useInvoice } from "../../contexts/invoiceContext";
import { usePartner } from "../../contexts/partnerContext";
import { Partner } from ".prisma/client";

const Details: NextApplicationPage<React.FC> = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { pid } = router.query;
  const { getById, create, update, loadedInvoice } = useInvoice();
  const { getAll: getAllPartners, partners } = usePartner();
  const [selectedPartner, setSelectedPartner] = useState(null);
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
    invoiceNumber: "",
    value: "",
    paymentDate: new Date(),
    referenceDate: new Date(),
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
    if (getId()) {
      formikRef.setValues(loadedInvoice);
      setSelectedPartner(
        partners.find((partner) => partner.id === loadedInvoice.partnerId)
      );
    }
  }, [loadedInvoice]);

  const requiredMessage = "Obrigatório";
  const SignUpValidationSchema = Yup.object().shape({
    partnerId: Yup.number().required(requiredMessage).nullable(),
    value: Yup.number()
      .typeError("Digite apenas números")
      .required(requiredMessage),
    invoiceNumber: Yup.string()
      .max(44, "O CNPJ deve conter 44 dígitos")
      .required(requiredMessage),
    referenceDate: Yup.date().required(requiredMessage),
    notes: Yup.string().required(requiredMessage),
  });

  const handleCancel = () => {
    router.back();
  };

  const handleSubmit = (values: Invoice) => {
    const data = {
      ...values,
      userId: user.id,
    };
    if (data.id && data.userId) {
      update(data);
    } else {
      create(data);
    }
  };

  const defaultProps = {
    options: partners ?? [],
    getOptionLabel: (partner: Partner) =>
      `${partner.corporateName} - [${partner.cnpj}]`,
  };

  const handleSelectPartner = (partner: Partner) => {
    setSelectedPartner(partner);
    formikRef.setFieldValue("partnerId", partner?.id);
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
              {({ values, errors, touched, setFieldValue }) => (
                <Form>
                  <Grid container direction="column" spacing={2}>
                    <Grid container direction="row" spacing={2}>
                      <Grid item xs>
                        <Field
                          as={Autocomplete}
                          fullWidth
                          onChange={(_e: any, newValue: Partner) =>
                            handleSelectPartner(newValue)
                          }
                          value={selectedPartner}
                          {...defaultProps}
                          renderInput={(
                            params: JSX.IntrinsicAttributes & TextFieldProps
                          ) => (
                            <TextField
                              {...params}
                              label="Parceiro"
                              error={errors.partnerId && touched.partnerId}
                              helperText={
                                errors.partnerId && touched.partnerId
                                  ? errors.partnerId
                                  : null
                              }
                            />
                          )}
                        />
                      </Grid>
                      <Grid item sm>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <Field
                            as={MobileDatePicker}
                            value={values.referenceDate}
                            label="Data de competência"
                            onChange={(newValue: Date) =>
                              setFieldValue("referenceDate", newValue)
                            }
                            renderInput={(
                              params: JSX.IntrinsicAttributes & TextFieldProps
                            ) => <TextField fullWidth {...params} />}
                          />
                        </LocalizationProvider>
                      </Grid>
                      <Grid item sm>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <Field
                            as={MobileDatePicker}
                            value={values.paymentDate}
                            label="Data de recebimento"
                            onChange={(newValue: Date) =>
                              setFieldValue("paymentDate", newValue)
                            }
                            renderInput={(
                              params: JSX.IntrinsicAttributes & TextFieldProps
                            ) => <TextField fullWidth {...params} />}
                          />
                        </LocalizationProvider>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      direction="column"
                      sx={{ marginTop: 2 }}
                      spacing={2}
                    >
                      <Grid item>
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
                    <Grid
                      container
                      direction="row"
                      sx={{ marginTop: 2 }}
                      spacing={2}
                    >
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
                      <Grid item sm>
                        <Field
                          as={TextField}
                          fullWidth
                          value={values.notes}
                          label="Descrição"
                          name="notes"
                          error={errors.notes && touched.notes}
                          helperText={
                            errors.notes && touched.notes ? errors.notes : null
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
