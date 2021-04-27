import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

// import PaginationView from "./PaginationView";
import UseRequest from "../hooks/UseRequest";
// import {numbers} from "@material/top-app-bar/constants";
// import axios from "axios";

const useStyles = makeStyles((theme) =>({
    table: {
        minWidth: 650,
    },
}));


const rowData = [
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


export default function ProductsTable(props:any) {
    const classes = useStyles();
    const rowData:[{id:"0", imageUrl:"", title:"", option:{}}] = props.productsData

    // const [rowData, setRowData] = React.useState(rowSampleData);
    // if(props.productsData){
    //     console.log(props.productsData)
    //     setRowData(props.productsData)
    // }

    console.log("Products table")



    return (
        <div>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {columnsData.map(({field, headerName, width}) => (
                                <TableCell key={field} align="right" style={{minWidth: width}}>{headerName}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody key={"tableBody"}>
                        {rowData.map(({id, imageUrl, title, option}) => (
                            <TableRow key={id}>
                                <TableCell component="th" scope="row" style={{minWidth: "5em"}}>
                                    <img src={imageUrl} style={{maxHeight: "5em", maxWidth: "5em"}}/>
                                </TableCell>
                                <TableCell align="right" style={{maxWidth: "5em"}}>{title}</TableCell>
                                {/*<TableCell align="right">{option}</TableCell>*/}

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>


        </div>

    );
}