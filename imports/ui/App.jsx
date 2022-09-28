import {  HopeProvider } from "@hope-ui/solid"
import { AppRouting } from "./Router";


const config = {
  initialColorMode: "dark",
}
export const App = () => (
  <HopeProvider config={config}>
    <AppRouting/>
  </HopeProvider>
);


