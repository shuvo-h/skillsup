
type TPrimaryButtonProps = {
    actionType?: string
}
const PrimaryButton = ({actionType='Add'}:TPrimaryButtonProps) => {
    return (
        <button>
            Click to {actionType}
        </button>
    );
};

export default PrimaryButton;