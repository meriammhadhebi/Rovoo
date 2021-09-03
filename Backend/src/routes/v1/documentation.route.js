module.exports = (app) => {
    const express = require('express');
    // Doc
    app.get("/", async function (req, res, next) {
        print("hello");
    });
};