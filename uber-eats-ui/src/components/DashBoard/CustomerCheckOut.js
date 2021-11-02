/* eslint-disable import/named */
/* eslint-disable no-undef */
/* eslint-disable no-shadow */
/* eslint-disable no-alert */
/* eslint-disable import/no-named-as-default */
/* eslint-disable max-len */
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
// eslint-disable-next-line import/no-named-as-default-member
import { useDispatch, useSelector } from 'react-redux';
import NavigationBar from '../Navigation/NavigationBar';
import backendServer from '../../Config';
import Review from './Review';
import AddressForm from './AddressForm';
import { setDeliveryAddress, clearCart } from '../../state/action-creators/cartActionCreator';
import { setUser } from '../../state/action-creators/loginActionCreator';

const steps = ['Review your order', 'Delivery address', 'Place Order'];

const theme = createTheme();

export default function CustomerCheckOut() {
  const [activeStep, setActiveStep] = useState(0);
  const [addr1, setAddr1] = useState('');
  const [addr2, setAddr2] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [addressName, setAddressName] = useState('');
  const [checked, setChecked] = useState(false);
  const history = useHistory();
  const cart = useSelector((state) => state.cart.items);
  const mode = useSelector((state) => state.cart.mode);
  const customer = useSelector((state) => state.login.user);
  const restaurant = useSelector((state) => state.restaurant.currentRestaurant);
  const deliveryAddress = useSelector((state) => state.cart.address);
  const dispatch = useDispatch();

  const isPlaceOrder = () => activeStep + 1 === steps.length;

  const isAddressfilled = () => ((activeStep + 1 === 2));

  const cleanUpTransaction = () => {
    dispatch(clearCart());
  };

  const postOrder = () => {
    axios.post(`${backendServer}/orders/customer/${customer.CustomerId}`, {
      DeliveryAddress: deliveryAddress,
      Cart: cart,
      DeliveryType: mode,
      RestaurantId: restaurant.RestaurantId,
      CustomerName: customer.CustomerName,
      ImageUrl: customer.ImageUrl,
    })
      .then(() => {
        cleanUpTransaction();
      })
      .catch(() => {
        cleanUpTransaction();
        alert('An error occured while posting the order. Please try again.');
      });
  };

  const handleNext = async () => {
    if (isAddressfilled()) {
      if (('_id' in deliveryAddress) === false) {
        if (addr1 === '' || city === '' || state === '' || pincode === '' || country === '') {
          alert('Please enter all required fields in the address');
          return;
        }
        const address = {
          AddressLine1: addr1,
          AddressLine2: addr2,
          City: city,
          State: state,
          Country: country,
          Pincode: pincode,
          AddressName: addressName,
          Save: checked,
        };
        dispatch(setDeliveryAddress(address));
      }
    }
    if (isPlaceOrder()) {
      const customerId = customer.CustomerId;
      if (('_id' in deliveryAddress) === false) {
        const response = await axios.post(`${backendServer}/deliveryAddress/customer/${customerId}`, deliveryAddress);
        dispatch(setDeliveryAddress(response.data));
        customer.Address.push(response.data);
        dispatch(setUser(customer));
      }
      postOrder();
    }
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  useEffect(() => {
    if (!customer.CustomerId) {
      history.push('/');
    }
    if (!cart.length) {
      history.push('/customer/dashboard');
    }
  }, []);

  const onAddressChange = (event) => {
    switch (event.target.id) {
      case 'address1':
        setAddr1(event.target.value);
        break;
      case 'address2':
        setAddr2(event.target.value);
        break;
      case 'country':
        setCountry(event.target.value);
        break;
      case 'city':
        setCity(event.target.value);
        break;
      case 'state':
        setState(event.target.value);
        break;
      case 'zip':
        setPincode(event.target.value);
        break;
      case 'saveAddress':
        setChecked(event.target.checked);
        break;
      case 'addressName':
        setAddressName(event.target.value);
        break;
      default:
        break;
    }
  };

  const onViewStatus = () => {
    history.push('/customer/orders');
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <Review deliveryAddress={false} />;
      case 1:
        return <AddressForm onAddressChange={onAddressChange} />;
      case 2:
        return <Review deliveryAddress />;
      default:
        throw new Error('Unknown step');
    }
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavigationBar type="customer" />
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
          <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Typography component="h1" variant="h4" align="center">
              Checkout
            </Typography>
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <>
              {activeStep === steps.length ? (
                <>
                  <Typography variant="h5" gutterBottom>
                    Thank you for your order.
                  </Typography>
                  <Typography variant="subtitle1">
                    Your order is placed. You can check the status of your order in your orders page.
                  </Typography>
                  <Button onClick={onViewStatus} variant="outlined">Check Status</Button>
                </>
              ) : (
                <>
                  {getStepContent(activeStep)}
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                    )}
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 3, ml: 1 }}
                    >
                      {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                    </Button>
                  </Box>
                </>
              )}
            </>
          </Paper>
        </Container>
      </ThemeProvider>
    </>
  );
}
