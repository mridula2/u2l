import HomePageBG from "../../assets/Images/HomePageBG.png";
import { Box, Heading, Card, CardHeader } from "grommet";
// import LoginView from "../LoginView";
import LinksPage from "./LinksPage";

const divStyle = {
  backgroundImage: `url(${HomePageBG})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "100% 100%",
  height: "50vh",
  width: "100%",
};

const HomePageBody = () => {
  return (
    <Box fill responsive={true} data-testid="overview">
      <Box style={divStyle} fill direction="row" align="center">
        {/* on this signin component will come */}
        <Box
          margin={{ left: "xlarge"}}
        >
          <Heading
            font="MetricHPEXS"
            style={{ height: "70px", color: "white" }}
          >
            HPE Code Assessment Suite
          </Heading>
        </Box>
{/* 
        <Box>
          <Card style={LoginFormCardStyle} margin={{ left: "250px" }}>
            <LoginView />
          </Card>
        </Box> */}

      </Box>
      <Box margin="auto" fill direction="row">
        <LinksPage />
      </Box>
    </Box>
  );
};

export default HomePageBody;
