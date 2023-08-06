import { HeaderBar } from "../components/HeaderBar";
import "./global.scss";
import "normalize.css/normalize.css";
import "@fontsource/ubuntu/300.css";
import "@fontsource/ubuntu/400.css";
import "@fontsource/ubuntu/500.css";
import "@fontsource/ubuntu/700.css";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <HeaderBar />
                <main>{children}</main>
                <footer>
                    <small>
                        This project is open source, and licensed under the GNU
                        AGPL 3.0. You can get the source code at our{" "}
                        <a href="https://github.com/DitherWither/essayo">
                            Github Repo
                        </a>
                    </small>
                </footer>
            </body>
        </html>
    );
}
