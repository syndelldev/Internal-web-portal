import Link from 'next/link'
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import { server } from 'config';

export default function FourOhFour() {

  const [cookies, setCookie] = useCookies('');
  const router = useRouter();

  if(cookies.name){
    router.push(`${server}/dashboard`);
  }

  return(
  <span>
    <h1>404 - Page Not Found</h1>
    <Link href="/login">
      <a>Go back</a>
    </Link>
  </span>
  )
}