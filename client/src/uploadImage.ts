import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { toast } from "react-toastify";
import { app } from "./firebase";

export const uploadImage = (
  file: File,
  setResult: React.Dispatch<React.SetStateAction<string>>
) => {
  const storage = getStorage(app);
  const fileName = new Date().getTime() + file.name;
  const storageRef = ref(storage, fileName);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

      switch (snapshot.state) {
        case "paused":
          break;
        case "running":
          break;
        default:
          break;
      }
    },
    (error) => {
      switch (error.code) {
        case "storage/unauthorized":
          toast.error("unauthorized");
          break;
        case "storage/canceled":
          toast.error("canceled");
          break;

        // ...

        case "storage/unknown":
          toast.error("server error, try again");
          break;

        default:
          toast.error("something went wrong, try again");
          break;
      }
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setResult(downloadURL);
      });
    }
  );
};
