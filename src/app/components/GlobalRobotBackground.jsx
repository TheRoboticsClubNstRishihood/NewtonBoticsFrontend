"use client";

import { usePathname } from "next/navigation";
import { SplineScene } from "@/components/components/ui/splite.tsx";

export default function GlobalRobotBackground() {
  const pathname = usePathname();
  const path = (pathname || "/").toString();
  const isDashboard = path === "/" || path === "/DashBoard" || path.startsWith("/DashBoard/");

  if (isDashboard) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <div className="absolute inset-0 opacity-20">
        <SplineScene
          scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
          className="w-full h-full"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-radial from-black/40 via-transparent to-black/60" />
    </div>
  );
}


