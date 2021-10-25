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
import { Category, Expense } from "../../util/models";
import * as Yup from "yup";
import { useExpense } from "../../contexts/expenseContext";
import { usePartner } from "../../contexts/partnerContext";
import { Partner } from ".prisma/client";
import { useCategory } from "../../contexts/categoryContext";
import { useAuth } from "../../contexts/authContext";

const Details: NextApplicationPage<React.FC> = () => {
  const router = useRouter();
  const { user} = useAuth();
  const { pid } = router.query;
  const { getById, create, update, loadedExpense } = useExpense();
  const { getAll: getAllPartners, partners } = usePartner();
  const { getAll: getAllCategories, categories } = useCategory();
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  let formikRef: FormikProps<Expense>;

  const getId = () =>
    isNaN(parseInt(String(pid)))
      ? null
      : parseInt(String(pid)) === 0
      ? null
      : parseInt(String(pid));

  const formikInitialValues: Expense = {
    userId: user?.id,
    name: "",
    partnerId: 0,
    value: "",
    notes: "",
    paymentDate: new Date(),
    referenceDate: new Date(),
    categoryId: null,
  };

  useEffect(() => {
    const id = getId();
    getAllPartners();
    getAllCategories();
    if (id) {
      getById(id);
    }
  }, []);

  useEffect(() => {
    if (getId()) {
      formikRef.setValues(loadedExpense);
    }
  }, [loadedExpense]);

  useEffect(() => {
    if (partners && partners?.length > 0) {
      setSelectedPartner(
        partners?.find((partner) => partner.id === loadedExpense.partnerId)
      );
    }
  }, [partners]);

  useEffect(() => {
    if (categories && categories?.length > 0) {
      setSelectedCategory(
        categories?.find((category) => category.id === loadedExpense.categoryId)
      );
    }
  }, [categories]);

  const requiredMessage = "Obrigatório";
  const SignUpValidationSchema = Yup.object().shape({
    categoryId: Yup.number().required(requiredMessage).nullable(),
    value: Yup.number()
      .typeError("Digite apenas números")
      .required(requiredMessage),
    referenceDate: Yup.date().required(requiredMessage),
    notes: Yup.string().required(requiredMessage),
    name: Yup.string().required(requiredMessage),
  });

  const handleCancel = () => {
    router.back();
  };

  const handleSubmit = (values: Expense) => {
    const id = getId();
    if (id && user?.id) {
      const data = {
        ...values,
        id: id,
        userId: user?.id,
      };
      update(data);
    } else {
      const data = {
        ...values,
        userId: user?.id,
      };
      create(data);
    }
  };

  const categorySelectProps = {
    options: categories?.filter((category) => category.active) ?? [],
    getOptionLabel: (category: Category) => category.name,
  };

  const partnerSelectProps = {
    options: partners ?? [],
    getOptionLabel: (partner: Partner) =>
      `${partner.corporateName} - [${partner.cnpj}]`,
  };

  const handleSelectPartner = (partner: Partner) => {
    setSelectedPartner(partner);
    formikRef.setFieldValue("partnerId", partner?.id);
  };

  const handleSelectCategory = (category: Category) => {
    setSelectedCategory(category);
    formikRef.setFieldValue("categoryId", category?.id);
  };

  return (
    <Layout>
      <Card sx={{ display: "flex" }}>
        <Container maxWidth="lg">
          <CardHeader
            title={getId() ? "Editar despesa" : "Adicionar nova despesa"}
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
                        onChange={(_e: any, newValue: Category) =>
                          handleSelectCategory(newValue)
                        }
                        value={selectedCategory}
                        {...categorySelectProps}
                        renderInput={(
                          params: JSX.IntrinsicAttributes & TextFieldProps
                        ) => (
                          <TextField
                            {...params}
                            label="Categoria"
                            error={errors.categoryId && touched.categoryId}
                            helperText={
                              errors.categoryId && touched.categoryId
                                ? errors.categoryId
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
                        value={values.name}
                        label="Nome"
                        name="name"
                        error={errors.name && touched.name}
                        helperText={
                          errors.name && touched.name ? errors.name : null
                        }
                      />
                    </Grid>
                    <Grid item xs>
                      <Field
                        as={Autocomplete}
                        fullWidth
                        onChange={(_e: any, newValue: Partner) =>
                          handleSelectPartner(newValue)
                        }
                        value={selectedPartner}
                        {...partnerSelectProps}
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
                  </Grid>
                  <Grid container direction="row" sx={{ marginTop: 2 }}>
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
