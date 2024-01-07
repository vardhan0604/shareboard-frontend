// socket.js

import io from 'socket.io-client';

const soc = io("http://localhost:3001");

export default soc;