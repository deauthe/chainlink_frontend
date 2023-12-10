import Link from "next/link";
import styles from "./Navbar.module.css";
import { IoSearch } from "react-icons/io5";
import Web3ConnectButton from "@/components/web3ConnectButton/web3ConnectButton";
import { Fontdiner_Swanky } from "next/font/google";

const Navbar = () => {
	return (
		<nav className={styles.navbar}>
			<div className={styles.logo}>
				<Link href="/">
					<img
						className={styles.logoImage}
						src="assets/Memex.jpeg"
						alt="Memex"
					/>
				</Link>
			</div>
			<div className={styles.searchbar}>
				<IoSearch className={styles.searchIcon} />
				<input
					placeholder="search memex creators"
					className={styles.searchbarInput}
				/>
			</div>
			<Web3ConnectButton className={styles.links} />
			<div className={styles.navLinks}>
				<Link className={styles.links} href="/profile">
					Profile
				</Link>
				<Link className={styles.links} href="/profile">
					Contests
				</Link>
				<Link className={styles.links} href="/">
					Explore
				</Link>
			</div>
		</nav>
	);
};

export default Navbar;
