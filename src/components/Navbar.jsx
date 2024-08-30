import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { motion } from "framer-motion";

const Navbar = () => {
  const { data: session } = useSession();
  console.log(session);
  return (
    <header className="bg-primary py-3 rounded text-gray-400 flex justify-between items-center px-10 shadow-lg">
      <span>Note App.</span>

      <div className="flex items-center gap-10">
        <div className="flex items-center gap-2">
          <h3 className="">{session?.user?.name}</h3>
          <Image
            src={session?.user?.image}
            width={30}
            height={30}
            alt="dp"
            className="rounded-full"
            title="Logout"
          />
        </div>
        <motion.div
          whileTap={{ scale: 0.8 }}
          className="cursor-pointer flex items-center gap-5 border-zinc-500 border-2 px-4 py-1 rounded-3xl"
          onClick={() => signOut()}
        >
          <h3 className="">Logout</h3>
        </motion.div>
      </div>
    </header>
  );
};

export default Navbar;
