import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import nylas, { nylasConfig } from "@/lib/nylas";
import { redirect } from "next/navigation";

export async function GET(req: NextRequest) {
    const session = await auth();
    if (!session?.user?.id) {
        return redirect("/");
    }

    const url = new URL(req.url);
    const code = url.searchParams.get("code");

    if (!code) {
        return NextResponse.json("No authorization code returned from Nylas", { status: 400 });
    }

    try {
        const response = await nylas.auth.exchangeCodeForToken({
            clientSecret: nylasConfig.apiKey!,
            clientId: nylasConfig.clientId!,
            redirectUri: nylasConfig.callbackUri!,
            code: code,
        });

        const { grantId, email } = response;

        await prisma.user.update({
            where: {
                id: session.user.id,
            },
            data: {
                grantId: grantId,
                grantEmail: email,
            },
        });

        return redirect("/dashboard");
    } catch (error) {
        console.error("Error exchanging code for token:", error);
        return redirect("/dashboard");
    }
}
