export interface ITour {
    name: string,
    durationHours: number
    ratingAverage: number
    ratingQuality: number
    price: number
    imageCove: string
    images: string[]
    createdAt: Date
    startDates: Date[]
    startLocation: string
    locations: string[]
    slug: string
}