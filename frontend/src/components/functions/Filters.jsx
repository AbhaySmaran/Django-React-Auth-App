// Filters.js
import React, { useState } from 'react';
import { Box, Typography, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Button, Checkbox } from '@mui/material';

const Filters = ({ handleFilterChange }) => {
    const [rate, setRate] = useState(3);

    return (
        <Box sx={{ padding: 2, position: 'fixed' }}>
            <Typography variant="h6" gutterBottom>
                Filter Products
            </Typography>
            <FormControl component="fieldset">
                <FormLabel component="legend">Sort by</FormLabel>
                <RadioGroup name="sort" onChange={(e) => handleFilterChange(e, 'sort')}>
                    <FormControlLabel value="ascending" control={<Radio />} label="Ascending" />
                    <FormControlLabel value="descending" control={<Radio />} label="Descending" />
                </RadioGroup>
            </FormControl>
            <br/>
            <FormControlLabel
                control={<Checkbox onChange={(e) => handleFilterChange(e, 'outOfStock')} />}
                label="Out of Stock"
            />
            <Box>
                <Typography variant="body1">Rating:</Typography>
                {/* <Ratings rating={rate} style={{ cursor: 'pointer' }} onClick={(i)=> setRate(i + 1)} /> */}
            </Box>
            <Button variant="contained" color="primary" onClick={() => handleFilterChange(null, 'clear')}>
                Clear Filters
            </Button>
        </Box>
    );
};

export default Filters;
