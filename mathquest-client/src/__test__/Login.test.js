import { render, screen } from '@testing-library/react';
//import { userEvent } from '@testing-library/user-event';
import userEvent from "@testing-library/user-event";
import { BrowserRouter, Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import Login from '../components/Login';
import appStore from '../utils/appStore';
import mockFetch from "../mocks/mockFetch";


test('renders login page', async () =>{ 
    render(<Provider store={appStore}><BrowserRouter><Login/></BrowserRouter></Provider>);
    
    //get background image
    const backgroundImg = document.querySelector('img[alt="background"]');

    expect(backgroundImg).toHaveAttribute('src', 'https://img.freepik.com/free-vector/hand-drawn-scientific-formulas-chalkboard_23-2148496321.jpg?w=740&t=st=1700597908~exp=1700598508~hmac=de3355e4b570207e444a6af9d965e3262c63e0ad716e4a91b22b0ed39a88d509');
    expect(screen.getByRole("heading")).toHaveTextContent(/Sign In/); 

    //mock sign in and register
    //const button = screen.getByRole("button");
    //button.find('button').simulate('click');
    
});

