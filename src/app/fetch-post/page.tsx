// app/fetch-posts/page.tsx

'use client';

import { useEffect, useState } from 'react';

interface Post {
  id: number;
  title: string;
  body: string;
}

export default function FetchPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Fetch posts from the API route
        const res = await fetch('/api/external');
        
        // Check if the response is okay
        if (!res.ok) {
          throw new Error('Failed to fetch posts');
        }
        
        // Parse the response data
        const data = await res.json();
        
        // Update state with fetched posts
        setPosts(data);
      } catch (error) {
        // Update error state if fetching fails
        setError((error as Error).message);
      } finally {
        // Set loading to false once the request is done
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Posts</h1>

      {/* Show loading state */}
      {loading && <p>Loading...</p>}

      {/* Show error message if any */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Display the posts */}
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
