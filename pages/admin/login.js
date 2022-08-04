import Image from 'next/image'
import Link from 'next/link'

export default function Login(){
    
    return(
        <>
            <style global jsx>{`html, body,div#__next{ height: 100%; }`}</style> 
            <section className='login-section'>
                <div className='container login-container'>
                    <div className='login-div'>
                       <h2 className='login-title'>Automation Tool Login</h2>
                            <form method='POST' className="login-main" >
                            <div id='personal-account'>
                                <div className="form-group"  >
                                        <label htmlFor="ba-num"  className='form-label'>Email</label>
                                        <input type="text" id="name" name="name" className='form-control login-input' />
                                </div>
                                <div className="form-group">
                                        <label htmlFor="pwd" className='form-label label'>Password</label>
                                        <input type="password" id="pwd"  name="pwd" className='form-control login-input' />
                                </div>  
                                <div className='login-head'>
                                    <div className='login-col'>
                                        <input type="checkbox" /><label className="check" htmlFor="">Remember me</label>
                                    </div>
                                    <div className='login-two'>
                                        <Link href='#'><a><span className='login-text-login'>Forgot Password?</span></a></Link>
                                    </div>
                                </div> 
                                
                                <div className="login-btn">
                                    <button type="submit" className="login-create-acc-btn">Login</button>  
                                </div>         
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}