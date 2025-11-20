import { z } from "zod";

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

export const eventTypeSchema = z.object({
    title: z.string().min(1).max(100),
    url: z
        .string()
        .min(1)
        .max(100)
        .regex(/^[a-zA-Z0-9-]+$/, {
            message: "URL can only contain letters, numbers, and hyphens",
        }),
    duration: z.coerce.number().min(5).max(480),
    description: z.string().min(1).max(500),
    videoCallSoftware: z.enum(["Zoom", "Google Meet", "Microsoft Teams"]),
});

export const availabilitySchema = z.object({
    monday: z.object({
        isActive: z.boolean(),
        fromTime: z.string(),
        tillTime: z.string(),
    }),
    tuesday: z.object({
        isActive: z.boolean(),
        fromTime: z.string(),
        tillTime: z.string(),
    }),
    wednesday: z.object({
        isActive: z.boolean(),
        fromTime: z.string(),
        tillTime: z.string(),
    }),
    thursday: z.object({
        isActive: z.boolean(),
        fromTime: z.string(),
        tillTime: z.string(),
    }),
    friday: z.object({
        isActive: z.boolean(),
        fromTime: z.string(),
        tillTime: z.string(),
    }),
    saturday: z.object({
        isActive: z.boolean(),
        fromTime: z.string(),
        tillTime: z.string(),
    }),
    sunday: z.object({
        isActive: z.boolean(),
        fromTime: z.string(),
        tillTime: z.string(),
    }),
});

