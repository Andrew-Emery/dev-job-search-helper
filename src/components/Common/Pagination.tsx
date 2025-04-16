import {
  Box,
  Pagination as MuiPagination,
  FormControl,
  Select,
  MenuItem,
  Typography,
  SelectChangeEvent,
} from '@mui/material';

const ITEMS_PER_PAGE_OPTIONS = [5, 10, 20, -1] as const; // -1 represents "ALL"
type ItemsPerPageOption = typeof ITEMS_PER_PAGE_OPTIONS[number] | -1;

interface PaginationProps<T> {
  items: T[];
  page: number;
  itemsPerPage: ItemsPerPageOption;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: ItemsPerPageOption) => void;
  renderItems: (paginatedItems: T[]) => React.ReactNode;
}

export function Pagination<T>({ 
  items,
  page,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  renderItems
}: PaginationProps<T>) {
  const totalPages = itemsPerPage === -1 ? 1 : Math.ceil(items.length / itemsPerPage);
  
  const getPaginatedItems = () => {
    if (itemsPerPage === -1) return items;
    
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    onPageChange(value);
  };

  const handleItemsPerPageChange = (event: SelectChangeEvent<number>) => {
    const value = event.target.value as ItemsPerPageOption;
    onItemsPerPageChange(value);
  };

  return (
    <>
      {renderItems(getPaginatedItems())}
      
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mt: 4 
      }}>
        {totalPages > 1 && (
          <MuiPagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        )}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 'auto' }}>
          <Typography variant="body2" color="text.secondary">
            Items per page:
          </Typography>
          <FormControl size="small" sx={{ minWidth: 80 }}>
            <Select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              variant="outlined"
            >
              {ITEMS_PER_PAGE_OPTIONS.map((option) => (
                <MenuItem key={option} value={option}>
                  {option === -1 ? 'ALL' : option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
    </>
  );
}

export type { ItemsPerPageOption }; 