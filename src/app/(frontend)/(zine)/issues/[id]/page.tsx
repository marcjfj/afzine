import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import config from '@/payload.config'
import { ArticleCard } from '@/components'
import type { Issue } from '@/payload-types'

// Define the page props to include the id parameter
interface PageProps {
  params: {
    id: string
  }
}

export default async function IssuePage({ params }: PageProps) {
  const { id } = params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  try {
    // Fetch the issue by ID
    const issue = (await payload.findByID({
      collection: 'issues',
      id,
      depth: 1, // Load related data like coverImage
    })) as Issue

    // Fetch all articles for this issue
    const articlesQuery = await payload.find({
      collection: 'articles',
      where: {
        issue: { equals: issue.id },
      },
      depth: 2, // Load related data like author and categories
    })

    const articles = articlesQuery.docs

    // Format the publication date
    const publicationDate = new Date(issue.publicationDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
    })

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Issue cover image */}
          <div className="relative aspect-[3/4] w-full md:max-w-md mx-auto overflow-hidden">
            <div className="absolute inset-0 bg-black/10 z-10"></div>
            {typeof issue.coverImage === 'object' && issue.coverImage.url && (
              <Image
                src={issue.coverImage.url}
                alt={`Cover for ${issue.title}`}
                fill
                className="object-cover grayscale brightness-75 contrast-200 opacity-65 hover:scale-105 transition-transform duration-500"
                priority
              />
            )}
          </div>

          {/* Issue details */}
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl text-balance font-bold uppercase italic mb-4">
              <span className="bg-black text-white px-2 py-1">{issue.title}</span>
            </h1>
            <p className="text-xl mb-2">Issue #{issue.issueNumber}</p>
            <p className="text-lg mb-6">{publicationDate}</p>
            {issue.description && (
              <div className="prose max-w-none mb-8">
                <p>{issue.description}</p>
              </div>
            )}
          </div>
        </div>

        {/* Articles in this issue */}
        <h2 className="text-3xl font-bold mb-8 border-b pb-4">In This Issue</h2>
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <p className="text-lg text-gray-600">No articles available in this issue yet.</p>
        )}
      </div>
    )
  } catch (error) {
    console.error('Error loading issue:', error)
    notFound()
  }
}
