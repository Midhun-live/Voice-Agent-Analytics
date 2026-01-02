import "./globals.css"

export const metadata = {
  title: "VoiceOps Analytics",
  description: "Voice agent call analytics dashboard",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground">
        {children}
      </body>
    </html>
  )
}
