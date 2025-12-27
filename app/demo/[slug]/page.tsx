"use client";

import { MockIntakeForm } from "@/components/MockIntakeForm";
import { MockServiceCalendar } from "@/components/MockServiceCalendar";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Sparkles, Leaf, Droplets } from "lucide-react";
import Link from "next/link";
import { HireMeModal } from "@/components/HireMeModal";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function DemoPage() {
    const params = useParams();
    const clinicName = decodeURIComponent(params.slug as string);

    return (
        <main className="min-h-screen bg-gradient-to-b from-[#0a1612] via-[#0d1f1a] to-[#0B0E14] text-white relative selection:bg-emerald-500/30 overflow-hidden">
            {/* Serene Background Hero Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/spa-hero.png"
                    alt="Serene spa atmosphere"
                    fill
                    className="object-cover opacity-30"
                    priority
                />
                {/* Gradient overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a1612]/60 via-[#0d1f1a]/80 to-[#0B0E14]" />
            </div>

            {/* Top Banner - Demo Indicator */}
            <div className="sticky top-0 z-50 bg-emerald-900/90 backdrop-blur-md border-b border-emerald-500/30 text-white px-4 py-3 shadow-xl">
                <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-sm font-medium">
                        <Sparkles className="w-4 h-4 text-emerald-300" />
                        <span>Preview for <strong>{clinicName}</strong></span>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link href={`/onboard?clinicName=${encodeURIComponent(clinicName)}`} className="text-sm text-emerald-200 hover:text-white transition-colors">
                            Exit Preview
                        </Link>
                        <Button size="sm" className="bg-white text-emerald-900 hover:bg-emerald-50 font-semibold shadow-sm" asChild>
                            <Link href={`/onboard?clinicName=${encodeURIComponent(clinicName)}`}>
                                Get This for My Clinic <ArrowRight className="w-4 h-4 ml-1" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Hero Section */}
            <div className="container mx-auto px-4 pt-12 pb-8 relative z-10">
                <div className="text-center max-w-4xl mx-auto mb-16">
                    {/* Decorative elements */}
                    <div className="flex justify-center gap-3 mb-6">
                        <div className="p-2 rounded-full bg-emerald-500/10 text-emerald-400">
                            <Leaf className="w-5 h-5" />
                        </div>
                        <div className="p-2 rounded-full bg-teal-500/10 text-teal-400">
                            <Droplets className="w-5 h-5" />
                        </div>
                    </div>

                    {/* Clinic Name */}
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                        <span className="bg-gradient-to-r from-emerald-200 via-teal-100 to-emerald-100 bg-clip-text text-transparent drop-shadow-lg">
                            {clinicName}
                        </span>
                    </h1>

                    {/* Tagline */}
                    <p className="text-xl md:text-2xl text-emerald-100/80 font-light max-w-2xl mx-auto leading-relaxed">
                        Where tranquility meets technology.
                        <span className="block mt-2 text-lg text-emerald-200/60">
                            Book your perfect escape in seconds.
                        </span>
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
                    {/* Column 1: Intake */}
                    <div className="space-y-6">
                        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                                    <Leaf className="w-5 h-5" />
                                </div>
                                <h3 className="text-xl font-semibold text-white">New Client Intake</h3>
                            </div>
                            <p className="text-emerald-100/70 text-sm mb-6">
                                Tell us about yourself so we can personalize your experience.
                            </p>
                            <MockIntakeForm />
                        </div>
                    </div>

                    {/* Column 2: Booking */}
                    <div className="space-y-6">
                        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 rounded-lg bg-teal-500/20 text-teal-400">
                                    <Droplets className="w-5 h-5" />
                                </div>
                                <h3 className="text-xl font-semibold text-white">Book Your Session</h3>
                            </div>
                            <p className="text-emerald-100/70 text-sm mb-6">
                                Choose a time that works best for your schedule.
                            </p>
                            <MockServiceCalendar />
                        </div>
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-16">
                    <p className="text-emerald-200/60 text-sm mb-4">Ready to bring this experience to your clients?</p>
                    <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg shadow-emerald-500/20" asChild>
                        <Link href={`/onboard?clinicName=${encodeURIComponent(clinicName)}`}>
                            Automate My Clinic <ArrowRight className="w-5 h-5 ml-2" />
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Re-using the Hire Me Modal to capture the lead after they play with the demo */}
            <HireMeModal clinicName={clinicName} />
        </main>
    );
}
