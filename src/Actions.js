'use server';

import { signIn } from "next-auth/react";

export async function doCredentialLogin(formData) {
    try {
        const response = await signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
            redirect: false,
        });
        revalidatePath("/");
        return response;
    } catch (err) {
        throw err;
    }
}