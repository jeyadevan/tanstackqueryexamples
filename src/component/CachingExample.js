import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
 async function postFetcher() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
}

const CachingExample = () => {
    const queryClient = useQueryClient();
   const [showPosts, setShowPosts] = useState(true);
   const { data: posts, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: postFetcher,
    // enabled: loadData, // Disable the query from automatically running
    
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
    gcTime: 10 * 60 * 1000, // Garbage collect unused cache after 10 minutes
   // refetchOnReconnect: true, // Refetch data when the browser regains network connection
   // refetchOnWindowFocus: true, // Refetch data when the window regains focus
   })
   
   
  return (
    <>
    <div>CachingExample</div>
    <button onClick={() => setShowPosts(!showPosts)}>
      {showPosts ? 'Hide Posts' : 'Show Posts'}
    </button>
    <button onClick={() => queryClient.invalidateQueries(['posts'])}>Invalidate Cache</button>
    {isLoading && <p>Loading...</p>}
    {error && <p>Error: {error.message}</p>}
    { showPosts && posts && posts.map(post => (
        <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
        </div>
    ))}
    </>
  )
}

export default CachingExample