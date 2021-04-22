import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import PaginationView from "./PaginationView";
import UseRequest from "../hooks/UseRequest";
import {numbers} from "@material/top-app-bar/constants";
import axios from "axios";

const useStyles = makeStyles((theme) =>({
    table: {
        minWidth: 650,
    },
}));


let rowsData = [
    createData("24", "https://shopping-phinf.pstatic.net/main_1805448/18054489982.20210303172646.jpg?type=f640",
        "더블에이 A4용지 복사용지 80g 2500매", {})]

const columnsData = [
        {
            field: "imageUrl",
            headerName: "Image",
            width: "5em"
        },
        {
            field: "title",
            headerName: "상품 명",
            width: "5em"
        },
        {
            field: "option",
            headerName: "Detail Info",
            // width: "5em"
        },
    ]


function createData(id:string, imageUrl:string, title: string,   option:object) {
    return { id, imageUrl,title, option };
}


export default function ProductsTable() {
    const classes = useStyles();
    const rowData = []
    const [pageNum, setPageNum] = useState(1);

    var [response, loading, error, setResponse] = UseRequest(
        '/products/'+pageNum
    );

    if (loading) {
        return <div>로딩중..</div>;
    }

    if (error) {
        return <div>에러 발생!</div>;
    }

    if (!response) return null;
    else{
        console.log("======board data response")
        console.log(response)
        // @ts-ignore

        // @ts-ignore
        if(response){
            // @ts-ignore
            console.log(response.data)

            // @ts-ignore
            rowsData = response.data
        }

    }
    const setPageNumber = (pageNumber:number) =>{
        console.log("here is parent")
        // @ts-ignore
        setPageNum(pageNumber)

    }
    return (
        <div>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {columnsData.map((col) => (
                                    <TableCell align="right" style={{minWidth: col.width}}>{col.headerName}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rowsData.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row" style={{minWidth: "5em"}}>
                                    <img src={row.imageUrl} style={{maxHeight: "5em", maxWidth: "5em"}}/>
                                </TableCell>
                                <TableCell align="right" style={{maxWidth: "5em"}}>{row.title}</TableCell>
                                <TableCell align="right">{row.option}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <PaginationView
                setPageNumber={setPageNumber}
                value={ pageNum }
            />

        </div>

    );
}