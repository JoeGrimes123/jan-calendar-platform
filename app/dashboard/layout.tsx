import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { UserMenu } from "@/components/dashboard/UserMenu";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    if (!session?.user?.id) {
        return redirect("/");
    }

    const user = await prisma.user.findUnique({
        where: {
            id: session.user.id,
        },
        select: {
            userName: true,
            name: true,
            email: true,
            image: true,
        },
    });

    if (!user?.userName) {
        return redirect("/onboarding");
    }

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="hidden md:flex w-64 flex-col border-r bg-muted/40">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px]">
                    <h1 className="text-xl font-bold">Cal Marshal</h1>
                </div>
                <div className="flex-1 overflow-auto py-4 px-3">
                    <DashboardNav />
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                    <div className="flex-1" />
                    <UserMenu
                        userName={user.name || user.userName}
                        userEmail={user.email}
                        userImage={user.image}
                    />
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-auto p-4 lg:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
