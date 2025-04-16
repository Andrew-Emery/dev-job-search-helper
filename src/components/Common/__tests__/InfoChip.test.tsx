import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Check from '@mui/icons-material/Check';
import { InfoChip } from '../InfoChip';
import userEvent from '@testing-library/user-event';
describe('InfoChip', () => {
  it('renders with default props', () => {
    render(<InfoChip label="Test Label" />);
    const chip = screen.getByText('Test Label');
    expect(chip).toBeInTheDocument();
    expect(chip).toHaveClass('MuiChip-label');
  });

  it('renders with tooltip', async () => {
    render(<InfoChip label="Test Label" tooltip="Test Tooltip" />);
    const chip = screen.getByText('Test Label');
    expect(screen.queryByText('Test Tooltip')).not.toBeInTheDocument();
    await userEvent.hover(chip);
    expect(await screen.findByText('Test Tooltip')).toBeInTheDocument();
  });

  it('renders with different colors', () => {
    const colors = ['default', 'primary', 'secondary', 'error', 'info', 'success', 'warning'] as const;
    
    colors.forEach(color => {
      const { unmount } = render(<InfoChip label="Test Label" color={color} />);
      const chip = screen.getByText('Test Label');
      expect(chip.parentElement?.getAttribute('class')).toContain(`${color.charAt(0).toUpperCase() + color.slice(1)}`);
      unmount();
    });
  });

  it('renders with icon', () => {
    render(<InfoChip label="Test Label" icon={<Check />} />);
    const icon = screen.getByTestId('CheckIcon');
    expect(icon).toBeInTheDocument();
  });

}); 