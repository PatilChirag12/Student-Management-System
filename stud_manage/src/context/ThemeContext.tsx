import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

interface ThemeContextType {
    darkMode: boolean;
    toggleDarkMode: () => void;
}

const ThemeContext =
    createContext<ThemeContextType | undefined>(
        undefined
    );

export function ThemeProvider({
    children
}: {
    children: React.ReactNode;
}) {

    const [
        darkMode,
        setDarkMode
    ] = useState(() => {

        const savedTheme =
            localStorage.getItem(
                "darkMode"
            );

        return savedTheme === "true";

    });


    useEffect(() => {

        localStorage.setItem(
            "darkMode",
            String(darkMode)
        );

        document.body.classList.toggle(
            "dark-mode",
            darkMode
        );

    }, [darkMode]);


    const toggleDarkMode = () => {

        setDarkMode(
            previous => !previous
        );

    };


    return (

        <ThemeContext.Provider
            value={{
                darkMode,
                toggleDarkMode
            }}
        >
            {children}
        </ThemeContext.Provider>

    );
}


export function useTheme() {

    const context =
        useContext(ThemeContext);

    if (!context) {

        throw new Error(
            "useTheme must be used inside ThemeProvider"
        );

    }

    return context;
}