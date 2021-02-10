import React, { useState } from 'react';

import Link from '@/ui/link';

import { DevTool } from '@hookform/devtools';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import toast from 'react-hot-toast';

import Meta from '@/components/Meta';
import getText from '@/helpers/Texts';
import { useAuth } from '@/state/AuthContext';
import { GoogleButton, FacebookButton } from '@/components/SocialButtons';
import { supabase } from '../../supabase';

export default function Signup() {
  const { signUp, signInWithSocial } = useAuth();
  const [passwordShow, setPasswordShow] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form validation schema via Yup
  const Schema = yup.object().shape({
    firstName: yup.string().required(`${getText('ACCOUNT', 'REQUIRED_FIELD')}`),
    lastName: yup.string().required(`${getText('ACCOUNT', 'REQUIRED_FIELD')}`),
    email: yup
      .string()
      .email(`${getText('ACCOUNT', 'INVALID_EMAIL')}`)
      .required(`${getText('ACCOUNT', 'REQUIRED_FIELD')}`),
    password: yup
      .string()
      .required(`${getText('ACCOUNT', 'REQUIRED_FIELD')}`)
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        'Must Contain At Least 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character',
      ),
    passwordVerify: yup
      .string()
      .oneOf([yup.ref('password'), null], "Passwords don't match")
      .required(`${getText('ACCOUNT', 'REQUIRED_FIELD')}`),
  });

  const {
    register, handleSubmit, control, errors,
  } = useForm({
    resolver: yupResolver(Schema),
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });

  const handleTogglePassword = (event, passwordTarget) => {
    if (event !== undefined) {
      event.preventDefault();
    }

    switch (passwordTarget) {
      case 'password': {
        setPasswordShow(!passwordShow);
        break;
      }
      default:
    }
  };

  const handleSignUp = async (data) => {
    setIsLoading(true);
    try {
      const response = await signUp(
        data.email,
        data.password,
      );
      const { error } = response;
      if (!error) {
        setIsLoading(false);
        setSignUpSuccess(!signUpSuccess);
        await supabase
          .from('users')
          .insert([{
            id: response.data.id,
            email: data.email,
            first_name: data.firstName,
            last_name: data.lastName,
          }]);
      } else {
        toast.error(getText('ACCOUNT', 'SIGN_IN_ERROR'));
      }
    } catch (error) {
      toast.error(getText('ACCOUNT', 'SIGN_IN_ERROR'));
    }
    setIsLoading(false);
  };

  return (
    <>
      <Meta title="Sign Up" />
      <div className="flex flex-col items-center justify-start">
        <div className="w-full p-10 m-auto bg-white shadow dark:bg-gray-900 rounded-xl md:w-3/5 lg:w-1/2">
          {signUpSuccess ? (
            <div className="flex flex-col items-center space-y-12">
              <h1 className="text-6xl text-green-700">
                😀
                {' '}
                {getText('ACCOUNT', 'SUCCESS')}
              </h1>

              <div className="font-serif text-lg">
                {getText('ACCOUNT', 'SIGN_IN_SUCCESS')}
              </div>

              {/* <a
                className="text-lg"
                onClick={() => {
                  setPasswordResetSuccess(!passwordResetSuccess);
                  setPasswordReset(!passwordReset);
                }}
              >
                {getText('ACCOUNT', 'BACK_TO_SIGN_IN')}
              </a> */}
            </div>
          ) : (
            <form autoComplete="on" onSubmit={handleSubmit(handleSignUp)}>
              <div className="flex flex-col space-y-6">
                <p className="text-3xl">{getText('ACCOUNT', 'SIGN_UP')}</p>

                {/* Name */}
                <div
                  role="group"
                  className="flex flex-col space-y-5 lg:space-y-0 lg:space-x-5 lg:flex-row"
                >
                  {/* First Name */}
                  <div className="flex flex-col lg:flex-grow">
                    <label htmlFor="firstName" className="pb-1 font-serif">
                      {getText('ACCOUNT', 'FIRST_NAME')}
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      ref={register}
                      autoFocus
                      autoComplete="firstName"
                    />
                    <p className="text-red-500">
                      {errors.firstName && errors.firstName.message}
                    </p>
                  </div>

                  {/* Last Name */}
                  <div className="flex flex-col lg:flex-grow">
                    <label htmlFor="lastName" className="pb-1 font-serif">
                      {getText('ACCOUNT', 'LAST_NAME')}
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      ref={register}
                      autoComplete="lastName"
                    />
                    <p className="text-red-500">
                      {errors.lastName && errors.lastName.message}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex flex-col">
                  <label htmlFor="email" className="pb-1 font-serif">
                    {getText('ACCOUNT', 'EMAIL')}
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    ref={register}
                    autoComplete="email"
                    aria-describedby="email-helptext"
                  />
                  <p className="text-red-500">
                    {errors.email && errors.email.message}
                  </p>
                </div>

                {/* Password */}
                <div className="flex flex-col">
                  <label htmlFor="password" className="pb-1 font-serif">
                    {getText('ACCOUNT', 'PASSWORD')}
                  </label>
                  <div className="relative flex">
                    <input
                      type={passwordShow ? 'text' : 'password'}
                      name="password"
                      id="password"
                      ref={register}
                      autoComplete="new-password"
                    />
                    <div
                      className="absolute right-2 top-2"
                      onClick={(event) => handleTogglePassword(event, 'password')}
                      onKeyPress={(event) => handleTogglePassword(event, 'password')}
                      role="checkbox"
                      tabIndex="0"
                      aria-checked="false"
                    >
                      {passwordShow ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="text-gray-400"
                          width={20}
                          height={20}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="text-gray-400"
                          width={20}
                          height={20}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                  <p className="text-red-500">
                    {errors.password && errors.password.message}
                  </p>
                </div>

                {/* Password Verify */}
                <div className="flex flex-col">
                  <label htmlFor="passwordVerify" className="pb-1 font-serif">
                    {getText('ACCOUNT', 'PASSWORD_VERIFY')}
                  </label>
                  <div className="relative flex">
                    <input
                      type={passwordShow ? 'text' : 'password'}
                      name="passwordVerify"
                      id="passwordVerify"
                      ref={register}
                      autoComplete="new-password"
                    />
                  </div>
                  <p className="text-red-500">
                    {errors.passwordVerify && errors.passwordVerify.message}
                  </p>
                </div>
                {/* Flex spacer div */}
                <div />

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

                <div className="flex justify-center">
                  <Link href="/signin">
                    {getText('ACCOUNT', 'ALREADY_HAVE_ACCOUNT')}
                  </Link>
                </div>

                {/* Divider */}
                <div className="flex items-center justify-center continue">
                  <span className="px-3 my-5 text-center bg-white dark:bg-gray-900">
                    or continue with
                  </span>
                </div>

                {/* Social Buttons */}
                <div className="flex flex-col justify-around space-y-5 lg:flex-row lg:space-y-0 lg:space-x-5">
                  <GoogleButton login={() => signInWithSocial('google')} />
                  <FacebookButton login={() => signInWithSocial('facebook')} />
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
      <DevTool control={control} />
    </>
  );
}
