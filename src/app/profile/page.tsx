"use client";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center">
      <h1>Welcome to your Profile</h1>
      <button
        onClick={logout}
        className="font-medium my-2 rounded-lg text-sm px-5 py-2.5 text-center bg-purple-500 hover:bg-primary-700 focus:ring-primary-800"
      >
        Logout
      </button>
    </div>
  );
}
