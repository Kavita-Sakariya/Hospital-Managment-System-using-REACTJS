import React, { useEffect, useState } from "react";
// import Sidebar from '../Components/SideNavbar'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const UpdateDoctor = () => {
  const navigate = useNavigate();

  const { d_id } = useParams();
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [department, setDepartment] = useState("");
  const [sex, setSex] = useState("");
  const [doj, setDoj] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/getdoctor/" + d_id)
      .then((doctors) => {
        console.log(doctors);
        setId(doctors.data.id);
        setName(doctors.data.name);
        setPhone(doctors.data.phone);
        setAge(doctors.data.age);
        setDepartment(doctors.data.department);
        setSex(doctors.data.sex);
        setDoj(doctors.data.doj);

      })
      .catch((err) => console.log(err));
  }, []);

  async function Update(e) {
    e.preventDefault();

    try {
      await axios
        .put("http://localhost:8000/updatedoctor/" + d_id, {
          id,
          name,
          phone,
          age,
          department,
          sex,
          doj
        })
        .then((res) => {
          console.log(res);
          navigate("/doctor");
        })
        .catch((e) => {
          alert("Wrong details");
          console.log(e);
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="form-container">
      <form onSubmit={Update}>
        <h3>Update Doctor</h3>
        <label>
        ID:
        <input type="number" name="id" value={id} min={1} max={50} onChange={(e)=> setId(e.target.value)} required/>
      </label>
      <label>
        Name:
        <input type="text" name="name"  value={name} onChange={(e)=> setName(e.target.value)} required/>
      </label>
      <label>
        Phone:
        <input type="tel" name="phone" value={phone} pattern="[0-9]{10}" onChange={(e)=> setPhone(e.target.value)} placeholder='98000 98000'required />
      </label>
      <label>
        Age:
        <input type="text" name="age" value={age} onChange={(e)=> setAge(e.target.value)} />
      </label>
      <br/>
      <label>
        Department:
        <select value={department} onChange={(e) => setDepartment(e.target.value)}>
          <option value="Surgical Department">Surgical Department</option>
          <option value="Radiology Department">Radiology Department</option>
          <option value="Gynecology Department">Gynecology Department</option>
          <option value="Neurology Department">Neurology Department</option>
        </select>
      </label>
      <br/>
      <label>
        Gender:
        <select value={sex} onChange={(e) => setSex(e.target.value)} required>
          <option value="Female">Female</option>
          <option value="Male">Male</option>
    </select>
      </label>
      <label>
        DateOfJoining:
        <input type="date" name="doj" value={doj} onChange={(e)=> setDoj(e.target.value)} required/>
      </label>    
      <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateDoctor;
