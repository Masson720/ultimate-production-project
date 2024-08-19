import { StateSchema } from "@/app/providers/StoreProvider";

export const getProfileForm = (state: StateSchema) => state.registrationForm?.profile;
export const getUserData = (state: StateSchema) => state.registrationForm?.user;
export const getSuccess = (state: StateSchema) => state.registrationForm?.isSuccess;

export const getValidateError = (state: StateSchema) => state.registrationForm?.validateErrors