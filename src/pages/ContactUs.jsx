import React, { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import Card from "../components/ui/Card.jsx";
import Button from "../components/ui/Button.jsx";
import Input from "../components/ui/Input.jsx";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for contacting us! We'll get back to you soon.");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+94 77 123 4567", "+94 11 234 5678"],
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@gymtrainer.lk", "support@gymtrainer.lk"],
    },
    {
      icon: MapPin,
      title: "Address",
      details: ["123 Fitness Street", "Colombo 07, Sri Lanka"],
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: ["Mon - Fri: 5:00 AM - 10:00 PM", "Sat - Sun: 6:00 AM - 8:00 PM"],
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-red-500/10 blur-3xl"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-black uppercase italic mb-6">
            Get In <span className="text-red-600">Touch</span>
          </h1>
          <p className="text-xl text-gray-300">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card>
            <h2 className="text-2xl font-black uppercase italic mb-6">
              Send Us a <span className="text-red-600">Message</span>
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-400 mb-2 font-semibold">Your Name</label>
                <Input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2 font-semibold">Email Address</label>
                <Input
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2 font-semibold">Phone Number</label>
                <Input
                  type="tel"
                  name="phone"
                  placeholder="+94 77 123 4567"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2 font-semibold">Message</label>
                <textarea
                  name="message"
                  rows="5"
                  placeholder="Tell us how we can help you..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white focus:border-red-600 outline-none resize-none"
                ></textarea>
              </div>
              <Button type="submit" className="w-full">
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </form>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <h2 className="text-2xl font-black uppercase italic mb-6">
                Contact <span className="text-red-600">Information</span>
              </h2>
              <div className="space-y-6">
                {contactInfo.map((info, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="p-3 bg-gradient-to-br from-orange-600 to-red-600 rounded-xl">
                      <info.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">{info.title}</h3>
                      {info.details.map((detail, i) => (
                        <p key={i} className="text-gray-400">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Map Placeholder */}
            <Card>
              <h3 className="text-xl font-bold text-white mb-4">Find Us</h3>
              <div className="w-full h-64 bg-neutral-800 rounded-xl flex items-center justify-center border border-neutral-700">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-red-600 mx-auto mb-2" />
                  <p className="text-gray-400">123 Fitness Street</p>
                  <p className="text-gray-400">Colombo 07, Sri Lanka</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Card>
          <h2 className="text-3xl font-black uppercase italic text-center mb-8">
            Frequently Asked <span className="text-red-600">Questions</span>
          </h2>
          <div className="space-y-4">
            <div className="border-b border-neutral-800 pb-4">
              <h3 className="text-lg font-bold text-white mb-2">What are your membership plans?</h3>
              <p className="text-gray-400">
                We offer flexible monthly, quarterly, and annual membership plans with various features and benefits.
              </p>
            </div>
            <div className="border-b border-neutral-800 pb-4">
              <h3 className="text-lg font-bold text-white mb-2">Do you offer personal training?</h3>
              <p className="text-gray-400">
                Yes! Our certified trainers provide personalized one-on-one training sessions tailored to your goals.
              </p>
            </div>
            <div className="border-b border-neutral-800 pb-4">
              <h3 className="text-lg font-bold text-white mb-2">Can I try before joining?</h3>
              <p className="text-gray-400">
                Absolutely! We offer a free trial day so you can experience our facilities and meet our trainers.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-2">What equipment do you have?</h3>
              <p className="text-gray-400">
                We have state-of-the-art cardio machines, free weights, resistance equipment, and specialized training areas.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
