function SonyConsoleList() {
    
    return (
        <div className='SonyConsoleList'>
            <FormControl>
                <FormLabel id="SonyConsoleForm">Console</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                >
                    <FormControlLabel value="PS1" control={<Radio />} label="PS1" />
                    <FormControlLabel value="PS2" control={<Radio />} label="PS2" />
                    <FormControlLabel value="PS3" control={<Radio />} label="PS3" />
                    <FormControlLabel value="PS4" control={<Radio />} label="PS4" />
                    <FormControlLabel value="PS5" control={<Radio />} label="PS5" />
                </RadioGroup>
            </FormControl>
        </div>
    );
}

export default SonyConsoleList;