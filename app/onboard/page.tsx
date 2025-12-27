"use client";

import { Button } from "@/components/ui/Button";
import { CheckCircle2, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function OnboardForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const urlClinicName = searchParams.get("clinicName") || "";

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        clinicName: ""
    });

    // Autofill clinicName from URL on mount
    useEffect(() => {
        if (urlClinicName) {
            setFormData(prev => ({ ...prev, clinicName: urlClinicName }));
        }
    }, [urlClinicName]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Basic validation check
        if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.clinicName.trim()) {
            alert("Please fill in all fields.");
            return;
        }

        // Format phone number: Send raw 10 digits only (no country code prefix)
        let formattedPhone = formData.phone.replace(/\D/g, ""); // Remove non-digits

        // If 11 digits starting with 1, strip the leading 1 to get 10 digits
        if (formattedPhone.length === 11 && formattedPhone.startsWith("1")) {
            formattedPhone = formattedPhone.substring(1);
        }
        // Otherwise, just use the digits as-is (should be 10 digits)

        // Construct query params
        const params = new URLSearchParams({
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            phone: formattedPhone,
            organization: formData.clinicName,
            firstName: formData.firstName,
            lastName: formData.lastName,
            clinicName: formData.clinicName
        });

        router.push(`/schedule?${params.toString()}`);
    };

    return (
        <main className="min-h-screen bg-[#0B0E14] text-white selection:bg-emerald-500/30">
            <header className="container mx-auto px-4 py-6 flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold tracking-tighter">
                    {urlClinicName || "Zenith"}
                </Link>
            </header>

            <div className="container mx-auto px-4 py-8 md:py-24 max-w-6xl">
                <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start">

                    {/* Left Column: Value Prop */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
                                Ready to <span className="text-emerald-400">Automate</span> Your Clinic?
                            </h1>
                            <p className="text-xl text-muted-foreground">
                                Join the top 1% of clinics using AI to book appointments 24/7. Setup takes less than 24 hours.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-400 h-fit">
                                    <Zap className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white text-lg">Instant setup</h3>
                                    <p className="text-muted-foreground">We handle the technical integration with your existing tools.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-400 h-fit">
                                    <ShieldCheck className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white text-lg">Risk-Free Pilot</h3>
                                    <p className="text-muted-foreground">Try it for 30 days. If you don't save 10+ hours, you don't pay.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Intake Form / Scheduler Embed Payload */}
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm shadow-2xl relative overflow-hidden">
                        {/* Glow effect */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[100px] -z-10" />

                        <div className="mb-8">
                            <h2 className="text-2xl font-bold mb-2">Secure Your Spot</h2>
                            <p className="text-muted-foreground text-sm">
                                Fill out the form below to schedule your technical onboarding.
                            </p>
                        </div>

                        {/* Real Form Logic */}
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="firstName" className="text-sm font-medium text-gray-300">First Name</label>
                                    <input
                                        id="firstName"
                                        type="text"
                                        required
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all placeholder:text-white/20"
                                        placeholder="Jane"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="lastName" className="text-sm font-medium text-gray-300">Last Name</label>
                                    <input
                                        id="lastName"
                                        type="text"
                                        required
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all placeholder:text-white/20"
                                        placeholder="Doe"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="clinicName" className="text-sm font-medium text-gray-300">Clinic Name</label>
                                <input
                                    id="clinicName"
                                    type="text"
                                    required
                                    value={formData.clinicName}
                                    onChange={handleChange}
                                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all placeholder:text-white/20"
                                    placeholder="Ex. Tranquil Massage"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-gray-300">Work Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all placeholder:text-white/20"
                                    placeholder="jane@clinic.com"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="phone" className="text-sm font-medium text-gray-300">Phone</label>
                                <input
                                    id="phone"
                                    type="tel"
                                    required
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all placeholder:text-white/20"
                                    placeholder="(555) 000-0000"
                                />
                            </div>

                            <Button type="submit" size="lg" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-14 mt-4 text-lg shadow-lg shadow-emerald-500/20">
                                Book Onboarding Call <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>

                            <p className="text-xs text-center text-muted-foreground mt-4">
                                By clicking above, you agree to our Terms. Your data is secure.
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default function OnboardPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#0B0E14]" />}>
            <OnboardForm />
        </Suspense>
    );
}
