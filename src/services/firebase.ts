import { FIREBASE_CONFIG } from "@src/config";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export const fbApp = initializeApp(FIREBASE_CONFIG);
export const fbAuth = getAuth(fbApp);