import { db } from "@/utils/firebase";
import {
  doc,
  DocumentData,
  getDoc,
  getDocs,
  query,
  where,
} from "@firebase/firestore";

const tableName = "Users";

interface UserData {
  userId: string;
  username: string;
  role: string;
}

export const getUsername = async (id: string) => {
  try {
    const userDoc = doc(db, tableName, id);
    const snapshot = await getDoc(userDoc);
    const user = snapshot.data() as UserData;

    return user.username;
  } catch (error) {
    console.error("Error fetching username:", error);
    throw error;
  }
};
