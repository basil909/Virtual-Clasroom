import React from 'react'
import FeatureCard from '../cards/FeatureCard'

export default function FeaturesSection() {
  return (
    <section>
      <h2>Features</h2>
      <div>
        <FeatureCard title="Fast" description="Blazing fast" />
      </div>
    </section>
  )
}
