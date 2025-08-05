import React from 'react'
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useSelector } from 'react-redux';

const AccordionUI = ({ title, children }) => {

    const { theme } = useSelector((store) => store.theme)
    
    return (
        <Accordion
            sx={{ boxShadow: 'none', backgroundColor: theme === "dark" ? 'transparent' : "", color: theme === "dark" ? "white" : 'black'}}>
            <AccordionSummary
                expandIcon={<ArrowDropDownIcon className='dark:text-white' />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <p className="text-xl font-bold dark:text-white">{title}</p>
            </AccordionSummary>
            <AccordionDetails>
                {children}
            </AccordionDetails>
        </Accordion>
    )
}

export default AccordionUI
