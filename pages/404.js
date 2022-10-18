import Link from 'next/link'
import { useCookies } from 'react-cookie';

export default function FourOhFour() {

  const [cookies, setCookie] = useCookies('');
  console.log(cookies);

  return(
  <span>
    <h1>404 - Page Not Found</h1>
    <Link href="/dashboard">
      <a>Go back home</a>
    </Link>
  </span>
  )
}