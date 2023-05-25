import { createContext, useState } from "react";
import { api } from "../service/api";
import { LoginData } from "../components/Forms/Login/login.validator";
import { AxiosError } from "axios";
import { RegisterSubmission } from "../components/Forms/Register/register.validator";
import { ContactData } from "../components/Forms/Contact/contact.validator";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import {
  EditContactData,
  EditProfileData,
} from "../components/Forms/Edit/edit.validators";
import { toast } from "react-hot-toast";

interface iUserProvider {
  loading: boolean;
  foundContacts: iProfile[];
  user: iProfile;
  loginSubmit: (data: LoginData) => Promise<void>;
  registerSubmit: (data: RegisterSubmission) => Promise<void>;
  newContact: (data: ContactData) => Promise<void>;
  contactsList: (queryParam?: string) => Promise<void>;
  editProfile: (data: EditProfileData) => Promise<void>;
  deleteContact: (id: string) => Promise<void>;
  editContact: (id: string, data: EditContactData) => Promise<void>;
  deleteUser: () => Promise<void>;
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
      toast.error(message);

      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const registerSubmit = async (data: RegisterSubmission) => {
    try {
      setLoading(true);
      await api.post("users", data);

      toast.success("Account registered");
    } catch (error) {
      const apiError = error as AxiosError<any>;
      let message = apiError.response?.data.message || "";
      toast.error(message);

      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const newContact = async (data: ContactData) => {
    try {
      setLoading(true);
      await api.post("contacts", data, headers);

      toast.success("New contact saved");
    } catch (error) {
      const apiError = error as AxiosError<any>;
      let message = apiError.response?.data.message || "";
      toast.error(message);

      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const contactsList = async (queryParam?: string) => {
    try {
      let contactsRoute: string = `/contacts`;

      if (queryParam) {
        contactsRoute = `contacts?name=${queryParam}`;
      }

      const list = await api.get(contactsRoute, headers);
      setFoundContacts(list.data);
      setUserInfo(list.data);
    } catch (error) {
      const apiError = error as AxiosError<any>;
      let message = apiError.response?.data.message || "";
      toast.error(message);

      console.error(error);
    }
  };

  const editProfile = async (data: EditProfileData) => {
    try {
      await api.patch(`users/${decoded!.sub}`, data, headers);

      toast.success("Profile updated");
    } catch (error) {
      const apiError = error as AxiosError<any>;
      let message = apiError.response?.data.message || "";
      toast.error(message);

      console.error(error);
    }
  };

  const deleteContact = async (id: string) => {
    try {
      await api.delete(`contacts/${id}`, headers);

      toast.success("Contact deleted");
    } catch (error) {
      const apiError = error as AxiosError<any>;
      let message = apiError.response?.data.message || "";
      toast.error(message);

      console.error(error);
    }
  };

  const editContact = async (id: string, data: EditContactData) => {
    try {
      await api.patch(`contacts/${id}`, data, headers);

      toast.success("Contact edited");
    } catch (error) {
      const apiError = error as AxiosError<any>;
      let message = apiError.response?.data.message || "";
      toast.error(message);

      console.error(error);
    }
  };

  const deleteUser = async () => {
    try {
      await api.delete(`users/${decoded!.sub}`, headers);

      toast.success("User deleted");
    } catch (error) {
      const apiError = error as AxiosError<any>;
      let message = apiError.response?.data.message || "";
      toast.error(message);

      console.error(error);
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
        deleteContact,
        editContact,
        deleteUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
