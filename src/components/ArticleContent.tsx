import React from 'react'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

interface ArticleContentProps {
  content: SerializedEditorState
}

export const ArticleContent: React.FC<ArticleContentProps> = ({ content }) => {
  return (
    <div className="mx-auto mt-2">
      <RichText
        data={content}
        className="prose prose-lg text-black mx-auto prose-blockquote:italic prose-blockquote:lg:text-4xl prose-blockquote:font-bold prose-blockquote:text-balance prose-blockquote:border-black prose-img:grayscale prose-img:brightness-75 prose-img:contrast-200 prose-img:opacity-75 drop-shadow-[2px_2px_5px_rgba(255,255,255,0.75)] prose-a:bg-black prose-a:text-white prose-a:font-bold prose-a:italic"
      />
    </div>
  )
}
