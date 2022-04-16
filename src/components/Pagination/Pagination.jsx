import React from 'react';
import './Pagination.css';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const Paginations = ({ countItems, pageSize, onPageChange }) => {
   const pageCount = Math.ceil(countItems / pageSize);
   return (
      <ul className="pagination">
         <Stack spacing={2}>
            <Pagination count={pageCount} onChange={(e) => onPageChange(e.target.textContent)} color="primary" hideNextButton hidePrevButton />
         </Stack>
      </ul>
   );
}

export default Paginations;