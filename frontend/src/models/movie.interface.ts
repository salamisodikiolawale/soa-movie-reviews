export default interface Movie {

    _id?: string,
    userId?: string|undefined|null,
    types?: [],
    title: string,
    date?: string,
    rating: number,
    description?: string,
    image: string,
    numberOfReview?:number,
    createdAt?: string,
    updatedAt?: string,

    __v?: number
}