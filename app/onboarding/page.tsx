"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import { OnboardingAction } from "./actions";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { onboardingSchema } from "@/lib/zodSchemas";

export default function OnboardingPage() {
    const [lastResult, action] = useActionState(OnboardingAction, undefined);

    const [form, fields] = useForm({
        lastResult,
        onValidate({ formData }) {
            return parseWithZod(formData, { schema: onboardingSchema });
        },
        shouldValidate: "onBlur",
        shouldRevalidate: "onInput",
    });

    return (
        <div className="min-h-screen w-screen flex items-center justify-center">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Welcome to Cal Marshal</CardTitle>
                    <CardDescription>
                        We need the following information to set up your profile!
                    </CardDescription>
                </CardHeader>
                <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
                    <CardContent className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor={fields.fullName.id}>Full Name</Label>
                            <Input
                                name={fields.fullName.name}
                                defaultValue={fields.fullName.initialValue}
                                key={fields.fullName.key}
                                placeholder="Jan Marshal"
                            />
                            <p className="text-red-500 text-sm">{fields.fullName.errors}</p>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor={fields.userName.id}>Username</Label>
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-muted-foreground/20 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary sm:max-w-md">
                                <span className="flex select-none items-center pl-3 text-muted-foreground sm:text-sm">
                                    cal.com/
                                </span>
                                <Input
                                    name={fields.userName.name}
                                    defaultValue={fields.userName.initialValue}
                                    key={fields.userName.key}
                                    placeholder="jan-marshal"
                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-foreground placeholder:text-muted-foreground focus-visible:ring-0 sm:text-sm sm:leading-6"
                                />
                            </div>
                            <p className="text-red-500 text-sm">{fields.userName.errors}</p>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className="w-full">
                            Submit
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
