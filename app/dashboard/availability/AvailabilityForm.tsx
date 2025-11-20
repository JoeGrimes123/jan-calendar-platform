"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { updateAvailabilityAction } from "./actions";
import { useActionState } from "react";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { availabilitySchema } from "@/lib/zodSchemas";
import { Loader2 } from "lucide-react";

const times = [
    "00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30",
    "04:00", "04:30", "05:00", "05:30", "06:00", "06:30", "07:00", "07:30",
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
    "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30",
];

type AvailabilityData = Record<string, { isActive: boolean; fromTime: string; tillTime: string }>;

export function AvailabilityForm({ data }: { data: AvailabilityData }) {
    const [lastResult, action, isPending] = useActionState(updateAvailabilityAction, undefined);

    const [form] = useForm({
        lastResult,
        onValidate({ formData }) {
            return parseWithZod(formData, { schema: availabilitySchema });
        },
        shouldValidate: "onBlur",
        shouldRevalidate: "onInput",
    });

    return (
        <Card>
            <CardHeader>
                <CardTitle>Availability</CardTitle>
                <CardDescription>
                    Manage your working hours and availability.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form id={form.id} onSubmit={form.onSubmit} action={action}>
                    <div className="grid gap-4">
                        {["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].map(
                            (day) => {
                                const upperDay = day.toUpperCase();
                                const dayData = data[upperDay] || {
                                    isActive: false,
                                    fromTime: "09:00",
                                    tillTime: "17:00",
                                };

                                return (
                                    <div
                                        key={day}
                                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-center gap-4 border-b pb-4 last:border-0 last:pb-0"
                                    >
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="hidden"
                                                name={`${day}.isActive`}
                                                value={dayData.isActive ? "on" : "off"} // Initial value, but Switch controls it via state? No.
                                            // Conform expects the input to be present.
                                            // Radix Switch does NOT emit a named input by default in some versions.
                                            // We need to manually handle the hidden input for the switch.
                                            />
                                            <Switch
                                                name={`${day}.isActive`}
                                                defaultChecked={dayData.isActive}
                                            />
                                            <Label className="capitalize">{day}</Label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Select name={`${day}.fromTime`} defaultValue={dayData.fromTime}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="From" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {times.map((time) => (
                                                        <SelectItem key={time} value={time}>
                                                            {time}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Select name={`${day}.tillTime`} defaultValue={dayData.tillTime}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Till" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {times.map((time) => (
                                                        <SelectItem key={time} value={time}>
                                                            {time}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                );
                            }
                        )}
                        <div className="flex justify-end">
                            <Button type="submit" disabled={isPending}>
                                {isPending ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    "Save Changes"
                                )}
                            </Button>
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
