import type { Metadata } from "next"
import { Outfit } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Toaster } from "react-hot-toast"

const outfit = Outfit({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CoLab",
  description: "Created by Surya",
  generator: "next.js",
  icons: {
    icon: [
      {
        url: "/cicon.jpg",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/cicon.jpg",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/cicon.jpg",
        type: "image/jpeg",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={outfit.className}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
        <Toaster
          position="top-right"
          toastOptions={{ duration: 3000 }}
        />
      </body>
    </html>
  )
}
