"use client";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Auth, db, storage } from "@/firebase";
import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function Register() {
  let { register, handleSubmit } = useForm();

  const [Err, setErr] = useState<boolean>(false);

  const router = useRouter();

  const formdata = async (data: any) => {
    //Password require atleast 6 characters for POST Request
    try {
      // authentication
      const response = await createUserWithEmailAndPassword(
        Auth,
        data.email,
        data.password
      );

      // upload files

      const res = ref(storage, data.name);

      const uploadTask = uploadBytesResumable(res, data.file[0]);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Handle progress
          console.log(snapshot.bytesTransferred, snapshot.totalBytes);
        },
        (error) => {
          // Handle errors
          console.error("Error in upload:", error);
          setErr(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then(async (downloadURL) => {
              // Update user profile with downloadURL
              updateProfile(response.user, {
                displayName: data.name,
                photoURL: downloadURL,
              });
              // Add userData in collection
              await setDoc(doc(db, "users", response.user.uid), {
                name: data.name,
                email: data.email,
                id: response.user.uid,
                avatar: downloadURL,
              });
              await setDoc(doc(db, "chatroom", response.user.uid), {});
              // After register nevigate to the homepage
              router.push("/");
            })
            .catch((error) => {
              console.error("Error getting download URL:", error);
              setErr(true);
            });
        }
      );
    } catch (error) {
      console.log(error);
      setErr(true);
    }
  };

  return (
    <div className="formcontainer">
      <div className="forwrapper">
        <span className="logo">Logo</span>
        <span className="tite">Register</span>
        <form action="" onSubmit={handleSubmit(formdata)}>
          <input
            {...register("name")}
            type="text"
            title="text"
            placeholder="dislpay name"
          />
          <input
            {...register("email")}
            type="email"
            title="email"
            placeholder="email"
          />
          <input
            {...register("password")}
            type="password"
            title="password"
            placeholder="password"
          />
          <input
            {...register("file")}
            style={{ display: "none" }}
            type="file"
            id="file"
            title="file"
            placeholder=""
          />
          <label htmlFor="file">
            <Image width={40} height={40} src={"/imgs/avatar.png"} alt="" />
            <span>Add an Avatar</span>
          </label>
          <button>Sign up</button>
        </form>
        {Err && <span>Something went wrong</span>}
        <p>Do you have an account? <Link href={'/login'}>Login</Link></p>
      </div>
    </div>
  );
}
