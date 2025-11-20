import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const session = await auth();

    if (!session?.user) {
        return redirect("/");
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome, {session.user.name}</p>
        </div>
    );
}
