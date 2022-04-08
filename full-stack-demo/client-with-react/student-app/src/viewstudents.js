
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
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {items.map(item => (
            <li key={item._id}>
              {item._id} {item.name} {item.degree}
            </li>
          ))}
        </ul>
      );
    }
  }
}
export default ViewStudents;