import GridBackground from "@/components/grid-background";
import { SignUp } from "@clerk/nextjs";

export default function AppSignUp() {
  return (
    <GridBackground>
      <SignUp afterSignInUrl="/build" />
    </GridBackground>
  );
}
