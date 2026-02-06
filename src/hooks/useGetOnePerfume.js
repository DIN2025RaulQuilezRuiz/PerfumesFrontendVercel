import { useState, useEffect } from "react";
import { getOnePerfume } from "../services/PerfumeService";

export const useGetOnePerfume = (id) => {
    const [loading, setLoading] = useState(true)
    const [perfume, setPerfume] = useState(null)
    const [error, setError] = useState(null)

    const loadPerfume = async () => {
        try {
            const data = await getOnePerfume(id)
            setPerfume(data)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!id) return
        loadPerfume()
    }, [id])

    return {perfume, loading, error}
}