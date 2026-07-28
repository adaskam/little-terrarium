import { createFileRoute } from "@tanstack/react-router";
import { Terrarium } from "@/components/terrarium/Terrarium";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Little Terrarium — a tiny sanctuary" },
      {
        name: "description",
        content:
          "A cozy little glass jar on a wooden shelf. Watch the plants sway, tap to add fireflies, and toggle between soft daylight and dusk.",
      },
      { property: "og:title", content: "Little Terrarium — a tiny sanctuary" },
      {
        property: "og:description",
        content:
          "A quiet, magical glass jar with swaying plants and drifting fireflies. Nothing to win, just something to look at.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Little Terrarium — a tiny sanctuary" },
      {
        name: "twitter:description",
        content: "A cozy glass jar with swaying plants and drifting fireflies.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return <Terrarium />;
}
