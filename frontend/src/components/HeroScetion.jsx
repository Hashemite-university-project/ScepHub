import React from 'react';
import { Link } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';

function HeroSection() {
  return (
    <div class="bg-white relative pt-32 pb-20 lg:pt-20 mt-16">
        <div class="relative xl:container m-auto px-6 md:px-12 lg:px-6">
            <h1 class="lg:ml-12 sm:mx-auto sm:w-10/12 md:w-2/3 font-black text-blue-900 text-4xl text-center sm:text-5xl md:text-6xl lg:w-auto lg:text-left xl:text-6xl xl:pl-6">Empowering Future 
                <span class="relative text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500"> Developers,<br class="lg:block hidden"/></span>
                <TypeAnimation
                    sequence={[
                        // 1000,
                        'One Project at a Time.',
                        2500,
                        'Building Real Solutions.',
                        2500,
                        'Mastering Skills through Experience.',
                        2500,
                        'Innovating with Purpose.',
                        2500,
                    ]}
                    wrapper="span"
                    speed={25}
                    style={{ fontSize: '1em', display: 'inline-block' }}
                    repeat={Infinity}
                    cursor= {true}
                    preRenderFirstString= {true}
                    deletionSpeed= {25}
                    omitDeletionAnimation= {true}
                />
            </h1>
            <div class="lg:flex">
                <div class="relative mt-8 md:mt-16 space-y-8 sm:w-10/12 md:w-2/3 lg:ml-12 sm:mx-auto text-center lg:text-left lg:mr-auto lg:w-7/12">
                    <p class="sm:text-lg text-gray-700 lg:w-11/12 xl:pl-6">
                        Join scebHub to gain real-world experience, enhance your skills, and collaborate on projects managed by industry experts. Build, test, and grow your career in development.
                    </p>
                    <span class="block font-semibold text-gray-500 xl:pl-6">The best companion bot for your chat app.</span>
                    <div class="xl:pl-6 grid grid-cols-3 space-x-4 md:space-x-6 md:flex md:justify-center lg:justify-start">
                        <Link aria-label="add to slack" href="#" class="p-4 border border-gray-200 rounded-full duration-300 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-600/20">
                            <div class="flex justify-center space-x-4">
                                <img class="w-6 h-6" src="https://seeklogo.com/images/G/github-logo-7880D80B8D-seeklogo.com.png" alt="slack logo" loading="lazy" width="128" height="128"/>
                                <span class="hidden font-medium md:block ">GitHub</span>
                            </div>
                        </Link>    
                        <Link aria-label="add to chat" href="#" class="p-4 border border-gray-200 rounded-full duration-300 hover:border-green-400 hover:shadow-lg hover:shadow-lime-600/20">
                            <div class="flex justify-center space-x-4">
                                <img class="w-6 h-6" src="https://tailus.io/sources/blocks/tech-startup/preview/images/chat.png" alt="chat logo" loading="lazy" width="128" height="128"/>
                                <span class="hidden font-medium md:block ">Google Chat</span>
                            </div>
                        </Link>   
                        <Link aria-label="add to zoom" href="#" class="p-4 border border-gray-200 rounded-full duration-300 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-600/20 ">
                            <div class="flex justify-center space-x-4">
                                <img class="w-6 h-6" src="https://tailus.io/sources/blocks/tech-startup/preview/images/zoom.png" alt="chat logo" loading="lazy" width="128" height="128"/>
                                <span class="hidden font-medium md:block ">Zoom</span>
                            </div>
                        </Link>    
                    </div>
                    <div class="xl:pl-6">
                        🔥🌟 
                        <span>Other integrations :</span> 
                        <Link to="#" class="font-semibold text-gray-700 ">Discord,</Link>
                        <Link to="#" class="font-semibold text-gray-700 ">Telegram</Link>
                    </div>
                    <div class="pt-12 flex gap-6 lg:gap-12 justify-between grayscale lg:w-2/3 xl:pl-6">
                        <img src="https://tailus.io/sources/blocks/tech-startup/preview/images/clients/airbnb.svg" class="h-8 sm:h-10 w-auto lg:h-12" alt="" />
                        <img src="https://tailus.io/sources/blocks/tech-startup/preview/images/clients/ge.svg" class="h-8 sm:h-10 w-auto lg:h-12" alt="" />
                        <img src="https://tailus.io/sources/blocks/tech-startup/preview/images/clients/coty.svg" class="h-8 sm:h-10 w-auto lg:h-12" alt="" />
                        <img src="https://tailus.io/sources/blocks/tech-startup/preview/images/clients/microsoft.svg" class="h-8 sm:h-10 w-auto lg:h-12" alt="" />
                    </div>
                </div>
                <div class="mt-0 md:mt-0 lg:absolute right-14 -bottom-7 lg:w-4/12">
                    <div class="relative w-full">
                        <div aria-hidden="true" class="absolute scale-75 md:scale-110 inset-0 m-auto w-full h-full md:w-96 md:h-96 rounded-full rotate-45 bg-gradient-to-r from-sky-500 to-cyan-300 blur-3xl"></div>
                        <img src="https://tailus.io/sources/blocks/tech-startup/preview/images/globalization-cuate.svg" class="relative w-full" alt="wath illustration" loading="lazy" width="320" height="280"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HeroSection







// <div class="relative mx-auto flex flex-col px-4 sm:max-w-xl md:h-screen md:max-w-screen-xl md:flex-row">
//   <div class="mx-auto mt-10 w-full max-w-xl md:mt-36 lg:max-w-screen-xl">
//     <div class="mb-16 lg:mb-0 lg:max-w-lg">
//       <div class="mb-6 max-w-xl">
//         <div>
//           <p class="bg-teal-accent-400 mb-4 inline-block rounded-full px-3 py-px text-xs font-semibold uppercase tracking-wider text-indigo-900">INTRODUCING</p>
//         </div>
//         <h2 class="mb-6 max-w-lg font-sans text-3xl font-bold tracking-tight text-slate-700 sm:text-5xl sm:leading-snug">
//           An inspiring <br />
//           new future for
//           <span class="inline-block text-indigo-600">Web 3.0</span>
//         </h2>
//         <p class="text-base text-gray-700 md:text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas ullam rem voluptatem, animi tempora expedita!Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, consequuntur quaerat! Optio.</p>
//       </div>
//       <div class="flex items-center">
//         <a href="/" class="mr-6 inline-flex h-12 items-center justify-center rounded bg-indigo-600 px-6 font-medium tracking-wide text-white shadow-md outline-none transition duration-200 hover:bg-indigo-400 focus:ring"> Get started </a>
//         <a href="/" aria-label="" class="inline-flex items-center font-semibold text-indigo-600 transition-colors duration-200 hover:text-indigo-400">Learn more</a>
//       </div>
//     </div>
//   </div>
//   <div class="xl:1/2 flex h-full w-full justify-end space-x-3 overflow-hidden px-2 lg:w-2/3">
//     <div class="flex flex-col space-y-3 md:w-72">
//       <div class="-mt-5 hidden h-40 flex-shrink-0 rounded-xl bg-indigo-50 md:block"></div>
//       <div class="relative rounded-xl bg-white p-4 shadow-md">
//         <p class="text-sm text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis aliquam vero illo fuga libero nihil quisquam, aspernatur sint.</p>
//         <div class="mt-4 flex items-center">
//           <a href="#" class="relative block">
//             <img alt="" src="/images/Bm8G0V9ytRbCalT-KOSMT.png" class="mx-auto h-10 w-10 rounded-full object-cover" />
//           </a>
//           <div class="ml-2 flex flex-col justify-between">
//             <span class="text-sm font-semibold text-indigo-500"> Simon Lewis </span>
//             <span class="flex items-center text-xs text-gray-500"> Head of marketing at Resnet </span>
//           </div>
//         </div>
//       </div>
//       <div class="relative rounded-xl bg-indigo-600 p-4 shadow-md">
//         <div class="absolute -left-1 top-0 -z-10 h-5 w-5 skew-x-[28deg] bg-indigo-600"></div>
//         <p class="text-sm text-white">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam ratione atque officia.Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis aliquam vero illo fuga libero nihil quisquam, aspernatur sint.</p>
//         <div class="mt-4 flex items-center">
//           <a href="#" class="relative block">
//             <img alt="" src="/images/y9s3xOJV6rnQPKIrdPYJy.png" class="mx-auto h-10 w-10 rounded-full object-cover" />
//           </a>
//           <div class="ml-2 flex flex-col justify-between">
//             <span class="text-sm font-semibold text-white"> Simon Lewis </span>
//             <span class="flex items-center text-xs text-white"> Head of marketing at Resnet </span>
//           </div>
//         </div>
//       </div>
//       <div class="relative rounded-xl bg-white p-4 shadow-md">
//         <p class="text-sm text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis aliquam vero illo fuga libero nihil quisquam, aspernatur sint.</p>
//         <div class="mt-4 flex items-center">
//           <a href="#" class="relative block">
//             <img alt="" src="/images/x4vs_ucCRWYTU_yLQ6h26.png" class="mx-auto h-10 w-10 rounded-full object-cover" />
//           </a>
//           <div class="ml-2 flex flex-col justify-between">
//             <span class="text-sm font-semibold text-indigo-500"> Simon Lewis </span>
//             <span class="flex items-center text-xs text-gray-500"> Head of marketing at Resnet </span>
//           </div>
//         </div>
//       </div>
//       <div class="-mt-10 hidden h-40 flex-shrink-0 rounded-xl bg-indigo-50 md:block"></div>
//     </div>
//     <div class="hidden w-72 flex-col space-y-3 lg:flex">
//       <div class="-mt-10 hidden h-40 flex-shrink-0 rounded-xl bg-indigo-50 md:block"></div>
//       <div class="relative rounded-xl bg-white p-4 shadow-md">
//         <p class="text-sm text-gray-600">Elit. Facilis aliquam vero illo fuga libero nihil quisquam, aspernatur sint.</p>
//         <div class="mt-4 flex items-center">
//           <a href="#" class="relative block">
//             <img alt="" src="/images/oPf2b7fqx5xa3mo68dYHo.png" class="mx-auto h-10 w-10 rounded-full object-cover" />
//           </a>
//           <div class="ml-2 flex flex-col justify-between">
//             <span class="text-sm font-semibold text-indigo-500"> Simon Lewis </span>
//             <span class="flex items-center text-xs text-gray-500"> Head of marketing at Resnet </span>
//           </div>
//         </div>
//       </div>
//       <div class="relative rounded-xl bg-white p-4 shadow-md">
//         <p class="text-sm text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis aliquam vero illo fuga libero nihil quisquam, aspernatur sint.</p>
//         <div class="mt-4 flex items-center">
//           <a href="#" class="relative block">
//             <img alt="" src="/images/-ytzjgg6lxK1ICPcNfXho.png" class="mx-auto h-10 w-10 rounded-full object-cover" />
//           </a>
//           <div class="ml-2 flex flex-col justify-between">
//             <span class="text-sm font-semibold text-indigo-500"> Simon Lewis </span>
//             <span class="flex items-center text-xs text-gray-500"> Head of marketing at Resnet </span>
//           </div>
//         </div>
//       </div>
//       <div class="relative rounded-xl bg-white p-4 shadow-md">
//         <p class="text-sm text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, pariatur. elit. Facilis aliquam vero illo fuga libero nihil quisquam, aspernatur sint.</p>
//         <div class="mt-4 flex items-center">
//           <a href="#" class="relative block">
//             <img alt="" src="/images/Bm8G0V9ytRbCalT-KOSMT.png" class="mx-auto h-10 w-10 rounded-full object-cover" />
//           </a>
//           <div class="ml-2 flex flex-col justify-between">
//             <span class="text-sm font-semibold text-indigo-500"> Simon Lewis </span>
//             <span class="flex items-center text-xs text-gray-500"> Head of marketing at Resnet </span>
//           </div>
//         </div>
//       </div>
//       <div class="-mt-10 hidden h-40 flex-shrink-0 rounded-xl bg-indigo-50 md:block"></div>
//     </div>
//   </div>
// </div>









    // <div>
    //     <div class="font-[sans-serif] max-w-6xl max-md:max-w-md mx-auto pt-12 pb-12">
    //         <div class="grid md:grid-cols-2 items-center md:gap-10 gap-6">
    //             <div class="max-md:order-1 max-md:text-center">
    //             <p class="mt-4 text-sm font-bold text-blue-600"><span class="rotate-90 inline-block mr-2 mb-2">|</span> ALL IN ONE MEETING SCHEDULER</p>
    //             <h2 class="text-gray-800 md:text-5xl text-3xl font-extrabold mb-4 md:!leading-[55px]">Schedule meetings effortlessly</h2>
    //             <p class="mt-5 text-base text-gray-500 leading-relaxed">Embark on a gastronomic journey with our curated dishes, delivered promptly to your doorstep. Elevate your dining experience today.</p>
    //             <div class="mt-10 flex px-4 py-4 rounded-lg bg-gray-100 overflow-hidden">
    //                 <input type='email' placeholder='Search Something...' class="w-full outline-none bg-transparent text-sm" />
    //                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="20px" class="cursor-pointer fill-gray-400">
    //                 <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
    //                 </svg>
    //             </div>
    //             </div>
    //             <div class="md:h-[400px] p-2">
    //             <img src="https://readymadeui.com/management-img.webp" class="w-full h-full object-contain rounded-lg" alt="Dining Experience" />
    //             </div>
    //         </div>
    //         <div class="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
    //             <img src="https://readymadeui.com/google-logo.svg" class="w-28 mx-auto" alt="google-logo" />
    //             <img src="https://readymadeui.com/facebook-logo.svg" class="w-28 mx-auto" alt="facebook-logo" />
    //             <img src="https://readymadeui.com/linkedin-logo.svg" class="w-28 mx-auto" alt="linkedin-logo" />
    //             <img src="https://readymadeui.com/pinterest-logo.svg" class="w-28 mx-auto" alt="pinterest-logo" />
    //         </div>
    //     </div>
    // </div>