export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string
}

export interface DialogProps {
    isOpen: boolean;
    closeDialog: () => void;
}