const countBlog = document.getElementById("count-blog")
const countUser = document.getElementById("count-user")
const countMessage = document.getElementById("count-message")
console.log(countMessage)

let blogCount;
let userCount;
let messageCount;

document.addEventListener("DOMContentLoaded", () => {
    
    const getBlogs =  async() => {
        const getBogCount = "https://my-brand-atlp-be.onrender.com/api/blogcount";

        try {
            countBlog.innerHTML = "calculating..."
            const response = await fetch(getBogCount)
            if(!response.ok){
                throw new Error("Fail to fetch")
            }else{
                const data = await response.json()
                blogCount = data.data
               console.log(blogCount);
               countBlog.innerHTML = blogCount;
            }
           
        }catch(e){
            console.error(e)
        }
    }
    const getUsers =  async() => {
        const getUserCount = "https://my-brand-atlp-be.onrender.com/api/usercount";

        try {
            countUser.innerHTML = "calculating..."
            const response = await fetch(getUserCount)
            if(!response.ok){
                throw new Error("Fail to fetch")
            }else{
                const data = await response.json()
                userCount = data.data
               console.log(userCount);
               countUser.innerHTML = userCount;
            }
           
        }catch(e){
            console.error(e)
        }
    }
    const getMessages =  async() => {
        const getMessageCount = "https://my-brand-atlp-be.onrender.com/api/messagecount";

        try {
            countMessage.innerHTML = "calculating..."
            const response = await fetch(getMessageCount)
            if(!response.ok){
                throw new Error("Fail to fetch")
            }else{
                const data = await response.json()
                messageCount = data.data
               console.log(messageCount);
               countMessage.innerHTML = messageCount;
            }
           
        }catch(e){
            console.error(e)
        }
    }
    

    getBlogs()
    getUsers()
    getMessages()
})