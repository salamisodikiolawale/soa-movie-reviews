export default interface Movie {

    _id?: string,
    userId?: string|undefined|null,
    types?: [],
    title: string|undefined,
    date?: string|undefined,
    rating: number|undefined,
    description?: string|undefined,
    image: string|undefined,
    numberOfReview?:number,
    createdAt?: string,
    updatedAt?: string,

    __v?: number
}