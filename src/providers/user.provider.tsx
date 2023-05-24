import { createContext, useState } from "react";
import { api } from "../service/api";
import { LoginData } from "../components/Forms/Login/login.validator";
import { AxiosError } from "axios";
import { RegisterData } from "../components/Forms/Register/register.validator";
// import { toast } from "react-toastify";

interface iUserProvider {
  loginSubmit: (data: LoginData) => Promise<void>;
  loading: boolean;
  registerSubmit: (data: RegisterData) => Promise<void>;
}

// interface iError {
//   response: {
//     data: {
//       message: string;
//     };
//   };
// }

export const UserContext = createContext<iUserProvider>({} as iUserProvider);

export const UserProvider = ({ children }: any) => {
  const [loading, setLoading] = useState(false);
  const [foundContacts, setFoundContacts] = useState([]);

  const headers = {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  const loginSubmit = async (data: LoginData) => {
    try {
      setLoading(true);
      const response = await api.post("login", data);
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      const apiError = error as AxiosError<any>;
      let message = apiError.response?.data.message || "";
      console.log(message);

      //   toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const registerSubmit = async (data: RegisterData) => {
    try {
      setLoading(true);
      await api.post("users", data);
    } catch (error) {
      const apiError = error as AxiosError<any>;
      let message = apiError.response?.data.message || "";
      console.log(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        loginSubmit,
        loading,
        registerSubmit,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
