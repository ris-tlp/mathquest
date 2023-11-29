import { render, screen } from '@testing-library/react';
import { BrowserRouter, Router } from 'react-router-dom';
import { Provider } from 'react-redux'
import Overview from '../components/Overview';
import appStore from '../utils/appStore';

const course = {
    courseName: 'abc',
    courseDescription: 'def',
    courseSyllabus: 'geh',
    courseDuration: 300,
    passScore: 22,
    isPublished: true,
    courseImage: './test.jpg'
}

test('render overview', async () =>{
    render(<Provider store={appStore}><BrowserRouter><Overview {...{course}}/></BrowserRouter></Provider>);

    //test that correct information is printed out
    expect(screen.getByRole("heading")).toHaveTextContent('abc'); 
    expect(screen.getByText("def")).toBeInTheDocument(); 
    expect(screen.getByText(`Course Duration: ${course.courseDuration}`)).toBeInTheDocument(); 

});