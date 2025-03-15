import { getSession, Session } from "@/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let session: Session | null = null;
  try {
    session = await getSession();

    if (!session.user.isAdmin) {
      redirect("/");
    }
  } catch {
    redirect("/login");
  }

  return (
    <div className="flex flex-col gap-4 overflow-auto p-6 md:p-10">
      {JSON.stringify(session)}
      {children}
    </div>
  );
}
