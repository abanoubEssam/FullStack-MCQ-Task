import { USERNAME_DISPATCH } from "./types"

export const loginUser = (userData: { name: string, score: number }) => {
    return {
        type: USERNAME_DISPATCH,
        payload: userData
    }
}
