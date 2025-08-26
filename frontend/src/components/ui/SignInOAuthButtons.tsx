import { useSignIn }from "@clerk/clerk-react";
import { Button } from "./button.tsx";


const SignInOAuthButtons = () => {
    const {signIn, isLoaded} = useSignIn();

    if(!isLoaded){
        return null;
    }

    const singInWithGoogle = () => {
        signIn.authenticateWithRedirect({
            strategy: "oauth_google",
            redirectUrl: "/sso-callback",
            redirectUrlComplete: "/auth-callback",
        })
    }


  return <Button onClick={singInWithGoogle} variant={"secondary"} className="w-full text-white border-zinc-200 h-11">
      Sign in with Google
    </Button>;
};

export default SignInOAuthButtons