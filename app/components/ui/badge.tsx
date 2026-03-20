import { HTMLAttributes } from 'react'

type BadgeVariant =
  | 'default'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'outline'

type BadgeSize = 'sm' | 'md'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  size?: BadgeSize
  dot?: boolean
}

const variantClasses: Record<BadgeVariant, string> = {
  default:  'bg-gray-100 text-gray-700',
  success:  'bg-green-50 text-green-700',
  warning:  'bg-amber-50 text-amber-700',
  danger:   'bg-red-50 text-red-700',
  info:     'bg-blue-50 text-blue-700',
  outline:  'border border-gray-200 text-gray-600 bg-transparent',
}

const dotColours: Record<BadgeVariant, string> = {
  default:  'bg-gray-400',
  success:  'bg-green-500',
  warning:  'bg-amber-500',
  danger:   'bg-red-500',
  info:     'bg-blue-500',
  outline:  'bg-gray-400',
}

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-xs',
}

export const Badge = ({
  variant = 'default',
  size = 'md',
  dot = false,
  className = '',
  children,
  ...props
}: BadgeProps) => (
  <span
    className={[
      'inline-flex items-center gap-1.5 font-medium rounded-full',
      variantClasses[variant],
      sizeClasses[size],
      className,
    ].join(' ')}
    {...props}
  >
    {dot && (
      <span
        className={['h-1.5 w-1.5 rounded-full shrink-0', dotColours[variant]].join(' ')}
        aria-hidden="true"
      />
    )}
    {children}
  </span>
)