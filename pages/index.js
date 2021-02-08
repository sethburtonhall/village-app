import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
// import { useRouter } from 'next/router';

import RecoverPassword from '../components/RecoverPassword';

// Helpers
import getText from '../helpers/Texts';
// import { useAuth } from '../state/AuthContext';

export default function Home() {
  // const { currentUser } = useAuth();
  // const router = useRouter();
  const [recoveryToken, setRecoveryToken] = useState(null);

  useEffect(() => {
    /* Recovery url is of the form
     * <SITE_URL>#access_token=x&refresh_token=y&expires_in=z&token_type=bearer&type=recovery
     * Read more on https://supabase.io/docs/client/reset-password-email#notes
     */
    const url = window.location.hash;
    const query = url.substr(1);
    const result = {};

    query.split('&').forEach((part) => {
      const item = part.split('=');
      result[item[0]] = decodeURIComponent(item[1]);
    });

    if (result.type === 'recovery') {
      setRecoveryToken(result.access_token);
    }
  }, []);

  // if (currentUser) {
  //   router.push('/dashboard');
  // }

  return recoveryToken ? (
    <RecoverPassword
      token={recoveryToken}
      setRecoveryToken={setRecoveryToken}
    />
  ) : (
    <>
      {/* Intro */}
      <div className="grid grid-cols-12 mb-16 text-center md:text-left lg:mb-0">
        <div className="col-span-12 m-auto lg:pr-20 md:col-span-7">
          <h1 className="inline-block pb-6 text-5xl text-transparent bg-gradient-to-r bg-clip-text from-purple-700 to-pink-700">
            Welcome to Village!
          </h1>
          <p className="pb-6 font-serif text-base dark:text-gray-300">
            Lorem ea in aute ad culpa officia ex aute minim laborum occaecat
            officia Lorem laboris. Exercitation dolore nostrud consectetur
            excepteur elit et commodo magna proident aliquip. Voluptate proident
            reprehenderit qui enim consequat eiusmod irure occaecat id excepteur
            deserunt. Pariatur minim ad nostrud ea eiusmod sunt excepteur
            consectetur dolor cillum elit nisi ipsum quis.
          </p>
          <div className="flex items-center justify-center space-x-3 md:justify-start">
            <Link href="/signup">
              <button type="button" className="px-4 text-lg text-white bg-purple-500 outline-none hover:bg-purple-600 active:bg-purple-700 button">
                {getText('ACCOUNT', 'GET_STARTED')}
              </button>
            </Link>
            <div className="dark:text-gray-300">or</div>
            <Link href="/login">
              <button type="button" className="px-4 text-lg text-white bg-pink-500 outline-none hover:bg-pink-600 active:bg-pink-700 button">
                {getText('ACCOUNT', 'LOGIN')}
              </button>
            </Link>
          </div>
        </div>
        <div className="relative col-span-12 md:col-span-5">
          <Image src="/hero.png" layout="responsive" width={100} height={100} />
        </div>
      </div>

      {/* Features */}
      <div className="py-12 bg-white dark:bg-gray-900">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 dark:text-gray-300 sm:text-5xl">
              How does Village work?
            </p>
          </div>

          <div className="mt-10 text-center">
            <dl className="items-start space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
              <div className="flex flex-col items-center justify-center">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-20 h-20 text-gray-900 dark:text-gray-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-16 h-16 text-purple-500 stroke-current"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                      />
                    </svg>
                  </div>
                </div>
                <dt className="text-2xl font-medium leading-6 text-gray-900 dark:text-gray-300">
                  Create an account
                </dt>
                <dd className="mt-2 font-serif text-base text-gray-900 dark:text-gray-300">
                  Village is a free app designed to help make your group
                  coordination easier. Get started by creating a free account.
                </dd>
              </div>

              <div className="flex flex-col items-center justify-center">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-20 h-20 text-gray-900 dark:text-gray-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-16 h-16 text-purple-500 stroke-current"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                      />
                    </svg>
                  </div>
                </div>
                <dt className="text-2xl font-medium leading-6 text-gray-900 dark:text-gray-300">
                  Create a sign up event
                </dt>
                <dd className="mt-2 font-serif text-base text-gray-900 dark:text-gray-300">
                  This could be a simple sign up event or an event with spefic
                  time blocks. Wheter you are organizing a potluck or
                  coordinating a volunteer day, Village has you covered.
                </dd>
              </div>

              <div className="flex flex-col items-center justify-center">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-20 h-20 text-gray-900 dark:text-gray-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-16 h-16 text-purple-500 stroke-current"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                </div>
                <dt className="text-2xl font-medium leading-6 text-gray-900 dark:text-gray-300">
                  Invite others
                </dt>
                <dd className="mt-2 font-serif text-base text-gray-900 dark:text-gray-300">
                  Share a link to your event to allow others to add their name,
                  time and details. Updates are visible in real time to all
                  users.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </>
  );
}
