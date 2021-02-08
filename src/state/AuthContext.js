/* eslint-disable consistent-return */
import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import toast from 'react-hot-toast';
import { supabase } from '../../supabase';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const user = supabase.auth.user();
    setCurrentUser(user);
    setIsLoading(false);
  }, []);

  supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN') {
      setCurrentUser(session.user);
    } else setCurrentUser(null);
  });

  const signUp = async (firstName, lastName, email, password) => {
    try {
      const response = await supabase.auth.signUp({
        email,
        password,
      });
      return response;
    } catch (error) {
      toast.error('error signing up', error);
    }
  };

  const signIn = async (email, password) => {
    try {
      const response = await supabase.auth.signIn({
        email,
        password,
      });
      return response;
    } catch (error) {
      toast.error('error signing in', error);
    }
  };

  const signInWithMagicLink = async (email) => {
    try {
      const response = await supabase.auth.signIn({
        email,
      });
      return response;
    } catch (error) {
      toast.error('error signing in', error);
    }
  };

  const signInWithSocial = async (provider) => {
    try {
      const response = await supabase.auth.signIn({
        provider,
      });
      return response;
    } catch (error) {
      toast.error('error signing in with social', error);
    }
  };

  const resetPassword = async (email) => {
    try {
      const response = await supabase.auth.api.resetPasswordForEmail(email);
      return response;
    } catch (error) {
      toast.error('error reseting password', error);
    }
  };

  const updatePassword = async (accessToken, newPassword) => {
    try {
      const response = await supabase.auth.api.updateUser(accessToken, {
        password: newPassword,
      });
      return response;
    } catch (error) {
      toast.error('error setting new password', error);
    }
  };

  const value = {
    currentUser,
    signUp,
    signIn,
    signInWithMagicLink,
    resetPassword,
    updatePassword,
    signInWithSocial,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
