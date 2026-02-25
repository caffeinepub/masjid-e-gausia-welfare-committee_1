import React from 'react';

interface GeometricDividerProps {
  className?: string;
}

export default function GeometricDivider({ className = '' }: GeometricDividerProps) {
  return (
    <div className={`w-full overflow-hidden leading-none ${className}`} aria-hidden="true">
      <img
        src="/assets/generated/section-divider.dim_1200x80.png"
        alt=""
        className="w-full h-auto object-cover"
        style={{ maxHeight: '80px' }}
      />
    </div>
  );
}
