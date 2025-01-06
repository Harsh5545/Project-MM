
import React from "react";

const PrivacyPolicyPage = () => {
    return (
        <div className="flex justify-center items-center  my-24 bg-gray-100 dark:bg-gray-900">
            <div className="w-full max-w-6xl p-6 md:p-12    bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-gray-100 mb-10">
                    Privacy Policy
                </h1>

                <section className="space-y-12 text-gray-700 dark:text-gray-300">
                    <div>
                        <p className="leading-relaxed">
                            Modern Mannerism, Personality Enhancement, Etiquette & Grooming Consultancy ("we," "our," or "us") is located in Mumbai, Maharashtra, India. We operate finishing school programs, social etiquette, international business etiquette, youth etiquette, personality development, and soft skills training in India.
                        </p>
                        <p className="leading-relaxed mt-4">
                            At Modern Mannerism, we recognize the importance of your privacy. If you have questions about this privacy policy, please contact us via email at modernmannerism@gmail.com or write to us at:
                        </p>
                        <address className="leading-relaxed mt-4 text-gray-600 dark:text-gray-400">
                            Modern Mannerism <br />
                            Raunak Heights, Kasarwadavali, <br />
                            Near Unnathi Greens, Ghodbunder Road, <br />
                            Thane West- 400615
                        </address>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                            What We Collect
                        </h2>
                        <p className="leading-relaxed">
                            We collect personal data that you provide when registering for or participating in our programs, inquiring about our services, or connecting with us on social media.
                        </p>
                        <ul className="list-disc ml-6 mt-4 space-y-2">
                            <li>name, title, and position</li>
                            <li>contact information, including home address, email, and telephone number</li>
                            <li>date of birth, nationality</li>
                            <li>profession or education</li>
                            <li>payment and bank details</li>
                            <li>dietary restrictions or preferences</li>
                            <li>relevant medical information</li>
                            <li>other information you provide, such as interests, reasons for attending, or photographs</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                            What We Do with the Information
                        </h2>
                        <p className="leading-relaxed">
                            We use your personal data to understand your needs and provide better service, including:
                        </p>
                        <ul className="list-disc ml-6 mt-4 space-y-2">
                            <li>internal record-keeping</li>
                            <li>improving our products and services</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                            Marketing
                        </h2>
                        <p className="leading-relaxed">
                            Periodically we may send newsletters, promotional emails about new services, special offers, events or other information which we think you may find of interest using the email address which you have provided.
                            From time to time, also we may use your information to contact you for market research purposes. We may contact you by email or telephone. We may use the information to customise the website according to your interests.
                            We will ask whether you would like to receive marketing information from us in the first contact i.e., when registering for a course or signing up for our newsletter. If you do opt in to receive such marketing from us, you can opt out at any time.
                   </p> </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                            Control of Your Personal Information
                        </h2>
                        <p className="leading-relaxed">
                            We will not sell, distribute or lease your personal information to third parties. We may use your personal information to send you promotional information about third parties which we think you may find of interest.
                            We do not allow our third-party service providers to use your personal data for their own purposes and only permit them to process your personal data for specified purposes and in accordance with our instructions.
                            If you believe that any personal information, we are holding on you is incorrect or incomplete, please write to or email us as soon as possible at one of the above addresses. We will promptly correct any information found to be incorrect.

                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                            Security
                        </h2>
                        <p className="leading-relaxed">
                            We are committed to ensuring that your information is secure. In order to prevent unauthorised access or disclosure, and to prevent your personal data from being accidentally lost, we have put in place suitable physical, electronic and managerial procedures to safeguard and secure the information we collect online, by post, or in person, i.e. All personal data is stored on secure servers and methods of collecting, storing and processing personal data are regularly evaluated and reviewed.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;