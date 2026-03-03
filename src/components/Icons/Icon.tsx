
import homeIcon from "../../assets/svgs/house_icon.svg";
import profileIcon from "../../assets/svgs/profile_icon.png"

export enum IconsEnum {
    HOME = "home_icon",
    PROFILE = "profile_icon"
}

const srcMap: Record<IconsEnum, string> = {
    [IconsEnum.HOME]: homeIcon,
    [IconsEnum.PROFILE]: profileIcon
};

type IconsProps = {
    iconName: IconsEnum
    size?: number
}

function Icon({ iconName, size = 30 }: IconsProps) {

    return <img style={{ height: size + "px", width: size + "px" }} src={srcMap[iconName]} alt={iconName} />;
}

export default Icon