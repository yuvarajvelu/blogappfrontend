import blogService from '../services/blogs'

const blogsReducer = (state = [], action) => {
    switch(action.type) {
        case 'NEW_BLOG':
            return [...state, action.data]
        case 'INIT_BLOG':
            return action.data
        default:
            return state
    }
}

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOG',
            data: blogs
        })
    }
}

export const createBlog = blogObject => {
    return async dispatch => {
        const newBlog = await blogService.create(blogObject)
        dispatch({
            type: 'NEW_BLOG',
            data: newBlog
        })
    }
}

export default blogsReducer