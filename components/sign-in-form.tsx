"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"
import Link from "next/link"
import { Eye, EyeOff, Loader2 } from "lucide-react"

export function SignInForm() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.message || "Login failed")
        setLoading(false)
        return
      }
      router.push("/dashboard")
    } catch (err) {
      setError("Something went wrong. Please try again.")
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md space-y-8"
    >
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
          Welcome Back
        </h2>
        <p className="text-gray-500">
          Enter your details to access your account
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">College Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@university.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-12 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        {/* Password */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              href="#"
              className="text-sm font-medium text-teal-600 hover:text-teal-500"
            >
              Forgot password?
            </Link>
          </div>

          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-12 border-gray-200 pr-10 focus:border-indigo-500 focus:ring-indigo-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <p className="text-sm text-red-600 font-medium">{error}</p>
        )}

        {/* Submit */}
        <Button
          type="submit"
          disabled={loading}
          className="h-12 w-full bg-teal-600 text-lg font-semibold hover:bg-teal-700"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              Signing in...
            </span>
          ) : (
            "Sign In"
          )}
        </Button>
      </form>

      <p className="text-center text-sm text-gray-500">
        {"Don't have an account? "}
        <Link
          href="/onboarding"
          className="font-semibold text-teal-600 hover:text-teal-500"
        >
          Sign up
        </Link>
      </p>
    </motion.div>
  )
}
