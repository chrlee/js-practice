import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./Homepage";
import ImageCarousel from "./components/ImageCarousel";
import { NotificationsPage } from "./components/SseNotifications/BasicSse";
import SseNotifications from "./components/SseNotifications";
import { NotificationsPageWithExternalStore } from "./components/SseNotifications/WithSyncExternalStore";
import DataFetching from "./components/DataFetching";
import ChatStream from "./components/LlmChat";
import AudioChat from "./components/LlmChat/AudioChat";
import ImageSlideshow from "./components/ImageSlideshow";

export default function() {
  return (
    <BrowserRouter>
        <Routes>
            <Route index element={<Homepage />} />
            <Route path="imageCarousel" element={<ImageCarousel />} />
            <Route path="imageSlideshow" element={<ImageSlideshow />} />
            <Route path="sseNotifications" element={<SseNotifications />} />
            <Route path="sseNotifications/basicSse" element={<NotificationsPage />} />
            <Route path="sseNotifications/withSyncExternalStore" element={<NotificationsPageWithExternalStore />} />
            <Route path="dataFetching" element={<DataFetching />} />
            <Route path="llmChat" element={<ChatStream />} />
            <Route path="llmChatAudio" element={<AudioChat />} />
        </Routes>
    </BrowserRouter>
  );
}
