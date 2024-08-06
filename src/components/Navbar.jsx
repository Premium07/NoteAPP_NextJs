import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

const Navbar = () => {
  const { data: session } = useSession();
  return (
    <header className="bg-primary py-2 rounded text-[20px] text-gray-400 flex justify-between items-center appContainer shadow-lg">
      <span>Note App.</span>
      <div className="cursor-pointer" onClick={() => signOut()}>
        <Image
          src={session?.user?.image}
          width={40}
          height={40}
          alt="dp"
          className="rounded-full border"
          title="Logout"
        />
      </div>
    </header>
  );
};

export default Navbar;
