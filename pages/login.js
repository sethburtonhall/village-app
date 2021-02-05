import React, { useState } from 'react';
import { useAuth } from '../state/AuthContext';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Meta from '../components/Meta';

// React Hook Form
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Helpers
import { getText } from '../helpers/Texts';

// Custom Components
import { GoogleButton, FacebookButton } from '../components/SocialButtons';

export default function Login() {
  const router = useRouter();
  const {
    signIn,
    signInWithMagicLink,
    signInWithSocial,
    resetPassword
  } = useAuth();
  const [passwordShow, setPasswordShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [magicLink, setMagicLink] = useState(false);
  const [passwordReset, setPasswordReset] = useState(false);
  const [passwordResetSuccess, setPasswordResetSuccess] = useState(false);
  console.log('Magic Link', magicLink);
  console.log('Password Reset', passwordReset);

  // Password & Magic Link in validation schema via Yup

  const Schema =
    !magicLink && !passwordReset
      ? yup.object().shape({
          email: yup
            .string()
            .email(`${getText('ACCOUNT', 'INVALID_EMAIL')}`)
            .required(`${getText('ACCOUNT', 'REQUIRED_FIELD')}`),
          password: yup
            .string()
            .required(`${getText('ACCOUNT', 'REQUIRED_FIELD')}`)
            .matches(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
              'Must Contain At Least 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
            )
        })
      : yup.object().shape({
          email: yup
            .string()
            .email(`${getText('ACCOUNT', 'INVALID_EMAIL')}`)
            .required(`${getText('ACCOUNT', 'REQUIRED_FIELD')}`)
        });

  // React Hook Forms for refs, validation, errors, etc...
  // https://react-hook-form.com/get-started/
  const { register, handleSubmit, control, errors } = useForm({
    resolver: yupResolver(Schema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: ''
    }
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

  const handleLogin = async (data) => {
    setIsLoading(true);

    try {
      await signIn(data.email, data.password);
      setIsLoading(false);
      router.push('/dashboard');
      console.log('Form data:', data);
      console.log('Log in successful');
    } catch (error) {
      console.log('error logging in', error);
    }
    setIsLoading(false);
  };

  const handleMagicLink = async (data) => {
    setIsLoading(true);

    try {
      await signInWithMagicLink(data.email);
      setIsLoading(false);
      console.log('Form data:', data);
      console.log('Check email for magic link.');
    } catch (error) {
      console.log('error logging in', error);
    }
    setIsLoading(false);
  };

  const handlePasswordReset = async (data) => {
    setIsLoading(true);

    try {
      await resetPassword(data.email);
      setIsLoading(false);
      setPasswordResetSuccess(true);
      console.log('Form data:', data);
      console.log('Check email for password reset instructions.');
    } catch (error) {
      console.log('error logging in', error);
    }
    setIsLoading(false);
  };

  return (
    <>
      <Meta title="| Login" />
      <div className="flex flex-col items-center justify-start">
        <div className="w-full p-10 m-auto bg-white shadow pt-7 dark:bg-gray-900 rounded-xl md:w-3/5 lg:w-1/2">
          {passwordResetSuccess ? (
            <div className="flex flex-col items-center space-y-12">
              <h1 className="text-6xl text-green-700">
                😀 {getText('ACCOUNT', 'SUCCESS')}
              </h1>

              <div className="font-serif text-lg">
                {getText('ACCOUNT', 'PASSWORD_RESET_EMAIL')}
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
            <form
              autoComplete="on"
              onSubmit={
                !magicLink && !passwordReset
                  ? handleSubmit(handleLogin)
                  : !magicLink && passwordReset
                  ? handleSubmit(handlePasswordReset)
                  : handleSubmit(handleMagicLink)
              }
            >
              <div className="flex flex-col space-y-6">
                <p className="text-3xl">{getText('ACCOUNT', 'SIGN_IN')}</p>

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
                    variant="outline"
                    autoComplete="email"
                    aria-describedby="email-helptext"
                  />
                  <p className="text-red-500">
                    {errors.email && errors.email.message}
                  </p>
                </div>

                {/* Password */}
                {!magicLink && !passwordReset ? (
                  <div className="flex flex-col">
                    <label htmlFor="password" className="pb-1 font-serif">
                      {getText('ACCOUNT', 'PASSWORD')}
                    </label>
                    <div className="relative flex">
                      <input
                        type="password"
                        name="password"
                        id="password"
                        ref={register}
                        autoComplete="new-password"
                        variant="outline"
                        type={passwordShow ? 'text' : 'password'}
                      />
                      <div
                        className="absolute right-2 top-2"
                        onClick={(event) =>
                          handleTogglePassword(event, 'password')
                        }
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
                ) : (
                  ''
                )}

                {!magicLink && !passwordReset ? (
                  <div className="flex justify-end">
                    <div
                      className="cursor-pointer"
                      onClick={() => setPasswordReset(!passwordReset)}
                    >
                      <a>{getText('ACCOUNT', 'FORGOT_PASSWORD')}</a>
                    </div>
                  </div>
                ) : (
                  ''
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="flex items-center justify-center w-full py-3 text-lg text-white transition duration-300 ease-in-out my-7 button bg-gradient-to-r from-purple-700 to-pink-700 hover:from-pink-700 hover:to-purple-700 "
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
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  )}
                  {!magicLink && !passwordReset
                    ? getText('ACCOUNT', 'SIGN_IN')
                    : !magicLink && passwordReset
                    ? getText('ACCOUNT', 'PASSWORD_RESET')
                    : getText('ACCOUNT', 'SEND_MAGIC_LINK')}
                </button>

                <div className="flex flex-col items-center justify-center">
                  {!magicLink && !passwordReset ? (
                    <div
                      className="cursor-pointer"
                      onClick={() => setMagicLink(!magicLink)}
                    >
                      <a>{getText('ACCOUNT', 'MAGIC_LINK')}</a>
                    </div>
                  ) : (
                    ''
                  )}

                  {magicLink && (
                    <div
                      className="cursor-pointer"
                      onClick={() => setMagicLink(!magicLink)}
                    >
                      <a>{getText('ACCOUNT', 'SIGN_IN_WITH_PASSWORD')}</a>
                    </div>
                  )}

                  {!magicLink && !passwordReset ? (
                    <Link href="/signup">
                      <a>{getText('ACCOUNT', 'NEED_AN_ACCOUNT')}</a>
                    </Link>
                  ) : (
                    ''
                  )}

                  {passwordReset && (
                    <div
                      className="cursor-pointer"
                      onClick={() => setPasswordReset(!passwordReset)}
                    >
                      <a>{getText('ACCOUNT', 'BACK_TO_SIGN_IN')}</a>
                    </div>
                  )}
                </div>
                {!magicLink && !passwordReset ? (
                  <>
                    {/* Divider */}
                    <div className="flex items-center justify-center continue">
                      <span className="px-3 my-5 text-center bg-white dark:bg-gray-900">
                        or continue with
                      </span>
                    </div>

                    {/* Social Buttons */}
                    <div className="flex justify-around space-x-5">
                      <GoogleButton login={() => signInWithSocial('google')} />
                      <FacebookButton
                        login={() => signInWithSocial('facebook')}
                      />
                    </div>
                  </>
                ) : (
                  ''
                )}
              </div>
            </form>
          )}
        </div>
      </div>
      {/* <DevTool control={control} /> */}
    </>
  );
}
