import "./globals.css";
import Nav from "./Nav";
import { Roboto } from "@next/font/google";
import QueryWrapper from "./QueryWrapper";
import AuthContext from "./auth/AuthContext";

const roboto = Roboto({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-roboto"
});

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head />
            <body className={`mx-4 md:mx-48 xl:mx-96 ${roboto.variable}`}>
                <QueryWrapper>
                    <Nav />
                    {children}
                </QueryWrapper>
            </body>
        </html>
    );
}
