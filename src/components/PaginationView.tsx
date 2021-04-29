import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

import Pagination from '@material-ui/lab/Pagination';


const useStyles = makeStyles((theme) =>({
    paginationDiv:{
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

    const pageCount:number = props? parseInt(props.pageCount) : 1


    const click = (e: any, value: any) => {
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