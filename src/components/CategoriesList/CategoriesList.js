import React from 'react';
import { styled } from '@mui/material/styles';
import { Paper, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from '@mui/material';
import Paginations from '../Pagination/Pagination';
import { AiOutlineCloudUpload } from "react-icons/ai";
import { FaRegEdit } from 'react-icons/fa';
import { IoMdTrash } from 'react-icons/io';
import SkeletonBox from '../Skeleton/Skeleton';
import './CategoriesList.css';


const CategoriesList = (props) => {

   // Table Cell ------------------->
   const StyledTableCell = styled(TableCell)(({ theme }) => ({
      [`&.${tableCellClasses.head}`]: {
         backgroundColor: '#2962ff',
         color: theme.palette.common.white,
         fontWeight: 600,
         letterSpacing: '1px',
         fontSize: 16
      },
      [`&.${tableCellClasses.body}`]: {
         fontSize: 14,
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
            {
               props.loaded ? (
                  <Table sx={{ minWidth: 650 }} size="medium" aria-label="a dense table">
                     <TableHead>
                        <TableRow>
                           <StyledTableCell style={{ minWidth: '300px' }}>{props.name}</StyledTableCell>
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
                              <StyledTableRow
                                 key={data?.name}
                                 sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                              >
                                 <StyledTableCell
                                    component="th"
                                    scope="row"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => props.clickedSingleObjHendle(data)}
                                 >
                                    {data?.name.length > 60 ? data?.name.substring(0, 57) + '...' : data?.name}
                                 </StyledTableCell>
                                 <StyledTableCell style={{ minWidth: '140px' }} align="right">{data?.min_percent}</StyledTableCell>
                                 <StyledTableCell style={{ minWidth: '150px' }} align="right">{data?.whole_percent}</StyledTableCell>
                                 <StyledTableCell style={{ minWidth: '140px' }} align="right">{data?.max_percent}</StyledTableCell>
                                 <StyledTableCell style={{ minWidth: '120px' }} align="right">
                                    <span className='my_list_btns'>
                                       <button className='btn-edit' onClick={() => props.clickedObjHendle(data)}>
                                          <FaRegEdit />
                                       </button>
                                       <button onClick={() => props.deleteData(data.id, data.name)}>
                                          <IoMdTrash />
                                       </button>
                                    </span>
                                 </StyledTableCell>
                              </StyledTableRow>
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

export default CategoriesList;
