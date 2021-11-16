import React, { useState, useEffect } from 'react';
import { Stack, Container, Typography, Pagination } from '@mui/material';
import SearchBar from '../components/searchBar/SearchBar';
import ImageList from '../components/imageList/ImageList';
import useAxios from '../helpers/hooks/use-axios';

const App = () => {
  const [query, setQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [url, setUrl] = useState('');
  const { data, error, loading } = useAxios(url);

  const updateQuery = (value) => {
    setQuery(value);
    setPageNumber(1);
  }

  useEffect(() => {
    if (query === '') return;
    setUrl(`https://pixabay.com/api/?key=23741766-e2ceb19faad22ef3d335618c0&q=${query}&image_type=photo&page=${pageNumber}`);
  }, [query, pageNumber]);


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

        {error && <Typography variant="h4" align="center">{error}</Typography>}

        {data &&
          <Stack direction="column" alignItems="center" spacing={2}>

            <Typography variant="h4" align="center" sx={{
              fontSize: { xs: "16px", sm: "24px", md: "32px", xl: "48px" }
            }}>You can see {data.totalHits} images for {query}</Typography>

            <ImageList data={data} loading={loading} />

            {(data.totalHits / 20) > 1 ? <Pagination count={Math.round(data.totalHits / 20)} page={pageNumber} size="small" shape="rounded" variant="outlined" onChange={handlePagination} /> : null}

            <Typography variant="body" sx={{ paddingBottom: 4 }} align="center">All images are provided by <a href="https://pixabay.com" target="_blank" rel="noreferrer">Pixabay</a>.</Typography>
          </Stack>}
      </Stack>
    </Container>
  );
}

export default App;
