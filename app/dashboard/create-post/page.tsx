"use client"

import { useState } from "react"
import { DashboardTopBar } from "@/components/dashboard/top-bar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Sparkles } from "lucide-react"
import { toast } from "sonner"
import { motion } from "framer-motion"

export default function CreatePostPage() {
  const [category, setCategory] = useState("")
  const [eventName, setEventName] = useState("")
  const [description, setDescription] = useState("")
  const [rolesNeeded, setRolesNeeded] = useState("")
  const [skills, setSkills] = useState<string[]>([])
  const [skillInput, setSkillInput] = useState("")
  const [teamSize, setTeamSize] = useState("")
  const [commitmentLevel, setCommitmentLevel] = useState("")
  const [eventDate, setEventDate] = useState("")
  const [isPublishing, setIsPublishing] = useState(false)

  const handleAddSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()])
      setSkillInput("")
      toast.success(`${skillInput} added to skills`, { duration: 2000 })
    }
  }

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove))
    toast.info(`${skillToRemove} removed`, { duration: 1500 })
  }

  const handlePublish = async () => {
    if (!category || !eventName || !description || !rolesNeeded || !teamSize || !commitmentLevel) {
      toast.error("Please fill in all required fields", { duration: 3000 })
      return
    }

    setIsPublishing(true)

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category,
          eventName,
          description,
          rolesNeeded,
          skills,
          teamSize,
          commitmentLevel,
          eventDate,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.message || "Failed to publish post")
        setIsPublishing(false)
        return
      }

      toast.success("Post published successfully!", {
        description: `Your team post "${eventName}" is now live.`,
      })

      // Reset form
      setCategory("")
      setEventName("")
      setDescription("")
      setRolesNeeded("")
      setSkills([])
      setTeamSize("")
      setCommitmentLevel("")
      setEventDate("")

    } catch {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsPublishing(false)
    }
  }


  return (
    <div className="flex flex-col h-screen bg-[#F8F9FA]">
      <DashboardTopBar title="Create Post" subtitle="Find your perfect team members" />

      <div className="flex-1 overflow-y-auto scrollbar-hide pl-8 pr-8 py-12 md:pl-12 md:pr-12 lg:pl-16 lg:pr-16">
        <div className="max-w-7xl space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative rounded-[2rem] overflow-hidden max-w-3xl"
          >
            <div className="relative bg-teal-500 rounded-[2rem] p-8">
              <div className="flex items-center gap-3 mb-3">
                <Sparkles className="h-5 w-5 text-white" />
                <span className="text-sm font-semibold text-white">Share Your Vision</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Create Your Team Post</h1>
              <p className="text-white/90">
                Describe your project and find the perfect collaborators who match your vision and goals.
              </p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="bg-white border border-gray-200 shadow-sm rounded-[2rem] max-w-3xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">Post Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Category */}
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-sm font-semibold text-gray-700">
                    Category *
                  </Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="bg-white border-gray-200 text-gray-900 hover:border-teal-400 transition-colors">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-200">
                      <SelectItem value="Hackathon" className="text-gray-900">
                        Hackathon
                      </SelectItem>
                      <SelectItem value="Group Project" className="text-gray-900">
                        Group Project
                      </SelectItem>
                      <SelectItem value="Startup" className="text-gray-900">
                        Startup
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Event/Project Name */}
                <div className="space-y-2">
                  <Label htmlFor="eventName" className="text-sm font-semibold text-gray-700">
                    Event / Project Name *
                  </Label>
                  <Input
                    id="eventName"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    placeholder="Enter event or project name"
                    className="bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-teal-400 transition-colors"
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-semibold text-gray-700">
                    Description *
                  </Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your project or team requirements..."
                    className="min-h-[120px] bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 resize-none focus:border-teal-400 transition-colors"
                  />
                </div>

                {/* Roles Needed */}
                <div className="space-y-2">
                  <Label htmlFor="roles" className="text-sm font-semibold text-gray-700">
                    Roles Needed *
                  </Label>
                  <Input
                    id="roles"
                    value={rolesNeeded}
                    onChange={(e) => setRolesNeeded(e.target.value)}
                    placeholder="e.g., Frontend Developer, UI Designer"
                    className="bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-teal-400 transition-colors"
                  />
                </div>

                {/* Skills Required */}
                <div className="space-y-2">
                  <Label htmlFor="skills" className="text-sm font-semibold text-gray-700">
                    Skills Required
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="skills"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          handleAddSkill()
                        }
                      }}
                      placeholder="Type a skill and press Enter"
                      className="bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-teal-400 transition-colors"
                    />
                    <Button
                      type="button"
                      onClick={handleAddSkill}
                      className="bg-teal-500 hover:bg-teal-600 text-white font-semibold"
                    >
                      Add
                    </Button>
                  </div>
                  {skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {skills.map((skill, index) => (
                        <motion.div key={index} initial={{ scale: 0 }} animate={{ scale: 1 }}>
                          <Badge className="bg-teal-100 text-teal-700 border-teal-200 pr-1 gap-1">
                            {skill}
                            <motion.button
                              onClick={() => handleRemoveSkill(skill)}
                              className="ml-1 hover:bg-teal-200/50 rounded-full p-0.5"
                              whileHover={{ rotate: 90 }}
                              whileTap={{ scale: 0.8 }}
                            >
                              <X className="h-3 w-3" />
                            </motion.button>
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Team Size */}
                <div className="space-y-2">
                  <Label htmlFor="teamSize" className="text-sm font-semibold text-gray-700">
                    Team Size *
                  </Label>
                  <Input
                    id="teamSize"
                    value={teamSize}
                    onChange={(e) => setTeamSize(e.target.value)}
                    placeholder="e.g., 3-5 members"
                    className="bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-teal-400 transition-colors"
                  />
                </div>

                {/* Commitment Level */}
                <div className="space-y-2">
                  <Label htmlFor="commitment" className="text-sm font-semibold text-gray-700">
                    Commitment Level *
                  </Label>
                  <Select value={commitmentLevel} onValueChange={setCommitmentLevel}>
                    <SelectTrigger className="bg-white border-gray-200 text-gray-900 hover:border-teal-400 transition-colors">
                      <SelectValue placeholder="Select commitment level" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-200">
                      <SelectItem value="Low" className="text-gray-900">
                        Low (Few hours per week)
                      </SelectItem>
                      <SelectItem value="Medium" className="text-gray-900">
                        Medium (10-15 hours per week)
                      </SelectItem>
                      <SelectItem value="High" className="text-gray-900">
                        High (20+ hours per week)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Event Date (Optional) */}
                <div className="space-y-2">
                  <Label htmlFor="eventDate" className="text-sm font-semibold text-gray-700">
                    Event Date (Optional)
                  </Label>
                  <Input
                    id="eventDate"
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="bg-white border-gray-200 text-gray-900 focus:border-teal-400 transition-colors"
                  />
                </div>

                {/* Publish Button */}
                <div className="pt-4">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      onClick={handlePublish}
                      disabled={isPublishing}
                      className="w-full bg-teal-500 hover:bg-teal-600 text-white h-11 font-semibold transition-all duration-300 disabled:opacity-50"
                    >
                      {isPublishing ? "Publishing..." : "Publish Post"}
                    </Button>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
