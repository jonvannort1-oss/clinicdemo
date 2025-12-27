"use client";

import { Button } from "@/components/ui/Button";
import { CheckCircle2, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OnboardPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        clinicName: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Workaround for GHL Country Picker:
        // The widget likely expects a raw 10-digit number if it handles the country code via UI.
        // We stripped non-digits. If it starts with 1 and is 11 digits, strip the leading 1.
        let rawPhone = formData.phone.replace(/\D/g, "");
        if (rawPhone.length === 11 && rawPhone.startsWith("1")) {
            rawPhone = rawPhone.substring(1);
        }
        // If user entered +1..., we took it out above. Now we just ensure we send the 10-digit national number.

        // Construct query params
        // Mapping to standard keys often used by GHL widgets:
        // first_name, last_name, email, phone, organization/company
        const params = new URLSearchParams({
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            phone: rawPhone,
            phone_number: rawPhone, // Adding alternative key for GHL autofill
            organization: formData.clinicName, // standard naming guess
            // Also passing as camelCase just in case custom logic uses it
            firstName: formData.firstName,
            lastName: formData.lastName,
            clinicName: formData.clinicName
        });

        router.push(`/schedule?${params.toString()}`);
    };

    return (
        <main className="min-h-screen bg-[#0B0E14] text-white selection:bg-emerald-500/30">
            {/* Minimal Header */}
            <header className="container mx-auto px-4 py-6 flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold tracking-tighter">
                    Zenith
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
