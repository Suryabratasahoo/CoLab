import { create } from "zustand"

/* =======================
   TYPES
======================= */

export type UserPreview = {
  id: string
  name: string
  regNo: string
  socials?: {
    linkedin?: string
    github?: string
  }
}

export type PostPreview = {
  id: string
  title: string
  category: string
}

export type JoinRequest = {
  _id: string
  post: PostPreview
  requester: UserPreview
  message: string
  status: "pending" | "accepted" | "rejected"
  createdAt: string
}

/* =======================
   STORE
======================= */

type RequestStore = {
  incoming: JoinRequest[]
  sent: JoinRequest[]
  optimisticIds: Set<string>

  // Hydration
  hydrateIncoming: (reqs: JoinRequest[]) => void
  hydrateSent: (reqs: JoinRequest[]) => void

  // Socket
  addIncoming: (req: JoinRequest) => void

  // Optimistic send
  addSent: (req: JoinRequest) => void
  confirmOptimistic: (tempId: string, real: JoinRequest) => void
  rollbackOptimistic: (tempId: string) => void

  // Status updates
  updateStatus: (id: string, status: JoinRequest["status"]) => void
  removeSent: (id: string) => void
}

export const useRequestStore = create<RequestStore>((set) => ({
  incoming: [],
  sent: [],
  optimisticIds: new Set(),

  /* ---------- Hydration ---------- */

  hydrateIncoming: (reqs) =>
    set((state) => ({
      incoming: [
        ...reqs.filter(
          (r) => !state.incoming.some((i) => i._id === r._id)
        ),
        ...state.incoming,
      ],
    })),

  hydrateSent: (reqs) =>
    set((state) => ({
      sent: [
        ...reqs.filter(
          (r) => !state.sent.some((i) => i._id === r._id)
        ),
        ...state.sent,
      ],
    })),

  /* ---------- Socket ---------- */

  addIncoming: (req) =>
    set((state) => ({
      incoming: state.incoming.some((r) => r._id === req._id)
        ? state.incoming
        : [req, ...state.incoming],
    })),

  /* ---------- Optimistic ---------- */

  addSent: (req) =>
    set((state) => {
      const next = new Set(state.optimisticIds)
      next.add(req._id)
      return {
        sent: [req, ...state.sent],
        optimisticIds: next,
      }
    }),

  confirmOptimistic: (tempId, real) =>
    set((state) => {
      const next = new Set(state.optimisticIds)
      next.delete(tempId)
      return {
        sent: state.sent.map((r) =>
          r._id === tempId ? real : r
        ),
        optimisticIds: next,
      }
    }),

  rollbackOptimistic: (tempId) =>
    set((state) => {
      const next = new Set(state.optimisticIds)
      next.delete(tempId)
      return {
        sent: state.sent.filter((r) => r._id !== tempId),
        optimisticIds: next,
      }
    }),

  /* ---------- Status ---------- */

  updateStatus: (id, status) =>
    set((state) => ({
      incoming: state.incoming.map((r) =>
        r._id === id ? { ...r, status } : r
      ),
      sent: state.sent.map((r) =>
        r._id === id ? { ...r, status } : r
      ),
    })),

  removeSent: (id) =>
    set((state) => ({
      sent: state.sent.filter((r) => r._id !== id),
    })),
}))
