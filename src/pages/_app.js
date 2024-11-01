import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <Component {...pageProps} />
    </ClerkProvider>
  )
}