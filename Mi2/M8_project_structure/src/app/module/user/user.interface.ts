export type TUser = {
    id: string,
    password: string,
    needsPassword: boolean,
    role: 'admin' | 'student' | 'faculty',
    status: 'in-progress' | 'blocked',
    isDeleted: boolean
}

export type NewUser = {
    id: string,
    password: string,
    role: string,
}