import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import {
  Anchor,
  Box,
  Button,
  DataTable,
  ResponsiveContext,
  Text,
  Layer,
} from 'grommet';

import { FilterControls } from './FilterControls';
import { useFilters, FiltersProvider } from './FiltersContext';
import ProjectService from '../../api/ProjectService';
import AuthenticationUtils from '../../utils/AuthenticationUtils';
import ProjectUtils from '../../utils/ProjectUtils';
import statusIcons from '../../config/constants';

const filtersConfig = [
  {
    property: 'analysis_status',
    label: 'Status',
    filterType: 'CheckBoxGroup',
  },

  {
    property: 'file_size',
    label: 'File Size',
    filterType: 'CheckBoxGroup',
  },
];

const SelectionSummary = ({ projects }) => {
  return (
    <Box direction='row' gap='xxsmall'>
      <Text size='small' weight='bold'>
        {projects.length}
      </Text>
      <Text size='small'>items</Text>
    </Box>
  );
};

SelectionSummary.propTypes = {
  selected: PropTypes.array,
};

export const FilterServers = ({ height, projects }) => (
  <FiltersProvider>
    <Box gap='medium'>
      <Box direction='row'>
        <Box>
          <FilterControls
            data={projects}
            filters={filtersConfig}
            primaryKey='id'
            searchFilter={{ placeholder: 'Search' }}
          />
        </Box>
        <Box flex></Box>
        <Box justify='end'>
          <Button
            primary
            label='Start Assessment'
            href='/wizard'
            modal={true}
            data-testid='next'
          ></Button>
        </Box>
      </Box>
      <Box>
        <SelectionSummary projects={projects} />
      </Box>
      <ServerResults height={height} />
    </Box>
  </FiltersProvider>
);

FilterServers.propTypes = {
  bestPractice: PropTypes.bool,
  containerRef: PropTypes.node,
  height: PropTypes.string,
};

const ServerResults = () => {
  const size = useContext(ResponsiveContext);
  const { filteredResults } = useFilters();
  const [show, setShow] = useState(false);
  const [projectDetails, setProjectDetails] = useState();

  const navigate = useNavigate();

  const closeLayer = () => {
    setShow(false);
  };

  const viewPdf = (project_name, application_name) => {
    //axios call to send api call to get info about project with ProjectID
    ProjectService.getProjectDetails(
      project_name,
      application_name,
      AuthenticationUtils.getEmail()
    )
      .then((response) => {
        console.log(response.data);
        setProjectDetails(response.data);
        navigate('/pdfpreview', { state: { projectDetails: response.data } });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const logDetails = (datum, e) => {
    e.preventDefault();
    navigate('/logdetails', { state: { data: datum } });
  };

  return (
    <Box height='100%' overflow='auto' width='100%' responsive={true}>
      <DataTable
        responsive={true}
        aria-describedby='servers-heading'
        data={filteredResults}
        paginate
        step={10}
        columns={[
          {
            property: 'id',
            header: 'Project ID',
            pin: ['xsmall', 'small'].includes(size),
            primary: true,
            render: (datum) => datum.id,
          },
          {
            property: 'project_name',
            header: 'Name',
            render: (datum) => (
              <Button
                style={{ textDecoration: 'underline' }}
                onClick={(e) => logDetails(datum, e)}
              >
                {datum.project_name}
              </Button>
            ),
          },
          {
            property: 'created_at',
            header: 'Date',
          },
          {
            property: 'file_size',
            header: 'File Size',
            render: (datum) => `${datum.file_size} kb`,
          },
          {
            property: 'analysis_status',
            header: 'Application Status',
            render: (datum) =>
              datum.analysis_status ? (
                <Text>
                  {statusIcons[ProjectUtils.iconMapping(datum.analysis_status)]}{' '}
                  {ProjectUtils.findSummary(datum)}
                </Text>
              ) : (
                '-'
              ),
            align: 'start',
            sortable: false,
          },
          {
            property: 'view',
            header: 'Reports',
            render: (datum) =>
              datum.analysis_status === 'analysis successful' ? (
                <Anchor
                  style={{ color: 'rgb(111, 111, 111)', fontSize: '16px' }}
                  onClick={() => {
                    viewPdf(datum.project_name, datum.application_name);
                  }}
                >
                  View
                </Anchor>
              ) : (
                <Text style={{ color: 'rgb(167,167,167)' }}>View</Text>
              ),
          },
        ]}
        pin
        primaryKey='id'
      />
    </Box>
  );
};

ServerResults.propTypes = {
  height: PropTypes.string,
};
