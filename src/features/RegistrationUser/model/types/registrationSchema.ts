import { Profile } from "@/entities/Profile";
import { UserData } from "./registrationTypes";
import { ValidateRegistrationErrors } from "../consts/consts";

export interface RegistrationSchema {
    profile: Profile
    user: UserData
    validateErrors?: Array<ValidateRegistrationErrors>
    isLoading?: boolean
    isSuccess?: boolean
    errors?: string
}