import { headers as getHeaders } from 'next/headers.js'
import React from 'react'
import { getPayload } from 'payload'

import config from '@/payload.config'
import { ArticleCard } from '@/components'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  // get latest issue
  const issueQuery = await payload.find({
    collection: 'issues',
    where: {
      published: { equals: true },
    },
    limit: 1,
    sort: '-publicationDate',
  })

  const issue = issueQuery.docs[0]

  const articles = await payload.find({
    collection: 'articles',
    where: {
      issue: { equals: issue.id },
    },
    depth: 2,
  })

  console.log(issue)
  console.log(articles)

  return (
    <>
      {articles.docs.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </>
  )
}
