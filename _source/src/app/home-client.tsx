"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import projectsDataJson from "../../public/data/projects-data.json";
import FilterBar from "./components/filter-bar";
import ProjectCard, { ProjectEntry } from "./components/project-card";

const entries = projectsDataJson.entries as ProjectEntry[];

function parseList(v: string | null): string[] {
  return v ? v.split(",").filter(Boolean) : [];
}

export default function HomeClient() {
  const searchParams = useSearchParams();

  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [view, setView] = useState<"gallery" | "list">("gallery");
  const [hydrated, setHydrated] = useState(false);

  // Initialize from URL on first load so filtered links from other sites work.
  useEffect(() => {
    setSelectedTypes(parseList(searchParams.get("type")));
    setSelectedCategories(parseList(searchParams.get("category")));
    setSelectedCompanies(parseList(searchParams.get("company")));
    const v = searchParams.get("view");
    if (v === "list" || v === "gallery") setView(v);
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep the URL in sync so the current filtered view is always shareable.
  // Uses the plain History API (not next/navigation's router) -- this is a
  // static export with no Next.js server behind it in production, and the
  // client router's soft-navigation fetch breaks against a plain static
  // host. A direct history update just changes the address bar, no fetch.
  useEffect(() => {
    if (!hydrated) return;
    const params = new URLSearchParams();
    if (selectedTypes.length) params.set("type", selectedTypes.join(","));
    if (selectedCategories.length) params.set("category", selectedCategories.join(","));
    if (selectedCompanies.length) params.set("company", selectedCompanies.join(","));
    if (view !== "gallery") params.set("view", view);
    const qs = params.toString();
    const url = qs ? `${window.location.pathname}?${qs}` : window.location.pathname;
    window.history.replaceState(null, "", url);
  }, [selectedTypes, selectedCategories, selectedCompanies, view, hydrated]);

  const allTypes = useMemo(
    () => Array.from(new Set(entries.flatMap((e) => e.types))).sort(),
    []
  );
  const allCategories = useMemo(
    () => Array.from(new Set(entries.flatMap((e) => e.categories))).sort(),
    []
  );
  const allCompanies = useMemo(
    () => Array.from(new Set(entries.flatMap((e) => e.companies || []))).sort(),
    []
  );

  const filtered = useMemo(() => {
    return entries.filter((e) => {
      const typeMatch = selectedTypes.length === 0 || e.types.some((t) => selectedTypes.includes(t));
      const catMatch = selectedCategories.length === 0 || e.categories.some((c) => selectedCategories.includes(c));
      const companyMatch =
        selectedCompanies.length === 0 || (e.companies || []).some((c) => selectedCompanies.includes(c));
      return typeMatch && catMatch && companyMatch;
    });
  }, [selectedTypes, selectedCategories, selectedCompanies]);

  const toggleType = (t: string) =>
    setSelectedTypes((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));
  const toggleCategory = (c: string) =>
    setSelectedCategories((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));
  const toggleCompany = (c: string) =>
    setSelectedCompanies((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));
  const clear = () => {
    setSelectedTypes([]);
    setSelectedCategories([]);
    setSelectedCompanies([]);
  };

  return (
    <main className="pt-28 md:pt-36 pb-20">
      <div className="container">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight">Projects & Accomplishments</h1>
          <p className="text-secondary mt-4 text-lg">
            A working record of what I&rsquo;ve built and done, filterable by type, category, and company.
            Click through for the full story on each one.
          </p>
        </div>

        <FilterBar
          allTypes={allTypes}
          allCategories={allCategories}
          allCompanies={allCompanies}
          selectedTypes={selectedTypes}
          selectedCategories={selectedCategories}
          selectedCompanies={selectedCompanies}
          onToggleType={toggleType}
          onToggleCategory={toggleCategory}
          onToggleCompany={toggleCompany}
          onClear={clear}
          view={view}
          onSetView={setView}
        />

        {filtered.length === 0 ? (
          <p className="text-secondary py-16 text-center">No entries match these filters yet.</p>
        ) : view === "gallery" ? (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 pt-8">
            {filtered.map((entry) => (
              <ProjectCard key={entry.slug} entry={entry} view="gallery" />
            ))}
          </div>
        ) : (
          <div className="pt-4">
            {filtered.map((entry) => (
              <ProjectCard key={entry.slug} entry={entry} view="list" />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
