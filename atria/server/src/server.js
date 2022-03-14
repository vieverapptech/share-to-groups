import express from 'express';
import mongoose from "mongoose";
import bodyParser from "body-parser";


var mongodb_options = {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    bufferCommands: false
};

//Set up default mongoose connection
const server_port = process.env.SERVER_PORT || 9001;
const mongoDB = process.env.MONGOURI || 'mongodb://mongoadmin:secret@localhost:27017/studentsdb?authSource=admin';

console.log ("mongodb uri");
console.log (mongoDB);

try {
    await mongoose.connect(mongoDB, mongodb_options);
}catch (err) {
    console.log ("mongoose  err");
    console.log (err);
    process.exit (1);
}

console.log ("mongoose connection established");


const db = mongoose.connection;

try {
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once("open", function() {
        console.log("MongoDB database connection established successfully");
    });
} catch (err) {
    console.log ("db open err");
    console.log (err);
}

// define a schema
let studentschema = new mongoose.Schema({
    name: String,
	//dob: Date,
	schoolgrade: String,
	address: String,
    degree: String,
    email: String
});

//above schema is for this document
//sample document
/*
{
	"name": "kumar",
	"schoolgrade": "A",
    "degree": "awarded",
    "address": "abc street, madurai",
    "email": "student1@abc.com"
}
*/

// use schema to create model for the collection StudentModel
// using studentschema on studentscollection
const StudentModel = mongoose.model ('StudentModel', studentschema, 'studentscollection')



const app = express();

// parse application/json
app.use(bodyParser.json());

app.listen(server_port, () =>
    console.log(`Server started at port ${server_port}`)
);

app.use(function (req, res, next) {
    console.log(`Req entry point. URL=${req.originalUrl}; method=${req.method} `);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
})

// show a response
app.get('/', (req, res) => {
    console.log(`inside / route `);
    res.send('Hello World!<br/> Sample nodejs express app <br/>');
});

// read student records
app.get('/students', (req, res) => {
    console.log(`inside /students route `);
    //get students list from mangodb
    /*
    const students_from_db = {
        "students" : [
            {
                "name": "kumar",
                "schoolgrade": "A",
                "address": "abc street, madurai",
                "degree":"not-awarded"
            },
            {
                "name": "latha",
                "schoolgrade": "A",
                "address": "abc street, madurai",
                "degree": "not-awarded"
            }
        ]
    }
     res.send (students);
    */

    const students_from_db =  StudentModel.find({}).then((students)=>{
        res.status(200).json (students);
    }, err => {
        console.log ("students fetch failed " + err.errmsg);
        res.status(500).json({errmsg:"check mongoose err"});
    });
    
   
});

// create student record
app.post('/students/admit', (req, res) => {
    console.log("inside  /students/admit route");
    console.log ("req.body");
    console.log (req.body);

    var admission_student = new StudentModel(req.body);
    console.log ("student payload");
    console.log (admission_student);
    
     const saved_student = admission_student
        .save()
        .then(student=>{
            console.log ("student save success");
            res.send ({"status":"admitted", "req_body": student});
        }, err => {
            console.log ("student save failed " + err.errmsg);
            res.status(500).json({errmsg:"check for duplicate"});
        });
});

//update student records
app.post('/students/award/:inputid', (req, res) => {
    console.log("inside  /students/award route");

    // proto code
    //  res.status(200)
    //      .json({"status":"degree awarded", "updated_student_name":"somestudent"});
    console.log ("working on student id");
    console.log (req.params.inputid);

    const students_from_db =  StudentModel.
        findByIdAndUpdate(req.params.inputid, {"degree": "awarded"})
        .then((student)=>{
            console.log ("student update successful");
            res.status(200).json({"status":"degree awarded", "updated_student_name":student.name});
        }, err => {
            console.log ("student fetch failed " + err.errmsg);
            res.status(500).json({errmsg:"check mongoose err"});
        });
    
});

