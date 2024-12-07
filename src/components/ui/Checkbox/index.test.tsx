import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Checkbox from './index';

describe('Checkbox Component', () => {
  const labelProps = { htmlFor: 'test-checkbox' };
  const inputProps = { id: 'test-checkbox', onChange: vi.fn() };

  it('renders correctly with label', () => {
    render(
      <Checkbox inputProps={inputProps} labelProps={labelProps}>
        Test Label
      </Checkbox>,
    );
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
  });

  it('calls onChange when clicked', async () => {
    render(
      <Checkbox inputProps={inputProps} labelProps={labelProps}>
        Test Label
      </Checkbox>,
    );

    const checkbox = screen.getByLabelText('Test Label');

    // Check that the checkbox is initially unchecked
    expect(checkbox).not.toBeChecked();

    // Simulate user clicking the checkbox
    await userEvent.click(checkbox);

    // Check that the onChange handler was called
    expect(inputProps.onChange).toHaveBeenCalled();

    // Check that the checkbox is now checked
    expect(checkbox).toBeChecked();

    // Simulate user clicking the checkbox again to uncheck it
    await userEvent.click(checkbox);

    // Check that the onChange handler was called again
    expect(inputProps.onChange).toHaveBeenCalledTimes(2);

    // Check that the checkbox is now unchecked
    expect(checkbox).not.toBeChecked();
  });
});
