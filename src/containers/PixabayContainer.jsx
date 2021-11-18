import React, { useState, useEffect } from 'react';
import { Stack, Container, Typography, Pagination } from '@mui/material';
import SearchBar from '../components/SearchBar/SearchBar';
import ImageList from '../components/ImageList/ImageList';
import { useQuery } from 'react-query';
import axios from 'axios';
// import useFetch from '../helpers/hooks/useFetch';
import { IMAGES_STALE_TIME, IMAGES_CASHE_TIME, IMAGES_RETRY_NUMBER } from '../common/constants/constants';



const PixabayContainer = () => {
  const a = 1;
  const [searchTerm, setSearchTerm] = useState('');
  const [pageNumber, setPageNumber] = useState(a);
  // const [url, setUrl] = useState('');
  // const { data, error, loading } = useFetch(url);


  const getImages = async () => {
    // return axios.get(`https://pixabay.com/api/?q=${searchTerm}&image_type=photo&page=${pageNumber}`);
    return axios.get(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_KEY}&q=${searchTerm}&image_type=photo&page=${pageNumber}`);
  }

  const queryOptions = { enabled: false, retry: IMAGES_RETRY_NUMBER, keepPreviousData: true, staleTime: IMAGES_STALE_TIME, cacheTime: IMAGES_CASHE_TIME };

  const { isLoading, error, data, refetch } = useQuery('images', getImages, queryOptions);

  const updateQuery = (value) => {
    setSearchTerm(value);
    setPageNumber(a);
  }

  useEffect(() => {
    if (searchTerm === '') return;

    refetch();

  }, [searchTerm, pageNumber, refetch]);


  const handlePagination = (e, value) => {
    setPageNumber(value);

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  return (
    <Container maxWidth="xl">
      <Stack direction="column" alignItems="center" spacing={2}>
        <SearchBar updateQuery={updateQuery} />

        {/* {error && <Typography variant="h4" align="center">{error.response.status} {error.response.statusText}</Typography>} */}
          {data &&
            <Stack direction="column" alignItems="center" spacing={2}>

              <Typography variant="h4" align="center" sx={{
                fontSize: { xs: "16px", sm: "24px", md: "32px", xl: "48px" }
              }}>You can see {data.data.totalHits} images for {searchTerm}</Typography>

              <ImageList data={data.data} loading={isLoading} />

              {(data.data.totalHits / 20) > 1 ? <Pagination count={Math.round(data.data.totalHits / 20)} page={pageNumber} size="small" shape="rounded" variant="outlined" onChange={handlePagination} /> : null}

              <Typography variant="body" sx={{ paddingBottom: 4 }} align="center">All images are provided by <a href="https://pixabay.com" target="_blank" rel="noreferrer">Pixabay</a>.</Typography>
            </Stack>}
      </Stack>
    </Container>
  );
}

export default PixabayContainer;
