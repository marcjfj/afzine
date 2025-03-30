'use client'

import React from 'react'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { ArticleThumbnail } from './ArticleThumbnail'
import { ArticleHeader } from './ArticleHeader'
import { ArticleAuthor } from './ArticleAuthor'
import { ArticleContent } from './ArticleContent'

// Minimal Media interface matching Payload's structure
interface Media {
  url: string
  mimeType?: string
}

interface Article {
  id: string | number
  title: string
  thumbnail: string | number | Media | { url: string; mimeType?: string }
  categories?: Array<
    | {
        id: string | number
        name: string
      }
    | string
  >
  author?:
    | {
        id: string | number
        name: string
        photo?:
          | {
              url: string
            }
          | string
      }
    | string
  content: SerializedEditorState
}

interface ArticleCardProps {
  article: any // Using any temporarily to allow passing Payload's article type
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  // Check if thumbnail is a Media object with url property
  const thumbnailObj =
    typeof article.thumbnail === 'object' && article.thumbnail !== null ? article.thumbnail : null

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: `Check out this article: ${article.title}`,
          url: window.location.href,
        })
      } catch (error) {
        console.error('Error sharing:', error)
      }
    } else {
      // Fallback to copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href)
        alert('Article link copied to clipboard!')
      } catch (error) {
        console.error('Failed to copy:', error)
      }
    }
  }

  return (
    <div>
      <div className="relative p-6 min-h-[300px] lg:min-h-[500px]">
        {thumbnailObj && thumbnailObj.url && (
          <ArticleThumbnail thumbnail={thumbnailObj} title={article.title} />
        )}
        <ArticleHeader title={article.title} categories={article.categories} />
      </div>
      <div className="max-w-3xl mx-auto py-4 lg:px-6">
        <ArticleAuthor author={article.author} />
      </div>
      <div className="mb-8">
        <ArticleContent content={article.content as SerializedEditorState} />
      </div>
      <div className="max-w-3xl mx-auto text-center pb-8">
        <button
          onClick={handleShare}
          className="inline-flex items-center px-4 py-2 bg-black text-white font-bold italic hover:bg-gray-800 transition-colors"
        >
          Share this article
        </button>
      </div>
    </div>
  )
}
