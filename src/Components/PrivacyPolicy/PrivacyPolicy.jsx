import {
  Security,
  Storage,
  VerifiedUser,
  Visibility,
} from "@mui/icons-material"
import { Container, Fade } from "@mui/material"
import React from "react"

const PrivacyPolicy = () => {
  // Scrolling Bug Fixed
  window.scroll({ top: 0 })

  const sections = [
    {
      icon: <Storage className='text-green-600 text-3xl' />,
      title: "Information We Collect",
      content: `We collect information that you provide directly to us, including:
            • Name, email address, phone number, and delivery address
            • Payment information (processed securely through our payment partners)
            • Order history and preferences
            • Communication preferences and feedback
            
            We also automatically collect certain information about your device when you use our services, including:
            • IP address and device identifiers
            • Browser type and operating system
            • Usage patterns and shopping behavior`,
    },
    {
      icon: <Visibility className='text-green-600 text-3xl' />,
      title: "How We Use Your Information",
      content: `We use the collected information to:
            • Process and deliver your orders
            • Send order confirmations and updates
            • Improve our products and services
            • Personalize your shopping experience
            • Communicate about promotions and updates
            • Protect against fraudulent transactions
            • Comply with legal obligations`,
    },
    {
      icon: <Security className='text-green-600 text-3xl' />,
      title: "Information Security",
      content: `We implement appropriate technical and organizational measures to protect your personal information, including:
            • Encryption of sensitive data
            • Regular security assessments
            • Secure data storage systems
            • Employee training on data protection
            • Access controls and authentication
            • Regular security updates and monitoring`,
    },
    {
      icon: <VerifiedUser className='text-green-600 text-3xl' />,
      title: "Your Rights",
      content: `You have the right to:
            • Access your personal information
            • Correct inaccurate information
            • Request deletion of your information
            • Opt-out of marketing communications
            • Export your data
            • Lodge a complaint with supervisory authorities
            
            Contact our privacy team to exercise these rights.`,
    },
  ]

  const lastUpdated = "January 15, 2024"

  return (
    <div className='min-h-screen pt-20 pb-10 bg-gray-50'>
      <Fade in={true}>
        <Container>
          {/* Header Section */}
          <div className='bg-white rounded-xl p-8 shadow-md mb-8'>
            <h1 className='text-3xl md:text-4xl font-bold text-gray-800 mb-4'>
              Privacy Policy
            </h1>
            <p className='text-gray-600'>Last Updated: {lastUpdated}</p>
            <p className='text-gray-600 mt-4'>
              Your privacy is important to us. This policy explains how we
              collect, use, and protect your personal information when you use
              our grocery delivery service.
            </p>
          </div>

          {/* Main Content Sections */}
          <div className='space-y-6'>
            {sections.map((section, index) => (
              <div key={index} className='bg-white rounded-xl p-8 shadow-md'>
                <div className='flex items-start space-x-4'>
                  <div className='p-3 bg-green-50 rounded-lg'>
                    {section.icon}
                  </div>
                  <div>
                    <h2 className='text-xl font-semibold text-gray-800 mb-4'>
                      {section.title}
                    </h2>
                    <div className='text-gray-600 whitespace-pre-line'>
                      {section.content}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className='bg-white rounded-xl p-8 shadow-md mt-8'>
            <h2 className='text-xl font-semibold text-gray-800 mb-4'>
              Contact Us
            </h2>
            <p className='text-gray-600'>
              If you have any questions about this Privacy Policy, please
              contact us at:
            </p>
            <div className='mt-4'>
              <p className='text-gray-600'>Email: privacy@farmersmarket.com</p>
              <p className='text-gray-600'>Phone: +977 98XXXXXXXX</p>
              <p className='text-gray-600'>Address: kathmandu Nepal</p>
            </div>
          </div>
        </Container>
      </Fade>
    </div>
  )
}

export default PrivacyPolicy
