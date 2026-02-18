'use client';
import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { sendContactMessage } from '@/service/contactService';

// Toast Component with Portal
const Toast = ({ type, message, onClose }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const toastContent = (
    <div
      style={{
        position: 'fixed',
        top: '24px',
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        zIndex: 999999,
        pointerEvents: 'none',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -50, scale: 0.8 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        style={{ pointerEvents: 'auto', position: 'relative', overflow: 'hidden' }}
        className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl ${
          type === 'success'
            ? 'bg-black text-white'
            : 'bg-red-600 text-white'
        }`}
      >
      {/* Icon */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
        className={`flex items-center justify-center w-8 h-8 rounded-full ${
          type === 'success' ? 'bg-green-500' : 'bg-white/20'
        }`}
      >
        {type === 'success' ? (
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M5 13l4 4L19 7"
            />
          </svg>
        ) : (
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
      </motion.div>

      {/* Message */}
      <span className="text-base font-medium whitespace-nowrap">{message}</span>

      {/* Close button */}
      <motion.button
        onClick={onClose}
        className="ml-3 p-1.5 rounded-full hover:bg-white/20 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </motion.button>

      {/* Progress bar */}
      <motion.div
        className="absolute bottom-0 left-4 right-4 h-1 rounded-full overflow-hidden bg-white/20"
      >
        <motion.div
          className={`h-full ${type === 'success' ? 'bg-green-400' : 'bg-white/60'}`}
          initial={{ width: '100%' }}
          animate={{ width: '0%' }}
          transition={{ duration: 5, ease: 'linear' }}
        />
      </motion.div>
      </motion.div>
    </div>
  );

  // Use portal to render toast at document body level
  if (!mounted) return null;

  return createPortal(toastContent, document.body);
};

const ContactPage = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        return '';

      case 'email':
        if (!value.trim()) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Please enter a valid email';
        return '';

      case 'phone':
        if (!value.trim()) return 'Phone number is required';
        // International phone number validation (allows +, digits, spaces, hyphens, parentheses)
        const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;
        if (!phoneRegex.test(value.replace(/\s/g, ''))) return 'Please enter a valid phone number';
        return '';

      case 'subject':
        if (!value.trim()) return 'Subject is required';
        if (value.trim().length < 3) return 'Subject must be at least 3 characters';
        return '';

      case 'message':
        if (!value.trim()) return 'Message is required';
        if (value.trim().length < 10) return 'Message must be at least 10 characters';
        return '';

      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Validate on change if field has been touched
    if (touched[name]) {
      setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);
    setTouched({
      name: true,
      email: true,
      phone: true,
      subject: true,
      message: true
    });

    // If there are errors, don't submit
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    // Submit the form
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const result = await sendContactMessage(formData);

      if (result.success) {
        setSubmitStatus('success');
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
        setTouched({});

        // Clear success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus(null);
        }, 5000);
      } else {
        setSubmitStatus('error');
        console.error('Error:', result.error);
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Check if form is valid
  const isFormValid = () => {
    return Object.values(formData).every(value => value.trim() !== '') &&
           Object.values(errors).every(error => error === '');
  };

  return (
    <>
      {/* Toast Notifications */}
      <AnimatePresence>
        {submitStatus === 'success' && (
          <Toast
            type="success"
            message="Message sent! I'll get back to you soon."
            onClose={() => setSubmitStatus(null)}
          />
        )}
        {submitStatus === 'error' && (
          <Toast
            type="error"
            message="Failed to send. Please try again."
            onClose={() => setSubmitStatus(null)}
          />
        )}
      </AnimatePresence>

      {/* Main Container: min-h-screen ensures it takes full height */}
      <div ref={containerRef} className="flex min-h-screen w-full bg-white text-black antialiased border-t border-gray-100 font-matangi">

      {/* 1. LEFT GUTTER (Logo Area) - Creates that specific 'left space' */}
      <motion.div
        className="hidden md:flex  w-16 flex-col items-center border-r border-gray-100 py-10 md:w-24"
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Logo matching the grid style in the image */}
        <motion.div
          className="grid h-8 w-8 grid-cols-2"
          initial={{ scale: 0, rotate: -180 }}
          animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "backOut" }}
        >
          <div className="bg-black"></div>
          <div className="bg-red-600"></div>
          <div className="bg-red-600"></div>
          <div className="bg-black"></div>
        </motion.div>
      </motion.div>

      {/* 2. MAIN CONTENT AREA (Split into Left Info and Right Form) */}
      <div className="flex flex-1 flex-col lg:flex-row">

        {/* LEFT COLUMN: Large Typography and Address */}
        <div className="flex flex-1 flex-col px-8 py-16 md:px-20 lg:py-24">
          <motion.h1
            className="mb-16 text-[70px] font-custom leading-[0.85] tracking-tight md:text-[100px] lg:text-[120px]"
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Let's get <br /> in touch
          </motion.h1>

          <motion.div
            className="mb-16 max-w-sm"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h2 className="text-2xl md:text-3xl font-matangi">
              Don't be afraid to <br /> say hello!
            </h2>
          </motion.div>

          {/* Contact Details Grid */}
          <div className="mt-auto space-y-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <p className="mb-1 text-xs  uppercase tracking-widest text-gray-400 font-matangi">Phone</p>
              <p className="text-xl  font-custom ">+91 7892808101</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <p className="mb-1 text-xs  uppercase tracking-widest text-gray-400 font-matangi">Email</p>
              <p className="text-xl  font-custom ">sushiluideveloper@gmail.com</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <p className="mb-1 text-xs  uppercase tracking-widest text-gray-400 font-matangi">Address</p>
              <p className="text-xl  leading-snug font-custom ">
                Chennai, <br />
                Tamil Nadu, India
              </p>
            </motion.div>
          </div>
        </div>

        {/* RIGHT COLUMN: Nav, Intro Text, and Black Form */}
        <div className="flex flex-1 flex-col border-l border-gray-100">



          {/* Middle Section: Intro text with Arrow line */}
          <motion.div
            className="relative flex items-center px-10 py-20 lg:px-20"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {/* The Arrow Line bridging the gap */}
            <motion.div
              className="absolute left-[-100px] hidden w-[180px] items-center lg:flex"
              initial={{ scaleX: 0, originX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="h-[2px] w-full bg-black"></div>
              <div className="h-0 w-0 border-y-[6px] border-l-[10px] border-y-transparent border-l-black"></div>
            </motion.div>

            <motion.p
              className="max-w-xs text-[15px] font-matangi ml-2 text-gray-500"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Great! I'm excited to hear from you and let's start something special together. Call me for any inquiry.
            </motion.p>
          </motion.div>

          {/* Bottom Section: Black Contact Form (Touched to bottom) */}
          <motion.div
            className="flex flex-1 flex-col bg-[#0D0D0D] p-10 text-white md:p-16 lg:p-20"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.h3
              className="mb-12 text-2xl font-custom"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              Get in Touch
            </motion.h3>

            <form onSubmit={handleSubmit} className="flex flex-1 flex-col justify-between space-y-12">
              <div className="grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2">
                <motion.div
                  className="flex flex-col"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <label className="mb-2 text-[10px] font-matangi uppercase tracking-widest text-gray-500">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`font-matangi border-b bg-transparent py-2 outline-none focus:border-red-600 ${
                      errors.name && touched.name ? 'border-red-600' : 'border-gray-700'
                    }`}
                  />
                  {errors.name && touched.name && (
                    <span className="mt-1 text-xs font-matangi text-red-600">{errors.name}</span>
                  )}
                </motion.div>
                <motion.div
                  className="flex flex-col"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.75 }}
                >
                  <label className="mb-2 text-[10px] font-matangi uppercase tracking-widest text-gray-500">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`font-matangi border-b bg-transparent py-2 outline-none focus:border-red-600 ${
                      errors.email && touched.email ? 'border-red-600' : 'border-gray-700'
                    }`}
                  />
                  {errors.email && touched.email && (
                    <span className="mt-1 text-xs font-matangi text-red-600">{errors.email}</span>
                  )}
                </motion.div>
                <motion.div
                  className="flex flex-col"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <label className="mb-2 text-[10px] font-matangi uppercase tracking-widest text-gray-500">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="+91 1234567890"
                    className={`font-matangi border-b bg-transparent py-2 outline-none focus:border-red-600 ${
                      errors.phone && touched.phone ? 'border-red-600' : 'border-gray-700'
                    }`}
                  />
                  {errors.phone && touched.phone && (
                    <span className="mt-1 text-xs font-matangi text-red-600">{errors.phone}</span>
                  )}
                </motion.div>
                <motion.div
                  className="flex flex-col"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.85 }}
                >
                  <label className="mb-2 text-[10px] font-matangi uppercase tracking-widest text-gray-500">Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`font-matangi border-b bg-transparent py-2 outline-none focus:border-red-600 ${
                      errors.subject && touched.subject ? 'border-red-600' : 'border-gray-700'
                    }`}
                  />
                  {errors.subject && touched.subject && (
                    <span className="mt-1 text-xs font-matangi text-red-600">{errors.subject}</span>
                  )}
                </motion.div>
              </div>

              <motion.div
                className="flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                <label className="mb-2 text-[10px] font-matangi uppercase tracking-widest text-gray-500">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  rows="4"
                  className={`font-matangi border-b bg-transparent py-2 outline-none focus:border-red-600 resize-none ${
                    errors.message && touched.message ? 'border-red-600' : 'border-gray-700'
                  }`}
                />
                {errors.message && touched.message && (
                  <span className="mt-1 text-xs font-matangi text-red-600">{errors.message}</span>
                )}
              </motion.div>


              {/* Red Button at the bottom of the black container */}
              <motion.button
                type="submit"
                disabled={!isFormValid() || isSubmitting}
                className={`mt-8 py-5 text-[13px] font-custom uppercase tracking-[0.2em] transition-colors ${
                  isFormValid() && !isSubmitting
                    ? 'bg-red-600 text-white hover:bg-red-700 cursor-pointer'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.95 }}
                whileHover={isFormValid() && !isSubmitting ? { scale: 1.02 } : {}}
                whileTap={isFormValid() && !isSubmitting ? { scale: 0.98 } : {}}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ContactPage;