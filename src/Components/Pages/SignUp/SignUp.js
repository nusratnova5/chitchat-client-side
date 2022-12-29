import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider';

const SignUp = () => {
    const {register , handleSubmit, formState: {errors}} = useForm();
    const [data ,setData] = useState("");
    const {createUser} = useContext(AuthContext);

    const handleSignup = data =>{
        console.log(data);
        createUser(data.email,data.password)
        .then(result =>{
            const user = result.user;
            console.log(user);
        })
        .catch(error =>console.log(error));
    }

    return (
        <div className='h-[800px] flex justify-center items-center  '>
            <div className='w-96 p-7  rounded'>
                <h2 className='text-4xl font-bold  mb-5'>SIGN UP</h2>
                <form onSubmit={handleSubmit(handleSignup)}>
                <div className="form-control w-full max-w-xs mb-5">
                        <label className="label">
                            <span className="label-text ">Enter Your Name</span>
                        </label>
                        <input type="text" className="input input-bordered w-full max-w-xs" {...register("name")} placeholder="" />
                    </div>
                    <div className="form-control w-full max-w-xs mb-5">
                        <label className="label">
                            <span className="label-text ">Enter Your Email</span>
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
                    <input type="submit" value="SUBMIT" className='btn w-full my-3' />
                </form>
                <p className='text-center '>Already Registered!!! <Link to='/login' className=' font-bold'>Please Log IN</Link></p>
            </div>
        </div>
    );
};

export default SignUp;