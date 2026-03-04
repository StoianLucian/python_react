
import homeIcon from "../../assets/svgs/house_icon.svg";
import profileIcon from "../../assets/svgs/profile_icon.png"
import pdfIcon from "../../assets/svgs/pdf_icon.png"
import CogIcon from "../../assets/svgs/cogwheel_icon.png"
import ArrowIcon from "../../assets/svgs/arrow_icon.png"

export enum IconsEnum {
    HOME = "home_icon",
    PROFILE = "profile_icon",
    PDF = "pdf_icon",
    COG = "cogwheel_icon",
    ARROW = "arrow_icon"
}

const srcMap: Record<IconsEnum, string> = {
    [IconsEnum.HOME]: homeIcon,
    [IconsEnum.PROFILE]: profileIcon,
    [IconsEnum.PDF]: pdfIcon,
    [IconsEnum.COG]: CogIcon,
    [IconsEnum.ARROW]: ArrowIcon
};

type IconsProps = {
    iconName: IconsEnum
    size?: number
    className?: string
}

function Icon({ iconName, size = 30, className }: IconsProps) {

    return <img className={`${className}`} style={{ height: size + "px", width: size + "px" }} src={srcMap[iconName]} alt={iconName} />;
}

export default Icon