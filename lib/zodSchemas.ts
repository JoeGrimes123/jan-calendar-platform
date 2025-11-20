import { z } from "zod";
import { conformZodMessage } from "@conform-to/zod";

export const onboardingSchema = z.object({
    fullName: z.string().min(3).max(150),
    userName: z
        .string()
        .min(3)
        .max(150)
        .regex(/^[a-zA-Z0-9-]+$/, {
            message: "Username can only contain letters, numbers, and hyphens",
        }),
});

export const onboardingSchemaServer = z.object({
    fullName: z.string().min(3).max(150),
    userName: z
        .string()
        .min(3)
        .max(150)
        .regex(/^[a-zA-Z0-9-]+$/, {
            message: "Username can only contain letters, numbers, and hyphens",
        }),
});
