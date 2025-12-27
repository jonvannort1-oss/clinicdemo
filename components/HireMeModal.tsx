"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Code2, Rocket } from "lucide-react";
import { Button } from "./ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/Card";

export function HireMeModal() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Show modal after 20 seconds
        const timer = setTimeout(() => setIsOpen(true), 20000);

        // Aggressive Exit Intent: Trigger whenever mouse leaves window top
        const handleMouseLeave = (e: MouseEvent) => {
            if (e.clientY <= 0) {
                setIsOpen(true);
            }
        };

        document.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            clearTimeout(timer);
            document.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                        onClick={() => setIsOpen(false)}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md p-4 z-50 pointer-events-none"
                    >
                        <div className="pointer-events-auto">
                            <div className="relative rounded-xl p-[2px] overflow-hidden bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600 shadow-2xl">
                                <Card className="border-0 bg-background/95 backdrop-blur-xl relative pb-4">
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="absolute right-4 top-4 rounded-full p-1 opacity-70 hover:bg-muted transition-all hover:opacity-100 focus:outline-none"
                                    >
                                        <X className="h-4 w-4" />
                                        <span className="sr-only">Close</span>
                                    </button>
                                    <CardHeader className="text-center pb-2 pt-8">
                                        <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center mb-4 shadow-inner">
                                            <Rocket className="w-8 h-8 text-emerald-600" />
                                        </div>
                                        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
                                            Ready to automate your clinic?
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-center space-y-4">
                                        <p className="text-muted-foreground text-base">
                                            This entire demo, plus customized patient experience upgrades and follow-ups can be running for your business in less than a week.
                                        </p>
                                        <div className="space-y-3">
                                            <Button className="w-full h-12 text-base font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg shadow-emerald-500/20" size="lg">
                                                I want this for my clinic!
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                className="w-full text-muted-foreground hover:text-foreground"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                I need to know more
                                            </Button>
                                        </div>
                                        <div className="pt-2 flex items-center justify-center gap-2 text-xs text-muted-foreground/60">
                                            <Code2 className="w-3 h-3" />
                                            <span>Custom built for high performance</span>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
