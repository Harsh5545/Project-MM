import { signOut } from "@/auth"
import { Button } from "./ui/button"
import { handleSignOut } from "@/Actions"

export function SignOut() {
    return (
      <form
        action={handleSignOut}
        className="w-full"
      >
        <Button variant="ghost" className="w-full p-0">
          Sign Out
        </Button>
      </form>
    )
  }