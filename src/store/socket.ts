/* eslint-disable @typescript-eslint/no-unused-vars */
import { reactive } from 'vue';
import { io } from 'socket.io-client';

export const state = reactive({
  connected: false,
  fooEvents: [] as any[],
  barEvents: [] as any[]
});

// "undefined" means the URL will be computed from the `window.location` object
const URL =
  process.env.NODE_ENV === 'production'
    ? 'http://localhost:3000'
    : (import.meta.env.VITE_APP_API_BASE_URL as string);
export const socket = io(URL, { autoConnect: false });

socket.on('connect', () => {
  state.connected = true;
});

socket.on('disconnect', () => {
  state.connected = false;
});

socket.on('foo', (...args) => {
  return state.fooEvents.push(args);
});

socket.on('bar', (...args) => {
  return state.barEvents.push(args);
});
