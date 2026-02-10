import { useState, useEffect, useRef } from "react";

const useVoiceRecognition = (onResult) => {
    const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef(null);

    const isSupported = !!SpeechRecognition;
    // Si SpeechRecognition existe → true; si es undefined → false

    useEffect(() => {
        if (!isSupported) return;

        const recognition = new SpeechRecognition();
        recognition.lang = "es-ES";
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onresult = (event) => {
            const text = event.results[0][0].transcript;
            onResult(text);
            setIsListening(false);
        };

        recognition.onerror = (event) => {
            console.error("Error en reconocimiento:", event.error);
            setIsListening(false);
        };

        recognition.onend = () => setIsListening(false);

        recognitionRef.current = recognition;
    }, [SpeechRecognition, onResult, isSupported]);

    const startListening = () => {
        if (!isSupported || !recognitionRef.current) return;
        try {
            setIsListening(true);
            recognitionRef.current.start();
        } catch {
            console.warn("Ya está escuchando...");
        }
    };

    // Siempre retornamos un objeto consistente
    return {
        isSupported,
        isListening,
        startListening: isSupported ? startListening : () => { }
    };
};

export default useVoiceRecognition;