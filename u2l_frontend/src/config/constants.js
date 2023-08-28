import {
  StatusWarningSmall,
  StatusCriticalSmall,
  StatusGoodSmall,
  StatusUnknownSmall,
} from 'grommet-icons';

const statusIcons = {
  Warning: <StatusWarningSmall color='status-warning' size='small' />,
  OK: <StatusGoodSmall color='status-ok' size='small' />,
  Critical: <StatusCriticalSmall color='status-critical' size='small' />,
  Started: <StatusUnknownSmall color='status-unknown' size='small' />,
};

export default statusIcons;
