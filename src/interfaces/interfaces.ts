export interface User {
    _id?: string,
    uid?: string,
    name: string,
    online: boolean,
    userName: string,
    img?: string,
    token?: string
}

export interface Message {
    _id: string,
    from: User,
    to: string,
    message: string,
    createdAt: string,
    received: boolean
}