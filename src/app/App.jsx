import React, { useState, useEffect } from 'react';
import useFetch from '../helpers/hooks/useFetch';
import { Stack, Container, Typography, Grid, Pagination } from '@mui/material';
import SearchBar from '../components/searchBar/SearchBar';
import ImageCard from '../components/imageCard/ImageCard';

const App = () => {
  const [query, setQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [url, setUrl] = useState('');
  const { data, error, loading } = useFetch(url);

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

  let content = [];
  if (data !== undefined) {
    content = data.hits.map(image => <ImageCard image={image} loading={loading} />);
  }


  return (
    <Container maxWidth="xl">
      <Stack direction="column" alignItems="center" spacing={2}>
        <SearchBar updateQuery={updateQuery} />

        {error && <Typography variant="h4">Server error</Typography>}
        {data &&
          <Stack direction="column" alignItems="center" spacing={2}>
            <Typography variant="h4">{2}</Typography>

            <Grid container justifyContent="center" rowSpacing={2} columnSpacing={{ xs: 0, sm: 2, md: 2 }}>
              {content}
            </Grid>

            {(data.totalHits / 20) > 1 ? <Pagination count={Math.round(data.totalHits / 20)} page={pageNumber} size="small" shape="rounded" variant="outlined" onChange={handlePagination} sx={{ paddingBottom: "40px" }} /> : null}
          </Stack>}

      </Stack>
    </Container>
  );
}

export default App;
