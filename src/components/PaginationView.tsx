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
    let pageNumber = props.value? props.value : 1;

    console.log("props: ", props)
    const click = (e: any, value: any) => {
        console.log(value)
        props.setPageNumber(value)
    };

    const [response, loading, error] = useRequest(
        '/products/count'
    );

    if (loading) {
        return <div>로딩중..</div>;
    }

    if (error) {
        return <div>에러 발생!</div>;
    }

    if (!response) return null;
    else{

        // @ts-ignore
        if(response){
            // console.log(response.data)
            // @ts-ignore
            pageNumber = response.data
        }

    }


    return (

        <div className={classes.paginationDiv} >
            <Pagination className={classes.pagination} count={pageNumber}
                        onChange={click}
                        color="secondary" />
        </div>


    );
}