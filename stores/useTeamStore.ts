import { create } from "zustand"

/* =======================
   TYPES
======================= */

export type UserPreview = {
  id: string
  name: string
  regNo: string
}

export type TeamMember = {
  user: UserPreview
  role?: string
  joinedAt: string
}

export type Team = {
  _id: string
  post: {
    id: string
    title: string
    category: string
  }
  ownerId: string
  members: TeamMember[]
  status: "active" | "completed"
  createdAt: string
}

/* =======================
   STORE
======================= */

type TeamStore = {
  activeTeams: Team[]
  completedTeams: Team[]

  hydrateTeams: (teams: Team[]) => void

  addTeam: (team: Team) => void
  addMember: (teamId: string, member: TeamMember) => void

  leaveTeam: (teamId: string, userId: string) => void
  markCompleted: (teamId: string) => void
}

export const useTeamStore = create<TeamStore>((set) => ({
  activeTeams: [],
  completedTeams: [],

  hydrateTeams: (teams) =>
    set({
      activeTeams: teams.filter((t) => t.status === "active"),
      completedTeams: teams.filter((t) => t.status === "completed"),
    }),

  addTeam: (team) =>
    set((state) => ({
      activeTeams: [team, ...state.activeTeams],
    })),

  addMember: (teamId, member) =>
    set((state) => ({
      activeTeams: state.activeTeams.map((t) =>
        t._id === teamId
          ? { ...t, members: [...t.members, member] }
          : t
      ),
    })),

  leaveTeam: (teamId, userId) =>
    set((state) => ({
      activeTeams: state.activeTeams.map((t) =>
        t._id === teamId
          ? {
              ...t,
              members: t.members.filter(
                (m) => m.user.id !== userId
              ),
            }
          : t
      ),
    })),

  markCompleted: (teamId) =>
    set((state) => {
      const team = state.activeTeams.find((t) => t._id === teamId)
      if (!team) return state

      return {
        activeTeams: state.activeTeams.filter((t) => t._id !== teamId),
        completedTeams: [
          { ...team, status: "completed" },
          ...state.completedTeams,
        ],
      }
    }),
}))
