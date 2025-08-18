// components/Navbar.js
"use client";
import { useState, useEffect, useRef } from "react";
import { FiMenu, FiX, FiChevronDown, FiUser, FiPackage, FiList, FiLogOut } from "react-icons/fi";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const getAllowedEmails = () => {
  const fromEnv = (process.env.NEXT_PUBLIC_ALLOWED_ADMIN_EMAILS || "").split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  const fallback = ["admin@example.com"];
  return fromEnv.length ? fromEnv : fallback;
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();

  const toggleMenu = () => setIsOpen((s) => !s);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window === "undefined") return;
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const readEmail = () => {
      try {
        const saved = localStorage.getItem("nb_user_email") || "";
        setUserEmail(saved);
      } catch (_) {
        setUserEmail("");
      }
    };
    readEmail();
    const onStorage = (e) => {
      if (e.key === "nb_user_email") readEmail();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    const onClickAway = (e) => {
      if (!profileRef.current) return;
      if (!profileRef.current.contains(e.target)) setShowProfile(false);
    };
    document.addEventListener("mousedown", onClickAway);
    return () => document.removeEventListener("mousedown", onClickAway);
  }, []);

  const isLoggedIn = Boolean(userEmail);
  const allowedEmails = getAllowedEmails();
  const isAdmin = isLoggedIn && allowedEmails.includes(userEmail.toLowerCase());

  const handleLogout = () => {
    try {
      localStorage.removeItem("nb_user_email");
    } catch (_) {}
    setUserEmail("");
    setShowProfile(false);
    router.refresh();
  };

  const isActive = (path) => {
    if (path === "/DashBoard" || path === "/") {
      return pathname === "/DashBoard" || pathname === "/";
    }
    return pathname === path;
  };

  const getActiveStyles = (path) =>
    isActive(path)
      ? "text-red-500 font-semibold border-b-2 border-red-500"
      : "text-white hover:text-red-500 transition";

  const getMobileActiveStyles = (path) =>
    isActive(path)
      ? "block py-2 px-4 text-red-500 font-semibold bg-red-900/50 border-l-4 border-red-500 transition"
      : "block py-2 px-4 text-white hover:bg-red-900 transition";

  const avatarLabel = userEmail ? userEmail.charAt(0).toUpperCase() : "U";

  return (
    <nav
      className={`sticky top-0 z-[100] w-full transition-all duration-300 ${
        isScrolled ? "bg-black backdrop-blur-lg" : "bg-black"
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between relative">
        {/* Logo */}
        <div className="flex items-center">
          <Link
            href="/DashBoard"
            className="text-2xl font-bold text-white hover:text-red-500 transition"
          >
            Robotics Club
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link href="/DashBoard" className={`${getActiveStyles("/DashBoard")} pb-1`}>
            Home
          </Link>
          <Link href="/aboutus" className={`${getActiveStyles("/aboutus")} pb-1`}>
            About Us
          </Link>
          <Link href="/Projects" className={`${getActiveStyles("/Projects")} pb-1`}>
            Projects
          </Link>
          <Link href="/Workshops" className={`${getActiveStyles("/Workshops")} pb-1`}>
            Workshops
          </Link>
          <Link href="/Events" className={`${getActiveStyles("/Events")} pb-1`}>
            Events
          </Link>
          <Link href="/News" className={`${getActiveStyles("/News")} pb-1`}>
            News
          </Link>
          <Link href="/ourTeam" className={`${getActiveStyles("/ourTeam")} pb-1`}>
            Team
          </Link>
          <Link href="/Gallery" className={`${getActiveStyles("/Gallery")} pb-1`}>
            Gallery
          </Link>
          <Link href="/contact" className={`${getActiveStyles("/contact")} pb-1`}>
            Contact Us
          </Link>

          {/* Auth area */}
          {!isLoggedIn ? (
            <Link
              href="/auth/signin"
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Sign in
            </Link>
          ) : (
            <div
              className="relative group"
              ref={profileRef}
              onMouseEnter={() => setShowProfile(true)}
              onMouseLeave={() => setShowProfile(false)}
            >
              <button
                className="flex items-center gap-2 px-3 py-2 bg-white/10 text-white rounded-full border border-white/20 hover:bg-white/20 transition"
                aria-haspopup="menu"
                aria-expanded={showProfile}
              >
                <span className="w-7 h-7 rounded-full bg-red-600 grid place-items-center text-sm font-bold">
                  {avatarLabel}
                </span>
                <span className="hidden lg:inline text-sm">Profile</span>
                <FiChevronDown className={`hidden lg:inline transition-transform ${showProfile ? "rotate-180" : "rotate-0"}`} />
              </button>

              {/* Dropdown */}
              <div
                className={`invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 absolute right-0 mt-3 w-64 rounded-2xl border border-white/10 bg-neutral-900/95 backdrop-blur-xl shadow-2xl ring-1 ring-white/10 ${showProfile ? "visible opacity-100 translate-y-0" : ""}`}
                role="menu"
              >
                {/* Arrow */}
                <div className="absolute -top-2 right-6 w-3 h-3 rotate-45 bg-neutral-900/95 border-t border-l border-white/10"></div>

                <div className="px-4 py-3 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-full bg-red-600 grid place-items-center text-sm font-bold"><FiUser /></span>
                    <div className="text-sm">
                      <div className="text-white/90 font-medium truncate max-w-[12rem]">{userEmail}</div>
                      <div className="text-white/50">Member</div>
                    </div>
                  </div>
                </div>

                {isAdmin && (
                  <div className="py-1">
                    <div className="px-4 py-2 text-[11px] uppercase tracking-wider text-white/40">Admin Tools</div>
                    <Link
                      href="/Inventory"
                      className="flex items-center gap-2 px-4 py-2 text-white/90 hover:bg-white/10"
                      onClick={() => setShowProfile(false)}
                    >
                      <FiPackage /> Inventory
                    </Link>
                    <Link
                      href="/ProjectRequests"
                      className="flex items-center gap-2 px-4 py-2 text-white/90 hover:bg-white/10"
                      onClick={() => setShowProfile(false)}
                    >
                      <FiList /> Project Requests
                    </Link>
                  </div>
                )}

                <div className="border-t border-white/10">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-left text-white/80 hover:bg-white/10"
                  >
                    <FiLogOut /> Logout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl text-white focus:outline-none"
          onClick={toggleMenu}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute w-full transition-all duration-300 ease-in-out bg-black/95 backdrop-blur-lg overflow-hidden ${
          isOpen ? "max-h-[28rem]" : "max-h-0"
        }`}
        style={{ zIndex: 90 }}
      >
        <div className="py-2">
          <Link href="/DashBoard" className={getMobileActiveStyles("/DashBoard")} onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/aboutus" className={getMobileActiveStyles("/aboutus")} onClick={() => setIsOpen(false)}>About Us</Link>
          <Link href="/Projects" className={getMobileActiveStyles("/Projects")} onClick={() => setIsOpen(false)}>Projects</Link>
          <Link href="/Workshops" className={getMobileActiveStyles("/Workshops")} onClick={() => setIsOpen(false)}>Workshops</Link>
          <Link href="/Events" className={getMobileActiveStyles("/Events")} onClick={() => setIsOpen(false)}>Events</Link>
          <Link href="/News" className={getMobileActiveStyles("/News")} onClick={() => setIsOpen(false)}>News</Link>
          <Link href="/ourTeam" className={getMobileActiveStyles("/ourTeam")} onClick={() => setIsOpen(false)}>Team</Link>
          <Link href="/Gallery" className={getMobileActiveStyles("/Gallery")} onClick={() => setIsOpen(false)}>Gallery</Link>
          <Link href="/contact" className={getMobileActiveStyles("/contact")} onClick={() => setIsOpen(false)}>Contact Us</Link>

          {/* Mobile Profile Section */}
          {!isLoggedIn ? (
            <Link
              href="/auth/signin"
              className="block mx-4 my-3 py-2 bg-red-600 text-white text-center rounded-lg hover:bg-red-700 transition"
              onClick={() => setIsOpen(false)}
            >
              Sign in
            </Link>
          ) : (
            <div className="mx-2 my-2 rounded-lg border border-white/10">
              <div className="px-4 py-2 text-white/80 text-sm border-b border-white/10">{userEmail}</div>
              {isAdmin && (
                <>
                  <Link href="/Inventory" className={getMobileActiveStyles("/Inventory")} onClick={() => setIsOpen(false)}>Inventory</Link>
                  <Link href="/ProjectRequests" className={getMobileActiveStyles("/ProjectRequests")} onClick={() => setIsOpen(false)}>Project Requests</Link>
                </>
              )}
              <button
                onClick={() => { handleLogout(); setIsOpen(false); }}
                className="block w-[calc(100%-2rem)] mx-4 my-3 py-2 bg-white/10 text-white text-center rounded-lg hover:bg-white/20 transition border border-white/20"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
