import AppRouting from './routes/AppRouting';
import { Grommet, ResponsiveContext, Box } from 'grommet';
import { hpe } from 'grommet-theme-hpe';
import AppHeader from './components/navbars/AppHeader';

function App() {
  return (
    <Grommet theme={hpe} full>
      <ResponsiveContext.Consumer>
        {(size) => (
          <Box>
            <AppHeader />
            <AppRouting />
          </Box>
        )}
      </ResponsiveContext.Consumer>
    </Grommet>
  );
}

export default App;
