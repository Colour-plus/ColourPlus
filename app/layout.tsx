import "./globals.css";

import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://colourplus.in"),

  title: {
    default: "Colourplus Polyurethanes Pvt. Ltd. | Engineered Surfaces",
    template: "%s | Colourplus Polyurethanes Pvt. Ltd.",
  },

  description:
    "Colourplus Polyurethanes Pvt. Ltd. is an Indian manufacturer of engineered epoxy, polyurethane and specialist industrial flooring systems.",

  alternates: {
    canonical: "https://colourplus.in/",
  },

  openGraph: {
    type: "website",
    url: "https://colourplus.in/",
    siteName: "Colourplus Polyurethanes Pvt. Ltd.",
    title: "Colourplus Polyurethanes Pvt. Ltd. | Engineered Surfaces",
    description:
      "Engineered epoxy, polyurethane and specialist industrial flooring systems by Colourplus Polyurethanes Pvt. Ltd.",
    images: [
      {
        url: "/images/colourplus-logo.png",
        width: 1200,
        height: 630,
        alt: "Colourplus Polyurethanes Pvt. Ltd.",
      },
    ],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-MZWFGPML');
            `,
          }}
        />
        {/* End Google Tag Manager */}
      </head>

      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MZWFGPML"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        <Navbar />

        {children}

        <Footer />
      </body>
    </html>
  );
}