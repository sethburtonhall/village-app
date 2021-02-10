import React, { useState } from 'react';
import PropTypes from 'prop-types';

import getText from '@/helpers/Texts';

export default function Settings() {
  const [panel, setPanel] = useState(1);

  return (
    <div className="flex flex-col space-y-5 md:flex-row md:space-y-0 md:space-x-5">
      <aside className="w-full md:w-1/5">
        <ul className="flex flex-col space-y-2">
          <li
            className="flex items-center p-2 space-x-4 rounded cursor-pointer hover:bg-white dark:hover:bg-gray-900"
            onClick={() => setPanel(1)}
            onKeyPress={() => setPanel(1)}
            role="menuitem"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Account</span>
          </li>
          <li
            className="flex items-center p-2 space-x-4 rounded cursor-pointer hover:bg-white dark:hover:bg-gray-900"
            onClick={() => setPanel(2)}
            onKeyPress={() => setPanel(2)}
            role="menuitem"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
              />
            </svg>
            <span>Password</span>
          </li>
        </ul>
      </aside>
      <section className="flex-grow p-6 bg-white rounded dark:bg-gray-900">
        {panel === 1 && (
          <div>
            <h1 className="text-3xl">{getText('SETTINGS', 'PROFILE')}</h1>
            <p>This is your profile information.</p>
          </div>
        )}
        {panel === 2 && (
          <div>
            <h1 className="text-3xl">{getText('SETTINGS', 'PASSWORD')}</h1>
          </div>
        )}
      </section>
    </div>
  );
}

Settings.propTypes = {};
