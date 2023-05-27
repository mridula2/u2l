import {
  ResponsiveContext,
  Header,
  Nav,
  Button,
  Menu,
  Text,
  Box,
} from "grommet";
import { useContext } from "react";
import { Hpe, Search, Projects, Language } from "grommet-icons";
import { Link, useNavigate } from "react-router-dom";

const homePageHeaderLinks = [
  {
    label: "HPE GreenLake",
    path: "https://www.hpe.com/emea_europe/en/greenlake.html",
    onClick:()=>{window.location.replace(homePageHeaderLinks[0].path);}
  },
  {
    label: "Products",
    path: "https://www.hpe.com/emea_europe/en/products.html",
    onClick:()=>{window.location.replace(homePageHeaderLinks[1].path);}
  },
  {
    label: "Support",
    path: "https://www.hpe.com/emea_europe/en/services.html",
    onClick:()=>{window.location.replace(homePageHeaderLinks[2].path);}
  },
  { label: "Contact", path: "https://www.hpe.com/uk/en/contact-hpe.html",
    onClick:()=>{window.location.replace(homePageHeaderLinks[3].path);} },
  { label: "Login", path: "/login",
    onClick:()=>{window.location.replace(homePageHeaderLinks[4].path);} },
];
const HomePageHeader = () => {
  const size = useContext(ResponsiveContext);
  const navigate = useNavigate();
  return (
    <Header margin={{ top: "xsmall" }}>
      <Box direction="column" gap="none" margin={{ left: "medium" }}>
        <Hpe color="plain" size="large" />
        <Box>
          <Text color="text-strong" size="medium" weight="bold">
            Hewlett Packard
          </Text>
          <Text color="text-strong" size="medium">
            Enterprise
          </Text>
        </Box>
      </Box>
      {!["xsmall", "small"].includes(size) ? (
        <Nav direction="row" gap="small">
          {homePageHeaderLinks.map((item) => (
            <Button label={item.label} key={item.label} href={item.path} />
          ))}
        </Nav>
      ) : (
        <Menu label="Menu" items={homePageHeaderLinks} />
      )}
      <Box direction="row">
        <Box margin={{ right: "medium" }}>
          <Search />
        </Box>
        <Box margin={{ right: "medium" }}>
          <Link to="/projects">
            <Projects />
          </Link>
        </Box>
        <Box margin={{ right: "medium" }}>
          <Language />
        </Box>
      </Box>
    </Header>
  );
};
export default HomePageHeader;
