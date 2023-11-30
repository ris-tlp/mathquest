import { render, screen } from '@testing-library/react';
import Course from '../components/Course';
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

test('view course', async () =>{
   // act(()=>{ 
        await render(<Provider store={appStore}><BrowserRouter><Course/></BrowserRouter></Provider>);
    //});

    //expect(screen.getByRole("heading")).toHaveTextContent('name'); 
    //expect(screen.getByText("name")).toBeInTheDocument(); 

});

