let listeners: Set<() => void> = new Set();
let data: string[] = [];

const notify = () => {
    listeners.forEach(fn => fn());
}

export const getSnapshot = () => data;

export const subscribe = (callback: () => void) => {
    listeners.add(callback);
    return () => listeners.delete(callback);
};

const eventSource = new EventSource('http://localhost:3001/events');

eventSource.addEventListener('notification', (event: MessageEvent) => {
  try {
    const { message } = JSON.parse(event.data);
    data = [...data, message];
    notify();
  } catch (e) {
    console.error('Bad SSE data', e);
  }
});