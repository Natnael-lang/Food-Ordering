const express = require('express');
const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'natnael12',
    database: 'database1',
  });
  
  
  db.connect((err) => {
    if (err) {
      throw err;
    }
    console.log('Connected to MySQL database');
  });
  module.exports=db;