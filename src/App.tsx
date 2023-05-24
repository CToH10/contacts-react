// import { ToastContainer } from "react-toastify";
import "./App.css";
import { UserProvider } from "./providers/user.provider";
import { BrowserRouter } from "react-router-dom";
import { RoutesApp } from "./routes/routes";
import { ThemeProvider } from "@mui/material";
import { theme } from "./globalStyle";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <UserProvider>
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
            <RoutesApp />
          </UserProvider>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
