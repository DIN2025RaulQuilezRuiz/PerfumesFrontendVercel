import { useState, useEffect, useRef } from "react";

/**
 * Custom Hook para gestionar el reconocimiento de voz nativo del navegador (Web Speech API).
 * * Permite activar el micrófono, detectar las palabras habladas en español y ejecutar
 * una función de callback con el texto transcrito.
 * * @param {Function} onResult - Función callback que recibe el texto final transcrito.
 * @returns {Object} Objeto con el estado y métodos del reconocimiento de voz.
 * @property {boolean} isSupported - Indica si el navegador actual soporta la Web Speech API.
 * @property {boolean} isListening - Estado que indica si el micrófono está activo y escuchando.
 * @property {Function} startListening - Función para iniciar el proceso de escucha activa.
 * * @example
 * const { isSupported, isListening, startListening } = useVoiceRecognition((texto) => {
 * console.log("El usuario dijo:", texto);
 * });
 */
const useVoiceRecognition = (onResult) => {
    // Soporte multiplataforma (Chrome usa webkitSpeechRecognition, otros usan SpeechRecognition)
    const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef(null);

    // Si SpeechRecognition existe → true; si es undefined → false
    const isSupported = !!SpeechRecognition;

    useEffect(() => {
        // Si el navegador no lo soporta, no inicializamos nada
        if (!isSupported) return;

        // Instanciamos el motor de reconocimiento de voz
        const recognition = new SpeechRecognition();
        
        // --- Configuración del motor ---
        recognition.lang = "es-ES";          // Idioma configurado en Español
        recognition.continuous = false;     // Se detiene automáticamente cuando el usuario para de hablar
        recognition.interimResults = false;  // No devuelve resultados provisionales, solo el texto final aprobado

        // --- Manejadores de Eventos (Event Listeners) ---

        /**
         * Se ejecuta cuando la API procesa con éxito la voz del usuario.
         */
        recognition.onresult = (event) => {
            // Extrae la cadena de texto de la primera alternativa del primer resultado
            const text = event.results[0][0].transcript;
            onResult(text); // Envía el texto capturado al componente que usa el hook
            setIsListening(false);
        };

        /**
         * Se ejecuta si ocurre un error (ej: el usuario deniega el permiso del micro o hay timeout).
         */
        recognition.onerror = (event) => {
            console.error("Error en reconocimiento:", event.error);
            setIsListening(false);
        };

        /**
         * Se ejecuta siempre que la sesión de reconocimiento termina (con éxito o error).
         */
        recognition.onend = () => setIsListening(false);

        // Guardamos la instancia configurada en la referencia para poder usarla en 'startListening'
        recognitionRef.current = recognition;
        
    }, [SpeechRecognition, onResult, isSupported]);

    /**
     * Activa el micrófono y arranca el proceso de escucha.
     * Cuenta con un bloque try/catch preventivo por si se intenta llamar dos veces seguidas.
     */
    const startListening = () => {
        if (!isSupported || !recognitionRef.current) return;
        try {
            setIsListening(true);
            recognitionRef.current.start();
        } catch (error) {
            console.warn("Ya está escuchando...", error);
        }
    };

    // Siempre retornamos un objeto consistente con la interfaz del hook
    return {
        isSupported,
        isListening,
        startListening: isSupported ? startListening : () => { }
    };
};

export default useVoiceRecognition;