import { useCallback, useEffect, useState } from 'react';

const Notification = ({ message }: { message: string }) => {
    return <li>{message}</li>
}

export const NotificationsPage = () => {
    const [notifications, setNotifications] = useState<string[]>([]);
    const [connected, setConnected] = useState(false);

    const createNotification = useCallback((event: MessageEvent) => {
        const { message } = JSON.parse(event.data);
        setNotifications((prev) => [message, ...prev]);
    }, []);

    useEffect(() => {
        const eventSource = new EventSource('http://localhost:3001/events');
        eventSource.addEventListener('notification', createNotification);
        eventSource.onopen = () => setConnected(true);
        eventSource.onerror = () => setConnected(false);

        return () => {
            eventSource.removeEventListener('notification', createNotification);
            eventSource.close();
        };
    }, [createNotification]);

    return (
        <>
            <h1>🔔 Live Notifications</h1>
            <div>{connected ? "🟢 Connected" : "🔴 Disconnected"}</div>
            <ul id="notifications">
                {notifications.map((v) => <Notification message={v} />)}
            </ul>
        </>
    )
}