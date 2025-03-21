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
          <svg
            className="w-6 h-6 mr-2 text-white fill-current"
            height="800px"
            width="800px"
            version="1.1"
            viewBox="0 0 228.526 228.526"
          >
            <path
              d="M189.565,134.629c-0.183-0.164,1.165-2.833,1.317-3.202c8.579-20.867,9.453-44.559,2.069-65.917
	c-8.085-23.392-25.807-43.052-48.807-52.505c-9.022-3.708-18.637-5.914-28.397-6.23c-7.855-0.254-15.527,0.77-23.12,2.726
	c10.186,0.352,20.11,2.001,29.604,5.83c9.763,3.939,18.569,9.816,25.993,17.271c17.24,17.311,24.655,43.392,18.168,67.057
	c-1.004,3.665-2.359,7.211-4.005,10.636c-6.367-5.701-12.734-11.401-19.101-17.103c-7.654-6.854-15.309-13.708-22.964-20.562
	c-0.198-0.178-0.396-0.354-0.594-0.532c5.193-5.712,10.385-11.423,15.578-17.135c-0.597-0.542-1.193-1.084-1.79-1.627
	c-0.15-0.136-0.48-0.574-0.684-0.621c-0.988,0.387-1.997,0.722-3.02,1.004c-4.049,1.115-8.319,1.371-12.471,0.731
	c-7.332-1.13-14.043-5.063-18.754-10.773c-5.416,5.957-10.832,11.915-16.248,17.872c-7.818,8.6-15.637,17.199-23.456,25.8
	c-0.971,1.067-1.942,2.136-2.912,3.203c7.388,6.717,14.776,13.434,22.164,20.149c1.142,1.038,2.284,2.076,3.425,3.114
	c0.215,0.195,0.248-0.006,0.437-0.213c0.599-0.659,1.198-1.318,1.797-1.977c3.867-4.254,7.733-8.507,11.6-12.76
	c0.044-0.049,0.852-0.942,0.854-0.938c0.148,0.132,0.296,0.265,0.444,0.397c1.018,0.911,2.035,1.821,3.052,2.732
	c3.998,3.58,7.997,7.16,11.995,10.74c8.481,7.594,16.962,15.188,25.442,22.781c0.7,0.627,1.4,1.254,2.101,1.881
	c-9.469,5.954-20.294,9.201-31.408,10.019c-6.053,0.445-12.218-0.011-18.167-1.201c-5.439-1.088-10.547-2.912-15.682-4.959
	c-0.349-0.14-3.593-1.749-3.687-1.605l-13.432,15.37c-4.577-3.73-9.153-7.461-13.73-11.191L5.376,189.268
	C3.617,191.427,0,195.776,0,195.776l6.201,5.109l25.647,20.904c5.769-7.077,11.537-14.155,17.305-21.233l14.523-17.818
	c0.062-0.076,2.213,0.999,2.438,1.097c1.265,0.552,2.542,1.074,3.831,1.566c22.574,8.613,48.377,7.651,70.455-2.021
	c5.407-2.368,10.587-5.253,15.462-8.581c2.505-1.709,4.949-3.528,7.269-5.482c0.556-0.469,6.386-5.785,6.342-5.825
	c2.314,2.072,4.629,4.146,6.944,6.218c8.778,7.859,17.556,15.72,26.334,23.579c0.877,0.786,1.755,1.571,2.633,2.357
	c6.663-7.442,13.326-14.884,19.99-22.326c1.051-1.174,2.102-2.348,3.152-3.521L189.565,134.629z"
            />
          </svg>
          Share this article
        </button>
      </div>
    </div>
  )
}
