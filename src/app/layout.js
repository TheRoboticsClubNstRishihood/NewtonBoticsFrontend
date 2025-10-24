import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import NewsTicker from "./components/NewsTicker";
import DiwaliCelebration from "./components/DiwaliCelebration";
import { AuthProvider } from "../contexts/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "NewtonBotics Robotics Lab - Advancing Robotics & AI Research",
  description: "Join NewtonBotics Robotics Lab - where innovation meets robotics. Explore our projects, workshops, events, and join our community of researchers, students, and mentors dedicated to advancing robotics and AI technology.",
  keywords: "robotics, artificial intelligence, robotics lab, NewtonBotics, research, innovation, automation, drones, healthcare robotics, industrial robotics",
  authors: [{ name: "NewtonBotics Team" }],
  creator: "NewtonBotics Robotics Lab",
  publisher: "NewtonBotics",
  robots: "index, follow",
  alternates: {
    canonical: "https://your-domain.com",
  },
  openGraph: {
    title: "NewtonBotics Robotics Lab - Advancing Robotics & AI Research",
    description: "Join NewtonBotics Robotics Lab - where innovation meets robotics. Explore our projects, workshops, events, and join our communities.",
    type: "website",
    locale: "en_US",
    siteName: "NewtonBotics Robotics Lab",
    url: "https://your-domain.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "NewtonBotics Robotics Lab - Advancing Robotics & AI Research",
    description: "Join NewtonBotics Robotics Lab - where innovation meets robotics.",
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#000000",
};

export default function RootLayout({ children }) {
  // JSON-LD Structured Data for SEO
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "NewtonBotics Robotics Lab",
    "alternateName": "NewtonBotics",
    "url": "https://newtonbotics.com",
    "logo": "https://your-domain.com/logo.png",
    "description": "NewtonBotics Robotics Lab at Rishihood University - Advancing robotics and AI research through innovation, collaboration, and hands-on learning.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Academic Block, Room 407",
      "addressLocality": "Sonipat",
      "addressRegion": "Haryana",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "General Inquiry",
      "email": "robotics.club@rishihood.edu.in"
    },
    "sameAs": [
      "https://www.instagram.com/newtonbotics",
      "https://www.linkedin.com/company/newtonbotics"
    ],
    "memberOf": {
      "@type": "EducationalOrganization",
      "name": "Rishihood University"
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "NewtonBotics Robotics Lab",
    "url": "https://your-domain.com",
    "description": "Official website of NewtonBotics Robotics Lab - A hub for robotics innovation, research, and education.",
    "publisher": {
      "@type": "Organization",
      "name": "NewtonBotics Robotics Lab"
    }
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <AuthProvider>
          <DiwaliCelebration/>
          <Navbar/>
          <NewsTicker/>
          {children}
          <Footer/>
        </AuthProvider>
      </body>
    </html>
  );
}
