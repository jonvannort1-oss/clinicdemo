"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function SchedulePage() {
    const searchParams = useSearchParams();
    const iframeRef = useRef<HTMLIFrameElement>(null);

    // Get user details from URL for potential usage/confirmation
    const firstName = searchParams.get("firstName") || "";
    // Note: The GHL embed script often handles URL params automatically if they match standard keys
    // We are passing them in the URL which is the standard way GHL widgets pick them up.

    return (
        <main className="min-h-screen bg-[#0B0E14] text-white selection:bg-emerald-500/30 flex flex-col">
            <header className="container mx-auto px-4 py-6 flex items-center justify-between border-b border-white/5">
                <Link href="/" className="text-2xl font-bold tracking-tighter">
                    Zenith
                </Link>
            </header>

            <div className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
                <div className="text-center mb-10 space-y-4">
                    <div className="inline-flex items-center justify-center p-3 rounded-full bg-emerald-500/10 text-emerald-500 mb-4">
                        <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold">You're One Step Away</h1>
                    <p className="text-xl text-muted-foreground">
                        Select a time below to finalize your clinic's automation setup.
                        {firstName && <span className="block mt-2 text-emerald-400">Welcome, {firstName}!</span>}
                    </p>
                </div>

                <div className="w-full bg-white rounded-xl overflow-hidden shadow-2xl min-h-[700px]">
                    <iframe
                        src={`https://api.leadconnectorhq.com/widget/booking/lGzVVFd7LHYgo7gLGxrV?${searchParams.toString()}`}
                        style={{ width: "100%", border: "none", height: "100vh", minHeight: "800px" }}
                        scrolling="yes"
                        id="lGzVVFd7LHYgo7gLGxrV_1766851261475"
                        ref={iframeRef}
                    ></iframe>
                    <script src="https://link.msgsndr.com/js/form_embed.js" type="text/javascript"></script>
                </div>
            </div>
        </main>
    );
}
