import React from 'react'

export default function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <article>
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  )
}
