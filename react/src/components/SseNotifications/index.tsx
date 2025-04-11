import { NavLink } from "react-router-dom";

export default function() {
    return(
        <>
            <h1>Server Side Events</h1>
            <p>Exploring Server Side Events</p>
            <ul>
                <li>
                    <NavLink to={"basicSse"}>Basic SSE Notifications</NavLink>
                </li>
                <li>
                    <NavLink to={"withSyncExternalStore"}>React useSyncExternalStore</NavLink>
                </li>
            </ul>
        </>
    );
}