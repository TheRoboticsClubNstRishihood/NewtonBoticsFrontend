"use client";
import React from "react";
import { motion } from "framer-motion";
import { useContactForm } from "../../hooks/useContactForm";
import { getContactCategories } from "../../lib/contact";

const ContactDemoPage = () => {
  const {
    formData,
    errors,
    isSubmitting,
    submitted,
    submitError,
    handleInputChange,
    handleSubmit,
    resetForm,
  } = useContactForm();

  const availableCategories = getContactCategories();

  const testCases = [
    {
      name: "Valid Contact Form",
      data: {
        name: "John Doe",
        email: "john.doe@example.com",
        subject: "General Inquiry",
        message: "Hello, I'm interested in joining your robotics club. Could you please provide more information about membership requirements and upcoming events?",
        phone: "+1-555-0123",
        category: "Membership"
      }
    },
    {
      name: "Minimal Valid Form",
      data: {
        name: "Jane Smith",
        email: "jane@example.com",
        subject: "Question",
        message: "I have a question about your workshops.",
        category: "Workshop"
      }
    }
  ];

  const fillTestData = (testData) => {
    Object.keys(testData).forEach(key => {
      const event = {
        target: {
          name: key,
          value: testData[key]
        }
      };
      handleInputChange(event);
    });
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans py-12 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <motion.div
        className="max-w-7xl mx-auto mb-12 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 font-display bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-600">
          Contact Form Demo
        </h1>
        <p className="text-lg text-white/80 max-w-2xl mx-auto">
          Test the contact form functionality and API integration
        </p>
      </motion.div>

      {/* Test Cases Section */}
      <motion.div
        className="max-w-7xl mx-auto mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl font-bold text-white mb-4">Test Cases</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {testCases.map((testCase, index) => (
            <motion.button
              key={index}
              onClick={() => fillTestData(testCase.data)}
              className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg p-4 text-left transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <h3 className="font-semibold text-white mb-2">{testCase.name}</h3>
              <p className="text-sm text-white/70">
                {Object.entries(testCase.data).map(([key, value]) => (
                  <span key={key} className="block">
                    <strong>{key}:</strong> {value}
                  </span>
                ))}
              </p>
            </motion.button>
          ))}
        </div>
        
        <div className="mt-4 flex gap-4">
          <button
            onClick={resetForm}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Reset Form
          </button>
          <a
            href="/contact"
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Go to Contact Page
          </a>
        </div>
      </motion.div>

      {/* Status Messages */}
      {submitted && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto mb-6 rounded-xl border border-green-500/30 bg-green-500/10 text-green-200 px-4 py-3 text-sm"
        >
          ✅ Success! Your message has been submitted. Check the console for API response details.
        </motion.div>
      )}

      {submitError && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto mb-6 rounded-xl border border-red-500/30 bg-red-500/10 text-red-200 px-4 py-3 text-sm"
        >
          ❌ Error: {submitError}
        </motion.div>
      )}

      {/* Contact Form */}
      <motion.div
        className="max-w-4xl mx-auto bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h2 className="text-3xl font-bold text-white mb-6 text-center font-display">Contact Form</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white/80">
                Name *
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-white/10 bg-white/5 text-white shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50"
                placeholder="Your full name"
              />
              {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white/80">
                Email *
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-white/10 bg-white/5 text-white shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50"
                placeholder="your.email@example.com"
              />
              {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-white/80">
                Subject *
              </label>
              <input
                type="text"
                name="subject"
                id="subject"
                required
                value={formData.subject}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-white/10 bg-white/5 text-white shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50"
                placeholder="What is this about?"
              />
              {errors.subject && <p className="mt-1 text-xs text-red-400">{errors.subject}</p>}
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-white/80">
                Category
              </label>
              <select
                name="category"
                id="category"
                value={formData.category}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-white/10 bg-white/5 text-white shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50"
              >
                {availableCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-white/80">
              Phone (optional)
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border border-white/10 bg-white/5 text-white shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50"
              placeholder="+1-555-0123"
            />
            {errors.phone && <p className="mt-1 text-xs text-red-400">{errors.phone}</p>}
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-white/80">
              Message *
            </label>
            <textarea
              name="message"
              id="message"
              rows={4}
              required
              value={formData.message}
              onChange={handleInputChange}
              maxLength={1000}
              className="mt-1 block w-full rounded-md border border-white/10 bg-white/5 text-white shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50"
              placeholder="Tell us more about your inquiry..."
            />
            <div className="flex items-center justify-between mt-1">
              {errors.message ? (
                <p className="text-xs text-red-400">{errors.message}</p>
              ) : (
                <span className="text-xs text-white/50">{formData.message.length}/1000</span>
              )}
            </div>
          </div>

          {/* Honeypot for bots */}
          <input 
            type="text" 
            name="honeypot" 
            value={formData.honeypot} 
            onChange={handleInputChange} 
            className="hidden" 
            autoComplete="off" 
            tabIndex={-1} 
          />

          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            className={`w-full py-3 rounded-md transition duration-300 ease-in-out flex items-center justify-center ${
              isSubmitting
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-500'
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin mr-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                Submitting...
              </>
            ) : (
              'Submit Message'
            )}
          </motion.button>
        </form>

        {/* API Information */}
        <div className="mt-8 p-4 bg-white/5 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-3">API Endpoint Information</h3>
          <div className="text-sm text-white/70 space-y-2">
            <p><strong>Endpoint:</strong> POST {process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3005/api'}/contact/submit</p>
            <p><strong>Required Fields:</strong> name, email, subject, message</p>
            <p><strong>Optional Fields:</strong> phone, category</p>
            <p><strong>Response:</strong> Check browser console for API response details</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactDemoPage;
