function MicrosoftConsoleList() {
    
    return (
        <div className='MicrosoftConsoleList'>
            <FormControl>
                <FormLabel id="MicrosoftConsoleForm">Console</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                >
                    <FormControlLabel value="Xbox" control={<Radio />} label="Xbox" />
                    <FormControlLabel value="Xbox 360" control={<Radio />} label="Xbox 360" />
                    <FormControlLabel value="Xbox One" control={<Radio />} label="Xbox One" />
                    <FormControlLabel value="Xbox Series S/X" control={<Radio />} label="Xbox Series S/X" />
                </RadioGroup>
            </FormControl>
        </div>
    );
}

export default MicrosoftConsoleList;