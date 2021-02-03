import React, { useContext, useState, useEffect } from 'react';
import { supabase } from '../state/Store';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const user = supabase.auth.user();
    setCurrentUser(user);
    setIsLoading(false);
    // console.log(user);
  }, []);

  supabase.auth.onAuthStateChange((event, session) => {
    console.log(event, session);
    if (event === 'SIGNED_IN') {
      setCurrentUser(session.user);
    } else setCurrentUser(null);
  });

  const signUp = async (firstName, lastName, email, password) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password
      });
      // let { rpcData, rpcError } = await supabase.rpc(
      //   'signup_copy_to_users_table',
      //   {
      //     first_name: firstName,
      //     last_name: lastName,
      //     email: email
      //   }
      // );

      // if (rpcData) console.error(rpcError);
      // else console.log(rpcData);
      // await supabase
      //   .from('users')
      //   .insert([{ first_name: firstName, last_name: lastName, email: email }]);
      if (error) {
        alert('auth.signUp' + ' ' + error.message);
        console.error(error, error.message);
        return;
      }
    } catch (error) {
      alert('catch error' + error);
      console.log('error signing up', error);
    }
  };

  const signIn = async (email, password) => {
    try {
      const { error } = await supabase.auth.signIn({
        email: email,
        password: password
      });
      if (error) {
        alert(error.message);
        console.error(error, error.message);
        return;
      }
    } catch (error) {
      alert(error);
      console.log('error signing up', error);
    }
  };

  const signInWithMagicLink = async (email) => {
    try {
      const { error } = await supabase.auth.signIn({
        email: email
      });
      if (error) {
        alert(error.message);
        console.error(error, error.message);
        return;
      }
    } catch (error) {
      alert(error);
      console.log('error signing up', error);
    }
  };

  const signInWithSocial = async (provider) => {
    try {
      const { user, error } = await supabase.auth.signIn({
        provider: provider
      });
      if (error) {
        alert('auth.signUp' + error.message);
        console.error(error, error.message);
        return;
      }
      console.log(user);
    } catch (error) {
      console.log('error', error);
      alert(error.error_description || error);
    }
  };

  const resetPassword = async (email) => {
    try {
      let { error } = await supabase.auth.api.resetPasswordForEmail(email);
      if (error) {
        alert(error.message);
        console.error(error, error.message);
        return;
      }
    } catch (error) {
      alert(error);
      console.log('error signing up', error);
    }
  };

  const value = {
    currentUser,
    signUp,
    signIn,
    signInWithMagicLink,
    resetPassword,
    signInWithSocial
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
}
