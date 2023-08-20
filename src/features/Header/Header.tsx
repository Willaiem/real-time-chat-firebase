import { useState } from "react";
import { useAuth } from "../../services/firebase/firebase";

export const Header = () => {
  return (
    <header className="flex justify-between  px-12 w-screen h-16  items-center mb-4 bg-secondary">
      <h1>Chat</h1>
      <Profile />
    </header>
  );
};


const Profile = () => {
  const { user } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <div
      onClick={toggleDropdown}
      className="flex items-center gap-4 relative cursor-pointer select-none"
    >
      <img className="rounded-full w-12 h-12" src={user?.photoURL ?? ''} alt="" />
      <p>{user?.displayName}</p>
      {isDropdownOpen && <Dropdown />}
    </div>
  );
};

const Dropdown = () => {
  const { logOut } = useAuth();
  return (
    <div className="absolute top-16 left-0  rounded-lg w-28 flex flex-col items-center">
      <button
        className="bg-secondary rounded-lg w-full py-2 px-4"
        onClick={logOut}
      >
        Sign out
      </button>
    </div>
  );
};
