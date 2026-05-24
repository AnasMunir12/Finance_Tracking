"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Stack,
  Text,
  Link,
  Heading,
} from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "../ui/Input";
import Swal from "sweetalert2";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const res = await signIn("credentials", {
          redirect: false,
          email: values.email,
          password: values.password,
        });

        if (res?.error) {
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'error',
            title: res.error,
            showConfirmButton: false,
            timer: 3000,
            didOpen: () => {
              Swal.getContainer().style.zIndex = "2000";
            }
          });
        } else {
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: 'Logged in successfully',
            showConfirmButton: false,
            timer: 3000,
            didOpen: () => {
              Swal.getContainer().style.zIndex = "2000";
            }
          });
          router.push("/");
          router.refresh();
        }
      } catch (error) {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'error',
          title: 'An unexpected error occurred',
          showConfirmButton: false,
          timer: 3000,
          didOpen: () => {
            Swal.getContainer().style.zIndex = "2000";
          }
        });
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Box p={8} width="full" maxWidth="400px" bg="cardBg" borderRadius="xl" boxShadow="premium">
      <Box textAlign="center" mb={6}>
        <Heading size="lg">Login</Heading>
        <Text fontSize="sm" color="mutedText">Access your finance dashboard</Text>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <Stack gap={4}>
          <Box>
            <Text mb={1} fontSize="sm" fontWeight="600" color="mainText">Email Address</Text>
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              {...formik.getFieldProps("email")}
              border={formik.touched.email && formik.errors.email ? "1px solid #EF4444" : "1px solid"}
              borderColor={formik.touched.email && formik.errors.email ? "#EF4444" : "mainBorder"}
            />
            {formik.touched.email && formik.errors.email && (
              <Text color="#EF4444" fontSize="xs" mt={1}>{formik.errors.email}</Text>
            )}
          </Box>
          <Box>
            <Text mb={1} fontSize="sm" fontWeight="600" color="mainText">Password</Text>
            <Input
              type="password"
              name="password"
              placeholder="Enter your password"
              {...formik.getFieldProps("password")}
              border={formik.touched.password && formik.errors.password ? "1px solid #EF4444" : "1px solid"}
              borderColor={formik.touched.password && formik.errors.password ? "#EF4444" : "mainBorder"}
            />
            {formik.touched.password && formik.errors.password && (
              <Text color="#EF4444" fontSize="xs" mt={1}>{formik.errors.password}</Text>
            )}
          </Box>
          <Button
            type="submit"
            bg="primary"
            color="white"
            _hover={{ bg: "primaryHover" }}
            width="full"
            isLoading={loading}
            mt={2}
          >
            Sign In
          </Button>
          <Text textAlign="center" fontSize="sm" mt={2}>
            Don't have an account?{" "}
            <Link color="primary" fontWeight="600" href="/register">
              Register
            </Link>
          </Text>
        </Stack>
      </form>
    </Box>
  );
};

export default LoginForm;
