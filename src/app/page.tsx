import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center">
      <h1 className="fixed top-10 left-1/2 -translate-x-1/2 font-mono text-2xl font-bold">
        AUTHENTICATION APP
      </h1>

      <p className="fixed top-20 left-1/2 -translate-x-1/2  italics font-mono text-cyan-200">
        Trying Nextjs for the first time
      </p>

      <div className="flex gap-x-4">
        <Link
          href="/login"
          className="mt-4 rounded-full bg-blue-400 hover:bg-blue-400/80 active:bg-blue-400/60 duration-200 text-white flex items-center justify-center py-2 px-10 font-medium cursor-pointer font-mono"
        >
          Login
        </Link>

        <Link
          href="/signup"
          className="mt-4 rounded-full bg-blue-400 hover:bg-blue-400/80 active:bg-blue-400/60 duration-200 text-white flex items-center justify-center py-2 px-10 font-medium cursor-pointer font-mono"
        >
          Signup
        </Link>
      </div>
    </div>
  );
}
