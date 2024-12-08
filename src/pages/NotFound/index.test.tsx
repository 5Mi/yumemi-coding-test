import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter for routing
import NotFound from './index';

describe('NotFound Component', () => {
  it('renders correctly with title and link', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );

    // Check if the title is rendered
    expect(screen.getByText('Not Found - 404')).toBeInTheDocument();

    // Check if the error message is rendered
    expect(screen.getByText('An error has occurred, to continue:')).toBeInTheDocument();

    // Check if the link to the homepage is rendered
    const linkElement = screen.getByRole('link', { name: /homepage/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/'); // Check if the link points to the homepage
  });
});
