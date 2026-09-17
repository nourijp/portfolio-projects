"use client";

import Link from "next/link";

export type ProjectEntry = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  imageFit?: "cover" | "contain";
  types: string[];
  categories: string[];
  companies?: string[];
  externalUrl?: string;
  problem?: string[];
  solution?: string[];
  howItWorks?: string[];
  highlights?: string[];
};

function CardInner({ entry, view }: { entry: ProjectEntry; view: "gallery" | "list" }) {
  const fitClass = entry.imageFit === "contain" ? "object-contain bg-black" : "object-cover bg-softGray";

  if (view === "list") {
    return (
      <div className="group flex items-center gap-4 py-4 border-b border-softGray hover:bg-softGray/50 transition-colors px-2 -mx-2 rounded-lg">
        <div className={`w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 ${fitClass}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={entry.image} alt={entry.title} className={`w-full h-full ${entry.imageFit === "contain" ? "object-contain" : "object-cover"}`} />
        </div>
        <div className="flex-1 min-w-0">
          <h5 className="text-lg font-semibold truncate">{entry.title}</h5>
          <p className="text-sm text-secondary truncate">{entry.tagline}</p>
        </div>
        <div className="hidden sm:flex flex-wrap gap-1.5 max-w-xs justify-end">
          {entry.categories.map((c) => (
            <span key={c} className="text-xs py-1 px-2.5 rounded-full bg-softGray text-black">
              {c}
            </span>
          ))}
        </div>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 text-secondary group-hover:text-primary transition-colors">
          <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    );
  }

  return (
    <div className="group flex flex-col gap-3 break-inside-avoid mb-6">
      <div className={`relative rounded-xl overflow-hidden ${fitClass}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={entry.image}
          alt={entry.title}
          className={`w-full h-auto ${entry.imageFit === "contain" ? "object-contain" : "object-cover"} transition-transform duration-300 group-hover:scale-[1.02]`}
        />
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors" />
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="flex flex-wrap gap-1.5">
          {entry.categories.map((c) => (
            <span key={c} className="text-xs py-1 px-2.5 rounded-full bg-softGray text-black">
              {c}
            </span>
          ))}
        </div>
        <h5 className="font-semibold leading-snug">{entry.title}</h5>
        <p className="text-sm text-secondary line-clamp-2">{entry.description}</p>
      </div>
    </div>
  );
}

const ProjectCard = ({ entry, view }: { entry: ProjectEntry; view: "gallery" | "list" }) => {
  if (entry.externalUrl) {
    return (
      <a href={entry.externalUrl} target="_blank" rel="noopener noreferrer" className="block">
        <CardInner entry={entry} view={view} />
      </a>
    );
  }
  return (
    <Link href={`/project/${entry.slug}/`} className="block">
      <CardInner entry={entry} view={view} />
    </Link>
  );
};

export default ProjectCard;
