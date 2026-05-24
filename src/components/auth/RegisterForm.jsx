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
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "../ui/Input";
import Swal from "sweetalert2";

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const res = await fetch("/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: values.name,
            email: values.email,
            password: values.password,
          }),
        });

        const data = await res.json();

        if (res.ok) {
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: 'Registered successfully! Please login.',
            showConfirmButton: false,
            timer: 3000,
            didOpen: () => {
              Swal.getContainer().style.zIndex = "2000";
            }
          });
          router.push("/login");
        } else {
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'error',
            title: data.message || "Something went wrong",
            showConfirmButton: false,
            timer: 3000,
            didOpen: () => {
              Swal.getContainer().style.zIndex = "2000";
            }
          });
        }
      } catch (error) {
        console.error("Frontend registration error:", error);
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'error',
          title: 'An unexpected error occurred: ' + (error.message || ''),
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
        <Heading size="lg">Register</Heading>
        <Text fontSize="sm" color="mutedText">Create a new account</Text>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <Stack gap={4}>
          <Box>
            <Text mb={1} fontSize="sm" fontWeight="600" color="mainText">Full Name</Text>
            <Input
              type="text"
              name="name"
              placeholder="John Doe"
              {...formik.getFieldProps("name")}
              border={formik.touched.name && formik.errors.name ? "1px solid #EF4444" : "1px solid"}
              borderColor={formik.touched.name && formik.errors.name ? "#EF4444" : "mainBorder"}
            />
            {formik.touched.name && formik.errors.name && (
              <Text color="#EF4444" fontSize="xs" mt={1}>{formik.errors.name}</Text>
            )}
          </Box>
          <Box>
            <Text mb={1} fontSize="sm" fontWeight="600" color="mainText">Email Address</Text>
            <Input
              type="email"
              name="email"
              placeholder="john@example.com"
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
              placeholder="Min 6 characters"
              {...formik.getFieldProps("password")}
              border={formik.touched.password && formik.errors.password ? "1px solid #EF4444" : "1px solid"}
              borderColor={formik.touched.password && formik.errors.password ? "#EF4444" : "mainBorder"}
            />
            {formik.touched.password && formik.errors.password && (
              <Text color="#EF4444" fontSize="xs" mt={1}>{formik.errors.password}</Text>
            )}
          </Box>
          <Box>
            <Text mb={1} fontSize="sm" fontWeight="600" color="mainText">Confirm Password</Text>
            <Input
              type="password"
              name="confirmPassword"
              placeholder="Repeat password"
              {...formik.getFieldProps("confirmPassword")}
              border={formik.touched.confirmPassword && formik.errors.confirmPassword ? "1px solid #EF4444" : "1px solid"}
              borderColor={formik.touched.confirmPassword && formik.errors.confirmPassword ? "#EF4444" : "mainBorder"}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <Text color="#EF4444" fontSize="xs" mt={1}>{formik.errors.confirmPassword}</Text>
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
            Sign Up
          </Button>
          <Text textAlign="center" fontSize="sm" mt={2}>
            Already have an account?{" "}
            <Link color="primary" fontWeight="600" href="/login">
              Login
            </Link>
          </Text>
        </Stack>
      </form>
    </Box>
  );
};

export default RegisterForm;
