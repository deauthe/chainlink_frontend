import Link from "next/link";
import styles from "./Navbar.module.css";
import SearchIcon from "@mui/icons-material/Search";
import Web3ConnectButton from "@/components/web3ConnectButton/web3ConnectButton";

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
				<SearchIcon className={styles.searchIcon} />
				<input placeholder="search memex" className={styles.searchbarInput} />
			</div>
			<Web3ConnectButton className={styles.links} />
			<div className={styles.navLinks}>
				<Link className={styles.links} href="/profile">
					Profile
				</Link>
				<Link className={styles.links} href="/services">
					Mint
				</Link>
				<Link className={styles.links} href="/">
					Explore
				</Link>
			</div>
		</nav>
	);
};

export default Navbar;
