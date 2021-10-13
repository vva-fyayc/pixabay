import React from 'react';
import { Stack, Typography, Card, CardContent, CardMedia, Avatar, Grid, Skeleton } from '@mui/material';

const ImageCard = ({ image, loading }) => {
    return (
        <Grid item justifyContent="center">
            <Card sx={{ width: "250px", padding: "16px", "&:hover": { boxShadow: "rgba(0, 0, 0, 1) 0px 3px 8px" } }}>
                {loading ? <Skeleton variant="rectangular" width="250px" height="250px" /> :
                    <CardMedia
                        component="img"
                        height="250px"
                        width="250px"
                        image={image.previewURL}
                        alt={`an image with ${image.tags}`}
                        data-testid="image"
                    />}
                <CardContent>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography variant="h5">
                            {loading ? <Skeleton width="150px" /> : `By ${image.user.length > 8 ? `${image.user.slice(0, 8)}...` : image.user}`}
                        </Typography>

                        {loading ? <Skeleton variant="circular">
                            <Avatar />
                        </Skeleton> : <Avatar alt={image.user} src={image.userImageURL} data-testid="author-avatar"/>
                        }
                    </Stack>

                    <Typography variant="body2" mt="16px" color="text.secondary" height="20px">
                        {loading ? <>
                            <Skeleton animation="wave" height="10px" style={{ marginBottom: 6 }} />
                            <Skeleton animation="wave" height="10px" width="80%" />
                        </> :
                            `Tags: ${image.tags.length > 42 ? `${image.tags.slice(0, 42)}...` : image.tags}`}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    )
}

export default ImageCard;
