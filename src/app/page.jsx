"use client";
import Home from "@/app/home/Home";
import Navbar from "@/components/Navbar/Navbar";
import Profile from "@/app/profile/profile";

export default function App() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			{/* <Navbar /> */}
			<Home />
			{/* <Profile /> */}
		</main>
	);
}
