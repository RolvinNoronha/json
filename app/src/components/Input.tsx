import {useEffect, useState} from "react";
import Table from "./Table";
import { Data } from "./renderer";


const Input = () => {


    const [data, setData] = useState({
        product_id: "",
        title: "",
        price: "",
        sku: "",
    });

    const [readData, setReadData] = useState({
        product_id: "",
        title: "",
        price: "",
        sku: "",
    });
    const [show, setShow] = useState(false);

    const handleChange = (e : any) => {
        const {id, value} = e.target;

        setData(prevData => ({
            ...prevData,
            [id]: value,
        }))
    }

    const handleSave = async () => {

        window.electronAPI.saveFile(data);
        setData({
            product_id: "",
            title: "",
            price: "",
            sku: "",
        });
    }

    const handleOpen = async () => {
        await window.electronAPI.openFile();
        window.electronAPI.readFile()
            .then(results => { 
                const d = JSON.parse(results.toString());
                setReadData({
                     ...d
                });
                setShow(true);
            });
    }

    return (
        <div>
            <div className="input_values">
                <div>
                    <label htmlFor="product_id">Product ID: </label>
                    <input 
                        type = "text"
                        value = {data.product_id}
                        onChange = {handleChange}
                        id = "product_id"
                    ></input>
                </div>

                <div>
                    <label htmlFor="title">Title: </label>
                    <input 
                        type = "text"
                        value = {data.title}
                        onChange = {handleChange}
                        id = "title"
                    ></input>
                </div>

                <div>
                    <label htmlFor="price">Price: </label>
                    <input 
                        type = "text"
                        value = {data.price}
                        onChange = {handleChange}
                        id = "price"
                    ></input>
                </div>

                <div>
                    <label htmlFor="sku">SKU: </label>
                    <input 
                        type = "text"
                        value = {data.sku}
                        onChange = {handleChange}
                        id = "sku"
                    ></input>
                </div>
            </div>
            <div className="buttons">
                <button type="button" onClick={handleSave}>Save File</button>
                <button type="button"onClick={handleOpen}>Open File</button>
            </div>
            <div className="content">
                {show && <Table setShow={setShow} data={readData} /> } 
            </div>
        </div>
    );
}

export default Input