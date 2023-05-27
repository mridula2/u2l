import React, { forwardRef, useContext } from 'react';
import { ThemeContext } from 'styled-components';
// import { defaultProps } from '../../default-props';
import { Box } from 'grommet';

const Card = forwardRef(({ ...rest }, ref) => {
  // const theme = useContext(ThemeContext) || defaultProps.theme;
  const theme = useContext(ThemeContext);

  return (
    <Box
      // color='grey'
      title='Card1.......'
      overflow="hidden"
      kind={{
        hover: theme.card.hover?.container,
        ...theme.card.container,
      }}
      ref={ref}
      {...theme.card.container}
      {...rest}
    />
  );
});

Card.displayName = 'Card';

export { Card };