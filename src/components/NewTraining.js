import React, { useState, useEffect } from 'react'; 
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MomentUtils from '@date-io/moment';
import moment from 'moment'; 
import {
    DateTimePicker,
    MuiPickersUtilsProvider,
  } from '@material-ui/pickers';


export default function NewTraining(props) {
    const [open, setOpen] = useState(false);
    const [dateJ, setDate] = useState(moment()); 
    const [training, setTraining] = useState({date: '', duration: '', activity: '', customer: props.cust});

    const handleClickOpen = () => {
    setOpen(true);
    }
    
    
    const handleClose = () => {
        setOpen(false);
    };

    const newInput = (event) => {
        setTraining({...training, [event.target.name]: event.target.value})
    }
    useEffect(() => {
        setTraining({...training, date: dateJ.toISOString()});
    }, [dateJ]);

    const addNew = () => {
        props.addNewT(training); 
        handleClose(); 
    }

    return(
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Add new training
            </Button>
            <MuiPickersUtilsProvider utils={MomentUtils}>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Insert training details</DialogTitle>
                <DialogContent>
                 <DateTimePicker margin="dense" label="date" value={dateJ} onChange={dateJ => setDate(dateJ)} />
                 <TextField
                    margin="dense"
                    name="duration"
                    label="duration"
                    value={training.duration}
                    onChange={e=>newInput(e)}
                />
                 <TextField
                    margin="dense"
                    name="activity"
                    label="activity"
                    value={training.activity}
                    onChange={e=>newInput(e)}
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={addNew} colors="primary">
                    Save
                </Button>
                </DialogActions>
            </Dialog>
            </MuiPickersUtilsProvider>
        </div>
    )
}