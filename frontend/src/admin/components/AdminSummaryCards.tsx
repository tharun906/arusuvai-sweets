

import { useAdminSummary } from "../hooks/useAdminSummary";
import "../styles/AdminSummaryCards.css";

function AdminSummaryCards() {

    const {

        summary,

        loading,

    } = useAdminSummary();

    if (loading || !summary) {

        return <h3>Loading Summary...</h3>;

    }

    return (

        <div className="summary-container">

            <div className="summary-card">

                <h4>Total Orders</h4>

                <h2>{summary.totalOrders}</h2>

            </div>

            <div className="summary-card">

                <h4>Total Sales</h4>

                <h2>

                    ₹{summary.totalSales}

                </h2>

            </div>

            <div className="summary-card">

                <h4>Customers</h4>

                <h2>

                    {summary.totalCustomers}

                </h2>

            </div>

            <div className="summary-card">

                <h4>Products</h4>

                <h2>

                    {summary.totalProducts}

                </h2>

            </div>

        </div>

    );

}

export default AdminSummaryCards;