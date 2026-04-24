import { cookies } from "next/headers";
import { NextResponse } from "next/server";

async function handler(request, { params }) {
    const cookieStore = await cookies();
    const allCookies = cookieStore
        .getAll()
        .map((c) => `${c.name}=${c.value}`)
        .join("; ");

    const path = (await params).proxy.join("/");
    const method = request.method;
    const body = method !== "GET" ? await request.blob() : undefined;

    // Forward original headers except host
    const headers = {};
    request.headers.forEach((value, key) => {
        if (key !== "host") headers[key] = value;
    });
    headers["Cookie"] = allCookies;
    headers["origin"] = "http://localhost:3000";
    headers["referer"] = "http://localhost:3000/";

    const res = await fetch(`http://127.0.0.1:8000/api/${path}`, {
        method,
        headers,
        body,
        redirect: "manual",
    });

    const contentType = res.headers.get("content-type");
    const data = contentType?.includes("application/json")
        ? await res.json()
        : await res.text();

    const response = NextResponse.json(data, { status: res.status });

    // Forward Set-Cookie headers from Laravel back to browser
    res.headers.getSetCookie().forEach((cookie) => {
        response.headers.append("Set-Cookie", cookie);
    });

    return response;
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
