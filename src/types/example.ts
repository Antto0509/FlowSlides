import { SlideContent, CarouselTheme, SlideFormat } from "@/types/carousel";

export type NetworkFilter = "all" | "linkedin" | "instagram";

export interface ExampleCarousel {
  id: string;
  title: string;
  description: string;
  network: "linkedin" | "instagram";
  format: SlideFormat;
  theme: CarouselTheme;
  slides: SlideContent[];
  tags: string[];
}