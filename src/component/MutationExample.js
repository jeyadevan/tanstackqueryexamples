import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

 async function postComments(newPost) {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts',{
        method: 'POST',
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

const MutationExample = () => {
    const [inputValue, setInputValue] = useState('');
    const [textareaValue, setTextareaValue] = useState('');
    const { mutate, data: postData, isLoading, isError, error } = useMutation({mutationFn: postComments});

   const handleInputData = () => {
    mutate({ title: inputValue, body: textareaValue, userId: 1 });
}

  return (
    <>
    <div>MutationExample</div>

    <input type="text" placeholder='Enter something' value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
    <textarea placeholder='Enter something' value={textareaValue} onChange={(e) => setTextareaValue(e.target.value)}></textarea>
    <button onClick={handleInputData}>Create a Post</button>
    {isLoading && <p>Loading...</p>}
    {isError && <p>Error: {error.message}</p>}
    {postData && (
        <div>
            <h3>Post Created:</h3>
            <p>ID: {postData.id}</p>
            <p>Title: {postData.title}</p>
            <p>Body: {postData.body}</p>
        </div>
    )}
    </>
  )
}

export default MutationExample