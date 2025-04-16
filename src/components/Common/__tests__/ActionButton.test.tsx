import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ActionButton } from '../ActionButton';
import { render } from '../../../test/test-utils';

describe('ActionButton', () => {
  it('renders children correctly', () => {
    render(<ActionButton>Click me</ActionButton>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('handles onClick events', async () => {
    const handleClick = vi.fn();
    render(<ActionButton onClick={handleClick}>Click me</ActionButton>);
    
    await userEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders as a link when "to" prop is provided', () => {
    render(<ActionButton to="/test">Link Button</ActionButton>);
    const link = screen.getByText('Link Button');
    expect(link).toHaveAttribute('href', '/test');
  });


  it('applies custom className', () => {
    const customClass = 'custom-button';
    render(
      <ActionButton className={customClass}>
        Styled Button
      </ActionButton>
    );
    expect(screen.getByText('Styled Button')).toHaveClass(customClass);
  });
}); 