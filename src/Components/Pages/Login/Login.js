import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider';

const Login = () => {
    const {register , handleSubmit, formState: {errors}} = useForm();
    const [data ,setData] = useState("");
    const {LogIn,googleLogIn} = useContext(AuthContext);
    const googleProvider = new GoogleAuthProvider();

    const handleLogin = data => {
        console.log(data);
        LogIn(data.email,data.password)
        .then(result =>{
            const user = result.user;
            console.log(user);
        })
        .catch(error =>{
            console.log(error)
        });
    }

    const handleGoogleLogIn = () => {
        googleLogIn(googleProvider)
        .then(result => {
                const user = result.user;
                console.log(user);
            })
            .catch(error => {
                console.error(error);
            })
    }
    

    return (
        <div className='h-[800px] flex justify-center items-center'>
        <div className='w-96 p-7 rounded'>
            <h2 className='text-4xl font-bold mb-5'>SIGN IN</h2>
            <form onSubmit={  handleSubmit(handleLogin) }>                   
             <div className="form-control w-full max-w-xs mb-5">
                    <label className="label">
                        <span className="label-text">Enter Your Email</span>
                    </label>
                    <input type="text" className="input input-bordered w-full max-w-xs" {...register("email",{required:"Email is required"})} placeholder="" />
                    {errors.email && <p role="alert" className='text-red-700 m-2'>{errors.email?.message}</p>}
                </div>
                <div className="form-control w-full max-w-xs mb-5">
                    <label className="label">
                        <span className="label-text ">Enter Your Password</span>
                    </label>
                    <input type="password" className="input input-bordered w-full max-w-xs" {...register("password",{required:true})} placeholder="" />
                </div>

                <input type="submit" value="Login" className='btn w-full my-3' />
            </form>
            <p className='text-center '>New to the website!!! <Link to='/signup' className=' font-bold'>Please SIGN UP</Link></p>
            <div className="divider">Or</div> 
            <button onClick={handleGoogleLogIn} className='btn w-full my-3' >Google</button>
        </div>
    </div>
    );
};

export default Login;