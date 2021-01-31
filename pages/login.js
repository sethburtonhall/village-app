import Layout from '../components/Layout';
import Link from 'next/link';

export default function Login() {
  return (
    <Layout>
      <main className="pt-20 m-auto text-gray-900 body-font">
        <h1 className="font-sans text-5xl leading-relaxed text-transparent bg-gradient-to-r bg-clip-text from-purple-700 to-pink-700">
          This is the login page!
        </h1>
      </main>
    </Layout>
  );
}
