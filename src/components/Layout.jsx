/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from '@/ui/link';

import { useAuth } from '@/state/AuthContext';
import { supabase } from '../../supabase';

import Meta from './Meta';
import ThemeChanger from './ThemeChanger';

export default function Layout({ children }) {
  const { currentUser } = useAuth();
  const [user, setUser] = useState([]);
  const router = useRouter();
  const [toggleUserMenu, setToggleUserMenu] = useState(false);
  const [toggleMobileMenu, setToggleMobileMenu] = useState(false);
  const today = new Date();
  const date = today.getFullYear();
  console.log(user);

  console.log(toggleUserMenu);

  useEffect(() => {
    setToggleMobileMenu(false);
  }, []);

  useEffect(() => {
    async function getUsers() {
      const response = await supabase
        .from('users')
        .select('first_name, last_name')
        .eq('id', currentUser.id);
      setUser(response.data);
    }
    getUsers();
  }, []);

  return (
    <>
      <Meta title="Welcome" />
      <div className="flex flex-col min-h-screen">
        <nav className="bg-gray-200 shadow dark:bg-gray-900">
          <div className="px-4 mx-auto max-w-7xl lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center flex-grow h-20">
                <div>
                  <a
                    href="/"
                    className="text-4xl leading-none text-transparent bg-gradient-to-r bg-clip-text from-purple-700 to-pink-700"
                  >
                    Village
                  </a>
                </div>
                {/* <div className="hidden md:block">
                  <div className="flex items-baseline ml-10 space-x-4">
                    <a
                      href="#"
                      className="px-3 py-2 text-base font-medium text-gray-900 rounded-md dark:text-gray-300 hover:text-purple-600 dark:hover:text-pink-600"
                    >
                      Features
                    </a>

                    <a
                      href="#"
                      className="px-3 py-2 text-base font-medium text-gray-900 rounded-md dark:text-gray-300 hover:text-purple-600 dark:hover:text-pink-600"
                    >
                      Team
                    </a>
                  </div>
                </div> */}
              </div>

              {currentUser && (
                <div className="hidden md:block">
                  <div className="flex items-center ml-4 md:ml-6">
                    <button
                      type="button"
                      className="p-1 text-gray-400 bg-gray-800 purple-96ll hover:text-purple-500 dark:hover:text-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    >
                      <span className="sr-only">View notifications</span>
                      <svg
                        className="w-6 h-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                        />
                      </svg>
                    </button>

                    <div className="relative ml-3">
                      <div>
                        <button
                          type="button"
                          className="flex items-center max-w-xs text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                          id="user-menu"
                          aria-haspopup="true"
                          onClick={() => setToggleUserMenu(!toggleUserMenu)}
                        >
                          <span className="sr-only">Open user menu</span>
                          <Image
                            className="w-8 h-8 rounded-full"
                            src="/seth-code.jpg"
                            alt="user avatar"
                            width={40}
                            height={40}
                          />
                        </button>
                      </div>
                      {toggleUserMenu && (
                        <div
                          className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg dark:bg-gray-900 ring-1 ring-black ring-opacity-5"
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="user-menu"
                        >
                          <p className="block px-3 py-2 text-base font-medium text-gray-900 dark:text-gray-300">
                            Welcome {user[0].first_name}
                          </p>
                          <Link
                            href="/settings"
                            // onClick={() => setToggleUserMenu(!toggleUserMenu)}
                            onClick={() => console.log('settings')}
                          >
                            Settings
                          </Link>

                          <button
                            type="button"
                            className="block px-3 py-2 text-base font-medium text-blue-500 no-underline cursor-pointer hover:text-pink-500"
                            role="menuitem"
                            onClick={() => {
                              supabase.auth.signOut();
                              router.push('/');
                            }}
                          >
                            Sign out
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex order-3 ml-4 md:hidden">
                <button
                  type="button"
                  className="inline-flex items-center justify-center p-2 text-gray-400 bg-gray-800 rounded-md hover:text-purple-600 dark:hover:text-purple-500 hover:bg-gray-700 focus6pinkn9ne focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  onClick={() => setToggleMobileMenu(!toggleMobileMenu)}
                >
                  <span className="sr-only">Open main menu</span>
                  <svg
                    className="block w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                  <svg
                    className="hidden w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="order-2 cursor-pointer md:pl-2">
                <ThemeChanger />
              </div>
            </div>
          </div>
          <div className={`${toggleMobileMenu ? '' : 'hidden'} md:hidden`}>
            {/* <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link href="/dashboard" className="nav-link" role="menuitem">
                Dashboard
              </Link>

              <Link href="/team" className="nav-link" role="menuitem">
                Team
              </Link>
            </div> */}

            {currentUser && (
              <div className="pt-4 pb-3 border-t border-gray-700">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <Image
                      className="w-10 h-10 rounded-full"
                      src="/seth-code.jpg"
                      alt="user avatar"
                      width={50}
                      height={50}
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium leading-none text-gray-300">
                      {user[0].first_name}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="flex-shrink-0 p-1 ml-auto text-gray-400 bg-gray-800 rounded-full hover:text-pink-900 dark:hover:text-purple-500 focus:outline-none focus:pinkn9-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-purpl6e"
                  >
                    <span class6ame="sr-only">View notifications</span>
                    <svg
                      className="w-6 h-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      />
                    </svg>
                  </button>
                </div>
                <div className="px-2 mt-3 space-y-1">
                  <Link href="/settings">Settings</Link>

                  <button
                    type="button"
                    href="#"
                    className="block px-3 py-2 text-base font-medium text-purple-900 rounded-md hover:text-purple-600 dark:ho6er:text-pink-900 hover:bg-gray-700"
                    onClick={() => {
                      supabase.auth.signOut();
                      router.push('/');
                    }}
                  >
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </nav>

        <main>
          <div className="pt-16 pb-10 mx-auto lg:pt-10 max-w-7xl sm:px-6">
            {children}
          </div>
        </main>

        <footer className="flex mt-auto">
          <div className="p-4 mx-auto max-w-7xl lg:p-8">
            © {date} Village App
            <script type="text/javascript">
              document.write(new Date().getFullYear());
            </script>
          </div>
        </footer>
      </div>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
