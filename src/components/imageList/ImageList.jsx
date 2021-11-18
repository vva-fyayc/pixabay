import React from 'react';
import { Grid } from '@mui/material';
import ImageCard from '../ImageCard/ImageCard';

const ImageList = ({ data = [], loading }) => {
    const content = data.hits.map(image => <ImageCard key={image.id} image={image} loading={loading} />);

    return (
        <Grid container justifyContent="center" rowSpacing={2} columnSpacing={{ xs: 0, sm: 2, md: 2 }}>
            {content}
        </Grid>
    )
}

export default ImageList;
