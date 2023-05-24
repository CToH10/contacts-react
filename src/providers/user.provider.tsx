import { createContext, useState } from "react";
import { api } from "../service/api";
import { LoginData } from "../components/Forms/Login/login.validator";
import { AxiosError } from "axios";
import { RegisterSubmission } from "../components/Forms/Register/register.validator";
import { ContactData } from "../components/Forms/Contact/contact.validator";
// import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { EditProfileData } from "../components/Forms/Edit/edit.validators";

interface iUserProvider {
  loading: boolean;
  foundContacts: iProfile[];
  user: iProfile;
  loginSubmit: (data: LoginData) => Promise<void>;
  registerSubmit: (data: RegisterSubmission) => Promise<void>;
  newContact: (data: ContactData) => Promise<void>;
  contactsList: () => Promise<void>;
  editProfile: (data: EditProfileData) => Promise<void>;
}

interface iDecoded {
  email: string;
  sub: string;
  iat: number;
  exp: number;
}

export interface iProfile {
  email: string;
  fullName: string;
  id: string;
  phone: string;
  registered: string;
  userId: string;
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
  const [foundContacts, setFoundContacts] = useState([] as iProfile[]);
  const [user, setUserInfo] = useState({} as iProfile);
  const navigate = useNavigate();

  const token = localStorage.getItem("token") || null;
  const decoded: iDecoded | null = token ? jwt_decode(token) : null;

  const headers = {
    headers: {
      authorization: `Bearer ${token}`,
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

  const contactsList = async () => {
    try {
      const list = await api.get(`/users/${decoded!.sub}`, headers);
      setFoundContacts(list.data.contacts);
      setUserInfo(list.data);
    } catch (error) {
      console.log(error);
    }
  };

  const editProfile = async (data: EditProfileData) => {
    try {
      await api.patch(`users/${decoded!.sub}`, data, headers);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        loading,
        user,
        foundContacts,
        loginSubmit,
        registerSubmit,
        newContact,
        contactsList,
        editProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
