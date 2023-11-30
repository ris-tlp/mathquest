import { render, screen } from '@testing-library/react';
import { BrowserRouter, Router } from 'react-router-dom';
import { Provider } from 'react-redux'
import Profile from '../components/Profile';
import appStore from '../utils/appStore';


test('profile view', async () =>{
    render(<Provider store={appStore}><BrowserRouter><Profile/></BrowserRouter></Provider>);

    //ensure links are loading properly
    const links = screen.getAllByRole("link");
    expect(links[0].href).toContain("http://localhost/dashboard");
    expect(links[1].href).toContain("http://localhost/all-courses");

});