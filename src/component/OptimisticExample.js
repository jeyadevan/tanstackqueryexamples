import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

 async function postFetcher() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
}
async function postAdder(newPost) {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/' + newPost.id, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPost)
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

const OptimisticExample = () => {
    const queryClient = useQueryClient();
   const { data: posts, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: postFetcher,
   // enabled: loadData, // Disable the query from automatically running
   })
   const handlePost = (post) => {
    mutate({
        id: post.id + 1,
        title: post.title+ ' (Optimistic)',
        body: post.body,
    });
   }
   const {mutate, isLoading: isMutating} = useMutation({
    mutationFn:postAdder,
    onMutate: async (newPost) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ['posts'] }); 
        // Snapshot the previous value
        const previousPosts = queryClient.getQueryData(['posts']);
        // Optimistically update to the new value
        queryClient.setQueryData(['posts'], old => [...old, newPost]);
        // Return a context object with the snapshotted value
        return { previousPosts };
    },
    onError: (err, newPost, context) => {
        // Rollback to the previous value
        queryClient.setQueryData(['posts'], context.previousPosts);
    },
     onSettled: () => {
        // Always refetch after error or success:
        queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    })
   
  return (
    <>
    <div>OptimisticExample</div>
   
   
    {isLoading && <p>Loading...</p>}
    {error && <p>Error: {error.message}</p>}
    {posts && posts.map(post => (
        <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <button onClick={() => handlePost(post)}>Add Post</button>
        </div>
    ))}
    </>
  )
}

export default OptimisticExample