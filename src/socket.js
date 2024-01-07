// socket.js

import io from 'socket.io-client';

const soc = io("https://shareboard-backend.onrender.com");

export default soc;