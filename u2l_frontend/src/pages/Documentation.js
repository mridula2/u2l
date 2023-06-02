import React, { useState } from 'react'
import { Box, Card, Header} from 'grommet'
import SideBar from '../components/common/SideBar'
import {Download} from "grommet-icons";
import url from "../config/url";
import { useNavigate, useLocation } from "react-router-dom";
import { ReactComponent as Question } from '../assets/Images/Question.svg'
import { ReactComponent as Readdocs } from '../assets/Images/Readthedocs.svg'


const Documentation = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const file1 = "Code Delivery Guidelines-V0.4";
    const file2 = "HPE U2L Questionnaire-light";

    const downloadfile1 = async () => {
        console.log("downloading documentation file1");
        try {
            setLoading(true);
            const url_backend = url
            const response = await fetch(
              `${url_backend}/configuration/${file1}`,
              {
                method: "GET",
              }
            );
            const blob = await response.blob();
            const url_blob = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement("a");
            link.href = url_blob;
            link.setAttribute("download", `${file1}.zip`);
            document.body.appendChild(link);
            link.click();
            setLoading(false);
          } catch (error) {
            console.error(error);
          }
    }

    const downloadfile2 = async () => {
        console.log("downloading documentation file2");
        try {
            setLoading(true);
            const url_backend = url
            const response = await fetch(
              `${url_backend}/configuration/${file2}`,
              {
                method: "GET",
              }
            );
            const blob = await response.blob();
            const url_blob = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement("a");
            link.href = url_blob;
            link.setAttribute("download", `${file2}.zip`);
            document.body.appendChild(link);
            link.click();
            setLoading(false);
          } catch (error) {
            console.error(error);
          }
    }


    return (
        <Box direction="row-responsive" responsive={true} flex="shrink">
            <SideBar data-testid="sidebar" />
            <Box
                gap="medium"
                direction="row"
                align="start"
                style={{ minWidth: "70%" }}
                margin={{ top: 'large', left: 'large' }}
            >
                <Card
                    pad={{ horizontal: "small", vertical: "medium" }}
                    width="35%"
                    margin="small"
                    height='80%'
                >
                    <Readdocs />
                    <Header style={{ fontWeight: "bold", fontSize: '24px' }} margin={{ top: 'small' }}>Code delivery guidelines</Header>
                    <Box direction='row' style={{ fontSize: '15px' }} >
                        <p>Guideline documentation for delivery code</p>

                    </Box>
                    <Box align='end'>
                        <Download onClick={downloadfile1} />
                    </Box>
                </Card>

                <Card
                    pad={{ horizontal: "small", vertical: "medium" }}
                    width="35%"
                    margin="small"
                    height='80%'
                >
                    <Question size="xxlarge" />
                    <Header style={{ fontWeight: "bold", fontSize: '22px' }} margin={{ top: 'small' }}>
                        HPE Unix to Linux migration
                    </Header>
                    <Header style={{ fontWeight: "bold", fontSize: '22px' }}>
                        questionnaire
                    </Header>
                    <Box direction='row' style={{ fontSize: '15px' }}>
                        <p>Guideline documentation for delivery code</p>
                    </Box>
                    <Box align='end'>
                        <Download onClick={downloadfile2} />
                    </Box>
                </Card>
            </Box>
        </Box>
    )
}

export default Documentation
