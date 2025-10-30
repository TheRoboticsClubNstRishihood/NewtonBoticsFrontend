import GalleryClient from "./GalleryClient";
import { Suspense } from "react";

export const metadata = {
  title: "Gallery | NewtonBotics",
  description: "Raw photos and videos from our lab and events.",
};

export default function GalleryPage() {
  return (
    <Suspense fallback={<div>Loading Gallery...</div>}>
      <GalleryClient />
    </Suspense>
  );
} 