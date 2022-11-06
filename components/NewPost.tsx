import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { PaperClipIcon } from "@heroicons/react/20/solid";
import Button from "./Button";
import { UserContext } from "../lib/Context";
import toast from "react-hot-toast";
import { kebabCase } from "lodash";
import {
  auth,
  doc,
  getDownloadURL,
  getFirestore,
  ref,
  serverTimestamp,
  setDoc,
  storage,
  uploadBytesResumable,
} from "../lib/firebase";
import Loader from "./Loader";

type Props = {
  setCategory: any;
};

const NewPost = ({ setCategory }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState();
  const [uploadedFiles, setUploadedFiles] = useState<File[]>();

  const { user, username, isAuthLoading } = useContext(UserContext);

  const expandQuestionForm = () => {
    if (user && !isAuthLoading) {
      setIsExpanded(true);
    } else {
      toast.error("Please login first!");
    }
  };

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length !== 0) {
      setUploadedFiles(Array.from(event.target.files));
    }
  };

  // only call this function from handleSubmit
  const uploadFileToFirebase = (uid: string): Promise<string> => {
    const file = uploadedFiles![0];
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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { questionTitle, description } = event.currentTarget;

    const isTitleValid =
      questionTitle.value.length > 3 && questionTitle.value.length < 100;
    const isDescriptionValid = description.value.length < 1000;
    const isCategoryValid = selectedCategory !== undefined;

    if (isTitleValid) {
      if (isDescriptionValid) {
        if (isCategoryValid) {
          const uid = auth.currentUser && auth.currentUser.uid;
          const slug = encodeURI(kebabCase(questionTitle.value));

          const slugRef = doc(getFirestore(), "users", uid!, "posts", slug);

          // Tip: give all fields a default value here
          let data = {
            questionTitle: questionTitle.value,
            slug,
            uid,
            username,
            displayName: user.displayName,
            photoURL: auth.currentUser?.photoURL,
            content: description.value || "default content",
            category: selectedCategory,
            imageURL: "",
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            heartCount: 0,
          };

          if (uploadedFiles) {
            const downloadURL = await uploadFileToFirebase(uid!);
            data = { ...data, imageURL: downloadURL };
          }

          try {
            await setDoc(slugRef, data);
            toast.success("Question posted!");
            setCategory("all");
          } catch (error) {
            toast.error("Question posting error!");
          }

          handleCancel();
        } else {
          toast.error("Category is not selected!");
        }
      } else {
        toast.error("Description is too long!");
      }
    } else {
      toast.error("Title is either too short or too long!");
    }
  };

  const handleCancel = () => {
    setIsExpanded(false);
    setSelectedCategory(undefined);
    setUploadedFiles(undefined);
  };

  return !isExpanded ? (
    <div
      className="m-auto p-2 w-[80%] flex justify-between items-center bg-white rounded-lg border border-gray-300 shadow cursor-text"
      onClick={expandQuestionForm}
    >
      <div className="ml-4 text-gray-500 ">What am I wondering today?</div>
      <Button className="w-20">Ask</Button>
    </div>
  ) : (
    <form onSubmit={handleSubmit} className="relative m-auto w-[80%]">
      <div className="overflow-hidden rounded-lg border border-gray-300 shadow">
        <label htmlFor="questionTitle" className="sr-only">
          Question
        </label>
        <input
          type="text"
          name="questionTitle"
          id="questionTitle"
          className="p-4 pt-2.5 block w-full text-lg font-medium placeholder-gray-400 border-0 border-b border-gray-300 focus:border-gray-300"
          placeholder="Ask a question"
          autoFocus={true}
        />
        <label htmlFor="description" className="sr-only">
          Description
        </label>
        <textarea
          rows={5}
          name="description"
          id="description"
          className="appearance-none p-4 block w-full resize-none placeholder-gray-400 sm:text-sm border-0 focus:ring-0"
          placeholder="Try to be as descriptive as possible..."
          defaultValue={""}
        />

        <RadioGroup
          value={selectedCategory}
          onChange={setSelectedCategory}
          className="p-4"
        >
          <RadioGroup.Label className="">Pick a category</RadioGroup.Label>
          <div className="mt-2 flex flex-wrap gap-3">
            <RadioGroup.Option
              value="general"
              className={({ active, checked }) =>
                `${active ? "" : ""}
                  ${
                    checked
                      ? "text-yellow-600 bg-yellow-100 border-yellow-500"
                      : "bg-white border-gray-400"
                  }
                    text-gray-500 border-[1px] hover:text-yellow-600 hover:bg-yellow-100 hover:border-yellow-500 transition-all relative flex cursor-pointer rounded-lg px-2 py-1 shadow-md focus:outline-none`
              }
            >
              General
            </RadioGroup.Option>
            <RadioGroup.Option
              value="investing"
              className={({ active, checked }) =>
                `${active ? "" : ""}
                  ${
                    checked
                      ? "text-purple-600 bg-purple-100 border-purple-500"
                      : "bg-white border-gray-400"
                  }
                    text-gray-500 border-[1px] hover:text-purple-600 hover:bg-purple-100 hover:border-purple-500 transition-all relative flex cursor-pointer rounded-lg px-2 py-1 shadow-md focus:outline-none`
              }
            >
              Crypto Investing
            </RadioGroup.Option>
            <RadioGroup.Option
              value="defi"
              className={({ active, checked }) =>
                `${active ? "" : ""}
                  ${
                    checked
                      ? "text-blue-600 bg-blue-100 border-blue-500"
                      : "bg-white border-gray-400"
                  }
                    text-gray-500 border-[1px] hover:text-blue-600 hover:bg-blue-100 hover:border-blue-500 transition-all relative flex cursor-pointer rounded-lg px-2 py-1 shadow-md focus:outline-none`
              }
            >
              DeFi
            </RadioGroup.Option>

            <RadioGroup.Option
              value="nft"
              className={({ active, checked }) =>
                `${active ? "" : ""}
                  ${
                    checked
                      ? "text-green-600 bg-green-100 border-green-500"
                      : "bg-white border-gray-400"
                  }
                   text-gray-500 border-[1px] hover:text-green-600 hover:bg-green-100 hover:border-green-500 transition-all relative flex cursor-pointer rounded-lg px-2 py-1 shadow-md focus:outline-none`
              }
            >
              NFTs
            </RadioGroup.Option>

            <RadioGroup.Option
              value="metaverse"
              className={({ active, checked }) =>
                `${active ? "" : ""}
                  ${
                    checked
                      ? "text-red-500 bg-green-100 border-red-300"
                      : "bg-white border-gray-400"
                  }
                   text-gray-500 border-[1px] hover:text-red-500 hover:bg-red-100 hover:border-red-300 transition-all relative flex cursor-pointer rounded-lg px-2 py-1 shadow-md focus:outline-none`
              }
            >
              Gaming and Metaverse
            </RadioGroup.Option>
          </div>
        </RadioGroup>

        <div className="sm:flex m-4 justify-end gap-3">
          <label
            className="sm:inline-flex mr-auto group items-center rounded-full text-gray-400 cursor-pointer"
            htmlFor="uploadFile"
          >
            <input
              className="hidden"
              id="uploadFile"
              type="file"
              // multiple
              accept="image/x-png,image/gif,image/jpg,image/jpeg"
              onChange={onFileChange}
            />
            <div className="inline-block px-3 py-1 border border-gray-400 group-hover:border-gray-900 rounded-xl transition-all">
              <PaperClipIcon
                className="inline-block -ml-1 mr-2 h-5 w-5 group-hover:text-gray-600 transition-all"
                aria-hidden="true"
              />
              <span className="text-sm italic text-gray-500 group-hover:text-gray-600 transition-all">
                Attach a file
              </span>
            </div>
            <span className="p-2 sm:p-0 block sm:inline-flex ml-2 text-sm">
              {uploadedFiles && uploadedFiles[0].name}
            </span>
          </label>

          <div className="block sm:inline-flex">
            <button
              className="items-center mr-2 rounded-md border px-4 py-2 text-sm font-medium text-black hover:border-gray-700 transition-all focus:outline-none"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="items-center rounded-md border bg-black border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-700 transition-all focus:outline-none"
            >
              Ask
            </button>
          </div>
        </div>
      </div>

      {/* <div className="absolute inset-x-px bottom-0">
        <div className="flex items-center justify-between space-x-3 border-t border-gray-200 px-2 py-2 sm:px-3">
          <div className="flex">
            <button
              type="button"
              className="group -my-2 -ml-2 inline-flex items-center rounded-full px-3 py-2 text-left text-gray-400"
            >
              <PaperClipIcon
                className="-ml-1 mr-2 h-5 w-5 group-hover:text-gray-500"
                aria-hidden="true"
              />
              <span className="text-sm italic text-gray-500 group-hover:text-gray-600">
                Attach a file
              </span>
            </button>
          </div>
          <div className="flex-shrink-0">
            <button
              type="submit"
              className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Create
            </button>
          </div>
        </div>
      </div> */}
    </form>
  );
};

export default NewPost;
