import React from "react";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-9xl font-bold">404</h1>
      <h2 className="text-2xl font-semibold mb-3">Page Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/" className="mt-4 font-semibold">
        Return Home
      </Link>
    </div>
  );
};

export default NotFound;
