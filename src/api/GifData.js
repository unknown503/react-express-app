import axios from 'axios'

const Gif = async (search) => {
    const API_KEY = "4RYECkm1VhUxqZ7ftdHFj4GFTzhVfv64"
    const limit = 1
    const min = 0;
    const max = 2000;
    const offset = parseInt(min + Math.random() * (max - min));
    const res = await axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${search}&limit=${limit}&offset=${offset}`)
    return res
}

export default Gif