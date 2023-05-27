import PropTypes from 'prop-types';
import { Box, Heading, Text } from 'grommet';
import { FilterServers } from './FilterServers';

const FilteringTable = ({ containerRef, projects }) => (
  <Box background="background-front" pad="small" gap="medium" fill>
    {/* <Heading id="servers-heading" level={2} margin="none">
      Servers
    </Heading> */}
    <FilterServers containerRef={containerRef} filtersOpen projects={projects} />
    {/* <Text>Sort bar here....!!</Text> */}
  </Box>
);

FilteringTable.propTypes = {
  containerRef: PropTypes.node,
};

export default FilteringTable;