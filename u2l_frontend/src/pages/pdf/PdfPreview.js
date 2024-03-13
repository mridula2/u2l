import html2canvas from 'html2canvas';
// import Chart from "react-apexcharts";
import JSZip from 'jszip';
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Image, Text, Notification, Box } from 'grommet';
import PdfDocument from './PdfDocument';
import { PDFDownloadLink, pdf } from '@react-pdf/renderer';
import { Hpe } from 'grommet-icons';
import { Chart } from 'react-google-charts';
import { Chart as Chart2, RadialLinearScale, registerables } from 'chart.js';

import image1 from '../../assets/Images/u2lpdfImg.png';
import image2 from '../../assets/Images/u2lpdfImg2.png';
import image3 from '../../assets/Images/EffortPercentage.png';
import HPELogo from '../../assets/Images/HPELogo.png';
import Picture1 from '../../assets/Images/Picture1.png';
import Picture2 from '../../assets/Images/Picture2.png';
import PdfUtils from '../../utils/PdfUtils';
import AuthenticationUtils from '../../utils/AuthenticationUtils';
import CommonUtils from '../../utils/CommonUtils';
import Colors from '../../config/colors';
import url from '../../config/url';
import PdfPreviewPageHeader from './PdfPreviewPageHeader';
import PdfPreviewPageFooter from './PdfPreviewPageFooter';
import ProjectService from '../../api/ProjectService';
Chart2.register(RadialLinearScale);
Chart2.register(...registerables);

const PdfPreview = () => {
  // const [pieChartDataURL, setPieChartDataURL] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const projectDetails = location.state.projectDetails;

  const [data1, setData1] = useState(null);
  const chartRef1 = useRef();

  const [data2, setData2] = useState(null);
  const chartRef2 = useRef();

  const [data3, setData3] = useState(projectDetails.chart3);
  const radarChartRef = useRef();
  const barChartRef = useRef();

  const [chartData1, setChartData1] = useState();
  const [chartOptions1, setChartOptions1] = useState();
  const [chartData2, setChartData2] = useState();
  const [chartOptions2, setChartOptions2] = useState();
  const [chartData3, setChartData3] = useState();

  // const [element, setElement] = useState();

  const [pieChart1DataURL, setPieChart1DataURL] = useState('url');
  const [pieChart2DataURL, setPieChart2DataURL] = useState('url');
  const [radarChartDataURL, setRadarChartDataURL] = useState('url');
  const [barChartDataURL, setBarChartDataURL] = useState('url');

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  const [notificationVisible, setNotificationVisible] = useState();
  const [notificationMessage, setNotificationMessage] = useState('');
  const [status, setStatus] = useState('normal');

  const onNotificationClose = () => {
    setNotificationVisible(false);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 1000);
    }, 7000);
  }, []);

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
    console.log(projectDetails);
    setData1(projectDetails.chart2);
    setData2(projectDetails.chart1);
    setData3(projectDetails.chart3);
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
      // const chartCanvas1 = chartRef1.current.getContext("2d");
      // const chart1 = new Chart(chartCanvas1, {
      //   type: "pie",
      //   data: {
      //     labels: data1.map((item) => `${item.Type}: ${item.number}`),
      //     datasets: [
      //       {
      //         label: "Lines of Code",
      //         data: data1.map((item) => item.number),
      //         backgroundColor: [
      //           "rgba(0, 114, 255, 0.7)",
      //           "rgba(0, 114, 255, 0.6)",
      //           "rgba(0, 114, 255, 0.5)",
      //           "rgba(0, 114, 255, 0.4)",
      //         ],
      //         borderColor: [
      //           "rgba(0, 114, 255, 0.9)",
      //           "rgba(0, 114, 255, 0.7)",
      //           "rgba(0, 114, 255, 0.6)",
      //           "rgba(0, 114, 255, 0.5)",
      //         ],
      //         borderWidth: 1,
      //       },
      //     ],
      //   },
      //   options: {
      //     maintainAspectRatio: false,
      //     responsive: true,
      //     aspectRatio: 1,
      //   },
      // });
      // return () => {
      //   chart1.destroy();
      // };
      const chartData = [['Type', 'Number']];
      data1.forEach((item) => {
        chartData.push([item.Type, item.number]);
        setChartData1(chartData);
      });

      setChartOptions1({
        is3D: true,
        colors: [
          'rgb(20, 87, 255)',
          'rgb(53, 110, 255)',
          'rgb(89, 136, 255)',
          '#382eff',
          '#66aaff',
        ],
        legend: {
          position: 'right',
          textStyle: { color: 'green', fontSize: 16 },
          alignment: 'center',
        },
        tooltip: { showColorCode: true },
        chartArea: { left: '20%', top: 50, width: '60%', height: '60%' },
      });
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
      // const chartCanvas2 = chartRef2.current.getContext("2d");
      // const chart2 = new Chart(chartCanvas2, {
      //   type: "pie",
      //   data: {
      //     labels: [
      //       `Actual Number of Lines: ${data2["Actual Nr of Lines"]}`,
      //       `Number of Blank Lines: ${data2["Nr Blank Lines"]}`,
      //       `Number of Commented Lines: ${data2["Nr Commented Lines"]}`,
      //     ],
      //     datasets: [
      //       {
      //         label: "Lines of Code",
      //         data: [
      //           data2["Actual Nr of Lines"],
      //           data2["Nr Blank Lines"],
      //           data2["Nr Commented Lines"],
      //           // data['Total Nr LoC'],
      //         ],
      //         backgroundColor: [
      //           "rgba(0, 179, 136, 0.8)",
      //           "rgba(0, 179, 136, 0.6)",
      //           "rgba(0, 179, 136, 0.4)",
      //         ],
      //         borderColor: [
      //           "rgba(0, 179, 136, 0.9)",
      //           "rgba(0, 179, 136, 0.7)",
      //           "rgba(0, 179, 136, 0.5)",
      //         ],
      //         borderWidth: 1,
      //       },
      //     ],
      //   },
      //   options: {
      //     maintainAspectRatio: false,
      //     responsive: true,
      //     aspectRatio: 1,
      //   },
      // });
      // return () => {
      //   chart2.destroy();
      // };
      setChartData2([
        ['Type', 'number'],
        [
          `Actual Nr of Lines : ${data2['Actual Nr of Lines']}`,
          data2['Actual Nr of Lines'],
        ],
        [
          `Nr Blank Lines : ${data2['Nr Blank Lines']}`,
          data2['Nr Blank Lines'],
        ],
        [
          `Nr Commented Lines : ${data2['Nr Commented Lines']}`,
          data2['Nr Commented Lines'],
        ],
      ]);

      setChartOptions2({
        is3D: true,
        colors: [
          'rgb(20, 87, 255)',
          'rgb(53, 110, 255)',
          'rgb(89, 136, 255)',
          '#382eff',
          '#66aaff',
        ],
        legend: {
          position: 'right',
          textStyle: { color: 'green', fontSize: 16 },
          alignment: 'center',
        },
        tooltip: { showColorCode: true },
        chartArea: { left: '20%', top: 50, width: '60%', height: '60%' },
      });
    }
  }, [data2]);

  useEffect(() => {
    if (data3) {
      setChartData3({
        labels: data3.map(
          (item) => `${Object.keys(item)[0]}: ${Object.values(item)[0]}`
        ),
        datasets: [
          {
            label: 'No. of Artefacts',
            data: data3.map((item) => Object.values(item)[0]),
            fill: true,
            backgroundColor: 'rgb(53, 110, 255)',
            borderColor: 'rgba(39, 100, 255, 1)',
            pointBackgroundColor: 'rgb(0, 114, 255)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(255, 99, 132)',
          },
        ],
      });
    }
  }, [data3]);

  useEffect(() => {
    const chartCanvas1 = radarChartRef.current.getContext('2d');
    const radarChart = new Chart2(chartCanvas1, {
      type: 'radar',
      data: chartData3,
      options: {
        scales: {
          r: {
            angleLines: {
              display: false,
            },
            suggestedMin: 0,
            suggestedMax: 500,
          },
        },
        maintainAspectRatio: false,
        // responsive: true,
      },
    });
    const chartCanvas2 = barChartRef.current.getContext('2d');
    const barChart = new Chart2(chartCanvas2, {
      type: 'bar',
      data: chartData3,
      options: {
        indexAxis: 'y',
        plugins: {
          legend: {
            position: 'top',
          },
        },
        maintainAspectRatio: false,
        responsive: true,
      },
    });
    return () => {
      radarChart.destroy();
      barChart.destroy();
    };
  }, [chartData3]);

  //generate image from chart and send it to PdfViewer
  const openPDF = async () => {
    // //generate image

    //{============================================= uncomment start ====================================================}
    const element1 = document.getElementById('piechart1');
    const canvas1 = await html2canvas(element1);
    const data4 = canvas1.toDataURL('image/png');
    //{============================================= uncomment end ======================================================}

    const element2 = document.getElementById('piechart2');
    const canvas2 = await html2canvas(element2);
    const data5 = canvas2.toDataURL('image/png');

    const element3 = document.getElementById('radarchart');
    const canvas3 = await html2canvas(element3);
    const data6 = canvas3.toDataURL('image/png');

    const element4 = document.getElementById('barchart');
    const canvas4 = await html2canvas(element4);
    const data7 = canvas4.toDataURL('image/png');

    setPieChart1DataURL(data4);
    setPieChart2DataURL(data5);
    setRadarChartDataURL(data6);
    setBarChartDataURL(data7);
    //{============================================= uncomment start ====================================================}

    // console.log(data6);
    // navigate('/pdfview', {
    //   state: {
    //     pieChart1DataURL: data4,
    //     pieChart2DataURL: data5,
    //     radarChartDataURL: data6,
    //     barChartDataURL: data7,
    //     projectDetails,
    //   },
    // });
    //{============================================= uncomment end ======================================================}
  };

  useEffect(() => {
    const intervalId = setInterval(openPDF, 3000);
    setTimeout(() => clearInterval(intervalId), 10000);
    return () => clearInterval(intervalId);
  }, []);

  // const download = async () => {
  //   zip
  //     .generateAsync({ type: 'blob' })
  //     .then((content) => {
  //       // Create a download link and trigger the download
  //       const link = document.createElement('a');
  //       link.href = URL.createObjectURL(content);
  //       link.download = 'myZipFile.zip';
  //       link.click();
  //     })
  //     .catch((error) => {
  //       console.error('Error creating zip file: ', error);
  //     });
  // };

  const downloadZip = async () => {
    setNotificationMessage('Downloading Reports!!');
    setNotificationVisible(true);
    setStatus('info');
    openPDF();
    const element = (
      <PdfDocument
        pieChart1DataURL={pieChart1DataURL}
        pieChart2DataURL={pieChart2DataURL}
        radarChartDataURL={radarChartDataURL}
        barChartDataURL={barChartDataURL}
        projectDetails={projectDetails}
      />
    );
    const myPdf = pdf(element);
    const blob1 = await myPdf.toBlob();

    const zip = new JSZip();
    zip.file(`${projectDetails.project_details[0].project_name}.pdf`, blob1);

    const token = AuthenticationUtils.getToken();
    if (token) {
      try {
        const url_backend = url;
        const response = await fetch(
          `/report/${projectDetails.project_details[0].project_name
          }/${projectDetails.project_details[0].application_name
          }/${AuthenticationUtils.getEmail()}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const blob = await response.blob();
        const blob1 = new Blob([blob]);

        zip.file(
          `${projectDetails.project_details[0].project_name}.zip`,
          blob1
        );
        zip
          .generateAsync({ type: 'blob' })
          .then((content) => {
            // Create a download link and trigger the download
            const link = document.createElement('a');
            link.href = URL.createObjectURL(content);
            link.download = `${projectDetails.project_details[0].application_name}.zip`;
            link.click();
          })
          .catch((error) => {
            console.error('Error creating zip file: ', error);
          });
      } catch (error) {
        console.error(error);
      }
    }

    // ProjectService.getReport(
    //   projectDetails.project_details[0].project_name,
    //   projectDetails.project_details[0].application_name,
    //   AuthenticationUtils.getEmail()
    // )
    //   .then((response) => {
    //     const blob2 = new Blob([response.data], { type: 'application/zip' });
    //     // var file2 = new File(
    //     //   `${projectDetails.project_details[0].project_name}.zip`
    //     // );
    //     zip.file(
    //       `${projectDetails.project_details[0].project_name}.zip`,
    //       blob2
    //     );
    //     zip
    //       .generateAsync({ type: 'blob' })
    //       .then((content) => {
    //         // Create a download link and trigger the download
    //         const link = document.createElement('a');
    //         link.href = URL.createObjectURL(content);
    //         link.download = 'myZipFile.zip';
    //         link.click();
    //       })
    //       .catch((error) => {
    //         console.error('Error creating zip file: ', error);
    //       });
    //     // CommonUtils.downloadFileAxios(response, projectDetails.project_details[0].project_name);
    //     // console.log(fileName + ' downloaded');
    //     // setLoading(false);
    //     // setSuccess(true);
    //     // setTimeout(() => setSuccess(false), 2000);
    //   })
    //   .catch((error) => {
    //     // setNotificationVisible(true);
    //     // setNotificationMessage('error while downloading report');
    //   });
  };

  return (
    <div className='App'>
      {/* <PDFDownloadLink document={<MyDocument2 />}>
      {({loading}) => (loading ? <button>Loading Document...</button> : <button>Download</button> )}
      </PDFDownloadLink> 
       
      */}

      {/* <button onClick={print}>Print</button> */}
      <Box align='center' gap='small'>
        {notificationVisible && (
          <Notification
            toast
            time={4000}
            status={status}
            message={notificationMessage}
            onClose={onNotificationClose}
          />
        )}
      </Box>
      <div
        style={{ justifyContent: 'right', marginLeft: '80%', marginTop: '3%' }}
      >
        {/* <PDFDownloadLink
          document={
            <PdfDocument
              pieChart1DataURL={pieChart1DataURL}
              pieChart2DataURL={pieChart2DataURL}
              radarChartDataURL={radarChartDataURL}
              barChartDataURL={barChartDataURL}
              projectDetails={projectDetails}
            />
          }
        >
          {({ loading }) =>
            loading ? (
              <Button disabled primary label='Loading Document...' />
            ) : (
              <Button primary label='Download reports' />
            )
          }
        </PDFDownloadLink> */}

        <Button
          // disabled={loading}
          label={'Download reports'}
          busy={loading}
          primary
          success={success}
          onClick={downloadZip}
        />
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
      {/* ============================================== Page 2 ============================================= */}
      {/* =========================== Header Page 2 =====================*/}
      <PdfPreviewPageHeader />
      {/* ============================= Body Page 2 ========================== */}
      <div>
        <p
          style={{
            fontSize: '25px',
            textAlign: 'center',
            marginTop: '30px',
            marginBottom: '100px',
            color: Colors.primaryBrand,
          }}
        >
          HPE code Assessment
        </p>
      </div>
      <div
        style={{
          textAlign: 'left',
          marginBottom: 30,
          border: `1px solid ${Colors.primaryBrand}`,
          marginLeft: '15%',
          width: '70%',
        }}
      >
        <p
          style={{
            fontWeight: 'bold',
            fontSize: '25px',
            marginLeft: '2.5%',
            color: '#0c70f3',
          }}
        >
          Project Details:
        </p>
        <p style={styles.infoText}>
          Project Name: {projectDetails.project_details[0].project_name}
        </p>
        <p style={styles.infoText}>
          Project Client: {projectDetails.project_details[0].project_client}
        </p>
        <p style={styles.infoText}>
          Project Manager: {projectDetails.project_details[0].project_manager}
        </p>
        <p style={styles.infoText}>
          Username: {AuthenticationUtils.getUserName()}
        </p>
        <p style={styles.infoText}>
          Type of Code Assessment:{' '}
          {PdfUtils.getAnalysisType(
            projectDetails.analysis_type[0].analysis_type
          )}
        </p>
        <p
          style={{
            fontWeight: 'bold',
            fontSize: '25px',
            marginLeft: '2.5%',
            color: '#0c70f3',
          }}
        >
          OS Details:
        </p>
        <p style={styles.infoText}>
          Source OS: {projectDetails.os_details[0].source_os}
        </p>
        <p style={styles.infoText}>
          Source OS version: {projectDetails.os_details[0].source_os_version}
        </p>
        <p style={styles.infoText}>
          Target OS: {projectDetails.os_details[0].target_os}
        </p>
        <p style={styles.infoText}>
          Target OS version: {projectDetails.os_details[0].target_os_version}
        </p>
      </div>
      {/* ========================= Footer Page 2 ================== */}
      <PdfPreviewPageFooter page='2/9' />
      {/* ============================================== Page 3 ============================================= */}
      {/* ============================= Header Page 3 ========================== */}
      <PdfPreviewPageHeader />
      {/* ============================= Body Page 3 ========================== */}
      <div style={styles.sectionTitle}>
        <p style={{ fontSize: '25px', marginBottom: '5%' }}>Summary Report</p>
      </div>
      <div style={{ textAlign: 'left', margin: '0 auto' }}>
        <p style={{ fontSize: '20px', fontWeight: 'bold', marginLeft: '15%' }}>
          HPE Code Assessment
        </p>
      </div>
      <div style={{ textAlign: 'left', marginBottom: '5%' }}>
        <p style={styles.normalText}>
          HPE Code Assessment Suite is a code analysis tool which assesses
          applications written in Shell scripting, C, C++, Pro*C, Java and Java
          frameworks to track high level complexities in the code and report the
          changes required to migrate the application from Unix-to-Linux or
          Linux-to-Linux platforms. It covers the overall assessment from the
          perspective of OS versions related issues, changes in commands and
          command options, JDK(versions) and compiler differences and related
          artifacts version differences, thus helping in optimizing and
          reduction in the code migration efforts and cost.
        </p>
        <p style={styles.normalText}>
          The manual approach for code migration and/or re-factoring will find
          ~25% of change requirements during re-compilation, and ~75% of the
          code changes during overall testing. The HPE Code Assessment Suite
          will track various metrics of complexities including 32/64 bit
          analysis, OS relates analysis and endian problems and reports the
          changes needed. This enables the code migration effort to be
          accurately sized, and ensures significant reduction of problems found
          in migration tests by detecting the required changes before the actual
          migration.
        </p>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '5%',
        }}
      >
        <Image src={image1} alt='image1' width='70%' />
      </div>
      {/* ========================= Footer Page 3 ===================== */}
      <PdfPreviewPageFooter page='3/9' />
      {/* ============================================== Page 4 ============================================= */}
      {/* ============================= Header Page 4 ========================== */}
      <PdfPreviewPageHeader />
      {/* ============================= Body Page 4 ========================== */}
      <div style={styles.sectionTitle}>
        <p style={{ fontSize: '25px' }}>Code Assessment Process</p>
      </div>
      <p style={styles.normalText}>
        Upon receiving the source code, the HPE Code Assessment Suite will
        create a workspace for the assessment, and start the analysis. The
        analysis is done based on the various rules within the rules engine to
        access the migration complexities and code changes for different
        metrics. Based on the outcomes, the tool generates a set of reports
        outlining the code remediations to be done for successful migration, as
        well as some code recommendations based on the common coding best
        practices.
      </p>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '10%',
        }}
      >
        <Image src={Picture1} alt='image2' width='70%' />
      </div>
      {/* ========================= Footer Page 4 ===================== */}
      <PdfPreviewPageFooter page='4/9' />
      {/* ======================================== Page 5 ========================= */}
      {/* ================================== Header Page 5 ======================== */}
      <PdfPreviewPageHeader />
      {/* ================================== Body Page 5 ======================== */}
      <div style={styles.sectionTitle}>
        <p style={{ fontSize: '25px' }}>
          HPE Code Assessment Suite Architecture
        </p>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '10%',
        }}
      >
        <Image src={Picture2} alt='image2' width='70%' />
      </div>
      {/* ========================= Footer Page 5 ================== */}
      <PdfPreviewPageFooter page='5/9' />
      {/* ============================================== Page 6 ============================================= */}
      {/* ============================= Header Page 6 ========================== */}
      <PdfPreviewPageHeader />
      {/* ============================= Body Page 6 ========================== */}
      <div style={{ textAlign: 'left', margin: '0 auto' }}>
        <p style={{ fontSize: '25px', fontWeight: 'bold', marginLeft: '15%' }}>
          {`Total Artefacts : ${PdfUtils.getTotalArtefacts(
            projectDetails.chart2
          )}`}
        </p>
      </div>
      <div
        id='piechart1'
        style={{ width: '70%', marginLeft: '15%', maxHeight: '500px' }}
      >
        <Chart
          graphID='piechart1'
          data={chartData1}
          options={chartOptions1}
          chartType='PieChart'
          width={'100%'}
          height={'400px'}
        />
      </div>
      <div style={{ textAlign: 'left', margin: '0 auto' }}>
        <p style={{ fontSize: '25px', fontWeight: 'bold', marginLeft: '15%' }}>
          {`Total Number of Lines : ${projectDetails.chart1['Total Nr LoC']}`}
        </p>
      </div>
      <div
        id='piechart2'
        style={{ width: '70%', marginLeft: '15%', maxHeight: '500px' }}
      >
        <Chart
          id={'piechart2'}
          data={chartData2}
          options={chartOptions2}
          chartType='PieChart'
          width={'100%'}
          height={'400px'}
        />
      </div>
      {/* ========================= Footer Page 6 ================== */}
      <PdfPreviewPageFooter page='6/9' />
      {/* ============================================== Page 7 ============================================= */}
      {/* ============================= Header Page 7 ========================== */}
      <PdfPreviewPageHeader />
      {/* ============================= Body Page 7 ========================== */}
      <div
        style={{ textAlign: 'left', margin: '0 auto', marginBottom: '50px' }}
      >
        <Text
          style={{ fontSize: '25px', fontWeight: 'bold', marginLeft: '15%' }}
        >
          Migration Summary
        </Text>
      </div>

      <div
        id='barchart'
        style={{
          width: '50%',
          marginLeft: '25%',
          height: '300px',
          justifySelf: 'center',
          alignSelf: 'center',
          display: 'flex',
        }}
      >
        <canvas ref={barChartRef} />
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
      {/* ========================= Footer Page 7 ================== */}
      <PdfPreviewPageFooter page='7/9' />
      {/* =============================  Page 8  ================================= */}
      {/* ============================= Header Page 8 ========================== */}
      <PdfPreviewPageHeader />
      {/* ============================= Body Page 8 ========================== */}
      <div style={styles.sectionTitle}>
        <p style={{ fontSize: '25px', marginBottom: '5%' }}>Migration Effort</p>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ width: '30%', marginLeft: '10.5%', marginTop: '5%' }}>
          <div style={{ textAlign: 'left' }}>
            <p style={styles.normalText}>
              The radar chart shows the key areas assessed to estimate the
              migration effort. The larger the are is covered by the graph, the
              higher the code modifications required for a successful migration.
            </p>
          </div>
          <div style={{ textAlign: 'left' }}>
            <p style={styles.normalText}>
              While these parameters do not directly indicate the application
              complexity itself, they indicate the level of effort required to
              migrate to a Linux platform.
            </p>
          </div>
        </div>
        <div
          id='radarchart'
          style={{
            width: '50%',
            marginRight: '10.5%',
            height: '400px',
            marginBottom: '50px',
          }}
        >
          <canvas ref={radarChartRef} />
        </div>
      </div>
      <div style={{ textAlign: 'left', marginBottom: '5%' }}>
        <p style={styles.normalText}>
          The HPE Code Assessment Suite scores the migration effort based on the
          percentage of code changes required.
        </p>
        <div style={{ textAlign: 'left', marginBottom: '5%' }}>
          <p style={styles.normalText}>
            {`Effort percentage for ${projectDetails.project_details[0].project_name
              } is ${projectDetails.percent
              }%. So your project requires ${PdfUtils.getEffort(
                projectDetails.percent
              )}`}
          </p>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '10%',
          border: `1px solid ${Colors.primaryBrand}`,
          marginLeft: '15%',
          width: '70%',
        }}
      >
        <Image
          src={image3}
          alt='image3'
          width='90%'
          style={{ paddingBottom: '5%', paddingTop: '5%' }}
        />
      </div>
      {/* ========================= Footer Page 8 ================== */}
      <PdfPreviewPageFooter page='8/9' />
      {/* ========================= Page 9 ========================= */}
      {/* ========================= Header Page 9 ================== */}
      <PdfPreviewPageHeader />
      {/* ========================= Body Page 9 ================== */}
      <div style={{ marginTop: '4%', marginBottom: '20%' }}>
        <div style={{ textAlign: 'left' }}>
          <p style={styles.normalText}>
            {`The score to migrate ${projectDetails.project_details[0].application_name
              } is ${projectDetails.percent}%. Therefore, the application ${projectDetails.project_details[0].application_name
              } requires ${PdfUtils.getEffort(
                projectDetails.percent
              )} for migration.`}
          </p>
        </div>
        <div style={{ textAlign: 'left' }}>
          {projectDetails.analysis_type[0].analysis_type === 'javaanalysis' && (
            <div>
              <p style={styles.normalText}>
                Very Low Effort (0% - 10%): Minimal adjustments to deprecated
                API usages. Quick updates to accommodate newer JDK features.
              </p>
              <p style={styles.normalText}>
                Low Effort (11% - 30%): Addressing minor API changes or
                deprecated methods with minimal impact on the codebase.
              </p>
              <p style={styles.normalText}>
                Medium Effort (31% - 60%): Adjustments to accommodate
                significant API changes or deprecated methods, requiring
                moderate code modifications.
              </p>
              <p style={styles.normalText}>
                High Effort (61% - 80%): Substantial changes to adapt to major
                changes in JDK APIs or core libraries. Rewriting portions of the
                codebase to ensure compatibility with the new JDK version.
              </p>
              <p style={styles.normalText}>
                Very High Effort (81% - 100%): Extensive code rewriting to
                accommodate significant changes in the JDK and its underlying
                libraries. Overhauling code heavily reliant on deprecated or
                removed features.
              </p>
            </div>
          )}
          {projectDetails.analysis_type[0].analysis_type ===
            'shellanalysis' && (
              <div>
                <p style={styles.normalText}>
                  Very Low Effort (0% - 10%): Minimal updates, such as minor file
                  path adjustments. Slight modifications to accommodate
                  Linux-specific configurations.
                </p>
                <p style={styles.normalText}>
                  Low Effort (11% - 30%): Basic shell script adjustments and
                  replacements of specific Unix commands with Linux equivalents.
                </p>
                <p style={styles.normalText}>
                  Medium Effort (31% - 60%): Adaptation of shell scripts using
                  Unix-specific features to work in the Linux environment. Updates
                  to system-specific configurations or environment variables.
                </p>
                <p style={styles.normalText}>
                  High Effort (61% - 80%): Significant modifications to shell
                  scripts and utilities to align with Linux environment
                  requirements. Handling differences between Unix and Linux
                  filesystems.
                </p>
                <p style={styles.normalText}>
                  Very High Effort (81% - 100%): Substantial rewrites of shell
                  scripts and utilities that are heavily tied to Unix environment
                  assumptions. Extensive changes to core logic to ensure
                  compatibility with Linux.
                </p>
              </div>
            )}
        </div>
      </div>
      {/* ========================= Footer Page 8 ================== */}
      <PdfPreviewPageFooter page='9/9' />
    </div>
  );
};

const styles = {
  headerDiv: {
    justifyContent: 'center',
    textAlign: 'center',
    margin: '0 auto',
  },
  headerText: { fontSize: '30px', fontWeight: 'bold' },
  sectionTitle: { textAlign: 'center', margin: '0 auto' },
  infoText: { fontSize: '20px', fontWeight: 'bold', marginLeft: '5%' },
  normalText: {
    fontSize: '18px',
    width: '70%',
    paddingLeft: '15%',
    textAlign: 'justify',
    textJustify: 'inter-word',
  },
  imageDiv: { display: 'flex', justifyContent: 'center' },
  image: { height: '80%', width: '60%' },
};

export default PdfPreview;
