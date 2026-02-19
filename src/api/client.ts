import axios from 'axios';
import { Platform } from 'react-native';

// Android Emulator uses 10.0.2.2 to access host localhost
// iOS Simulator uses localhost
// const BASE_URL = Platform.OS === 'android'
//     ? 'http://10.0.2.2:3000/api'
//     : 'http://localhost:3000/api';

let BASE_URL = 'https://football-app-backend-tat6.onrender.com/api'

// if (__DEV__) {
//     BASE_URL = 'http://10.0.2.2:3000/api'
// }

const client = axios.create({
    baseURL: BASE_URL,
    timeout: 20000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default client;
