export type Organization = {
    id?: number,
    name?: string,
    fullName?: string,
    inn?: string,
    tel?: string,
    email?: string,
    status?: 'PENDING' | 'APPROVED' | 'DENIED'
}
