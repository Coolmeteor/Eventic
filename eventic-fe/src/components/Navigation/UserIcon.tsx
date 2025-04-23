import DefaultButton from "../DefaultButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { logout } from "@/utils/auth-api";

type Props = {
    isLogin: boolean;
}

export function UserIcon({
    isLogin,
}: Props) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    return (
        <div className="inline-block">
            <div
                className="relative"
                // onMouseEnter={() => setTimeout(() => setIsOpen(true), 500)}
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
            >
                {!isLogin ? (
                    <DefaultButton
                        bgColor={['000000', '000000', '000000']}
                        link={true}
                        href="/login"
                    >
                        <p>Login</p>
                    </DefaultButton>
                ) : (
                    <DefaultButton
                        bgColor={['000000', '000000', '000000']}
                         link={true}
                        href="/profile"
                        onClick={() => window.location.href = "/profile"}>
                        <FontAwesomeIcon
                            icon={faUser}
                        />
                    </DefaultButton>
                )}

                {/* Popup menu */}
                {isOpen && isLogin && (
                    <div
                        className="absolute right-0 mt-0 z-50"
                    >
                        <div className="relative w-40 h-10 overflow-visible z-50">
                            <div className="absolute right-0 top-3 w-32 bg-white text-black 
                                            shadow-md rounded-md z-50
                                            transform transition-all duration-300 ease-out
                                            translate-y-2 opacity-0
                                            animate-fade-in"
                            >
                                <button
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md"
                                    onClick={logout}
                                >
                                    Logout
                                </button>
                            </div>

                        </div>
                    </div>
                )}
            </div>
        </div>


    );
}