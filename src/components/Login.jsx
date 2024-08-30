import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  return (
    <div className="min-h-screen grid place-items-center relative">
      <h2 className="text-center text-9xl font-semibold text-zinc-700">
        Note App.
      </h2>
      <div className="absolute bg-transparent h-full w-full top-0 left-0">
        <button
          className="absolute left-1/2 -translate-x-1/2 top-10 bg-white px-8 py-4 flex gap-2 items-center rounded"
          onClick={() => signIn("google")}
        >
          <FcGoogle size={30} />
          <span className="">Sign In With Google</span>
        </button>
      </div>
    </div>
  );
};

export default Login;
