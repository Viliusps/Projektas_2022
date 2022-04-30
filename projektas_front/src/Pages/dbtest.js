import { useState, useEffect } from 'react'
import axios from "axios";
import { Link } from "react-router-dom";
 
const CryptoList = () => {
    const [cryptos, setCrypto] = useState([]);
 
    useEffect(() => {
        getCrypto();
    }, []);
 
    const getCrypto = async () => {
        const response = await axios.get('http://localhost:5000/cryptos');
        setCrypto(response.data);
    } 
    return (
        <div>
            <table className="table is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th>Nr</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    { cryptos.map((crypto, index) => (
                        <tr key={ crypto.Id }>
                            <td>{ index + 1 }</td>
                            <td>{ crypto.name }</td>
                        </tr>
                    )) }
                     
                </tbody>
            </table>
        </div>
    )
}
 
export default CryptoList