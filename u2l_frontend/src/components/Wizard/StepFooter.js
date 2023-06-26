import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Footer, ResponsiveContext } from 'grommet';
import { FormNext, Previous } from 'grommet-icons';
import WizardContext from '../Wizard/WizardContext';

const StepFooter = ({ nextId, previousId, onNavigate, ...rest }) => {
  const size = useContext(ResponsiveContext);
  const [btnDisable, setButtonDisable] = useState(false);
  const { activeIndex, id, steps, width, activeStep, setActiveIndex } =
    useContext(WizardContext);

  const handleBtn = () => {
    setButtonDisable(true)
  }

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
        // margin={{left:"large"}}
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
            icon={<Previous />}
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
          icon={<FormNext />}
          // disabled={!btnDisable && (activeStep === 0 || activeStep === 1 || activeStep === 2)}
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

