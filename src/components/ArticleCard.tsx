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

  return (
    <div>
      <div className="relative p-6 min-h-[300px] lg:min-h-[500px]">
        {thumbnailObj && thumbnailObj.url && (
          <ArticleThumbnail thumbnail={thumbnailObj} title={article.title} />
        )}
        <ArticleHeader title={article.title} categories={article.categories} />
      </div>
      <div className="p-6 max-w-3xl mx-auto">
        <ArticleAuthor author={article.author} />
      </div>
      <ArticleContent content={article.content as SerializedEditorState} />
    </div>
  )
}
