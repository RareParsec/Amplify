import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../config/axios.config.js";
import { auth } from "../../config/FirebaseConfig.js";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  deleteUser,
  signInAnonymously,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

const intialState = {
  currentUser: { firebase_id: null, username: null, email: null },
  loading: false,
  error: null,
  accessGranted: false,
};

//Maybe split this into a signup for firebase and signup for db
export const signUpFirebase = createAsyncThunk(
  "auth/signUpFirebase",
  async ({ email, password }, { rejectWithValue }) => {
    let userCredentials;
    try {
      userCredentials = await createUserWithEmailAndPassword(auth, email, password);

      const user = {
        firebase_id: userCredentials.user.uid,
        email: userCredentials.user.email,
      };

      console.log("Firebase User Created.");

      return user;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.code);
    }
  }
);

export const signUpDatabase = createAsyncThunk(
  "auth/signUpDatabase",
  async ({ firebase_id, username }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/api/auth/sign_up",
        {
          username: username,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await auth.currentUser.getIdToken()}`,
          },
        }
      );

      if (response.data.success === false) {
        return rejectWithValue({ errorType: "username", message: response.data.message });
      }

      const user = {
        firebase_id: firebase_id,
        username: username,
        email: response.data.email,
      };

      console.log("Database User Created.");
      return user;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.code || err.message);
    }
  }
);

export const logIn = createAsyncThunk("auth/logIn", async ({ email, password }, { rejectWithValue }) => {
  try {
    const userCredentials = await signInWithEmailAndPassword(auth, email, password);

    const response = await axios.post("/api/auth/get_username_by_firebase_id", {
      firebase_id: userCredentials.user.uid,
    });
    if (response.data.success === false) {
      return rejectWithValue("User not found");
    }
    const user = {
      firebase_id: userCredentials.user.uid,
      username: response.data.username || null,
      email: userCredentials.user.email,
    };

    // console.log(user);
    return user;
  } catch (err) {
    console.log(err.code);
    return rejectWithValue(err.code);
  }
});

export const signOut = createAsyncThunk("auth/signOut", async (_, { rejectWithValue }) => {
  try {
    await auth.signOut();
    console.log("Username signed out");
  } catch (err) {
    return rejectWithValue([{ message: err.code }]);
  }
});

export const continueWithGoogle = createAsyncThunk("auth/continueWithGoogle", async (_, { rejectWithValue }) => {
  try {
    const provider = new GoogleAuthProvider();
    const userCredentials = await signInWithPopup(auth, provider);

    const response = await axios.post("/api/auth/get_username_by_firebase_id", {
      firebase_id: userCredentials.user.uid,
    });

    if (response.data.success === false) {
      return rejectWithValue("Username not found");
    }

    const user = {
      firebase_id: userCredentials.user.uid,
      username: response.data.username || null,
      email: userCredentials.user.email,
    };

    return user;
  } catch (err) {
    console.log(err);

    return rejectWithValue(err.code || err.message || err);
  }
});

export const continueAnonymously = createAsyncThunk(
  "auth/continueAnonymously",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      await dispatch(signOut());
      dispatch(setLoading())
      const userCredentials = await signInAnonymously(auth);
      const user = {
        firebase_id: userCredentials.user.uid,
        username: null,
        email: null,
      };
      return user;
    } catch (err) {
      return rejectWithValue(err.code || err.message || err);
    }
  }
);

export const revertToIntialState = createAsyncThunk("auth/revertToIntialState", async (_, { rejectWithValue }) => {
  return intialState;
});

const authSlice = createSlice({
  name: "auth",
  initialState: intialState,
  reducers: {
    setError: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    clearError: (state) => {
      state.loading = false;
      state.error = null;
    },
    setCurrentUser: (state, { payload }) => {
      state.currentUser = payload;
      state.error = null;
    },
    setLoading: (state) => {
      state.loading = true;
    },
    clearLoading: (state) => {
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpDatabase.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(signUpDatabase.fulfilled, (state, { payload }) => {
        state.currentUser = { firebase_id: payload.firebase_id, username: payload.username, email: payload.email };
        state.loading = false;
        state.accessGranted = true;
      })
      .addCase(signUpDatabase.rejected, (state, { payload }) => {
        state.error = [{ errorType: payload.errorType || null, message: payload.message || payload }];
        state.loading = false;
      })
      .addCase(signUpFirebase.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(signUpFirebase.fulfilled, (state, { payload }) => {
        state.currentUser = { firebase_id: payload.firebase_id, username: payload.username, email: payload.email };
        state.loading = false;
      })
      .addCase(signUpFirebase.rejected, (state, { payload }) => {
        state.error = [{ errorType: payload.errorType || null, message: payload.message || payload }];
        state.loading = false;
      })
      .addCase(logIn.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(logIn.fulfilled, (state, { payload }) => {
        // state.currentUser = payload;       currenuser is already set by app.js
        state.loading = false;
        state.accessGranted = payload.username !== null ? true : false;
      })
      .addCase(logIn.rejected, (state, { payload }) => {
        state.error = [{ errorType: payload.errorType || null, message: payload.message || payload }];
        state.loading = false;
      })
      .addCase(continueWithGoogle.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(continueWithGoogle.fulfilled, (state, { payload }) => {
        // state.currentUser = { firebase_id: payload.firebase_id, username: payload.username, email: payload.email };
        state.loading = false;
        state.accessGranted = true;
      })
      .addCase(continueWithGoogle.rejected, (state, { payload }) => {
        state.error = [{ errorType: payload.errorType || null, message: payload.message || payload }];
        state.loading = false;
      })
      .addCase(continueAnonymously.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(continueAnonymously.fulfilled, (state, { payload }) => {
        // state.currentUser = { firebase_id: payload.firebase_id, username: payload.username, email: payload.email };
        state.loading = false;
        state.accessGranted = true;
      })
      .addCase(continueAnonymously.rejected, (state, { payload }) => {
        state.error = [{ errorType: payload.errorType || null, message: payload.message || payload }];
        state.loading = false;
      })
      .addCase(signOut.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.currentUser = { firebase_id: null, username: null, email: null };
        state.loading = false;
        state.accessGranted = false;
      })
      .addCase(signOut.rejected, (state, { payload }) => {
        state.error = [{ errorType: payload.errorType || null, message: payload.message || payload }];
        state.loading = false;
      })
      .addCase(revertToIntialState.fulfilled, (state) => {
        state = intialState;
      });
  },
});

export const { setError, clearError, setCurrentUser, setLoading, clearLoading } = authSlice.actions;
export default authSlice.reducer;

/**Aight, work on the frontend, create frontend email and password verifiers
 * Also make a controller function to check if username exists. It will be the first thing called in the signup function.
 */
