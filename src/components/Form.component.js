import React, { Component }  from "react";
import { InputLabel,Input,Container,Typography,Box } from '@material-ui/core';
import * as Yup from "yup";
import { Formik } from 'formik';
import Error from './Error';
import axios from 'axios';
import MaskedInput from "react-text-mask";

const validationSchema = Yup.object().shape({
	email: Yup.string()
		.email('Enter a valid email Address')
		.required('Enter a email address'),
	phone_number: Yup.string()
	.required('Enter a phone number')
	.min(13, 'Enter a valid phone number')
    .max(13, 'Enter a valid phone number'),
    zipcode: Yup.number()
});

export default class Form extends Component {
	constructor(props) {
		super(props);
		  this.state = {
			selectedFile: null
		  }
	  }
	
	  onChangeHandler=event=>{
		this.setState({
			selectedFile: event.target.files[0],
			loaded: 0,
		  })
	}

	render(){
		return (
			<>
            <div className="container mb-5">
				<Typography component="h4" variant="h4" align="center" color="textPrimary" gutterBottom>
	              Add user 
	            </Typography>
				<Box color="text.primary">
				<Container maxWidth="sm">
					<Formik initialValues={{ email: '', name: '',phone_number:'',address:'',zipcode:'' }}
							validationSchema = {validationSchema}
							onSubmit={values => {
                                values.image = this.state.selectedFile;
								axios.post('http://localhost:5000/users/add', values)
                                    .then(res => console.log(res.data));
                                    
                                window.location = "/";
							}}
					>
						{({values, errors, touched, handleBlur, handleChange, handleSubmit}) => (
							<form onSubmit={handleSubmit}>
							 <InputLabel>Name</InputLabel>
					         <Input
					            type="text"
					            name="name"
					            placholder="Name"
								label="Name"
								onChange={handleChange}
					            onBlur={handleBlur}
					            value={values.name}
					          />
							  <br /><br />
					          <InputLabel>Email</InputLabel>	
					          <Input
					            type="email"
								name="email"
								value={values.email}
					            placholder="Email"
								label="Email"
								onChange={handleChange}
					            onBlur={handleBlur}
					          />
							  <Error touched={touched.email} message={errors.email}/>
					          <br /><br />
					          <InputLabel>Phone Number</InputLabel>	
					          <MaskedInput type="text"
					            name="phone_number"
								placholder="Phone Number"
								onChange={handleChange}
                                onBlur={handleBlur}
					            value={values.phone_number}
                                mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/,/\d/,/\d/ ]} guide={false} />
					          <Error touched={touched.phone_number} message={errors.phone_number}/>
					          <br /><br />
					          <InputLabel>Address</InputLabel>	
					          <Input
					            type="text"
					            name="address"
								placholder="Address"
								onChange={handleChange}
					            onBlur={handleBlur}
					            value={values.address}
					          />
					          <br />
					          <br />
					          <InputLabel>Zipcode</InputLabel>	
					          <Input
					            type="text"
					            name="zipcode"
								placholder="zipcode"
								onChange={handleChange}
					            onBlur={handleBlur}
					            value={values.zipcode}
					          />
                              <Error touched={touched.zipcode} message={errors.zipcode}/>
					          <br />
					          <br />
					          <InputLabel>Image/Doc</InputLabel>
					          <Input type="file"  name="file" onChange={this.onChangeHandler}  /><br /><br />
					          <input
				                    type="submit"
				                    variant="contained"
				                    component="span"
				                    color="primary"
				                />
							</form>
						)
					}
					</Formik>
				</Container>
				</Box>
                </div>
            </>
			);
	}
}