import AppRouting from "./routes/AppRouting";
import { Grommet, ResponsiveContext } from "grommet";
import { hpe } from "grommet-theme-hpe";

function App() {
  return (
    <Grommet theme={hpe} full>
      <ResponsiveContext.Consumer>
        {(size) => <AppRouting />}
      </ResponsiveContext.Consumer>
    </Grommet>
  );
}

export default App;
