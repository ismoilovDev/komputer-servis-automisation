import React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

function SkeletonBox() {
   return (
      <div>
         <Box className='w-100'>
            <Skeleton animation="wave" className='mt-2' />
            <Skeleton className='mt-2' />
            <Skeleton animation="wave" className='mt-2' />
            <Skeleton className='mt-2' />
            <Skeleton animation="wave" className='mt-2' />
            <Skeleton className='mt-2' />
            <Skeleton animation="wave" className='mt-2' />
            <Skeleton className='mt-2' />
            <Skeleton animation="wave" className='mt-2' />
            <Skeleton className='mt-2' />
            <Skeleton animation="wave" className='mt-2' />
            <Skeleton className='mt-2' />
            <Skeleton animation="wave" className='mt-2' />
            <Skeleton className='mt-2' />
         </Box>
      </div>
   )
}

export default SkeletonBox;