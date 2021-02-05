import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../state/AuthContext';
import { getText } from '../helpers/Texts';

// React Hook Form
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const RecoverPassword = ({ token, setRecoveryToken }) => {
  const router = useRouter();
  const { updatePassword } = useAuth();
  const [passwordShow, setPasswordShow] = useState(false);
  const [passwordResetSuccess, setPasswordResetSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form validation schema via Yup
  const Schema = yup.object().shape({
    newPassword: yup
      .string()
      .required(`${getText('ACCOUNT', 'REQUIRED_FIELD')}`)
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        'Must Contain At Least 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
      )
  });

  // React Hook Forms for refs, validation, errors, etc...
  // https://react-hook-form.com/get-started/
  const { register, handleSubmit, control, errors } = useForm({
    resolver: yupResolver(Schema),
    mode: 'onChange'
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

  const handleNewPassword = async (data) => {
    setIsLoading(true);
    try {
      await updatePassword(data.newPassword);
      setIsLoading(false);
      setPasswordResetSuccess(!passwordResetSuccess);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start">
      <div className="w-full p-10 m-auto bg-white shadow dark:bg-gray-900 rounded-xl md:w-3/5 lg:w-1/2">
        {passwordResetSuccess ? (
          <div className="flex flex-col items-center space-y-12">
            <h1 className="text-6xl text-green-700">
              😀 {getText('ACCOUNT', 'SUCCESS')}
            </h1>

            <div className="font-serif text-lg">
              {getText('ACCOUNT', 'PASSWORD_RESET_SUCCESS')}
            </div>

            <a
              className="text-lg"
              onClick={() => {
                router.push('/dashboard');
              }}
            >
              {getText('ACCOUNT', 'GO_TO_DASHBOARD')}
            </a>
          </div>
        ) : (
          <form autoComplete="on" onSubmit={handleSubmit(handleNewPassword)}>
            <div className="flex flex-col space-y-6">
              <p className="text-3xl">
                {getText('ACCOUNT', 'PASSWORD_RECOVERY')}
              </p>

              <div className="flex flex-col lg:flex-grow">
                <label htmlFor="password" className="pb-1 font-serif">
                  {getText('ACCOUNT', 'ENTER_NEW_PASSWORD')}
                </label>
                <input
                  type="password"
                  name="newPassword"
                  id="newPassword"
                  ref={register}
                  autoFocus
                  required
                />
                <div
                  className="absolute right-2 top-2"
                  onClick={(event) => handleTogglePassword(event, 'password')}
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
                <p className="text-red-500">
                  {errors.newPassword && errors.newPassword.message}
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="flex items-center justify-center w-full py-3 mt-6 text-lg text-white my-7 button bg-gradient-to-r from-purple-700 to-pink-700 hover:from-pink-700 hover:to-purple-700"
                onClick={handleNewPassword}
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
                {getText('ACCOUNT', 'CHANGE_PASSWORD')}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default RecoverPassword;
