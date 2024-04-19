import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "@firebase/auth";
import { doc, setDoc } from "@firebase/firestore";

import { auth, db } from "@/utils/firebase";
import { getDoc } from "firebase/firestore";

interface User {
  userId: string;
  username: string;
  role: Role;
}

export enum Role {
  ADMIN = "admin",
  USER = "user",
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean | undefined;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; msg?: string }>;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<{ success: boolean; msg?: string }>;
  logout: () => Promise<{ success: boolean; msg?: string; error?: Error }>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(
    undefined
  );

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        updateUserData(user.uid);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    });
    return unsub;
  }, []);

  const updateUserData = async (userId: string) => {
    const docRef = doc(db, "Users", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      let data = docSnap.data();
      setUser({
        ...user,
        username: data.username,
        userId: data.userId,
        role: data.role,
      });
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (error) {
      let msg = (error as Error).message;
      if (msg.includes("(auth/invalid-email)")) msg = "Email không hợp lệ!";
      if (msg.includes("(auth/invalid-credential)"))
        msg = "Email hoặc mật khẩu không đúng!";
      return { success: false, msg: msg };
    }
  };

  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await setDoc(doc(db, "Users", response?.user?.uid), {
        username,
        userId: response?.user?.uid,
        role: Role.USER,
      });

      return { success: true, data: response?.user };
    } catch (error) {
      let msg = (error as Error).message;
      if (msg.includes("(auth/invalid-email)")) msg = "Email không hợp lệ!";
      if (msg.includes("(auth/email-already-in-use)"))
        msg = "Địa chỉ email đã được sử dụng!";
      return { success: false, msg: msg };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        msg: (error as Error).message,
        error: error as Error,
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error("useAuth must be wrapped inside AuthContextProvider");
  }
  return value;
};
