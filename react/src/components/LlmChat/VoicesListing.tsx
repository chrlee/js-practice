import { useEffect, useState, type Dispatch, type SetStateAction } from "react";

export default function VoicesListing({ setVoiceCallback }: { setVoiceCallback: Dispatch<SetStateAction<string>> }) {
    const [voices, setVoices] = useState([]);
    
    useEffect(() => {
        async function fetchData() {
            const response = await fetch('https://api.elevenlabs.io/v2/voices', {
                headers: {
                    "xi-api-key": "sk_9a55eb1dc1a9885c9079c04b71c29973d163ed874c5e8ecd",
                    "Content-Type": "application/json"
                }
            })
            const json = await response.json();
            setVoices(json.voices);
        }

        fetchData();
    }, []);

    return (
        <div>
            <select onChange={(event) => setVoiceCallback(event.target.value)}>
                {voices.length && voices.map((voice: any) => (
                    <option key={voice.voice_id} value={voice.voice_id}>
                       {voice.name}
                    </option>
                ))}
            </select>
        </div>
    )
}