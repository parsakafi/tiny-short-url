import './globals.css'

export const metadata = {
  title: 'Tiny Short URL',
  description: `An easy-to-use URL shortener that's completely free and open source!`,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script type="text/javascript" strategy="beforeInteractive" src="/popper.min.js" async ></script>
        <script type="text/javascript" strategy="beforeInteractive" src="/script.js" async ></script>
      </head>
      <body>{children}</body>
    </html>
  )
}
