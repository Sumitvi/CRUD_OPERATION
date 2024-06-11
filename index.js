const { faker } = require('@faker-js/faker');
const mysql = require("mysql2");
let express = require("express");
let app = express();
let port = 8080;
let path = require("path");
let methodOverride  = require("method-override");

app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}));



// app.listen(port,()=>{
//     console.log("Server has listening");
// })

// app.get("/home",(req,res)=>{
//     res.send("This is Sumit");
// })


app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"/views"));

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "Delta_app",
    password: "Sumit@2004"
});



let getRandomUser = () => {
    return [
        faker.string.uuid(),
        faker.internet.userName(),
        faker.internet.email(),
        faker.internet.password(),
    ]
}

app.listen(port,()=>{
   
    console.log("Server has listen");
})



app.get("/user",(req,res)=>{
    let q = "SELECT * FROM USER";
    try{
        connection.query(q,(err,result)=>{
            if(err) throw err;
            // console.log(result);
            // res.render("show.ejs",{result});
            // res.send(result);
            res.render("show.ejs",{result});
            // res.send(result);

        })

    }catch(err){
        console.log("Some Error From DB");


    }
})

app.get("/user/:id/edit",(req,res)=>{
    let {id} = req.params;
    let q = `SELECT * FROM user WHERE ID = "${id}"`
    try{
        connection.query(q,(err,result)=>{
            let user = result[0];
            res.render("edit.ejs",{user});
            
        })

    }catch(err){

        console.log(err);

    }



    // console.log(id);
    // res.render("edit.ejs");
})

// <%  for(user of result){ %>

//     <p><%= user.id  %></p>
// <%  } %>


app.patch("/user/:id",(req,res)=>{
    // res.send("Submitted");
    let {id }= req.params;
    let {password : formPassword, username : newUser}=req.body;
    let q = `SELECT * FROM user WHERE id = '${id}'`;


    try{
        connection.query(q,(err,result)=>{
            if(err) throw err;
            let user = result[0];
            if(formPassword != user.PASSWORD){
                res.send("WRONG PASSWORD");
            }else{
                let q2 = `UPDATE user SET USERNAME ='${newUser}' WHERE id = '${id}'`
                connection.query(q2,(err,result)=>{
                    if(err) throw err;
                    // res.send(result);
                    res.redirect("/user");
                })
            }
           
            res.send(user);
            
        })

    }catch(err){

        console.log(err);

    }


})

app.delete("/user/:id/" , (req,res)=>{
    let {id} = req.params;
    let q = `DELETE FROM user WHERE id = '${id}'`;


    try{
        connection.query(q,(err,result)=>{
           res.redirect("/user");
            
        })

    }catch(err){

        console.log(err);

    }


    
});






app.post("/user/:id/" , (req,res)=>{
    let {id} = req.params;
    let q = `DELETE FROM user WHERE id = '${id}'`;


    try{
        connection.query(q,(err,result)=>{
           res.redirect("/user");
            
        })

    }catch(err){

        console.log(err);

    }


    
});


app.post("/adduser",(req,res)=>{


    let {id} = req.params;
    let q = `SELECT * FROM user WHERE ID = "${id}"`
    try{
        connection.query(q,(err,result)=>{
            let user = result[0];
            res.render("edit.ejs",{user});
            
        })

    }catch(err){

        console.log(err);

    }

})
