import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, Users, Maximize2, CheckCircle2 } from "lucide-react";
import { CENTERS_DATA } from "@/components/sections/locations/types";

interface CenterPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return CENTERS_DATA.map((center) => ({
    slug: center.slug,
  }));
}

export default async function CenterDetailPage({ params }: CenterPageProps) {
  const { slug } = await params;
  const center = CENTERS_DATA.find((c) => c.slug === slug);

  if (!center) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#F5F5F0] text-[#0F172A] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/#locations"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#0891B2] hover:text-[#065F78] mb-8 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to All Centers</span>
        </Link>

        <div className="bg-white rounded-[28px] overflow-hidden border border-slate-200/80 shadow-xl">
          <div className="relative w-full h-[360px] sm:h-[460px]">
            <Image
              src={center.image}
              alt={center.name}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0891B2] text-xs font-bold mb-3">
                <MapPin className="w-3.5 h-3.5" />
                <span>{center.areaLabel}</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black">{center.name}</h1>
              <p className="text-slate-200 text-sm sm:text-base mt-1">{center.tagline}</p>
            </div>
          </div>

          <div className="p-6 sm:p-10">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-slate-100">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-slate-700 font-semibold text-sm">
                  <Users className="w-4 h-4 text-[#0891B2]" />
                  <span>{center.spaces}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 font-semibold text-sm">
                  <Maximize2 className="w-4 h-4 text-[#0891B2]" />
                  <span>{center.sqft}</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs uppercase font-bold text-slate-400 block">Pricing From</span>
                <span className="text-2xl sm:text-3xl font-black text-[#0F172A]">
                  ₹{center.price.toLocaleString("en-IN")}
                  <span className="text-sm font-semibold text-slate-500"> /month</span>
                </span>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Zero maintenance charges • High-speed Wi-Fi • 24/7 Power Backup</span>
              </div>

              <Link
                href="/#contact"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#0891B2] hover:bg-[#065F78] text-white font-bold text-sm text-center shadow-lg shadow-[#0891B2]/20 transition-all hover:scale-102"
              >
                Schedule Tour at {center.name}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
