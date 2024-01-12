import { useEffect } from 'react';
import {
  Document,
  Font,
  Page,
  Text,
  Image,
  StyleSheet,
  Line,
  Svg,
  Rect,
  View,
  LinearGradient,
  Stop,
  Defs,
} from '@react-pdf/renderer';
import image1 from '../../assets/Images/u2lpdfImg.png';
import image2 from '../../assets/Images/u2lpdfImg2.png';
import Picture1 from '../../assets/Images/Picture1.png';
import Picture2 from '../../assets/Images/Picture2.png';
import HPELogo from '../../assets/Images/HPELogo.png';
import image3 from '../../assets/Images/EffortPercentage.png';
import PoppinsRegular from '../../assets/fonts/Poppins-Regular.ttf';
import PoppinsBold from '../../assets/fonts/Poppins-Bold.ttf';
import PdfUtils from '../../utils/PdfUtils';
import Colors from '../../config/colors';
import AuthenticationUtils from '../../utils/AuthenticationUtils';

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
/*
<Svg
          viewBox='0 0 7.05 10'
          // width='596.6px'
          // height='841.89px'
          width='595.4px'
          height='841.89px'
          style={{ position: 'absolute', zIndex: '-1' }}
          fixed
        >
          {/* <Svg viewBox="0 0 7.05 10" width="595.28px" height="841.89px"> }
          // <Defs>
          //   <LinearGradient id='myLinearGradient' x1={0} x2={1} y1={0} y2={1}>
              {/* <Stop offset='5%' stopColor='#fbffc2' /> }
              // <Stop stopColor='#c5e7f3' />
              // <Stop offset='5%' stopColor='#edf4ff' />
              {/* <Stop offset="5%" stopColor="#3692dd" />
                <Stop offset="5%" stopColor="#56fbe7" /> }
          //   </LinearGradient>
          // </Defs>

        //   <Rect width='100%' height='100%' fill='url(#myLinearGradient)' />
        // </Svg>*/

/*
                  <Svg viewBox='0 0 7.05 10' width='595.4px' height='841.89px'>
            <Defs>
              <LinearGradient id='myLinearGradient' x1={0} x2={1} y1={0} y2={1}>
                <Stop offset='5%' stopColor='#c5e7f3' />
                <Stop offset='5%' stopColor='#edf4ff' />
              </LinearGradient>
            </Defs>

            <Rect width='100%' height='100%' fill='url(#myLinearGradient)' />
          </Svg> */

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Poppins',
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    fontFamily: 'Poppins',
  },
  text: {
    margin: 12,
    fontSize: 10,
    textAlign: 'justify',
    fontFamily: 'Poppins',
  },
  textBold: {
    left: 40,
    margin: 12,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'justify',
    fontFamily: 'Poppins',
  },
  textHeading: {
    margin: 12,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'justify',
    fontFamily: 'Poppins',
    color: '#0c70f3',
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
    width: '100px',
    marginLeft: 10,
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'left',
    color: Colors.primaryBlack,
  },
  container: {
    // flex: 1,
    flexDirection: 'row',
    // border: '1px solid black',
    height: 250,
    marginBottom: 0,
    padding: 0,
  },
  leftColumn: {
    // flexDirection: 'column',
    width: 250,
    top: 10,
    // border: '1px solid black',
    height: 220,
  },
});

Font.register({
  family: 'Poppins',
  fonts: [
    { src: PoppinsRegular, fontWeight: 'normal' },
    { src: PoppinsBold, fontWeight: 'bold' },
  ],
});

const Subtitle = ({ children, ...props }) => (
  <Text style={styles.subtitle} {...props}>
    {children}
  </Text>
);

const PdfDocument = (props) => {
  // const [pieChartDataURL, setPieChartDataURL] = useState("");

  useEffect(() => {
    console.log(props);
  }, []);

  return (
    <Document>
      <Page size={'A4'}>
        <View>
          <Text
            style={{
              position: 'absolute',
              top: 250,
              left: 158,
              color: Colors.primaryBrand,
              fontWeight: 'bold',
              fontSize: 24,
              fontFamily: 'Poppins',
            }}
          >
            HPE Code Assessment
          </Text>
          <Text
            style={{
              position: 'absolute',
              top: 280,
              left: 160,
              color: '#0c70f3',
              // fontWeight: 'bold',
              fontSize: 20,
              fontFamily: 'Poppins',
            }}
          >
            Migration Summary Report
          </Text>
          <Text
            style={{
              position: 'absolute',
              fontSize: 12,
              bottom: 30,
              left: 0,
              right: 0,
              textAlign: 'right',
              color: Colors.primaryBlack,
              marginRight: 40,
              fontFamily: 'Poppins',
            }}
            fixed
          >
            {PdfUtils.getTodaysDate()}
          </Text>
        </View>
      </Page>
      <Page style={styles.body} wrap>
        <Image style={styles.header} src={HPELogo} fixed />
        <Svg height='10' width='600' fixed style={{ marginBottom: '30' }}>
          <Line
            x1='0'
            y1='0'
            x2='520'
            y2='0'
            strokeWidth={5}
            stroke={Colors.primaryBrand}
          />
        </Svg>
        {/* <Image style={{marginVertical: 15, marginHorizontal: 100, marginBottom:100}} src={HPECodeAssessment} /> */}
        <Text
          style={{
            fontSize: 24,
            textAlign: 'center',
            fontFamily: 'Poppins',
            color: '#0c70f3',
            marginBottom: 100,
          }}
        >
          HPE Code Assessment
        </Text>
        <div style={{ border: `1px solid ${Colors.primaryBrand}` }}>
          <Text style={styles.textHeading}>Project Details:</Text>
          <Text style={styles.textBold}>
            Project Name: {props.projectDetails.project_details[0].project_name}
          </Text>
          <Text style={styles.textBold}>
            Project Client:
            {props.projectDetails.project_details[0].project_client}
          </Text>
          <Text style={styles.textBold}>
            Project Manager:
            {props.projectDetails.project_details[0].project_manager}
          </Text>
          <Text style={styles.textBold}>
            Username: {AuthenticationUtils.getUserName()}
          </Text>
          <Text style={styles.textBold}>
            Type of Code Assessment:
            {PdfUtils.getAnalysisType(
              props.projectDetails.analysis_type[0].analysis_type
            )}
          </Text>
          <Text style={styles.textHeading}>OS Details:</Text>
          <Text style={styles.textBold}>
            Source OS: {props.projectDetails.os_details[0].source_os}
          </Text>
          <Text style={styles.textBold}>
            Source OS Version:{' '}
            {props.projectDetails.os_details[0].source_os_version}
          </Text>
          <Text style={styles.textBold}>
            Target OS: {props.projectDetails.os_details[0].target_os}
          </Text>
          <Text style={styles.textBold}>
            Target OS Version:{' '}
            {props.projectDetails.os_details[0].target_os_version}
          </Text>
        </div>
        {/* =============================Page 2================================= */}
        <Subtitle break>HPE Code Assessment</Subtitle>
        <Text style={styles.text}>
          HPE Code Assessment Suite is a code analysis tool which assesses
          applications written in Shell scripting, C, C++, Pro*C, Java and Java
          frameworks to track high level complexities in the code and report the
          changes required to migrate the application from Unix-to-Linux or
          Linux-to-Linux platforms. It covers the overall assessment from the
          perspective of OS versions related issues, changes in commands and
          command options, JDK(versions) and compiler differences and related
          artifacts version differences, thus helping in optimizing and
          reduction in the code migration efforts and cost.
        </Text>
        <Text style={styles.text}>
          The manual approach for code migration and/or re-factoring will find
          ~25% of change requirements during re-compilation, and ~75% of the
          code changes during overall testing. The HPE Code Assessment Suite
          will track various metrics of complexities including 32/64 bit
          analysis, OS relates analysis and endian problems and reports the
          changes needed. This enables the code migration effort to be
          accurately sized, and ensures significant reduction of problems found
          in migration tests by detecting the required changes before the actual
          migration.
        </Text>
        <Image
          style={{ marginVertical: 15, width: '100%', height: 150 }}
          src={image1}
        />
        {/* =============================Page 3================================= */}
        <Text style={styles.title} break>
          Code Assessment Process
        </Text>
        <Text style={styles.text}>
          Upon receiving the source code, the HPE Code Assessment Suite will
          create a workspace for the assessment, and start the analysis. The
          analysis is done based on the various rules within the rules engine to
          access the migration complexities and code changes for different
          metrics. Based on the outcomes, the tool generates a set of reports
          outlining the code remediations to be done for successful migration,
          as well as some code recommendations based on the common coding best
          practices.
        </Text>
        {/* <Subtitle style={{textAlign:'center'}} break>Section II</Subtitle> */}
        <Image
          style={{ marginVertical: 15, width: '100%', marginTop: 30 }}
          src={Picture1}
        />
        <Text style={styles.title} break>
          HPE Code Assessment Suite Architecture
        </Text>
        <Image
          style={{
            marginVertical: 15,
            width: '80%',
            height: '50%',
            marginTop: 30,
            left: 50,
          }}
          src={Picture2}
        />
        {/* =============================Page 4================================= */}
        <Subtitle
          style={{ textAlign: 'left', marginBottom: 10, fontFamily: 'Poppins' }}
          break
        >{`Total Artefacts : ${PdfUtils.getTotalArtefacts(
          props.projectDetails.chart2
        )}`}</Subtitle>
        <Image
          style={{ height: 250, marginBottom: 20 }}
          src={props.pieChart1DataURL}
        />
        <Subtitle
          style={{ textAlign: 'left', marginBottom: 10, fontFamily: 'Poppins' }}
        >
          {`Total number of lines : ${props.projectDetails.chart1['Total Nr LoC']}`}
        </Subtitle>
        <Image style={{ height: 250 }} src={props.pieChart2DataURL} />
        <Subtitle
          style={{ textAlign: 'left', fontFamily: 'Poppins', marginBottom: 10 }}
          break
        >{`Migration Summary`}</Subtitle>
        <Image
          style={{ height: 200, marginBottom: 40 }}
          src={props.barChartDataURL}
        />

        {/* <Image
          style={{ height: 250, width: 400, left: 87 }}
          src={props.radarChartDataURL}
        /> */}
        {/* =============================Page 5================================= */}
        <Text
          style={{
            fontSize: 24,
            textAlign: 'center',
            fontFamily: 'Poppins',
            marginBottom: 20,
          }}
          break
        >
          Migration Effort
        </Text>
        <div style={styles.container}>
          <div style={styles.leftColumn}>
            <Text style={styles.text}>
              The radar chart shows the key areas assessed to estimate the
              migration effort. The larger the are is covered by the graph, the
              higher the code modifications required for a successful migration.
            </Text>
            <Text style={styles.text}>
              While these parameters do not directly indicate the application
              complexity itself, they indicate the level of effort required to
              migrate to a Linux platform.
            </Text>
          </div>
          <div
            style={{
              marginVertical: 5,
              // border: `1px solid black`,
              // marginTop: 40,
              height: 200,
            }}
          >
            <Image src={props.radarChartDataURL} />
          </div>
        </div>
        <Text
          style={{
            marginLeft: 12,
            marginRight: 12,
            fontSize: 10,
            textAlign: 'justify',
            fontFamily: 'Poppins',
          }}
        >
          This assessment is based on a specific measurement, and depends on the
          analysis that was done on it.
        </Text>
        {/* <Text style={styles.text}>
          {`Effort percentage for ${
            props.projectDetails.project_details[0].project_name
          } is ${
            props.projectDetails.percent
          }%. So your project requires ${PdfUtils.getEffort(
            props.projectDetails.percent
          )}`}
        </Text> */}
        <div
          style={{ border: `1px solid ${Colors.primaryBrand}`, marginTop: 40 }}
        >
          <Image
            style={{ marginVertical: 5, width: '100%', marginTop: 30 }}
            src={image3}
          />
        </div>
        {/* ============================= Page 9 ================================= */}
        <Text style={styles.text} break>
          {`The score to migrate ${
            props.projectDetails.project_details[0].application_name
          } is ${props.projectDetails.percent}%. Therefore, the application ${
            props.projectDetails.project_details[0].application_name
          } requires ${PdfUtils.getEffort(
            props.projectDetails.percent
          )} for migration.`}
        </Text>
        {props.projectDetails.analysis_type[0].analysis_type ===
          'javaanalysis' && (
          <div>
            <Text style={styles.text}>
              very Low Effort (0% - 10%): Minimal adjustments to deprecated API
              usages. Quick updates to accommodate newer JDK features.
            </Text>
            <Text style={styles.text}>
              Low Effort (11% - 30%): Addressing minor API changes or deprecated
              methods with minimal impact on the codebase.
            </Text>
            <Text style={styles.text}>
              Medium Effort (31% - 60%): Adjustments to accommodate significant
              API changes or deprecated methods, requiring moderate code
              modifications.
            </Text>
            <Text style={styles.text}>
              High Effort (61% - 80%): Substantial changes to adapt to major
              changes in JDK APIs or core libraries. Rewriting portions of the
              codebase to ensure compatibility with the new JDK version.
            </Text>
            <Text style={styles.text}>
              Very High Effort (81% - 100%): Extensive code rewriting to
              accommodate significant changes in the JDK and its underlying
              libraries. Overhauling code heavily reliant on deprecated or
              removed features.
            </Text>
          </div>
        )}
        {props.projectDetails.analysis_type[0].analysis_type ===
          'shellanalysis' && (
          <div>
            <Text style={styles.text}>
              very Low Effort (0% - 10%): Minimal updates, such as minor file
              path adjustments. Slight modifications to accommodate
              Linux-specific configurations.
            </Text>
            <Text style={styles.text}>
              Low Effort (11% - 30%): Basic shell script adjustments and
              replacements of specific Unix commands with Linux equivalents.
            </Text>
            <Text style={styles.text}>
              Medium Effort (31% - 60%): Adaptation of shell scripts using
              Unix-specific features to work in the Linux environment. Updates
              to system-specific configurations or environment variables.
            </Text>
            <Text style={styles.text}>
              High Effort (61% - 80%): Significant modifications to shell
              scripts and utilities to align with Linux environment
              requirements. Handling differences between Unix and Linux
              filesystems.
            </Text>
            <Text style={styles.text}>
              Very High Effort (81% - 100%): Substantial rewrites of shell
              scripts and utilities that are heavily tied to Unix environment
              assumptions. Extensive changes to core logic to ensure
              compatibility with Linux.
            </Text>
          </div>
        )}
        {/* ============================= Footer ================================= */}

        <Svg
          height='10'
          width='600'
          fixed
          style={{
            marginBottom: 25,
            position: 'absolute',
            bottom: 30,
            left: 0,
            right: 0,
            marginLeft: 40,
          }}
        >
          <Line
            x1='0'
            y1='0'
            x2='520'
            y2='0'
            strokeWidth={5}
            stroke={Colors.primaryBrand}
          />
        </Svg>
        <Text
          style={{
            position: 'absolute',
            fontSize: 12,
            bottom: 30,
            left: 0,
            right: 0,
            textAlign: 'left',
            color: Colors.primaryBlack,
            marginLeft: 45,
            fontFamily: 'Poppins',
          }}
          fixed
        >
          Summary Report
        </Text>
        <Text
          style={{
            position: 'absolute',
            fontSize: 12,
            bottom: 30,
            left: 0,
            right: 0,
            textAlign: 'center',
            color: Colors.primaryBlack,
            marginLeft: 20,
            fontFamily: 'Poppins',
          }}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
        <Text
          style={{
            position: 'absolute',
            fontSize: 12,
            bottom: 30,
            left: 0,
            right: 0,
            textAlign: 'right',
            color: Colors.primaryBlack,
            marginRight: 40,
            fontFamily: 'Poppins',
          }}
          fixed
        >
          {PdfUtils.getTodaysDate()}
        </Text>
      </Page>
    </Document>
  );
};

export default PdfDocument;
