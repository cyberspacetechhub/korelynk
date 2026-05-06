import { Helmet } from 'react-helmet-async'

interface PageSEOProps {
  title: string
  description: string
  canonical?: string
  image?: string
}

const SITE_URL = 'https://inntechlab.online'
const DEFAULT_IMAGE = `${SITE_URL}/ITL-LOGO3_dark.png`

export default function PageSEO({ title, description, canonical, image }: PageSEOProps) {
  const url = canonical ? `${SITE_URL}${canonical}` : SITE_URL

  // Use provided image if absolute URL, otherwise prefix with site URL
  const ogImage = image
    ? (image.startsWith('http') ? image : `${SITE_URL}${image}`)
    : DEFAULT_IMAGE

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:secure_url" content={ogImage} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content="InnTechLab" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={title} />
      <meta name="twitter:site" content="@inntechlab" />
    </Helmet>
  )
}
