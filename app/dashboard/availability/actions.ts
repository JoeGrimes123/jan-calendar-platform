"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { availabilitySchema } from "@/lib/zodSchemas";
import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";

export async function updateAvailabilityAction(prevState: unknown, formData: FormData) {
    const session = await auth();

    if (!session?.user?.id) {
        return redirect("/");
    }

    const submission = parseWithZod(formData, {
        schema: availabilitySchema,
    });

    if (submission.status !== "success") {
        return submission.reply();
    }

    const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } =
        submission.value;

    try {
        await prisma.$transaction([
            prisma.availability.deleteMany({
                where: {
                    userId: session.user.id,
                },
            }),
            prisma.availability.createMany({
                data: [
                    {
                        day: "MONDAY",
                        fromTime: monday.fromTime,
                        tillTime: monday.tillTime,
                        isActive: monday.isActive,
                        userId: session.user.id,
                    },
                    {
                        day: "TUESDAY",
                        fromTime: tuesday.fromTime,
                        tillTime: tuesday.tillTime,
                        isActive: tuesday.isActive,
                        userId: session.user.id,
                    },
                    {
                        day: "WEDNESDAY",
                        fromTime: wednesday.fromTime,
                        tillTime: wednesday.tillTime,
                        isActive: wednesday.isActive,
                        userId: session.user.id,
                    },
                    {
                        day: "THURSDAY",
                        fromTime: thursday.fromTime,
                        tillTime: thursday.tillTime,
                        isActive: thursday.isActive,
                        userId: session.user.id,
                    },
                    {
                        day: "FRIDAY",
                        fromTime: friday.fromTime,
                        tillTime: friday.tillTime,
                        isActive: friday.isActive,
                        userId: session.user.id,
                    },
                    {
                        day: "SATURDAY",
                        fromTime: saturday.fromTime,
                        tillTime: saturday.tillTime,
                        isActive: saturday.isActive,
                        userId: session.user.id,
                    },
                    {
                        day: "SUNDAY",
                        fromTime: sunday.fromTime,
                        tillTime: sunday.tillTime,
                        isActive: sunday.isActive,
                        userId: session.user.id,
                    },
                ],
            }),
        ]);
    } catch (error) {
        console.error(error);
        return submission.reply({
            formErrors: ["Something went wrong. Please try again."],
        });
    }

    return redirect("/dashboard");
}
