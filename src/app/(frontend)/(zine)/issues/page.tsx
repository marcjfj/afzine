import { getPayload } from 'payload'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import config from '@/payload.config'
import type { Issue } from '@/payload-types'

export default async function IssuesPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  try {
    // Fetch all published issues, sorted by issueNumber in descending order
    const issuesQuery = await payload.find({
      collection: 'issues',
      where: {
        published: { equals: true },
      },
      sort: '-issueNumber', // Latest issues first
      depth: 1, // Load related data like coverImage
    })

    const issues = issuesQuery.docs as Issue[]

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase italic mb-12">
          <span className="bg-black text-white px-2 py-1">Archive</span>
        </h1>

        {issues.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {issues.map((issue) => {
              // Format the publication date
              const publicationDate = new Date(issue.publicationDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
              })

              return (
                <Link href={`/issues/${issue.id}`} key={issue.id}>
                  <div className="group border border-black hover:shadow-lg transition-all duration-300">
                    {/* Issue cover image */}
                    <div className="relative aspect-[3/4] w-full overflow-hidden">
                      <div className="absolute inset-0 bg-black/10 z-10"></div>
                      {typeof issue.coverImage === 'object' && issue.coverImage.url && (
                        <Image
                          src={issue.coverImage.url}
                          alt={`Cover for ${issue.title}`}
                          fill
                          className="object-cover grayscale brightness-75 contrast-200 opacity-65 group-hover:scale-105 transition-transform duration-500"
                        />
                      )}
                    </div>

                    {/* Issue details */}
                    <div className="p-4">
                      <h2 className="text-2xl font-bold uppercase italic mb-2">
                        <span className="bg-black text-white px-2 py-1">{issue.title}</span>
                      </h2>
                      <p className="text-xl mb-1">Issue #{issue.issueNumber}</p>
                      <p className="text-lg">{publicationDate}</p>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <p className="text-xl text-gray-600">No issues available at the moment.</p>
        )}
      </div>
    )
  } catch (error) {
    console.error('Error loading issues:', error)
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-4xl font-bold mb-6">Something went wrong</h1>
        <p className="text-lg">We couldn't load the issues. Please try again later.</p>
      </div>
    )
  }
}
