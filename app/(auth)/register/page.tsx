import type { Metadata } from "next";
import { AuthForm } from "@/features/auth/AuthForm";

export const metadata: Metadata = {
  title: "ثبت‌نام",
  robots: { index: false, follow: true },
};

export default function RegisterPage() {
  return <AuthForm mode="register" />;
}
