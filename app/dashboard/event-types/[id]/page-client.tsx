"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useActionState } from "react";
import { updateEventTypeAction, deleteEventTypeAction } from "../actions";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { eventTypeSchema } from "@/lib/zodSchemas";
import Link from "next/link";
import { ArrowLeft, Trash2 } from "lucide-react";
import { use } from "react";

interface EventType {
    id: string;
    title: string;
    url: string;
    duration: number;
    description: string;
    videoCallSoftware: string;
}

export default function EditEventTypePage({
    params,
    eventType,
}: {
    params: Promise<{ id: string }>;
    eventType: EventType;
}) {
    const resolvedParams = use(params);
    const [lastResult, action] = useActionState(
        updateEventTypeAction.bind(null, resolvedParams.id),
        undefined
    );

    const [form, fields] = useForm({
        lastResult,
        onValidate({ formData }) {
            return parseWithZod(formData, { schema: eventTypeSchema });
        },
        shouldValidate: "onBlur",
        shouldRevalidate: "onInput",
        defaultValue: {
            title: eventType.title,
            url: eventType.url,
            duration: eventType.duration.toString(),
            description: eventType.description,
            videoCallSoftware: eventType.videoCallSoftware,
        },
    });

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-bold">Edit Event Type</h1>
                </div>
                <form
                    action={async () => {
                        await deleteEventTypeAction(resolvedParams.id);
                    }}
                >
                    <Button type="submit" variant="destructive" size="icon">
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </form>
            </div>

            <Card className="max-w-2xl">
                <CardHeader>
                    <CardTitle>Event Details</CardTitle>
                    <CardDescription>
                        Update the details for your event type
                    </CardDescription>
                </CardHeader>
                <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
                    <CardContent className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor={fields.title.id}>Event Title</Label>
                            <Input
                                name={fields.title.name}
                                defaultValue={fields.title.initialValue}
                                key={fields.title.key}
                                placeholder="30 Minute Meeting"
                            />
                            <p className="text-red-500 text-sm">{fields.title.errors}</p>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor={fields.url.id}>URL Slug</Label>
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-muted-foreground/20 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary sm:max-w-md">
                                <span className="flex select-none items-center pl-3 text-muted-foreground sm:text-sm">
                                    /
                                </span>
                                <Input
                                    name={fields.url.name}
                                    defaultValue={fields.url.initialValue}
                                    key={fields.url.key}
                                    placeholder="30-min-meeting"
                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-foreground placeholder:text-muted-foreground focus-visible:ring-0 sm:text-sm sm:leading-6"
                                />
                            </div>
                            <p className="text-red-500 text-sm">{fields.url.errors}</p>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor={fields.duration.id}>Duration (minutes)</Label>
                            <Input
                                type="number"
                                name={fields.duration.name}
                                defaultValue={fields.duration.initialValue?.toString()}
                                key={fields.duration.key}
                                placeholder="30"
                            />
                            <p className="text-red-500 text-sm">{fields.duration.errors}</p>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor={fields.description.id}>Description</Label>
                            <Input
                                name={fields.description.name}
                                defaultValue={fields.description.initialValue}
                                key={fields.description.key}
                                placeholder="A quick 30 minute meeting"
                            />
                            <p className="text-red-500 text-sm">{fields.description.errors}</p>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor={fields.videoCallSoftware.id}>Video Platform</Label>
                            <Select
                                name={fields.videoCallSoftware.name}
                                defaultValue={fields.videoCallSoftware.initialValue}
                                key={fields.videoCallSoftware.key}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select platform" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Zoom">Zoom</SelectItem>
                                    <SelectItem value="Google Meet">Google Meet</SelectItem>
                                    <SelectItem value="Microsoft Teams">Microsoft Teams</SelectItem>
                                </SelectContent>
                            </Select>
                            <p className="text-red-500 text-sm">{fields.videoCallSoftware.errors}</p>
                        </div>

                        <div className="flex gap-2">
                            <Button type="submit">Update Event Type</Button>
                            <Link href="/dashboard">
                                <Button type="button" variant="outline">
                                    Cancel
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </form>
            </Card>
        </div>
    );
}
