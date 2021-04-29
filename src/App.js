import './App.css';

import ListBoardComponent from './components/ListBoardComponent';
import DrawerView from './components/DrawerView';

import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import SearchArea from "./components/searchArea";
import PaginationView from "./components/PaginationView";
import UseRequest from "./hooks/UseRequest";

import CircularProgress from '@material-ui/core/CircularProgress';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

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
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(2),
        },
        paper: {
            padding: theme.spacing(1),
            display: 'flex',
            overflow: 'auto',
            flexDirection: 'column',
        },
        productsArea:{
            padding: theme.spacing(1),
            height: "75em",
            display: 'flex',
            overflow: 'auto',
            flexDirection: 'column',
            verticalAlign: 'middle',

        },
        number:{
            fontSize: 12,
        }
    }));

    const classes = useStyles();
    const [param] = React.useState({
        queryString:"", // 검색어
        field:"title", // 필드는 일단 고정입니다.
        filterType:"ALL", // 일단 고정인데 CATEGORY, TITLE 이라는 형태가 있습니다. 콤보박스용이에요.
        pageIndex:1, // pageindex는 기본적으로 0으로 세팅되어있습니다.
        // cid:"50001039" // cid는 개발 다되면 주시면 됩니다.
});

    const [productsUrl, setProductsUrl] = React.useState(('/v1/search/products?'+ getQueryString(param)));

    function getQueryString(data){
        let queryStirng = ''
        // queryString=오리&field=title&pageIndex=1&filterType=ALL
        Object.keys(data).forEach(key => {
            queryStirng += (key+"="+data[key]+"&")
        })

        return queryStirng
    }

    var [productsResponse, loading, error] = UseRequest(
        productsUrl
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
        setProductsUrl('/v1/search/products?'+ getQueryString(param))
    }

    function checkSatus(){
        if (loading) {
            return (
                <Paper className={classes.productsArea}>
                    <Grid container justify={"center"} alignItems={"center"} height={"100%"}
                    >
                        <CircularProgress />
                    </Grid>
                </Paper>)
        }

        if (error) {
            return (
                <Paper className={classes.productsArea}>
                    <Grid container justify={"center"} alignItems={"center"} height={"100%"}
                    >
                        <Typography variant="h3" gutterBottom>
                            Error가 발생되었습니다.
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            {error}
                        </Typography>
                    </Grid>
                </Paper>)
        }
        if (!productsResponse){
            return (
                <Paper className={classes.productsArea}>
                    <Grid container justify={"center"} alignItems={"center"} height={"100%"}
                    >
                        <Typography variant="h3" gutterBottom>
                            응답이 없습니다.
                        </Typography>
                    </Grid>
                </Paper>)
        }
        if (productsData.length === 0){
            return (
                <Paper className={classes.productsArea}>
                    <Grid container justify={"center"} alignItems={"center"}
                    >
                        <Typography variant="h5" gutterBottom>
                            상품이 없습니다.
                        </Typography>
                    </Grid>
                </Paper>)
        }
        else {
            return (
                <div>
                    <Button className={classes.nuproductsAreamber} variant="contained">
                        전체 {totalcount}
                    </Button>
                    <ListBoardComponent
                    productsData ={productsData}/>
                </div>
            )
        }
    }

    const productsData = productsResponse? productsResponse.data : [{}]
    const pageCount = productsResponse? productsResponse.headers.pagecount : 1
    const totalcount = productsResponse? productsResponse.headers.totalcount : 1

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
                        <Grid item xs={12} >
                            {checkSatus()}
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
