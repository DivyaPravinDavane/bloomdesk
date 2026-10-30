import { SignIn2 } from "@/components/ui/clean-minimal-sign-in";

export const metadata = {
  title: "Sign In | BloomDesk",
  description: "Sign in to BloomDesk workspace account",
};

export default function SignInPage() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-slate-50">
      <SignIn2 />
    </main>
  );
}
