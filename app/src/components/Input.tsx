import { ipcRenderer } from "electron";
import {useEffect, useState} from "react";


const Input = () => {

    const [data, setData] = useState({
        product_id: "",
        title: "",
        price: "",
        sku: "",
    });

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
    }

    return (
        <div>
            <label htmlFor="product_id">Product ID: </label>
            <input 
                type = "text"
                value = {data.product_id}
                onChange = {handleChange}
                id = "product_id"
            ></input>

            <label htmlFor="title">Title: </label>
            <input 
                type = "text"
                value = {data.title}
                onChange = {handleChange}
                id = "title"
            ></input>

            <label htmlFor="price">Price: </label>
            <input 
                type = "text"
                value = {data.price}
                onChange = {handleChange}
                id = "price"
            ></input>

            <label htmlFor="sku">SKU: </label>
            <input 
                type = "text"
                value = {data.sku}
                onChange = {handleChange}
                id = "sku"
            ></input>
        <button type="button" onClick={handleSave}>Save File</button>
        <button type="button"onClick={handleOpen}>Open File</button>
        </div>
    );
}

export default Input