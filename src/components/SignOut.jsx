
import { handleSignOut } from "@/Actions"


export function SignOut() {
  return (
    <form action={handleSignOut}>
      <button >Log out</button>
    </form>
  )
}