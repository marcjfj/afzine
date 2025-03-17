import Image from 'next/image'
import React from 'react'

interface ArticleThumbnailProps {
  thumbnail: {
    url: string
    mimeType?: string
  }
  title: string
}

export const ArticleThumbnail: React.FC<ArticleThumbnailProps> = ({ thumbnail, title }) => {
  if (!thumbnail?.url) return null

  return (
    <Image
      src={thumbnail.url}
      alt={title}
      width={1200}
      height={500}
      className="absolute inset-0 object-cover grayscale brightness-75 contrast-200 opacity-65 h-full"
      unoptimized={thumbnail.mimeType === 'image/gif'}
    />
  )
}
