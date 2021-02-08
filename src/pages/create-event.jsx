import React, { useState } from 'react';

import { useRouter } from 'next/router';

import { DevTool } from '@hookform/devtools';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import toast from 'react-hot-toast';
import { supabase } from '../../supabase';

/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
// import DatePicker from '../components/DatePicker';
import Meta from '../components/Meta';
import getText from '../helpers/Texts';
import { useAuth } from '../state/AuthContext';

export default function CreateEvent() {
  const { currentUser } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const Schema = yup.object().shape({
    title: yup.string().required(`${getText('ACCOUNT', 'REQUIRED_FIELD')}`),
    description: yup
      .string()
      .required(`${getText('ACCOUNT', 'REQUIRED_FIELD')}`),
    location: yup.string().required(`${getText('ACCOUNT', 'REQUIRED_FIELD')}`),
    // startDate: yup
    //   .date()
    //   .default(function () {
    //     return new Date();
    //   })
    //   .required(`${getText('ACCOUNT', 'REQUIRED_FIELD')}`),
    // endDate: yup
    //   .date()
    //   .default(function () {
    //     return new Date();
    //   })
    //   .required(`${getText('ACCOUNT', 'REQUIRED_FIELD')}`)
  });

  const {
    register, handleSubmit, control, errors,
  } = useForm({
    resolver: yupResolver(Schema),
    mode: 'onChange',
    defaultValues: {
      title: 'Title',
      description: 'Description',
      location: '123 Home Street, Homington, HM 12345',
      // startDate: '',
      // endDate: ''
    },
  });

  const handleNewEvent = async (data) => {
    setIsLoading(true);
    try {
      const response = await supabase.from('events').insert([
        {
          id: currentUser.id,
          title: data.title,
          description: data.description,
          location: data.location,
          // start_date: data.from,
          // end_date: data.to
        },
      ]);
      const { error } = response;

      if (!error) {
        // router.push(`/event/${eventId}`);
        router.push('/dashboard');
      }
    } catch (error) {
      toast.error(getText('EVENT', 'CREATE_EVENT_ERROR'));
    }
    setIsLoading(true);
  };

  return (
    <>
      <Meta title="New Event" />
      <div className="flex flex-col items-center justify-start">
        <div className="w-full p-10 m-auto bg-white shadow dark:bg-gray-900 rounded-xl md:w-3/5 lg:w-1/2">
          <form onSubmit={handleSubmit(handleNewEvent)}>
            <div className="flex flex-col space-y-6">
              <p className="text-3xl">{getText('EVENT', 'NEW_EVENT')}</p>

              {/* Title */}
              <div className="flex flex-col">
                <label htmlFor="title" className="pb-1 font-serif">
                  {getText('EVENT', 'TITLE')}
                </label>
                <input type="text" name="title" ref={register} />
                <p className="text-red-500">{errors.title && errors.title.message}</p>
              </div>

              {/* Description */}
              <div className="flex flex-col">
                <label htmlFor="description" className="pb-1 font-serif">
                  {getText('EVENT', 'DESCRIPTION')}
                </label>
                <textarea type="text" name="description" ref={register} />
                <p className="text-red-500">{errors.description && errors.description.message}</p>
              </div>

              {/* Location */}
              <div className="flex flex-col">
                <label htmlFor="location" className="pb-1 font-serif">
                  {getText('EVENT', 'LOCATION')}
                </label>
                <input type="text" name="location" ref={register} />
                <p className="text-red-500">{errors.location && errors.location.message}</p>
              </div>
              {/* <DatePicker /> */}
              {/* <input type="date" name="startDate" ref={register} />
        <input type="date" name="endDate" ref={register} /> */}
              {/* Submit Button */}
              <button
                type="submit"
                className="flex items-center justify-center w-full py-3 mt-6 text-lg text-white my-7 button bg-gradient-to-r from-purple-700 to-pink-700 hover:from-pink-700 hover:to-purple-700"
              >
                {isLoading && (
                <svg
                  className="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                )}
                {getText('ACCOUNT', 'SIGN_UP')}
              </button>
            </div>
          </form>
        </div>
      </div>
      <DevTool control={control} />
    </>
  );
}
