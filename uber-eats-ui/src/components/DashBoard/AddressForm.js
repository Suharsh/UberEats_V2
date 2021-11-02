/* eslint-disable max-len */
/* eslint-disable no-alert */
/* eslint-disable no-empty */
/* eslint-disable import/named */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDeliveryAddress } from '../../state/action-creators/cartActionCreator';

export default function AddressForm(props) {
  const [addr1, setAddr1] = useState('');
  const [addr2, setAddr2] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [addressName, setAddressName] = useState('');
  const [checked, setChecked] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState('None');
  const [disableAddress, disableAddressSelection] = useState(false);
  const address = useSelector((state) => state.login.user.Address);
  const deliveryAddress = useSelector((state) => state.cart.address);

  const dispatch = useDispatch();

  const onAddressSelect = (event) => {
    const selectedAddress = address.filter((addr) => addr.AddressName === event.target.value)[0];
    if (event.target.value === 'None') {
      disableAddressSelection(false);
      setAddressName('');
      setSelectedAddress('');
      setAddressName('');
      setAddr1('');
      setAddr2('');
      setCity('');
      setCountry('');
      setState('');
      setPincode('');
      setSelectedAddress('None');
      setChecked(false);
      return;
    }
    disableAddressSelection(true);
    dispatch(setDeliveryAddress(selectedAddress));
    setAddressName(selectedAddress.AddressName);
    setAddr1(selectedAddress.AddressLine1);
    setAddr2(selectedAddress.AddressLine2);
    setCity(selectedAddress.City);
    setCountry(selectedAddress.Country);
    setState(selectedAddress.State);
    setPincode(selectedAddress.Pincode);
    setSelectedAddress(event.target.value);
    setChecked(true);
  };

  const onChecked = (event) => {
    if (event.target.checked) {
      const selectedAddress = address.filter((addr) => addr.AddressName === addressName)[0];
      if (selectedAddress) {
        setAddressName('');
        setChecked(false);
        alert('address with same name already exists');
      }
    }
  };

  useEffect(async () => {
    if (deliveryAddress) {
      setAddr1(deliveryAddress.AddressLine1);
      setAddr2(deliveryAddress.AddressLine2);
      setCity(deliveryAddress.City);
      setCountry(deliveryAddress.Country);
      setState(deliveryAddress.State);
      setPincode(deliveryAddress.Pincode);
      setAddressName(deliveryAddress.AddressName);
      setChecked(deliveryAddress.Save);
      setSelectedAddress(deliveryAddress.SavaAsName);
      if ('_id' in deliveryAddress) {
        setSelectedAddress(deliveryAddress.AddressName);
        disableAddressSelection(true);
        setChecked(true);
      }
      if (deliveryAddress.AddressName === 'None') {
        disableAddressSelection(false);
        setAddressName('');
      }
    }
  }, []);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Delivery address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            select
            id="addressSelect"
            value={selectedAddress}
            name="addressSelect"
            label="Select from existing address"
            onChange={onAddressSelect}
            fullWidth
            defaultValue=""
            autoComplete="delivery-address"
            variant="standard"
          >
            {address.map((addr) => (
              <MenuItem key={addr._id} value={addr.AddressName}>
                {addr.AddressName}
              </MenuItem>
            ))}
            <MenuItem key="None" value="None">
              None
            </MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            disabled={disableAddress}
            fullWidth
            value={addr1}
            onChange={(e) => { props.onAddressChange(e); setAddr1(e.target.value); }}
            autoComplete="delivery address-line1"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            value={addr2}
            disabled={disableAddress}
            onChange={(e) => { props.onAddressChange(e); setAddr2(e.target.value); }}
            autoComplete="delivery address-line2"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            value={city}
            disabled={disableAddress}
            onChange={(e) => { props.onAddressChange(e); setCity(e.target.value); }}
            autoComplete="delivery address-level2"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            required
            value={state}
            disabled={disableAddress}
            onChange={(e) => { props.onAddressChange(e); setState(e.target.value); }}
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            value={pincode}
            disabled={disableAddress}
            onChange={(e) => { props.onAddressChange(e); setPincode(e.target.value); }}
            autoComplete="delivery postal-code"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            value={country}
            disabled={disableAddress}
            onChange={(e) => { props.onAddressChange(e); setCountry(e.target.value); }}
            autoComplete="delivery country"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="addressName"
            name="addressName"
            label="Save Address as"
            fullWidth
            value={addressName}
            disabled={disableAddress}
            onChange={(e) => { props.onAddressChange(e); setAddressName(e.target.value); }}
            autoComplete="Save address as"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={(
              <Checkbox
                color="secondary"
                onChange={(e) => { onChecked(e); props.onAddressChange(e); setChecked(e.target.checked); }}
                id="saveAddress"
                disabled={disableAddress}
                name="saveAddress"
                checked={checked}
              />
)}
            label="Save this address"
          />
        </Grid>
      </Grid>
    </>
  );
}
