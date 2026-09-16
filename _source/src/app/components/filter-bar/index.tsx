"use client";

type Props = {
  allTypes: string[];
  allCategories: string[];
  selectedTypes: string[];
  selectedCategories: string[];
  onToggleType: (t: string) => void;
  onToggleCategory: (c: string) => void;
  onClear: () => void;
  view: "gallery" | "list";
  onSetView: (v: "gallery" | "list") => void;
};

function Pill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`py-2 px-4 rounded-full text-sm font-medium border transition-colors ${
        active
          ? "bg-primary text-white border-primary"
          : "bg-white text-black border-mistGray hover:border-primary"
      }`}
    >
      {label}
    </button>
  );
}

const FilterBar = ({
  allTypes,
  allCategories,
  selectedTypes,
  selectedCategories,
  onToggleType,
  onToggleCategory,
  onClear,
  view,
  onSetView,
}: Props) => {
  const hasActiveFilters = selectedTypes.length > 0 || selectedCategories.length > 0;

  return (
    <div className="flex flex-col gap-4 py-6 border-b border-black">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-secondary mr-1">Type</span>
          {allTypes.map((t) => (
            <Pill
              key={t}
              label={t}
              active={selectedTypes.includes(t)}
              onClick={() => onToggleType(t)}
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
        {hasActiveFilters && (
          <button
            onClick={onClear}
            className="text-sm text-secondary underline underline-offset-2 ml-2"
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
