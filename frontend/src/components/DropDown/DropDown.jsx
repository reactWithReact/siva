import { useEffect } from "react";
import { useRef, useState } from "react";
import { SDropDown, DropDownButton, DropDownMenu } from "./DropDown.style";

// This is a reusable dropdown component
const DropDown = ({
  dropDownLabel = "Test Label",
  closeOnSelect = true,
  children,
}) => {
  const dropDownRef = useRef();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const dropDownChildren = Array.from(dropDownRef.current.children);
    const closeEvent = () => {
      if (closeOnSelect) {
        console.log("closed");
        setOpen(false);
      }
    };
    dropDownChildren.forEach((option) => {
      option.addEventListener("click", closeEvent);
    });
    return () => {
      dropDownChildren.forEach((option) => {
        option.removeEventListener("click", closeEvent);
      });
    };
  }, []);
  return (
    <SDropDown>
      <DropDownButton
        onClick={() => {
          setOpen((prev) => !prev);
        }}
      >
        {dropDownLabel}
      </DropDownButton>
      <DropDownMenu ref={dropDownRef} open={open}>
        {children}
      </DropDownMenu>
    </SDropDown>
  );
};

export default DropDown;
