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

import queryString from "query-string"

function App() {

    const drawerWidth = 240;

    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
        },
        toolbar: {
            paddingRight: 24, // keep right padding when drawer closed
        },
        toolbarIcon: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: '0 8px',
            ...theme.mixins.toolbar,
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        menuButton: {
            marginRight: 36,
        },
        menuButtonHidden: {
            display: 'none',
        },
        title: {
            flexGrow: 1,
        },
        drawerPaper: {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        drawerPaperClose: {
            overflowX: 'hidden',
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing(7),
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(9),
            },
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
        fixedHeight: {
            height: 240,
        },
    }));

    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const [param, setPram] = React.useState({
        queryString:"오리", // 검색어
        field:"title", // 필드는 일단 고정입니다.
        filterType:"ALL", // 일단 고정인데 CATEGORY, TITLE 이라는 형태가 있습니다. 콤보박스용이에요.
        pageIndex:1, // pageindex는 기본적으로 0으로 세팅되어있습니다.
        // cid:"50000158" // cid는 개발 다되면 주시면 됩니다.
});

    console.log(param)

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    function getQueryString(){
        let queryStirng = ''
        // queryString=오리&field=title&pageIndex=1&filterType=ALL
        Object.keys(param).forEach(key => {
            queryStirng += (key+"="+param[key]+"&")
        })

        console.log("queryStirng: "+ queryStirng)
        return queryStirng
    }

    var [productsResponse, loading, error] = UseRequest(
        '/api/search?'+ getQueryString()
    );

    if (loading) {
        return <div>로딩중..</div>;
    }

    if (error) {
        return <div>에러 발생!</div>;
    }

    if (!productsResponse) return null;
    else{
        console.log("======board data response")
    }

    const setPageNumber = (pageNumber) =>{
        console.log("here is Main")
        // @ts-ignore
        console.log(pageNumber)
    }



    return (

        <div className={classes.root}>
            <CssBaseline />
            <DrawerView/>

            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>

                        {/* Recent Orders */}
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                {/*<Orders />*/}
                                <SearchArea/>
                            </Paper>
                        </Grid>

                        {/* Chart */}
                        <Grid item xs={12}>
                            <ListBoardComponent
                                productsData ={productsResponse.data}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <PaginationView
                                setPageNumber={setPageNumber}
                            />
                        </Grid>

                    </Grid>
                </Container>
            </main>


        </div>

    );


}

export default App;
