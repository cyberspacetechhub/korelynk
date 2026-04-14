import { useQuery } from '@tanstack/react-query'
import api from '../lib/api'

export interface Project {
  _id: string
  title: string
  description: string
  image: string
  technologies: string[]
  category: 'web' | 'mobile' | 'ecommerce' | 'saas'
  liveUrl?: string
  githubUrl?: string
  featured: boolean
  isActive: boolean
  createdAt: string
}

const fetchProjects = async (params?: { featured?: boolean; category?: string }): Promise<Project[]> => {
  const { data } = await api.get('/projects', { params })
  return data.data ?? []
}

export const useProjects = (params?: { featured?: boolean; category?: string }) =>
  useQuery({
    queryKey: ['projects', params],
    queryFn: () => fetchProjects(params),
    staleTime: 1000 * 60 * 5,
  })
