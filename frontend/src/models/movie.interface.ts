export default interface Movie {

    _id?: string,
    userId?: string,
    types?: string[],
    title: string,
    date?: string,
    rating: number,
    description?: string,
    image: string,
    createdAt?: string,
    updatedAt?: string,

    __v?: number
}