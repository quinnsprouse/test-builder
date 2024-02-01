import GridBackground from "@/components/grid-background";
import { SignIn } from "@clerk/nextjs";

export default function AppSignIn() {
  return (
    <GridBackground>
      <SignIn afterSignInUrl="/build" />
    </GridBackground>
  );
}
