import Badge from "./Badge";

interface StatusBadgeProps {

    status:
        | "AVAILABLE"
        | "LOW_STOCK"
        | "OUT_OF_STOCK"
        | "UNAVAILABLE";

}

function StatusBadge({

    status,

}: StatusBadgeProps) {

    switch (status) {

        case "AVAILABLE":

            return (

                <Badge variant="success">

                    Available

                </Badge>

            );

        case "LOW_STOCK":

            return (

                <Badge variant="warning">

                    Low Stock

                </Badge>

            );

        case "OUT_OF_STOCK":

            return (

                <Badge variant="danger">

                    Out of Stock

                </Badge>

            );

        default:

            return (

                <Badge variant="secondary">

                    Unavailable

                </Badge>

            );

    }

}

export default StatusBadge;