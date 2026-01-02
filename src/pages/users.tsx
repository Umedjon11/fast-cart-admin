import { CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField, type SelectChangeEvent } from "@mui/material"
import { useEffect, useState } from "react";
import { GetToken } from "../../utils/axios";
import { useNavigate } from "react-router";
import { useUsers } from "../store/users";

const Users = () => {

  const [filter, setFilter] = useState('All');
  const navigate = useNavigate()
  const { usersList, GetUsers, isLoading } = useUsers((state: any) => state)

  const token = GetToken()
  const [Search, setSearch] = useState("")

  const handleChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value as string);
  };
  
  useEffect(() => {
    if (token && token.length > 200) {
      GetUsers(Search)
    }
    else {
      localStorage.clear()
      navigate("/")
    }
  }, [])

  return (
    <div className="flex flex-col gap-[3vh] items-start">
      <h1 className="text-4xl text-[#111927] font-bold">Users</h1>
      <div className="flex items-center gap-4">
        <TextField value={Search} onChange={(e) => {
          GetUsers(e.target.value)
          setSearch(e.target.value)
        }} label="Search..." className="w-80" />
        <FormControl className="w-50">
        <InputLabel id="demo-simple-select-label">Filter</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={filter}
          label="Filter"
          onChange={handleChange}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value=""></MenuItem>
          <MenuItem value=""></MenuItem>
        </Select>
      </FormControl>
      </div>
      <table className="text-start w-full">
        <thead className="text-[#5A607F] border-b-2 border-b-[#EFF2F8]">
          <tr>
            <th className="text-start pb-[2vh]">Avatar</th>
            <th className="text-start pb-[2vh]">User name</th>
            <th className="text-start pb-[2vh]">First name</th>
            <th className="text-start pb-[2vh]">Last name</th>
            <th className="text-start pb-[2vh]">Email</th>
            <th className="text-start pb-[2vh]">Phone number</th>
            <th className="text-start pb-[2vh]">Dob</th>
          </tr>
        </thead>
        <tbody>
          {
            usersList?.map((user: any) => {
              return <tr key={user.userId} className="border-b border-b-[#E6E9F4]">
                <td>{user.image.length > "" ? (<img className="w-10 h-10 rounded-full m-[2vh_auto_2vh_0]" src={`https://store-api.softclub.tj/images/${user.image}`} />) : (<div className="bg-[#00b7ff] p-[8px_15px] font-semibold rounded-full m-[2vh_57%_2vh_0] text-white">{user.userName[0]}</div>)}</td>
                <td>{user.userName}</td>
                <td>{user.firstName ? user.firstName : "---"}</td>
                <td>{user.lastName ? user.lastName : "---"}</td>
                <td>{user.email ? user.email : "---"}</td>
                <td>{user.phoneNumber ? user.phoneNumber : "---"}</td>
                <td>{user.dob}</td>
              </tr>
            })
          }
        </tbody>
      </table>
      {isLoading && (<CircularProgress className="m-[10vh_auto]" />)}
      
    </div>
  )
}

export default Users