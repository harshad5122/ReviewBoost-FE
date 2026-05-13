"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate form submission
    setTimeout(() => {
      toast.success("Message sent! We'll get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <main className="bg-white py-24 px-6">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-black">Get in Touch</h1>
          <p className="text-xl text-gray-600">
            We'd love to hear from you. Send us a message!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            {[
              {
                icon: Mail,
                title: "Email",
                content: "support@reviewboost.ai",
              },
              {
                icon: Phone,
                title: "Phone",
                content: "+1 (555) 123-4567",
              },
              {
                icon: MapPin,
                title: "Office",
                content: "San Francisco, CA, USA",
              },
            ].map((contact, idx) => {
              const Icon = contact.icon;
              return (
                <div key={idx} className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black">{contact.title}</h3>
                    <p className="text-gray-600">{contact.content}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="How can we help?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                placeholder="Your message..."
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
            >
              {isLoading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
