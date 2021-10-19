import { useFormik } from "formik";
import { useRouter } from "next/dist/client/router";
import React, {useEffect} from "react";

const SignIn: React.FC = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  useEffect(() => {
      router.push('/api/auth/signin')
  }, []);

  return <div />;
};

export default SignIn;
