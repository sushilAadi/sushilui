/**
 * Contact Service
 * Handles all contact-related operations
 */

import { createClient } from '@/lib/supabase/client';

/**
 * Send a contact message directly to Supabase
 * @param {Object} messageData - The contact message data
 * @param {string} messageData.name - Sender's name
 * @param {string} messageData.email - Sender's email
 * @param {string} messageData.phone - Sender's phone number
 * @param {string} messageData.subject - Message subject
 * @param {string} messageData.message - Message content
 * @param {string} [messageData.best_time_to_call] - Best time to call (optional)
 * @param {string} [messageData.source] - Source of the message: 'form' or 'chatbot' (optional, defaults to 'form')
 * @returns {Promise<Object>} Response with success status and data
 */
export async function sendContactMessage(messageData) {
  try {
    // Create Supabase client
    const supabase = createClient();

    // Prepare data for insertion
    const contactData = {
      name: messageData.name.trim(),
      email: messageData.email.trim().toLowerCase(),
      phone: messageData.phone.trim(),
      subject: messageData.subject.trim(),
      message: messageData.message.trim(),
      best_time_to_call: messageData.best_time_to_call?.trim() || null,
      source: messageData.source || 'form',
    };

    // Insert directly to Supabase
    const { data, error } = await supabase
      .from('contact_messages')
      .insert([contactData])
      .select()
      .single();

    if (error) {
      console.error('Supabase error details:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
        fullError: error
      });
      throw new Error(error.message || 'Failed to send message. Please try again.');
    }

    return {
      success: true,
      data: {
        id: data.id,
        created_at: data.created_at,
      },
    };
  } catch (error) {
    console.error('Error sending contact message:', error);
    return {
      success: false,
      error: error.message || 'Failed to send message. Please try again.',
    };
  }
}

/**
 * Validate contact form data
 * @param {Object} formData - Form data to validate
 * @returns {Object} Validation result with isValid flag and errors object
 */
export function validateContactForm(formData) {
  const errors = {};

  // Name validation
  if (!formData.name?.trim()) {
    errors.name = 'Name is required';
  } else if (formData.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  // Email validation
  if (!formData.email?.trim()) {
    errors.email = 'Email is required';
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email';
    }
  }

  // Phone validation
  if (!formData.phone?.trim()) {
    errors.phone = 'Phone number is required';
  } else {
    const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;
    if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      errors.phone = 'Please enter a valid phone number';
    }
  }

  // Subject validation
  if (!formData.subject?.trim()) {
    errors.subject = 'Subject is required';
  } else if (formData.subject.trim().length < 3) {
    errors.subject = 'Subject must be at least 3 characters';
  }

  // Message validation
  if (!formData.message?.trim()) {
    errors.message = 'Message is required';
  } else if (formData.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
