import api from './api'

export const createStockMovementRequest = (data) => {
    return api.post('/stock-movements', data)
}
