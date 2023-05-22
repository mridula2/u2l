import { useContext, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
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
} from "grommet";
import { FormClose } from "grommet-icons";
import {
  StatusWarningSmall,
  StatusCriticalSmall,
  StatusGoodSmall,
  StatusUnknownSmall,
} from "grommet-icons";
import { FilterControls } from "../DataTable/FilterControls";
import { useFilters } from "../DataTable/FiltersContext";
import { FiltersProvider } from "../DataTable/FiltersContext";
import dummyData from "../../../config/dummyData";
import ProjectService from "../../../config/ProjectService";

const statusIcons = {
  Warning: <StatusWarningSmall color="status-warning" size="small" />,
  OK: <StatusGoodSmall color="status-ok" size="small" />,
  Critical: <StatusCriticalSmall color="status-critical" size="small" />,
  Unknown: <StatusUnknownSmall color="status-unknown" size="small" />,
};

const filtersConfig = [
  {
    property: "analysis_status",
    label: "Status",
    filterType: "CheckBoxGroup",
  },

  {
    property: "file_size",
    label: "File Size",
    filterType: "CheckBoxGroup",
  },
];

const data = dummyData;

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
      <Box direction="row" gap="600px">
        <Box>
          <FilterControls
            // data={data}
            data={projects}
            // data={}
            filters={filtersConfig}
            primaryKey="id"
            searchFilter={{ placeholder: "Search" }}
          />
        </Box>
        {/* <Box direction="row" height="25px">
          <Box>
            <Text>Sort by: </Text>
          </Box>
          <Box>
            <select
              // height="200px"
              // onChange={onSelectOptionChanged}
              name="selectTag"
              id="selectTag"
            >
              <option value="NONE">NONE</option>
              <option value="1">option 1</option>
              <option value="2">option 2</option>
            </select>
          </Box>
        </Box> */}
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

// const downloadreport = () => {
//   ProjectService.getReport()
//   .then(response => {
//     // create a Blob from the response
//     return response.blob();
//   })
//   .then(blob => {
//     // create a URL for the Blob object
//     const url = URL.createObjectURL(blob);
//     // create a link element and click it to initiate the download
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = 'report.zip';
//     a.click();
//   });
// };

const ServerResults = ({ height, containerRef }) => {
  const size = useContext(ResponsiveContext);
  const { filteredResults, selected, setSelected } = useFilters();
  const [show, setShow] = useState(false);
  const [projectDetails, setProjectDetails] = useState();
  const [datumState, setDatumState] = useState();

  const navigate = useNavigate();

  const closeLayer = () => {
    /* User has not applied new filter settings, restore to previous state. */
    // setFilters(previousFilters);
    setShow(false);
  };

  const findSummary = (datum) => {
    if (datum.analysis_status === "analysis unknown") {
      return "In Progress";
    } else if (datum.analysis_status === "analysis successful") {
      return "Successful Assessment";
    } else if (datum.analysis_status === "analysis failed") {
      return "Failed Assessment";
    }
  };

  const iconMapping = (analysis_status) => {
    if (analysis_status === "analysis successful") {
      return "OK";
    } else if (analysis_status === "analysis failed") {
      return "Critical";
    } else if (analysis_status === "analysis unknown") {
      return "Unknown";
    }
  };

  const viewPdf = (project_name) => {
    //axios call to send api call to get info about project with ProjectID
    ProjectService.getProjectDetails(project_name)
      .then((response) => {
        console.log(response.data)
        setProjectDetails(response.data);
        navigate("/pdfpreview", { state: { projectDetails: response.data } });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const logDetails = (datum, e) => {
    // setDatumState(datum);
    // setShow(true);
    e.preventDefault();
    navigate("/logdetails", { state: { data: datum } });
  };

  return (
    <Box height="100%" overflow="auto" width="100%" responsive={true}>
      <DataTable
        responsive={true}
        aria-describedby="servers-heading"
        data={filteredResults}
        columns={[
          {
            property: "id",
            header: "Project ID",
            pin: ["xsmall", "small"].includes(size),
            primary: true,
            render: (datum) => datum.id,
          },
          {
            property: "project_name",
            header: "Name",
            render: (datum) => (
              <Button
                style={{ textDecoration: "underline" }}
                onClick={(e) => logDetails(datum, e)}
              >
                {datum.project_name}
              </Button>
            ),
          },
          {
            property: "created_at",
            header: "Date",
          },
          // {
          //   property: "state.connected",
          //   header: "Date",
          //   render: (datum) => (datum.state.connected ? "Connected" : "Not connected"),
          // },
          {
            property: "file_size",
            header: "File Size",
            render: (datum) => `${datum.file_size} mb`,
          },
          {
            property: "analysis_status",
            header: "Application Status",
            render: (datum) =>
              datum.analysis_status ? (
                <Text>
                  {statusIcons[iconMapping(datum.analysis_status)]} {findSummary(datum)}
                </Text>
              ) : (
                "-"
              ),
            align: "start",
            sortable: false,
          },
          {
            property: "view",
            header: "Reports",
            // render: (datum) => (
            //   <Text a11yTitle={!datum.view ? "No value" : undefined}>
            //     {datum.view || "--"}
            //   </Text>
            // ),
            render: (datum) =>
              datum.analysis_status === "analysis successful" ? (
                // <Button style={{textDecoration: 'underline'}}> {datum.model} </Button>
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
        // sortable
        // onSelect={(nextSelected) => setSelected(nextSelected)}
        // select={selected}
      />

      {/* {show && (
        <Layer
          full={true}
          target={containerRef?.current}
          onClickOutside={() => setShow(false)}
        >
          <Box
            width="80%"
            margin="10%"
            // alignContent="center"

            // border="all"
            direction="column"
          >
            <Box align="end">
              <Button icon={<FormClose />} onClick={() => closeLayer()} />
            </Box>
            <h3>Log Details</h3>
            <Box direction="row" width="80%" height="60%" pad="10px">
              <Box width="60%">
                <h4>File Details</h4>
                <Text>File Name: U2L </Text>
                <Text>Project ID: 1268005</Text>
                <Text>Status: Failed</Text>
                <Text>File Size: 23mb</Text>
              </Box>
              <Box width="100%" border="all" margin="0 10" overflow="auto">
                <h5>Data Import Logs</h5>
                <Text>Development in progress</Text>
              </Box>
            </Box>
            <Box
              pad="20px"
              style={{ marginLeft: "auto" }}
              direction="row"
              gap="20px"
            >
              <Button
                height="15px"
                width="small"
                border="all"
                label="Cancel"
              ></Button>
              <Button
                onClick={downloadreport}
                height="50px"
                width="small"
                border="all"
                primary
                label="Download Report"
              ></Button>
            </Box>
          </Box>
        </Layer>
      )} */}
    </Box>
  );
};

ServerResults.propTypes = {
  height: PropTypes.string,
};
