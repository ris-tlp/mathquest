import { render, screen } from '@testing-library/react';
import Courses from '../components/Courses';
import { BrowserRouter, Router } from 'react-router-dom';
import { Provider } from 'react-redux'
import appStore from '../utils/appStore';
import mockFetch from "../mocks/mockFetch";
import { act } from '@testing-library/react';
import React, { useState as useStateMock } from 'react'


beforeEach(() => {
    jest.spyOn(window, "fetch").mockImplementation(mockFetch);
    
 })

 afterEach(() => {
    jest.restoreAllMocks()
 });

 jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(),
  }))

test('view courses', async () =>{
    const setState = jest.fn()
    useStateMock.mockImplementation(init => [init, setState]);


    await act(async ()=>{ 
         render(<Provider store={appStore}><BrowserRouter><Courses/></BrowserRouter></Provider>);
    });

    expect(screen.getByRole("heading")).toHaveTextContent('Our top picks for you!'); 
    //expect(screen.getByRole("o")).toBeInTheDocument();
    expect(setState).toHaveBeenCalledTimes(1)
});