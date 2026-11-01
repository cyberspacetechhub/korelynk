import { useQuery } from '@tanstack/react-query'
import api from './api'

export interface TeamMember {
  _id: string
  name: string
  role: string
  bio?: string
  avatar?: string
  skills?: string[]
  social?: {
    linkedin?: string
    github?: string
    twitter?: string
  }
}

export const useTeam = () =>
  useQuery<TeamMember[]>({
    queryKey: ['team'],
    queryFn: async () => {
      const { data } = await api.get('/team')
      return data.data ?? []
    },
    staleTime: 1000 * 60 * 10,
  })
