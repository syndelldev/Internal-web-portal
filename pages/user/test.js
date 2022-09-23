import React, { useEffect, useState , useRef } from "react";
// import stack from '@mui/material/Stack';  
import AdapterDateFns from '@mui/lab/AdapterDateFns';  
import LocalizationProvider from '@mui/lab/LocalizationProvider';  
import DateTimePicker from '@mui/lab/DateTimePicker';  
import TimePicker from '@mui/lab/TimePicker';  
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';  
import TextField from '@mui/material/TextField';  
import MobileDatePicker from '@mui/lab/MobileDatePicker';  

export default function Test(){
    const [value, setValue] = useState ();  
    const handleChange = (newValue) =>  {  
        setValue(newValue);  
    };  

    return(
        <>
                        
            <div class="basic" >
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <MobileDatePicker  
                        label="Movable Date"  
                        inputFormat="mm/dd/yyyy"  
                        value={value}  
                        onChange={handleChange}  
                        renderInput={(parameters) => <TextField {...parameters} />}  
                    />  
                </LocalizationProvider>
            </div>
          
        
        </>
    )
}