"use client";

import { usePathname } from "next/navigation";

export default function GlobalRobotBackground() {
  const pathname = usePathname();
  const path = (pathname || "/").toString();
  const isDashboard = path === "/" || path === "/DashBoard" || path.startsWith("/DashBoard/");

  if (isDashboard) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <div className="absolute inset-0 opacity-20">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/robotanimation.mov" type="video/quicktime" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="absolute inset-0 bg-gradient-radial from-black/40 via-transparent to-black/60" />
    </div>
  );
}


