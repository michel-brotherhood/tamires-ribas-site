import type { Metadata } from "next";
import Experience360, { type PanoramaOption } from "@/components/Experience360";

export const metadata: Metadata = {
  title: "Tour 360° — TR Arquitetura e Interiores",
  description:
    "Explore os ambientes dos projetos em tours imersivos 360°, hospedados no Chaos Cloud.",
};

const OPTIONS: PanoramaOption[] = [
  {
    id: "ana-jorge",
    title: "Ana e Jorge",
    rooms: "Sala, escritório, gourmet e varanda master",
    url: "https://cloud.chaos.com/collaboration/folder/S31c7pgGDFS3kgRgbKkLgj/present?n=UGAdCU3SN4hRA79F1onM31",
  },
  {
    id: "rafaella-leandro-suite",
    title: "Rafaella e Leandro",
    rooms: "Suíte master",
    url: "https://cloud.chaos.com/collaboration/folder/4d4Bt4Xy8ueKiiSULcZ9aH/present?n=DVPQhJAA4RYZKe2YUyTR2D",
  },
  {
    id: "rafaella-leandro-social",
    title: "Rafaella e Leandro",
    rooms: "Sala, cozinha, gourmet, área externa e fachadas",
    url: "https://cloud.chaos.com/collaboration/folder/74E6DovZdBMJ8XL6eJG6eN/present?n=4G1A8Mv3q6m3HqGbXBFgEB",
  },
];

export default function Experience360Page() {
  return <Experience360 options={OPTIONS} />;
}
