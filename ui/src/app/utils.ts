import jwt_decode from 'jwt-decode'

type Token = {
    email: string
    access: string
    id: number
}

export function getDecodedToken() {
    const token = localStorage.getItem('token')
    if (token) {
        const decoded: Token = jwt_decode(token!)
        return decoded
    }
    return null;
}
