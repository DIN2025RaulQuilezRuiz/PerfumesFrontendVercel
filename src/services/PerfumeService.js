import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL + "/productos"

export const getAllPerfumes = async () => {
    try {
        const res = await axios.get(API_URL)
        return res.data.data ?? res.data
    } catch (err) {
        console.error('GET all perfumes error:', err.response?.status, err.response?.data ?? err.message)
    }
}

export const getOnePerfume = async (id) => {
    try {
        const res = await axios.get(`${API_URL}/${id}`)
        const data = res.data.data ?? res.data
        return Array.isArray(data) ? data[0] : data
    } catch (err) {
        console.error('GET one perfume error:', err.response?.status, err.response?.data ?? err.message)
    }
}

export const postPerfume = async (perfume) => {
    try {
        // Map frontend (Spanish) fields to backend schema fields
        const mapped = {
            name: perfume.nombre ?? perfume.name,
            description: perfume.descripcion ?? perfume.description,
            price: perfume.precio ?? perfume.price,
            category: perfume.categoria ?? perfume.category,
            photo: perfume.imagen ?? perfume.image ?? perfume.photo,
        }
        const res = await axios.post(API_URL, mapped, { headers: { 'Content-Type': 'application/json' } })
        return res.data ?? true
    } catch (err) {
        // Log full server response when available to help debug 400 errors
        console.error('POST perfume error:', err.response?.status, err.response?.data ?? err.message)
        // Rethrow so callers can handle/display the error
        throw err
    }
}

export const deletePerfume = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`)
        return true
    } catch (err) {
        console.error(err.message)
    }
}

