import { Public } from "./apps/Public";
import { Private } from "./apps/Private";
import { useContext } from "react";
import { TokenContext } from "./context/TokenContext";

function App() {
  const { token } = useContext(TokenContext);

  return <div className="App">{token ? <Private /> : <Public />}</div>;
}

export default App;
