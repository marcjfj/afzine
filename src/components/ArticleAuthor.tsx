import Image from 'next/image'
import React from 'react'

interface Author {
  id: string | number
  name: string
  photo?:
    | {
        url: string
      }
    | string
}

interface ArticleAuthorProps {
  author?: Author | string
}

export const ArticleAuthor: React.FC<ArticleAuthorProps> = ({ author }) => {
  if (
    !author ||
    typeof author !== 'object' ||
    !author.photo ||
    typeof author.photo !== 'object' ||
    !author.photo.url
  ) {
    return null
  }

  return (
    <div className="flex items-center gap-2 pt-4">
      <Image
        src={author.photo.url}
        alt={author.name}
        width={36}
        height={36}
        className="grayscale brightness-75 contrast-200 opacity-75"
      />
      <span className="text-sm font-bold uppercase text-black italic">{author.name}</span>
    </div>
  )
}
