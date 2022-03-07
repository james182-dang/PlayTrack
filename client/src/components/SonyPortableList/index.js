function SonyPortableList() {
    
    return (
        <div className='SonyPortableList'>
            <FormControl>
                <FormLabel id="SonyPortableForm">Console</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                >
                    <FormControlLabel value="PSP" control={<Radio />} label="PSP" />
                    <FormControlLabel value="PS Vita" control={<Radio />} label="PS Vita" />
                </RadioGroup>
            </FormControl>
        </div>
    );
}

export default SonyPortableList;