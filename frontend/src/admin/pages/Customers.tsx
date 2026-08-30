import Loading from "../../components/common/Loading";
import { useCustomers } from "../hooks/useCustomers";
import "../styles/AdminCustomers.css";

function Customers() {
    const { customers, loading } = useCustomers();
    if (loading) return <Loading />;


    return (
        <div className="admin-customers-page">
            <h1 className="admin-customers-title">Customer Management</h1>
            <div className="admin-customers-table-container">
                <table className="admin-customers-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map(customer => (
                            <tr key={customer.id}>
                                <td>{customer.id}</td>
                                <td>{customer.name}</td>
                                <td>{customer.phoneNumber}</td>
                                <td>{customer.email}</td>
                                <td>
                                    {customer.doorNo}, {customer.addressLine1}
                                    {customer.addressLine2 && `, ${customer.addressLine2}`}
                                    {customer.landmark && `, Near ${customer.landmark}`}, {customer.city}, {customer.state} - {customer.pincode}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Customers;