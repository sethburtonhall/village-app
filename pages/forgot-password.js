import Meta from '../components/Meta';
import Link from 'next/link';

export default function ForgotPassword() {
  return (
    <>
      <Meta title="| Forgot Password" />
      <h1 className="font-sans">This is the forgot password page!</h1>
      <Link href="/login">Back</Link>
    </>
  );
}
