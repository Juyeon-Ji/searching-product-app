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
            width: "1em"
        },
        {
            field: "title",
            headerName: "상품 명",
            width: "10em"
        },
        {
            field: "option",
            headerName: "Detail Info",
            width: "10em"
        },
    ]


function createData(id:string, imageUrl:string, title: string,   option:object) {
    return { id, imageUrl,title, option };
}

function optionView(optionData: object){
    if(optionData){
        let optionString = ""
        //
        Object.keys(optionData).forEach(function(key, index) {
            // @ts-ignore
            optionString += (key + ": " + optionData[key])
            if(index+1 != Object.keys(optionData).length){
                optionString += " | "
            }
        })
        return (<p>{optionString}</p>)


    }
    else{
        return <p>-</p>
    }
}

export default function ProductsTable(props:any) {
    const classes = useStyles();
    const rowData:[{id:"0", imageUrl:"", title:"", option:{}}] = props.productsData


    return (
        <div>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {columnsData.map(({field, headerName, width}) => (
                                <TableCell key={field} align="center" style={{maxWidth: width}}>{headerName}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody key={"tableBody"}>

                        {rowData.map(({id, imageUrl, title, option}) => (
                            <TableRow key={id}>
                                <TableCell align="center" component="th" scope="row" style={{maxWidth: "1em" }}>
                                    <img src={imageUrl} style={{maxHeight: "5em", maxWidth: "5em"}}/>
                                </TableCell>
                                <TableCell align="left" style={{maxWidth: "10em"}}>{title}</TableCell>

                                <TableCell align="left" style={{maxWidth: "10em"}}>
                                    {optionView(option)}
                                    {/*{option?<p>test</p> : <p>-</p>}*/}
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>


        </div>

    );
}