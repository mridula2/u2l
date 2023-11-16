import { Image } from 'grommet';
import HPELogo from '../../assets/Images/HPELogo.png';
const PdfPreviewPageHeader = () => {
  return (
    <>
      <div style={{ marginLeft: '15%', marginTop: '3%' }}>
        <Image src={HPELogo} alt='HPE logo' width='15%' />
      </div>
      <div
        style={{
          border: '1.5px solid #01A982',
          marginLeft: '15%',
          width: '70%',
          marginTop: 30,
        }}
      ></div>
    </>
  );
};

export default PdfPreviewPageHeader;
