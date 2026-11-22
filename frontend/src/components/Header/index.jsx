import { Navbar, NavbarBrand } from "reactstrap";
import styles from "./styles.module.scss";
import logo from "./logo.png";
import { useContext } from "react";
import { UsersContext } from "../../contexts/UsersProvider";
import { ThemeContext } from "../../contexts/ThemeProvider";


const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { countUsers } = useContext(UsersContext)
  console.log("users: ", countUsers)
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img className={styles.img} src={logo} alt="Logo" />
        <h1>PWA</h1>
      </div>
      {countUsers !== 0 && (
        <div className={styles.counts}>Users: {countUsers}</div>
      )}
      <Navbar pills={true} container={false} className={styles.navBar}>
        <button onClick={toggleTheme}>{theme === "light" ? "Dark" : "Light"}</button>
        <NavbarBrand className={styles.link} href="/">
          Login
        </NavbarBrand>
        <NavbarBrand href="/">Register</NavbarBrand>
      </Navbar>
    </div>
  );
};

export default Header;
