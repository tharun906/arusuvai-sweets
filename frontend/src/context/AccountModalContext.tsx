import {
    createContext,
    useContext,
    useState,
    type ReactNode
} from "react";

import {
    type PendingActionType
} from "../constants/PendingAction";

interface AccountModalContextType {

    open: boolean;

    openModal: () => void;

    closeModal: () => void;

    pendingAction: PendingActionType;

    setPendingAction: (
        action: PendingActionType
    ) => void;

    /*
     * Indicates that the phone/profile flow
     * has been successfully completed for
     * the current checkout.
     */
    phoneVerified: boolean;

    setPhoneVerified: (
        value: boolean
    ) => void;
}

const AccountModalContext =
    createContext<AccountModalContextType | undefined>(
        undefined
    );

interface AccountModalProviderProps {

    children: ReactNode;

}

export function AccountModalProvider({
    children
}: AccountModalProviderProps) {

    const [open, setOpen] =
        useState(false);

    const [pendingAction, setPendingAction] =
        useState<PendingActionType>("NONE");

    const [phoneVerified, setPhoneVerified] =
        useState(false);

    const openModal = () => {

        setOpen(true);

    };

    const closeModal = () => {

        setOpen(false);

    };

    return (

        <AccountModalContext.Provider

            value={{

                open,

                openModal,

                closeModal,

                pendingAction,

                setPendingAction,

                phoneVerified,

                setPhoneVerified

            }}

        >

            {children}

        </AccountModalContext.Provider>
    );
}

export function useAccountModal() {

    const context =
        useContext(AccountModalContext);

    if (!context) {

        throw new Error(
            "useAccountModal must be used inside AccountModalProvider"
        );

    }

    return context;
}