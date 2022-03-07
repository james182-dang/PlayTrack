function NintendoPortableList() {
    
    return (
        <div className='NintendoPortableList'>
            <FormControl>
                <FormLabel id="NintendoPortableForm">Console</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                >
                    <FormControlLabel value="Gameboy" control={<Radio />} label="Gameboy" />
                    <FormControlLabel value="Gameboy Color" control={<Radio />} label="Gameboy Color" />
                    <FormControlLabel value="Gameboy Advance" control={<Radio />} label="Gameboy Advance" />
                    <FormControlLabel value="DS" control={<Radio />} label="DS" />
                    <FormControlLabel value="3DS" control={<Radio />} label="3DS" />
                </RadioGroup>
            </FormControl>
        </div>
    );
}

export default NintendoPortableList;