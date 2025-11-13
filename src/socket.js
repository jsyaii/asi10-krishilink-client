

import { io } from "socket.io-client";

const socket = io("https://krishilink-server-khaki.vercel.app", {
  transports: ["websocket"], // helps prevent polling errors
});

export default socket;
