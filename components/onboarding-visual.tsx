"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import Image from "next/image"

const CAROUSEL_IMAGES = [
  {
    url: "/student-collaborating-on-code.jpg",
    title: "Collaborate.",
  },
  {
    url: "/startup-brainstorming.png",
    title: "Build.",
  },
  {
    url: "/hackathon-winners-celebrating.jpg",
    title: "Win.",
  },
]

export function OnboardingVisual() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % CAROUSEL_IMAGES.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative h-full w-full overflow-hidden rounded-l-3xl bg-teal-950">
      {/* Auto-moving Carousel Background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.6, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={CAROUSEL_IMAGES[currentIndex].url || "/placeholder.svg"}
            alt={CAROUSEL_IMAGES[currentIndex].title}
            fill
            className="object-cover"
            priority
          />
          {/* Overlay gradient to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-teal-950/80 via-teal-900/40 to-teal-800/60" />
        </motion.div>
      </AnimatePresence>

      {/* Floating shapes */}
      <motion.div
        className="absolute top-20 left-12 w-32 h-32 bg-white/10 rounded-full blur-xl"
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-32 right-16 w-40 h-40 bg-white/10 rounded-full blur-xl"
        animate={{
          y: [0, 20, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-1/2 left-1/4 w-24 h-24 bg-yellow-300/20 rounded-full blur-lg"
        animate={{
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Gradient glow overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

      {/* Tagline */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="space-y-4"
        >
          <div className="space-y-2">
            {CAROUSEL_IMAGES.map((item, index) => (
              <motion.h2
                key={item.title}
                animate={{
                  opacity: currentIndex === index ? 1 : 0.3,
                  scale: currentIndex === index ? 1 : 0.9,
                  filter: currentIndex === index ? "blur(0px)" : "blur(2px)",
                }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight"
              >
                {item.title}
              </motion.h2>
            ))}
          </div>

          <div className="flex items-center justify-center gap-3 mt-8">
            {CAROUSEL_IMAGES.map((_, index) => (
              <motion.div
                key={index}
                className="h-1 rounded-full bg-white"
                initial={false}
                animate={{
                  width: currentIndex === index ? 32 : 8,
                  opacity: currentIndex === index ? 1 : 0.3,
                }}
                transition={{ duration: 0.4 }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Abstract tech patterns */}
      <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="tech-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="1" fill="white" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#tech-grid)" />
      </svg>
    </div>
  )
}
