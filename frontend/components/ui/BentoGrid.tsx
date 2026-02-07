import clsx from 'clsx'

interface BentoGridProps {
    children: React.ReactNode
    className?: string
    columns?: 2 | 3 | 4
}

interface BentoGridItemProps {
    children: React.ReactNode
    className?: string
    colSpan?: 1 | 2
    rowSpan?: 1 | 2
}

export function BentoGrid({ children, className, columns = 3 }: BentoGridProps) {
    const colClasses = {
        2: 'md:grid-cols-2',
        3: 'md:grid-cols-3',
        4: 'md:grid-cols-4',
    }

    return (
        <div
            className={clsx(
                'grid grid-cols-1 gap-4',
                colClasses[columns],
                className
            )}
        >
            {children}
        </div>
    )
}

export function BentoGridItem({
    children,
    className,
    colSpan = 1,
    rowSpan = 1,
}: BentoGridItemProps) {
    return (
        <div
            className={clsx(
                'relative p-6 rounded-xl',
                'bg-slate-900/50',
                'border border-slate-800',
                'hover:border-amber-400/30',
                'hover:bg-slate-900/80',
                'transition-all duration-500',
                'group',
                'overflow-hidden',
                colSpan === 2 && 'md:col-span-2',
                rowSpan === 2 && 'md:row-span-2',
                className
            )}
        >
            {/* Subtle gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400/0 to-amber-400/0 group-hover:from-amber-400/5 group-hover:to-transparent transition-all duration-500 pointer-events-none" />
            <div className="relative z-10">{children}</div>
        </div>
    )
}
