import { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "../../lib/Context";
import {
  doc,
  getFirestore,
  writeBatch,
  getDoc,
  serverTimestamp,
} from "../../lib/firebase";
import { debounce } from "lodash";
import UsernameMessage from "./UsernameMessage";
import Button from "../Button";
import { notificationTypes } from "../../constants";

const UsernameForm = () => {
  const [formValue, setFormValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, username } = useContext(UserContext);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Create refs for both documents
    const userDoc = doc(getFirestore(), "users", user.uid);
    const usernameDoc = doc(getFirestore(), "usernames", formValue);
    const notificationDoc = doc(
      getFirestore(),
      "users",
      user.uid,
      "notifications",
      notificationTypes.welcome
    );

    // Commit both docs together as a batch write.
    const batch = writeBatch(getFirestore());
    batch.set(userDoc, {
      username: formValue,
      photoURL: user.photoURL,
      displayName: user.displayName,
    });
    batch.set(usernameDoc, { uid: user.uid });
    batch.set(notificationDoc, {
      from: "connexa",
      to: formValue,
      createdAt: serverTimestamp(),
      content: "Welcome to connexa, the community forum for crypto degens.",
    });

    await batch.commit();
  };

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    // Force form value typed in form to match correct format
    const val = e.currentTarget.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    // Only set form value if length is < 3 OR it passes regex
    if (val.length < 3) {
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
    }

    if (re.test(val)) {
      setFormValue(val);
      setLoading(true);
      setIsValid(false);
    }
  };

  useEffect(() => {
    checkUsername(formValue);
  }, [formValue]);

  // Hit the database for username match after each debounced change
  // useCallback is required for debounce to work
  const checkUsername = useCallback(
    debounce(async (username: string) => {
      if (username.length >= 3) {
        const ref = doc(getFirestore(), "usernames", username);
        const snap = await getDoc(ref);
        setIsValid(!snap.exists());
        setLoading(false);
      }
    }, 500),
    []
  );

  return (
    <>
      {/* bg overlay */}
      <div className="fixed top-0 left-0 h-screen w-screen bg-black opacity-50"></div>

      <div className="p-8 w-[90%] max-w-[25rem] fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white rounded-lg">
        <h3 className="font-bold text-xl mb-4">Pick a username!</h3>
        <form className="flex flex-col" onSubmit={onSubmit}>
          <input
            className="p-2 mb-2 border-[1.5px] border-gray-400 rounded outline-gray-500"
            name="username"
            placeholder="e.g. connexa"
            autoComplete="off"
            value={formValue}
            onChange={onChange}
          />

          <UsernameMessage
            username={formValue}
            isValid={isValid}
            loading={loading}
          />

          <Button type="submit" className="mt-4" disabled={!isValid}>
            Confirm
          </Button>
        </form>
      </div>
    </>
  );
};

export default UsernameForm;
