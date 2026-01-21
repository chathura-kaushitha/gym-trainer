import React, { useState } from "react";
import { Star, MessageSquare, Send, Quote, ThumbsUp, User } from "lucide-react";
import Card from "../ui/Card.jsx";
import Button from "../ui/Button.jsx";

const INITIAL_REVIEWS = [
    { id: 1, name: "Sarah K.", rating: 5, text: "Best gym app ever! The coaching is top notch and the progress tracking keeps me motivated daily.", date: "2023-11-15", category: "Training" },
    { id: 2, name: "Mike T.", rating: 4, text: "Great UI, love the dark mode. The meal plans are surprisingly easy to follow.", date: "2023-11-20", category: "App Design" },
    { id: 3, name: "Jessica R.", rating: 5, text: "Lost 10kg in 3 months. This app changed my life!", date: "2023-12-05", category: "Results" },
];

export default function ReviewsTab() {
    const [reviews, setReviews] = useState(INITIAL_REVIEWS);
    const [newReview, setNewReview] = useState({ rating: 5, text: "" });
    const [hoveredStar, setHoveredStar] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newReview.text.trim()) return;

        const review = {
            id: Date.now(),
            name: "You",
            rating: newReview.rating,
            text: newReview.text,
            date: new Date().toISOString().split("T")[0],
            category: "General"
        };

        setReviews([review, ...reviews]);
        setNewReview({ rating: 5, text: "" });
    };

    return (
        <div className="max-w-6xl mx-auto space-y-12 pb-12">
            {/* Header Section */}
            <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-2xl border border-red-500/30 mb-2">
                    <MessageSquare className="w-8 h-8 text-orange-500" />
                </div>
                <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter">
                    Client <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Success Stories</span>
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                    Real results from real people. Join our community and start your journey today.
                </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Add Review Form */}
                <div className="lg:col-span-1">
                    <div className="sticky top-8">
                        <Card className="border-red-500/20 bg-gradient-to-b from-neutral-900/50 to-black overflow-hidden relative">
                            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-red-500 to-orange-600" />
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <Send className="w-5 h-5 text-red-500" />
                                    Share Your Experience
                                </h3>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label className="text-sm text-gray-400 mb-2 block font-medium uppercase tracking-wider">Your Rating</label>
                                        <div className="flex items-center gap-2 bg-black/40 p-3 rounded-xl border border-neutral-800">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    type="button"
                                                    onMouseEnter={() => setHoveredStar(star)}
                                                    onMouseLeave={() => setHoveredStar(0)}
                                                    onClick={() => setNewReview({ ...newReview, rating: star })}
                                                    className="focus:outline-none transition-all duration-200 transform hover:scale-125"
                                                >
                                                    <Star
                                                        className={`w-7 h-7 ${star <= (hoveredStar || newReview.rating)
                                                            ? "fill-orange-500 text-orange-500 drop-shadow-[0_0_8px_rgba(249,115,22,0.5)]"
                                                            : "text-neutral-700"
                                                            }`}
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-400 mb-2 block font-medium uppercase tracking-wider">Your Review</label>
                                        <textarea
                                            className="w-full bg-black/40 border border-neutral-800 rounded-xl px-4 py-4 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all resize-none h-32 placeholder:text-neutral-600"
                                            placeholder="Tell us about your progress..."
                                            value={newReview.text}
                                            onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <Button 
                                        type="submit" 
                                        disabled={!newReview.text.trim()}
                                        className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400 py-6 text-lg shadow-xl shadow-red-900/20 transition-all active:scale-95 group"
                                    >
                                        <span>Post Review</span>
                                        <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </form>
                            </div>
                        </Card>
                    </div>
                </div>

                {/* Review List */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        {reviews.map((review) => (
                            <Card key={review.id} className="group relative border-neutral-800 hover:border-red-500/50 transition-all duration-500 bg-neutral-900/30 overflow-hidden">
                                <Quote className="absolute -top-4 -right-4 w-24 h-24 text-red-500/5 group-hover:text-red-500/10 transition-colors pointer-events-none rotate-12" />
                                <div className="p-6 space-y-4">
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl flex items-center justify-center font-black text-white shadow-lg rotate-3 group-hover:rotate-0 transition-transform">
                                                {(review.name || "A").charAt(0)}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-lg group-hover:text-orange-500 transition-colors">{review.name || "Anonymous"}</h4>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[10px] bg-red-500/10 text-red-500 px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter">
                                                        {review.category || "General"}
                                                    </span>
                                                    <span className="text-[10px] text-neutral-500">{review.date || "Recently"}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-0.5 bg-black/40 p-1.5 rounded-lg border border-neutral-800">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`w-3.5 h-3.5 ${i < review.rating ? "fill-orange-500 text-orange-500" : "text-neutral-800"
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    
                                    <p className="text-neutral-300 leading-relaxed italic relative z-10">
                                        "{review.text}"
                                    </p>

                                    <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
                                        <button className="flex items-center gap-2 text-xs font-bold text-neutral-500 hover:text-red-500 transition-colors">
                                            <ThumbsUp className="w-4 h-4" />
                                            Helpful
                                        </button>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
