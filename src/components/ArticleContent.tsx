import React from 'react'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

interface ArticleContentProps {
  content: SerializedEditorState
}

export const ArticleContent: React.FC<ArticleContentProps> = ({ content }) => {
  return (
    <div className="mx-auto mt-12">
      <RichText
        data={content}
        className="prose prose-lg text-black mx-auto prose-blockquote:italic prose-blockquote:lg:text-4xl prose-blockquote:font-bold prose-blockquote:text-balance prose-blockquote:border-black prose-img:grayscale prose-img:brightness-75 prose-img:contrast-200 prose-img:opacity-75"
      />
    </div>
  )
}
