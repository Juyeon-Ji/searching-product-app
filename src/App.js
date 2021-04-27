import './App.css';

import ListBoardComponent from './components/ListBoardComponent';
import DrawerView from './components/DrawerView';

import React from "react";


import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import SearchArea from "./components/searchArea";
import PaginationView from "./components/PaginationView";
import UseRequest from "./hooks/UseRequest";


function App() {

    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
        },
        appBarSpacer: theme.mixins.toolbar,
        content: {
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
        },
        container: {
            paddingTop: theme.spacing(4),
            paddingBottom: theme.spacing(4),
        },
        paper: {
            padding: theme.spacing(2),
            display: 'flex',
            overflow: 'auto',
            flexDirection: 'column',
        },
    }));

    const classes = useStyles();
    const [param, setPram] = React.useState({
        queryString:"", // 검색어
        field:"title", // 필드는 일단 고정입니다.
        filterType:"ALL", // 일단 고정인데 CATEGORY, TITLE 이라는 형태가 있습니다. 콤보박스용이에요.
        pageIndex:1, // pageindex는 기본적으로 0으로 세팅되어있습니다.
        // cid:"50001039" // cid는 개발 다되면 주시면 됩니다.
});

    const [productsUrl, setProductsUrl] = React.useState(('/api/search?'+ getQueryString(param)));
    const [countUrl, setCountUrl] = React.useState(('/api/search/count?'+ getQueryString(param)));

    function getQueryString(data){
        let queryStirng = ''
        // queryString=오리&field=title&pageIndex=1&filterType=ALL
        Object.keys(data).forEach(key => {
            queryStirng += (key+"="+data[key]+"&")
        })

        return queryStirng
    }

    // const [pageCount, setPageCount] = React.useState(1);

    var [productsResponse, loading, error] = UseRequest(
        productsUrl
    );
    var [countResponse, loading, error] = UseRequest(
        countUrl
    );


    const setPageNumber = (pageNumber) =>{
        // @ts-ignore
        console.log(pageNumber)
        param.pageIndex = pageNumber
        getData()
    }

    const setCatId = (catid) =>{
        // @ts-ignore
        param.cid = catid
        getData()
    }

    const setSearchKeyWords = (searchOption) =>{
        console.log(searchOption)

        param.pageIndex = 1

        param.filterType = searchOption.field
        param.queryString = searchOption.queryString
        console.log(param)
        getData()

    }

    function getData(){
        setCountUrl('/api/search/count?'+ getQueryString(param))
        setProductsUrl('/api/search?'+ getQueryString(param))
    }



    const productsData = productsResponse? productsResponse.data : [{}]
    const pageCount = countResponse? countResponse.data : 1
    console.log()
    return (

        <div className={classes.root}>
            <CssBaseline />
            <DrawerView
                setCatId = {setCatId}
            />

            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>

                        {/* Recent Orders */}
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                {/*<Orders />*/}
                                <SearchArea
                                    setSearchKeyWords={setSearchKeyWords}
                                />
                            </Paper>
                        </Grid>

                        {/* Chart */}
                        <Grid item xs={12}>
                            <ListBoardComponent
                                productsData ={productsData}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <PaginationView
                                setPageNumber={setPageNumber}
                                pageCount={pageCount}
                            />
                        </Grid>

                    </Grid>
                </Container>
            </main>


        </div>

    );


}

export default App;
