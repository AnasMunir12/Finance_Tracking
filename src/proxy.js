// src/proxy.js
import { withAuth } from "next-auth/middleware";

export default withAuth({
  // same config as before
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|login|register).*)"],
};
