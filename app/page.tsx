import { signIn } from "@/lib/auth";
import { Button } from "@/components/ui/button";

export default function Home() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-24">
            <h1 className="text-4xl font-bold mb-8">Cal Marshal</h1>
            <div className="flex gap-4">
                <form
                    action={async () => {
                        "use server";
                        await signIn("github");
                    }}
                >
                    <Button>Login with GitHub</Button>
                </form>
                <form
                    action={async () => {
                        "use server";
                        await signIn("google");
                    }}
                >
                    <Button variant="outline">Login with Google</Button>
                </form>
            </div>
        </div>
    );
}
