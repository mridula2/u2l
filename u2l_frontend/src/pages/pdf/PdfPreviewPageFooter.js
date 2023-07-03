import PdfUtils from '../../utils/PdfUtils';

const PdfPreviewPageFooter = (props) => {
  return (
    <>
      <div
        style={{
          border: '1.5px solid #01A982',
          marginLeft: '15%',
          width: '70%',
          marginBottom: 20,
          marginTop: 30,
        }}
      ></div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ marginRight: '25%', marginLeft: '15%' }}>
          <span style={{ fontSize: '18px', width: '70%' }}>Summary Report</span>
        </div>
        <div style={{ marginRight: '28%' }}>
          <span style={{ fontSize: '18px', width: '70%' }}>{props.page}</span>
        </div>
        <div>
          <span style={{ fontSize: '18px', width: '70%' }}>
            {PdfUtils.getTodaysDate()}
          </span>
        </div>
      </div>
      <hr style={{ width: '80%' }}></hr>
    </>
  );
};

export default PdfPreviewPageFooter;
