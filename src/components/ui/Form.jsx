import React from 'react'
import { Card, Box, Typography } from "@mui/material"
import Button from './Button'
const Form = ({ children, onSubmit, formTitle }) => {
    return (
        <section className='form-background  bg-cover bg-fixed ' >
            <div className=" bg-slate-900/50 p-5">
                <Card className=' mx-auto lg:w-2/4 w-full p-10 shadow-lg rounded' sx={{ backgroundColor: 'rgba(0,0,0,.5)', color: '#fff', backdropFilter: 'blur(10px)' }} >
                    <Typography className='text-center font-bold ' sx={{marginBottom:'20px'}} component="h1"> {formTitle} </Typography>
                    <Box
                        component="form"
                        autoComplete='true'
                        sx={{ display: 'flex', flexDirection: 'column', gap: '20px', label: { color: "#fff" , fontSize:'14px'}, caretColor: "#fff", input: { color: "#fff", borderBottom: "1px solid #fff" } }}
                        noValidate
                        onSubmit={onSubmit}
                    >
                        {children}
                        <Button type="submit" className="lg:w-auto my-5" >Submit</Button>
                    </Box>
                </Card>
            </div>
        </section>
    )
}

export default Form
