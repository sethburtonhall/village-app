import Link from 'next/link';
import Image from 'next/image';

export default function Layout({ children }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <header className="w-full p-3 bg-gray-900">
        <div className="container flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/">
              <a className="mr-6 text-4xl text-white">Village</a>
            </Link>
            <nav className="flex justify-between pt-2 text-white">
              <Link href="/">
                <a className="mr-3">Events</a>
              </Link>
              <Link href="/">
                <a>Test</a>
              </Link>
            </nav>
          </div>

          <div className="flex items-center justify-between text-white w-36">
            <svg
              className="h-7 w-7"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <svg
              className="h-7 w-7"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>

            <Image
              className="rounded-full"
              src="/seth-code.jpg"
              width={40}
              height={40}
            />
          </div>
        </div>
      </header>

      {children}

      <footer className="p-3">
        <p>This is the footer.</p>
      </footer>
    </div>
  );
}
