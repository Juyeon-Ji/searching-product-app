import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Pagination from '@material-ui/lab/Pagination';

import BoardService from '../service/BoardService';


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


const rowsData = [
    createData("24", "https://shopping-phinf.pstatic.net/main_1805448/18054489982.20210303172646.jpg?type=f640",
        "더블에이 A4용지 복사용지 80g 2500매", {}),
    createData("37", "https://shopping-phinf.pstatic.net/main_8426728/8426728643.20150409110001.jpg?type=f640",
        "카시오 공학용 계산기 FX-570EX", {}),
    createData("25", "https://shopping-phinf.pstatic.net/main_1185933/11859339924.20170925103429.jpg?type=f640",
        "LAMY 사파리 만년필", {}),]

const columnsData = [
        {
            field: "img",
            headerName: "Image",
            width: "5em"
        },
        {
            field: "title",
            headerName: "상품 명",
            width: "5em"
        },
        {
            field: "detailInfo",
            headerName: "Detail Info",
            width: "5em"
        },
    ]

function componentDidMount() {
    BoardService.getBoards().then((res) => {
        // this.setState({ boards: res.data});
    });
}

function createData(id:string, img:string, title: string,   detailInfo:object) {
    return { id, img,title, detailInfo };
}


export default function ProductsTable() {
    const classes = useStyles();

    return (
        // <div style={{ height: 400, width: '100%' }}>
        //     <DataGrid pagination {...data} />
        // </div>
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
                                <TableCell component="th" scope="row">
                                    <img src={row.img} style={{maxHeight: "5em", maxWidth: "5em"}}/>
                                </TableCell>
                                <TableCell align="right">{row.title}</TableCell>
                                <TableCell align="right">{"detailInfo"}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div className={classes.paginationDiv} >
                <Pagination className={classes.pagination} count={100} color="secondary" />
            </div>

        </div>

    );
}