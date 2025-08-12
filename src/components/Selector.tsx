import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { createPortal } from "react-dom";

interface GenreSelectProps {
  genres: { id: number; name: string }[];
  selectedGenre: number | null;
  setSelectedGenre: (id: number | null) => void;
}

export const Selector = ({
  genres,
  selectedGenre,
  setSelectedGenre,
}: GenreSelectProps) => {
  const selectedName =
    genres.find((g) => g.id === selectedGenre)?.name || "All Genres";

  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleOpen = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
    setOpen((prev) => !prev);
  };

  return (
    <div className="relative w-full md:w-64 text-white z-40">
      <button
        ref={buttonRef}
        onClick={toggleOpen}
        className="w-full flex justify-between items-center px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm font-semibold hover:bg-white/20 transition-all"
      >
        {selectedName}
        <ChevronDown
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open &&
        createPortal(
          <ul
            style={{ top: coords.top, left: coords.left, width: coords.width }}
            className="absolute z-50 mt-2 w-full max-h-60 overflow-y-auto bg-white/80 backdrop-blur-sm rounded-xl shadow-lg"
          >
            <li
              className="px-4 py-2 cursor-pointer hover:bg-white/20"
              onClick={() => {
                setSelectedGenre(null);
                setOpen(false);
              }}
            >
              All Genres
            </li>
            {genres.map((g) => (
              <li
                key={g.id}
                className="px-4 py-2 cursor-pointer hover:bg-white/20"
                onClick={() => {
                  setSelectedGenre(g.id);
                  setOpen(false);
                }}
              >
                {g.name}
              </li>
            ))}
          </ul>,
          document.body
        )}
    </div>
  );
};
