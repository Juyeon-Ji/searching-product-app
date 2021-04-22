
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import axios from "axios";

import useRequest from '../hooks/UseRequest';

var treeData = {
    id: 'root',
    name: 'Parent',
    children: [],
};


const useStyles = makeStyles({
    root: {
        height: 110,
        flexGrow: 1,
        maxWidth: 400,
        margin: 20,
    },
});



export default function DrawerTreeView() {
    const classes = useStyles();
    const treeArr: [] =[]

    const [response, loading, error] = useRequest(
        '/categories'
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
        response.data.forEach((treeItem: object) => {
            // @ts-ignore
            treeArr.push(Object.values(treeItem).pop())
        })
        // treeData = treeArr
    }





    const renderTree = (nodes: { id: any; name: any; children: any; }) => (
        <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
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
