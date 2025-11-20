"use server";

import { parseWithZod } from "@conform-to/zod";
import { eventTypeSchema } from "@/lib/zodSchemas";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function createEventTypeAction(prevState: any, formData: FormData) {
    const session = await auth();
    if (!session?.user?.id) {
        return redirect("/");
    }

    const submission = await parseWithZod(formData, {
        schema: eventTypeSchema.superRefine(async (data, ctx) => {
            const existingUrl = await prisma.eventType.findFirst({
                where: {
                    url: data.url,
                    userId: session.user?.id,
                },
            });
            if (existingUrl) {
                ctx.addIssue({
                    code: "custom",
                    message: "URL slug is already in use",
                    path: ["url"],
                });
            }
        }),
        async: true,
    });

    if (submission.status !== "success") {
        return submission.reply();
    }

    await prisma.eventType.create({
        data: {
            title: submission.value.title,
            url: submission.value.url,
            duration: submission.value.duration,
            description: submission.value.description,
            videoCallSoftware: submission.value.videoCallSoftware,
            userId: session.user.id,
        },
    });

    return redirect("/dashboard");
}

export async function updateEventTypeAction(
    eventTypeId: string,
    prevState: any,
    formData: FormData
) {
    const session = await auth();
    if (!session?.user?.id) {
        return redirect("/");
    }

    const submission = await parseWithZod(formData, {
        schema: eventTypeSchema.superRefine(async (data, ctx) => {
            const existingUrl = await prisma.eventType.findFirst({
                where: {
                    url: data.url,
                    userId: session.user?.id,
                    NOT: {
                        id: eventTypeId,
                    },
                },
            });
            if (existingUrl) {
                ctx.addIssue({
                    code: "custom",
                    message: "URL slug is already in use",
                    path: ["url"],
                });
            }
        }),
        async: true,
    });

    if (submission.status !== "success") {
        return submission.reply();
    }

    await prisma.eventType.update({
        where: {
            id: eventTypeId,
            userId: session.user.id,
        },
        data: {
            title: submission.value.title,
            url: submission.value.url,
            duration: submission.value.duration,
            description: submission.value.description,
            videoCallSoftware: submission.value.videoCallSoftware,
        },
    });

    return redirect("/dashboard");
}

export async function deleteEventTypeAction(eventTypeId: string) {
    const session = await auth();
    if (!session?.user?.id) {
        return redirect("/");
    }

    await prisma.eventType.delete({
        where: {
            id: eventTypeId,
            userId: session.user.id,
        },
    });

    return redirect("/dashboard");
}
