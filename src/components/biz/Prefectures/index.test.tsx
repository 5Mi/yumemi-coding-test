import { vi, Mock } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Prefectures from './index';
import { usePrefecturesApi } from '@/api';

vi.mock('@/api');

describe('Prefectures Component', () => {
  const mockOnChange = vi.fn();
  const mockPrefectures = [
    { prefCode: 1, prefName: '北海道' },
    { prefCode: 2, prefName: '青森県' },
  ];

  beforeEach(() => {
    (usePrefecturesApi as Mock).mockReturnValue({
      response: mockPrefectures,
      isLoading: false,
    });
  });

  it('renders prefectures checkboxes', () => {
    render(<Prefectures selected={[]} onChange={mockOnChange} />);
    expect(screen.getByLabelText('北海道')).toBeInTheDocument();
    expect(screen.getByLabelText('青森県')).toBeInTheDocument();
  });

  it('calls onChange when checkbox is clicked', async () => {
    render(<Prefectures selected={[]} onChange={mockOnChange} />);

    const hokkaidoCheckbox = screen.getByLabelText('北海道');
    const aomoriCheckbox = screen.getByLabelText('青森県');

    // Check that the checkboxes are initially unchecked
    expect(hokkaidoCheckbox).not.toBeChecked();
    expect(aomoriCheckbox).not.toBeChecked();

    // It won't be selected because it is a controlled component.
    await userEvent.click(hokkaidoCheckbox);
    expect(mockOnChange).toHaveBeenCalledWith([{ prefCode: 1, prefName: '北海道' }]);
    expect(hokkaidoCheckbox).not.toBeChecked();

    // Simulate user clicking the Aomori checkbox
    await userEvent.click(aomoriCheckbox);
    expect(mockOnChange).toHaveBeenCalledWith([{ prefCode: 2, prefName: '青森県' }]);
    expect(aomoriCheckbox).not.toBeChecked();

    // Simulate user clicking the Hokkaido checkbox again to uncheck it
    await userEvent.click(hokkaidoCheckbox);
    expect(mockOnChange).toHaveBeenCalledWith([{ prefCode: 2, prefName: '青森県' }]);
    expect(hokkaidoCheckbox).not.toBeChecked();
  });

  it('renders prefectures checked', async () => {
    render(<Prefectures selected={mockPrefectures} onChange={mockOnChange} />);
    const hokkaidoCheckbox = screen.getByLabelText('北海道');
    const aomoriCheckbox = screen.getByLabelText('青森県');

    // Check that the checkboxes are initially checked
    expect(hokkaidoCheckbox).toBeChecked();
    expect(aomoriCheckbox).toBeChecked();

    await userEvent.click(hokkaidoCheckbox);
    expect(mockOnChange).toHaveBeenCalledWith([{ prefCode: 2, prefName: '青森県' }]);
    expect(hokkaidoCheckbox).toBeChecked();

    // Simulate user clicking the Aomori checkbox
    await userEvent.click(aomoriCheckbox);
    expect(mockOnChange).toHaveBeenCalledWith([{ prefCode: 1, prefName: '北海道' }]);
    expect(aomoriCheckbox).toBeChecked();

    // Simulate user clicking the Hokkaido checkbox again to uncheck it
    await userEvent.click(hokkaidoCheckbox);
    expect(mockOnChange).toHaveBeenCalledWith([{ prefCode: 2, prefName: '青森県' }]);
    expect(hokkaidoCheckbox).toBeChecked();
  });
});
