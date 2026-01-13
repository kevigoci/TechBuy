import Link from "next/link"
import { Store } from "lucide-react"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      {/* Header */}
      <header className="p-6">
        <Link href="/" className="flex items-center gap-2 text-white w-fit">
          <Store className="h-8 w-8 text-blue-500" />
          <span className="text-xl font-bold">TechBuy</span>
        </Link>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="p-6 text-center text-sm text-slate-400">
        <p>&copy; {new Date().getFullYear()} Klevin Goci. All rights reserved.</p>
      </footer>
    </div>
  )
}
