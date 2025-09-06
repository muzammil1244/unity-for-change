export const Getnews = (req,res)=>{
    return res.send("hi users news")
}

export const Postnews = (req,res)=>{
    return res.send("hi Post  news from users")
}


export const Sugessiton = (req,res)=>{
    return res.send("hi sugestion users")
}

export const Repost = (req,res)=>{
    return res.send("hi form report")
}

export const LikedUsersNews = (req,res)=>{
return res.send("hi liked news of users")
}

export const LikedMainPOst = (req,res)=>{
    return res.send("hi liked post of auther")
}

export const CommentToNews=(req,res)=>{
    return res.send(" hi comment to the news sction ")
}

export const GetAllPost = (req,res)=>{
return res.send("hi all post of users")
}

export const DeleteComment=(req,res)=>{
    return res.send("hi delete comment form user")
}
