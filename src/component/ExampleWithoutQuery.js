import React,{useEffect, useState} from 'react'

const ExampleWithoutQuery = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
   
useEffect(() => {
    async function fetchPosts() {
        setIsLoading(true);
        setError(null);
        try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        setPosts(data);
        setIsLoading(false);
        } catch (error) {
        setError(error);
        setIsLoading(false);
        } finally {
        setIsLoading(false);
        }


    }
    fetchPosts();
}, [])
  return (
    <>
    <div>ExampleWithoutQuery</div>
    {isLoading && <p>Loading...</p>}
    {error && <p>Error: {error.message}</p>}
    {posts.map(post => (
        <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
        </div>
    ))}
    </>
  )
}

export default ExampleWithoutQuery