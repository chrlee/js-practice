import { useSyncExternalStore } from 'react';
import { getSnapshot, subscribe } from './notificationStore';

const Notification = ({ message }: { message: string }) => {
    return <li>{message}</li>
}

export const NotificationsPageWithExternalStore = () => {
    const notifications = useSyncExternalStore(subscribe, getSnapshot);

    return (
        <>
            <h1>🔔 Live Notifications</h1>
            <ul id="notifications">
                {notifications.map((v) => <Notification message={v} />)}
            </ul>
        </>
    )
}