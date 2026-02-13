import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * POST /api/contact
 * Handles contact form submissions
 *
 * SETUP: Create the table in Supabase Dashboard → SQL Editor:
 * Run the SQL from supabase_contact_table.sql file
 * Or manually create table named 'contact_messages' with columns:
 * - id (uuid, primary key, default: gen_random_uuid())
 * - name (text)
 * - email (text)
 * - phone (text)
 * - subject (text)
 * - message (text)
 * - created_at (timestamptz, default: now())
 */
export async function POST(request) {
  try {
    // Parse request body
    const body = await request.json();
    const { name, email, phone, subject, message, best_time_to_call, source } = body;

    // Server-side validation
    if (!name || !email || !phone || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Phone validation
    const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;
    if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
      return NextResponse.json(
        { error: 'Invalid phone number format' },
        { status: 400 }
      );
    }

    // Create Supabase client
    const supabase = await createClient();

    // Prepare data for insertion
    const contactData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      subject: subject.trim(),
      message: message.trim(),
      best_time_to_call: best_time_to_call?.trim() || null,
      source: source || 'form',
    };

    // Insert into Supabase
    const { data, error } = await supabase
      .from('contact_messages')
      .insert([contactData])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);

      // If table doesn't exist, provide helpful error
      if (error.code === '42P01') {
        return NextResponse.json(
          {
            error: 'Database table not set up. Please run the SQL script in Supabase Dashboard.',
            details: 'Check supabase_contact_table.sql file for setup instructions.'
          },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { error: 'Failed to save message. Please try again.' },
        { status: 500 }
      );
    }

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Message sent successfully!',
        data: {
          id: data.id,
          created_at: data.created_at,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/contact
 * Returns method not allowed for GET requests
 */
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
