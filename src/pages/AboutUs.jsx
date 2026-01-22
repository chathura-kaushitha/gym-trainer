import React from "react";
import { Target, Users, Award, TrendingUp, Heart, Zap } from "lucide-react";
import Card from "../components/ui/Card.jsx";
import { COACHES } from "../data/constants.js";

export default function AboutUs() {
  const stats = [
    { icon: Users, value: "500+", label: "Active Members" },
    { icon: Award, value: "15+", label: "Years Experience" },
    { icon: TrendingUp, value: "98%", label: "Success Rate" },
    { icon: Heart, value: "24/7", label: "Support" },
  ];

  const features = [
    {
      icon: Target,
      title: "Personalized Programs",
      description: "Custom workout and meal plans tailored to your specific goals and fitness level.",
    },
    {
      icon: Users,
      title: "Expert Trainers",
      description: "Certified professionals with years of experience in fitness and nutrition.",
    },
    {
      icon: Zap,
      title: "Modern Equipment",
      description: "State-of-the-art gym equipment and facilities for optimal training.",
    },
    {
      icon: Heart,
      title: "Community Support",
      description: "Join a motivating community of fitness enthusiasts on the same journey.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-red-500/10 blur-3xl"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-black uppercase italic mb-6">
            About <span className="text-red-600">Gym Trainer</span>
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            We're more than just a gym - we're a community dedicated to transforming lives 
            through fitness, nutrition, and unwavering support. Our mission is to help you 
            achieve your fitness goals and become the best version of yourself.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <Card key={idx} className="text-center">
              <stat.icon className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <div className="text-4xl font-black text-white mb-2">{stat.value}</div>
              <div className="text-gray-400 font-semibold">{stat.label}</div>
            </Card>
          ))}
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <Card>
          <h2 className="text-3xl font-black uppercase italic mb-6 text-center">
            Our <span className="text-red-600">Mission</span>
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed text-center max-w-3xl mx-auto">
            At Gym Trainer, we believe that fitness is not just about physical transformation - 
            it's about building confidence, discipline, and a healthier lifestyle. We provide 
            world-class facilities, expert guidance, and a supportive environment where everyone, 
            from beginners to advanced athletes, can thrive and reach their full potential.
          </p>
        </Card>
      </div>

      {/* Why Choose Us */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-4xl font-black uppercase italic text-center mb-12">
          Why Choose <span className="text-red-600">Us</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, idx) => (
            <Card key={idx}>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gradient-to-br from-orange-600 to-red-600 rounded-xl">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Our Coaches */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-4xl font-black uppercase italic text-center mb-12">
          Meet Our <span className="text-red-600">Expert Coaches</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {COACHES.map((coach) => (
            <Card key={coach.id} className="text-center">
              <img
                src={coach.img}
                alt={coach.name}
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
              <h3 className="text-xl font-bold text-white">{coach.name}</h3>
              <p className="text-red-600 font-semibold">{coach.role}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Card className="text-center">
          <h2 className="text-3xl font-black uppercase italic mb-4">
            Ready to Start Your <span className="text-red-600">Journey?</span>
          </h2>
          <p className="text-gray-300 mb-6">
            Join hundreds of members who have already transformed their lives with us.
          </p>
          <button className="px-8 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold rounded-xl hover:from-red-600 hover:to-red-500 transition-all">
            Get Started Today
          </button>
        </Card>
      </div>
    </div>
  );
}
