import React from 'react';
import { styled } from '@mui/material/styles';
import { Paper, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material';
import Paginations from '../Pagination/Pagination';
import { AiOutlineCloudUpload } from "react-icons/ai";
import SkeletonBox from '../Skeleton/Skeleton';
import './PostmansList.css';


const PostmansList = (props) => {

   // Table Cell ------------------->
   const StyledTableCell = styled(TableCell)(({ theme }) => ({
      [`&.${tableCellClasses.head}`]: {
         backgroundColor: '#F5F5F5',
         color: theme.palette.common.black,
         fontWeight: 600,
         letterSpacing: '1px',
         fontSize: 16,
         innerHeight: '45px'
      },
      [`&.${tableCellClasses.body}`]: {
         fontSize: 14,
         fontWeight: 600
      },
   }));

   // Table Row ------------------->
   const StyledTableRow = styled(TableRow)(({ theme }) => ({
      // hide last border
      '&:last-child td, &:last-child th': {
         border: 0,
      },
   }));


   return (
      <>
         <TableContainer component={Paper}>
            {
               props.loaded ? (
                  <Table sx={{ minWidth: 650 }} size="medium" aria-label="a dense table">
                     <TableHead>
                        <TableRow>
                           <StyledTableCell style={{ minWidth: '250px' }}>
                              {props.name}
                           </StyledTableCell>
                           {
                              props.rows.map(row => (
                                 <StyledTableCell key={row} align="right">{row}</StyledTableCell>
                              ))
                           }
                        </TableRow>
                     </TableHead>
                     <TableBody>
                        {
                           props.paginated?.length !== 0 ? (
                              props.paginated?.map((data) => (
                                 <Tooltip key={data?.full_name} title="Bu Pastavshikni qarzi bor" followCursor>
                                    <StyledTableRow
                                       sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                       <StyledTableCell
                                          component="th"
                                          scope="row"
                                          style={{ cursor: 'pointer', position: 'relative' }}
                                       >
                                          <span className='status red'></span>
                                          {data?.full_name.length > 60 ? data?.full_name.substring(0, 57) + '...' : data?.full_name}
                                       </StyledTableCell>
                                       <StyledTableCell style={{ minWidth: '170px' }} align="right">{data?.phone}</StyledTableCell>
                                       {
                                          data?.inn ? (
                                             <StyledTableCell align="right">{data?.inn}</StyledTableCell>
                                          ) : (
                                             null
                                          )
                                       }
                                    </StyledTableRow>
                                 </Tooltip>
                              ))) : (
                              <tr>
                                 <td colSpan={props.rows.length + 1}>
                                    <p className='empty-data d-flex flex-column justify-content-center align-items-center'>
                                       <AiOutlineCloudUpload className='no-data' />
                                       <span>Нет Данных</span>
                                    </p>
                                 </td>
                              </tr>
                           )
                        }
                     </TableBody>
                  </Table>
               ) : (
                  <SkeletonBox />
               )
            }
         </TableContainer>
         {
            props.paginated?.length !== 0 ? (
               <Paginations
                  countItems={props.count}
                  pageSize={props.pageSize}
                  onPageChange={props.hendleChangePage}
               />
            ) : null
         }
      </>
   );
}

export default PostmansList;
