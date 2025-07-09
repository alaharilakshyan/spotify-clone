import { Button } from "./components/ui/button";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/clerk-react";

// Ensure you have the correct import path for Clerk components
// If you're using a different version or structure, adjust the import accordingly
function App() {
  return (
   <header>
      <SignedOut>
        <SignInButton> 
          <Button>Sign In</Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  );
}

export default App;
