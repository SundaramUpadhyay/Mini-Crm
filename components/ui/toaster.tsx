"use client"

import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast, index) => (
        <Alert key={index} variant={toast.variant === "destructive" ? "destructive" : "default"}>
          <AlertTitle>{toast.title}</AlertTitle>
          {toast.description && <AlertDescription>{toast.description}</AlertDescription>}
        </Alert>
      ))}
    </div>
  )
}
