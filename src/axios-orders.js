import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burgerbuilderbg.firebaseio.com/'
});

export default instance;