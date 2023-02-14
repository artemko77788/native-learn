import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import auth from "../../firebase/config";
import { authSlice } from "./authReduser";

const { updateUserProfile, authSignOut, authStateChange } = authSlice.actions;

const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
      console.log(error.message);
    }
  };

const authSignUpUser =
  ({ nickname, email, password }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(auth.currentUser, {
        displayName: nickname,
      });

      const { uid, displayName } = auth.currentUser;

      const userUpdateProfile = {
        userId: uid,
        nickname: displayName,
      };

      dispatch(updateUserProfile(userUpdateProfile));
    } catch (error) {
      console.log(error);
    }
  };

const authSignOutUser = () => async (dispatch, getState) => {
  await signOut(auth)
    .then(() => {
      dispatch(authSignOut());
    })
    .catch((error) => {
      console.log(error);
    });
};

const authStateChangeUser = () => async (dispatch, getState) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userUpdateProfile = {
        userId: user.uid,
        nickname: user.displayName,
      };
      dispatch(updateUserProfile(userUpdateProfile));
      dispatch(authStateChange({ stateChange: true }));
    }
  });
};

export { authSignInUser, authSignUpUser, authSignOutUser, authStateChangeUser };
