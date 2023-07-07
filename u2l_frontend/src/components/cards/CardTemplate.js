import React, { forwardRef, useContext, useEffect } from 'react';
import { ThemeContext } from 'styled-components';
// import { defaultProps } from '../../default-props';
import { Box } from 'grommet';

const CardTemplate = forwardRef(({ myKey, ...rest }, ref) => {
  // const theme = useContext(ThemeContext) || defaultProps.theme;
  const theme = useContext(ThemeContext);

  return (
    <Box
      // color='grey'
      overflow='hidden'
      kind={{
        hover: theme.card.hover?.container,
        ...theme.card.container,
      }}
      key={myKey}
      ref={ref}
      {...theme.card.container}
      {...rest}
    />
  );
});

CardTemplate.displayName = 'Card';

export { CardTemplate };
