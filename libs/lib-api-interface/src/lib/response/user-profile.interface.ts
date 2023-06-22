import { Role } from "../model";


export interface UserProfile {
    id: string,
    email: string,
    username: string,
    password: string,
    createdAt: string,
    role: Role,
    firstName: string,
    lastName: string,
    recoveryPhase: string,
    slicesCollected: number,
    slicesPurchased: number,
    slicesSold: number,
    cakeBoxClaimed: number,
    totalRewardsEarned: number,
    avatar: string,
    sugar: number,
}

export interface UserProfileResponse {
    data: UserProfile
}