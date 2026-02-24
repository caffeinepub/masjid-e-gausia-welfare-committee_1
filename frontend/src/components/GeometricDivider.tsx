interface GeometricDividerProps {
    className?: string;
}

export default function GeometricDivider({ className = '' }: GeometricDividerProps) {
    return (
        <div className={`w-full overflow-hidden my-2 ${className}`}>
            <img
                src="/assets/generated/geometric-divider.dim_1200x80.png"
                alt=""
                aria-hidden="true"
                className="w-full h-auto max-h-16 object-cover opacity-80"
            />
        </div>
    );
}
