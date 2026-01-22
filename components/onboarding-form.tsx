"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, Github, Linkedin, Check } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"

const SKILLS = ["Web Development", "Machine Learning", "Backend", "UI/UX", "DevOps", "Mobile App", "Data Science"]
const INTERESTS = ["Hackathons", "Projects", "Startups", "Research"]

export function OnboardingForm() {
  const router = useRouter()

  const [step, setStep] = React.useState(1)
  const [direction, setDirection] = React.useState(0)
  const [checking, setChecking] = React.useState(false)
  const [error, setError] = React.useState("")

  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
    fullName: "",
    collegeEmail: "",
    year: "",
    branch: "",
    skills: [] as string[],
    availability: "flexible",
    commitment: "serious",
    github: "",
    linkedin: "",
    bio: "",
    interests: [] as string[],
    openToTeams: true,
  })

  const nextStep = () => {
    setDirection(1)
    setStep((s) => Math.min(s + 1, 5))
  }

  const prevStep = () => {
    setDirection(-1)
    setStep((s) => Math.max(s - 1, 1))
  }

  const handleContinue = async () => {
    setError("")

    if (!formData.email.endsWith("@vitapstudent.ac.in")) {
      setError("Use your VIT-AP student email")
      return
    }

    if (!formData.password) {
      setError("Password is required")
      return
    }

    try {
      setChecking(true)
      const res = await fetch(`/api/check-email?email=${encodeURIComponent(formData.email)}`)
      const data = await res.json()

      if (data.exists) {
        router.push("/login")
        return
      }

      nextStep()
    } catch {
      setError("Error checking email. Please try again.")
    } finally {
      setChecking(false)
    }
  }

  const toggleSkill = (skill: string) => {
    setFormData((p) => ({
      ...p,
      skills: p.skills.includes(skill)
        ? p.skills.filter((s) => s !== skill)
        : [...p.skills, skill],
    }))
  }

  const toggleInterest = (interest: string) => {
    setFormData((p) => ({
      ...p,
      interests: p.interests.includes(interest)
        ? p.interests.filter((i) => i !== interest)
        : [...p.interests, interest],
    }))
  }

  const SubmitForm = async () => {
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!res.ok) throw new Error()
      router.push("/dashboard")
    } catch {
      alert("Signup failed")
    }
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <div className="flex items-center justify-between px-1">
        <Button variant="ghost" size="icon" onClick={prevStep} disabled={step === 1}>
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <div className="text-sm text-muted-foreground">Step {step} of 5</div>
        <div className="w-9" />
      </div>

      <div className="relative overflow-hidden min-h-[500px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <Card className="border-none shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="pt-6">

                {step === 1 && (
                  <div className="space-y-4">
                    <Label>Email</Label>
                    <Input
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value, collegeEmail: e.target.value })
                      }
                    />
                    <Label>Password</Label>
                    <Input
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    <Button className="w-full" onClick={handleContinue} disabled={checking}>
                      {checking ? "Checking..." : "Continue"}
                    </Button>
                    {error && <p className="text-xs text-destructive text-center">{error}</p>}
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4">
                    <Input
                      placeholder="Full Name"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                    <Input value={formData.email} readOnly />
                    <Button className="w-full" onClick={nextStep}>Next</Button>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {SKILLS.map((s) => (
                        <Badge key={s} onClick={() => toggleSkill(s)} className="cursor-pointer">
                          {s}
                        </Badge>
                      ))}
                    </div>
                    <Button className="w-full" onClick={nextStep}>Next</Button>
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-4">
                    <Input placeholder="GitHub" />
                    <Input placeholder="LinkedIn" />
                    <Button className="w-full" onClick={nextStep}>Next</Button>
                  </div>
                )}

                {step === 5 && (
                  <div className="space-y-4">
                    {INTERESTS.map((i) => (
                      <Checkbox key={i} onCheckedChange={() => toggleInterest(i)}>{i}</Checkbox>
                    ))}
                    <Button className="w-full" onClick={SubmitForm}>
                      Finish <Check className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                )}

              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
