import { useState } from "react";
import { postPerfume } from "../services/PerfumeService";

export const usePostPerfume = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const addPerfume = async (perfume) => {
        try {
            setLoading(true)
            await postPerfume(perfume)
            return true
        } catch (err) {
            // Prefer server-provided message when available
            const serverMsg = err.response?.data?.message || err.message
            setError(serverMsg)
            return false
        } finally {
            setLoading(false)
        }
    }

    return { addPerfume, loading, error }
}