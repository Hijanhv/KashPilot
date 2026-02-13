import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export function Card({ children, className = '', hover = false }: CardProps) {
  return (
    <div 
      className={`
        bg-white border border-gray-100 rounded-2xl p-6 
        ${hover ? 'hover:border-gray-200 transition cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  )
}

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  className?: string
}

export function Button({ 
  children, 
  onClick, 
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = ''
}: ButtonProps) {
  const baseStyles = 'font-medium rounded-xl transition'
  
  const variants = {
    primary: 'bg-black text-white hover:bg-gray-800 disabled:bg-gray-300',
    secondary: 'border border-gray-200 hover:border-gray-300 disabled:opacity-50',
    ghost: 'hover:bg-gray-50 disabled:opacity-50',
  }
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  )
}

interface BadgeProps {
  children: React.ReactNode
  variant?: 'success' | 'warning' | 'error' | 'info'
}

export function Badge({ children, variant = 'info' }: BadgeProps) {
  const variants = {
    success: 'bg-green-50 text-green-700 border-green-100',
    warning: 'bg-yellow-50 text-yellow-700 border-yellow-100',
    error: 'bg-red-50 text-red-700 border-red-100',
    info: 'bg-gray-50 text-gray-700 border-gray-100',
  }
  
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${variants[variant]}`}>
      {children}
    </span>
  )
}

interface StatusDotProps {
  active: boolean
  pulse?: boolean
}

export function StatusDot({ active, pulse = false }: StatusDotProps) {
  return (
    <span 
      className={`
        w-2 h-2 rounded-full 
        ${active ? 'bg-accent' : 'bg-gray-300'}
        ${pulse && active ? 'animate-pulse' : ''}
      `} 
    />
  )
}
