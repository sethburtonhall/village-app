import Head from 'next/head';
import Link from 'next/link';

import Layout from '../components/Layout';

export default function Home() {
  return (
    <>
      <Head>
        <title>Village</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <main className="pt-20 m-auto text-gray-900 body-font">
          <h1 className="font-sans text-5xl leading-relaxed text-transparent bg-gradient-to-r bg-clip-text from-purple-700 to-pink-700">
            Welcome to Village!
          </h1>
          <Link href="/login">
            <a>Login</a>
          </Link>
        </main>
      </Layout>
    </>
  );
}
