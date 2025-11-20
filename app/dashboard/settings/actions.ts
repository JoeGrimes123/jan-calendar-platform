"use server";

import nylas, { nylasConfig } from "@/lib/nylas";
import { redirect } from "next/navigation";

export async function connectCalendar() {
    const authUrl = nylas.auth.urlForOAuth2({
        clientId: nylasConfig.clientId!,
        redirectUri: nylasConfig.callbackUri!,
        scope: ["calendar"],
    });

    return redirect(authUrl);
}
