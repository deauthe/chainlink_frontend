import Link from "next/link";
import styles from "./Navbar.module.css";
import SearchIcon from "@mui/icons-material/Search";
import Image from "next/image";

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
			<div className={styles.navLinks}>
				<Link href="/about">About</Link>
				<Link href="/services">Mint</Link>
				<Link href="/contact">Explore</Link>
			</div>
		</nav>
	);
};

export default Navbar;
