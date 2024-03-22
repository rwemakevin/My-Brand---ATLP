const countBlog = document.getElementById("count-blog")

let blogCount;

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

    getBlogs()
})