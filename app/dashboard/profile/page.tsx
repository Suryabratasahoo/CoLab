"use client"

import { useEffect, useState } from "react"
import toast from "react-hot-toast"

import { DashboardTopBar } from "@/components/dashboard/top-bar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

/* ---------------- Skeleton ---------------- */
function ProfileSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {[...Array(10)].map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="h-4 w-32 bg-gray-200 rounded" />
          <div className="h-10 w-full bg-gray-200 rounded-lg" />
        </div>
      ))}
    </div>
  )
}

export default function ProfilePage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // === DB-aligned states ===
  const [fullName, setFullName] = useState("")
  const [collegeEmail, setCollegeEmail] = useState("")
  const [year, setYear] = useState("")
  const [branch, setBranch] = useState("")
  const [skills, setSkills] = useState<string[]>([])
  const [skillInput, setSkillInput] = useState("")
  const [interests, setInterests] = useState<string[]>([])
  const [interestInput, setInterestInput] = useState("")
  const [availability, setAvailability] = useState("")
  const [commitment, setCommitment] = useState("")
  const [github, setGithub] = useState("")
  const [linkedin, setLinkedin] = useState("")
  const [bio, setBio] = useState("")
  const [openToTeams, setOpenToTeams] = useState(true)

  /* ---------------- Fetch Profile ---------------- */
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/profile")
        if (!res.ok) throw new Error()

        const { profile } = await res.json()

        setFullName(profile.fullName || "")
        setCollegeEmail(profile.collegeEmail || "")
        setYear(profile.year || "")
        setBranch(profile.branch || "")
        setSkills(profile.skills || [])
        setInterests(profile.interests || [])
        setAvailability(profile.availability || "")
        setCommitment(profile.commitment || "")
        setGithub(profile.github || "")
        setLinkedin(profile.linkedin || "")
        setBio(profile.bio || "")
        setOpenToTeams(profile.openToTeams ?? true)
      } catch {
        toast.error("Failed to load profile")
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  /* ---------------- Helpers ---------------- */
  const addItem = (
    input: string,
    list: string[],
    setList: (v: string[]) => void,
    clear: () => void
  ) => {
    if (input.trim() && !list.includes(input.trim())) {
      setList([...list, input.trim()])
      clear()
    }
  }

  const removeItem = (item: string, list: string[], setList: (v: string[]) => void) =>
    setList(list.filter((i) => i !== item))

  /* ---------------- Save ---------------- */
  const handleSave = async () => {
    setSaving(true)

    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          collegeEmail,
          year,
          branch,
          skills,
          interests,
          availability,
          commitment,
          github,
          linkedin,
          bio,
          openToTeams,
        }),
      })

      if (!res.ok) throw new Error()
      toast.success("Profile updated successfully")
    } catch {
      toast.error("Failed to update profile")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="flex flex-col h-screen bg-[#F8F9FA]">
      <DashboardTopBar
        title="Profile"
        subtitle="Manage your profile and preferences"
      />

      <div className="flex-1 overflow-y-auto p-12">
        <Card className="max-w-3xl rounded-3xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Profile Settings
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {loading ? (
              <ProfileSkeleton />
            ) : (
              <>
                {/* Full Name */}
                <div>
                  <Label>Full Name</Label>
                  <Input value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </div>

                {/* College Email */}
                <div>
                  <Label>College Email</Label>
                  <Input value={collegeEmail} readOnly disabled />
                </div>

                {/* Year */}
                <div>
                  <Label>Year</Label>
                  <Input value={year} onChange={(e) => setYear(e.target.value)} />
                </div>

                {/* Branch */}
                <div>
                  <Label>Branch</Label>
                  <Input value={branch} onChange={(e) => setBranch(e.target.value)} />
                </div>

                {/* Skills */}
                <div>
                  <Label>Skills</Label>
                  <div className="flex gap-2">
                    <Input
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" &&
                        addItem(skillInput, skills, setSkills, () => setSkillInput(""))
                      }
                    />
                    <Button
                      variant="outline"
                      onClick={() =>
                        addItem(skillInput, skills, setSkills, () => setSkillInput(""))
                      }
                    >
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="outline"
                        className="flex items-center gap-1 pr-2"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            removeItem(skill, skills, setSkills)
                          }}
                          className="ml-1 rounded-full p-0.5 hover:bg-gray-200"
                        >
                          <X className="h-3 w-3 text-gray-600" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Interests */}
                <div>
                  <Label>Interests</Label>
                  <div className="flex gap-2">
                    <Input
                      value={interestInput}
                      onChange={(e) => setInterestInput(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" &&
                        addItem(interestInput, interests, setInterests, () => setInterestInput(""))
                      }
                    />
                    <Button
                      variant="outline"
                      onClick={() =>
                        addItem(interestInput, interests, setInterests, () => setInterestInput(""))
                      }
                    >
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {interests.map((interest) => (
                      <Badge
                        key={interest}
                        variant="outline"
                        className="flex items-center gap-1 pr-2"
                      >
                        {interest}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            removeItem(interest, interests, setInterests)
                          }}
                          className="ml-1 rounded-full p-0.5 hover:bg-gray-200"
                        >
                          <X className="h-3 w-3 text-gray-600" />
                        </button>
                      </Badge>
                    ))}
                  </div>

                </div>

                {/* Availability */}
                <div className="space-y-2">
                  <Label>Availability</Label>
                  <Select value={availability} onValueChange={setAvailability}>
                    <SelectTrigger className="bg-white border-gray-200 text-[#1A1F36]">
                      <SelectValue placeholder="Select availability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekdays">Weekdays</SelectItem>
                      <SelectItem value="weekends">Weekends</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {/* Commitment */}
                <div className="space-y-2">
                  <Label>Commitment</Label>
                  <Select value={commitment} onValueChange={setCommitment}>
                    <SelectTrigger className="bg-white border-gray-200 text-[#1A1F36]">
                      <SelectValue placeholder="Select commitment level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="serious">Serious</SelectItem>
                      <SelectItem value="all-in">All-in</SelectItem>
                    </SelectContent>
                  </Select>
                </div>


                {/* GitHub */}
                <div>
                  <Label>GitHub</Label>
                  <Input value={github} onChange={(e) => setGithub(e.target.value)} />
                </div>

                {/* LinkedIn */}
                <div>
                  <Label>LinkedIn</Label>
                  <Input value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
                </div>

                {/* Bio */}
                <div>
                  <Label>Bio</Label>
                  <Textarea value={bio} onChange={(e) => setBio(e.target.value)} />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-xl">
                  <div>
                    <Label className="font-semibold">Open to join teams</Label>
                    <p className="text-xs text-gray-400">
                      Visible to recruiters & teams
                    </p>
                  </div>

                  <Badge
                    onClick={() => setOpenToTeams(!openToTeams)}
                    className={`cursor-pointer px-4 py-1 rounded-full ${openToTeams
                      ? "bg-teal-100 text-teal-700"
                      : "bg-gray-100 text-gray-500"
                      }`}
                  >
                    {openToTeams ? "Enabled" : "Disabled"}
                  </Badge>
                </div>

                <Button
                  disabled={saving}
                  onClick={handleSave}
                  className="w-full bg-teal-500 hover:bg-teal-600"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
