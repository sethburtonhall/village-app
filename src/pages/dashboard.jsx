import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import Meta from '@/components/Meta';
import checkUserAuthentication from '@/components/withPrivateRoute';
import { supabase } from '../../supabase';

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [toggleEventMenu, setToggleEventMenu] = useState(false);

  useEffect(() => {
    async function getEvents() {
      const response = await supabase
        .from('events')
        .select('*');
      setEvents(response.data);
    }
    getEvents();
  }, []);

  return (
    <>
      <Meta title="Dashboard" />
      <div className="px-4 py-6 max-w-7xl sm:px-6 lg:px-8">
        <header className="flex justify-between">
          <h1 className="text-3xl font-bold leading-tight text-gray-900 dark:text-gray-300">
            Events
          </h1>
          <Link href="/create-event">
            <button type="button" className="px-4 text-lg text-white bg-purple-500 outline-none hover:bg-purple-600 active:bg-purple-700 button">
              Create an event
            </button>
          </Link>
        </header>
      </div>

      <div className="flex flex-col">
        {events ? (
          <div className="items-center justify-center mt-auto">You do not have any events. Create one by clicking the button.</div>
        ) : (
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                      >
                        Title
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                      >
                        Location
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                      >
                        Members
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  {events.map((event) => (
                    <tbody key={event.id} className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-start">
                            <div className="font-medium text-gray-900 text-md">
                              {event.title}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-gray-900 text-md">
                            {event.start_date}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-4 font-semibold leading-5 text-gray-900 text-md">
                            {event.location}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex -space-x-2 overflow-hidden">
                            <img
                              className="inline-block w-10 h-10 rounded-full ring-2 ring-white"
                              src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                              alt=""
                            />
                            <img
                              className="inline-block w-10 h-10 rounded-full ring-2 ring-white"
                              src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                              alt=""
                            />
                            <img
                              className="inline-block w-10 h-10 rounded-full ring-2 ring-white"
                              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
                              alt=""
                            />
                            <img
                              className="inline-block w-10 h-10 rounded-full ring-2 ring-white"
                              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                              alt=""
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4 font-medium text-right text-md whitespace-nowrap">
                          <div className="relative ml-3">
                            <div>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                onClick={() => setToggleEventMenu(!toggleEventMenu)}
                                id="user-menu"
                                aria-haspopup="true"
                                className="text-base"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                              </svg>
                              <span className="sr-only">Open user menu</span>
                            </div>
                            {toggleEventMenu && (
                            <div
                              className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
                              role="menu"
                              aria-orientation="vertical"
                              aria-labelledby="user-menu"
                            >
                              <Link href="/edit">
                                <a
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  Edit
                                </a>
                              </Link>

                              <Link href="/edit">
                                <a
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  onClick={() => console.log('this will trigger a delete event')}
                                  onKeyPress={() => console.log('this will trigger a delete event')}
                                  role="link"
                                  tabIndex="0"
                                >
                                  Delete
                                </a>
                              </Link>

                              <Link href="/edit">
                                <a
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  Share
                                </a>
                              </Link>
                            </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default checkUserAuthentication(Dashboard);
