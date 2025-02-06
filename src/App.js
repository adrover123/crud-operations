import { Data } from './EmployeeData';  
import { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
    const [data, setData] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState(0);
    const [id, setId] = useState(null);
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        setData(Data);
        console.log(Data);
    }, []);

    const handleEdit = (id) => {
        const dt = data.find(item => item.id === id);
        if (dt) {
            setUpdate(true);
            setId(id);
            setFirstName(dt.firstName);  
            setLastName(dt.lastName);  
            setAge(dt.age);
        }
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure to delete this record?")) {
            const dt = data.filter(item => item.id !== id);
            setData(dt);
        }
    };

    const handleSave = (e) => {
        e.preventDefault();
        let error = "";
        if (!firstName) error += "First name is required. ";
        if (!lastName) error += "Last name is required. ";
        if (age <= 0) error += "Valid age is required. ";

        if (!error) {
            const newObject = {
                id: data.length + 1,
                firstName,  
                lastName,  
                age
            };
            setData([...data, newObject]);
            alert("Record Saved");
            handleClear();
        } else {
            alert(`Error: ${error}`);
        }
    };

    const handleUpdate = () => {
        const updatedData = data.map(item => 
            item.id === id ? { ...item, firstName, lastName, age } : item
        );
        setData(updatedData);
        alert("Record Updated");
        handleClear();
    };

    const handleClear = () => {
        setFirstName('');
        setLastName('');
        setAge(0);
        setUpdate(false);
        setId(null);
    };

    return (
        <div className="App">
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15px', marginBottom: '20px' }}>
                <div>
                    <label>First Name</label>
                    <input 
                        type="text" 
                        placeholder="Enter Your First Name" 
                        onChange={(e) => setFirstName(e.target.value)} 
                        value={firstName} 
                    />
                </div>
                <div>
                    <label>Last Name</label>
                    <input 
                        type="text" 
                        placeholder="Enter Your Last Name" 
                        onChange={(e) => setLastName(e.target.value)} 
                        value={lastName} 
                    />
                </div>
                <div>
                    <label>Age</label>
                    <input 
                        type="number" 
                        placeholder="Enter Your Age" 
                        onChange={(e) => setAge(parseInt(e.target.value) || 0)} 
                        value={age} 
                    />
                </div>
                <div>
                    {!update ? (
                        <button className="btn btn-primary" onClick={handleSave}>Save</button>
                    ) : (
                        <button className="btn btn-primary" onClick={handleUpdate}>Update</button>
                    )}
                    <button className="btn btn-danger" onClick={handleClear}>Clear</button>
                </div>
            </div>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Sr. No</th>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Age</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.id}</td>
                            <td>{item.firstName}</td>  
                            <td>{item.lastName}</td>  
                            <td>{item.age}</td>
                            <td>
                                <button className="btn btn-primary" onClick={() => handleEdit(item.id)}>Edit</button>&nbsp;
                                <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;
