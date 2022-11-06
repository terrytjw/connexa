import { GetServerSideProps } from "next";
import React, { useState, Fragment, useEffect, ChangeEvent } from "react";
import Image from "next/image";
import {
  auth,
  doc,
  getDownloadURL,
  getFirestore,
  ref,
  setDoc,
  storage,
  uploadBytesResumable,
} from "../../lib/firebase";
import TabGroup from "../../components/TabGroup";
import { User } from "../../types";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import PencilIcon from "@heroicons/react/24/outline/PencilIcon";
import { getUserProfileData } from "../api/getUserProfile/[username]";
import Rewards from "../../components/Rewards";

type UserProfilePageProps = {
  user: User;
  posts: any;
  comments: any;
};

const UserProfilePage = ({ user, posts, comments }: UserProfilePageProps) => {
  const router = useRouter();
  console.log("IN PROFILE PAGE USER DATA", comments);
  const numberOfPoints = user.points || 0;

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const [uploadedImageFile, setUploadedImageFile] = useState<File>();

  useEffect(() => {
    setUsername(user.username);
    setDisplayName(user.displayName);
    setImagePreview(user.photoURL);
  }, []);

  const handleUsername = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleDisplayName = (event: ChangeEvent<HTMLInputElement>) => {
    setDisplayName(event.target.value);
  };

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length !== 0) {
      const file = Array.from(event.target.files)[0];
      setUploadedImageFile(file);

      // for the edit profile image preview
      const objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl);
    }
  };

  const uploadFileToFirebase = (uid: string): Promise<string> => {
    const file = uploadedImageFile!;
    const extension = file.type.split("/")[1];

    // Makes reference to the storage bucket location
    const fileRef = ref(storage, `uploads/${uid}/${Date.now()}.${extension}`);

    // Starts the upload
    const task = uploadBytesResumable(fileRef, file);

    // Get downloadURL AFTER task resolves (Note: this is not a native Promise, can't use async/await with it)
    const downloadURL: Promise<string> = task
      .then(() => getDownloadURL(fileRef))
      .then((url: any) => {
        return url;
      });

    return downloadURL;
  };

  const handleSubmit = async () => {
    const uid = auth.currentUser && auth.currentUser.uid;
    const userRef = doc(getFirestore(), "users", uid!);

    let data = {
      ...user,
      displayName,
      username,
    };

    if (uploadedImageFile) {
      const downloadURL = await uploadFileToFirebase(uid!);
      data = { ...data, photoURL: downloadURL };
    }

    try {
      await setDoc(userRef, data);
      router.push(`/${username}`);
      toast.success("Profile saved.");
    } catch (error) {
      console.log(`Error updating profile -> ${error}`);
      toast.error("Error updating profile!");
    }

    setIsEditingProfile(false);
  };

  return (
    <div className="bg-slate-200 h-screen w-screen">
      <div className="m-auto flex flex-wrap justify-around max-w-7xl">
        <div className="relative mt-28 w-[23rem]">
          <div className="absolute top-[-4.5rem] left-[50%] translate-x-[-50%]">
            <Image
              className="rounded-full"
              src={user.photoURL}
              alt="Profile picture"
              width={200}
              height={200}
            />
          </div>

          <div className="flex flex-col justify-center text-center p-4 h-[35rem] bg-white border rounded-xl">
            <p className="mb-1 text-4xl font-bold">{user.displayName}</p>
            <p className="mb-4 text-gray-400">@{user.username}</p>
            <div className="flex justify-center mb-4">
              <Rewards points={numberOfPoints} />
            </div>
            <button
              onClick={() => setIsEditingProfile(true)}
              className="mx-12 p-1 font-medium border border-black rounded-3xl hover:bg-black hover:text-white transition-all"
            >
              Edit profile
            </button>
          </div>
        </div>

        <TabGroup posts={posts} />
      </div>

      <Transition appear show={isEditingProfile} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsEditingProfile(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="mb-4 text-lg font-medium leading-6 text-gray-900"
                  >
                    Edit profile
                  </Dialog.Title>

                  <div className="text-center">
                    <div>
                      <Image
                        className="rounded-full"
                        src={imagePreview}
                        alt="Profile picture"
                        width={100}
                        height={100}
                      />
                      {/* {console.log("imagePreview -> ", imagePreview)} */}
                    </div>

                    <label
                      className="relative bottom-8 left-8 group items-center rounded-full text-gray-400 cursor-pointer"
                      htmlFor="uploadFile"
                    >
                      <input
                        className="hidden"
                        id="uploadFile"
                        type="file"
                        // multiple
                        accept="image/x-png,image/jpg,image/jpeg"
                        onChange={onFileChange}
                      />
                      <div className="inline-block px-2 py-1 bg-gray-100 border border-gray-400 group-hover:border-gray-900 rounded-xl transition-all">
                        <PencilIcon
                          className="inline-block h-4 w-4 group-hover:text-gray-600 transition-all"
                          aria-hidden="true"
                        />
                      </div>
                    </label>
                  </div>

                  <div>
                    <label
                      htmlFor="displayName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Profile Name
                    </label>
                    <div className="mt-1">
                      <input
                        type="displayName"
                        name="displayName"
                        id="displayName"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        value={displayName}
                        onChange={handleDisplayName}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Username
                    </label>
                    <div className="mt-1">
                      <input
                        type="username"
                        name="username"
                        id="username"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        value={username}
                        onChange={handleUsername}
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-gray-400 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => setIsEditingProfile(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={handleSubmit}
                    >
                      Save
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default UserProfilePage;

export const getServerSideProps: GetServerSideProps = async ({
  query: urlQuery,
}) => {
  const { username } = urlQuery;
  const data = await getUserProfileData(username);

  if ("notFound" in data) {
    return { notFound: true };
  }

  return {
    props: data,
  };
};
