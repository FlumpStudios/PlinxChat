export interface UserDetails {
    user?: User,
    authentication?: Object,
    accessToken?: string
}
export interface User {
    email: string,
    avatar: string,
    _id: string
    sketchColour: string;
}