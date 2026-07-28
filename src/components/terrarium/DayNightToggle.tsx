import { Moon, Sun } from "lucide-react";

export function DayNightToggle({
  night,
  onToggle,
}: {
  night: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={night ? "Switch to daytime" : "Switch to dusk"}
      className="group flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-background/60 backdrop-blur-md transition-all duration-500 hover:bg-background/80"
    >
      {night ? (
        <Moon className="h-4 w-4 text-sage-pale transition-transform duration-500 group-hover:rotate-12" />
      ) : (
        <Sun className="h-4 w-4 text-wood transition-transform duration-500 group-hover:rotate-45" />
      )}
    </button>
  );
}
