import html2canvas from "html2canvas";
// import Chart from "react-apexcharts";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Image } from "grommet";
import PdfDocument from "./PdfDocument";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Hpe } from "grommet-icons";
import image1 from "../Images/u2lpdfImg.png";
import image2 from "../Images/u2lpdfImg2.png";
import image3 from "../Images/U2LMigrationEffort.png";
import axios from "axios";
import { Chart, LinearScale, registerables } from "chart.js";
import HPELogo from "../Images/HPELogo.png";

Chart.register(LinearScale);
Chart.register(...registerables);

const PdfPreview = () => {
  // const [pieChartDataURL, setPieChartDataURL] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  //{============================================= uncomment start ====================================================}
  const [data1, setData1] = useState(null);
  const chartRef1 = useRef();
  //{============================================= uncomment end ====================================================}
  const [data2, setData2] = useState(null);
  const chartRef2 = useRef();

  useEffect(() => {
    // setData1([
    //   {
    //     Type: "Java",
    //     number: 51,
    //   },
    //   {
    //     Type: "C",
    //     number: 0,
    //   },
    //   {
    //     Type: "Shell",
    //     number: 0,
    //   },
    // ]);
    setData1(location.state.projectDetails.chart2);
    setData2(location.state.projectDetails.chart1);
  }, []);
  //{============================================= uncomment start ====================================================}
  // useEffect(()=>{
  //   if (data1) {
  //   const chartCanvas1 = chartRef1.current.getContext("2d");
  //   const chart1 = new Chart(chartCanvas1, {
  //     type: "pie",
  //     data: {
  //       labels: [
  //         `Actual Number of Lines: ${data1['Actual Nr of Lines']}`,
  //         `Number of Blank Lines: ${data1['Nr Blank Lines']}`,
  //         `Number of Commented Lines: ${data1['Nr Commented Lines']}`,
  //       ],
  //       datasets: [
  //         {
  //           label: "Lines of Code",
  //           data: [
  //             data1['Actual Nr of Lines'],
  //             data1['Nr Blank Lines'],
  //             data1['Nr Commented Lines']
  //           ],
  //           backgroundColor: [
  //             "rgba(255, 99, 132, 0.6)",
  //             "rgba(54, 162, 235, 0.6)",
  //             "rgba(255, 206, 86, 0.6)",
  //             "rgba(75, 192, 192, 0.6)", ],
  //           borderColor: [
  //             "rgba(255, 99, 132, 1)",
  //             "rgba(54, 162, 235, 1)",
  //             "rgba(255, 206, 86, 1)",
  //             "rgba(75, 192, 192, 1)",
  //           ],
  //           borderWidth: 1,
  //         },
  //       ],
  //     },
  //     options: {
  //       maintainAspectRatio: false,
  //       responsive: true,
  //       aspectRatio: 1
  //     },
  //   });
  //   return () => {
  //     chart1.destroy();
  //   };
  // }
  // }, [data1]);

  useEffect(() => {
    if (data1) {
      const chartCanvas1 = chartRef1.current.getContext("2d");
      const chart1 = new Chart(chartCanvas1, {
        type: "pie",
        data: {
          labels: data1.map((item) => `${item.Type}: ${item.number}`),
          datasets: [
            {
              label: "Lines of Code",
              data: data1.map((item) => item.number),
              backgroundColor: [
                "rgba(0, 114, 255, 0.7)",
                "rgba(0, 114, 255, 0.6)",
                "rgba(0, 114, 255, 0.5)",
                "rgba(0, 114, 255, 0.4)",
              ],
              borderColor: [
                "rgba(0, 114, 255, 0.9)",
                "rgba(0, 114, 255, 0.7)",
                "rgba(0, 114, 255, 0.6)",
                "rgba(0, 114, 255, 0.5)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          aspectRatio: 1,
        },
      });
      return () => {
        chart1.destroy();
      };
    }
  }, [data1]);

  //{============================================= uncomment end ======================================================}
  useEffect(() => {
    //   chart1:{
    //     "Actual Nr of Lines": 1886,
    //     "Nr Blank Lines": 558,
    //     "Nr Commented Lines": 231,
    //     "Total Nr LoC": 2675
    // }

    if (data2) {
      const chartCanvas2 = chartRef2.current.getContext("2d");
      const chart2 = new Chart(chartCanvas2, {
        type: "pie",
        data: {
          labels: [
            `Actual Number of Lines: ${data2["Actual Nr of Lines"]}`,
            `Number of Blank Lines: ${data2["Nr Blank Lines"]}`,
            `Number of Commented Lines: ${data2["Nr Commented Lines"]}`,
          ],
          datasets: [
            {
              label: "Lines of Code",
              data: [
                data2["Actual Nr of Lines"],
                data2["Nr Blank Lines"],
                data2["Nr Commented Lines"],
                // data['Total Nr LoC'],
              ],
              backgroundColor: [
                "rgba(0, 179, 136, 0.8)",
                "rgba(0, 179, 136, 0.6)",
                "rgba(0, 179, 136, 0.4)",
              ],
              borderColor: [
                "rgba(0, 179, 136, 0.9)",
                "rgba(0, 179, 136, 0.7)",
                "rgba(0, 179, 136, 0.5)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          aspectRatio: 1,
        },
      });
      return () => {
        chart2.destroy();
      };
    }
  }, [data2]);

  //generate image from chart and send it to PdfViewer
  const openPDF = async () => {
    // //generate image
    //{============================================= uncomment start ====================================================}
    const element1 = document.getElementById("piechart1"),
      canvas1 = await html2canvas(element1),
      data1 = canvas1.toDataURL("image/png");
    //{============================================= uncomment end ======================================================}

    const element2 = document.getElementById("piechart2"),
      canvas2 = await html2canvas(element2),
      data2 = canvas2.toDataURL("image/png");

    // navigate("/pdfview", {
    //   state: {
    //     projectDetails: location.state.projectDetails,
    //     pieChart2DataURL: data2,
    //   },
    // });
    //{============================================= uncomment start ====================================================}
    navigate("/pdfview", {
      state: {
        pieChart1DataURL: data1,
        pieChart2DataURL: data2,
        projectDetails: location.state.projectDetails,
      },
    });
    //{============================================= uncomment end ======================================================}
  };

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
    <div className="App">
      {/* <PDFDownloadLink document={<MyDocument2 />}>
      {({loading}) => (loading ? <button>Loading Document...</button> : <button>Download</button> )}
      </PDFDownloadLink> 
       
      */}

      {/* <button onClick={print}>Print</button> */}
      <div
        style={{ justifyContent: "right", marginLeft: "80%", marginTop: "3%" }}
      >
        {/* <PDFDownloadLink document={<PdfDocument pieChartDataURL={pieChartDataURL}/>}>
          {({ loading }) =>
            loading ? (
                <Button primary label='Loading Document...'/>
            ) : (
              <Button primary label='Download in pdf'/>
            )
          }
        </PDFDownloadLink> */}
        <Button primary label="Open as pdf" onClick={openPDF} />
      </div>
      <div style={styles.headerDiv}>
        <p style={styles.headerText}>Analysis Report Preview</p>
      </div>
      {/* <div style={styles.sectionTitle}>
        <p style={{ fontSize: "25px",textAlign:'center',marginTop:"0" }}><Hpe size="large" color="plain"></Hpe>HPE code Assessment</p>
      </div> */}
      {/* <div style={{textAlign:'center', margin:'0 auto',display:'flex',flexDirection:'horizontal',}}>
        <div style={{marginLeft:'40%'}}>
          <Hpe size="large" color="plain"></Hpe>
          </div>
        <div>
          <p style={{ fontSize: "25px",textAlign:'center',marginTop:"13px",color:'#01A982' }}>HPE code Assessment</p>
        </div>
      </div> */}
      {/* ============================================== Page 1 ============================================= */}
      {/* =========================== Header Page 1 =====================*/}
      <div style={{ marginLeft: "15%", marginTop: "3%" }}>
        <Image src={HPELogo} alt="HPE logo" width="15%" />
      </div>
      <div
        style={{
          border: "1.5px solid #01A982",
          marginLeft: "15%",
          width: "70%",
          marginTop: 30,
        }}
      ></div>
      {/* ============================= Body Page 1 ========================== */}
      <div>
        <p
          style={{
            fontSize: "25px",
            textAlign: "center",
            marginTop: "30px",
            marginBottom: "100px",
            color: "#01A982",
          }}
        >
          HPE code Assessment
        </p>
      </div>
      <div
        style={{
          textAlign: "left",
          marginBottom: 30,
          border: "1px solid #01A982",
          marginLeft: "15%",
          width: "70%",
        }}
      >
        <p style={styles.infoText}>
          Project Name:{" "}
          {location.state.projectDetails.project_details[0].project_name}
        </p>
        <p style={styles.infoText}>
          Project Client:{" "}
          {location.state.projectDetails.project_details[0].project_client}
        </p>
        <p style={styles.infoText}>
          Project Manager:{" "}
          {location.state.projectDetails.project_details[0].project_manager}
        </p>
        <p style={styles.infoText}>
          Username: {location.state.projectDetails.project_details[0].user_name}
        </p>
        <p style={styles.infoText}>
          Type of Code Assessment:{" "}
          {getAnalysisType(
            location.state.projectDetails.analysis_type[0].analysis_type
          )}
        </p>
        <p style={styles.infoText}>
          Source OS:{location.state.projectDetails.os_details[0].source_os}
        </p>
        <p style={styles.infoText}>
          Target OS:{location.state.projectDetails.os_details[0].target_os}
        </p>
      </div>
      {/* ========================= Footer Page 1 ================== */}
      <div
        style={{
          border: "1.5px solid #01A982",
          marginLeft: "15%",
          width: "70%",
          marginBottom: 20,
          marginTop: 30,
        }}
      ></div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ marginRight: "25%", marginLeft: "15%" }}>
          <span style={{ fontSize: "18px", width: "70%" }}>Summary Report</span>
        </div>
        <div style={{ marginRight: "28%" }}>
          <span style={{ fontSize: "18px", width: "70%" }}>1/5</span>
        </div>
        <div>
          <span style={{ fontSize: "18px", width: "70%" }}>
            {getTodaysDate()}
          </span>
        </div>
      </div>
      <hr style={{ width: "80%" }}></hr>
      {/* ============================================== Page 2 ============================================= */}
      {/* ============================= Header Page 2 ========================== */}
      <div style={{ marginLeft: "15%", marginTop: "3%" }}>
        <Image src={HPELogo} alt="HPE logo" width="15%" />
      </div>
      <div
        style={{
          border: "1.5px solid #01A982",
          marginLeft: "15%",
          width: "70%",
          marginTop: 30,
        }}
      ></div>
      {/* ============================= Body Page 2 ========================== */}
      <div style={styles.sectionTitle}>
        <p style={{ fontSize: "25px", marginBottom: "5%" }}>Summary Report</p>
      </div>
      <div style={{ textAlign: "left", margin: "o auto" }}>
        <p style={{ fontSize: "20px", fontWeight: "bold", marginLeft: "15%" }}>
          HPE Code Assessment
        </p>
      </div>
      <div style={{ textAlign: "left", marginBottom: "5%" }}>
        <p style={styles.normalText}>
          HPE Code Assessment Suite is a tool intended to analyse or assess
          existing application code and produce migration checklist points
          depending on the target version. The generated reports will help in
          understanding and analysing the efforts involved to complete the
          application migration.
        </p>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "5%",
        }}
      >
        <Image src={image1} alt="image1" width="70%" />
      </div>
      {/* ========================= Footer Page 2 ===================== */}
      <div
        style={{
          border: "1.5px solid #01A982",
          marginLeft: "15%",
          width: "70%",
          marginBottom: 20,
        }}
      ></div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ marginRight: "25%", marginLeft: "15%" }}>
          <span style={{ fontSize: "18px", width: "70%" }}>Summary Report</span>
        </div>
        <div style={{ marginRight: "28%" }}>
          <span style={{ fontSize: "18px", width: "70%" }}>2/5</span>
        </div>
        <div>
          <span style={{ fontSize: "18px", width: "70%" }}>
            {getTodaysDate()}
          </span>
        </div>
      </div>
      <hr style={{ width: "80%" }}></hr>
      {/* ============================================== Page 3 ============================================= */}
      {/* ============================= Header Page 3 ========================== */}
      <div style={{ marginLeft: "15%", marginTop: "3%" }}>
        <Image src={HPELogo} alt="HPE logo" width="15%" />
      </div>
      <div
        style={{
          border: "1.5px solid #01A982",
          marginLeft: "15%",
          width: "70%",
          marginTop: 30,
        }}
      ></div>
      {/* ============================= Body Page 3 ========================== */}
      <div style={styles.sectionTitle}>
        <p style={{ fontSize: "25px" }}>Code Assessment Process</p>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "10%",
        }}
      >
        <Image src={image2} alt="image2" width="70%" />
      </div>
      {/* ========================= Footer Page 3 ================== */}
      <div
        style={{
          border: "1.5px solid #01A982",
          marginLeft: "15%",
          width: "70%",
          marginBottom: 20,
        }}
      ></div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ marginRight: "25%", marginLeft: "15%" }}>
          <span style={{ fontSize: "18px", width: "70%" }}>Summary Report</span>
        </div>
        <div style={{ marginRight: "28%" }}>
          <span style={{ fontSize: "18px", width: "70%" }}>3/5</span>
        </div>
        <div>
          <span style={{ fontSize: "18px", width: "70%" }}>
            {getTodaysDate()}
          </span>
        </div>
      </div>
      <hr style={{ width: "80%" }}></hr>
      {/* ============================================== Page 4 ============================================= */}
      {/* ============================= Header Page 4 ========================== */}
      <div style={{ marginLeft: "15%", marginTop: "3%" }}>
        <Image src={HPELogo} alt="HPE logo" width="15%" />
      </div>
      <div
        style={{
          border: "1.5px solid #01A982",
          marginLeft: "15%",
          width: "70%",
          marginTop: 30,
        }}
      ></div>
      {/* ============================= Body Page 4 ========================== */}
      <div style={{ textAlign: "left", margin: "o auto" }}>
        <p style={{ fontSize: "20px", fontWeight: "bold", marginLeft: "15%" }}>
          {`Total Artefacts : ${getTotalArtefacts(
            location.state.projectDetails.chart2
          )}`}
        </p>
      </div>
      <div style={{ width: "70%", marginLeft: "15%", marginBottom: "10%" }}>
        <canvas ref={chartRef1} id="piechart1" width="400px" height="400px" />
      </div>
      <div style={{ textAlign: "left", margin: "o auto" }}>
        <p style={{ fontSize: "20px", fontWeight: "bold", marginLeft: "15%" }}>
          {`Total Number of Lines : ${location.state.projectDetails.chart1["Total Nr LoC"]}`}
        </p>
      </div>
      <div style={{ width: "70%", marginLeft: "15%", marginBottom: "10%" }}>
        <canvas ref={chartRef2} id="piechart2" width="400px" height="400px" />
      </div>
      {/* <div style={styles.imageDiv}>
        <Chart
          id="piechart2"
          type="pie"
          width={800}
          height={300}
          series={percent2}
          options={{
            title: { text: "Code Assessment" },
            noData: { text: "Empty Data" },
            labels: code2,
          }}
        ></Chart>
      </div> */}
      {/* ========================= Footer Page 4 ================== */}
      <div
        style={{
          border: "1.5px solid #01A982",
          marginLeft: "15%",
          width: "70%",
          marginBottom: 20,
        }}
      ></div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ marginRight: "25%", marginLeft: "15%" }}>
          <span style={{ fontSize: "18px", width: "70%" }}>Summary Report</span>
        </div>
        <div style={{ marginRight: "28%" }}>
          <span style={{ fontSize: "18px", width: "70%" }}>4/5</span>
        </div>
        <div>
          <span style={{ fontSize: "18px", width: "70%" }}>
            {getTodaysDate()}
          </span>
        </div>
      </div>
      <hr style={{ width: "80%" }}></hr>
      {/* =============================  Page 5  ================================= */}
      {/* ============================= Header Page 5 ========================== */}
      <div style={{ marginLeft: "15%", marginTop: "3%" }}>
        <Image src={HPELogo} alt="HPE logo" width="15%" />
      </div>
      <div
        style={{
          border: "1.5px solid #01A982",
          marginLeft: "15%",
          width: "70%",
          marginTop: 30,
        }}
      ></div>
      {/* ============================= Body Page 5 ========================== */}
      <div style={styles.sectionTitle}>
        <p style={{ fontSize: "25px", marginBottom: "5%" }}>Migration Effort</p>
      </div>
      <div style={{ textAlign: "left" }}>
        <p style={styles.normalText}>
          The migration shows the key modernization factors of the application.
          The larger the area is covered by graph, the more the application is
          suited for modernization.
        </p>
      </div>
      <div style={{ textAlign: "left" }}>
        <p style={styles.normalText}>
          While these parameters do not directly indicate the complexity of the
          application itself, they indicate the level of effort that is required
          to re-architect the application.
        </p>
      </div>
      <div style={{ textAlign: "left", marginBottom: "5%" }}>
        <p style={styles.normalText}>
          This assessment is based on a specific measurement, and depends on the
          analysis that was done on it.
        </p>
        <div style={{ textAlign: "left", marginBottom: "5%" }}>
          <p style={styles.normalText}>
            {`Effort percentage for ${
              location.state.projectDetails.project_details[0].project_name
            } is ${
              location.state.projectDetails.percent
            }%. So your project requires ${getEffort(
              location.state.projectDetails.percent
            )}`}
          </p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "10%",
          border: "1px solid #01A982",
          marginLeft: "15%",
          width: "70%",
        }}
      >
        <Image
          src={image3}
          alt="image3"
          width="90%"
          style={{ paddingBottom: "5%", paddingTop: "5%" }}
        />
      </div>
      {/* ========================= Footer Page 5 ================== */}
      <div
        style={{
          border: "1.5px solid #01A982",
          marginLeft: "15%",
          width: "70%",
          marginBottom: 20,
        }}
      ></div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ marginRight: "25%", marginLeft: "15%" }}>
          <span style={{ fontSize: "18px", width: "70%" }}>Summary Report</span>
        </div>
        <div style={{ marginRight: "28%" }}>
          <span style={{ fontSize: "18px", width: "70%" }}>5/5</span>
        </div>
        <div>
          <span style={{ fontSize: "18px", width: "70%" }}>
            {getTodaysDate()}
          </span>
        </div>
      </div>
      <hr style={{ width: "80%" }}></hr>
    </div>
  );
};

const styles = {
  headerDiv: {
    justifyContent: "center",
    textAlign: "center",
    margin: "0 auto",
  },
  headerText: { fontSize: "30px", fontWeight: "bold" },
  sectionTitle: { textAlign: "center", margin: "0 auto" },
  infoText: { fontSize: "20px", fontWeight: "bold", marginLeft: "5%" },
  normalText: {
    fontSize: "18px",
    width: "70%",
    paddingLeft: "15%",
    textAlign: "justify",
    textJustify: "inter-word",
  },
  imageDiv: { display: "flex", justifyContent: "center" },
  image: { height: "80%", width: "60%" },
};

export default PdfPreview;
