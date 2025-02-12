import { cn } from '@/app/utils/cn'
import { ButtonHTMLAttributes } from 'react'
import { Loader2 } from 'lucide-react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean
}

export const ButtonLoad = ({
  children,
  className,
  loading,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        'bg-emerald-600 py-3 px-4 rounded-lg text-gray-50 flex justify-center items-center gap-2 hover:bg-emerald-500 transition-all disabled:opacity-50',
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <Loader2 className="animate-spin w-5 h-5" /> : children}
    </button>
  )
}
