import React from 'react'

interface Category {
  id: string | number
  name: string
}

interface ArticleHeaderProps {
  title: string
  categories?: Array<Category | string>
}

export const ArticleHeader: React.FC<ArticleHeaderProps> = ({ title, categories }) => {
  return (
    <div className="w-full flex flex-col gap-2 items-center relative">
      <div className="mx-auto lg:px-12">
        <div className="flex items-center gap-2 relative z-10">
          {categories
            ?.filter((category): category is Category => typeof category === 'object')
            .map((category) => (
              <span
                key={category.id.toString()}
                className="text-sm font-bold uppercase text-white bg-black italic"
              >
                {category.name}
              </span>
            ))}
        </div>
        <h2 className="text-4xl mb-6 lg:text-7xl text-balance font-bold uppercase italic text-white">
          <span className="bg-black">{title}</span>
        </h2>
      </div>
    </div>
  )
}
