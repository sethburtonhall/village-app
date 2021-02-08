import React from 'react';

// import { useRouter } from 'next/router';

import { useAuth } from '../state/AuthContext';

const checkUserAuthentication = (Component) => {
  const Auth = (props) => {
    // const router = useRouter();
    const { currentUser } = useAuth();
    // const { currentUser } = props;

    // if (!currentUser) {

    //   router.push('/login');
    // }
    return <Component {...props} />;
  };

  // // Copy getInitial props so it will run as well
  // if (Component.getInitialProps) {
  //   Auth.getInitialProps = Component.getInitialProps;
  // }

  return Auth;
};

export default checkUserAuthentication;
