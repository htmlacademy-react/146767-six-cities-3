import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import styles from './preloader.module.css';
import Preloader from './preloader';

describe('Component: Preloader', () => {
  it('should render preloader with correct structure', () => {
    render(<Preloader />);

    const preloader = screen.getByTestId('preloader');
    const image = screen.getByRole('img');
    const text = screen.getByText('Loading...');

    expect(preloader).toBeInTheDocument();
    expect(preloader).toHaveClass(styles.preloader);

    expect(image).toBeInTheDocument();
    expect(image).toHaveClass(styles.preloader__image);
    expect(image).toHaveAttribute('src', 'img/preloader.svg');
    expect(image).toHaveAttribute('alt', 'preloader');

    expect(text).toBeInTheDocument();
    expect(text).toHaveClass(styles.preloader__text);
  });

  it('should have proper accessibility attributes', () => {
    render(<Preloader />);

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('alt', 'preloader');

    const status = screen.getByRole('status');
    expect(status).toBeInTheDocument();
  });
});
