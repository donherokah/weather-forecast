import React from "react";

// import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import AutocompleteSearch from "./autcomplete";

const PopupContent = ({modalOpen,handleClose,setWeatherPreferenceList}:any) => {
  
  
  const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction={'down'} ref={ref} {...props} />;
  });



  return (
          <Dialog
            open={modalOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
          >
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <AutocompleteSearch handleClose={handleClose} setWeatherPreferenceList={setWeatherPreferenceList}/>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        </DialogActions>
      </Dialog>
  );
};

export default PopupContent;
