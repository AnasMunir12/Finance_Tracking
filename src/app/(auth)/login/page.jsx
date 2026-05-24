import LoginForm from "../../../components/auth/LoginForm";
import { Flex } from "@chakra-ui/react";

export const metadata = {
  title: "Login | Finance Tracking",
  description: "Login to your account",
};

export default function LoginPage() {
  return (
    <Flex minH="80vh" align="center" justify="center">
      <LoginForm />
    </Flex>
  );
}
