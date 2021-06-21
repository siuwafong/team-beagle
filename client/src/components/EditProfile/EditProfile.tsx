import { useState } from 'react';
import { Grid, Typography, TextField, Button, Switch, InputAdornment, FormHelperText } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import CssBaseline from '@material-ui/core/CssBaseline';
import useStyles from './useStyles';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function EditProfile(): JSX.Element {
  const classes = useStyles();

  const [available, setAvailable] = useState(false);

  const handleSwitch = () => {
    formik.setFieldValue('available', !available);
    setAvailable(!available);
  };

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const formik = useFormik({
    initialValues: {
      available: false,
      firstName: '',
      lastName: '',
      primaryPhone: '',
      secondaryPhone: '',
      address: '',
      selfDescription: '',
    },
    validationSchema: Yup.object({
      available: Yup.boolean().required(),
      firstName: Yup.string()
        .max(20, 'Please enter a first name that is 20 characters or less')
        .required('Your first name is required'),
      lastName: Yup.string()
        .max(20, 'Please enter a last name that is 20 characters or less')
        .required('Your last name is required'),
      primaryPhone: Yup.string()
        .matches(phoneRegExp, 'Phone number is not valid')
        .max(14, 'You must enter a ten-digit phone number with the area code')
        .min(10, 'You must enter a ten-digit phone number with the area code')
        .required('Your primary phone is required'),
      secondaryPhone: Yup.string()
        .matches(phoneRegExp, 'Phone number is not valid')
        .max(14, 'You must enter a ten-digit phone number with the area code')
        .min(10, 'You must enter a ten-digit phone number with the area code'),
      address: Yup.string()
        .max(40, 'Please enter your address in 40 characters or less')
        .required('Your address is required'),
      selfDescription: Yup.string()
        .max(300, 'Please describe yourself in 300 characters or less')
        .required('Your self description is required'),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values));
    },
  });

  return (
    <Grid className={classes.root}>
      <CssBaseline />
      <form onSubmit={formik.handleSubmit}>
        <Typography className={classes.settingsHeading}>Edit Profile</Typography>
        <Grid className={classes.formItem}>
          <Typography className={classes.formLabel}>I&apos;M AVAILABLE</Typography>
          <Switch id="available" checked={available} onChange={handleSwitch} name="available" />
        </Grid>
        <Grid className={classes.formItem}>
          <Typography className={classes.formLabel}>AVAILABILITY</Typography>
        </Grid>
        <Grid className={classes.formItem}>
          <Typography className={classes.formLabel}>FIRST NAME</Typography>
          <TextField
            className={`${classes.formInput}`}
            size="small"
            variant="outlined"
            placeholder="John"
            type="string"
            id="firstName"
            error={formik.touched.firstName && formik.errors.firstName !== undefined}
            helperText={formik.touched.firstName && formik.errors.firstName ? formik.errors.firstName : ''}
            {...formik.getFieldProps('firstName')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {formik.touched.firstName && !formik.errors.firstName && <CheckCircleIcon />}
                  {formik.touched.firstName && formik.errors.firstName && <ErrorIcon />}
                </InputAdornment>
              ),
            }}
            inputProps={{ maxLength: 20 }}
          />
        </Grid>
        <Grid className={classes.formItem}>
          <Typography className={classes.formLabel}>LAST NAME</Typography>
          <TextField
            className={`${classes.formInput}`}
            size="small"
            variant="outlined"
            placeholder="Doe"
            type="string"
            id="lastName"
            {...formik.getFieldProps('lastName')}
            error={formik.touched.lastName && formik.errors.lastName !== undefined}
            helperText={formik.touched.lastName && formik.errors.lastName ? formik.errors.lastName : ''}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {formik.touched.lastName && !formik.errors.lastName && <CheckCircleIcon />}
                  {formik.touched.lastName && formik.errors.lastName && <ErrorIcon />}
                </InputAdornment>
              ),
            }}
            inputProps={{ maxLength: 20 }}
          />
        </Grid>
        <Grid className={classes.formItem}>
          <Typography className={classes.formLabel}>PHONE NUMBERS</Typography>
          <Grid className={classes.phoneContainer}>
            <TextField
              className={`${classes.formInput}`}
              size="small"
              type="string"
              variant="outlined"
              placeholder="Example: 1234567890"
              {...formik.getFieldProps('primaryPhone')}
              error={formik.touched.primaryPhone && formik.errors.primaryPhone !== undefined}
              label="Primary"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {formik.touched.primaryPhone && !formik.errors.primaryPhone && <CheckCircleIcon />}
                    {formik.touched.primaryPhone && formik.errors.primaryPhone && <ErrorIcon />}
                  </InputAdornment>
                ),
              }}
              inputProps={{ maxLength: 14 }}
            />
            <TextField
              className={`${classes.formInput}`}
              size="small"
              type="string"
              variant="outlined"
              placeholder="Example: 1234567890"
              {...formik.getFieldProps('secondaryPhone')}
              error={formik.touched.secondaryPhone && formik.errors.secondaryPhone !== undefined}
              label="Secondary"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {formik.touched.secondaryPhone && !formik.errors.secondaryPhone && <CheckCircleIcon />}
                    {formik.touched.secondaryPhone && formik.errors.secondaryPhone && <ErrorIcon />}
                  </InputAdornment>
                ),
              }}
              inputProps={{ maxLength: 14 }}
            />
          </Grid>
        </Grid>
        <FormHelperText
          error={
            formik.touched.primaryPhone &&
            formik.touched.secondaryPhone &&
            (formik.errors.primaryPhone !== undefined || formik.errors.secondaryPhone !== undefined)
          }
          className={classes.phoneHelperText}
        >
          Include the digits only with no spaces
        </FormHelperText>
        <Grid className={classes.formItem}>
          <Typography className={classes.formLabel}>WHERE YOU LIVE</Typography>
          <TextField
            className={`${classes.formInput}`}
            size="small"
            variant="outlined"
            placeholder="Address"
            {...formik.getFieldProps('address')}
            error={formik.touched.address && formik.errors.address !== undefined}
            helperText={formik.touched.address && formik.errors.address ? formik.errors.address : ''}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {formik.touched.address && !formik.errors.address && <CheckCircleIcon />}
                  {formik.touched.address && formik.errors.address && <ErrorIcon />}
                </InputAdornment>
              ),
            }}
            inputProps={{ maxLength: 40 }}
          />
        </Grid>
        <Grid className={classes.formItem}>
          <Typography className={classes.formLabel}>DESCRIBE YOURSELF</Typography>
          <TextField
            className={`${classes.formInput} ${classes.formTextField}`}
            size="small"
            variant="outlined"
            placeholder="About you in 300 characters or less"
            type="string"
            multiline={true}
            rows={4}
            {...formik.getFieldProps('selfDescription')}
            error={formik.touched.selfDescription && formik.errors.selfDescription !== undefined}
            helperText={
              formik.touched.selfDescription && formik.errors.selfDescription ? formik.errors.selfDescription : ''
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {formik.touched.selfDescription && !formik.errors.selfDescription && <CheckCircleIcon />}
                  {formik.touched.selfDescription && formik.errors.selfDescription && <ErrorIcon />}
                </InputAdornment>
              ),
            }}
            inputProps={{ maxLength: 300 }}
          />
        </Grid>
        <Grid className={classes.submitBtn}>
          <Button type="submit" variant="contained" color="primary" size="large">
            Submit
          </Button>
        </Grid>
      </form>
    </Grid>
  );
}
