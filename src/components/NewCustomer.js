import React, { useState } from 'react'; 
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function NewCustomer(props) {
    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState({
        firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone:''
    });
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const newInput = (event) => {
        setCustomer({...customer, [event.target.name]: event.target.value})
    }

    const addNew = () => {
        props.addNew(customer); 
        handleClose(); 
    }




    return(
        <div>
            <Button style={{margin: '10px'}}variant="outlined" color="primary" onClick={handleClickOpen}>
                Add new customer
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Insert customer details</DialogTitle>
                <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    name="firstname"
                    value={customer.firstname}
                    label="Firstname"
                    onChange={e=>newInput(e)}
                />
                 <TextField
                    margin="dense"
                    name="lastname"
                    label="Lastname"
                    value={customer.lastname}
                    onChange={e=>newInput(e)}
                />
                 <TextField
                    margin="dense"
                    name="streetaddress"
                    label="streetaddress"
                    value={customer.streetaddress}
                    onChange={e=>newInput(e)}
                />
                 <TextField
                    margin="dense"
                    name="postcode"
                    label="Postcode"
                    value={customer.postcode}
                    onChange={e=>newInput(e)}
                />
                <TextField
                    margin="dense"
                    name="city"
                    label="City"
                    value={customer.city}
                    onChange={e=>newInput(e)}
                />
                <TextField
                    margin="dense"
                    name="email"
                    label="Email"
                    value={customer.email}
                    onChange={e=>newInput(e)}
                />
                 <TextField
                    margin="dense"
                    name="phone"
                    label="Phone"
                    value={customer.phone}
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
        </div>
    )
}