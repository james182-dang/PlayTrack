function NintendoConsoleList() {
    
    return (
        <div className='NintendoConsoleList'>
            <FormControl>
                <FormLabel id="NintendoConsoleForm">Console</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                >
                    <FormControlLabel value="NES" control={<Radio />} label="NES" />
                    <FormControlLabel value="SNES" control={<Radio />} label="SNES" />
                    <FormControlLabel value="Nintendo 64" control={<Radio />} label="Nintendo 64" />
                    <FormControlLabel value="Gamecube" control={<Radio />} label="Gamecube" />
                    <FormControlLabel value="Wii" control={<Radio />} label="Wii" />
                    <FormControlLabel value="Wii U" control={<Radio />} label="Wii U" />
                    <FormControlLabel value="Switch" control={<Radio />} label="Switch" />
                </RadioGroup>
            </FormControl>
        </div>
    );
}

export default NintendoConsoleList;