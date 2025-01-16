import React from 'react';
import { Container, Fade } from '@mui/material';
import { Gavel, Assignment, Payment, LocalShipping } from '@mui/icons-material';

const TermsAndConditions = () => {
    // Scrolling Bug Fixed
    window.scroll({ top: 0 });

    const sections = [
        {
            icon: <Assignment className="text-green-600 text-3xl" />,
            title: "Account Terms",
            content: `By creating an account, you agree to:
            • Provide accurate and complete information
            • Maintain the security of your account credentials
            • Accept responsibility for all activities under your account
            • Notify us immediately of any unauthorized access
            
            We reserve the right to suspend or terminate accounts that violate these terms.`
        },
        {
            icon: <LocalShipping className="text-green-600 text-3xl" />,
            title: "Order & Delivery Terms",
            content: `When placing orders:
            • All orders are subject to product availability
            • Delivery times are estimates and may vary
            • We reserve the right to refuse service to any address
            • Minimum order values may apply for delivery
            • You must be present to receive temperature-sensitive items
            
            Claims for damaged or missing items must be reported within 24 hours of delivery.`
        },
        {
            icon: <Payment className="text-green-600 text-3xl" />,
            title: "Pricing & Payment",
            content: `Payment terms:
            • All prices are in local currency and include applicable taxes
            • We accept major credit cards and digital payment methods
            • Prices may change without notice
            • Promotional codes cannot be combined
            • Refunds will be issued to the original payment method
            
            You agree to pay all charges at the prices listed for your purchases.`
        },
        {
            icon: <Gavel className="text-green-600 text-3xl" />,
            title: "Legal Disclaimers",
            content: `Important legal information:
            • We make no warranties about product availability
            • We reserve the right to modify these terms at any time
            • Your use of our service constitutes acceptance of these terms
            • We are not liable for indirect or consequential damages
            • Any disputes will be resolved in accordance with local laws
            
            These terms are governed by and constructed in accordance with the laws of [Your Jurisdiction].`
        }
    ];

    const lastUpdated = "January 15, 2024";

    return (
        <div className="min-h-screen pt-20 pb-10 bg-gray-50">
            <Fade in={true}>
                <Container>
                    {/* Header Section */}
                    <div className="bg-white rounded-xl p-8 shadow-md mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                            Terms and Conditions
                        </h1>
                        <p className="text-gray-600">
                            Last Updated: {lastUpdated}
                        </p>
                        <p className="text-gray-600 mt-4">
                            Please read these terms and conditions carefully before using our grocery delivery service. 
                            By using our service, you agree to be bound by these terms.
                        </p>
                    </div>

                    {/* Main Content Sections */}
                    <div className="space-y-6">
                        {sections.map((section, index) => (
                            <div 
                                key={index}
                                className="bg-white rounded-xl p-8 shadow-md"
                            >
                                <div className="flex items-start space-x-4">
                                    <div className="p-3 bg-green-50 rounded-lg">
                                        {section.icon}
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                            {section.title}
                                        </h2>
                                        <div className="text-gray-600 whitespace-pre-line">
                                            {section.content}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Agreement Section */}
                    <div className="bg-white rounded-xl p-8 shadow-md mt-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            Agreement to Terms
                        </h2>
                        <p className="text-gray-600">
                            By accessing or using our service, you acknowledge that you have read, 
                            understood, and agree to be bound by these terms and conditions. If you 
                            do not agree with any part of these terms, you must not use our service.
                        </p>
                        <div className="mt-6">
                            <h3 className="font-semibold text-gray-800 mb-2">Contact Information</h3>
                            <p className="text-gray-600">For questions about these terms, contact us at:</p>
                            <p className="text-gray-600">Email: legal@farmersmarket.com</p>
                            <p className="text-gray-600">Phone: +977 98XXXXXXXX</p>
                        </div>
                    </div>
                </Container>
            </Fade>
        </div>
    );
};

export default TermsAndConditions;