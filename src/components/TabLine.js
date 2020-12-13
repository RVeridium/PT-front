import React, {useState} from 'react';
import Customers from './Customers';
import Trainings from './Trainings';
import PTCalendar from './PTCalendar';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs'; 
import Tab from '@material-ui/core/Tab';

export default function TabLine() {

    const [value, setValue] = useState('one'); 
    const handleChange = (event, value) => {
        setValue(value); 
    };
    return(
        <div>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange}>
                    <Tab value="one" label="Customers" />
                    <Tab value="two" label="Trainings" />
                    <Tab value="three" label="Calendar" />
                </Tabs>
            </AppBar>
            {value === 'one' && <div><Customers/></div>}
            {value === 'two' && <div><Trainings/></div>}
            {value === 'three' && <div><PTCalendar/></div>}
        </div>
    )

    
}