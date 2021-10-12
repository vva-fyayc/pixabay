import React, { useState, useEffect } from 'react';
import { Stack, TextField, Button, Box } from '@mui/material';

const SearchBar = ({ updateQuery }) => {
    const [query, setQuery] = useState('');
    const [helperText, setHelperText] = useState('');
    const [hasError, setHasError] = useState(false);


    const handleChange = (e) => {
        setQuery(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (hasError || query.length === 0) {
            changeInputStatus('Please enter a search word.', true);
        } else {
            updateQuery(query);
        }
    }

    const changeInputStatus = (text, flag) => {
        setHelperText(text);
        setHasError(flag);
    }

    useEffect(() => {
        if (query.length > 100) {
            changeInputStatus('Can not contain more than 100 characters.', true);
        } else {
            changeInputStatus('', false);
        }
    }, [query]);

    return (
        <Box
            component="form"
            autoComplete="off"
            onSubmit={handleSubmit}
            justifyContent="center"
            margin="40px"
        >
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} >
                <TextField
                    label="Search for images..."
                    value={query}
                    onChange={handleChange}
                    helperText={helperText}
                    error={hasError}
                />
                <Button onClick={handleSubmit} sx={{ height: "56px" }} variant="contained">Go</Button>
            </Stack>
        </Box>
    )
}

export default SearchBar;
