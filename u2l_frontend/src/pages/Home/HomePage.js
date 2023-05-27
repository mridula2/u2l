import HomePageFooter from "./HomePageFooter";
import { Box } from "grommet";
import HomePageHeader from "./HomePageHeader";
import HomePageBody from "./HomePageBody";

const HomePage = () => {
  return (
    <Box
      data-testid="HomePage"
      background="background"
      width={{ max: "xxlarge" }}
      margin="auto"
      direction="column"
    >
      <HomePageHeader data-testid="HomePageHeader" />
      <Box align="center" justify="center" flex>
        <HomePageBody data-testid="login-body" />
      </Box>
      <HomePageFooter data-testid="login-footer" />
    </Box>
  );
};

export default HomePage;
