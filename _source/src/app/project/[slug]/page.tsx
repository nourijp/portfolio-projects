import Link from "next/link";
import { notFound } from "next/navigation";
import projectsDataJson from "../../../../public/data/projects-data.json";
import { ProjectEntry } from "../../components/project-card";

// Entries with an externalUrl (if any exist in the future) link out from
// the gallery card directly and don't get a local page here.
const localEntries = (projectsDataJson.entries as ProjectEntry[]).filter((e) => !e.externalUrl);

export async function generateStaticParams() {
  return localEntries.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = localEntries.find((e) => e.slug === slug);
  if (!entry) return {};
  return {
    title: `${entry.title} — Hamed Nouri`,
    description: entry.description,
  };
}

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i}>{part.slice(2, -2)}</strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = localEntries.find((e) => e.slug === slug);
  if (!entry) notFound();

  // A detail page can show a different (e.g. higher-res, bezel-free) image
  // than the gallery card -- same override pattern as galleryImage/listImage.
  const detailImg = entry.detailImage || entry.image;
  const detailImgFit = entry.detailImage ? entry.detailImageFit : entry.imageFit;
  const fitClass = detailImgFit === "contain" ? "bg-black" : "bg-softGray";

  return (
    <main className="min-h-screen bg-white pt-28 md:pt-36 pb-24">
      <div className="container max-w-4xl">
        <Link href="/" className="text-sm text-secondary hover:text-primary transition-colors flex items-center gap-2 mb-10">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to all projects
        </Link>

        <div className="flex flex-wrap gap-2 mb-4">
          {entry.types.map((t) => (
            <span key={t} className="text-xs py-1 px-2.5 rounded-full bg-primary text-white">{t}</span>
          ))}
          {entry.categories.map((c) => (
            <span key={c} className="text-xs py-1 px-2.5 rounded-full bg-softGray text-black">{c}</span>
          ))}
          {(entry.companies || []).map((c) => (
            <span key={c} className="text-xs py-1 px-2.5 rounded-full border border-mistGray text-black">{c}</span>
          ))}
        </div>

        <h1 className="text-4xl md:text-5xl font-semibold leading-tight mb-6">{entry.title}</h1>
        <p className="text-xl text-secondary leading-relaxed mb-10">{entry.description}</p>

        {/*
          Natural-aspect-ratio container, not a fixed height: a fixed
          h-72/h-96 box combined with object-cover crops down to a sliver of
          a wide banner image on a narrow (mobile) viewport -- e.g. a
          3.36:1 crop would show just its center on a phone. Scaling height
          to width instead means the full image is always visible at any
          screen size. max-h caps it from getting excessive on very wide
          desktop viewports; object-contain within that cap handles any
          unusually tall image gracefully too.
        */}
        <div className={`rounded-2xl overflow-hidden mb-14 ${fitClass}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={detailImg}
            alt={entry.title}
            className="w-full h-auto max-h-[70vh] object-contain mx-auto"
          />
        </div>

        {(entry.problem || entry.solution || entry.howItWorks) && (
          <div className="flex flex-col gap-12 mb-14">
            {entry.problem && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">The Problem</h2>
                <div className="flex flex-col gap-3">
                  {entry.problem.map((p, i) => (
                    <p key={i} className="text-lg text-secondary leading-relaxed">{p}</p>
                  ))}
                </div>
              </div>
            )}
            {entry.solution && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">The Solution</h2>
                <div className="flex flex-col gap-3">
                  {entry.solution.map((p, i) => (
                    <p key={i} className="text-lg text-secondary leading-relaxed">{p}</p>
                  ))}
                </div>
              </div>
            )}
            {entry.howItWorks && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
                <div className="flex flex-col gap-3">
                  {entry.howItWorks.map((p, i) => (
                    <p key={i} className="text-lg text-secondary leading-relaxed">{renderInline(p)}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {entry.highlights && entry.highlights.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-6 pb-4 border-b border-black">Highlights</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {entry.highlights.map((item, i) => (
                <li key={i} className="flex items-start gap-3 bg-softGray rounded-xl px-6 py-5">
                  <span className="mt-1 w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                  <span className="text-base">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}
