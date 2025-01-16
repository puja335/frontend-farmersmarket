import React from 'react';
import { Container, Fade, Rating } from '@mui/material';
import { FormatQuote } from '@mui/icons-material';

const Testimonials = () => {
    // Scrolling Bug Fixed
    window.scroll({ top: 0 });

    const testimonials = [
        {
            name: "Sarah Johnson",
            role: "Regular Customer",
            rating: 5,
            comment: "The quality of fresh produce is exceptional. I've been ordering weekly for 6 months and have never been disappointed. The delivery is always on time!",
            image: "/api/placeholder/64/64"
        },
        {
            name: "Michael Chen",
            role: "Food Enthusiast",
            rating: 5,
            comment: "Great selection of organic products and the prices are reasonable. The app is very user-friendly and the customer service is excellent.",
            image: "/api/placeholder/64/64"
        },
        {
            name: "Emily Rodriguez",
            role: "Busy Parent",
            rating: 4,
            comment: "This grocery service has made my life so much easier. The convenience of doorstep delivery and the quality of products is worth every penny.",
            image: "/api/placeholder/64/64"
        },
        {
            name: "David Smith",
            role: "Health Coach",
            rating: 5,
            comment: "I recommend this service to all my clients. The fresh produce and organic options are perfect for maintaining a healthy lifestyle.",
            image: "/api/placeholder/64/64"
        }
    ];

    return (
        <div className="min-h-screen pt-20 pb-10 bg-gray-50">
            <Fade in={true}>
                <Container>
                    {/* Header Section */}
                    <div className="text-center mb-12">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                            What Our Customers Say
                        </h1>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Don't just take our word for it - hear what our valued customers 
                            have to say about their shopping experience with us.
                        </p>
                    </div>

                    {/* Testimonials Grid */}
                    <div className="grid md:grid-cols-2 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div 
                                key={index} 
                                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className="flex items-start space-x-4">
                                    <img 
                                        src={testimonial.image} 
                                        alt={testimonial.name}
                                        className="w-16 h-16 rounded-full"
                                    />
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="font-semibold text-lg text-gray-800">
                                                    {testimonial.name}
                                                </h3>
                                                <p className="text-gray-600 text-sm">
                                                    {testimonial.role}
                                                </p>
                                            </div>
                                            <FormatQuote className="text-green-600 text-4xl" />
                                        </div>
                                        <Rating 
                                            value={testimonial.rating} 
                                            readOnly 
                                            size="small"
                                            className="my-2"
                                        />
                                        <p className="text-gray-700 mt-2">
                                            {testimonial.comment}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Call to Action */}
                    <div className="mt-12 text-center">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            Ready to Experience Our Service?
                        </h2>
                        <button className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors duration-300">
                            Start Shopping Now
                        </button>
                    </div>
                </Container>
            </Fade>
        </div>
    );
};

export default Testimonials;