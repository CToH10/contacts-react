import { createContext, useState } from "react";
import { api } from "../service/api";
import { LoginData } from "../components/Forms/Login/login.validator";
import { AxiosError } from "axios";
import { RegisterSubmission } from "../components/Forms/Register/register.validator";
import { ContactData } from "../components/Forms/Contact/contact.validator";
// import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface iUserProvider {
  loading: boolean;
  loginSubmit: (data: LoginData) => Promise<void>;
  registerSubmit: (data: RegisterSubmission) => Promise<void>;
  newContact: (data: ContactData) => Promise<void>;
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
  const navigate = useNavigate();

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
      navigate("/home");
    } catch (error) {
      const apiError = error as AxiosError<any>;
      let message = apiError.response?.data.message || "";
      console.log(message);

      //   toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const registerSubmit = async (data: RegisterSubmission) => {
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

  const newContact = async (data: ContactData) => {
    try {
      setLoading(true);
      await api.post("contacts", data, headers);
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
        loading,
        loginSubmit,
        registerSubmit,
        newContact,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
