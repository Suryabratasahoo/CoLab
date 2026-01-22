"use client"

import { useEffect, useState } from "react"
import { DashboardTopBar } from "@/components/dashboard/top-bar"
import { Card, CardContent } from "@/components/ui/card"
import { Bell, Users, Clock } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import toast from "react-hot-toast"

/* =======================
   TYPES
======================= */

type Notification = {
  _id: string
  type: "POST_CREATED"
  message: string
  createdAt: string
}

/* =======================
   ICON MAP
======================= */

const iconMap = {
  POST_CREATED: Users,
}

/* =======================
   SKELETON
======================= */

function NotificationSkeleton() {
  return (
    <Card className="rounded-[2rem] border-none shadow-lg bg-white animate-pulse">
      <CardContent className="p-8 flex items-start gap-6">
        <div className="p-4 rounded-2xl bg-gray-200 h-14 w-14 flex-shrink-0" />

        <div className="flex-1 space-y-3">
          <div className="h-4 bg-gray-200 rounded w-5/6" />
          <div className="h-4 bg-gray-200 rounded w-4/6" />
          <div className="h-3 bg-gray-200 rounded w-1/3 mt-4" />
        </div>
      </CardContent>
    </Card>
  )
}

/* =======================
   PAGE
======================= */

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true)
        const res = await fetch("/api/notifications")
        if (!res.ok) throw new Error()

        const data = await res.json()
        setNotifications(data.notifications || [])
      } catch {
        toast.error("Failed to load notifications")
      } finally {
        setLoading(false)
      }
    }

    fetchNotifications()
  }, [])

  return (
    <div className="flex h-screen flex-col bg-[#F8F9FA]">
      <DashboardTopBar
        title="Notifications"
        subtitle="Recent activity from your collaborations"
      />

      <div className="flex-1 overflow-y-auto scrollbar-hide px-8 py-12 md:px-12 lg:px-16">
        <div className="max-w-5xl space-y-10">
          {/* Header */}
          <div>
            <h1 className="text-4xl font-bold text-[#1A1F36] mb-2">
              Activity Feed
            </h1>
            <p className="text-gray-500">
              Stay updated with the latest activity across teams and posts.
            </p>
          </div>

          {/* ================= LOADING ================= */}
          {loading && (
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <NotificationSkeleton key={i} />
              ))}
            </div>
          )}

          {/* ================= NOTIFICATIONS ================= */}
          {!loading && notifications.length > 0 && (
            <div className="space-y-4">
              <AnimatePresence>
                {notifications.map((notification, idx) => {
                  const Icon = iconMap[notification.type] || Bell

                  return (
                    <motion.div
                      key={notification._id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: idx * 0.04 }}
                    >
                      <Card className="rounded-[2rem] border-none shadow-lg bg-white">
                        <CardContent className="p-8 flex items-start gap-6">
                          {/* Icon */}
                          <div className="p-4 rounded-2xl bg-teal-50 text-teal-600 flex-shrink-0">
                            <Icon className="h-6 w-6" />
                          </div>

                          {/* Content */}
                          <div className="flex-1">
                            <p className="text-[#1A1F36] font-semibold leading-relaxed">
                              {notification.message}
                            </p>

                            <div className="flex items-center gap-2 mt-3 text-[11px] text-gray-400 font-bold uppercase tracking-widest">
                              <Clock className="h-3 w-3" />
                              {new Date(
                                notification.createdAt
                              ).toLocaleString()}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          )}

          {/* ================= EMPTY STATE ================= */}
          {!loading && notifications.length === 0 && (
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardContent className="p-14 text-center">
                <div className="flex justify-center mb-6">
                  <div className="p-5 bg-gray-100 rounded-full">
                    <Bell className="h-8 w-8 text-gray-500" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-[#1A1F36] mb-2">
                  You're all caught up 🎉
                </h3>

                <p className="text-gray-500 max-w-md mx-auto">
                  No new notifications right now.
                  <br />
                  New activity will appear here as soon as it happens.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
