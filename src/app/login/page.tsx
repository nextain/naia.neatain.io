import { signIn } from "@/lib/auth";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight">로그인</h1>
        <p className="mt-2 text-foreground/60">Cafelua Lab에 로그인하세요</p>
      </div>

      <div className="flex flex-col gap-3 w-full max-w-xs">
        <form
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: "/dashboard" });
          }}
        >
          <button
            type="submit"
            className="w-full rounded-lg border border-foreground/20 px-4 py-3 font-medium hover:bg-foreground/5 transition"
          >
            Google로 로그인
          </button>
        </form>

        <form
          action={async () => {
            "use server";
            await signIn("discord", { redirectTo: "/dashboard" });
          }}
        >
          <button
            type="submit"
            className="w-full rounded-lg border border-foreground/20 px-4 py-3 font-medium hover:bg-foreground/5 transition"
          >
            Discord로 로그인
          </button>
        </form>
      </div>
    </main>
  );
}
