
import React from "react";
/*
export default function ViewStudents() {
  const [students, setStudents] = useState(null);

  const gs= () =>  {
    console.log ("getstudents - start");
    const apiurlbase = "http://serverhost:9001";
    fetch(apiurlbase + '/students')
      .then (res => {
          console.log ("getstudents - fetched");
          console.log (res);
          if (res.ok)  return res.json(); 
          else  throw new Error ("fetch students failed");
        })
          .then (students => {
            console.log(`students=${students}`);
setStudents(students);
          })
          .catch (err => {
              console.log (err);
          })
  
    console.log ("getstudents - end");
  }

  return (
    <div>
      <h2>View Students</h2>
      <button onClick={gs}>View</button>
{students}
    </div>
  );
}

*/

class ViewStudents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    const apiurl = "http://serverhost:9001/students";
    
    fetch(apiurl)
      .then(res => res.json())
      .then(
        (result) => {
            this.setState({
            isLoaded: true,
            items: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );

      /*
      setTimeout(()=>{
      this.setState({
        isLoaded: true
      })}, 2000);
      */
  }

  render() {
    const tstyle = {
      border: "solid 1px #DDD",
      borderCollapse: "collapse",
      padding: "2px 3px",
      textAlign: "center",
      margin: "10px"
    };

    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <table style={tstyle}>
        <thead>
          <tr style={tstyle}>
            <th>id</th>
            <th>name</th>
            <th>schoolgrade</th>
            <th>address</th>
            <th>degree</th>
            <th>email</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item._id} style={tstyle}>
            <td >
              {item._id}
            </td>
            <td >
               {item.name} 
            </td>
            <td >
               {item.schoolgrade}
            </td>
            <td >
               {item.address}
            </td>
            <td >
               {item.degree}
            </td>
            <td >
               {item.email}
            </td>
            </tr>
          ))}
         </tbody>
        </table>
      );
    }
  }
}
export default ViewStudents;