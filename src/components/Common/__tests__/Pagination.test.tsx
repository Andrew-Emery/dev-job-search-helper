import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from '../Pagination';

describe('Pagination', () => {
  const mockItems = Array.from({ length: 15 }, (_, i) => ({ id: i + 1 }));
  const mockRenderItems = (items: typeof mockItems) => (
    <div data-testid="items-container">
      {items.map(item => <div key={item.id}>{item.id}</div>)}
    </div>
  );

  it('renders items correctly with default pagination', () => {
    render(
      <Pagination
        items={mockItems}
        page={1}
        itemsPerPage={5}
        onPageChange={vi.fn()}
        onItemsPerPageChange={vi.fn()}
        renderItems={mockRenderItems}
      />
    );

    const itemsContainer = screen.getByTestId('items-container');
    expect(itemsContainer.children).toHaveLength(5);
  });

  it('renders all items when itemsPerPage is -1', () => {
    render(
      <Pagination
        items={mockItems}
        page={1}
        itemsPerPage={-1}
        onPageChange={vi.fn()}
        onItemsPerPageChange={vi.fn()}
        renderItems={mockRenderItems}
      />
    );

    const itemsContainer = screen.getByTestId('items-container');
    expect(itemsContainer.children).toHaveLength(15);
  });

  it('calls onPageChange when page is changed', () => {
    const handlePageChange = vi.fn();
    render(
      <Pagination
        items={mockItems}
        page={1}
        itemsPerPage={5}
        onPageChange={handlePageChange}
        onItemsPerPageChange={vi.fn()}
        renderItems={mockRenderItems}
      />
    );

    const pagination = screen.getByRole('navigation');
    const nextButton = pagination.querySelector('[aria-label="Go to next page"]');
    fireEvent.click(nextButton!);
    expect(handlePageChange).toHaveBeenCalledWith(2);
  });

  it('calls onItemsPerPageChange when items per page is changed', () => {
    const handleItemsPerPageChange = vi.fn();
    render(
      <Pagination
        items={mockItems}
        page={1}
        itemsPerPage={5}
        onPageChange={vi.fn()}
        onItemsPerPageChange={handleItemsPerPageChange}
        renderItems={mockRenderItems}
      />
    );

    const select = screen.getByRole('combobox');
    fireEvent.mouseDown(select);
    const option = screen.getByText('10');
    fireEvent.click(option);
    expect(handleItemsPerPageChange).toHaveBeenCalledWith(10);
  });

  it('does not show pagination when total pages is 1', () => {
    render(
      <Pagination
        items={mockItems.slice(0, 5)}
        page={1}
        itemsPerPage={5}
        onPageChange={vi.fn()}
        onItemsPerPageChange={vi.fn()}
        renderItems={mockRenderItems}
      />
    );

    const pagination = screen.queryByRole('navigation');
    expect(pagination).not.toBeInTheDocument();
  });
}); 