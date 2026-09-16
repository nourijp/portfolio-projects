"use client";

import Logo from "../logo";

const Header = () => {
    return (
        <header className="navbar top-0 left-0 z-999 w-full absolute">
            <div className="container">
                <nav className="py-7">
                    <div className="flex items-center justify-between gap-4 sm:gap-8">
                        <Logo />
                        <a
                            href="https://hamednouri.com"
                            className="text-sm sm:text-base text-secondary hover:text-primary transition-colors"
                        >
                            hamednouri.com &rarr;
                        </a>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
