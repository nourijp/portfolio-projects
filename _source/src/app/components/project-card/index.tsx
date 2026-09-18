"use client";

import Link from "next/link";

export type ProjectEntry = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  galleryImage?: string;
  listImage?: string;
  detailImage?: string;
  imageFit?: "cover" | "contain";
  galleryImageFit?: "cover" | "contain";
  listImageFit?: "cover" | "contain";
  detailImageFit?: "cover" | "contain";
  types: string[];
  categories: string[];
  companies?: string[];
  minor?: boolean;
  featured?: boolean;
  draft?: boolean;
  badge?: string;
  externalUrl?: string;
  problem?: string[];
  solution?: string[];
  howItWorks?: string[];
  highlights?: string[];
};

function CardInner({ entry, view }: { entry: ProjectEntry; view: "gallery" | "list" }) {
  // Testimonials read better as a pull-quote: the quote itself takes the
  // large/prominent text slot, with the person's name demoted to the small
  // attribution slot below it -- the reverse of a project card, where the
  // title is what matters most.
  const isTestimonial = entry.types.includes("Testimonial");

  if (view === "list") {
    // A testimonial (or any entry) can show a different image in list view
    // than in gallery view -- e.g. a designed quote graphic in the gallery,
    // a headshot in the compact list row.
    const img = entry.listImage || entry.image;
    const imgFit = entry.listImage ? entry.listImageFit : entry.imageFit;
    // A real app icon (entry.listImage) already has its own background baked
    // into the artwork -- no backdrop box behind it. Only the image/gallery
    // fallback (a photo that may letterbox) gets a backdrop.
    const listFitClass = entry.listImage
      ? "object-contain"
      : imgFit === "contain"
      ? "object-contain bg-black"
      : "object-cover bg-softGray";
    return (
      <div className="group flex items-center gap-4 py-4 border-b border-softGray hover:bg-softGray/50 transition-colors px-2 -mx-2 rounded-lg">
        <div className={`relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 ${listFitClass}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img} alt={entry.title} className={`w-full h-full ${imgFit === "contain" ? "object-contain" : "object-cover"}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2">
            <h5 className={`text-lg font-semibold ${isTestimonial ? "line-clamp-2" : "truncate"}`}>
              {isTestimonial ? entry.description : entry.title}
            </h5>
            {entry.badge && (
              <span className="text-xs py-0.5 px-2 rounded-full bg-amber-100 text-amber-800 flex-shrink-0">
                {entry.badge}
              </span>
            )}
          </div>
          <p className="text-sm text-secondary truncate">
            {isTestimonial ? entry.title : entry.description || entry.tagline}
          </p>
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

  // Testimonials lead with the quote, not a photo -- the image shrinks to
  // a small byline avatar next to the name instead of a full-width banner,
  // freeing up the card to give the quote itself the room to breathe.
  if (isTestimonial) {
    const avatarImg = entry.galleryImage || entry.image;
    return (
      <div className="group flex flex-col gap-4 h-full p-6 rounded-xl bg-softGray/60 group-hover:bg-softGray transition-colors">
        <p className="text-lg font-medium leading-snug line-clamp-6 flex-1">
          {entry.description}
        </p>
        <div className="flex items-center gap-3">
          <div className="relative w-9 h-9 rounded-full overflow-hidden flex-shrink-0 bg-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={avatarImg} alt={entry.title} className="w-full h-full object-cover" />
          </div>
          <span className="text-sm font-semibold">{entry.title}</span>
        </div>
      </div>
    );
  }

  // A gallery-card thumbnail can use a different (e.g. pre-cropped, no
  // letterboxing) image than the full detail-page banner.
  const galleryImg = entry.galleryImage || entry.image;
  const galleryImgFit = entry.galleryImage ? entry.galleryImageFit : entry.imageFit;
  const galleryFitClass = galleryImgFit === "contain" ? "object-contain bg-black" : "object-cover bg-softGray";

  return (
    <div className="group flex flex-col gap-3">
      <div className={`relative rounded-xl overflow-hidden ${galleryFitClass}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={galleryImg}
          alt={entry.title}
          className={`w-full h-auto ${galleryImgFit === "contain" ? "object-contain" : "object-cover"} transition-transform duration-300 group-hover:scale-[1.02]`}
        />
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors" />
        {entry.badge && (
          <span className="absolute top-3 left-3 text-xs py-1 px-2.5 rounded-full bg-amber-100 text-amber-800">
            {entry.badge}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="flex flex-wrap gap-1.5">
          {entry.categories.map((c) => (
            <span key={c} className="text-xs py-1 px-2.5 rounded-full bg-softGray text-black">
              {c}
            </span>
          ))}
        </div>
        <h5 className="font-semibold leading-snug line-clamp-3">{entry.title}</h5>
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
