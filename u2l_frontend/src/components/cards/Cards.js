import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Grid, ResponsiveContext } from 'grommet';
import Card from './Card';

import {
  StatusUnknownSmall,
  StatusCriticalSmall,
  StatusGoodSmall,
  CircleAlert,
} from 'grommet-icons';

// import dummyData from "../../Views/dummyData";

// const data = dummyData;

const Cards = ({
  heading = true,
  projects,
  loading,
  skeletonAlign = loading ? 'none' : 'start',
}) => {
  const breakpoint = useContext(ResponsiveContext);
  const skeleton = { message: { start: 'Loading', end: 'Content Loaded' } };
  const columns = {
    xsmall: ['auto'],
    small: ['auto', 'auto'],
    medium: ['auto', 'auto'],
    large: ['auto', 'auto', 'auto', 'auto'],
    xlarge: ['auto', 'auto', 'auto', 'auto'],
  };
  const totalLength = () => {
    return projects.length;
  };

  const inProgress = () => {
    return projects.filter((e) =>
      e.analysis_status.toLowerCase().includes('pending')
    ).length;
  };

  const okLength = () => {
    return projects.filter((e) =>
      e.analysis_status.toLowerCase().includes('success')
    ).length;
  };

  const criticalLength = () => {
    return projects.filter((e) =>
      e.analysis_status.toLowerCase().includes('failed')
    ).length;
  };

  const prj = [
    {
      img: <StatusUnknownSmall color='#CCCCCC' size='large' />,
      length: totalLength(),
      title: 'Total Assessment',
    },
    {
      img: <CircleAlert color='#CCCCCC' size='large' />,
      length: inProgress(),
      title: 'In Progress',
    },
    {
      img: <StatusGoodSmall color='#17EBA0' size='large' />,
      length: okLength(),
      title: 'Success',
    },
    {
      img: <StatusCriticalSmall color='#FC5A5A' size='large' />,
      length: criticalLength(),
      title: 'Failed',
    },
  ];

  const placeholders = [{}, {}, {}, {}];
  const items = loading ? placeholders : prj;

  return (
    <Grid
      columns={columns[breakpoint]}
      gap={breakpoint === 'medium' ? 'large' : 'medium'}
      justifyContent={breakpoint === 'medium' ? 'around' : 'center'}
    >
      {items.map((item, index) => (
        <Card
          myKey={index}
          key={index}
          img={item?.img}
          length={item?.length}
          title={item?.title}
          skeleton={loading ? skeleton : undefined}
          align={skeletonAlign}
          responsive={true}
        />
      ))}
    </Grid>
  );
};

Cards.propTypes = {
  heading: PropTypes.bool,
};

export default Cards;
