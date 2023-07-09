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

  // const decideLable = () => {
  //   if(activeIndex === 0){
  //     'Next'
  //   } else if (activeIndex === 1){
  //     'Next'
  //   } else {
  //     'Proceed'
  //   }
  // }

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
        margin={{left:"10%"}}
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

        <Button
          id={nextId}
          icon={<FormNext />}
          // disabled={activeStep === 3}
          reverse
          label={activeIndex === steps.length - 1 ? 'Review + Create' : 'Next'}
          // label={decideLable}
          form={`${id}-form`}
          type="submit"
          onClick={activeIndex === 2 && onNavigate}
        />
      </Footer>
    </Box>
  );
};

StepFooter.propTypes = {
  nextId: PropTypes.string,
};

export default StepFooter;

