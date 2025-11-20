import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import EditEventTypePage from "./page-client";

export default async function EditEventTypePageWrapper({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const session = await auth();
    if (!session?.user?.id) {
        return redirect("/");
    }

    const resolvedParams = await params;
    const eventType = await prisma.eventType.findUnique({
        where: {
            id: resolvedParams.id,
            userId: session.user.id,
        },
    });

    if (!eventType) {
        return redirect("/dashboard");
    }

    return <EditEventTypePage params={params} eventType={eventType} />;
}
