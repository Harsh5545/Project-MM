'use server';

import { signIn, signOut } from "@/auth";
import { revalidatePath } from "next/cache";


export async function login(provider){
    const res = await signIn(provider,{redirectTo:"/admin"});
    console.log(res)
    revalidatePath('/')
}

export async function logout(){
    await signOut({redirectTo:'/'});
    revalidatePath('/')
}

