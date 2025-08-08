import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
    title: 'Chess Mastery Studio',
    description: 'Chess Theory App',
    generator: 'deniz.sanli',
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" className={`${GeistSans.className} ${GeistMono.variable}`}>
        <body>{children}</body>
        </html>
    )
}