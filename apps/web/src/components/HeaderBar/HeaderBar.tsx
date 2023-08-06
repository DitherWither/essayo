import styles from "./HeaderBar.module.scss";

export const HeaderBar = () => {
    return (
        <header className={styles.headerbar}>
            <a href="/">
                <h1>Essayo</h1>
            </a>
        </header>
    );
};
