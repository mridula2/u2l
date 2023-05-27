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
  Heading,
  FormField,
} from 'grommet';
import { FormClose } from 'grommet-icons';
import {
  StatusWarningSmall,
  StatusCriticalSmall,
  StatusGoodSmall,
  StatusUnknownSmall,
} from 'grommet-icons';
import { FilterControls } from './FilterControls';
import { useFilters } from './FiltersContext';
import { FiltersProvider } from './FiltersContext';
// import dummyData from '../../Views/dummyData';
import ProjectService from '../../api/ProjectService';

const statusIcons = {
  Warning: <StatusWarningSmall color="status-warning" size="small" />,
  OK: <StatusGoodSmall color="status-ok" size="small" />,
  Critical: <StatusCriticalSmall color="status-critical" size="small" />,
  Unknown: <StatusUnknownSmall color="status-unknown" size="small" />,
};

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

// const data = dummyData;

const SelectionSummary = ({ selected, projects }) => {
  return (
    <Box direction="row" gap="xxsmall">
      <Text size="small" weight="bold">
        {projects.length}
      </Text>
      <Text size="small">items</Text>
    </Box>
  );
};

SelectionSummary.propTypes = {
  selected: PropTypes.array,
};

export const FilterServers = ({
  bestPractice = true,
  containerRef,
  height,
  projects,
}) => (
  <FiltersProvider>
    <Box gap="medium">
      <Box direction="row">
        <Box>
          <FilterControls
            // data={data}
            data={projects}
            // data={}
            filters={filtersConfig}
            primaryKey="id"
            searchFilter={{ placeholder: 'Search' }}
          />
        </Box>
        <Box flex></Box>
        <Box responsive={true} justify="end">
          <Button
            primary
            label="Start Assessment"
            //onClick={}
            // href="/projectdetails"
            href="/wizard"
            modal={true}
            data-testid="next"
          ></Button>
        </Box>
      </Box>
      <Box>
        <SelectionSummary projects={projects} />
        {/* <SelectionSummary projects={data} /> */}
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

const ServerResults = ({ height, containerRef }) => {
  const size = useContext(ResponsiveContext);
  const { filteredResults, selected, setSelected } = useFilters();
  const [show, setShow] = useState(false);
  const [projectDetails, setProjectDetails] = useState();
  const [datumState, setDatumState] = useState();

  const navigate = useNavigate();

  const closeLayer = () => {
    setShow(false);
  };

  const findSummary = (datum) => {
    if (datum.analysis_status === 'analysis unknown') {
      return 'In Progress';
    } else if (datum.analysis_status === 'analysis successful') {
      return 'Successful Assessment';
    } else if (datum.analysis_status === 'analysis failed') {
      return 'Failed Assessment';
    }
  };

  const iconMapping = (analysis_status) => {
    if (analysis_status === 'analysis successful') {
      return 'OK';
    } else if (analysis_status === 'analysis failed') {
      return 'Critical';
    } else if (analysis_status === 'analysis unknown') {
      return 'Unknown';
    }
  };

  const viewPdf = (project_name) => {
    //axios call to send api call to get info about project with ProjectID
    ProjectService.getProjectDetails(project_name)
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
    // setDatumState(datum);
    // setShow(true);
    e.preventDefault();
    navigate('/logdetails', { state: { data: datum } });
  };

  return (
    <Box height="100%" overflow="auto" width="100%" responsive={true}>
      <DataTable
        responsive={true}
        aria-describedby="servers-heading"
        data={filteredResults}
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
            render: (datum) => `${datum.file_size} mb`,
          },
          {
            property: 'analysis_status',
            header: 'Application Status',
            render: (datum) =>
              datum.analysis_status ? (
                <Text>
                  {statusIcons[iconMapping(datum.analysis_status)]}{' '}
                  {findSummary(datum)}
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
                <Text>
                  <Anchor
                    onClick={() => {
                      viewPdf(datum.project_name);
                    }}
                  >
                    <Text>View</Text>
                  </Anchor>
                </Text>
              ) : (
                <Text>View</Text>
              ),
          },
        ]}
        pin
        primaryKey="id"
      />
    </Box>
  );
};

ServerResults.propTypes = {
  height: PropTypes.string,
};
