import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';

import useRequest from '../hooks/UseRequest';


const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        maxWidth: 400,
        margin: 20,
        padding: 20,
        fontSize: "15px",
    },
    label:{
        padding: "2px",
        fontSize: "15px"
    }
});



export default function DrawerTreeView(props:any) {
    const classes = useStyles();
    let treeArr: [] =[]

    const [response, loading, error] = useRequest(
        '/v1/search/categories'
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
        treeArr = response.data
    }



    const renderTree = (nodes: { id: any; name: any; children: any; cid: any;}) => (
        <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name} id={nodes.cid}
                  classes={{ label: classes.label }}
                  aria-selected={true}
                  onClick = {(e) =>{
                  if(nodes.children.length===0){
                      props.setCatId(nodes.cid)
                  }
                  }}
        >
            {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
        </TreeItem>
    );

    return (
        <TreeView
            className={classes.root}
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpanded={['root']}
            defaultExpandIcon={<ChevronRightIcon />}

        >
            {
                treeArr.map((treeData, idx) => {
                    return (renderTree(treeData))
                })
            }

        </TreeView>
    );
}
