import PropTypes from 'prop-types';
import { Box, Text } from 'grommet';
import { CardTemplate } from './CardTemplate';

const SelectionSummary = (props) => {
  return (
    <Box direction='row' gap='xxsmall'>
      <Text size='large' weight='bold'>
        {props.length}
      </Text>
      <Text></Text>
    </Box>
  );
};

SelectionSummary.propTypes = {
  selected: PropTypes.array,
};

const Card = (props) => {
  //   useEffect(() => {
  //     console.log(props);
  //   }, []);

  return (
    <CardTemplate
      width='240px'
      height='80px'
      title={props.title}
      description='description'
      myKey={props.myKey}
      skeleton={props.skeleton}
      responsive={props.responsive}
    >
      <Box direction='row'>
        <Box direction='row' fill={true} align={props.skeletonAlign}>
          {!props.img ? (
            <Box
              width='24px' // size of icon
              height='24px'
              background='background'
              // flex='grow'
              margin={{ top: 'small', left: 'small' }}
            />
          ) : (
            <Box
              style={{ justifySelf: 'start' }}
              margin={{ top: 'small', left: 'small' }}
            >
              {props?.img}
            </Box>
          )}
        </Box>
        {/* <Box flex skeleton={false} /> */}
        <Box
          style={{ justifySelf: 'end' }}
          margin={{ top: 'xsmall', right: 'small' }}
        >
          <SelectionSummary length={props.length} />
        </Box>
      </Box>
      <Box align='end' pad='small' flex='grow'>
        <Text margin='none' size='small'>
          {props.title}
        </Text>
      </Box>
    </CardTemplate>
  );
};

export default Card;
