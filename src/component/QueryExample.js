import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
 async function postFetcher() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
}

const QueryExample = () => {
   const [loadData, setLoadData] = useState(false);
   const { data: posts, isLoading, error, refetch } = useQuery({
    queryKey: ['posts'],
    queryFn: postFetcher,
    enabled: loadData, // Disable the query from automatically running
   })
   
   
  return (
    <>
    <div>QueryExample</div>
    <button onClick={() => setLoadData(true)}>Load Posts</button>
    <button onClick={() => refetch()}>Refetch Posts</button>
    {isLoading && <p>Loading...</p>}
    {error && <p>Error: {error.message}</p>}
    {posts && posts.map(post => (
        <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
        </div>
    ))}
    </>
  )
}

export default QueryExample