import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./Homepage";
import ImageCarousel from "./components/ImageCarousel";
import { NotificationsPage } from "./components/SseNotifications/BasicSse";
import SseNotifications from "./components/SseNotifications";
import { NotificationsPageWithExternalStore } from "./components/SseNotifications/WithSyncExternalStore";

export default function() {
  return (
    <BrowserRouter>
        <Routes>
            <Route index element={<Homepage />} />
            <Route path="imageCarousel" element={<ImageCarousel />} />
            <Route path="sseNotifications" element={<SseNotifications />} />
            <Route path="sseNotifications/basicSse" element={<NotificationsPage />} />
            <Route path="sseNotifications/withSyncExternalStore" element={<NotificationsPageWithExternalStore />} />
        </Routes>
    </BrowserRouter>
  );
}
