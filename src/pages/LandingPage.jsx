import React, { useState, useEffect } from "react";
import { Dumbbell, Users, TrendingUp, Calendar, ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import Card from "../components/ui/Card.jsx";
import BMICalculator from "../components/BMICalculator.jsx";
import { COACHES, INITIAL_REVIEWS } from "../data/constants.js";

export default function LandingPage() {
    const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

    // Auto-slide effect for reviews
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentReviewIndex((prev) => (prev + 1) % INITIAL_REVIEWS.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const nextReview = () => {
        setCurrentReviewIndex((prev) => (prev + 1) % INITIAL_REVIEWS.length);
    };

    const prevReview = () => {
        setCurrentReviewIndex((prev) => (prev - 1 + INITIAL_REVIEWS.length) % INITIAL_REVIEWS.length);
    };

    return (
        <>
            {/* Cinematic 3D Hero Section - Dark Red Vibe */}
            <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 overflow-hidden bg-black">
                {/* Ken Burns Animated Background Image - Gym Vibe */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070')] bg-cover bg-center animate-ken-burns opacity-40"></div>
                </div>

                {/* Animated Grid Background */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <div className="absolute inset-0 bg-grid-pattern animate-grid-move"></div>
                </div>

                {/* Dark red animated gradient overlay - adjusted opacity */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-red-950/40 to-black/80 pointer-events-none"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-red-950/30 via-transparent to-red-900/20 animate-gradient-shift pointer-events-none"></div>

                {/* Floating particles effect */}
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-red-500 rounded-full animate-float-particle-1"></div>
                    <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-red-600 rounded-full animate-float-particle-2"></div>
                    <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-red-400 rounded-full animate-float-particle-3"></div>
                </div>

                {/* Main 3D Animated Content */}
                <div className="relative z-10 w-full max-w-7xl mx-auto text-center perspective-container">
                    {/* Gym Icon with Cinematic Animation */}
                    <div className="flex flex-col items-center justify-center mb-6 sm:mb-8 animate-cinematic-zoom">
                        <div className="relative mb-4 sm:mb-6">
                            {/* Red glow */}
                            <div className="absolute inset-0 bg-red-600/40 blur-3xl animate-pulse-glow"></div>
                            <Dumbbell
                                className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-red-500 relative animate-3d-rotate"
                            />
                        </div>

                        {/* Cinematic Animated Text - Smaller Size, No Shadows */}
                        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black uppercase italic mb-3 sm:mb-4 animate-cinematic-text">
                            <span className="text-white inline-block mx-1">Gym</span>
                            <span className="text-orange-500 inline-block mx-1">Trainer</span>
                        </h1>

                        {/* Tagline - Responsive */}
                        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-400 max-w-xs sm:max-w-md md:max-w-2xl mx-auto px-4 animate-fade-slide-up">
                            Transform Your Body, Transform Your Life
                        </p>
                    </div>

                    {/* Feature Cards - Responsive Grid - Smaller Size */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mt-8 sm:mt-12 px-4 max-w-3xl mx-auto animate-cards-appear">
                        <Card className="text-center py-4 px-3">
                            <Users className="w-8 h-8 text-orange-500 mx-auto mb-3" />
                            <h3 className="text-base font-bold mb-1">Expert Coaches</h3>
                            <p className="text-gray-400 text-xs">Professional trainers to guide you</p>
                        </Card>
                        <Card className="text-center py-4 px-3">
                            <TrendingUp className="w-8 h-8 text-orange-500 mx-auto mb-3" />
                            <h3 className="text-base font-bold mb-1">Track Progress</h3>
                            <p className="text-gray-400 text-xs">Monitor your fitness journey</p>
                        </Card>
                        <Card className="text-center py-4 px-3">
                            <Calendar className="w-8 h-8 text-orange-500 mx-auto mb-3" />
                            <h3 className="text-base font-bold mb-1">Custom Plans</h3>
                            <p className="text-gray-400 text-xs">Personalized workout schedules</p>
                        </Card>
                    </div>
                </div>
            </div>



            {/* Coaches Section */}
            <div className="max-w-6xl mx-auto px-4 py-20">
                <h2 className="text-4xl font-black text-center mb-12 uppercase italic">
                    Meet Our <span className="text-orange-500">Coaches</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {COACHES.map((coach) => (
                        <Card key={coach.id} className="text-center">
                            <img
                                src={coach.img}
                                alt={coach.name}
                                className="w-full h-48 object-cover rounded-xl mb-4"
                            />
                            <h3 className="text-xl font-bold">{coach.name}</h3>
                            <p className="text-orange-500">{coach.role}</p>
                        </Card>
                    ))}
                </div>
            </div>

            {/* BMI Calculator Section */}
            <BMICalculator />

            {/* Reviews Section - Auto Slider */}
            <div className="max-w-4xl mx-auto px-4 py-20">
                <h2 className="text-4xl font-black text-center mb-12 uppercase italic">
                    Member <span className="text-orange-500">Reviews</span>
                </h2>

                <div className="relative">
                    {/* Main Review Card */}
                    <div className="overflow-hidden">
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${currentReviewIndex * 100}%)` }}
                        >
                            {INITIAL_REVIEWS.map((review) => (
                                <div key={review.id} className="w-full flex-shrink-0 px-4">
                                    <div className="bg-neutral-900/50 border border-neutral-800 p-8 rounded-2xl relative">
                                        <Quote className="absolute top-4 right-4 w-8 h-8 text-orange-500/20" />
                                        <div className="flex flex-col items-center text-center">
                                            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mb-4 text-2xl font-bold">
                                                {review.name.charAt(0)}
                                            </div>
                                            <h4 className="text-xl font-bold mb-2">{review.name}</h4>
                                            <div className="flex gap-1 mb-4">
                                                {[...Array(review.rating)].map((_, i) => (
                                                    <Star key={i} className="w-4 h-4 fill-orange-500 text-orange-500" />
                                                ))}
                                            </div>
                                            <p className="text-gray-300 italic text-lg leading-relaxed">"{review.text}"</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Controls */}
                    <button
                        onClick={prevReview}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-12 p-2 bg-neutral-900 border border-neutral-800 rounded-full text-gray-400 hover:text-white hover:border-orange-500 transition-all z-10"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    <button
                        onClick={nextReview}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-12 p-2 bg-neutral-900 border border-neutral-800 rounded-full text-gray-400 hover:text-white hover:border-orange-500 transition-all z-10"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* Dots */}
                    <div className="flex justify-center gap-2 mt-8">
                        {INITIAL_REVIEWS.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentReviewIndex(idx)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${currentReviewIndex === idx
                                    ? "w-8 bg-orange-500"
                                    : "bg-neutral-700 hover:bg-neutral-600"
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
