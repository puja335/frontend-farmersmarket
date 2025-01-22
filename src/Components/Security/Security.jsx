import { Lock, Payment, Security, Shield } from "@mui/icons-material"
import { Container, Fade } from "@mui/material"
import React from "react"

const SecurityPage = () => {
  // Scrolling Bug Fixed
  window.scroll({ top: 0 })

  const securityFeatures = [
    {
      icon: <Lock className='text-green-600 text-4xl' />,
      title: "Secure Transactions",
      description:
        "All payments are processed through encrypted channels using industry-standard SSL technology.",
    },
    {
      icon: <Shield className='text-green-600 text-4xl' />,
      title: "Data Protection",
      description:
        "Your personal information is protected with advanced encryption and secure storage protocols.",
    },
    {
      icon: <Payment className='text-green-600 text-4xl' />,
      title: "Safe Payments",
      description:
        "Multiple secure payment options including credit cards, digital wallets, and cash on delivery.",
    },
    {
      icon: <Security className='text-green-600 text-4xl' />,
      title: "Verified Vendors",
      description:
        "All our suppliers undergo strict verification processes to ensure reliability and quality.",
    },
  ]

  return (
    <div className='min-h-screen pt-20 pb-10'>
      <Fade in={true}>
        <Container>
          {/* Header Section */}
          <div className='text-center mb-12'>
            <h1 className='text-3xl md:text-4xl font-bold text-gray-800 mb-4'>
              Your Security is Our Priority
            </h1>
            <p className='text-gray-600 text-lg max-w-2xl mx-auto'>
              We implement multiple layers of security to protect your data and
              ensure safe transactions.
            </p>
          </div>

          {/* Security Features */}
          <div className='grid md:grid-cols-2 gap-8 mb-12'>
            {securityFeatures.map((feature, index) => (
              <div
                key={index}
                className='bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300'
              >
                <div className='flex items-start space-x-4'>
                  <div className='p-2 bg-green-50 rounded-lg'>
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className='text-xl font-semibold mb-2 text-gray-800'>
                      {feature.title}
                    </h3>
                    <p className='text-gray-600'>{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Security Certifications */}
          <div className='bg-gray-50 rounded-xl p-8'>
            <h2 className='text-2xl font-semibold text-center mb-6'>
              Our Security Certifications
            </h2>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
              <CertificationBadge name='SSL Certified' />
              <CertificationBadge name='PCI DSS Compliant' />
              <CertificationBadge name='GDPR Compliant' />
              <CertificationBadge name='ISO 27001' />
            </div>
          </div>
        </Container>
      </Fade>
    </div>
  )
}

const CertificationBadge = ({ name }) => (
  <div className='flex items-center justify-center p-4 bg-white rounded-lg shadow'>
    <Shield className='text-green-600 mr-2' />
    <span className='font-medium text-gray-800'>{name}</span>
  </div>
)

export default SecurityPage
