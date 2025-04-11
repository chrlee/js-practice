import { NavLink } from "react-router-dom";

export default function() {
    return(
        <>
            <h1>React Practice</h1>
            <p>React components and pages built for practice</p>
            <ul>
                <li>
                    <NavLink to={"imageCarousel"}>Image Carousel</NavLink>
                </li>
                <li>
                    <NavLink to={"sseNotifications"}>Server Side Events Demo</NavLink>
                </li>
            </ul>
        </>
    );
}