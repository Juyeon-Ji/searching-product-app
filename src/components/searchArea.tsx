import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';

import MenuItem from '@material-ui/core/MenuItem';
import useRequest from "../hooks/UseRequest";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            // margin: theme.spacing(1),
            width:'100%',
            // height: '100%',
            // width: '10em',
        },
    },
    formControl: {
        margin: theme.spacing(1),
        width: '90%',
        // minWidth: 120,

    },
    textField:{
        width:'100%'
    }
}));

const KeyCodes = {
    comma: 188,
    enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

export default function SearchArea() {
    const classes = useStyles();
    const serachData = ''



    const handleKeyPress = (e: {
        target: any;
        key: string; }) => {

        if (e.key === "Enter") {
            console.log(e.target.value)
            let keyword = e.target.value
            console.log('/api/'+keyword)

        }
    };




    return (
        <form className={classes.root} noValidate autoComplete="off">
            <Grid container>
                <Grid item xs={2}>
                    <FormControl className={classes.formControl} >
                        <TextField id="select" value="All" select>
                            <MenuItem value={"All"}>전체</MenuItem>
                            <MenuItem value={"ProductName"}>상품명</MenuItem>
                            <MenuItem value={"DetailInfo"}>상세정보</MenuItem>
                        </TextField>
                    </FormControl>
                </Grid>
                <Grid item xs={10}>
                    <TextField id="outlined-basic" variant="outlined" onKeyPress={handleKeyPress}
                               placeholder="검색어를 입력해 주세요."
                               className={classes.textField}/>
                </Grid>
            </Grid>
        </form>
    );
}
