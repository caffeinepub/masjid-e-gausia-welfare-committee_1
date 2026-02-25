import React from 'react';

interface DecorativePatternProps {
  className?: string;
  opacity?: number;
}

export default function DecorativePattern({ className = '', opacity = 0.08 }: DecorativePatternProps) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <img
        src="/assets/generated/geometric-pattern.dim_800x800.png"
        alt=""
        className="w-full h-full object-cover"
      />
    </div>
  );
}
