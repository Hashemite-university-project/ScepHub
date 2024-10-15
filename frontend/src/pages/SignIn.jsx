import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function SignIn() {
    const [user_email, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const navigate = useNavigate();

    const validate = (fieldName, value) => {
        switch (fieldName) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(value);
            case 'password':
                return value.length >= 8;
            default:
                return false;
        }
    };

    const handleSignIn = async (e) => {
        e.preventDefault();
        if (!validate('email', user_email) || !validate('password', password) || !role) {
            Swal.fire({
                title: 'Invalid Input',
                text: 'Please provide a valid email, password (minimum 8 characters), and select a role.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
            return;
        }

        let apiUrl = '';
        if (role === 'Admin') {
            apiUrl = 'http://localhost:8080/user/admin/signIn';
        } else if (role === 'Instructor') {
            apiUrl = 'http://localhost:8080/user/instructor/signIn';
        } else if (role === 'Student') {
            apiUrl = 'http://localhost:8080/user/student/signIn';
        }

        try {
            const response = await axios.post(apiUrl, {
                user_email,
                password,
            }, { withCredentials: true });

            if (response.status === 200) {
                navigate(`/`);
            } else {
                Swal.fire({
                    title: 'Wrong Request',
                    text: 'Check your password or email.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Request Failed',
                text: 'Check your password or email.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-gray-50 py-6 px-4 sm:px-6 lg:px-8 bg-no-repeat bg-cover" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")'}}>
            <div className="absolute bg-gradient-to-r from-gray-100 via-blue-300 to-gray-950 opacity-60 inset-0 z-0"></div>
            <div className="max-w-xl w-full space-y-8 p-10 bg-white rounded-xl z-10">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-bold text-gray-900">Welcome Back!</h2>
                    <p className="mt-2 text-sm text-gray-600">Sign In As</p>
                </div>
                <div className="flex flex-row justify-center items-center space-x-3">
                    <div className='flex flex-col align-middle justify-center items-center'>
                        <button
                            name='Instructor'
                            className={`w-32 p-2 rounded-full font-bold text-lg ${role === 'Instructor' ? 'bg-blue-400 text-white' : 'bg-gray-200 text-black'}`}
                            onClick={() => setRole('Instructor')}
                            aria-pressed={role === 'Instructor'}
                        >
                            Instructor
                        </button>
                        <label className="text-sm font-bold text-gray-700 tracking-wide" htmlFor='Instructor'>Instructor</label>
                    </div>
                    <div className='flex flex-col align-middle justify-center items-center'>
                        <button
                            name='Student'
                            className={`w-32 p-2 rounded-full font-bold text-lg ${role === 'Student' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
                            onClick={() => setRole('Student')}
                            aria-pressed={role === 'Student'}
                        >
                            Student
                        </button>
                        <label className="text-sm font-bold text-gray-700 tracking-wide" htmlFor='Student'>Student</label>
                    </div>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSignIn}>
                    <div className="relative">
                        {validate('email', user_email) && (
                            <div className="absolute right-0 mt-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                        )}
                        <label className="text-sm font-bold text-gray-700 tracking-wide">Email</label>
                        <input className="w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" name="email" type="email" value={user_email} onChange={(e) => setUserEmail(e.target.value)} placeholder="mail@gmail.com" required />
                    </div>
                    <div className="mt-8 relative">
                        {validate('password', password) && (
                            <div className="absolute right-0 top-2.5">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                        )}
                        <label className="text-sm font-bold text-gray-700 tracking-wide">Password</label>
                        <input
                            className="w-full content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                            type="password"
                            value={password}
                            placeholder="Enter your password"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <button type="submit" className="w-full flex justify-center bg-blue-600 text-gray-100 p-4 rounded-full tracking-wide font-semibold focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg cursor-pointer transition ease-in duration-300">
                            Sign in
                        </button>
                    </div>
                    <p className="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
                        <span>Don't have an account?</span>
                        <Link to='/SignUp' className="text-indigo-500 hover:text-indigo-500 no-underline hover:underline cursor-pointer transition ease-in duration-300">Sign up</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default SignIn;
