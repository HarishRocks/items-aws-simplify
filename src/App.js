import { useState, useEffect } from 'react';
import './App.css';
import AwsAmplify from 'aws-amplify';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@aws-amplify/ui-react'
import AwsExports from './aws-exports';
import APIHelper from './api';
AwsAmplify.configure(AwsExports);


function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const api = new APIHelper();

  useEffect(() => {
    fetchItems();
  }, []);


  const fetchItems = async () => {
    const res = await api.getAllItems()
    setItems(res);
  }
  const submitItem = async () => {
    setIsLoading(true);
    await api.putItem({ name, price });
    await fetchItems();
    setName("");
    setPrice(0);
    setIsLoading(false);
  }

  const deleteItem = async (id) => {
    setIsLoading(true);
    await api.deleteItem(id);
    await fetchItems();
    setIsLoading(false);
  }

  return (
    <div className="App">
      <h1>Simple Items Store</h1>
      <div style={{ marginBottom: "20px" }}>
        <input type="text" placeholder='name' value={name} onChange={(e) => setName(e.target.value)} />
        <input type="number" placeholder='price' value={price} onChange={(e) => setPrice(e.target.value)} />
        <button disabled={isLoading} onClick={submitItem}>Submit</button>
      </div>
      <Table
        caption=""
        variation="bordered"
        highlightOnHover={false}
      >
        <TableHead>
          <TableRow>
            <TableCell as="th">ID</TableCell>
            <TableCell as="th">Name</TableCell>
            <TableCell as="th">Price</TableCell>
            <TableCell as="th">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            items.map(item => (
              <TableRow>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell><button onClick={() => deleteItem(item.id)}>Delete</button></TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </div>
  );
}

export default App;
