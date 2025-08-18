'use client';

export default function NotFound() {
  return (
    <main className="relative">
      {/* Fixed background video behind the whole page */}
      <div className="fixed inset-0 -z-10">
        <video
          className="w-full h-full object-cover"
          src="/Robot_Eye_Blinking_Survival_Video.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      </div>

      {/* Hero section with dark overlay for readability */}
      <section className="relative w-full min-h-[70vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />
        <div className="relative text-center px-6">
          <h1 className="text-white/90 tracking-widest text-7xl md:text-9xl font-extrabold drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
            404
          </h1>
          <p className="mt-3 text-lg md:text-2xl text-white/80">Page not found</p>
        </div>
      </section>
    </main>
  );
} 