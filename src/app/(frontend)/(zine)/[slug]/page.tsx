import { headers as getHeaders } from 'next/headers.js'
import React from 'react'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'

import config from '@/payload.config'
import { ArticleCard } from '@/components'

// Define the page props to include the slug parameter
interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // Fetch the article by slug
  const articleQuery = await payload.find({
    collection: 'articles',
    where: {
      slug: { equals: slug },
    },
    depth: 2, // Load related data like author and categories
    limit: 1,
  })

  // If no article found, return 404
  if (articleQuery.docs.length === 0) {
    notFound()
  }

  const article = articleQuery.docs[0]

  return (
    <div className="container mx-auto px-4 py-8">
      <ArticleCard article={article} />
    </div>
  )
}
