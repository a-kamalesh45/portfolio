import clsx from 'clsx'

interface TechBadgeProps {
    children: React.ReactNode
    className?: string
    variant?: 'default' | 'highlight'
}

export function TechBadge({ children, className, variant = 'default' }: TechBadgeProps) {
    return (
        <span
            className={clsx(
                'inline-flex items-center px-3 py-1.5 rounded-full',
                'text-xs font-mono font-medium tracking-wide uppercase',
                'transition-all duration-300',
                'cursor-default',
                variant === 'default' && [
                    'border border-amber-400/40',
                    'text-amber-400/80',
                    'bg-amber-400/5',
                    'hover:border-amber-400',
                    'hover:text-amber-400',
                    'hover:bg-amber-400/10',
                    'hover:shadow-[0_0_15px_rgba(251,191,36,0.15)]',
                ],
                variant === 'highlight' && [
                    'border border-amber-400',
                    'text-amber-400',
                    'bg-amber-400/10',
                    'shadow-[0_0_15px_rgba(251,191,36,0.2)]',
                ],
                className
            )}
        >
            {children}
        </span>
    )
}
