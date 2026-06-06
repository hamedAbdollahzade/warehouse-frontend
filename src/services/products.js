import api from './api'

export const getProductsRequest = (params = {}) => {
    return api.get('/products', {params})
}

export const getProductRequest = (id) => {
    return api.get(`/products/${id}`)
}

export const createProductRequest = (payload) => {
    return api.post('/products', payload)
}

export const updateProductRequest = (id, payload) => {
    return api.put(`/products/${id}`, payload)
}

export const deleteProductRequest = (id) => {
    return api.delete(`/products/${id}`)
}
