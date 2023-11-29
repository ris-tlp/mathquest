import { render, screen } from '@testing-library/react';
import { BrowserRouter, Router } from 'react-router-dom';
import { Provider } from 'react-redux'
import Header from '../components/Header';
import appStore from '../utils/appStore';


test('renders header', async () =>{
    render(<Provider store={appStore}><BrowserRouter><Header/></BrowserRouter></Provider>);

    const links = screen.getAllByRole("link");

    expect(links[0].href).toContain("http://localhost/dashboard");
    expect(links[1].href).toContain("http://localhost/all-courses");

});

