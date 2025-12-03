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
  title: {
    default: "NewtonBotics Robotics Lab - Advancing Robotics & AI Research | Rishihood University",
    template: "%s | NewtonBotics"
  },
  description: "Join NewtonBotics Robotics Lab at Rishihood University - where innovation meets precision in robotics excellence. Explore cutting-edge projects, research areas, events, and join our community of researchers, students, and mentors dedicated to advancing robotics and AI technology.",
  keywords: "robotics, artificial intelligence, robotics lab, NewtonBotics, Rishihood University, research, innovation, automation, drones, healthcare robotics, industrial robotics, AI research, robotics projects, humanoid robots",
  authors: [{ name: "NewtonBotics Team" }],
  creator: "NewtonBotics Robotics Lab",
  publisher: "NewtonBotics",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://newtonbotics.com",
  },
  openGraph: {
    title: "NewtonBotics Robotics Lab - Advancing Robotics & AI Research",
    description: "Join NewtonBotics Robotics Lab - where innovation meets precision in robotics excellence. Building the future, one robot at a time.",
    type: "website",
    locale: "en_US",
    siteName: "NewtonBotics Robotics Lab",
    url: "https://newtonbotics.com",
    images: [
      {
        url: "https://newtonbotics.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "NewtonBotics Robotics Lab - Innovation Hub",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NewtonBotics Robotics Lab - Advancing Robotics & AI Research",
    description: "Join NewtonBotics Robotics Lab - where innovation meets precision in robotics excellence.",
    images: ["https://newtonbotics.com/og-image.jpg"],
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#000000",
  category: "Education",
};

export default function RootLayout({ children }) {
  // JSON-LD Structured Data for SEO
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "NewtonBotics Robotics Lab",
    "alternateName": "NewtonBotics",
    "url": "https://newtonbotics.com",
    "logo": "https://newtonbotics.com/logo.png",
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
    "url": "https://newtonbotics.com",
    "description": "Official website of NewtonBotics Robotics Lab - A hub for robotics innovation, research, and education.",
    "publisher": {
      "@type": "Organization",
      "name": "NewtonBotics Robotics Lab"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://newtonbotics.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "NewtonBotics Robotics Lab - Home",
    "description": "Join NewtonBotics Robotics Lab - where innovation meets precision in robotics excellence. Building the future, one robot at a time.",
    "url": "https://newtonbotics.com",
    "inLanguage": "en-US",
    "isPartOf": {
      "@type": "WebSite",
      "name": "NewtonBotics Robotics Lab",
      "url": "https://newtonbotics.com"
    },
    "about": {
      "@type": "Organization",
      "name": "NewtonBotics Robotics Lab",
      "description": "A hub for robotics innovation, research, and education at Rishihood University"
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <AuthProvider>
          {/* <DiwaliCelebration/> */}
          <Navbar/>
          <NewsTicker/>
          {children}
          <Footer/>
        </AuthProvider>
      </body>
    </html>
  );
}
