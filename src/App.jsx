import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, SocialLinks, Works, StarsCanvas, Footer } from "./components";
import { ThemeProvider, useThemeContext } from "./context/ThemeContext";

const AppContent = () => {
    const { theme } = useThemeContext();

    return (
        <BrowserRouter>
            <div className='relative z-0 bg-primary'>
                <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
                    <Navbar theme={theme} />
                    <Hero />
                </div>
                <About />
                <Experience />
                <Tech />
                <SocialLinks />
                <Works />
                <Feedbacks />
                <div className='relative z-0'>
                    <Contact />
                    <StarsCanvas />
                    <Footer />
                </div>
            </div>
        </BrowserRouter>
    );
};

const App = () => {
    // Initialize theme before render to prevent flash
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <ThemeProvider>
            <AppContent />
        </ThemeProvider>
    );
};

export default App;
