import { useQuery } from '@tanstack/react-query'
import api from './api'

export interface BlogPost {
  _id: string
  title: string
  slug: string
  excerpt?: string
  content: string
  featuredImage?: string
  author: { _id: string; fullname: string }
  category?: { _id: string; name: string; color: string }
  tags: string[]
  status: 'draft' | 'published' | 'archived'
  publishedAt?: string
  views: number
  featured: boolean
  createdAt: string
}

export const useBlogs = (params?: { page?: number; limit?: number; category?: string; search?: string }) =>
  useQuery<{ data: BlogPost[]; total: number; page: number; totalPages: number }>({  
    queryKey: ['blogs', params],
    queryFn: async () => {
      const { data } = await api.get('/blog', { params })
      // backend returns { blogs: [...], pagination: { current, pages, total } }
      const { blogs, pagination } = data.data
      return {
        data: blogs ?? [],
        total: pagination?.total ?? 0,
        page: pagination?.current ?? 1,
        totalPages: pagination?.pages ?? 1,
      }
    },
    staleTime: 1000 * 60 * 5,
  })

export const useBlogPost = (slug: string) =>
  useQuery<BlogPost>({
    queryKey: ['blog', slug],
    queryFn: async () => {
      const { data } = await api.get(`/blog/${slug}`)
      return data.data
    },
    enabled: !!slug,
    staleTime: 1000 * 60 * 5,
  })
