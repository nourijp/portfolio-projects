"use client";

type Props = {
  allTypes: string[];
  allCategories: string[];
  allCompanies: string[];
  selectedTypes: string[];
  selectedCategories: string[];
  selectedCompanies: string[];
  onSetType: (t: string) => void;
  onToggleCategory: (c: string) => void;
  onToggleCompany: (c: string) => void;
  onClear: () => void;
  view: "gallery" | "list";
  onSetView: (v: "gallery" | "list") => void;
};

function Pill({
  label,
  active,
  onClick,
  icon,
  darkInactive,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
  // Type pills sit inactive-black/active-orange; Category and Company
  // pills keep the original inactive-white look.
  darkInactive?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 py-2 px-4 rounded-full text-sm font-medium border transition-colors ${
        active
          ? "bg-primary text-white border-primary"
          : darkInactive
          ? "bg-black text-white border-black hover:border-primary"
          : "bg-white text-black border-mistGray hover:border-primary"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

// One glyph per Type pill -- a quick visual anchor alongside the label.
// currentColor so each icon follows the pill's active/inactive text color.
const TYPE_ICONS: Record<string, React.ReactNode> = {
  Project: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 8l-9-5-9 5v8l9 5 9-5V8z" />
      <path d="M3 8l9 5 9-5" />
      <path d="M12 13v8" />
    </svg>
  ),
  Accomplishment: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  ),
  Testimonial: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M7.17 6C4.86 8 3 11.09 3 14.5 3 17.54 5.11 20 8.06 20c2.71 0 4.66-2.11 4.66-4.66 0-2.44-1.73-4.16-3.98-4.16-.47 0-.9.08-1.24.2.3-2.06 1.9-4.15 3.86-5.4L7.17 6zm10 0c-2.31 2-4.17 5.09-4.17 8.5 0 3.04 2.11 5.5 5.06 5.5 2.71 0 4.66-2.11 4.66-4.66 0-2.44-1.73-4.16-3.98-4.16-.47 0-.9.08-1.24.2.3-2.06 1.9-4.15 3.86-5.4L17.17 6z" />
    </svg>
  ),
};

const FilterBar = ({
  allTypes,
  allCategories,
  allCompanies,
  selectedTypes,
  selectedCategories,
  selectedCompanies,
  onSetType,
  onToggleCategory,
  onToggleCompany,
  onClear,
  view,
  onSetView,
}: Props) => {
  // Type is single-select and always has a value, so it isn't counted as an
  // "active filter" unless it's been switched away from the default.
  const hasActiveFilters =
    (selectedTypes[0] && selectedTypes[0] !== "Project") ||
    selectedCategories.length > 0 ||
    selectedCompanies.length > 0;

  return (
    <div className="flex flex-col gap-4 py-6 border-b border-black">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-secondary mr-1">Type</span>
          {allTypes.map((t) => (
            <Pill
              key={t}
              label={t}
              icon={TYPE_ICONS[t]}
              active={selectedTypes.includes(t)}
              darkInactive
              onClick={() => onSetType(t)}
            />
          ))}
        </div>

        <div className="flex items-center gap-1 bg-softGray rounded-full p-1">
          <button
            onClick={() => onSetView("gallery")}
            aria-label="Gallery view"
            className={`w-9 h-9 flex items-center justify-center rounded-full transition-colors ${
              view === "gallery" ? "bg-white shadow-sm" : ""
            }`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="7" height="9" rx="1.5" fill="currentColor" />
              <rect x="14" y="3" width="7" height="5" rx="1.5" fill="currentColor" />
              <rect x="14" y="12" width="7" height="9" rx="1.5" fill="currentColor" />
              <rect x="3" y="16" width="7" height="5" rx="1.5" fill="currentColor" />
            </svg>
          </button>
          <button
            onClick={() => onSetView("list")}
            aria-label="List view"
            className={`w-9 h-9 flex items-center justify-center rounded-full transition-colors ${
              view === "list" ? "bg-white shadow-sm" : ""
            }`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="4" width="18" height="4" rx="1.5" fill="currentColor" />
              <rect x="3" y="10" width="18" height="4" rx="1.5" fill="currentColor" />
              <rect x="3" y="16" width="18" height="4" rx="1.5" fill="currentColor" />
            </svg>
          </button>
        </div>
      </div>

      {allCategories.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-secondary mr-1">Category</span>
          {allCategories.map((c) => (
            <Pill
              key={c}
              label={c}
              active={selectedCategories.includes(c)}
              onClick={() => onToggleCategory(c)}
            />
          ))}
        </div>
      )}

      {allCompanies.length > 1 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-secondary mr-1">Company</span>
          {allCompanies.map((c) => (
            <Pill
              key={c}
              label={c}
              active={selectedCompanies.includes(c)}
              onClick={() => onToggleCompany(c)}
            />
          ))}
        </div>
      )}

      {hasActiveFilters && (
        <button
          onClick={onClear}
          className="py-2 px-4 rounded-full text-sm font-medium border border-mistGray bg-white text-black hover:border-primary transition-colors w-fit flex items-center gap-1.5"
        >
          Clear filters
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default FilterBar;
