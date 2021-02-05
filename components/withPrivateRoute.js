import { useAuth } from '../state/AuthContext';
import { useRouter } from 'next/router';

const checkUserAuthentication = (Component) => {
  const Auth = (props) => {
    const router = useRouter();
    const { currentUser } = useAuth();
    console.log(currentUser);
    // const { currentUser } = props;

    if (!currentUser) {
      router.push('/login');
    }
    return <Component {...props} />;
  };

  // // Copy getInitial props so it will run as well
  // if (Component.getInitialProps) {
  //   Auth.getInitialProps = Component.getInitialProps;
  // }

  return Auth;
};

export default checkUserAuthentication;
