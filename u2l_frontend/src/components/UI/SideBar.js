import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "styled-components";
import { Box, Button, Sidebar } from "grommet";
// import { Clock, Apps, Terminal, Chat, StatusUnknown } from 'grommet-icons';

const SideBar = () => {
  const theme = useContext(ThemeContext);

  return (
    // <Sidebar
    // // background={{ color: !theme.dark ? "background" : "blue", dark: false }}
    // // pad="small"
    // // height for demo purposes only, remove in production
    // // height="100%"
    // // margin={{ top: "100" }}
    // >
    //   {/* <Box
    //     flex="grow"
    //     // pad="small"
    //     align="start"
    //     justify="start"
    //     gap="medium"
    //     border={{ side: "right", color: "border-weak" }}
    //   > */}
    //     <Button label="Projects" href="/dashboard" />
    //     {/* <Button label="Issues" />
    //     <Button label="Rules" />
    //     <Button label="Quality Profiles" />
    //     <Link to="/SigninView">
    //       <Button label="Quality Gates" onClick={() => {}} />
    //     </Link>
    //     <Button label="Administration" /> */}
    //   {/* </Box> */}
    // </Sidebar>
    <Box
      // margin={{left:"small"}}
      direction="column"
      border={{ color: "grey", size: "xsmall", style: "solid", side: "right" }}
      width='small'
      height='91vh'
      // style={styles.navBar}
      responsive={true}
    >
      <Button label="Projects" href="/dashboard" style={styles.btn} />
      {/* <Button label="Issues" />
      <Button label="Rules" />
      <Button label="Quality Profiles" />
      <Link to="/SigninView">
        <Button label="Quality Gates" onClick={() => {}} />
      </Link>
      <Button label="Administration" /> */}
    </Box>
  );
};

const styles = {
  // navBar: {
  //   display: "inline-flex",
  //   borderRight: "1px solid grey",
  //   height: "100%",
  //   flexDirection: "column",
  //   alignItems: "flex-start",
  //   width: "200px",
  // },
  btn: { width: "100%", textAlign: "left", marginTop: "10px",height:'7%' },
};

export default SideBar;

//---------------------------------------------------------------------------------------------
// import React, { useContext, useNavigate } from "react";
// import { ThemeContext } from "styled-components";
// import { Box, Button, Sidebar, Nav, Menu, ResponsiveContext } from "grommet";
// // import { Clock, Apps, Terminal, Chat, StatusUnknown } from 'grommet-icons';

// const items = [
//   { label: 'Projects' , path: '/dashboard' },
//   { label: 'Issues', path: '/' },
//   { label: 'Rules', path: '/' },
//   { label: 'Quality Profiles', path: '/QualityGates' },
//   { label: 'Quality Gates', path: '/qualitygates' },
//   { label: 'Administration', path: '/' },
// ];

// const SideBar = () => {
//   const theme = useContext(ThemeContext);
//   const size = useContext(ResponsiveContext);
//   const navigate = useNavigate()

//   return (
//     <Sidebar
//       background={{ color: !theme.dark ? "background" : "blue", dark: false }}
//       pad="small"
//       flex-start
//       // height for demo purposes only, remove in production
//       height="100%"
//       margin={{ top: "100" }}
//     >
//        <Box direction="column" gap="medium" align="center" justify="center" flex >
//                     {!['xsmall', 'small'].includes(size) ? (
//                         <Nav direction="row" gap="small">
//                             {items.map(item => (
//                                 <Button label={item.label} key={item.label} onClick={()=>{navigate(`${item.path}`)}} />
//                             ))}
//                         </Nav>
//                     ) : (
//                         <Menu label="Menu" items={items} />
//                     )}

//                 </Box>
//     </Sidebar>
//   );
// };

// export default SideBar;

//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////


// import React, { useContext } from "react";
// import { Link } from "react-router-dom";
// import { ThemeContext } from "styled-components";
// import { Box, Button, Sidebar } from "grommet";
// // import { Clock, Apps, Terminal, Chat, StatusUnknown } from 'grommet-icons';

// const SideBar = () => {
//   const theme = useContext(ThemeContext);

//   return (
//     <Sidebar
//       background={{ color: !theme.dark ? "background" : "blue", dark: false }}
//       pad="small"
//       flex-start
//       // height for demo purposes only, remove in production
//       height="100%"
//       margin={{ top: "100" }}
//     >
//       <Box
//         flex="grow"
//         pad="small"
//         align="start"
//         justify="start"
//         gap="medium"
//         border={{ side: "right", color: "border-weak" }}
//       >
//         <Button label="Projects" href="/wizard" />
//         {/* <Button label="Issues" />
//         <Button label="Rules" />
//         <Button label="Quality Profiles" />
//         <Link to= "/SigninView"> 
//         <Button label="Quality Gates" onClick={() => {}}/>
//         </Link>
//         <Button label="Administration" /> */}
//       </Box>
//     </Sidebar>
//   );
// };

// export default SideBar;


//---------------------------------------------------------------------------------------------
// import React, { useContext, useNavigate } from "react";
// import { ThemeContext } from "styled-components";
// import { Box, Button, Sidebar, Nav, Menu, ResponsiveContext } from "grommet";
// // import { Clock, Apps, Terminal, Chat, StatusUnknown } from 'grommet-icons';

// const items = [ 
//   { label: 'Projects' , path: '/dashboard' },
//   { label: 'Issues', path: '/' },
//   { label: 'Rules', path: '/' },
//   { label: 'Quality Profiles', path: '/QualityGates' }, 
//   { label: 'Quality Gates', path: '/qualitygates' }, 
//   { label: 'Administration', path: '/' },  
// ];

// const SideBar = () => {
//   const theme = useContext(ThemeContext);
//   const size = useContext(ResponsiveContext);
//   const navigate = useNavigate()

//   return (
//     <Sidebar
//       background={{ color: !theme.dark ? "background" : "blue", dark: false }}
//       pad="small"
//       flex-start
//       // height for demo purposes only, remove in production
//       height="100%"
//       margin={{ top: "100" }}
//     >
//        <Box direction="column" gap="medium" align="center" justify="center" flex >
//                     {!['xsmall', 'small'].includes(size) ? (
//                         <Nav direction="row" gap="small">
//                             {items.map(item => (
//                                 <Button label={item.label} key={item.label} onClick={()=>{navigate(`${item.path}`)}} />
//                             ))}
//                         </Nav>
//                     ) : (
//                         <Menu label="Menu" items={items} />
//                     )}
                
//                 </Box>
//     </Sidebar>
//   );
// };

// export default SideBar;
