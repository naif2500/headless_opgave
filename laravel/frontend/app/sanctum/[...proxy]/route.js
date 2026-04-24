import { cookies } from "next/headers";
import { NextResponse } from "next/server";

async function handler(request, { params }) {
    const resolvedParams = await params;
    const path = resolvedParams.proxy.join("/");
    const url = `http://127.0.0.1:8000/sanctum/${path}`;

    const cookieStore = await cookies();
    const allCookies = cookieStore
        .getAll()
        .map((c) => `${c.name}=${c.value}`)
        .join("; ");

    const res = await fetch(url, {
        method: request.method,
        headers: {
            ...Object.fromEntries(request.headers),
            Cookie: allCookies,
            origin: "http://localhost:3000",
            referer: "http://localhost:3000/",
        },
    });

    const contentType = res.headers.get("content-type");
    const data =
        res.status === 204
            ? null
            : contentType?.includes("application/json")
              ? await res.json()
              : await res.text();

    const response =
        res.status === 204
            ? new NextResponse(null, { status: 204 })
            : NextResponse.json(data, { status: res.status });

    res.headers.getSetCookie().forEach((cookie) => {
        response.headers.append("Set-Cookie", cookie);
    });

    return response;
}

export const GET = handler;
export const POST = handler;
