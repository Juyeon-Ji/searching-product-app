import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function createData(img:string, title: string, calories:number, carbs:number, protein:number) {
    return { img,title, calories, carbs, protein };
}

const rows = [
    createData("https://shopping-phinf.pstatic.net/main_1805448/18054489982.20210303172646.jpg?type=f640",
        "더블에이 A4용지 복사용지 80g 2500매", 6.0, 24, 4.0),
    createData("https://shopping-phinf.pstatic.net/main_8426728/8426728643.20150409110001.jpg?type=f640",
        "카시오 공학용 계산기 FX-570EX", 9.0, 37, 4.3),
    createData("https://shopping-phinf.pstatic.net/main_1185933/11859339924.20170925103429.jpg?type=f640",
        "LAMY 사파리 만년필", 16.0, 24, 6.0),]

export default function ProductsTable() {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell align="right">Calories</TableCell>
                        <TableCell align="right">Fat&nbsp;(g)</TableCell>
                        <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                        <TableCell align="right">Protein&nbsp;(g)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.calories}>
                            <TableCell component="th" scope="row">
                                <img src={row.img} style={{maxHeight: "5em", maxWidth: "5em"}}/>
                            </TableCell>
                            <TableCell align="right">{row.calories}</TableCell>
                            <TableCell align="right">{row.title}</TableCell>
                            <TableCell align="right">{row.carbs}</TableCell>
                            <TableCell align="right">{row.protein}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}