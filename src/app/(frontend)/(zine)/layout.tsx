import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import Link from 'next/link'

export default async function ZineLayout({ children }: { children: React.ReactNode }) {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // Get the current path to check if we're in an article route
  const path = headers.get('x-pathname') || ''
  const isArticlePage = path.match(/^\/[^\/]+$/) && !path.match(/^\/(about|contact|admin)$/)

  let issue

  if (isArticlePage) {
    // Extract the slug from the path
    const slug = path.substring(1)

    // Fetch the article to get its issue
    const articleQuery = await payload.find({
      collection: 'articles',
      where: {
        slug: { equals: slug },
      },
      depth: 1,
      limit: 1,
    })

    // If article found with an issue, fetch that specific issue
    if (articleQuery.docs.length > 0 && articleQuery.docs[0].issue) {
      const issueId =
        typeof articleQuery.docs[0].issue === 'object'
          ? articleQuery.docs[0].issue.id
          : articleQuery.docs[0].issue

      const issueQuery = await payload.findByID({
        collection: 'issues',
        id: issueId,
      })

      issue = issueQuery
    }
  }

  // If we're not on an article page or the article doesn't have an issue, fall back to latest issue
  if (!issue) {
    // get latest issue
    const issueQuery = await payload.find({
      collection: 'issues',
      where: {
        published: { equals: true },
      },
      limit: 1,
      sort: '-publicationDate',
    })

    issue = issueQuery.docs[0]

    console.log(issue)
  }

  return (
    <div className="min-h-screen flex flex-col max-w-5xl mx-auto p-6 gap-12">
      <header className="flex items-center justify-between w-full border-b-2 pb-6">
        <div className="">
          {/* issue number */}
          <span className="text-2xl lg:text-4xl font-bold">No. {issue.issueNumber}</span>
          {/* issue title */}
          <h1 className="lg:text-xl font-bold italic">{issue.title}</h1>
        </div>
        <div className="">
          {/* logo */}
          <Link href="/">
            <Image
              src="/af-logo.svg"
              alt="logo"
              width={100}
              height={100}
              className="w-16 lg:w-[100px]"
            />
          </Link>
        </div>
        <div className="flex flex-col items-end">
          {/* issue publication date */}
          <span className="lg:text-xl font-bold italic">
            {new Date(issue.publicationDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
          <span className="text-2xl lg:text-4xl font-bold">FREE</span>
        </div>
      </header>

      <main className="flex flex-col gap-6">{children}</main>

      <footer className="flex items-center justify-between w-full border-t-2 pt-6 mt-12">
        <div className="">
          {/* logo */}
          <Link href="/">
            <Image
              src="/af-logo.svg"
              alt="logo"
              width={100}
              height={100}
              className="w-16 lg:w-[100px]"
            />
          </Link>
        </div>
        <div className="">
          {/* issue number */}
          <span className="text-2xl lg:text-4xl font-bold">No. {issue.issueNumber}</span>
          {/* issue title */}
          <h1 className="lg:text-2xl font-bold italic">{issue.title}</h1>
        </div>
      </footer>
    </div>
  )
}
