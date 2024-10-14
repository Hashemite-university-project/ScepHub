import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';

function SignUp() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    phone_number: '',
    password: '',
    confirme_password: '',
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    const { user_name, user_email, phone_number, password, confirme_password } = formData;
    if (!user_name || !user_email || !phone_number || !password) {
      Swal.fire({
        title: 'Incomplete Data',
        text: 'Please fill in all the fields',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
      if(password !== confirme_password){
            Swal.fire({
                title: 'Incomplete Data',
                text: 'Please make sure the password is the same as confirme password',
                icon: 'warning',
                confirmButtonText: 'OK',
            });
        }
      return false;
    }
    return true;
  };

  const validate = (fieldName, value) => {
  switch (fieldName) {
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(value);
        case 'password':
            return value.length > 8;
        default:
            return false;
    }
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
     if (!validateForm()) return;
     setLoading(true);
    try {
        const response = await axios.post('http://localhost:8080/user/client/signup', formData,{ withCredentials: true });
        if (response.status === 201) {
             setLoading(false);
            navigate(`/HomePage`);
        } else {
            Swal.fire({
                title: 'wrong request',
                text: `this account is already exist!`,
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    } catch (error) {
        setLoading(false);
        Swal.fire({
            title: 'wrong request',
            icon: "error",
            text: `there is something wrong`,
            confirmButtonText: 'OK',
        });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-no-repeat bg-cover"
            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")' }}>
        <div className="absolute bg-gradient-to-r from-gray-100 via-[#bce1ff] to-gray-100 opacity-60 inset-0 z-0"></div>
        <div className="max-w-xl w-full space-y-8 p-10 bg-white rounded-xl z-10">
            <div className="text-center">
                <h2 className="mt-6 text-3xl font-bold text-gray-900">Welcom Back!</h2>
                <p className="mt-2 text-sm text-gray-600">Please sign in to your account</p>
            </div>
            <div className="flex flex-row justify-center items-center space-x-3">
                <span className="w-11 h-11 items-center justify-center inline-flex rounded-full font-bold text-lg  text-white bg-blue-900 hover:shadow-lg cursor-pointer transition ease-in duration-300"><img class="w-4 h-4" alt='' src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDI0IDI0IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyIiB4bWw6c3BhY2U9InByZXNlcnZlIiBjbGFzcz0iIj48Zz48cGF0aCB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGQ9Im0xNS45OTcgMy45ODVoMi4xOTF2LTMuODE2Yy0uMzc4LS4wNTItMS42NzgtLjE2OS0zLjE5Mi0uMTY5LTMuMTU5IDAtNS4zMjMgMS45ODctNS4zMjMgNS42Mzl2My4zNjFoLTMuNDg2djQuMjY2aDMuNDg2djEwLjczNGg0LjI3NHYtMTAuNzMzaDMuMzQ1bC41MzEtNC4yNjZoLTMuODc3di0yLjkzOWMuMDAxLTEuMjMzLjMzMy0yLjA3NyAyLjA1MS0yLjA3N3oiIGZpbGw9IiNmZmZmZmYiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIHN0eWxlPSIiIGNsYXNzPSIiPjwvcGF0aD48L2c+PC9zdmc+"/></span>
                <span className="w-11 h-11 items-center justify-center inline-flex rounded-full font-bold text-lg  text-white bg-blue-400 hover:shadow-lg cursor-pointer transition ease-in duration-300"><img class="w-4 h-4" alt='' src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDY4MS4zMzQ2NCA2ODEiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxnPjxwYXRoIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZD0ibTIwMC45NjQ4NDQgNTE1LjI5Mjk2OWMyNDEuMDUwNzgxIDAgMzcyLjg3MTA5NC0xOTkuNzAzMTI1IDM3Mi44NzEwOTQtMzcyLjg3MTA5NCAwLTUuNjcxODc1LS4xMTcxODgtMTEuMzIwMzEzLS4zNzEwOTQtMTYuOTM3NSAyNS41ODU5MzctMTguNSA0Ny44MjQyMTgtNDEuNTg1OTM3IDY1LjM3MTA5NC02Ny44NjMyODEtMjMuNDgwNDY5IDEwLjQ0MTQwNi00OC43NTM5MDcgMTcuNDYwOTM3LTc1LjI1NzgxMyAyMC42MzY3MTggMjcuMDU0Njg3LTE2LjIzMDQ2OCA0Ny44MjgxMjUtNDEuODk0NTMxIDU3LjYyNS03Mi40ODgyODEtMjUuMzIwMzEzIDE1LjAxMTcxOS01My4zNjMyODEgMjUuOTE3OTY5LTgzLjIxNDg0NCAzMS44MDg1OTQtMjMuOTE0MDYyLTI1LjQ3MjY1Ni01Ny45NjQ4NDMtNDEuNDAyMzQ0LTk1LjY2NDA2Mi00MS40MDIzNDQtNzIuMzY3MTg4IDAtMTMxLjA1ODU5NCA1OC42ODc1LTEzMS4wNTg1OTQgMTMxLjAzMTI1IDAgMTAuMjg5MDYzIDEuMTUyMzQ0IDIwLjI4OTA2MyAzLjM5ODQzNyAyOS44ODI4MTMtMTA4LjkxNzk2OC01LjQ4MDQ2OS0yMDUuNTAzOTA2LTU3LjYyNS0yNzAuMTMyODEyLTEzNi45MjE4NzUtMTEuMjUgMTkuMzYzMjgxLTE3Ljc0MjE4OCA0MS44NjMyODEtMTcuNzQyMTg4IDY1Ljg3MTA5MyAwIDQ1LjQ2MDkzOCAyMy4xMzY3MTkgODUuNjA1NDY5IDU4LjMxNjQwNyAxMDkuMDgyMDMyLTIxLjUtLjY2MDE1Ni00MS42OTUzMTMtNi41NjI1LTU5LjM1MTU2My0xNi4zODY3MTktLjAxOTUzMS41NTA3ODEtLjAxOTUzMSAxLjA4NTkzNy0uMDE5NTMxIDEuNjcxODc1IDAgNjMuNDY4NzUgNDUuMTcxODc1IDExNi40NjA5MzggMTA1LjE0NDUzMSAxMjguNDY4NzUtMTEuMDE1NjI1IDIuOTk2MDk0LTIyLjYwNTQ2OCA0LjYwOTM3NS0zNC41NTg1OTQgNC42MDkzNzUtOC40Mjk2ODcgMC0xNi42NDg0MzctLjgyODEyNS0yNC42MzI4MTItMi4zNjMyODEgMTYuNjgzNTk0IDUyLjA3MDMxMiA2NS4wNjY0MDYgODkuOTYwOTM3IDEyMi40MjU3ODEgOTEuMDIzNDM3LTQ0Ljg1NTQ2OSAzNS4xNTYyNS0xMDEuMzU5Mzc1IDU2LjA5NzY1Ny0xNjIuNzY5NTMxIDU2LjA5NzY1Ny0xMC41NjI1IDAtMjEuMDAzOTA2LS42MDU0NjktMzEuMjYxNzE4OC0xLjgxNjQwNyA1Ny45OTk5OTk4IDM3LjE3NTc4MSAxMjYuODcxMDkzOCA1OC44NzEwOTQgMjAwLjg4NjcxODggNTguODcxMDk0IiBmaWxsPSIjZmZmZmZmIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBzdHlsZT0iIj48L3BhdGg+PC9nPjwvc3ZnPg=="/></span>
                <span className="w-11 h-11 items-center justify-center inline-flex rounded-full font-bold text-lg  text-white bg-blue-500 hover:shadow-lg cursor-pointer transition ease-in duration-300"><img alt='' src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDI0IDI0IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyIiB4bWw6c3BhY2U9InByZXNlcnZlIj48Zz48cGF0aCB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGQ9Im0yMy45OTQgMjR2LS4wMDFoLjAwNnYtOC44MDJjMC00LjMwNi0uOTI3LTcuNjIzLTUuOTYxLTcuNjIzLTIuNDIgMC00LjA0NCAxLjMyOC00LjcwNyAyLjU4N2gtLjA3di0yLjE4NWgtNC43NzN2MTYuMDIzaDQuOTd2LTcuOTM0YzAtMi4wODkuMzk2LTQuMTA5IDIuOTgzLTQuMTA5IDIuNTQ5IDAgMi41ODcgMi4zODQgMi41ODcgNC4yNDN2Ny44MDF6IiBmaWxsPSIjZmZmZmZmIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBzdHlsZT0iIj48L3BhdGg+PHBhdGggeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBkPSJtLjM5NiA3Ljk3N2g0Ljk3NnYxNi4wMjNoLTQuOTc2eiIgZmlsbD0iI2ZmZmZmZiIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgc3R5bGU9IiI+PC9wYXRoPjxwYXRoIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZD0ibTIuODgyIDBjLTEuNTkxIDAtMi44ODIgMS4yOTEtMi44ODIgMi44ODJzMS4yOTEgMi45MDkgMi44ODIgMi45MDkgMi44ODItMS4zMTggMi44ODItMi45MDljLS4wMDEtMS41OTEtMS4yOTItMi44ODItMi44ODItMi44ODJ6IiBmaWxsPSIjZmZmZmZmIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBzdHlsZT0iIj48L3BhdGg+PC9nPjwvc3ZnPg==" class="w-4 h-4"/></span>
            </div>
            <div className="flex items-center justify-center space-x-2">
                <span className="h-px w-16 bg-gray-300"></span>
                <span className="text-gray-500 font-normal">OR</span>
                <span className="h-px w-16 bg-gray-300"></span>
            </div>
            <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
                {/* <input type="hidden" name="remember" value="true"/> */}
                <div className="relative">
                    {validate('username', formData.user_name) ? (
                            <div className="absolute right-0 mt-4"><svg xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                        ) : (
                            <div></div>
                        )}
                    <label className="text-sm font-bold text-gray-700 tracking-wide">User Name</label>
                    <input className=" w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="text" placeholder="your name" value={formData.user_name} onChange={handleChange} name="user_name" required />
                </div>
                <div className="relative">
                    {validate('email', formData.user_email) ? (
                            <div className="absolute right-0 mt-4"><svg xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                        ) : (
                            <div></div>
                        )}
                    <label className="text-sm font-bold text-gray-700 tracking-wide">Email</label>
                    <input className=" w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="email" placeholder="clientemail@mail.com" name="user_email" value={formData.user_email}  onChange={handleChange} required />
                </div>
                <div className="relative mt-8 content-center">
                    {validate('phoneNumber', formData.phone_number) ? (
                            <div className="absolute right-0 mt-4"><svg xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                        ) : (
                            <div></div>
                        )}
                    <label className="text-sm font-bold text-gray-700 tracking-wide">Phone Number</label>
                    <input className="w-full content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="text" placeholder="07 *778 7***" name="phone_number" value={formData.phone_number} onChange={handleChange} required />
                </div>
                <div className="relative mt-8 content-center">
                    {validate('password', formData.password) ? (
                            <div className="absolute right-0 mt-4"><svg xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                        ) : (
                            <div></div>
                        )}
                    <label className="text-sm font-bold text-gray-700 tracking-wide">Password</label>
                    <input className="w-full content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="password" placeholder="Enter your password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <div className="relative mt-8 content-center">
                    {validate('confirmePassword', formData.confirme_password) ? (
                            <div className="absolute right-0 mt-4"><svg xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                        ) : (
                            <div></div>
                        )}
                    <label className="text-sm font-bold text-gray-700 tracking-wide">Confirme Password</label>
                    <input className="w-full content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="password" placeholder="Confirme your password" name="confirme_password" value={formData.confirme_password} onChange={handleChange} required />
                </div>
                <div className="flex items-center justify-between">
                    <div className="text-sm">
                        <Link to="/SignIn" className="font-medium text-indigo-500 hover:text-indigo-500">Forgot your password?</Link>
                    </div>
                </div>
                <div>
                    <button type="submit" disabled={loading} class="w-full flex justify-center bg-blue-600 text-gray-100 p-4  rounded-full tracking-wide
                                    font-semibold  focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg cursor-pointer transition ease-in duration-300">
                    {loading ? 'Submitting...' : 'Sign Up'}</button>
                </div>
                <p className="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
                    <span>Don't have an account?</span>
                    <Link to="/SignIn" className="text-indigo-500 hover:text-indigo-500no-underline hover:underline cursor-pointer transition ease-in duration-300">Sign In</Link>
                </p>
            </form>
        </div>
    </div>
  );
}

export default SignUp;















    // <section className="bg-white dark:bg-gray-900">
    //   <div className="flex justify-center min-h-screen">
    //     <div className="hidden bg-cover lg:block lg:w-2/5">
    //       <img
    //         src="https://images.unsplash.com/photo-1579403124614-197f69d8187b?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    //         alt="background-coding-image"
    //       />
    //     </div>
    //     <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
    //       <div className="w-full">
    //         <h1 className="text-2xl font-semibold tracking-wider text-gray-800 capitalize dark:text-white">
    //           Get your free account now.
    //         </h1>
    //         <p className="mt-4 text-gray-500 dark:text-gray-400">
    //           Let get you all set up so you can verify your personal account and begin setting up your profile.
    //         </p>
    //         <div className="mt-6">
    //           <h1 className="text-gray-500 dark:text-gray-300">Select type of account</h1>
    //           <div className="mt-3 md:flex md:items-center md:-mx-2">
    //             <button
    //               onClick={() => setAccountType('coach')}
    //               className={`flex justify-center w-full px-6 py-3 text-white ${
    //                 accountType === 'coach' ? 'bg-blue-500' : 'border-blue-500'
    //               } rounded-md md:w-auto md:mx-2 focus:outline-none`}
    //             >
    //               <svg
    //                 xmlns="http://www.w3.org/2000/svg"
    //                 className="w-6 h-6"
    //                 fill="none"
    //                 viewBox="0 0 24 24"
    //                 stroke="currentColor"
    //                 strokeWidth="2"
    //               >
    //                 <path
    //                   strokeLinecap="round"
    //                   strokeLinejoin="round"
    //                   d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    //                 />
    //               </svg>
    //               <span className="mx-2">Coach</span>
    //             </button>
    //             <button
    //               onClick={() => setAccountType('member')}
    //               className={`flex justify-center w-full px-6 py-3 text-white ${
    //                 accountType === 'member' ? 'bg-blue-500' : 'border-blue-500'
    //               } rounded-md md:mt-0 md:w-auto md:mx-2 focus:outline-none`}
    //             >
    //               <svg
    //                 xmlns="http://www.w3.org/2000/svg"
    //                 className="w-6 h-6"
    //                 fill="none"
    //                 viewBox="0 0 24 24"
    //                 stroke="currentColor"
    //                 strokeWidth="2"
    //               >
    //                 <path
    //                   strokeLinecap="round"
    //                   strokeLinejoin="round"
    //                   d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    //                 />
    //               </svg>
    //               <span className="mx-2">Member</span>
    //             </button>
    //           </div>
    //         </div>

    //         <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
    //           <div>
    //             <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">User name</label>
    //             <input
    //               required
    //               type="text"
    //               name="user_name"
    //               value={formData.user_name}
    //               onChange={handleChange}
    //               placeholder="mohammed ali"
    //               className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
    //             />
    //           </div>
    //           <div>
    //             <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email</label>
    //             <input
    //               required
    //               type="text"
    //               name="user_email"
    //               value={formData.user_email}
    //               onChange={handleChange}
    //               placeholder="user@email.com"
    //               className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
    //             />
    //           </div>
    //           <div>
    //             <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Major</label>
    //             <input
    //               required
    //               type="text"
    //               name="major"
    //               value={formData.major}
    //               onChange={handleChange}
    //               placeholder="Software Engineering"
    //               className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
    //             />
    //           </div>
    //           <div>
    //             <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Phone number</label>
    //             <input
    //               required
    //               type="text"
    //               name="phone_number"
    //               value={formData.phone_number}
    //               onChange={handleChange}
    //               placeholder="07 **** ****"
    //               className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
    //             />
    //           </div>
    //           <div>
    //             <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Password</label>
    //             <input
    //               required
    //               type="text"
    //               name="password"
    //               value={formData.password}
    //               onChange={handleChange}
    //               placeholder="********"
    //               className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
    //             />
    //           </div>
    //           <div>
    //             <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Confirm Password</label>
    //             <input
    //               required
    //               type="text"
    //               name="confirmPassword"
    //               value={formData.confirmPassword}
    //               onChange={handleChange}
    //               placeholder="********"
    //               className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
    //             />
    //           </div>
    //           {/* Submit button */}
    //           <div className="pt-6">
    //             <button className="flex items-center justify-between w-full h-14 px-6 py-1 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
    //               <span>Sign Up</span>
    //               <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 rtl:-scale-x-100" viewBox="0 0 20 20" fill="currentColor">
    //                 <path
    //                   fillRule="evenodd"
    //                   d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
    //                   clipRule="evenodd"
    //                 />
    //               </svg>
    //             </button>
    //           </div>
    //         </form>
    //       </div>
    //     </div>
    //   </div>
    // </section>