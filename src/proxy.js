const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import { NextResponse } from "next/server";
import { auth } from "./lib/auth";
import { headers } from "next/headers";

export async function proxy(request) {
    console.log(request, "request")
    const session = await auth.api.getSession({
        headers: await headers()
    })
    console.log(session,"session")

    if (session) {
        return NextResponse.next()
    }
    const loginUrl = new URL ('/login', request.url)
    loginUrl.searchParams.set('redirect', request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
}

export const config = {
    matcher: ['/add-idea', '/my-ideas', '/my-profile', '/idea/:path*' ]
}