import {create} from "zustand";

interface GlobalContext {
    mobileNumber: string;
    setMobileNumberMethod: (mobileNumber: string) => void;
}

export const useGlobalContext = create<GlobalContext>((set) => ({
    mobileNumber: "",
    setMobileNumberMethod: (mobileNumber) => set({ mobileNumber }),
}))