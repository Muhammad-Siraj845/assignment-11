// app/api/external/route.ts

import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Fetch data from JSONPlaceholder API
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    
    // Check if the response is okay (status 200)
    if (!res.ok) {
      throw new Error('Failed to fetch posts data');
    }

    // Parse JSON response
    const posts = await res.json();

    // Return the data as a JSON response
    return NextResponse.json(posts);
  } catch (error) {
    // Handle errors and return an error response
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
