import "./Drawer.css";

interface DrawerProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

function Drawer({
    open,
    onClose,
    children,
}: DrawerProps) {

    return (
        <>
            <div
                className={`drawer-overlay ${open ? "show" : ""}`}
                onClick={onClose}
            />
            <aside
                className={`drawer ${open ? "open" : ""}`}
            >
                {children}
            </aside>
        </>
    );
}

export default Drawer;