import { useEffect, useState } from "react";
import React from "react";
import {
  Document,
  Font,
  Page,
  Text,
  Image,
  StyleSheet,
  LinearGradient,
  Line,
  Svg,
} from "@react-pdf/renderer";
import Chart from "react-apexcharts";
import html2canvas from "html2canvas";
import { Hpe } from "grommet-icons";
import image1 from "../Images/u2lpdfImg.png";
import image2 from "../Images/u2lpdfImg2.png";
import HPECodeAssessment from "../Images/HPECodeAssessment.png";
import HPELogo from "../Images/HPELogo.png";
import image3 from "../Images/U2LMigrationEffort.png";
import PoppinsRegular from "../fonts/Poppins-Regular.ttf";
import PoppinsBold from "../fonts/Poppins-Bold.ttf";

// const gradient = {
//   x1: '0%',
//   y1: '0%',
//   x2: '100%',
//   y2: '100%',
//   stops: [
//     { offset: '0%', color: '#4F52FF' },
//     { offset: '100%', color: '#00C2FF' },
//   ],
// };

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontFamily: "Poppins",
  },
  author: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    fontFamily: "Poppins",
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Poppins",
  },
  textBold: {
    margin: 12,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "justify",
    fontFamily: "Poppins",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    marginBottom: 20,
    textAlign: "center",
    width: "100px",
    marginLeft: 10,
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "left",
    color: "black",
  },
});

Font.register({
  family: "Poppins",
  fonts: [
    { src: PoppinsRegular, fontWeight: "normal" },
    { src: PoppinsBold, fontWeight: "bold" },
  ],
});

const Subtitle = ({ children, ...props }) => (
  <Text style={styles.subtitle} {...props}>
    {children}
  </Text>
);

const PdfDocument = (props) => {
  // const [pieChartDataURL, setPieChartDataURL] = useState("");

  // useEffect(() => {
  //   setPieChartDataURL(props.pieChartDataURL)
  // }, []);

  const getTodaysDate = () => {
    const date = new Date();
    return date.toLocaleDateString();
  };
  const getAnalysisType = (anaysis) => {
    if (anaysis === "javaanalysis") {
      return "Java Analysis";
    } else if (anaysis === "canalysis") {
      return "C Analysis";
    } else if (anaysis === "shellanalysis") {
      return "Shell Analysis";
    }
  };

  const getTotalArtefacts = (array) => {
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
      sum += array[i].number;
    }
    return sum;
  };

  const getEffort = (percent) => {
    if (0 <= percent <= 19) {
      return "Low Effort(It belongs to category 1 from below chart).";
    } else if (20 <= percent <= 39) {
      return "Medium Effort(It belongs to category 2 from below chart).";
    } else if (40 <= percent <= 59) {
      return "Average Effort(It belongs to category 3 from below chart).";
    } else if (60 <= percent <= 79) {
      return "High Effort(It belongs to category 4 from below chart).";
    } else if (80 <= percent <= 100) {
      return "Very High Effort(It belongs to category 5 from below chart).";
    }
  };

  return (
    <Document>
      {/* <GlobalFonts/> */}
      <Page style={styles.body} wrap>
        <Image style={styles.header} src={HPELogo} fixed />
        <Svg height="10" width="600" fixed style={{ marginBottom: "30" }}>
          <Line
            x1="0"
            y1="0"
            x2="520"
            y2="0"
            strokeWidth={5}
            stroke="#01A982"
          />
        </Svg>
        {/* <Image style={{marginVertical: 15, marginHorizontal: 100, marginBottom:100}} src={HPECodeAssessment} /> */}
        <Text
          style={{
            fontSize: 24,
            textAlign: "center",
            fontFamily: "Poppins",
            color: "#01A982",
            marginBottom: 100,
          }}
        >
          HPE Code Assessment
        </Text>
        <div style={{ border: "1px solid #01A982" }}>
          <Text style={styles.textBold}>Project Details:</Text>
          <Text style={styles.textBold}>
            Project Name: {props.projectDetails.project_details[0].project_name}
          </Text>
          <Text style={styles.textBold}>
            Project Client:{" "}
            {props.projectDetails.project_details[0].project_client}
          </Text>
          <Text style={styles.textBold}>
            Project Manager:{" "}
            {props.projectDetails.project_details[0].project_manager}
          </Text>
          <Text style={styles.textBold}>
            Username: {props.projectDetails.project_details[0].user_name}
          </Text>
          <Text style={styles.textBold}>
            Type of Code Assessment:{" "}
            {getAnalysisType(
              props.projectDetails.analysis_type[0].analysis_type
            )}
          </Text>
          <Text style={styles.textBold}>
            Source OS: {props.projectDetails.os_details[0].source_os}
          </Text>
          <Text style={styles.textBold}>
            Target OS: {props.projectDetails.os_details[0].target_os}
          </Text>
        </div>
        {/* =============================Page 2================================= */}
        <Text
          style={{
            fontSize: 24,
            textAlign: "center",
            fontFamily: "Poppins",
            marginBottom: 20,
          }}
          break
        >
          Summary Report
        </Text>
        <Subtitle>HPE Code Assessment</Subtitle>
        <Text style={styles.text}>
          HPE Code Assessment Suite is a tool intended to analyse or assess
          existing application code and produce migration checklist points
          depending on the target version. The generated reports will help in
          understanding and analysing the efforts involved to complete the
          application migration.
        </Text>
        <Image style={{ marginVertical: 15, width: "100%" }} src={image1} />
        {/* =============================Page 3================================= */}
        <Text style={styles.title} break>
          Code Assessment Process
        </Text>
        {/* <Subtitle style={{textAlign:'center'}} break>Section II</Subtitle> */}
        <Image
          style={{ marginVertical: 15, width: "100%", marginTop: 30 }}
          src={image2}
        />
        {/* =============================Page 4================================= */}
        <Subtitle
          style={{ textAlign: "center" }}
          break
        >{`Total Artefacts : ${getTotalArtefacts(
          props.projectDetails.chart2
        )}`}</Subtitle>
        <Image style={{ marginVertical: 5 }} src={props.pieChart1DataURL} />
        <Subtitle style={{ textAlign: "center" }}>
          {`Total number of lines : ${props.projectDetails.chart1["Total Nr LoC"]}`}
        </Subtitle>
        <Image style={{ marginVertical: 5 }} src={props.pieChart2DataURL} />
        {/* =============================Page 5================================= */}
        <Text
          style={{
            fontSize: 24,
            textAlign: "center",
            fontFamily: "Poppins",
            marginBottom: 20,
          }}
          break
        >
          Migration Effort
        </Text>
        <Text style={styles.text}>
          The migration shows the key modernization factors of the application.
          The larger the area is covered by graph, the more the application is
          suited for modernization.
        </Text>
        <Text style={styles.text}>
          While these parameters do not directly indicate the complexity of the
          application itself, they indicate the level of effort that is required
          to re-architect the application.
        </Text>
        <Text style={styles.text}>
          This assessment is based on a specific measurement, and depends on the
          analysis that was done on it.
        </Text>
        <Text style={styles.text}>
          {`Effort percentage for ${
            props.projectDetails.project_details[0].project_name
          } is ${
            props.projectDetails.percent
          }%. So your project requires ${getEffort(
            props.projectDetails.percent
          )}`}
        </Text>
        <div style={{ border: "1px solid #01A982", marginTop: 40 }}>
          <Image
            style={{ marginVertical: 5, width: "100%", marginTop: 30 }}
            src={image3}
          />
        </div>
        {/* ============================= Footer ================================= */}
        <Svg
          height="10"
          width="600"
          fixed
          style={{
            marginBottom: 25,
            position: "absolute",
            bottom: 30,
            left: 0,
            right: 0,
            marginLeft: 40,
          }}
        >
          <Line
            x1="0"
            y1="0"
            x2="520"
            y2="0"
            strokeWidth={5}
            stroke="#01A982"
          />
        </Svg>
        <Text
          style={{
            position: "absolute",
            fontSize: 12,
            bottom: 30,
            left: 0,
            right: 0,
            textAlign: "left",
            color: "black",
            marginLeft: 45,
          }}
          fixed
        >
          Summary Report
        </Text>
        <Text
          style={{
            position: "absolute",
            fontSize: 12,
            bottom: 30,
            left: 0,
            right: 0,
            textAlign: "center",
            color: "black",
            marginLeft: 20,
          }}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
        <Text
          style={{
            position: "absolute",
            fontSize: 12,
            bottom: 30,
            left: 0,
            right: 0,
            textAlign: "right",
            color: "black",
            marginRight: 40,
          }}
          fixed
        >
          {getTodaysDate()}
        </Text>
      </Page>
    </Document>
  );
};

export default PdfDocument;
