import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/lib/prisma";
import { PlusCircle } from "lucide-react";

export default async function DashboardPage() {
    const session = await auth();

    if (!session?.user?.id) {
        return redirect("/");
    }

    const eventTypes = await prisma.eventType.findMany({
        where: {
            userId: session.user.id,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Event Types</h1>
                <Link href="/dashboard/event-types/new">
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Create Event Type
                    </Button>
                </Link>
            </div>

            {eventTypes.length === 0 ? (
                <Card>
                    <CardHeader>
                        <CardTitle>No event types yet</CardTitle>
                        <CardDescription>
                            Create your first event type to start accepting bookings
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Link href="/dashboard/event-types/new">
                            <Button>
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Create Event Type
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {eventTypes.map((event) => (
                        <Card key={event.id}>
                            <CardHeader>
                                <CardTitle>{event.title}</CardTitle>
                                <CardDescription>{event.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="text-sm text-muted-foreground space-y-1">
                                    <p>Duration: {event.duration} minutes</p>
                                    <p>URL: /{event.url}</p>
                                    <p>Video: {event.videoCallSoftware}</p>
                                </div>
                                <div className="mt-4 flex gap-2">
                                    <Link href={`/dashboard/event-types/${event.id}`}>
                                        <Button variant="outline" size="sm">
                                            Edit
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
