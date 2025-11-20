import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { connectCalendar } from "./actions";

export default async function SettingsPage() {
    const session = await auth();
    if (!session?.user?.id) {
        return redirect("/");
    }

    const user = await prisma.user.findUnique({
        where: {
            id: session.user.id,
        },
        select: {
            grantId: true,
            grantEmail: true,
        },
    });

    return (
        <div className="space-y-4">
            <h1 className="text-3xl font-bold">Settings</h1>

            <Card>
                <CardHeader>
                    <CardTitle>Calendar Connection</CardTitle>
                    <CardDescription>
                        Connect your Google or Outlook calendar to enable booking
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {user?.grantId ? (
                        <div>
                            <p className="text-sm text-muted-foreground mb-2">
                                Connected calendar: <span className="font-medium">{user.grantEmail}</span>
                            </p>
                            <form action={connectCalendar}>
                                <Button type="submit" variant="outline">
                                    Reconnect Calendar
                                </Button>
                            </form>
                        </div>
                    ) : (
                        <form action={connectCalendar}>
                            <Button type="submit">Connect Calendar</Button>
                        </form>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
