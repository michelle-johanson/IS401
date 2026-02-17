import { useState } from "react";
import { UtensilsCrossed } from "lucide-react";

/**
 * Renders an event image with a styled placeholder fallback when
 * no image URL is available or the image fails to load.
 *
 * Props:
 *   src        – image URL (may be null / undefined / empty string)
 *   alt        – alt text
 *   className  – CSS class applied to both the <img> and the placeholder div
 */
export default function EventImage({ src, alt = "Event", className = "" }) {
  const [errored, setErrored] = useState(false);

  if (!src || errored) {
    return (
      <div className={`event-image-placeholder ${className}`}>
        <UtensilsCrossed size={36} />
        <span>No image</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setErrored(true)}
    />
  );
}
