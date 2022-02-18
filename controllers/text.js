const Text=require('../models/text');
const mongoose = require('mongoose');
const fetch = require('node-fetch');

exports.newText=(req,res,next)=>{
    res.render('./text/newText.ejs', {
        pageTitle: 'New Text',
        path: '/login',
    })
};

exports.getList=(req,res,next)=>{
    Text.find()
        .then(textArr => {
            res.render('./text/textsList', {
                textArr: textArr,
                pageTitle: 'All Codes',
                path: 'texts'
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.postText=(req,res,next)=>{
    const code=req.body.code;
    const textObj=new Text({
        code:code
    });

    textObj
        .save()
        .then(result => {

            console.log(result);
            res.redirect(`/text/${result._id}`);
        })
        .catch(err => {
            console.log(err);
        });

};

exports.getTextId=(req,res,next)=>{
    const textid=req.params.textid;
    // console.log(textid);
    Text.findById(textid)
        .then(async (textObj) => {
            let uri = `http://localhost:8080/text/${textid}`;
            uri = `https://api.shrtco.de/v2/shorten?url=${uri}`;
            const data = await fetch(uri, { redirect: 'manual' });
            const parsedData = await data.json();
            console.log(parsedData);
            // uri=parsedData.result.short_link;
            res.render('./text/textDetail', {
                textObj: textObj,
                uri: uri,
                pageTitle: 'Text Detail',
                path: '/text/textDetail'
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.postDeleteText=(req,res,next)=>{
    const textid = req.body.textid;
    Text.findById(textid)
        .then(textObj => {
            return Text.deleteOne({_id: textid});
        })
        .then(result => {
            console.log("Product destroyed");
            res.redirect('/list');
        })
        .catch(err => {
            console.log(err);
        })

};