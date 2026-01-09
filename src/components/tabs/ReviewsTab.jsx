import React, { useState } from "react";
import { Star, MessageSquare, Send } from "lucide-react";
import Card from "../ui/Card.jsx";
import Button from "../ui/Button.jsx";
import Input from "../ui/Input.jsx";
import { INITIAL_REVIEWS } from "../../data/constants.js";

export default function ReviewsTab() {
    const [reviews, setReviews] = useState(INITIAL_REVIEWS || [
        { id: 1, name: "Sarah K.", rating: 5, text: "Best gym app ever! The coaching is top notch.", date: "2023-11-15" },
        { id: 2, name: "Mike T.", rating: 4, text: "Great UI, love the dark mode.", date: "2023-11-20" },
    ]);
    const [newReview, setNewReview] = useState({ rating: 5, text: "" });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newReview.text.trim()) return;

        const review = {
            id: Date.now(),
            name: "You", // In a real app, use currentUser.name
            rating: newReview.rating,
            text: newReview.text,
            date: new Date().toISOString().split("T")[0],
        };

        setReviews([review, ...reviews]);
        setNewReview({ rating: 5, text: "" });
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
                <MessageSquare className="w-8 h-8 text-orange-500" />
                <h2 className="text-3xl font-black uppercase italic">
                    Client <span className="text-orange-500">Reviews</span>
                </h2>
            </div>

            {/* Add Review */}
            <Card className="border-orange-500/30">
                <h3 className="text-xl font-bold mb-4 text-orange-500">Write a Review</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setNewReview({ ...newReview, rating: star })}
                                className="focus:outline-none transition-transform hover:scale-110"
                            >
                                <Star
                                    className={`w-8 h-8 ${star <= newReview.rating
                                        ? "fill-orange-500 text-orange-500"
                                        : "text-gray-600"
                                        }`}
                                />
                            </button>
                        ))}
                    </div>
                    <textarea
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:border-orange-500 outline-none resize-none h-24"
                        placeholder="Share your experience..."
                        value={newReview.text}
                        onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                        required
                    />
                    <div className="flex justify-end">
                        <Button type="submit" disabled={!newReview.text.trim()}>
                            <Send className="w-4 h-4 mr-2" />
                            Post Review
                        </Button>
                    </div>
                </form>
            </Card>

            {/* Review List */}
            <div className="grid gap-4">
                {reviews.map((review) => (
                    <Card key={review.id} className="hover:border-white/10 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center font-bold text-orange-500">
                                    {(review.name || "A").charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-bold">{review.name || "Anonymous"}</h4>
                                    <p className="text-xs text-gray-500">{review.date || "Recently"}</p>
                                </div>
                            </div>
                            <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-4 h-4 ${i < review.rating ? "fill-orange-500 text-orange-500" : "text-gray-700"
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                        <p className="text-gray-300 ml-12">{review.text}</p>
                    </Card>
                ))}
            </div>
        </div>
    );
}
