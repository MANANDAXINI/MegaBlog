// LogoutBtn.jsx

import { useDispatch } from "react-redux";
import authService, { logout } from "../../appwrite/auth"; // Importing authService and logout function
import { useEffect } from "react";

function LogoutBtn() {
    const dispatch = useDispatch();

    const logoutHandler = async () => {
        try {
            await logout(); // Using the logout function from auth.js
            dispatch(authService.logout()); // Optionally dispatching logout action if needed
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    useEffect(() => {
        return () => {
            // Cleanup logic if needed
        };
    }, []);

    return (
        <button
            className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
            onClick={logoutHandler}
        >
            Logout
        </button>
    );
}

export default LogoutBtn;
