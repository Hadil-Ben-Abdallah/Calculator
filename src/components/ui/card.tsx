import React from "react"

export const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={`shadow-lg rounded-lg overflow-hidden ${className}`}>
    {children}
  </div>
)

export const CardHeader = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-4 border-b ${className}`}>
    {children}
  </div>
)
export const CardTitle = ({ children, className }: { children: React.ReactNode; className?: string })  => (
  <h2 className={`text-lg font-bold ${className}`}>{children}</h2>
)

export const CardContent = ({ children, className }: { children: React.ReactNode; className?: string })  => (
  <div className={`p-4 ${className}`}>{children}</div>
)
