import { useState, useEffect } from "react";
import { getAllPerfumes } from "../services/PerfumeService";

export const useGetAllProducts = () => {
    const [loading, isLoading] = useState(true)
    const [perfumes, setPerfumes] = useState([])
    const [error, setError] = useState(null)


    const loadPerfumes = async () => {
        try {
            const data = await getAllPerfumes()
            setPerfumes(data)
        } catch (err) {
            setError(err.message)
        } finally {
            isLoading(false)
        }
    }

    useEffect(() => {
        loadPerfumes()
    }, [])

    return {perfumes, loading, error}
}