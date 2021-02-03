import React from 'react';
import Image from 'next/image';

export const GoogleButton = ({ login }) => {
  return (
    <button
      className="h-10 pt-1 pl-1 pr-2 bg-blue-500 rounded-md shadow-none outline-none active:bg-blue-700 active:ring-2 hover:bg-blue-600"
      onClick={login}
    >
      <div className="flex items-center justify-center">
        <div className="flex items-center justify-center w-8 h-8 mr-3 bg-white rounded-sm">
          <Image src="/google-logo.svg" width={20} height={20} />
        </div>
        <span className="text-base font-bold text-white">
          Sign up with Google
        </span>
      </div>
    </button>
  );
};

export const FacebookButton = ({ login }) => {
  return (
    <button
      className="h-10 pt-1 pl-1 pr-2 bg-blue-500 rounded-md shadow-none outline-none active:bg-blue-700 active:ring-2 hover:bg-blue-600"
      onClick={login}
    >
      <div className="flex items-center justify-center">
        <div className="flex items-center justify-center w-8 h-8 mr-2 ">
          <Image src="/facebook-logo.png" width={25} height={25} />
        </div>
        <span className="text-base font-bold text-white">
          Sign up with Facebook
        </span>
      </div>
    </button>
  );
};
