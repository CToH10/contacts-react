import "./App.css";
import { UserProvider } from "./providers/user.provider";
import { BrowserRouter } from "react-router-dom";
import { RoutesApp } from "./routes/routes";
import { ThemeProvider } from "@mui/material";
import { theme } from "./globalStyle";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <UserProvider>
            <RoutesApp />
          </UserProvider>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
