import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import VoicesListing from "./VoicesListing";

const API_KEY = '';

export default function AudioChat() {
    const [output, setOutput] = useState();
    const [voice, setVoice] = useState<string>('JBFqnCBsd6RMkjVDRZzb');
    const streaming = useRef(false);
    const audioContext = useRef(new AudioContext());
    const nextPlayTime = useRef(0);
    const [textInput, setTextInput] = useState<string>();

    async function getData() {
        const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voice}/stream?output_format=mp3_44100_128&optimize_streaming_latency=3`, {
            method: "POST",
            headers: {
                "xi-api-key": "sk_9a55eb1dc1a9885c9079c04b71c29973d163ed874c5e8ecd",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "text": textInput,
                "model_id": "eleven_multilingual_v2"
            }),
        });
        if(!response.ok || !response.body) throw new Error();
        const reader = response.body.getReader();
        streaming.current = true;
        nextPlayTime.current = 0;
        while(streaming.current){
            const { done, value } = await reader.read();
            if(done){
                streaming.current = false;
                break;
            }
            const arrayBuffer = value.buffer as ArrayBuffer;
            const audioBuffer = await audioContext.current.decodeAudioData(arrayBuffer);
            const source = audioContext.current.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(audioContext.current.destination);

            if(nextPlayTime.current < audioContext.current.currentTime) {
                nextPlayTime.current = audioContext.current.currentTime;
            }
            source.start(nextPlayTime.current);
            nextPlayTime.current += audioBuffer.duration;
        }
    }

    const onTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setTextInput(event.target.value);
    }

    const onFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        getData();
    }
    
    return (
        <div>
            {JSON.stringify(output)}
            <form onSubmit={onFormSubmit}>
                <textarea
                    value={textInput}
                    placeholder="Enter text to speech..."
                    onChange={onTextAreaChange}
                />
                <input type="submit" value="->" />
            </form>
            <VoicesListing setVoiceCallback={setVoice}/>
        </div>
    )
}