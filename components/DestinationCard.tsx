import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Destination } from "@/lib/data";

export default function DestinationCard({
  item,
  kind = "destination",
}: {
  item: Destination;
  kind?: "destination" | "experience";
}) {
  return (
    <Link href={`/${kind === "experience" ? "experiences" : "destinations"}/${item.slug}`} className="destination-card">
      <div className="card-image-wrap">
        <img src={item.image} alt={item.title} />
        <span className="card-tag">{item.tag}</span>
        <span className="card-arrow">
          <ArrowUpRight size={17} />
        </span>
      </div>
      <div className="card-meta">
        <span>{item.region}</span>
        <span>↗</span>
      </div>
      <h3>{item.title}</h3>
      <p>{item.summary}</p>
      <span className="card-note">{item.note}</span>
    </Link>
  );
}
