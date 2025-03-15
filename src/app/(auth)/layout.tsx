import Image from "next/image";
import LogoDarkIcon from "@/shared/icons/logo-dark.svg";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function UnauthorizedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (session?.user) {
    redirect("/");
  }

  return (
    <div className="grid overflow-hidden w-full border h-screen lg:grid-cols-2">
      <div className="flex flex-col overflow-auto p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a
            href="#"
            className="flex rounded-lg p-2 bg-primary items-center gap-2 font-medium"
          >
            <LogoDarkIcon />
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">{children}</div>
        </div>
      </div>
      <div className="relative hidden bg-muted h-full lg:block">
        <Image
          fill
          src="/placeholder.svg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
