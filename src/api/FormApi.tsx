import { db, formRef, storage } from "@/utils/firebase";
import {
  addDoc,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "@firebase/firestore";
import {
  deleteObject,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "@firebase/storage";

const tableName = "Forms";

interface FormData {
  userId?: string;
  scientificName: string;
  name: string;
  characteristic: string;
  behavior: string;
  habitat: string;
  oldImageUrl?: string;
  imageUrl?: string;
  type?: string;
  submissionDate?: string;
  status?: string;
}

export const getNumberFormWithStatus = async (status?: string) => {
  try {
    const q = status
      ? query(formRef, where("status", "==", status))
      : query(formRef);
    const snapshot = await getDocs(q);

    const number = snapshot.docs.length;
    return number;
  } catch (error) {
    console.error("Error fetching number of forms:", (error as Error).message);
    throw error;
  }
};

export const getFormDataById = async (formID: string) => {
  try {
    const formDoc = doc(db, tableName, formID);
    const snapshot = await getDoc(formDoc);
    const forms = snapshot.data();

    return { ...forms, id: formID };
  } catch (error) {
    console.error("Error fetching form data by ID:", (error as Error).message);
    return {};
  }
};

export const getFormsDataByUserId = async (userId: string) => {
  try {
    const q = query(formRef, where("userId", "==", userId));
    const snapshot = await getDocs(q);

    const forms = snapshot.docs.map((doc) => ({
      ...doc.data(),
      formId: doc.id,
    }));
    return forms;
  } catch (error) {
    console.error(
      "Error fetching form data by UserID:",
      (error as Error).message
    );
    return [];
  }
};

export const addFormData = async (data: FormData) => {
  try {
    const addDocPromise = await addDoc(formRef, { ...data, imageUrl: "" });

    if (data.imageUrl) {
      const { downloadUrl } = await uploadImageToFirebase(data.imageUrl);
      await updateDoc(addDocPromise, { imageUrl: downloadUrl });
    }

    return { success: true };
  } catch (error) {
    return { success: false, msg: (error as Error).message };
  }
};

export const updateFormInformation = async (formId: string, data: FormData) => {
  try {
    const docRef = doc(db, tableName, formId);

    if (data.oldImageUrl || data.oldImageUrl === "") {
      if (data.oldImageUrl !== "") deleteImage(data.oldImageUrl);
      delete data.oldImageUrl;
      if (data.imageUrl) {
        const { downloadUrl } = await uploadImageToFirebase(data.imageUrl);
        data.imageUrl = downloadUrl;
      }
    }

    await updateDoc(docRef, { ...data });
    return { success: true };
  } catch (error) {
    return { success: false, msg: (error as Error).message };
  }
};

export const deleteForm = async (formData: DocumentData) => {
  try {
    await deleteDoc(doc(db, tableName, formData.id));
    if (formData.imageUrl) {
      deleteImage(formData.imageUrl);
    }

    return true;
  } catch (error) {
    console.error("Error deleting form:", (error as Error).message);
    return false;
  }
};

const uploadImageToFirebase = async (
  imageUrl: string
): Promise<{ downloadUrl: string }> => {
  const imageRef = ref(storage, `form/${imageUrl.split("/").pop()}`);

  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    const uploadTask = uploadBytesResumable(imageRef, blob);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Optional: Handle progress updates if needed
        },
        (error) => {
          reject(error);
        },
        async () => {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          resolve({ downloadUrl });
        }
      );
    });
  } catch (error) {
    console.error("Error uploading image:", (error as Error).message);
    throw error;
  }
};

const deleteImage = (imageUrl: string) => {
  try {
    const imageRef = ref(storage, imageUrl);
    deleteObject(imageRef);
  } catch (error) {
    console.error("Error deleting image:", (error as Error).message);
  }
};
