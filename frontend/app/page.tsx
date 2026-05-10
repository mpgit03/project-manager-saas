

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiCheckCircle,
  FiLayers,
  FiShield,
  FiZap,
} from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";

export default function HomePage() {
  const { token } = useAuth();

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden relative">
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.22),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(37,99,235,0.18),transparent_30%)]" />

      <div className="relative z-10">

        {/* NAVBAR */}
        <header className="w-full border-b border-zinc-900 backdrop-blur-xl bg-black/40 sticky top-0 z-50">
          
          <div className="max-w-7xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
            
            <Link
              href="/"
              className="text-2xl font-bold tracking-tight"
            >
              ProjectManager
            </Link>

            <div className="flex items-center gap-3">
              
              {token ? (
                <Link
                  href="/dashboard"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:scale-[1.03] transition-all duration-300 text-sm font-medium flex items-center gap-2"
                >
                  Open Dashboard
                  <FiArrowRight />
                </Link>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="px-5 py-2.5 rounded-xl border border-zinc-800 bg-zinc-950 hover:bg-zinc-900 transition-all text-sm"
                  >
                    Login
                  </Link>

                  <Link
                    href="/register"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:scale-[1.03] transition-all duration-300 text-sm font-medium"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </header>


        {/* HERO SECTION */}
        <section className="max-w-7xl mx-auto px-6 md:px-10 pt-28 pb-24">
          
          <div className="grid lg:grid-cols-2 gap-20 items-center">

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-800 bg-zinc-900/70 text-sm text-zinc-300 mb-8">
                <FiZap className="text-purple-400" />
                Organize projects with speed & clarity
              </div>

              <h1 className="text-5xl md:text-7xl font-black leading-[0.95] tracking-tight">
                Manage work.
                <br />
                <span className="bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">
                  Ship faster.
                </span>
              </h1>

              <p className="mt-8 text-zinc-400 text-lg leading-8 max-w-xl">
                A modern project management workspace built for developers,
                teams, and creators who want a fast, minimal, and focused workflow.
              </p>

              <div className="flex flex-wrap gap-4 mt-10">
                
                {token ? (
                  <Link
                    href="/dashboard"
                    className="px-7 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 hover:scale-[1.03] transition-all duration-300 font-medium flex items-center gap-2"
                  >
                    Go to Dashboard
                    <FiArrowRight />
                  </Link>
                ) : (
                  <>
                    <Link
                      href="/register"
                      className="px-7 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 hover:scale-[1.03] transition-all duration-300 font-medium flex items-center gap-2"
                    >
                      Start Free
                      <FiArrowRight />
                    </Link>

                    <Link
                      href="/login"
                      className="px-7 py-4 rounded-2xl border border-zinc-800 bg-zinc-950 hover:bg-zinc-900 transition-all font-medium"
                    >
                      Login
                    </Link>
                  </>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-6 mt-12 text-zinc-500 text-sm">
                
                <div className="flex items-center gap-2">
                  <FiCheckCircle className="text-green-400" />
                  Task Tracking
                </div>

                <div className="flex items-center gap-2">
                  <FiCheckCircle className="text-green-400" />
                  Attachments
                </div>

                <div className="flex items-center gap-2">
                  <FiCheckCircle className="text-green-400" />
                  Productivity Insights
                </div>
              </div>
            </motion.div>


            {/* RIGHT SIDE UI PREVIEW */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              
              <div className="absolute -top-12 -left-12 w-40 h-40 bg-purple-600/30 blur-3xl rounded-full" />

              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-600/20 blur-3xl rounded-full" />

              <div className="relative rounded-3xl border border-zinc-800 bg-zinc-950/80 backdrop-blur-xl overflow-hidden shadow-2xl shadow-purple-900/10">

                <div className="h-14 border-b border-zinc-800 flex items-center gap-2 px-5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>

                <div className="p-6 space-y-5">

                  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-zinc-500 text-sm">
                          Current Sprint
                        </p>

                        <h3 className="text-2xl font-bold mt-2">
                          Frontend Revamp
                        </h3>
                      </div>

                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center text-xl font-bold">
                        84%
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
                      <div className="flex items-center gap-3 mb-4">
                        <FiLayers className="text-purple-400 text-xl" />
                        <p className="font-medium">
                          Active Projects
                        </p>
                      </div>

                      <h2 className="text-4xl font-bold">
                        12
                      </h2>
                    </div>

                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
                      <div className="flex items-center gap-3 mb-4">
                        <FiShield className="text-blue-400 text-xl" />
                        <p className="font-medium">
                          Tasks Completed
                        </p>
                      </div>

                      <h2 className="text-4xl font-bold">
                        248
                      </h2>
                    </div>
                  </div>

                  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4">
                    
                    {[
                      "Implement authentication",
                      "Build task analytics",
                      "Polish dashboard UI",
                    ].map((task, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3"
                      >
                        <div className="flex items-center gap-3">
                          
                          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500" />

                          <p className="text-sm text-zinc-300">
                            {task}
                          </p>
                        </div>

                        <span className="text-xs text-green-400">
                          Active
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  );
}
