import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { AvailabilityForm } from "./AvailabilityForm";

async function getAvailability(userId: string) {
    const data = await prisma.availability.findMany({
        where: { userId },
    });

    if (data.length === 0) {
        return {
            MONDAY: { isActive: true, fromTime: "09:00", tillTime: "17:00" },
            TUESDAY: { isActive: true, fromTime: "09:00", tillTime: "17:00" },
            WEDNESDAY: { isActive: true, fromTime: "09:00", tillTime: "17:00" },
            THURSDAY: { isActive: true, fromTime: "09:00", tillTime: "17:00" },
            FRIDAY: { isActive: true, fromTime: "09:00", tillTime: "17:00" },
            SATURDAY: { isActive: false, fromTime: "09:00", tillTime: "17:00" },
            SUNDAY: { isActive: false, fromTime: "09:00", tillTime: "17:00" },
        };
    }

    const result: Record<string, { isActive: boolean; fromTime: string; tillTime: string }> = {};
    data.forEach((item) => {
        result[item.day] = {
            isActive: item.isActive,
            fromTime: item.fromTime,
            tillTime: item.tillTime,
        };
    });
    return result;
}

export default async function AvailabilityPage() {
    const session = await auth();
    if (!session?.user?.id) {
        return redirect("/");
    }

    const data = await getAvailability(session.user.id);

    return <AvailabilityForm data={data} />;
}
