import { TeamCard } from "./team-card"

// Mock data
const mockTeams = [
  {
    id: "1",
    category: "hackathon" as const,
    title: "AI-Powered Study Assistant - HackBangalore 2026",
    description:
      "Building an intelligent study companion using GPT-4 and voice recognition. Looking for ML engineers and frontend devs.",
    skills: ["React", "Python", "TensorFlow", "AWS"],
    teamSize: { current: 2, total: 4 },
    commitmentLevel: "high" as const,
    urgent: true,
  },
  {
    id: "2",
    category: "startup" as const,
    title: "Campus Marketplace MVP",
    description:
      "Creating a peer-to-peer marketplace for college students. Need full-stack developers and UI/UX designers.",
    skills: ["Next.js", "Node.js", "PostgreSQL", "Figma"],
    teamSize: { current: 3, total: 5 },
    commitmentLevel: "medium" as const,
    popular: true,
  },
  {
    id: "3",
    category: "project" as const,
    title: "Open Source Contribution - React Native Library",
    description: "Contributing to a popular React Native animation library. Great for building your portfolio.",
    skills: ["React Native", "TypeScript", "Animation"],
    teamSize: { current: 1, total: 3 },
    commitmentLevel: "low" as const,
  },
  {
    id: "4",
    category: "research" as const,
    title: "Blockchain in Supply Chain Management",
    description:
      "Research project exploring blockchain applications in supply chain transparency. Co-authoring a paper.",
    skills: ["Blockchain", "Solidity", "Research", "Writing"],
    teamSize: { current: 2, total: 4 },
    commitmentLevel: "medium" as const,
  },
  {
    id: "5",
    category: "hackathon" as const,
    title: "FinTech Solution - Smart Campus Wallet",
    description: "Developing a unified payment solution for campus transactions. 48-hour hackathon starting next week.",
    skills: ["Flutter", "Firebase", "Payment APIs"],
    teamSize: { current: 1, total: 4 },
    commitmentLevel: "high" as const,
    urgent: true,
  },
  {
    id: "6",
    category: "project" as const,
    title: "Mental Health App for Students",
    description:
      "Building a mobile app to support student mental health with meditation, mood tracking, and peer support.",
    skills: ["React Native", "Node.js", "MongoDB", "UI/UX"],
    teamSize: { current: 3, total: 6 },
    commitmentLevel: "medium" as const,
    popular: true,
  },
]

export function TeamGrid() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Recommended Teams</h2>
        <p className="text-sm text-muted-foreground">Based on your skills and interests</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockTeams.map((team) => (
          <TeamCard key={team.id} {...team} />
        ))}
      </div>
    </div>
  )
}
