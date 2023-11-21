import React from "react";
import { Data } from "./renderer";

type Props = {
    setShow: React.Dispatch<React.SetStateAction<any>>
    data: Data,
}

const Table = ({ setShow, data } : Props) => {
  return (
    <>
        <table>
            <tbody>
                <tr>
                    <th>ID</th>
                    <th>Product Title</th>
                    <th>Price (INR)</th>
                    <th>SKU</th>
                </tr>
                <tr>
                    <td>{data.product_id}</td>
                    <td>{data.title}</td>
                    <td>{data.price}</td>
                    <td>{data.sku}</td>
                </tr>
            </tbody>
        </table>
        <button type="button" onClick={() => setShow(false)}>Clear</button>
    </>
  )
}

export default Table