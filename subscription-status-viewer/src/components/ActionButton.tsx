type ActionButtonProps = {
  onClick: () => Promise<void> | void;
  bgColor: string;
  disabled: boolean;
  isLoading: boolean;
  btnText: string;
  loadingText?: string; // Optional: custom text like "Processing..."
};

export default function ActionButton({
  onClick,
  bgColor,
  disabled,
  isLoading,
  btnText,
  loadingText = "Loading...",
}: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      style={{
        padding: "10px 20px",
        backgroundColor: bgColor, // Use the dynamic prop here
        color: "#fff",
        border: "none",
        borderRadius: 6,
        cursor: disabled || isLoading ? "not-allowed" : "pointer",
        flex: 1,
        opacity: disabled || isLoading ? 0.7 : 1, // Visual cue for disabled state
        transition: "opacity 0.2s ease",
      }}
    >
      {isLoading ? loadingText : btnText}
    </button>
  );
}