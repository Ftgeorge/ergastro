"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-zinc-950 px-6 py-24 text-zinc-100 selection:bg-accent selection:text-accent-foreground">
      {/* Animated background gradient orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -left-1/4 -top-1/4 h-96 w-96 rounded-full bg-accent/5 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -right-1/4 -bottom-1/4 h-96 w-96 rounded-full bg-accent/5 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      {/* Animated grid overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(245,158,11,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />

      <main className="relative z-10 mx-auto flex max-w-2xl flex-col items-center text-center">
        {/* Badge with enhanced animation */}
        <motion.div
          className="group mb-8 flex items-center gap-3 rounded-full border border-zinc-900 bg-zinc-900/50 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-accent backdrop-blur-sm transition-all hover:border-accent/50 hover:shadow-[0_0_20px_rgba(245,158,11,0.2)]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent"></span>
          </span>
          Workspace 01
        </motion.div>

        {/* Main heading with stagger animation */}
        <motion.h1
          className="text-6xl font-black tracking-tighter sm:text-8xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          ERG
          <motion.span
            className="inline-block text-accent"
            animate={{
              textShadow: [
                "0 0 20px rgba(245, 158, 11, 0.5), 0 0 40px rgba(245, 158, 11, 0.3)",
                "0 0 30px rgba(245, 158, 11, 0.8), 0 0 60px rgba(245, 158, 11, 0.5)",
                "0 0 20px rgba(245, 158, 11, 0.5), 0 0 40px rgba(245, 158, 11, 0.3)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            AST
          </motion.span>
          RO
        </motion.h1>

        {/* Description with fade in */}
        <motion.p
          className="mt-8 text-xl leading-relaxed text-zinc-500 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        >
          A high-fidelity personal UI workshop. Design, test, and refine production-grade interfaces in a vacuum before shipping.
        </motion.p>

        {/* Buttons with stagger animation */}
        <motion.div
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto"
          >
            <Link
              href="/workshop/components"
              className="group relative flex items-center justify-center overflow-hidden rounded-full bg-accent px-8 py-4 text-sm font-black uppercase tracking-widest text-accent-foreground shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-shadow hover:shadow-[0_0_30px_rgba(245,158,11,0.5)]"
            >
              <span className="relative z-10">Enter Workshop</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto"
          >
            <Link
              href="/projects"
              className="block rounded-full border border-zinc-900 bg-zinc-900/30 px-8 py-4 text-sm font-black uppercase tracking-widest text-zinc-400 backdrop-blur-sm transition-all hover:border-zinc-700 hover:bg-zinc-900/50 hover:text-zinc-100"
            >
              View Projects
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating particles */}
        <div className="pointer-events-none absolute inset-0">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-1 w-1 rounded-full bg-accent/30"
              style={{
                left: `${25 + i * 15}%`,
                top: `${25 + i * 10}%`,
              }}
              animate={{
                y: [-100, 0],
                x: [0, 50],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 1,
              }}
            />
          ))}
        </div>
      </main>

      <motion.footer
        className="relative z-10 mt-auto pt-16 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
      >
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-700">
          Refine Often. Reuse without hesitation.
        </p>
      </motion.footer>
    </div>
  );
}