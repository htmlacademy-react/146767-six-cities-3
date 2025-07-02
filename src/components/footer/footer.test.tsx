import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import Footer from './footer';

describe('Component: Footer', () => {
  it('should render correctly with children', () => {
    const dataTestId = 'expected-component';
    const expectedComponent = <div data-testid={dataTestId} />;

    render(
      <Footer>
        {expectedComponent}
      </Footer>
    );

    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toHaveClass('footer');
    expect(screen.getByRole('contentinfo')).toHaveClass('container');
    expect(screen.getByTestId(dataTestId)).toBeInTheDocument();
  });

  it('should render without children (empty)', () => {
    render(
      <Footer>
        {null}
      </Footer>
    );

    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeEmptyDOMElement();
  });
});
