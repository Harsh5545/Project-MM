'use server';

import { redirect } from "next/navigation";
import { signOut, signIn } from "./auth";

export async function doCredentialLogin(formData) {
    try {
        const response = await signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
            redirect: false,
        });
        redirect('/sign-in')
    } catch (err) {
        throw err;
    }
}

export async function handleSignOut(){
   const res = await signOut(); 
};