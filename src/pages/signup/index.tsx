import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Container,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import { User } from "next-auth";
import React, { useState } from "react";
import * as Yup from "yup";
import { Severity, useAlert } from "../../contexts/alertContext";
import { formatCNPJ, formatPhoneNumber } from "../../util/masks";

interface Props {
  changeIsLogin: () => void;
}

const SignUp: React.FC<Props> = (props: Props) => {
  const { changeIsLogin } = props;
  const { showAlert } = useAlert();
  const [showPassword, setShowPassword] = useState(false);
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

  const initialValues = {
    name: "",
    email: "",
    cnpj: "",
    corporateName: "",
    phoneNumber: "",
    password: "",
  };

  const onSubmit = async (values: User) => {
    try {
      const body = values;
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        changeIsLogin();
        showAlert({
          text: "Conta criada com sucesso, você já pode efetuar o login",
          severity: Severity.SUCCESS,
        });
      } else {
        const data = await res.json();
        showAlert({ text: `${data.statusText}`, severity: Severity.ERROR });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: 30 }}>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => onSubmit(values)}
        validationSchema={SignUpValidationSchema}
      >
        {({ errors, touched, values }) => (
          <Form>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ flexGrow: 1 }}
                >
                  Nova Conta
                </Typography>
              </Grid>
              <Grid item>
                <Field
                  as={TextField}
                  value={values.name}
                  fullWidth
                  label="Nome"
                  name="name"
                />
                {errors.name && touched.name ? (
                  <FormHelperText error={!!errors.name}>
                    {errors.name}
                  </FormHelperText>
                ) : null}
              </Grid>
              <Grid item>
                <Field
                  as={TextField}
                  value={values.email}
                  fullWidth
                  label="E-mail"
                  name="email"
                  type="email"
                />
                {errors.email && touched.email ? (
                  <FormHelperText error={!!errors.email}>
                    {errors.email}
                  </FormHelperText>
                ) : null}
              </Grid>
              <Grid item>
                <Field
                  as={TextField}
                  value={formatCNPJ(values.cnpj)}
                  fullWidth
                  label="CNPJ"
                  name="cnpj"
                  inputProps={{ maxLength: 18, inputMode: "numeric" }}
                />
                {errors.cnpj && touched.cnpj ? (
                  <FormHelperText error={!!errors.cnpj}>
                    {errors.cnpj}
                  </FormHelperText>
                ) : null}
              </Grid>
              <Grid item>
                <Field
                  as={TextField}
                  value={formatPhoneNumber(values.phoneNumber)}
                  fullWidth
                  label="Telefone"
                  name="phoneNumber"
                  inputProps={{ maxLength: 14, inputMode: "numeric" }}
                />
                {errors.phoneNumber && touched.phoneNumber ? (
                  <FormHelperText error={!!errors.phoneNumber}>
                    {errors.phoneNumber}
                  </FormHelperText>
                ) : null}
              </Grid>
              <Grid item>
                <Field
                  as={TextField}
                  value={values.corporateName}
                  fullWidth
                  label="Razão Social"
                  name="corporateName"
                />
                {errors.corporateName && touched.corporateName ? (
                  <FormHelperText error={!!errors.corporateName}>
                    {errors.corporateName}
                  </FormHelperText>
                ) : null}
              </Grid>
              <Grid item>
                <Field
                  as={TextField}
                  value={values.password}
                  fullWidth
                  label="Senha"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {errors.password && touched.password ? (
                  <FormHelperText error={!!errors.password}>
                    {errors.password}
                  </FormHelperText>
                ) : null}
              </Grid>
              <Grid item>
                <Button variant="contained" fullWidth type="submit">
                  Criar conta
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default SignUp;
