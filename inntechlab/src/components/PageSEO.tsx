import { Helmet } from 'react-helmet-async'

interface PageSEOProps {
  title: string
  description: string
  canonical?: string
}

const SITE_URL = 'https://inntechlab.online'
const DEFAULT_IMAGE = `${SITE_URL}/ITL-LOGO3_dark.png`

export default function PageSEO({ title, description, canonical }: PageSEOProps) {
  const url = canonical ? `${SITE_URL}${canonical}` : SITE_URL

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={DEFAULT_IMAGE} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  )
}
