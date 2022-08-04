import Image from 'next/image'
import Link from 'next/link'

export default function Login(){

    return(
        <>
            <section className='login-section'>
                <div className='container login-container'>
                    <div className='login-div'>
                        <div className='login-head'>
                            <div className='login-logo'>
                                <a href="/"> <Image src="/Images/logo.png" alt="login logo" width={220} height={50} /></a>
                            </div>
                            <div className='login-logo-mobile'>
                                <a href="/"><Image src="/Mobile-logo-signup.svg" alt="login logo" width={100} height={100} /></a>
                            </div>
                        </div>

                        <h2 className='login-title'>Log In</h2>

                        <h3>Welcome back! Please enter your details.</h3>

                        <form method='POST' className="login-main" >
                            <div id='personal-account'>
                                <div className="form-group"  >
                                        <label htmlFor="ba-num"  className='form-label'>Email</label>
                                        <input type="text" id="name" name="name"  />
                                </div>
                                <div className="form-group">
                                        <label htmlFor="pwd" className='form-label label'>Password</label>
                                        <input type="password" id="pwd"  name="pwd"  />
                                </div>  
                                <div className='login-head'>
                                    <div className='login-col'>
                                        <input type="checkbox" /><label className="check" htmlFor="">Remember me</label>
                                    </div>
                                    <div className='login-two'>
                                        <Link href='/forgot-password'><a><span className='login-text-login'>Forgot Password?</span></a></Link>
                                    </div>
                                </div> 
                                
                                <div className="login-btn">
                                    <button type="submit" className="login-create-acc-btn">Login</button>  
                                </div>
                                <div className='login-line'><img src='/signup-Line.png' /><p className='text-or'>or</p><img src='/signup-Line.png' /></div>             
                            </div>
                        
                            <div className='login-option'>
                                <button className='login login-google' onClick={() => signIn()} ><img src='login/Google.svg'/></button>
                                <button className='login login-fb'><img src='login/Facebook.svg'/></button>
                                <button className='login login-fb'><img src='/Apple_logo.png'/></button> 
                            </div>

                            <div className='login-text'>
                                <p>Don&apos;t have an account? <Link href='/signup'><a><span className='signup-text-login'>Sign up</span></a></Link></p>
                            </div>
                        </form>
                    </div>
                </div>
    </section>
        </>
    )
}