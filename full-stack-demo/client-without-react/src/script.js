 
const apiurlbase = "http://serverhost:9001"
async function awardstudent (event) {

    console.log("awardstudent - start");
    let status_str;
    let formData = new FormData( document.querySelector("#award-form"));

    const student_id =  formData.get("id");
    console.log (student_id);
    var award_url = apiurlbase + '/students/award/' + student_id;
    console.log (award_url);

    await fetch(award_url,   { method: 'POST'})
    .then (res => {
        console.log ("awardstudent - rest api done");
        console.log (res);
        if (res.ok)  return res.json(); 
        else  throw new Error ("award student failed");
      })
        .then (rest_res => {
            console.log (rest_res);
            status_str = student_id + " awarded degree";
        })
        .catch (err => {
            console.log (err);
            status_str = student_id + " award unsuccessful";
        })

        
        var status_el = document.getElementById("award-status");
        status_el.innerHTML = status_str;


    console.log("awardstudent - end");
}

async function admissionformevent (event){
    console.log("admissionformevent - start");
    let status_str;
    var formData = new FormData( document.querySelector("#admission-form"));

        var myobj = {};
        formData.forEach(function(value, key){
              myobj[key] = value;
                });
                console.log ("myobj");
                console.log (myobj);
        var myjson = JSON.stringify(myobj);

        await fetch(apiurlbase + '/students/admit', 
            {      
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body:myjson
            }
       ).then (res => {
        console.log ("admitted");
        console.log (res);
        if (res.ok)  return res.json(); 
        else  throw new Error ("admission api failed");
      })
        .then (rest_res => {
            console.log (rest_res);
        //    displayInGrid (students);
        status_str = myobj['name'] + " admitted";
        })
        .catch (err => {
            console.log (err);
            status_str = myobj['name'] + " admission failed";
        })


        var status_el = document.getElementById("admission-status");
        status_el.innerHTML = status_str;
    console.log("admissionformevent - end");

}

async function getstudents() {
  console.log ("getstudents - start");
   await fetch(apiurlbase + '/students')
    .then (res => {
        console.log ("getstudents - fetched");
        console.log (res);
        if (res.ok)  return res.json(); 
        else  throw new Error ("fetch students failed");
      })
        .then (students => {
            console.log (students);
            displayInGrid (students);
        })
        .catch (err => {
            console.log (err);
        })

  console.log ("getstudents - end");
}

function displayInGrid (students) {
    console.log ("displayInGrid - start");
    var col = [];
    for (var i = 0; i < students.length; i++) {
        for (var key in students[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }

        // CREATE DYNAMIC TABLE.
        var table = document.createElement("table");

        // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

        var tr = table.insertRow(-1);                   // TABLE ROW.

        for (var i = 0; i < col.length; i++) {
            var th = document.createElement("th");      // TABLE HEADER.
            th.innerHTML = col[i];
            tr.appendChild(th);
        }

        // ADD JSON DATA TO THE TABLE AS ROWS.
        for (var i = 0; i < students.length; i++) {

            tr = table.insertRow(-1);

            for (var j = 0; j < col.length; j++) {
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = students[i][col[j]];
            }
        }

        // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
        var divContainer = document.getElementById("content-area");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);
        console.log (table);
        console.log ("displayInGrid - end");

}
