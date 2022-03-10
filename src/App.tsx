import { createGlobalStyle } from "styled-components";
import ToDoList from "./ToDoList";

const GlobalStyle = createGlobalStyle`
`;

const App = () => {
  return (
    <>
      <GlobalStyle />
      <ToDoList />
    </>
  );
};

export default App;
