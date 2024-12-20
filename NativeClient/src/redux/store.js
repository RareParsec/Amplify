import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import authReducer from "./slices/authSlice";
import globalVariablesReducer from "./slices/globalVariablesSlice";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  version: 1,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const rootReducer = combineReducers({ auth: persistedAuthReducer, globalVariables: globalVariablesReducer });

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
