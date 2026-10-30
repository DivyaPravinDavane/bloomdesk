import { Demo } from "@/components/ui/demo";

export const metadata = {
  title: "Sign In Demo | BloomDesk",
  description: "Clean Minimal Sign-in component demo",
};

export default function DemoPage() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-slate-50">
      <Demo />
    </main>
  );
}
