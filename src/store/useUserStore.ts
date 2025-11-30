import { create } from "zustand";

interface userStore {
  CurrentUserId: string;
  setUser: (id: string) => void;
  resetUser: (item: string) => void;
}

export const useUserStore = create<userStore>((set) => ({
    CurrentUserId:"",
    setUser: (u)=>{
      set({CurrentUserId:u})
    },
    resetUser:()=>set({CurrentUserId:""})
}));

