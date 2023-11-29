import { render, screen } from '@testing-library/react';
import Footer from '../components/Footer';

test('renders footer', async () =>{
    render(<Footer/>);
    
    expect(screen.getByRole("heading")).toHaveTextContent(/Follow Us/); 

    //check text
    const links = screen.getAllByRole("link");
    expect(links[0]).toHaveTextContent('Facebook');
    expect(links[1]).toHaveTextContent('LinkedIn');
    expect(links[2]).toHaveTextContent('Instagram');

    //check links
    expect(screen.getByText('Facebook').closest('a')).toHaveAttribute('href', 'https://www.facebook.com/');
    expect(screen.getByText('LinkedIn').closest('a')).toHaveAttribute('href', 'https://www.linkedin.com/')
    expect(screen.getByText('Instagram').closest('a')).toHaveAttribute('href', 'https://www.instagram.com/')


});