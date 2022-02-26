import Head from 'next/head'

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Yammm</title>
      </Head>
      <div>
        {children}
      </div>
    </>
  )
}
