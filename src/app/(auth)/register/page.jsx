import RegisterForm from "../../../components/auth/RegisterForm";
import { Flex } from "@chakra-ui/react";

export const metadata = {
  title: "Register | Finance Tracking",
  description: "Create a new account",
};

export default function RegisterPage() {
  return (
    <Flex minH="80vh" align="center" justify="center" py={10}>
      <RegisterForm />
    </Flex>
  );
}
