import { render, screen } from '@testing-library/react';
import Dashboard from '../components/Dashboard';
import { BrowserRouter, Router } from 'react-router-dom';
import { Provider } from 'react-redux'
import appStore from '../utils/appStore';
import mockFetch from "../mocks/mockFetch";
import { act } from '@testing-library/react';


beforeEach(() => {
    jest.spyOn(window, "fetch").mockImplementation(mockFetch);
 })

 afterEach(() => {
    jest.restoreAllMocks()
 });

test('load dashboard', async () =>{
    act(()=>{ 
        render(<Provider store={appStore}><BrowserRouter><Dashboard/></BrowserRouter></Provider>);
    });

    expect(screen.getByRole("img")).toHaveAttribute('src', 'logo-black.png'); 

});

