import { signIn, auth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export default async function Home() {
    const session = await auth();

    if (session?.user) {
        return redirect("/dashboard");
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-24">
            <h1 className="text-4xl font-bold mb-8">Cal Marshal</h1>
            <div className="flex gap-4">
                <form
                    action={async () => {
                        "use server";
                        await signIn("github", { redirectTo: "/dashboard" });
                    }}
                >
                    <Button>Login with GitHub</Button>
                </form>
                <form
                    action={async () => {
                        "use server";
                        await signIn("google", { redirectTo: "/dashboard" });
                    }}
                >
                    <Button variant="outline">Login with Google</Button>
                </form>
            </div>
        </div>
    );
}
