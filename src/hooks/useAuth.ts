import { AuthContext } from "@src/context";
import { useContext } from "react";

export default function useAuth() {
    const value = useContext(AuthContext);
    if (!value) {
        throw new Error("useAuth can only be used in AuthProvider!")
    }
    return value
}