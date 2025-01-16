import React, { useState } from 'react';
import { Container, Fade, TextField } from '@mui/material';
import { Search, QuestionAnswer, LiveHelp, Chat, Email, Phone } from '@mui/icons-material';

const SupportCenter = () => {
    // Scrolling Bug Fixed
    window.scroll({ top: 0 });

    const [searchQuery, setSearchQuery] = useState('');

    const faqCategories = [
        {
            title: "Orders & Delivery",
            questions: [
                {
                    q: "How can I track my order?",
                    a: "You can track your order in real-time through the 'My Orders' section in your account dashboard."
                },
                {
                    q: "What are your delivery hours?",
                    a: "We deliver from 8 AM to 10 PM daily. Same-day delivery is available for orders placed before 2 PM."
                }
            ]
        },
        {
            title: "Returns & Refunds",
            questions: [
                {
                    q: "What is your return policy?",
                    a: "We accept returns of unopened items within 24 hours of delivery. For fresh products, quality issues must be reported immediately."
                },
                {
                    q: "How long do refunds take?",
                    a: "Refunds are processed within 3-5 business days after the return is approved."
                }
            ]
        }
    ];

    const contactMethods = [
        {
            icon: <Chat className="text-green-600 text-3xl" />,
            title: "Live Chat",
            description: "Chat with our support team",
            availability: "24/7 Available"
        },
        {
            icon: <Email className="text-green-600 text-3xl" />,
            title: "Email Support",
            description: "Send us your queries",
            availability: "Response within 24 hours"
        },
        {
            icon: <Phone className="text-green-600 text-3xl" />,
            title: "Phone Support",
            description: "Call us directly",
            availability: "Mon-Sat: 9AM-6PM"
        }
    ];

    return (
        <div className="min-h-screen pt-20 pb-10 bg-gray-50">
            <Fade in={true}>
                <Container>
                    {/* Header Section */}
                    <div className="text-center mb-12">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                            How Can We Help You?
                        </h1>
                        <div className="max-w-2xl mx-auto">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search for help..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-green-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Contact Methods */}
                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                        {contactMethods.map((method, index) => (
                            <div 
                                key={index}
                                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
                            >
                                <div className="flex flex-col items-center text-center">
                                    <div className="p-3 bg-green-50 rounded-full mb-4">
                                        {method.icon}
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                        {method.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2">
                                        {method.description}
                                    </p>
                                    <span className="text-sm text-green-600 font-medium">
                                        {method.availability}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* FAQ Sections */}
                    <div className="bg-white rounded-xl p-6 shadow-md">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                            Frequently Asked Questions
                        </h2>
                        <div className="space-y-6">
                            {faqCategories.map((category, index) => (
                                <div key={index} className="space-y-4">
                                    <h3 className="text-xl font-semibold text-gray-800">
                                        {category.title}
                                    </h3>
                                    <div className="space-y-4">
                                        {category.questions.map((faq, faqIndex) => (
                                            <details 
                                                key={faqIndex}
                                                className="bg-gray-50 rounded-lg p-4"
                                            >
                                                <summary className="font-medium text-gray-800 cursor-pointer">
                                                    {faq.q}
                                                </summary>
                                                <p className="mt-2 text-gray-600">
                                                    {faq.a}
                                                </p>
                                            </details>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Still Need Help Section */}
                    <div className="mt-12 text-center">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            Still Need Help?
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Our support team is here to assist you
                        </p>
                        <button className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors duration-300">
                            Contact Support
                        </button>
                    </div>
                </Container>
            </Fade>
        </div>
    );
};

export default SupportCenter;