"use server";

import { parseWithZod } from "@conform-to/zod";
import { onboardingSchema } from "@/lib/zodSchemas";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function OnboardingAction(prevState: any, formData: FormData) {
    const session = await auth();
    if (!session?.user?.id) {
        return redirect("/");
    }

    const submission = await parseWithZod(formData, {
        schema: onboardingSchema.superRefine(async (data, ctx) => {
            const existingUser = await prisma.user.findUnique({
                where: {
                    userName: data.userName,
                },
            });
            if (existingUser && existingUser.id !== session.user?.id) {
                ctx.addIssue({
                    code: "custom",
                    message: "Username is already taken",
                    path: ["userName"],
                });
            }
        }),
        async: true,
    });

    if (submission.status !== "success") {
        return submission.reply();
    }

    await prisma.user.update({
        where: {
            id: session.user.id,
        },
        data: {
            userName: submission.value.userName,
            name: submission.value.fullName,
        },
    });

    return redirect("/dashboard");
}
