import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import config from '@/payload.config'

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
    <div className="min-h-screen flex flex-col max-w-5xl mx-auto p-6 gap-12">
      <header className="flex items-center justify-between w-full border-b-2 pb-6">
        <div className="">
          {/* issue number */}
          <span className="text-2xl lg:text-4xl font-bold">No. {issue.issueNumber}</span>
          {/* issue title */}
          <h1 className="lg:text-2xl font-bold italic">{issue.title}</h1>
        </div>
        <div className="">
          {/* logo */}
          <Image
            src="/af-logo.svg"
            alt="logo"
            width={100}
            height={100}
            className="w-16 lg:w-[100px]"
          />
        </div>
        <div className="flex flex-col items-end">
          {/* issue publication date */}
          <span className="lg:text-2xl font-bold italic">
            {new Date(issue.publicationDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
          <span className="text-2xl lg:text-4xl font-bold">FREE</span>
        </div>
      </header>
      <main className="flex flex-col gap-6">
        {articles.docs.map((article) => (
          <div key={article.id}>
            <div className="relative p-6 min-h-[300px] lg:min-h-[500px]">
              {/* article thumbnail  */}
              {typeof article.thumbnail === 'object' && article.thumbnail?.url && (
                <Image
                  src={article.thumbnail.url}
                  alt={article.title}
                  width={1200}
                  height={500}
                  className="absolute inset-0 object-cover grayscale brightness-75 contrast-200 opacity-75 h-full"
                  unoptimized={article.thumbnail.mimeType === 'image/gif'}
                />
              )}
              {/* article title */}
              <div className="w-full flex flex-col gap-2 items-center relative">
                <div className="mx-auto lg:px-12">
                  <div className="flex items-center gap-2 relative z-10">
                    {article.categories
                      ?.filter((category) => typeof category === 'object')
                      .map((category) => (
                        <span
                          key={category.id}
                          className="text-sm font-bold uppercase text-white bg-black italic"
                        >
                          {category.name}
                        </span>
                      ))}
                  </div>
                  <h2 className="text-4xl mb-6 lg:text-7xl  text-balance font-bold uppercase italic text-white">
                    <span className="bg-black">{article.title}</span>
                  </h2>
                </div>
              </div>
            </div>
            {article.author &&
              typeof article.author === 'object' &&
              article.author.photo &&
              typeof article.author.photo === 'object' &&
              article.author.photo.url && (
                <div className="flex items-center gap-2 pt-4">
                  <Image
                    src={article.author.photo.url}
                    alt={article.author.name}
                    width={50}
                    height={50}
                    className="grayscale brightness-75 contrast-200 opacity-75"
                  />
                  <span className="text-sm font-bold uppercase text-black italic">
                    {article.author.name}
                  </span>
                </div>
              )}
            <div className="mx-auto mt-12">
              {/* article content */}
              <RichText
                data={article.content as SerializedEditorState}
                className="prose prose-lg text-black mx-auto prose-blockquote:italic prose-blockquote:lg:text-4xl prose-blockquote:font-bold prose-blockquote:text-balance prose-blockquote:border-black prose-img:grayscale prose-img:brightness-75 prose-img:contrast-200 prose-img:opacity-75"
              />
            </div>
          </div>
        ))}
      </main>
      <footer className="flex items-center justify-between w-full border-t-2 pt-6 mt-12">
        <div className="">
          {/* logo */}
          <Image
            src="/af-logo.svg"
            alt="logo"
            width={100}
            height={100}
            className="w-16 lg:w-[100px]"
          />
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
