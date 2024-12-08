import { vi, Mock } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PopulationChart from './index';
import { requestPerYear } from '@/api';
import getColorRandom from '@/utils/randomColorGenerator';

window.ResizeObserver =
  window.ResizeObserver ||
  vi.fn().mockImplementation(() => ({
    disconnect: vi.fn(),
    observe: vi.fn(),
    unobserve: vi.fn(),
  }));

vi.mock('@/api');
vi.mock('@/utils/randomColorGenerator');

const labelDatas = [
  { label: '総人口', data: [{ year: 1960, value: 1760421 }] },
  { label: '年少人口', data: [{ year: 1960, value: 1641245 }] },
  { label: '生産年齢人口', data: [{ year: 1960, value: 1641245 }] },
  { label: '老年人口', data: [{ year: 1960, value: 1641245 }] },
];

describe('PopulationChart Component', () => {
  const mockSelectFectures = [{ prefCode: 1, prefName: 'Hokkaido' }];

  beforeEach(() => {
    (requestPerYear as Mock).mockResolvedValue(labelDatas);
    (getColorRandom as Mock).mockReturnValue(['#ff0000']);
  });

  it('updates chart when selectFectures prop changes', async () => {
    render(<PopulationChart selectFectures={mockSelectFectures} />);
    expect(await screen.findByText('人口構成を選びください')).toBeInTheDocument();
  });

  it('handles checkbox changes and updates chart accordingly', async () => {
    render(<PopulationChart selectFectures={mockSelectFectures} />);

    // Simulate user selecting a checkbox
    const checkbox = screen.getByLabelText('年少人口');
    await userEvent.click(checkbox);

    expect(checkbox).toBeChecked();
  });
});
