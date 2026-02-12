"use client";

import { useCarouselStore } from "@/store/carousel.store";
import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
    const step = useCarouselStore((s) => s.step);

    return (
        <div className="flex flex-col items-center justify-center h-full gap-4">
            <Spinner />
            <p className="text-gray-500">
                {step === 2 && "Génération du hook..."}
                {step === 3 && "Génération du template..."}
                {step === 4 && "Génération du carousel..."}
                {step === 5 && "Préparation de l'export..."}
            </p>
        </div>
    );
}