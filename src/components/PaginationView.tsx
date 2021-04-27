import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Pagination from '@material-ui/lab/Pagination';
import useRequest from "../hooks/UseRequest";



const useStyles = makeStyles((theme) =>({
    paginationDiv:{
        padding: 20,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pagination:{
        alignItems: 'center',
        justifyContent: 'center',
    },
    table: {
        minWidth: 650,
    },
}));

export default function PaginationView(props:any) {
    const classes = useStyles();

    const pageCount = props? props.pageCount : 1
    const click = (e: any, value: any) => {
        console.log(value)
        props.setPageNumber(value)
    };

    return (

        <div className={classes.paginationDiv} >
            <Pagination className={classes.pagination} count={pageCount}
                        onChange={click}
                        color="secondary" />
        </div>


    );
}