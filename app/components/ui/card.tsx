import { HTMLAttributes, ReactNode } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
  action?: ReactNode
}

interface CardSectionProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

const paddingClasses = {
  none: '',
  sm: 'p-4',
  md: 'p-5',
  lg: 'p-6',
}

export const Card = ({
  children,
  padding = 'md',
  className = '',
  ...props
}: CardProps) => (
  <div
    className={[
      'rounded-xl border border-gray-200 bg-white shadow-sm',
      paddingClasses[padding],
      className,
    ].join(' ')}
    {...props}
  >
    {children}
  </div>
)

export const CardHeader = ({
  title,
  description,
  action,
  className = '',
  ...props
}: CardHeaderProps) => (
  <div
    className={['flex items-start justify-between gap-4 mb-4', className].join(
      ' '
    )}
    {...props}
  >
    <div>
      <h3 className="text-sm font-semibold text-gray-900 leading-tight">
        {title}
      </h3>
      {description && (
        <p className="mt-0.5 text-sm text-gray-500">{description}</p>
      )}
    </div>
    {action && <div className="shrink-0">{action}</div>}
  </div>
)

export const CardFooter = ({
  children,
  className = '',
  ...props
}: CardSectionProps) => (
  <div
    className={[
      'mt-4 pt-4 border-t border-gray-100 flex items-center justify-end gap-2',
      className,
    ].join(' ')}
    {...props}
  >
    {children}
  </div>
)

export const CardDivider = () => (
  <hr className="-mx-5 my-4 border-gray-100" />
)