// import { ToastContainer } from "react-toastify";
import "./App.css";
import { ContactForm } from "./components/Forms/Contact";
// import { LoginForm } from "./components/Forms/Login";
// import { RegisterForm } from "./components/Forms/Register";
import { UserProvider } from "./providers/user.provider";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <UserProvider>
          {/* <LoginForm></LoginForm> */}
          {/* <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          /> */}
          {/* <RegisterForm></RegisterForm> */}
          <ContactForm></ContactForm>
        </UserProvider>
      </header>
    </div>
  );
}

export default App;
