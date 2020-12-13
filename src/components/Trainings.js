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
import moment from 'moment'; 


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

export default function Trainings() {
    const [training, setTraining] = useState([]);
   

    function fetchAllT() {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(list => setTraining(list))
    };
    
    useEffect(() => fetchAllT(), []);
    const columns = [{title: 'Date', field: 'date', render: row =><span>{ moment(row['date']).format('D.MM.YYYY HH.mm') }</span>}, 
    {title: 'Duration (mins)', field: 'duration'}, 
    {title: 'Activity', field: 'activity'}, 
    {title: 'Firstname', field: 'customer.firstname'}, {title: 'Lastname', field: 'customer.lastname'}] 

      const actions = [ 
            {icon: SaveAlt, 
            tooltip: 'Export',
            isFreeAction: true,  
            onClick: (event) => alert('new people')}]
            
            const handleUpdate = (newData, oldData, resolve) => {
                console.log(newData)
                const upTraining = {date: newData.date, duration: newData.duration, 
                    activity: newData.activity, customer: `https://customerrest.herokuapp.com/api/customers/${newData.customer.id}`}
                fetch(`https://customerrest.herokuapp.com/api/trainings/${oldData.id}`, {
                    method: 'PUT', 
                    headers: {'Content-type': 'application/json'},
                    body: JSON.stringify(upTraining)
                })
                .then(res => fetchAllT())
                .catch(err => console.log(err));
                resolve()
            }
            const handleDelete = (oldData, resolve) => {
                console.log(oldData)
                fetch(`https://customerrest.herokuapp.com/api/trainings/${oldData.id}`, {method: 'DELETE'})
                .then(res => fetchAllT())
                .catch(err => console.log(err));
                resolve(); 
            }

    return(
        <div>
            <MaterialTable 
            columns={columns}
            data={training}
            title='All trainings'
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