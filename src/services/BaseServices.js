import axios from "axios"

export const fetchPost = async (postId) => {
	try {
		const { data, status } = await axios({
			url: `http://127.0.0.1:8000/posts/${postId}`,
			method: "GET",
		})
		if (status === 200) {
			return data[0]
		}
	}
	catch (error) {
		console.log(error)
		return false
	}
}

export const fetchCategory = async () => {
	try {
		const { data, status } = await axios({
			url: "http://127.0.0.1:8000/category/",
			method: "GET",
		})
		if (status === 200) {
			return data
		}
	}
	catch (error) {
		console.log(error)
		return false
	}
}

export const addPost = async (post) => {
	console.log("add post", post)
	try {
		const { data, status } = await axios({
			method: 'POST',
			url: "http://127.0.0.1:8000/posts/",
			data: post
		})

		return true
	}
	catch (error) {
		console.log("error", { ...error })
		return false
	}
}

export const updatePost = async (post) => {
	console.log("update post", post)
	try {
		const { data, status } = await axios({
			method: 'PUT',
			url: `http://127.0.0.1:8000/posts/${post.postId}`,
			data: post
		})

		return true
	}
	catch (error) {
		console.log("error", { ...error })
		return false
	}
}

export const deletePost = async (postId) => {
	try {
		const { data, status } = await axios({
			method: 'DELETE',
			url: `http://127.0.0.1:8000/posts/${postId}`,
		})

		return true
	}
	catch (error) {
		console.log("error", { ...error })
		return false
	}
}