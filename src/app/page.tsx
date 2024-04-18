import { CurrentUserComponent } from "../components/CurrentUser";
import { Navbar } from "../components/Navbar";

export default function Home() {
  return (
    <main>
      <Navbar />
      <CurrentUserComponent />
    </main>
  );
}
