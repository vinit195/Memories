import axios from 'axios';

const API =axios.create({baseURL:'http://localhost:5000'})
 
//THis code for send use token id in header to server so that server can identify user is login or not 
API.interceptors.request.use((req)=>{

    if(localStorage.getItem('profile')){

        req.headers.Authorization=`Bearer ${JSON.parse(localStorage.getItem('profile')).token} `
    }
        return req; 
})
export const fetchPosts =()=>API.get('/posts');
export const createPost=(newPost)=>API.post('/posts',newPost);
export const updatePost=(id,updatedPost)=>API.patch(`/posts/${id}`,updatedPost)
export const deletePost=(id)=>API.delete(`/posts/${id}`);
export const likePost=(id)=>API.patch(`/posts/${id}/likePost`);

export const signin=(FormData)=>API.post('/user/signin',FormData);
export const signup=(FormData)=>API.post('/user/signup',FormData);



