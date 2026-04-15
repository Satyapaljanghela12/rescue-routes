"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, PawPrint } from "lucide-react";

type Campaign = {
  _id?: string;
  title: string;
  description: string;
  image?: string;
  startDate: string;
  endDate: string;
};

export default function UpcomingEventsSection() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch("/api/campaigns");
        const data = await response.json();

        if (data.success) {
          const now = new Date();
          const upcoming = (data.campaigns as Campaign[])
            .filter((campaign) => new Date(campaign.endDate) >= now)
            .sort(
              (a, b) =>
                new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
            )
            .slice(0, 3);

          setCampaigns(upcoming);
        }
      } catch (error) {
        console.error("Error fetching upcoming campaigns:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  const formatDateRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const startLabel = start.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
    });
    const endLabel = end.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    return `${startLabel} - ${endLabel}`;
  };

  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-fredoka font-semibold uppercase tracking-[0.28em] text-primary">
            Upcoming Events
          </p>
          <h2 className="mt-4 font-fredoka text-4xl leading-tight text-foreground sm:text-5xl">
            Upcoming rescue drives, outreach efforts, and community welfare events.
          </h2>
          <p className="mt-5 max-w-2xl text-base font-poppins leading-8 text-foreground/72">
            These events bring together rescue response, treatment support, adoption outreach, and
            community participation to improve the lives of street and abandoned animals.
          </p>
          <p className="mt-4 flex items-center gap-2 text-sm font-poppins font-medium text-foreground/68">
            Join us on the ground and support meaningful action for animals in need.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {loading ? (
            <div className="col-span-full flex justify-center py-16">
              <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-primary" />
            </div>
          ) : campaigns.length > 0 ? (
            campaigns.map((campaign) => (
              <article
                key={campaign._id ?? campaign.title}
                className="overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-[0_18px_50px_rgba(90,55,32,0.08)]"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={campaign.image || "/Images/WhatsApp%20Image%202026-04-11%20at%2020.21.17%20(3).jpeg"}
                    alt={campaign.title}
                    fill
                    className="object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#3f251f]/28 to-transparent" />
                </div>

                <div className="p-7">
                  <div className="inline-flex items-center gap-2 rounded-full bg-[#fac602]/18 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                    <CalendarDays className="h-4 w-4" />
                    {formatDateRange(campaign.startDate, campaign.endDate)}
                  </div>

                  <h3 className="mt-5 font-fredoka text-3xl leading-tight text-foreground">
                    {campaign.title}
                  </h3>
                  <p className="mt-4 text-sm font-poppins leading-7 text-foreground/72">
                    {campaign.description}
                  </p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                      href="/campaigns"
                      className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-fredoka font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-primary-deep"
                    >
                      Learn More
                    </Link>
                    <Link
                      href="/donate"
                      className="inline-flex items-center gap-2 rounded-full border border-black/10 px-5 py-3 text-sm font-fredoka font-semibold uppercase tracking-[0.14em] text-foreground transition hover:border-primary hover:text-primary"
                    >
                      Support This Work
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="col-span-full rounded-[2rem] border border-black/10 bg-white p-10 text-center shadow-[0_18px_50px_rgba(90,55,32,0.08)]">
              <p className="font-fredoka text-3xl text-foreground">No upcoming events right now</p>
              <p className="mt-3 text-sm font-poppins leading-7 text-foreground/68">
                New rescue drives and welfare events will appear here as soon as they are scheduled.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
