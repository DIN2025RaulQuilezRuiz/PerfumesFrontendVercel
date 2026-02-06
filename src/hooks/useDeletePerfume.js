import { useState} from "react";
import { deletePerfume } from "../services/PerfumeService";

export const useDeletePerfume = (id) => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)


    const removePerfume = async () => {
        try {
            await deletePerfume(id)
            return true
        } catch (err) {
            setError(err.message)
            return false
        } finally {
            setLoading(false)
        }
    }


    return {removePerfume, loading, error}
}