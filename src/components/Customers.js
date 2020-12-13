import React, { useState, useEffect, forwardRef } from 'react';
import MaterialTable from 'material-table';
import Search from '@material-ui/icons/Search'
import SaveAlt from '@material-ui/icons/SaveAlt'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import Check from '@material-ui/icons/Check'
import FilterList from '@material-ui/icons/FilterList'
import Remove from '@material-ui/icons/Remove'
import Clear from '@material-ui/icons/Clear'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import NewCustomer from './NewCustomer'; 
import NewTraining from './NewTraining'; 

const tableIcons = {
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteIcon {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <EditIcon {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />)
  };


export default function Customers() {
    const [customers, setCustomers] = useState([]);


    function fetchAll() {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(list => setCustomers(list.content))
    };
    const addNewT = (training) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST', 
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(training)
        })
        .then(res => fetchAll())
        .catch(err => console.log(err));
    }; 


    useEffect(() => fetchAll(), []);
    const columns = [{title: 'Add Training', field: 'links[0].href', 
    render: rowData => <NewTraining addNewT={addNewT} cust={rowData.links[0].href}/>}, 
    {title: 'First Name', field: 'firstname'}, 
    {title: 'Last Name', field: 'lastname'}, 
    {title: 'Street Address', field: 'streetaddress'}, 
    {title: 'Postal Code', field: 'postcode'}, 
    {title: 'City', field: 'city'}, 
    {title: 'Email', field: 'email'}, 
    {title: 'Phone', field: 'phone'}]; 

    const addNew = (customer) => {
      fetch('https://customerrest.herokuapp.com/api/customers', {
          method: 'POST', 
          headers: {'Content-type': 'application/json'},
          body: JSON.stringify(customer)
      })
      .then(res => fetchAll())
      .catch(err => console.log(err));
  }; 
  

      const actions = [
            {icon: SaveAlt, 
            tooltip: 'Export',
            isFreeAction: true,  
            onClick: (event) => alert('rare exports')}, 
            ]
        const handleUpdate = (newData, oldData, resolve) => {
            const customer = {firstname: newData.firstname, 
                lastname: newData.lastname, streetaddress: newData.streetaddress, 
                postcode: newData.postcode, city: newData.city, email: newData.email, phone: newData.phone}
                fetch(newData.links[0].href, {
                    method: 'PUT', 
                    headers: {'Content-type': 'application/json'},
                    body: JSON.stringify(customer)
                })
                .then(res => fetchAll())
                .catch(err => console.log(err));
            
            resolve()
        }
        const handleDelete = (oldData, resolve) => {
            console.log(oldData)
            fetch(oldData.links[0].href, {method: 'DELETE'})
            .then(res => fetchAll())
            .catch(err => console.log(err));
            resolve()
        }
            
        

            


    return(
        <div>
          <div className='newCustomer'><NewCustomer addNew={addNew}/></div>
            <MaterialTable 
            columns={columns}
            data={customers}
            title='All customers'
            options= {{filtering: true}}
            icons={tableIcons}
            actions={actions}
            editable={{
                onRowUpdate: (newData, oldData) => new Promise((resolve) => { handleUpdate(newData, oldData, resolve);}), 
                onRowDelete: (oldData) => new Promise((resolve) => { handleDelete(oldData, resolve)}),
            }}
            />
        </div>
    )
}