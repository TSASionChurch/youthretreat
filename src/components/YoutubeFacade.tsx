import React, { useState } from 'react';
import { Play } from 'lucide-react';

interface YoutubeFacadeProps {
  videoId: string;
  title: string;
}

/**
 * Renders a YouTube thumbnail instead of loading the full iframe on page load.
 * Only replaces itself with the real iframe when the user clicks Play.
 * This eliminates ~500KB of third-party YouTube JS per embed on first load.
 */
export default function YoutubeFacade({ videoId, title }: YoutubeFacadeProps) {
  const [active, setActive] = useState(false);

  const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  if (active) {
    return (
      <iframe
        className="absolute inset-0 w-full h-full border-0"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  return (
    <button
      onClick={() => setActive(true)}
      className="absolute inset-0 w-full h-full group cursor-pointer focus:outline-none"
      aria-label={`Play ${title}`}
    >
      <img
        src={thumbnailUrl}
        alt={title}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Dark vignette overlay */}
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />
      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-[#D92B27] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
          <Play size={24} className="text-white fill-white ml-1" />
        </div>
      </div>
      {/* Title badge */}
      <div className="absolute bottom-3 left-3 right-3">
        <span className="text-white text-xs font-bold bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full truncate block text-center">
          {title}
        </span>
      </div>
    </button>
  );
}
