import type { Metadata } from "next";
import { Testimonials } from "@/components/Testimonials";

export const metadata: Metadata = {
  title: "Testimonials",
};

export default function TestimonialsPage() {
  return <Testimonials />;
}
