import { CustomButtonProps } from "../types"


const CustomButton = ({ title, containerStyles, handleClick, btnType, textStyles, rightIcon }: CustomButtonProps) => {
  return (
    <button
    disabled={false}
    type={btnType || "button"}
    className={`custom-btn ${containerStyles}`}
    onClick={handleClick}
    >
        <span className={`flex-1 ${textStyles}`}>
            {title}
        </span>
            {rightIcon && (
              <img src={rightIcon} alt="right icon" className="relative w-6 h-6 object-contain" />
            )}
    </button>
  )
}

export default CustomButton