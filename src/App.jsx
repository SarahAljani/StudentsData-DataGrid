// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { MantineProvider } from "@mantine/core";
import "./App.css";
import SecondeStudent from "./components/SecondeStudent";
import "@mantine/core/styles.css";

function App() {
  return (
    <MantineProvider>
      <SecondeStudent />
      {/* <StudentsTable /> */}
    </MantineProvider>
  );
}

export default App;
