import React, { FC, useEffect, useState } from "react";
import { Wrapper } from "../assets/wrappers/UploadVideo";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { toast } from "react-toastify";
import { VideoT } from "../Types";
import { app } from "../firebase";
import { fetch } from "../axiosRequest";
import { useNavigate } from "react-router-dom";
interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const UploadVideo: FC<Props> = ({ setOpen }) => {
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [thumbLoader, setThumbLoader] = useState<number>(0);
  const [vidLoader, setVidLoader] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [media, setMedia] = useState<VideoT>({} as VideoT);
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setVideo(e.target.files[0]);
    }
  };
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setThumbnail(e.target.files[0]);
    }
  };

  const handleTags = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTags(e.target.value.split(","));
  };

  const uploadFile = (file: File, urlType: keyof VideoT) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    //uploading

    setLoading(true);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        urlType === "imgUrl"
          ? setThumbLoader(Math.round(progress))
          : setVidLoader(Math.round(progress));

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
          setMedia({ ...media, [urlType]: downloadURL });
          setLoading(false);
        });
      }
    );
  };

  const handleUpload = async () => {
    if (!title) {
      return toast.error("Please provide a title");
    }
    if (!desc) {
      return toast.error("Please provide description");
    }

    if (tags.length < 1) {
      return toast.error("Please provide tags");
    }

    if (!video) {
      return toast.error("Please provide a video");
    }
    if (!thumbnail) {
      return toast.error("Please provide a thumbnail");
    }
    if (loading) return;

    try {
      const { data } = await fetch.post("/videos", {
        ...media,
        title,
        desc,
        tags,
      });
      setOpen(false);
      navigate(`/video/${data._id}`);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    video && uploadFile(video, "videoUrl");
  }, [video]);

  useEffect(() => {
    thumbnail && uploadFile(thumbnail, "imgUrl");
  }, [thumbnail]);

  return (
    <Wrapper>
      <div className="container">
        <span className="close" onClick={() => setOpen(false)}>
          X
        </span>
        <h1 className="title">Upload A New Video</h1>

        <label htmlFor="video">Add Video:</label>
        <>
          {vidLoader > 0 ? (
            "Uploading video.. " + vidLoader + "%"
          ) : (
            <input
              id="video"
              type="file"
              accept="video/*"
              onChange={handleVideo}
              disabled={loading}
            />
          )}
        </>

        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <textarea
          name="desc"
          placeholder="Description.."
          rows={8}
          onChange={(e) => setDesc(e.target.value)}
          value={desc}
        ></textarea>
        <input
          type="text"
          placeholder="Separate tags with comma"
          onChange={handleTags}
          value={tags}
        />
        <label>Thumbnail:</label>
        <>
          {thumbLoader > 0 ? (
            "Uploading thumbnail.. " + thumbLoader + "%"
          ) : (
            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              disabled={loading}
            />
          )}
        </>
        <button className="submit" onClick={handleUpload} disabled={loading}>
          {loading ? "Please wait .." : " Upload"}
        </button>
      </div>
    </Wrapper>
  );
};

export default UploadVideo;
