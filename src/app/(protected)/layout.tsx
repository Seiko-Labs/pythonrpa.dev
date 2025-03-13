import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AppLayout from "@/ui/sidebar";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  return <AppLayout>{children}</AppLayout>;
}
