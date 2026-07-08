import React from 'react';
import { Resource } from './types';
import { ResourceCard } from './ResourceCard';

interface ResourceSectionProps {
  title: string;
  resources: Resource[];
  key?: React.Key;
}

export function ResourceSection({ title, resources }: ResourceSectionProps) {
  if (!resources.length) return null;

  return (
    <div className="mb-12 scroll-mt-24" id={title.toLowerCase().replace(/\s+/g, '-')}>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {resources.map((resource, index) => (
          <div key={index}>
            <ResourceCard resource={resource} />
          </div>
        ))}
      </div>
    </div>
  );
}
