import React from 'react';
import { styled } from '@mui/material/styles';
import { Paper, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Skeleton } from '@mui/material';


function SkeletonBox() {

   // Table Cell ------------------->
   const StyledTableCell = styled(TableCell)(({ theme }) => ({
      [`&.${tableCellClasses.head}`]: {
         maxHeight: 40,
         backgroundColor: '#2962ff',
         color: theme.palette.common.white,
         fontWeight: 600,
         letterSpacing: '1px',
         fontSize: 10
      },
      [`&.${tableCellClasses.body}`]: {
         maxHeight: 40,
         fontSize: 10,
         fontWeight: 600
      },
   }));

   // Table Row ------------------->
   const StyledTableRow = styled(TableRow)(({ theme }) => ({
      '&:nth-of-type(odd)': {
         backgroundColor: theme.palette.action.hover,
      },
      // hide last border
      '&:last-child td, &:last-child th': {
         border: 0,
      },
   }));
   return (
      <>
         <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="medium" aria-label="a dense table">
               <TableHead>
                  <TableRow style={{ height: '50px' }}>
                     <StyledTableCell style={{ minWidth: '150px' }}>
                        <Skeleton animation="wave" height={25} />
                     </StyledTableCell>
                     <StyledTableCell style={{ minWidth: '80px' }} align="right">
                        <Skeleton animation="wave" height={25} />
                     </StyledTableCell>
                     <StyledTableCell style={{ minWidth: '80px' }} align="right">
                        <Skeleton animation="wave" height={25} />
                     </StyledTableCell>
                     <StyledTableCell style={{ minWidth: '80px' }} align="right">
                        <Skeleton animation="wave" height={25} />
                     </StyledTableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  <StyledTableRow
                     style={{ height: '40px' }}
                     sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                     <StyledTableCell component="th" scope="row" style={{cursor: 'progress'}}>
                        <Skeleton sx={{ bgcolor: 'silver' }} height={20} />
                     </StyledTableCell>
                     <StyledTableCell align="right">
                        <Skeleton sx={{ bgcolor: 'silver' }} height={20} />
                     </StyledTableCell>
                     <StyledTableCell align="right">
                        <Skeleton sx={{ bgcolor: 'silver' }} height={20} />
                     </StyledTableCell>
                     <StyledTableCell align="right">
                        <Skeleton sx={{ bgcolor: 'silver' }} height={20} />
                     </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow
                     style={{ height: '40px' }}
                     sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                     <StyledTableCell component="th" scope="row" style={{cursor: 'progress'}}>
                        <Skeleton sx={{ bgcolor: 'silver' }} height={20} />
                     </StyledTableCell>
                     <StyledTableCell align="right">
                        <Skeleton sx={{ bgcolor: 'silver' }} height={20} />
                     </StyledTableCell>
                     <StyledTableCell align="right">
                        <Skeleton sx={{ bgcolor: 'silver' }} height={20} />
                     </StyledTableCell>
                     <StyledTableCell align="right">
                        <Skeleton sx={{ bgcolor: 'silver' }} height={20} />
                     </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow
                     style={{ height: '40px' }}
                     sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                     <StyledTableCell component="th" scope="row" style={{cursor: 'progress'}}>
                        <Skeleton sx={{ bgcolor: 'silver' }} height={20} />
                     </StyledTableCell>
                     <StyledTableCell align="right">
                        <Skeleton sx={{ bgcolor: 'silver' }} height={20} />
                     </StyledTableCell>
                     <StyledTableCell align="right">
                        <Skeleton sx={{ bgcolor: 'silver' }} height={20} />
                     </StyledTableCell>
                     <StyledTableCell align="right">
                        <Skeleton sx={{ bgcolor: 'silver' }} height={20} />
                     </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow
                     style={{ height: '40px' }}
                     sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                     <StyledTableCell component="th" scope="row" style={{cursor: 'progress'}}>
                        <Skeleton sx={{ bgcolor: 'silver' }} height={20} />
                     </StyledTableCell>
                     <StyledTableCell align="right">
                        <Skeleton sx={{ bgcolor: 'silver' }} height={20} />
                     </StyledTableCell>
                     <StyledTableCell align="right">
                        <Skeleton sx={{ bgcolor: 'silver' }} height={20} />
                     </StyledTableCell>
                     <StyledTableCell align="right">
                        <Skeleton sx={{ bgcolor: 'silver' }} height={20} />
                     </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow
                     style={{ height: '40px' }}
                     sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                     <StyledTableCell component="th" scope="row" style={{cursor: 'progress'}}>
                        <Skeleton sx={{ bgcolor: 'silver' }} height={20} />
                     </StyledTableCell>
                     <StyledTableCell align="right">
                        <Skeleton sx={{ bgcolor: 'silver' }} height={20} />
                     </StyledTableCell>
                     <StyledTableCell align="right">
                        <Skeleton sx={{ bgcolor: 'silver' }} height={20} />
                     </StyledTableCell>
                     <StyledTableCell align="right">
                        <Skeleton sx={{ bgcolor: 'silver' }} height={20} />
                     </StyledTableCell>
                  </StyledTableRow>
               </TableBody>
            </Table>
         </TableContainer>
      </>
   )
}

export default SkeletonBox;