import React from 'react'
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <div class="flex flex-col">
        <nav class="flex justify-around py-4 bg-white/80
            backdrop-blur-md shadow-md w-full
            fixed top-0 left-0 right-0 z-10">
            {/* <!-- Logo Container --> */}
            <div class="flex flex-row items-center">
                {/* <!-- Logo --> */}
                <img class="h-10 object-cover" src="https://png.pngtree.com/png-vector/20220926/ourmid/pngtree-company-logo-png-image_6145477.png" alt="compny Logo"/>
                <div class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">ScepHub</div>
            </div>
            {/* <!-- Links Section --> */}
            <div class="items-center hidden space-x-8 lg:flex">
                <Link to={'/'} class="flex text-gray-600 hover:text-blue-500
                    cursor-pointer transition-colors duration-300">
                    Home
                </Link>
                <Link to={''} class="flex text-gray-600 
                    cursor-pointer transition-colors duration-300
                    font-semibold text-blue-600">
                    Themes
                </Link>
                <Link to={''} class="flex text-gray-600 hover:text-blue-500
                    cursor-pointer transition-colors duration-300">
                    Developers
                </Link>
                <Link to={''} class="flex text-gray-600 hover:text-blue-500
                    cursor-pointer transition-colors duration-300">
                    Pricing
                </Link>
                <Link to={'/ContactUs'} class="flex text-gray-600 hover:text-blue-500
                    cursor-pointer transition-colors duration-300">
                    Contact US
                </Link>
                <Link to={'/AboutUs'} class="flex text-gray-600 hover:text-blue-500
                    cursor-pointer transition-colors duration-300">
                    About Us
                </Link>
            </div>
            <div class="flex items-center space-x-5">
                <Link to={'/SignUp'} class="flex text-gray-600 hover:text-blue-500
                    cursor-pointer transition-colors duration-300">
                    <svg class="fill-current h-5 w-5 mr-2 mt-0.5" version="1.1" width="24" height="24"
                        viewBox="0 0 24 24">
                        <path d="M12 0L11.34 .03L15.15 3.84L16.5 2.5C19.75 4.07 22.09 7.24 22.45 11H23.95C23.44 4.84 18.29 0 12 0M12 4C10.07 4 8.5 5.57 8.5 7.5C8.5 9.43 10.07 11 12 11C13.93 11 15.5 9.43 15.5 7.5C15.5 5.57 13.93 4 12 4M12 6C12.83 6 13.5 6.67 13.5 7.5C13.5 8.33 12.83 9 12 9C11.17 9 10.5 8.33 10.5 7.5C10.5 6.67 11.17 6 12 6M.05 13C.56 19.16 5.71 24 12 24L12.66 23.97L8.85 20.16L7.5 21.5C4.25 19.94 1.91 16.76 1.55 13H.05M12 13C8.13 13 5 14.57 5 16.5V18H19V16.5C19 14.57 15.87 13 12 13M12 15C14.11 15 15.61 15.53 16.39 16H7.61C8.39 15.53 9.89 15 12 15Z" />
                    </svg>
                    Register
                </Link>
                <Link to={'/SignIn'} class="flex text-gray-600 
                    cursor-pointer transition-colors duration-300
                    font-semibold text-blue-600">
                    <svg class="fill-current h-5 w-5 mr-2 mt-0.5" version="1.1" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M10,17V14H3V10H10V7L15,12L10,17M10,2H19A2,2 0 0,1 21,4V20A2,2 0 0,1 19,22H10A2,2 0 0,1 8,20V18H10V20H19V4H10V6H8V4A2,2 0 0,1 10,2Z" />
                    </svg>
                    Login
                </Link>
            </div>
        </nav>
    </div>
  )
}

export default NavBar;




















// <header class="text-slate-700 container relative mx-auto flex flex-col overflow-hidden px-4 py-4 lg:flex-row lg:items-center">
    //     <Link to="/HomePage" class="flex items-center whitespace-nowrap text-2xl font-black">
    //         <span class="mr-2 w-8">
    //             <img src="https://png.pngtree.com/png-vector/20220926/ourmid/pngtree-company-logo-png-image_6145477.png" alt="company logo" />
    //         </span>
    //         ScepHub
    //     </Link>
    //     <input type="checkbox" class="peer hidden" id="navbar-open" />
    //     <label class="absolute top-5 right-5 cursor-pointer lg:hidden" for="navbar-open">
    //         <svg class="h-7 w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    //             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16"></path>
    //         </svg>
    //     </label>
    //     <nav aria-label="Header Navigation" class="peer-checked:pt-8 peer-checked:max-h-60 flex max-h-0 w-full flex-col items-center overflow-hidden transition-all lg:ml-24 lg:max-h-full lg:flex-row">
    //         <ul class="flex w-full flex-col items-center space-y-2 lg:flex-row lg:justify-center lg:space-y-0">
    //             <li class="lg:mr-12"><Link class="rounded text-gray-700 transition focus:outline-none focus:ring-1 focus:ring-blue-700 focus:ring-offset-2" to="/HomePage">Home</Link></li>
    //             <li class="lg:mr-12"><Link class="rounded text-gray-700 transition focus:outline-none focus:ring-1 focus:ring-blue-700 focus:ring-offset-2" to="/Services">Services</Link></li>
    //             <li class="lg:mr-12"><Link class="rounded text-gray-700 transition focus:outline-none focus:ring-1 focus:ring-blue-700 focus:ring-offset-2" to="/ContactUs">Contact</Link></li>
    //             <li class="lg:mr-12"><Link class="rounded text-gray-700 transition focus:outline-none focus:ring-1 focus:ring-blue-700 focus:ring-offset-2" to="/AboutUs">About Us</Link></li>
    //         </ul>
    //         <hr class="mt-4 w-full lg:hidden" />
    //         <div class="my-4 flex items-center space-x-6 space-y-2 lg:my-0 lg:ml-auto lg:space-x-8 lg:space-y-0">
    //             <a href="#" title="" class="whitespace-nowrap rounded font-medium transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-blue-700 focus:ring-offset-2 hover:text-opacity-50"> Log in </a>
    //             <a href="#" title="" class="whitespace-nowrap rounded-xl bg-blue-700 px-5 py-3 font-medium text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 hover:bg-blue-600">Get free trial</a>
    //         </div>
    //     </nav>
    // </header>