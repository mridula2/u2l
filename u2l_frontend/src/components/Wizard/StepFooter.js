import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Footer, ResponsiveContext } from 'grommet';
import { FormNextLink, LinkPrevious } from 'grommet-icons';
import WizardContext from '../Wizard/WizardContext';

const StepFooter = ({ nextId, previousId, onNavigate, ...rest }) => {
  const size = useContext(ResponsiveContext);
  const { activeIndex, id, steps, width, activeStep, setActiveIndex } =
    useContext(WizardContext);

  return (
    <Box
      margin={
        !['xsmall', 'small'].includes(size)
          ? { horizontal: 'medium' }
          : undefined
      }
      flex={false}
      {...rest}
    >
      <Footer
        justify="end"
        pad={
          !['xsmall', 'small'].includes(size)
            ? { vertical: 'medium' }
            : { vertical: 'small', horizontal: 'medium' }
        }
        alignSelf="start"
        width={width}
        gap="large"
      >
        {activeStep > 1 && (
          <Button
            align="start"
            id={previousId}
            label={
              !['xsmall', 'small'].includes(size)
                ? (steps[activeIndex - 1] && steps[activeIndex - 1].title) ||
                  `Step ${activeStep - 1} title`
                : // `Previous`
                  undefined
            }
            icon={<LinkPrevious />}
            onClick={() => setActiveIndex(activeIndex - 1)}
          />
        )}

        {activeIndex === steps.length - 1 && (
          <Button
            id={nextId}
            primary
            reverse
            label="Review + Create"
            form={`${id}-form`}
            onClick={onNavigate}
          />
        )}

        <Button
          id={nextId}
          icon={<FormNextLink />}
          primary
          reverse
          label={activeIndex === steps.length - 1 ? 'Proceed' : 'Next'}
          form={`${id}-form`}
          type="submit"
        />
      </Footer>
    </Box>
  );
};

StepFooter.propTypes = {
  nextId: PropTypes.string,
};

export default StepFooter;

