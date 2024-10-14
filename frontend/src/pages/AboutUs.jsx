import Footer from "../components/Footer";
import NavBar from "../components/Navbar";
import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';

function AboutUs() {
    const Section = () => {
        return (
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, amount: 0.2 }}
                className="my-10 p-10 bg-gray-100 rounded-lg shadow-md"
            >
            <h2>This is a section</h2>
            <p>This content will animate as you scroll.</p>
            </motion.div>
        );
    };
    return ( 
        <>
            <NavBar />
            <div class="bg-white py-12 mt-20">
                <div class="mx-auto max-w-7xl px-6 lg:px-8">
                    <div class="mx-auto max-w-5xl lg:text-center flex flex-col justify-center items-center">
                    <h2 class="text-base font-semibold leading-7 text-blue-100 bg-blue-600 px-3 rounded-lg uppercase mb-4 lg:mb-8">
                        Why choose us?</h2>
                    <h1 class="lg:text-7xl text-4xl md:text-5xl font-bold tracking-tight text-gray-900 text-center">Enhanced
                        <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900">Insurance Solutions</span>
                    </h1>
                    <p class="mt-6 text-md text-gray-600 max-w-lg text-center">Discover the exceptional features of our insurance
                        services designed to streamline processes and provide comprehensive coverage for your needs.</p>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        className=""
                    >
                    <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-12 lg:max-w-4xl">
                    <dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                        <div class="relative pl-16">
                        <dt class="text-base font-semibold leading-7 text-gray-900">
                            <div class="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-700"><svg
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" aria-hidden="true" class="h-6 w-6 text-white">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"></path>
                            </svg></div>Customized Coverage Plans
                        </dt>
                        <dd class="mt-2 text-base leading-7 text-gray-600">Tailor your insurance coverage to match your unique needs.
                            Our customizable plans ensure you only pay for the coverage that matters most to you.</dd>
                        </div>
                        <div class="relative pl-16">
                        <dt class="text-base font-semibold leading-7 text-gray-900">
                            <div class="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-700"><svg
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" aria-hidden="true" class="h-6 w-6 text-white">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5"></path>
                            </svg></div>Risk Assessment Expertise
                        </dt>
                        <dd class="mt-2 text-base leading-7 text-gray-600">Benefit from our cutting-edge risk assessment model,
                            providing accurate insights into potential risks and ensuring your coverage aligns with your risk profile.
                        </dd>
                        </div>
                        <div class="relative pl-16">
                        <dt class="text-base font-semibold leading-7 text-gray-900">
                            <div class="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-700"><svg
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" aria-hidden="true" class="h-6 w-6 text-white">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z">
                                </path>
                            </svg></div>Cost-Efficient Premiums
                        </dt>
                        <dd class="mt-2 text-base leading-7 text-gray-600">Experience cost-effective insurance solutions. We keep our
                            premiums competitive, ensuring you receive optimal coverage without breaking the bank.</dd>
                        </div>
                        <div class="relative pl-16">
                        <dt class="text-base font-semibold leading-7 text-gray-900">
                            <div class="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-700"><svg
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" aria-hidden="true" class="h-6 w-6 text-white">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z">
                                </path>
                            </svg></div>24/7 Customer Support
                        </dt>
                        <dd class="mt-2 text-base leading-7 text-gray-600">Our dedicated support team is available around the clock to
                            assist you. Whether it's day or night, we're here to address your insurance-related queries promptly.</dd>
                        </div>
                    </dl>
                    </div>
                    </motion.div>
                </div>
            </div>
            {/* ===============================================================>> */}
            <motion.div
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0 }}
                viewport={{ once: true, amount: 0.2 }}
                className=""
            >
            <section class="relative overflow-hidden bg-gray-100">
                <div class="mt-2 md:mt-0 py-12 pb-6 sm:py-16 lg:pb-24 overflow-hidden">
                    <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 relative">
                        <div class="relative mt-12 lg:mt-20">
                            <div class="absolute inset-x-0 hidden xl:px-44 top-2 md:block md:px-20 lg:px-28">
                                <svg class="w-full" xmlns="http://www.w3.org/2000/svg" width="875" height="48" viewBox="0 0 875 48"
                                    fill="none">
                                    <path
                                        d="M2 29C20.2154 33.6961 38.9915 35.1324 57.6111 37.5555C80.2065 40.496 102.791 43.3231 125.556 44.5555C163.184 46.5927 201.26 45 238.944 45C312.75 45 385.368 30.7371 458.278 20.6666C495.231 15.5627 532.399 11.6429 569.278 6.11109C589.515 3.07551 609.767 2.09927 630.222 1.99998C655.606 1.87676 681.208 1.11809 706.556 2.44442C739.552 4.17096 772.539 6.75565 805.222 11.5C828 14.8064 850.34 20.2233 873 24"
                                        stroke="#D4D4D8" stroke-width="3" stroke-linecap="round" stroke-dasharray="1 12" />
                                </svg>
                            </div>
                            <div
                                class="relative grid grid-cols-1 text-center gap-y-8 sm:gap-y-10 md:gap-y-12 md:grid-cols-3 gap-x-12">
                                <div>
                                    <div
                                        class="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                                        <span class="text-xl font-semibold text-gray-700">1</span>
                                    </div>
                                    <h3
                                        class="mt-4 sm:mt-6 text-xl font-semibold leading-tight text-gray-900 md:mt-10">
                                        Register
                                    </h3>
                                    <p class="mt-3 sm:mt-4 text-base text-gray-600">
                                        Register with your email or using sign up with goolgle
                                    </p>
                                </div>
                                <div>
                                    <div
                                        class="flex items-center justify-center w-16 h-16 mx-auto bg-white border-gray-200 rounded-full shadow">
                                        <span class="text-xl font-semibold text-gray-700">2</span>
                                    </div>
                                    <h3
                                        class="mt-4 sm:mt-6 text-xl font-semibold leading-tight text-gray-900 md:mt-10">
                                        Create your image
                                    </h3>
                                    <p class="mt-3 sm:mt-4 text-base text-gray-600">
                                        Choose AI assistants to create your image variations.
                                    </p>
                                </div>
                                <div>
                                    <div
                                        class="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                                        <span class="text-xl font-semibold text-gray-700">3</span>
                                    </div>
                                    <h3
                                        class="mt-4 sm:mt-6 text-xl font-semibold leading-tight text-gray-900 md:mt-10">
                                        Download
                                    </h3>
                                    <p class="mt-3 sm:mt-4 text-base text-gray-600">
                                        Download zip of all variations
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            </motion.div>
            {/* ===============================================================>> */}
            <motion.div
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0 }}
                viewport={{ once: true, amount: 0.2 }}
                className=""
            >
            <div class="bg-white mb-24 mt-12">
                <div class="max-w-xl mx-auto p-8">
                    <div class="flow-root">
                    <ul class="-mb-8">
                        <li>
                        <div class="relative pb-8">
                            <span class="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                            <div class="relative flex items-start space-x-3">
                            <div>
                                <div class="relative px-1">
                                <div class="h-8 w-8 bg-blue-500 rounded-full ring-8 ring-white flex items-center justify-center">
                                    <svg class="text-white h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                </div>
                                </div>
                            </div>
                            <div class="min-w-0 flex-1 py-0">
                                <div class="text-md text-gray-500">
                                <div>
                                    <a href="#" class="font-medium text-gray-900 mr-2">v3.2.0</a>
                                    <a href="#"
                                    class="my-0.5 relative inline-flex items-center bg-white rounded-full border border-gray-300 px-3 py-0.5 text-sm">
                                    <div class="absolute flex-shrink-0 flex items-center justify-center">
                                        <span class="h-1.5 w-1.5 rounded-full bg-green-500" aria-hidden="true"></span>
                                    </div>
                                    <div class="ml-3.5 font-medium text-gray-900">Feature</div>
                                    </a>
                                </div>
                                <span class="whitespace-nowrap text-sm">10h ago</span>
                                </div>
                                <div class="mt-2 text-gray-700">
                                <p>
                                    - Added a user profile page for personalized settings.
                                    <br/>
                                    - Implemented a dark mode for improved user experience at night.
                                    <br/>
                                    - Introduced real-time notifications for instant updates.
                                </p>
                                </div>
                            </div>
                            </div>
                        </div>
                        </li>
                        <li>
                        <div class="relative pb-8">
                            <span class="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                            <div class="relative flex items-start space-x-3">
                            <div>
                                <div class="relative px-1">
                                <div class="h-8 w-8 bg-blue-500 rounded-full ring-8 ring-white flex items-center justify-center">
                                    <svg class="text-white h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                </div>
                                </div>
                            </div>
                            <div class="min-w-0 flex-1 py-0">
                                <div class="text-md text-gray-500">
                                <div>
                                    <a href="#" class="font-medium text-gray-900 mr-2">v3.1.0</a>
                                    <a href="#"
                                    class="my-0.5 relative inline-flex items-center bg-white rounded-full border border-gray-300 px-3 py-0.5 text-sm">
                                    <div class="absolute flex-shrink-0 flex items-center justify-center">
                                        <span class="h-1.5 w-1.5 rounded-full bg-green-500" aria-hidden="true"></span>
                                    </div>
                                    <div class="ml-3.5 font-medium text-gray-900">Feature</div>
                                    </a>
                                </div>
                                <span class="whitespace-nowrap text-sm">9h ago</span>
                                </div>
                                <div class="mt-2 text-gray-700">
                                <p>
                                    - Improved performance by optimizing database queries.
                                    <br/>
                                    - Enhanced security measures to protect user data.
                                    <br/>
                                    - Streamlined the user interface for a more intuitive experience.
                                </p>
                                </div>
                            </div>
                            </div>
                        </div>
                        </li>
                        <li>
                        <div class="relative pb-8">
                            <span class="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                            <div class="relative flex items-start space-x-3">
                            <div>
                                <div class="relative px-1">
                                <div class="h-8 w-8 bg-blue-500 rounded-full ring-8 ring-white flex items-center justify-center">
                                    <svg class="text-white h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                </div>
                                </div>
                            </div>
                            <div class="min-w-0 flex-1 py-0">
                                <div class="text-md text-gray-500">
                                <div>
                                    <a href="#" class="font-medium text-gray-900 mr-2">v3.0.10</a>
                                    <a href="#"
                                    class="my-0.5 relative inline-flex items-center bg-white rounded-full border border-gray-300 px-3 py-0.5 text-sm">
                                    <div class="absolute flex-shrink-0 flex items-center justify-center">
                                        <span class="h-1.5 w-1.5 rounded-full bg-red-500" aria-hidden="true"></span>
                                    </div>
                                    <div class="ml-3.5 font-medium text-gray-900">Bug</div>
                                    </a>
                                </div>
                                <span class="whitespace-nowrap text-sm">6h ago</span>
                                </div>
                                <div class="mt-2 text-gray-700">
                                <p>
                                    - Resolved a critical issue causing crashes on certain devices.
                                    <br/>
                                    - Fixed a login error that prevented some users from accessing their accounts.
                                    <br/>
                                    - Addressed a display glitch causing text overflow in long messages.
                                </p>
                                </div>
                            </div>
                            </div>
                        </div>
                        </li>
                    </ul>
                    </div>
                </div>
            </div>
            </motion.div>
            <Footer />
        </>
     );
}

export default AboutUs;