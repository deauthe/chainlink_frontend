import Link from "next/link";
import styles from "./Navbar.module.css";
import { IoSearch } from "react-icons/io5";
import Web3ConnectButton from "@/components/web3ConnectButton/web3ConnectButton";
import { useEffect, useState } from "react";

const Navbar = () => {
	const [isConnected, setConnected] = useState(false);

	return (
		<nav className={styles.navbar}>
			<div className={styles.logo}>
				<Link href="/">
					<img
						className={styles.logoImage}
						src="/assets/Memex.png"
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
			<Web3ConnectButton />
			<div className={styles.navLinks}>
				<Link className={styles.links} href="/profile">
					Profile
				</Link>
				<Link className={styles.links} href="/profile">
					Contests
				</Link>
				<Link className={styles.links} href="/marketplace">
					shop
				</Link>
				{}
				<Link className={styles.connectButton} href="/connectWallet">
					Connect Wallet
				</Link>
			</div>
		</nav>
	);
};

export default Navbar;
