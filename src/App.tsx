import { SignIn } from "./pages/Auth/SignIn";
import { Chat } from "./pages/Chat/Chat";
import { useAuth } from "./services/firebase/firebase";

export function App() {
  const { user } = useAuth();

  return (
    <main
      className={`w-screen h-screen bg-background flex ${!user && "justify-center items-center"
        }`}
    >
      {user ? <Chat /> : <SignIn />}
    </main>
  );
}
