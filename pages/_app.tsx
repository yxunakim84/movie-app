import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../Components/Layout'
import NavBar from '../Components/NavBar'
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    <Layout>
    {/* <NavBar /> */}
      <Component {...pageProps} />
    </Layout>
    </>
  )
}
