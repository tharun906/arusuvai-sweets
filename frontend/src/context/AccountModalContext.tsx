import { createContext, useContext, useState, type ReactNode } from "react";
import { type PendingActionType } from "../constants/PendingAction";

interface AccountModalContextType {
    open: boolean;
    openModal: () => void;
    closeModal: () => void;
    pendingAction: PendingActionType;
    setPendingAction: (action: PendingActionType) => void;
    phoneVerified: boolean;
    setPhoneVerified: (value: boolean) => void;
    registrationPending: boolean;
    setRegistrationPending: (value: boolean) => void;
}

const AccountModalContext = createContext<AccountModalContextType | undefined>(undefined);

interface AccountModalProviderProps {
    children: ReactNode;
}

export function AccountModalProvider({ children }: AccountModalProviderProps) {
    const [open, setOpen] = useState(false);
    const [pendingAction, setPendingAction] = useState<PendingActionType>("NONE");
    const [phoneVerified, setPhoneVerified] = useState(false);
    const [registrationPending, setRegistrationPending] = useState(false);

    const openModal = () => setOpen(true);
    const closeModal = () => setOpen(false);

    return (
        <AccountModalContext.Provider value={{
            open,
            openModal,
            closeModal,
            pendingAction,
            setPendingAction,
            phoneVerified,
            setPhoneVerified,
            registrationPending,
            setRegistrationPending
        }}>
            {children}
        </AccountModalContext.Provider>
    );
}

export function useAccountModal() {
    const context = useContext(AccountModalContext);

    if (!context) {
        throw new Error("useAccountModal must be used inside AccountModalProvider");
    }

    return context;
}