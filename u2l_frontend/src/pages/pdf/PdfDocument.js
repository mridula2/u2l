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
  Defs
} from '@react-pdf/renderer';
import image1 from '../../assets/Images/u2lpdfImg.png';
import image2 from '../../assets/Images/u2lpdfImg2.png';
import HPELogo from '../../assets/Images/HPELogo.png';
import image3 from '../../assets/Images/U2LMigrationEffort.png';
import PoppinsRegular from '../../assets/fonts/Poppins-Regular.ttf';
import PoppinsBold from '../../assets/fonts/Poppins-Bold.ttf';
import PdfUtils from '../../utils/PdfUtils';
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
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'Poppins',
  },
  textBold: {
    margin: 12,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'justify',
    fontFamily: 'Poppins',
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
    color: 'black',
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

  // useEffect(() => {
  //   setPieChartDataURL(props.pieChartDataURL)
  // }, []);


  return (
    <Document>
      <Page size={'A4'}>
        <View>
          <Svg viewBox="0 0 7.05 10" width="596.6px" height="841.89px">
            {/* <Svg viewBox="0 0 7.05 10" width="595.28px" height="841.89px"> */}
            <Defs>
              <LinearGradient id="myLinearGradient" x1={0} x2={1} y1={0} y2={1}>
                <Stop offset="5%" stopColor="#1cfdc8" />
                <Stop offset="5%" stopColor="#3692dd" />
                {/* <Stop offset="5%" stopColor="#3692dd" />
                <Stop offset="5%" stopColor="#56fbe7" /> */}
              </LinearGradient>
            </Defs>

            <Rect width="100%" height="100%" fill="url(#myLinearGradient)" />
          </Svg>
          <Text
            style={{
              position: 'absolute',
              top: 250,
              left: 200,
              color: 'black',
              fontWeight: 'bold',
            }}
          >
            HPE Code Assessment
          </Text>
        </View>
      </Page>
      <Page style={styles.body} wrap>
        <Image style={styles.header} src={HPELogo} fixed />
        <Svg height="10" width="600" fixed style={{ marginBottom: '30' }}>
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
            textAlign: 'center',
            fontFamily: 'Poppins',
            color: '#01A982',
            marginBottom: 100,
          }}
        >
          HPE Code Assessment
        </Text>
        <div style={{ border: '1px solid #01A982' }}>
          <Text style={styles.textBold}>Project Details:</Text>
          <Text style={styles.textBold}>
            Project Name: {props.projectDetails.project_details[0].project_name}
          </Text>
          <Text style={styles.textBold}>
            Project Client:{' '}
            {props.projectDetails.project_details[0].project_client}
          </Text>
          <Text style={styles.textBold}>
            Project Manager:{' '}
            {props.projectDetails.project_details[0].project_manager}
          </Text>
          <Text style={styles.textBold}>
            Username: {props.projectDetails.project_details[0].user_name}
          </Text>
          <Text style={styles.textBold}>
            Type of Code Assessment:{' '}
            {PdfUtils.getAnalysisType(
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
            textAlign: 'center',
            fontFamily: 'Poppins',
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
        <Image style={{ marginVertical: 15, width: '100%' }} src={image1} />
        {/* =============================Page 3================================= */}
        <Text style={styles.title} break>
          Code Assessment Process
        </Text>
        {/* <Subtitle style={{textAlign:'center'}} break>Section II</Subtitle> */}
        <Image
          style={{ marginVertical: 15, width: '100%', marginTop: 30 }}
          src={image2}
        />
        {/* =============================Page 4================================= */}
        <Subtitle
          style={{ textAlign: 'center' }}
          break
        >{`Total Artefacts : ${PdfUtils.getTotalArtefacts(
          props.projectDetails.chart2
        )}`}</Subtitle>
        <Image src={props.pieChart1DataURL} />
        <Subtitle style={{ textAlign: 'center' }}>
          {`Total number of lines : ${props.projectDetails.chart1['Total Nr LoC']}`}
        </Subtitle>
        <Image src={props.pieChart2DataURL} />
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
          }%. So your project requires ${PdfUtils.getEffort(
            props.projectDetails.percent
          )}`}
        </Text>
        <div style={{ border: '1px solid #01A982', marginTop: 40 }}>
          <Image
            style={{ marginVertical: 5, width: '100%', marginTop: 30 }}
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
            position: 'absolute',
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
            position: 'absolute',
            fontSize: 12,
            bottom: 30,
            left: 0,
            right: 0,
            textAlign: 'left',
            color: 'black',
            marginLeft: 45,
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
            color: 'black',
            marginLeft: 20,
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
            color: 'black',
            marginRight: 40,
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
