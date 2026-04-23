"use client";
import { getAuth } from "@/lib/getAuth";
import Link from "next/link";
import { Router } from "next/router";
import { useEffect } from "react";

const Page = () => {
    const hasCookie = getAuth();

    useEffect(() => {
        if (!hasCookie) Router.push("/login");
    }, [hasCookie]);

    return (
        <div className="page">
            <div className="breadcrumbs">
                <Link href="/" className="breadcrumb-link">
                    Hjem
                </Link>
                <span className="breadcrumb-sep">/</span>
                <span>Sælg en bog</span>
            </div>
        </div>
    );
};

export default Page;
