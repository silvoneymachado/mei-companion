import { Send, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Container,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { useAuth } from "../../contexts/authContext";

const SignIn: React.FC = () => {
  const { signIn, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const SigninValidationSchema = Yup.object().shape({
    email: Yup.string().email("Email inválido").required("Obrigatório"),
    password: Yup.string().required("Obrigatório"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = async (values) => {
    await signIn(values);
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
        onSubmit={onSubmit}
        validationSchema={SigninValidationSchema}
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
                  Login
                </Typography>
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
                <LoadingButton
                  loading={loading}
                  loadingPosition="start"
                  startIcon={<Send />}
                  variant="contained"
                  fullWidth
                  type="submit"
                >
                  Entrar
                </LoadingButton>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default SignIn;
